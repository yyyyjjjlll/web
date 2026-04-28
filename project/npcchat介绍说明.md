# NPC Chat 项目介绍与技术亮点

---

## 一、项目概述（STAR）

### Situation（项目背景）
随着大语言模型的快速发展，市场上出现了各种 AI 聊天应用，但缺乏专注于**角色扮演剧情生成**的本地桌面应用。用户需要：
- 一个可以离线运行的 AI 对话系统
- 支持多个 AI 角色同时互动
- 能够自动生成连贯的剧情发展
- 保护隐私，数据本地存储

### Task（项目目标）
构建一个基于 Electron 的桌面应用，实现：
- 多角色聊天室，支持独特的角色设定和性格
- AI 驱动的剧情自动生成
- 多 AI 服务提供商支持
- 流畅的对话体验（流式输出）

### Action（技术实现）

#### 1. 技术栈选择
| 层次 | 技术选择 |
|------|----------|
| 桌面框架 | Electron 30 |
| 前端框架 | React 18 + TypeScript |
| 构建工具 | electron-vite |
| UI 组件库 | shadcn/ui + Tailwind CSS |
| 状态管理 | Zustand |
| 数据库 | Better-SQLite3 |
| AI SDK | OpenAI Node.js |

#### 2. 核心功能模块
- **多 AI 提供商**：支持 10+ 种 AI 服务（OpenAI、DeepSeek、Moonshot、智谱、Ollama、LM Studio 等）
- **流式输出**：实现 Server-Sent Events 风格的流式响应，实时显示 AI 生成内容
- **本地存储**：SQLite 数据库持久化存储房间、角色、消息
- **上下文管理**：构建包含世界设定、角色设定、对话历史的完整上下文
- **双身份模式**：演绎者模式（扮演角色）/ 旁观者模式（引导剧情）

#### 3. 架构设计
- 主进程/渲染进程分离，IPC 通信
- Context Bridge 安全隔离
- 模块化的服务层（AI 服务、存储服务、资源服务）

### Result（项目成果）

#### 功能亮点
- 6 个预设 Demo 模板（奇幻酒馆、赛博朋克、侦探事务所等）
- 4 档生成长度控制（简洁/中等/详细/极长）
- 智能时间戳显示（刚刚/分钟前/小时前）
- 继续剧情功能，一键推动故事发展

#### 技术亮点
- **多平台 AI 集成**：一行代码切换不同 AI 服务商
- **流式输出**：实时逐字显示 AI 回复
- **本地数据库**：SQLite 离线存储，数据安全可控
- **现代前端架构**：Zustand 状态管理 + shadcn/ui 组件库

---

## 二、技术亮点详细展开

### 一、流式输出（Streaming Response）

#### 1.1 目的
在 AI 对话应用中，用户希望看到 AI 正在"思考"和"生成"的过程，而不是等待一个完整的响应突然出现。传统的同步响应方式会导致用户面对长时间的空白等待，体验不佳。

#### 1.2 解决问题
- **等待焦虑**：长时间等待无响应会让用户感到焦虑
- **体验单调**：传统的"一次性"响应缺乏交互感
- **即时反馈**：用户无法了解 AI 生成内容的进度

#### 1.3 技术亮点（详细实现）

> 💡 **先理解概念：什么是流式输出？**
>
> 想象你在看一个人写信：
> - **传统方式（一次性）**：他把信写完密封好，然后一次性把信封交给你
> - **流式输出**：他写一个字就给你看一个字，你看到他正在写信的过程

##### 完整的数据流程

```
用户发送消息
    ↓
前端 → 后端：告诉我你要开始生成AI回复了
    ↓
后端 → AI服务器：发送请求（stream: true）
    ↓
AI服务器 → 后端：一块一块地返回内容（流式的）
    ↓
后端 → 前端：通过IPC通道一块一块推送给你
    ↓
前端：收到一块，显示一块到屏幕上
    ↓
全部接收完成，前端解析并保存到数据库
```

##### 第一步：告诉 AI 我要流式返回（后端）

```typescript
// src/main/services/AIService.ts

// 这是一个"生成器"函数，可以理解为一个"生产数据的流水线"
async *generateStream(...): AsyncGenerator<string> {
  // 💡 关键！stream: true 告诉AI我要分块接收，不要一次性给完
  const stream = await this.client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: contextMessages,
    stream: true
  })

  // AI返回的不是"一个完整答案"，而是一个"数据流"
  // 我们一个个小块（chunk）地读取
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ''
    if (content) {
      yield content  // 把这块内容"产出"出去
    }
  }
}
```

> 📝 **小知识：什么是 yield？**
> `yield` 就像流水线的出口
> - 普通函数：全部做完，一次性返回结果
> - 生成器函数（function*）：做一点，yield 出去一点，再继续做

##### 第二步：后端把数据推给前端（IPC 通信）

```typescript
// src/main/ipc/aiHandlers.ts

// 处理前端的请求
ipcMain.handle('ai:generateStream', async (event, roomId, userIdentity, length) => {
  const stream = aiService.generateStream(...)

  // AI返回一块，我们就立即发送给前端一块
  for await (const chunk of stream) {
    event.sender.send('ai:streamChunk', { streamId, chunk })
  }

  // 全部发送完毕，通知前端
  event.sender.send('ai:streamDone', { streamId })
})
```

> 💡 **什么是 IPC？**
> IPC = Inter-Process Communication（进程间通信）
> 在 Electron 中有两个"世界"：
> - **主进程**（Node.js 后端）：管数据库、调用 AI
> - **渲染进程**（浏览器前端）：管界面显示
> IPC 就是这两个世界之间传递消息的"邮递员"

##### 第三步：前端接收数据（事件监听）

```typescript
// src/renderer/src/services/aiApi.ts

async generateStream(roomId, userIdentity, length, onChunk) {
  // 1. 先设置一个"监听器"，等后端发数据来
  const chunkListener = (_event, data) => {
    onChunk?.(data.chunk)  // 调用回调函数，把内容显示出来
  }

  // 2. 监听 'ai:streamChunk' 这个频道
  window.electron.ipcRenderer.on('ai:streamChunk', chunkListener)

  // 3. 告诉后端：我要开始接收了
  return window.electron.ipcRenderer.invoke('ai:generateStream', roomId, userIdentity, length)
}
```

##### 第四步：前端显示（React 状态更新）

```typescript
// src/renderer/src/components/MessageList.tsx

function MessageList() {
  // 用一个"变量"来存储正在流出的内容
  const [streamingContent, setStreamingContent] = useState('')

  const handleSendMessage = async (content) => {
    await aiApi.generateStream(
      roomId,
      userIdentity,
      length,
      (chunk) => {
        // 每收到一块内容，就加到显示的内容后面
        setStreamingContent(prev => prev + chunk)
      }
    )
  }

  return <div>{streamingContent}</div>
}
```

##### 第五步：Loading 状态显示（带光标动画）

```typescript
{isLoading && (
  <div>
    {streamingContent ? (
      // 有内容时：显示内容 + 光标动画
      <p>
        {streamingContent}
        <span className="animate-pulse">|</span>
      </p>
    ) : (
      // 没内容时：显示等待动画
      <div className="flex gap-1">
        <div className="animate-bounce">...</div>
      </div>
    )}
  </div>
)}
```

#### 1.4 最终效果
- AI 生成的内容实时逐字显示在界面上
- 带光标动画的等待效果，告知用户 AI 正在工作
- 流式完成后自动解析并保存消息到数据库
- 日志记录完整的请求和响应，便于调试

---

### 二、对话 UI（Conversation UI）

#### 2.1 目的
构建一个沉浸式的角色扮演对话界面，让用户能够：
- 清晰地识别不同角色的发言
- 区分用户消息、AI 角色消息和旁白
- 获得流畅的阅读和滚动体验

#### 2.2 解决问题
- **消息类型混乱**：用户、旁白、AI 角色消息混杂在一起
- **阅读体验差**：没有区分角色身份，不清楚谁在说话
- **时间显示单调**：需要更智能的时间显示方式

#### 2.3 技术亮点

##### 消息类型区分渲染

```typescript
// 渲染时区分不同类型的消息
const isUser = message.type === 'user'
const isNarrator = message.type === 'narrator'

// 旁白：居中显示，斜体样式
if (isNarrator) {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="bg-muted/50 px-6 py-3 border">
        <p className="whitespace-pre-wrap italic">
          {message.content}
        </p>
      </div>
    </div>
  )
}

// 用户/AI消息：头像 + 气泡样式
return (
  <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
    <Avatar />
    <div className="max-w-[70%]">
      <span>{characterName}</span>
      <div className="rounded-2xl px-4 py-2.5">
        {message.content}
      </div>
    </div>
  </div>
)
```

##### 智能时间显示

```typescript
const formatTime = (timestamp) => {
  const diffMs = now.getTime() - date.getTime()

  if (diffMs < 60 * 1000) return '刚刚'
  if (diffMs < 60 * 60 * 1000) return `${Math.floor(diffMs / 60000)}分钟前`
  if (diffMs < 24 * 60 * 60 * 1000) return `${Math.floor(diffMs / 3600000)}小时前`

  // 跨天逻辑
  if (dayDiff === 1) return `昨天 ${timeStr}`
  if (dayDiff > 1 && dayDiff < 7) return `${weekday[date.getDay()]} ${timeStr}`

  return `${month}月${day}日 ${timeStr}`
}
```

#### 2.4 最终效果
- 旁白内容居中显示，带有斜体和边框样式
- 用户消息和 AI 消息分别靠右/靠左显示，带头像
- 角色头像支持自定义图片或自动生成首字符头像
- 智能时间显示（刚刚/分钟前/小时前/昨天/周几）
- 流式内容实时带光标动画显示

---

### 三、会话管理（Session Management）

#### 3.1 目的
管理多个独立的聊天室，每个房间有独立的：
- 世界设定（World Setting）
- 角色列表
- 对话历史
- 用户身份设置

同时支持不同用户身份模式，让体验更加多样。

#### 3.2 解决问题
- **多会话并行**：用户需要同时参与多个不同主题的聊天
- **角色管理**：每个房间独立管理自己的角色列表
- **上下文隔离**：不同房间的对话历史互不干扰
- **身份切换**：支持"演绎者"和"旁观者"两种模式

#### 3.3 技术亮点

##### 数据库架构设计

```sql
-- rooms：聊天室
CREATE TABLE rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  world_setting TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- characters：角色（按room_id隔离）
CREATE TABLE characters (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  portrait_url TEXT,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- messages：消息（按room_id隔离）
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  character_id TEXT,
  type TEXT NOT NULL CHECK(type IN ('user', 'ai', 'narrator')),
  content TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- user_identities：用户身份（按room_id隔离）
CREATE TABLE user_identities (
  room_id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('actor', 'observer')),
  character_id TEXT,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
```

##### Zustand 状态管理

> 💡 **什么是 Zustand？**
> Zustand 就像一个"全局小仓库"，所有组件都可以从这个仓库取数据，任何一个组件改了数据，其他组件自动更新。

```typescript
// src/renderer/src/store/appStore.ts

interface AppState {
  rooms: Room[]
  characters: Character[]
  messages: Message[]
  currentRoomId: string | null
  userIdentities: Map<string, UserIdentity>

  setCurrentRoom: (roomId: string | null) => void
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  rooms: [],
  characters: [],
  messages: [],
  currentRoomId: null,

  setCurrentRoom: (roomId) => set({ currentRoomId: roomId }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setMessages: (messages) => set({ messages })
}))
```

##### 双身份模式实现

```typescript
// 演绎者模式：用户扮演角色，AI不为该角色生成回复
if (userIdentity?.type === 'actor' && userCharacter) {
  systemContent += `
重要：用户身份 - 演绎者模式
用户正在扮演角色：【${userCharacter.name}】
你的职责：
1. 绝对不要为角色"${userCharacter.name}"生成任何对话
2. 只为其他角色生成回应
`
}

// 旁观者模式：用户引导剧情发展
else if (userIdentity?.type === 'observer') {
  systemContent += `
重要：用户身份 - 旁观者模式
用户是旁观者，正在引导和观察故事发展
你的职责：
1. 为所有角色生成自然的对话和行为
2. 根据用户的引导推动剧情
`
}
```

##### Demo 模板系统

```typescript
// src/shared/demoTemplates.ts
export const DEMO_TEMPLATES = {
  'fantasy-tavern': {
    name: '奇幻酒馆',
    worldSetting: '这是一个充满魔法与冒险的世界...',
    characters: [
      { name: '酒馆老板', description: '精明的中年商人...' },
      { name: '吟游诗人', description: '流浪的音乐家...' }
    ]
  },
  // ...
}
```

#### 3.4 最终效果
- 用户可以创建多个独立的主题聊天室
- 每个房间有独立的世界设定和角色列表
- 切换房间时自动加载对应的对话历史
- 支持"演绎者"和"旁观者"两种身份模式
- 内置 6 个 Demo 模板，一键创建示例房间
- 数据本地存储，刷新页面不丢失

---

## 三、核心技术点总结

| 技术点 | 核心价值 | 技术实现 |
|--------|----------|----------|
| 流式输出 | 实时反馈、减少等待焦虑 | OpenAI Stream API + IPC 推送 + 前端回调 |
| 对话 UI | 沉浸式体验、角色区分 | 消息类型渲染 + 智能时间 + 头像系统 |
| 会话管理 | 多房间并行、上下文隔离 | SQLite 外键 + Zustand 状态 + Demo 模板 |

### 核心技术点的新手解释

| 概念 | 一句话解释 |
|------|-----------|
| Stream API | AI 分块返回数据，不是等全部写完再给 |
| IPC | Electron 主进程和渲染进程之间的"对讲机" |
| yield | 函数可以"分多次"返回数据，而不是一次全返回 |
| Zustand | 一个"全局小仓库"，所有组件都能从里面拿数据和改数据 |
| SQLite | 一个本地文件数据库，数据保存在本地，不用联网 |

---

这三个技术点共同构成了 NPC Chat 的核心体验：
- **流式输出**让 AI 对话不再是枯燥的等待
- **对话 UI**让角色扮演更加沉浸
- **会话管理**让多主题并行成为可能