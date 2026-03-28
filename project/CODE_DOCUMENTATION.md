# Goldshell Wallet Imager 代码详细说明文档

## 📚 目录

1. [项目概述](#项目概述)
2. [技术栈介绍](#技术栈介绍)
3. [项目结构总览](#项目结构总览)
4. [核心概念解释](#核心概念解释)
5. [文件详细说明](#文件详细说明)
   - [配置文件](#配置文件)
   - [主进程代码](#主进程代码)
   - [预加载脚本](#预加载脚本)
   - [渲染进程代码](#渲染进程代码)
   - [权限提升模块](#权限提升模块)
6. [数据流程图](#数据流程图)
7. [常见问题解答](#常见问题解答)

---

## 项目概述

### 这个应用是做什么的？

**Goldshell Wallet Imager** 是一个桌面应用程序，它的主要功能是：

1. **下载固件** - 从 Goldshell 服务器下载最新的钱包固件
2. **写入 SD 卡** - 将下载的固件镜像"烧录"（写入）到 MicroSD 卡中
3. **验证完整性** - 烧录完成后验证数据是否正确写入

**简单理解**：就像用电脑把操作系统安装到U盘做启动盘一样，这个应用是把钱包固件安装到 SD 卡里。

### 为什么需要这个应用？

- 普通用户不知道如何使用命令行烧录镜像
- 需要管理员权限才能直接写入磁盘
- 需要自动下载最新固件
- 需要友好的图形界面

---

## 技术栈介绍

### 什么是 Electron？

**Electron** 是一个框架，让你可以用网页技术（HTML、CSS、JavaScript）来开发桌面应用。

**比喻**：想象一下，你在网页上做了一个很漂亮的页面，Electron 就像一个"容器"，把这个网页装进去，变成一个可以独立运行的桌面程序（.exe 文件）。

**Electron 有三个核心部分**：

```
┌─────────────────────────────────────────────────────────────┐
│                      Electron 应用                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐     ┌──────────────────────────────┐  │
│  │   主进程 (Main)   │────│     渲染进程 (Renderer)       │  │
│  │                 │     │                              │  │
│  │  - 管理窗口      │     │  - 显示界面 (Vue)            │  │
│  │  - 访问系统API   │     │  - 处理用户交互              │  │
│  │  - 文件读写      │     │  - 就像普通网页              │  │
│  │  - 网络请求      │     │                              │  │
│  └────────┬────────┘     └──────────────┬───────────────┘  │
│           │                             │                   │
│           │    ┌─────────────────────┐  │                   │
│           └────│  预加载脚本 (Preload) │──┘                   │
│                │                     │                      │
│                │  - 桥梁/中转站       │                      │
│                │  - 安全地暴露API     │                      │
│                └─────────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

### 什么是 Vue.js？

**Vue** 是一个前端框架，用来构建用户界面。它让开发者可以把页面拆分成小组件，更容易管理和复用。

### 什么是 TypeScript？

**TypeScript** 是 JavaScript 的"升级版"，它增加了类型检查。比如你定义一个变量是数字，如果你不小心赋值成字符串，编译时就会报错，帮助你提前发现 bug。

---

## 项目结构总览

```
goldshell-wallet-imager/
│
├── 📁 src/                          # 源代码目录
│   ├── 📁 main/                     # 主进程代码
│   │   └── index.ts                 # 主进程入口文件 ⭐重要
│   │
│   ├── 📁 preload/                  # 预加载脚本
│   │   ├── index.ts                 # 预加载脚本入口 ⭐重要
│   │   └── index.d.ts               # TypeScript 类型声明
│   │
│   └── 📁 renderer/                 # 渲染进程代码（界面）
│       ├── index.html               # HTML 入口
│       └── 📁 src/
│           ├── main.ts              # Vue 应用入口
│           ├── App.vue              # 根组件
│           ├── 📁 components/
│           │   └── GenDisk.vue      # 主要界面组件 ⭐重要
│           ├── 📁 config/
│           │   └── theme.ts         # UI 主题配置
│           ├── 📁 sudo/             # 权限提升相关
│           │   ├── permissions.ts   # 权限管理 ⭐重要
│           │   ├── darwin.ts        # macOS 提权
│           │   ├── linux.ts         # Linux 提权
│           │   ├── tmp.ts           # 临时文件管理
│           │   └── errors.ts        # 错误处理
│           └── 📁 assets/           # 静态资源（图片、CSS）
│
├── 📁 resources/                    # 应用资源
│   └── 📁 public/                   # 公共资源
│
├── 📁 build/                        # 构建资源（图标等）
│
├── package.json                     # 项目配置
├── electron.vite.config.ts          # Vite 构建配置
├── electron-builder.yml             # 打包配置
└── tsconfig.json                    # TypeScript 配置
```

---

## 核心概念解释

### 1. IPC 通信（进程间通信）

在 Electron 中，主进程和渲染进程是分开的，它们之间需要通过 **IPC (Inter-Process Communication)** 来通信。

**比喻**：就像两个人在不同的房间，需要通过对讲机说话。

```
渲染进程（网页）                    主进程（Node.js）
    │                                    │
    │ ──── invoke('get-drives') ────────>│  发送请求
    │                                    │  
    │                               [处理请求]
    │                                    │
    │ <─────── 返回驱动器列表 ────────────│  返回结果
    │                                    │
```

### 2. 镜像烧录是什么？

**镜像（Image）** 是一个完整的磁盘数据副本，包含操作系统、文件系统等所有内容。

**烧录** 就是把这个镜像数据"原封不动"地写入到 SD 卡中，让 SD 卡变成一个可启动的设备。

### 3. 为什么需要管理员权限？

直接写入磁盘设备（如 `/dev/sdb` 或 `\\.\PhysicalDrive1`）是很危险的操作，操作系统为了安全会限制普通用户的访问。所以需要：

- **Windows**: 请求管理员权限
- **macOS**: 使用 sudo 提示输入密码
- **Linux**: 使用 pkexec 或 kdesudo

---

## 文件详细说明

---

### 配置文件

#### 📄 `package.json` - 项目配置文件

这是项目的"身份证"，定义了项目的基本信息和依赖。

```json
{
  "name": "goldshell-wallet-imager",    // 项目名称
  "version": "1.1.0",                   // 版本号
  "description": "...",                 // 项目描述
  "main": "./out/main/index.js",        // 主进程入口（编译后）
  "author": "goldshell.com",            // 作者
  
  "scripts": {                          // 可运行的命令
    "dev": "electron-vite dev",         // 开发模式：npm run dev
    "build": "...",                     // 构建：npm run build
    "build:win": "...",                 // 打包 Windows 版本
    "build:mac": "...",                 // 打包 macOS 版本
    "build:linux": "..."                // 打包 Linux 版本
  },
  
  "dependencies": {                     // 生产环境依赖
    "drivelist": "^12.0.2",             // 获取磁盘列表
    "etcher-image-write": "^9.1.6",     // 写入镜像到磁盘
    "axios": "^1.7.7",                  // HTTP 请求
    "crc-32": "^1.2.2",                 // CRC32 校验
    "naive-ui": "^2.40.3",              // Vue UI 组件库
    "sudo-prompt": "^9.2.1",            // 请求管理员权限
    // ...
  },
  
  "devDependencies": {                  // 开发环境依赖
    "electron": "23.3.13",              // Electron 框架
    "electron-builder": "^24.13.3",     // 打包工具
    "vue": "^3.4.30",                   // Vue 框架
    "typescript": "^5.5.2",             // TypeScript
    // ...
  }
}
```

**新手理解要点**：
- `dependencies` 是程序运行时需要的库
- `devDependencies` 是开发时需要的工具
- `scripts` 里定义了可以用 `npm run xxx` 执行的命令

---

#### 📄 `electron.vite.config.ts` - 构建配置

这个文件告诉 Vite（构建工具）如何编译项目。

```typescript
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 主进程配置
  main: {
    plugins: [externalizeDepsPlugin()]  // 不把 node_modules 打包进去
  },
  
  // 预加载脚本配置
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  
  // 渲染进程配置
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')  // 路径别名，方便引用
      }
    },
    plugins: [vue()]  // 启用 Vue 支持
  }
})
```

**新手理解要点**：
- 这个文件定义了三个部分（main、preload、renderer）分别如何编译
- `alias` 让你可以用 `@renderer/xxx` 代替 `src/renderer/src/xxx`

---

#### 📄 `electron-builder.yml` - 打包配置

这个文件定义了如何把应用打包成可安装的程序。

```yaml
appId: com.goldshell.flash              # 应用唯一标识
productName: Goldshell Wallet Imager    # 显示的产品名称

directories:
  buildResources: build                 # 构建资源目录（图标等）

# Windows 配置
win:
  executableName: goldshell-wallet-imager  # 可执行文件名
  requestedExecutionLevel: requireAdministrator  # ⭐ 要求管理员权限
  icon: build/icon.ico                  # 应用图标
  target:
    - msi                               # 生成 MSI 安装包

# macOS 配置
mac:
  icon: build/icon.icns
  target:
    - dmg                               # 生成 DMG 安装包

# Linux 配置
linux:
  target:
    - deb                               # 生成 DEB 安装包
  category: Utility
```

**新手理解要点**：
- Windows 上设置了 `requireAdministrator`，应用启动就会请求管理员权限
- 不同操作系统用不同的图标格式和安装包格式

---

### 主进程代码

#### 📄 `src/main/index.ts` - 主进程入口（最重要的文件之一）

这个文件是应用的"大脑"，负责：
1. 创建窗口
2. 处理文件下载
3. 执行镜像烧录
4. 与渲染进程通信

让我们分段详细解释：

##### 第一部分：导入模块

```typescript
// Electron 核心模块
import { app, shell, BrowserWindow, ipcMain } from 'electron'

// 路径处理
import { join } from 'path'

// Electron 工具包
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// 应用图标
import icon_linux from '../renderer/src/assets/img/icon.png'
import icon from '../renderer/src/assets/img/icon.ico'

// 获取磁盘列表的库
import drivelist from 'drivelist'

// 操作系统相关
import os from 'os'

// 镜像写入库
import imageWrite from 'etcher-image-write'

// 压缩/解压缩
import zlib from 'zlib'

// 权限管理模块
import * as permissions from '../renderer/src/sudo/permissions'

// 其他 Node.js 模块
import { execSync } from 'child_process'    // 执行系统命令
import { promisify } from 'util'            // 将回调转为 Promise
import { createWriteStream } from 'fs'      // 创建文件写入流
import { pipeline } from 'stream'           // 流处理
import { Readable } from 'stream'           // 可读流
import path from 'path'                     // 路径处理
import fs from 'fs'                         // 文件系统
import crc32 from 'crc-32'                  // CRC32 校验
```

**新手理解要点**：
- `import` 就是引入其他文件或库的功能
- 每个 `import` 后面的名字就是你在代码中使用这个功能时的名称

---

##### 第二部分：IPC 通信处理器

```typescript
// 处理"获取驱动器列表"的请求
ipcMain.handle('get-drives', async () => {
  // drivelist.list() 会返回电脑上所有的磁盘信息
  const drives = await drivelist.list()
  return drives
})
```

**工作原理**：
```
渲染进程调用 window.api.getDrives()
        │
        ↓
通过 IPC 发送 'get-drives' 请求到主进程
        │
        ↓
主进程执行 drivelist.list() 获取磁盘列表
        │
        ↓
返回结果给渲染进程
```

---

##### 第三部分：获取固件信息

```typescript
// 从服务器获取最新固件信息
async function fetchLatestFirmware(url) {
  try {
    // 发送 HTTP GET 请求
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-custom-key': 's^f521zEhAU6*pdG'  // API 密钥（用于身份验证）
      }
    })
    
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error('error')
    }
    
    // 将响应转换为 JSON 格式
    const data = await response.json()
    return data
  } catch (error) {
    console.error('An error occurred in fetchLatestFirmware:', error)
    return { error }
  }
}
```

**新手理解要点**：
- `fetch` 是用来发送网络请求的函数
- `async/await` 是处理异步操作的语法，让异步代码看起来像同步代码
- API 密钥 `x-custom-key` 用于验证请求来源是合法的

---

##### 第四部分：下载文件功能

```typescript
// 将 Web 标准的 ReadableStream 转换为 Node.js 的 Readable 流
const readableStreamToNodeStream = (readableStream: ReadableStream<Uint8Array>): Readable => {
  const reader = readableStream.getReader()
  return new Readable({
    async read() {
      const { done, value } = await reader.read()
      if (done) {
        this.push(null)      // null 表示流结束
      } else {
        this.push(Buffer.from(value))  // 推入数据
      }
    }
  })
}

// 下载文件函数（支持重试）
const downloadFile = async (url: string, dest: string): Promise<void> => {
  let attempt = 0      // 当前尝试次数
  const retries = 3    // 最大重试次数
  
  while (attempt < retries) {
    try {
      // 发送下载请求
      const response = await fetch(url, {
        headers: { 'x-custom-key': 's^f521zEhAU6*pdG' }
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
      }
      
      // 确保目标目录存在
      await ensureDirectoryExists(dest)
      
      // 转换流格式
      const nodeStream = readableStreamToNodeStream(response.body!)
      
      // 创建文件写入流
      const fileStream = createWriteStream(dest)
      
      // 使用管道将数据从网络流传输到文件流
      await streamPipeline(nodeStream, fileStream)
      
      return  // 下载成功，退出函数
    } catch (error) {
      attempt++
      console.error(`Attempt ${attempt} failed:`, error)
      
      if (attempt >= retries) {
        throw new Error(`Failed to download file after ${retries} attempts`)
      }
      
      // 等待 1.5 秒后重试
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }
  }
}
```

**新手理解要点**：
- **流（Stream）** 是一种处理大量数据的方式，不需要把整个文件加载到内存
- **重试机制** 网络不稳定时自动重试，最多 3 次
- `while` 循环 + `try/catch` 实现了优雅的错误处理和重试

---

##### 第五部分：数据校验

```typescript
// 验证烧录后的数据是否正确
const checkvalid = async (img: string, tempfile2: string): Promise<boolean> => {
  try {
    // 读取原始镜像文件
    const data1 = await readFileAsync(img)
    // 计算 CRC32 校验和
    const checksum = crc32.buf(data1)
    
    // 读取从 SD 卡回读的数据
    const data2 = await readFileAsync(tempfile2)
    const checksum2 = crc32.buf(data2)
    
    console.log('原始镜像校验和:', checksum)
    console.log('SD卡数据校验和:', checksum2)
    
    // 比较两个校验和
    if (checksum === checksum2) {
      console.log('镜像验证通过')
      return true
    } else {
      console.log('镜像验证失败')
      return false
    }
  } catch (err) {
    console.error('读取文件错误:', err)
    return false
  }
}
```

**新手理解要点**：
- **CRC32** 是一种校验算法，可以生成一个"指纹"来代表文件内容
- 如果两个文件的 CRC32 相同，说明内容一致
- 这是验证数据是否正确写入的关键步骤

---

##### 第六部分：镜像烧录核心功能

```typescript
async function burnImage(img, dev, devSize, mainWindow) {
  try {
    // 检查输入参数是否有效
    if (!img || !dev || isNaN(devSize)) {
      mainWindow.webContents.send('burn-progress', { 
        type: 'error', 
        error: 'Invalid input parameters' 
      })
      return
    }
    
    // 判断操作系统
    const isMacOrLinux = process.platform === 'darwin' || process.platform === 'linux'
    
    if (isMacOrLinux) {
      // macOS 和 Linux 使用 dd 命令烧录
      const command = ['dd', `if=${img}`, `of=${dev}`, 'bs=4M']
      
      // 需要管理员权限执行
      const elevated = await permissions.elevateCommand(command, {
        applicationName: 'goldshell-wallet-imager',
        env: { /* 环境变量 */ }
      }, command2str)
      
      // 开始读取进度文件
      readProgressFile(mainWindow, img, tempfile2)
      
      if (elevated.cancelled) {
        console.log('用户取消了操作')
        return
      }
    } else {
      // Windows 使用 etcher-image-write 库
      console.log('在 Windows 上写入')
      childwriter_fun(img, dev, devSize, mainWindow)
    }
  } catch (error) {
    console.error('烧录过程出错:', error)
    mainWindow.webContents.send('burn-progress', { type: 'error', error: error })
  }
}
```

**dd 命令解释**：
- `if=源文件` - input file，输入文件（镜像文件）
- `of=目标设备` - output file，输出设备（SD 卡）
- `bs=4M` - block size，每次传输 4MB 数据

---

##### 第七部分：Windows 烧录实现

```typescript
const childwriter_fun = async (img, dev, devSize, mainWindow) => {
  try {
    // 准备镜像描述对象
    let imgDesc: any = {
      stream: fs.createReadStream(img),     // 创建读取流
      size: fs.statSync(img).size           // 获取文件大小
    }
    
    // 如果是 .gz 压缩文件，自动解压
    if (path.extname(img) === '.gz') {
      imgDesc.stream = imgDesc.stream.pipe(zlib.createGunzip())
    }
    
    // 调用 etcher-image-write 库进行写入
    const emitter = imageWrite.write(
      {
        fd: fs.openSync(dev, 'rs+'),  // 打开设备进行读写
        device: dev,
        size: devSize
      },
      imgDesc,
      { check: true }  // 写入后验证
    )
    
    let messageCounter = 0
    
    // 监听写入进度事件
    emitter.on('progress', (state) => {
      messageCounter++
      // 发送进度到渲染进程
      mainWindow.webContents.send('burn-progress', {
        type: 'progress',
        state,
        sequence: messageCounter
      })
    })
    
    // 监听错误事件
    emitter.on('error', (error) => {
      console.error('烧录错误:', error)
      mainWindow.webContents.send('burn-progress', { 
        type: 'error', 
        error: error.message 
      })
    })
    
    // 监听完成事件
    emitter.on('done', (results) => {
      messageCounter++
      mainWindow.webContents.send('burn-progress', {
        type: 'done',
        results,
        sequence: messageCounter
      })
    })
  } catch (error) {
    console.error('烧录过程出错:', error)
    throw error
  }
}
```

**新手理解要点**：
- `EventEmitter` 模式：通过 `.on('事件名', 回调函数)` 来监听事件
- 有三种主要事件：`progress`（进度）、`error`（错误）、`done`（完成）
- 实时向界面报告进度

---

##### 第八部分：创建窗口

```typescript
// 创建加载窗口（显示启动动画）
function createLoadingWindow() {
  const loadingWindow = new BrowserWindow({
    width: 500,
    height: 300,
    resizable: false,        // 不可调整大小
    frame: false,            // 无边框
    show: false,             // 初始不显示
    autoHideMenuBar: true,   // 隐藏菜单栏
    alwaysOnTop: true,       // 始终置顶
    transparent: true,       // 透明背景
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  
  // 加载启动页面
  if (process.env.NODE_ENV === 'development') {
    loadingWindow.loadFile(join(__dirname, '../../resources/public/loading.html'))
  } else {
    loadingWindow.loadFile(join(process.resourcesPath, 'public/loading.html'))
  }
  
  return loadingWindow
}

// 创建主窗口
function createWindow(): void {
  // 防止创建多个窗口
  if (mainWindow) {
    return
  }
  
  // 先显示加载窗口
  const loadingWindow = createLoadingWindow()
  loadingWindow.show()
  
  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 560,
    resizable: false,
    show: false,              // 初始不显示
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),  // 预加载脚本
      sandbox: false,
      contextIsolation: true,    // 上下文隔离（安全特性）
      nodeIntegration: false,    // 禁止在渲染进程使用 Node.js
      devTools: false            // 禁用开发者工具
    }
  })
  
  // 当主窗口准备好后
  mainWindow.on('ready-to-show', () => {
    setTimeout(() => {
      loadingWindow.close()    // 关闭加载窗口
      mainWindow?.show()       // 显示主窗口
    }, 1800)                   // 延迟 1.8 秒（展示加载动画）
  })
  
  // 处理新窗口打开（用系统浏览器打开链接）
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }  // 阻止在应用内打开
  })
  
  // 加载页面
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
```

**新手理解要点**：
- `BrowserWindow` 是 Electron 中创建窗口的类
- `webPreferences` 控制窗口的安全设置
- 先显示加载窗口，等主窗口准备好再切换，提升用户体验

---

##### 第九部分：应用生命周期管理

```typescript
// 确保只有一个应用实例运行
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  // 如果已经有实例在运行，退出新实例
  app.quit()
} else {
  // 当用户尝试打开第二个实例时
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()  // 聚焦到已存在的窗口
    }
  })
  
  // 当 Electron 准备好时
  app.whenReady().then(() => {
    // 设置 Windows 应用 ID
    electronApp.setAppUserModelId('com.electron')
    
    // 监听窗口创建，设置快捷键
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
    
    // 创建窗口
    createWindow()
    
    // macOS 特有：点击 dock 图标时重新创建窗口
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  
  // 所有窗口关闭时退出应用
  app.on('window-all-closed', () => {
    app.quit()
  })
}
```

**新手理解要点**：
- `requestSingleInstanceLock()` 防止用户打开多个应用实例
- 生命周期事件让你在不同阶段执行不同操作

---

### 预加载脚本

#### 📄 `src/preload/index.ts` - 预加载脚本

预加载脚本是连接主进程和渲染进程的"桥梁"。

```typescript
import { ipcRenderer, contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// 定义暴露给渲染进程的 API
const api = {
  // 获取磁盘列表
  getDrives: () => ipcRenderer.invoke('get-drives'),
  
  // 获取固件数据
  fetchData: (url) => ipcRenderer.invoke('fetch-data', { url }),
  
  // 下载并烧录
  downloadAndBurn: (url, drivePath, driveSize) =>
    ipcRenderer.invoke('download-and-burn', { url, drivePath, driveSize }),
  
  // 监听烧录进度
  onBurnProgress: (callback) => 
    ipcRenderer.on('burn-progress', (_event, data) => callback(data)),
  
  // 移除所有监听器
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
}

// 安全地将 API 暴露给渲染进程
if (process.contextIsolated) {
  try {
    // 在 window 对象上创建 electron 和 api 属性
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
```

**新手理解要点**：
- `ipcRenderer.invoke()` 发送请求到主进程，等待响应
- `ipcRenderer.on()` 监听主进程发来的消息
- `contextBridge.exposeInMainWorld()` 安全地将 API 暴露给网页
- 渲染进程可以通过 `window.api.xxx()` 调用这些方法

**为什么需要预加载脚本？**
- 渲染进程（网页）出于安全考虑，不能直接访问 Node.js API
- 预加载脚本在渲染进程加载前执行，可以选择性地暴露安全的 API
- 这是 Electron 的安全最佳实践

---

### 渲染进程代码

#### 📄 `src/renderer/src/main.ts` - Vue 应用入口

这是 Vue 应用的启动文件。

```typescript
import './assets/main.css'        // 导入全局样式

import { createApp } from 'vue'   // 从 Vue 导入 createApp 函数
import App from './App.vue'       // 导入根组件

// 创建 Vue 应用并挂载到 #app 元素
createApp(App).mount('#app')
```

**新手理解要点**：
- `createApp(App)` 创建一个 Vue 应用实例
- `.mount('#app')` 将应用挂载到 HTML 中 id 为 "app" 的元素上

---

#### 📄 `src/renderer/src/App.vue` - 根组件

这是 Vue 应用的根组件。

```vue
<script setup lang="ts">
import GenDisk from './components/GenDisk.vue'   // 导入主界面组件
import { NConfigProvider } from 'naive-ui'       // Naive UI 配置组件
import themeConfig from './config/theme'         // 主题配置
</script>

<template>
  <!-- NConfigProvider 用于配置 UI 组件的主题 -->
  <n-config-provider :theme-overrides="themeConfig" class="background-main">
    <!-- GenDisk 是主界面组件 -->
    <GenDisk />
  </n-config-provider>
</template>

<style>
.background-main {
  display: flex;
  margin: 0;
  padding: 0;
}
</style>
```

**Vue 单文件组件结构**：
- `<script setup>` - JavaScript/TypeScript 逻辑代码
- `<template>` - HTML 模板（界面结构）
- `<style>` - CSS 样式

---

#### 📄 `src/renderer/src/components/GenDisk.vue` - 主界面组件（核心界面）

这是应用的主要界面，代码较长，让我们分部分解释：

##### 模板部分（界面结构）

```vue
<template>
  <div class="main">
    <!-- 遮罩层：当弹窗打开时显示 -->
    <div v-if="isDialogOpen" class="mask"></div>
    
    <!-- 主界面：三个选择块 -->
    <div class="block-container">
      <!-- 第一块：选择设备 -->
      <div class="block">
        <!-- 动态图标：根据状态显示不同图片 -->
        <div class="choose-img" :class="{
          deviceimg: device_bool,                           // 已选择状态
          deviceimghover: !device_bool && hoverDevice,     // 悬停状态
          selectdeviceimg: !device_bool && !hoverDevice    // 默认状态
        }"></div>
        <br />
        <!-- 按钮：点击打开设备选择弹窗 -->
        <button
          :disabled="isDialogOpen"
          class="txtbtn"
          :class="{ active: device_bool, hover: !device_bool && hoverDevice }"
          @click="(show_device = true), (isDialogOpen = true), (hoverDevice = true)"
          @mouseover="hoverDevice = true"
          @mouseleave="hoverDevice = false"
        >
          {{ device_bool && selected_device2 ? selected_device2.name : 'Select device' }}
        </button>
      </div>
      
      <!-- 第二块：选择驱动器（SD卡） -->
      <div class="block">
        <!-- ... 类似结构 -->
      </div>
      
      <!-- 第三块：烧录按钮 -->
      <div class="block">
        <button
          :disabled="isDialogOpen || !device_bool || !drive_bool"
          @click="handleDownloadAndBurn"
        >
          Flash
        </button>
      </div>
    </div>
    
    <!-- 各种弹窗对话框 -->
    <!-- 设备选择弹窗 -->
    <dialog v-show="show_device" class="d-dialog">
      <!-- ... -->
    </dialog>
    
    <!-- 驱动器选择弹窗 -->
    <dialog v-show="show_drive" class="d-dialog">
      <!-- ... -->
    </dialog>
    
    <!-- 烧录进度弹窗 -->
    <dialog v-show="show_burn" class="d-dialog">
      <n-progress :percentage="burnProgress" />
    </dialog>
    
    <!-- 完成弹窗 -->
    <dialog v-show="show_burn_complete" class="f-dialog">
      <!-- ... -->
    </dialog>
    
    <!-- 错误弹窗 -->
    <dialog v-show="show_burn_error" class="f-dialog">
      <!-- ... -->
    </dialog>
  </div>
</template>
```

**新手理解要点**：
- `v-if` / `v-show` 控制元素是否显示
- `:class` 动态绑定 CSS 类名
- `@click` 绑定点击事件
- `@mouseover` / `@mouseleave` 绑定鼠标移入/移出事件
- `{{ }}` 显示变量的值

---

##### 脚本部分（逻辑代码）

```typescript
<script setup lang="ts">
import { NProgress, NButton, NCheckbox, NPopover } from 'naive-ui'
import { ref, watch } from 'vue'

// ============ 状态变量定义 ============

// ref() 创建响应式变量，当值改变时界面会自动更新
const device_bool = ref(false)   // 是否已选择设备
const drive_bool = ref(false)    // 是否已选择驱动器
const flash_bool = ref(false)    // 是否烧录成功

// 悬停状态
const hoverDevice = ref(false)
const hoverDrive = ref(false)
const hoverFlash = ref(false)

// 弹窗显示状态
const show_device = ref(false)      // 设备选择弹窗
const show_drive = ref(false)       // 驱动器选择弹窗
const show_burn = ref(false)        // 烧录进度弹窗
const show_burn_complete = ref(false)  // 完成弹窗
const show_burn_error = ref(false)     // 错误弹窗

// 烧录进度 (0-100)
const burnProgress = ref(0)

// ============ 数据类型定义 ============

// 设备信息的类型定义
interface DeviceInfo {
  id: number
  name: string
  imageSrc: string
  clickimageSrc: string
  url: string
}

// 驱动器信息的类型定义
interface DriveInfo {
  desc: string       // 描述
  dev: string        // 设备路径 (如 /dev/sdb)
  size: number       // 大小（字节）
  sizeUI: string     // 显示用的大小 (如 "16 GB")
  path: string       // 挂载路径
  customid: string   // 唯一标识
}

// 选中的设备和驱动器
const selected_device2 = ref<DeviceInfo | null>(null)
const selected_drive2 = ref<DriveInfo | null>(null)

// ============ 设备列表 ============

// 支持的设备列表（目前只有一个）
const devices = ref([
  {
    id: 1,
    name: 'Goldshell Wallet',
    imageSrc: img1,
    clickimageSrc: img1_click,
    url: 'https://api-wallet.goldshell.com/api/firmware/lastest'
  }
])

// ============ 核心功能函数 ============

// 处理下载和烧录
async function handleDownloadAndBurn() {
  // 重置状态
  show_burn_complete.value = false
  show_burn_error.value = false
  
  try {
    if (selected_drive2.value !== null && selected_device2.value !== null) {
      // 显示下载进度弹窗
      show_download.value = true
      isDialogOpen.value = true
      burnProgress.value = 0  // 重置进度
      
      // 移除之前的监听器（避免重复监听）
      if (window['api'].removeAllListeners) {
        window['api'].removeAllListeners('burn-progress')
      }
      
      // 监听烧录进度
      window['api'].onBurnProgress((progress) => {
        if (progress.type === 'success1') {
          // 获取固件信息成功
          console.log('获取固件成功')
        } else if (progress.type === 'success2') {
          // 下载完成，开始烧录
          show_download.value = false
          show_burn.value = true
        } else if (progress.type === 'progress') {
          // 更新进度条
          burnProgress.value = Math.min(burnProgress.value + 18, 99.99)
        } else if (progress.type === 'error') {
          // 烧录失败
          show_burn.value = false
          show_burn_error.value = true
        } else if (progress.type === 'done') {
          // 烧录完成
          burnProgress.value = 100
          show_burn.value = false
          show_burn_complete.value = true
        }
      })
      
      // 调用主进程的下载和烧录功能
      await window['api'].downloadAndBurn(
        selected_device2.value.url,        // 固件下载地址
        selected_drive2.value.dev,         // SD卡设备路径
        selected_drive2.value.size         // SD卡大小
      )
    }
  } catch (error) {
    console.error('烧录过程出错:', error)
  }
}

// 获取驱动器列表
async function getDriveslist() {
  try {
    // 调用主进程获取所有驱动器
    const drives = await window['api'].getDrives()
    
    const genlist: DriveInfo[] = []
    for (let i = 0; i < drives.length; i++) {
      // 只显示可移动设备（U盘、SD卡等）
      if (drives[i].isRemovable && !drives[i].isVirtual && drives[i].size > 0) {
        genlist.push({
          desc: drives[i].description || 'Unknown',
          dev: drives[i].device,
          size: drives[i].size,
          sizeUI: filesize(drives[i].size),  // 转换为可读格式
          path: drives[i].mountpoints?.[0]?.path || 'Unknown',
          customid: /* 生成唯一ID */
        })
      }
    }
    return genlist
  } catch (error) {
    console.error('获取驱动器列表失败:', error)
    return []
  }
}

// ============ 监听器 ============

// 监听驱动器列表变化（检测 SD 卡插拔）
watch(drives, (newVal, oldVal) => {
  if (oldVal.length > 0 && newVal.length !== oldVal.length) {
    // 驱动器数量变化，重置选择
    selected_drive2.value = null
    drive_bool.value = false
    flash_bool.value = false
  }
})
</script>
```

**新手理解要点**：
- `ref()` 创建响应式变量，界面会自动响应变量的变化
- `window['api']` 是预加载脚本暴露的 API
- `watch()` 监听变量变化，自动执行回调函数

---

#### 📄 `src/renderer/src/config/theme.ts` - 主题配置

定义 UI 组件的颜色和样式。

```typescript
import type { GlobalThemeOverrides } from 'naive-ui'

export default {
  common: {
    primaryColor: '#fac230FF',    // 主色调（金色）
    loadingColor: '#fac230FF',    // 加载指示器颜色
  },
  Button: {
    color: '#fac230FF',
    colorPrimary: '#fac230FF',
    colorHoverPrimary: '#fac230FF',
    // ... 更多按钮样式
  },
  Checkbox: {
    sizeLarge: '30px',
    colorChecked: '#fac230FF',    // 选中时的颜色
    borderChecked: '1px solid #fac230FF',
  },
} as GlobalThemeOverrides
```

**新手理解要点**：
- 这是 Naive UI 组件库的主题定制
- `#fac230FF` 是十六进制颜色代码（金黄色）
- 通过这个配置，所有按钮、复选框等都使用统一的颜色风格

---

### 权限提升模块

这组文件处理在不同操作系统上获取管理员权限的问题。

#### 📄 `src/renderer/src/sudo/permissions.ts` - 权限管理

```typescript
import { spawn, exec } from 'child_process'
import * as os from 'os'
import * as semver from 'semver'

import { sudo as darwinSudo } from './darwin'
import { sudo as linuxSudo } from './linux'

// Unix 超级用户的 ID
const UNIX_SUPERUSER_USER_ID = 0

// 检查当前是否有管理员权限
export async function isElevated(): Promise<boolean> {
  if (os.platform() === 'win32') {
    // Windows：尝试执行需要管理员权限的命令
    try {
      await execAsync('net session')
    } catch (error) {
      if (error.code === os.constants.errno.EPERM) {
        return false  // 没有权限
      }
      throw error
    }
    return true
  }
  // macOS/Linux：检查用户 ID 是否为 0
  return process.geteuid!() === UNIX_SUPERUSER_USER_ID
}

// 生成启动脚本
export function createLaunchScript(
  command: string,
  argv: string[],
  environment: _.Dictionary<string | undefined>,
): string {
  const isWindows = os.platform() === 'win32'
  const lines: string[] = []
  
  if (isWindows) {
    lines.push('chcp 65001')  // 切换到 UTF-8 编码
  }
  
  // 添加环境变量
  const [setEnvVarFn, escapeFn] = isWindows
    ? [setEnvVarCmd, escapeParamCmd]
    : [setEnvVarSh, escapeSh]
  
  lines.push(..._.map(environment, setEnvVarFn))
  
  // 添加命令
  const commandLine = [command, ...argv.map(escapeFn)].join(' ')
  lines.push(commandLine)
  
  return lines.join(os.EOL)
}

// 提升权限执行命令
export async function elevateCommand(
  command: string[],
  options: { env: any; applicationName: string },
  command2str: string
): Promise<{ cancelled: boolean }> {
  // 如果已经有权限，直接执行
  if (await isElevated()) {
    spawn(command[0], command.slice(1), { env: options.env })
    return { cancelled: false }
  }
  
  // 创建启动脚本
  const launchScript = createLaunchScript(command[0], command.slice(1), options.env)
  
  // 创建临时文件并执行
  return await withTmpFile(
    { keepOpen: false, prefix: 'goldshell-wallet-imager-', postfix: '.sh' },
    async ({ path }) => {
      await fs1.writeFile(path, launchScript)
      
      // 根据操作系统选择提权方式
      const isMacOS = os.platform() === 'darwin' && 
                      semver.compare(os.release(), '19.0.0') >= 0
      
      return isMacOS
        ? elevateScriptCatalina(path, command2str)   // macOS Catalina+
        : elevateScriptUnix(path, options.applicationName, command2str)  // Linux
    }
  )
}
```

**新手理解要点**：
- 不同操作系统获取管理员权限的方式不同
- 需要创建临时脚本文件来执行命令
- `spawn` 用于启动子进程执行命令

---

#### 📄 `src/renderer/src/sudo/darwin.ts` - macOS 提权

```typescript
import { spawn } from 'child_process'
import { join } from 'path'
import { env } from 'process'

const SUCCESSFUL_AUTH_MARKER = 'AUTHENTICATION SUCCEEDED'

// 获取密码提示脚本路径
function getAskPassScriptPath(): string {
  if (process.env.NODE_ENV === 'development') {
    return join(__dirname, '../../resources/public/sudo-askpass.osascript-en.js')
  }
  return join(process.resourcesPath, 'public/sudo-askpass.osascript-en.js')
}

// macOS 上以管理员权限执行命令
export async function sudo(command: string): Promise<{ cancelled: boolean }> {
  try {
    // 使用 sudo --askpass 方式执行
    // SUDO_ASKPASS 指定一个脚本来弹出密码输入框
    const elevateProcess = spawn(
      'sudo',
      ['--askpass', 'sh', '-c', `echo ${SUCCESSFUL_AUTH_MARKER} && ${command}`],
      {
        env: {
          PATH: env.PATH,
          SUDO_ASKPASS: getAskPassScriptPath(),  // 密码提示脚本
        },
      }
    )
    
    let elevated = 'pending'
    
    // 监听标准输出
    elevateProcess.stdout.on('data', (data) => {
      if (data.toString().includes(SUCCESSFUL_AUTH_MARKER)) {
        elevated = 'granted'   // 认证成功
      } else {
        elevated = 'rejected'  // 认证失败
      }
    })
    
    // 返回 Promise，等待认证结果
    return new Promise((resolve, reject) => {
      const checkElevation = setInterval(() => {
        if (elevated === 'granted') {
          clearInterval(checkElevation)
          resolve({ cancelled: false })
        } else if (elevated === 'rejected') {
          clearInterval(checkElevation)
          resolve({ cancelled: true })
        }
      }, 300)
      
      // 30秒超时
      setTimeout(() => {
        clearInterval(checkElevation)
        reject(new Error('Elevation timeout'))
      }, 30000)
    })
  } catch (error) {
    throw error
  }
}
```

**新手理解要点**：
- macOS 使用 `sudo --askpass` 配合自定义脚本来弹出密码输入框
- 通过检测输出中是否包含特定标记来判断认证是否成功
- 设置了 30 秒超时，防止无限等待

---

#### 📄 `src/renderer/src/sudo/linux.ts` - Linux 提权

```typescript
import { spawn } from 'child_process'
import { access, constants } from 'fs/promises'
import { env } from 'process'

const SUCCESSFUL_AUTH_MARKER = 'AUTHENTICATION SUCCEEDED'

// 检查 Linux 上可用的提权工具
function checkLinuxBinary() {
  return new Promise(async (resolve, reject) => {
    // 按优先级检查这些工具
    const paths = ['/usr/bin/kdesudo', '/usr/bin/pkexec']
    
    for (const path of paths) {
      try {
        // 检查文件是否存在且可执行
        await access(path, constants.X_OK)
        resolve(path)
        return
      } catch (error) {
        continue
      }
    }
    reject('Unable to find pkexec or kdesudo.')
  })
}

// Linux 上以管理员权限执行命令
export async function sudo(
  command: string,
  { name }: { name: string }
): Promise<{ cancelled: boolean }> {
  // 找到可用的提权工具
  const linuxBinary: string = await checkLinuxBinary() as string
  
  const parameters: string[] = []
  
  // 根据不同的提权工具设置参数
  if (/kdesudo/i.test(linuxBinary)) {
    // KDE 环境的 sudo
    parameters.push(
      '--comment',
      `"${name} wants to make changes. Enter your password to allow this."`,
      '-d',  // 不显示命令
      '--'
    )
  } else if (/pkexec/i.test(linuxBinary)) {
    // PolicyKit 的提权工具
    parameters.push('--disable-internal-agent')
  }
  
  // 添加要执行的命令
  parameters.push('/bin/bash')
  parameters.push('-c')
  parameters.push(`echo ${SUCCESSFUL_AUTH_MARKER} && ${command}`)
  
  // 启动提权进程
  const elevateProcess = spawn(linuxBinary, parameters, {
    env: { PATH: env.PATH }
  })
  
  let elevated = ''
  
  // 监听输出判断是否认证成功
  elevateProcess.stdout.on('data', (data) => {
    if (data.toString().includes(SUCCESSFUL_AUTH_MARKER)) {
      elevated = 'granted'
    } else {
      elevated = 'refused'
    }
  })
  
  // 返回 Promise 等待结果
  return new Promise((resolve, reject) => {
    const checkElevation = setInterval(() => {
      if (elevated === 'granted') {
        clearInterval(checkElevation)
        resolve({ cancelled: false })
      } else if (elevated === 'refused') {
        clearInterval(checkElevation)
        resolve({ cancelled: true })
      }
    }, 300)
    
    setTimeout(() => {
      clearInterval(checkElevation)
      reject(new Error('Elevation timeout'))
    }, 30000)
  })
}
```

**新手理解要点**：
- Linux 有多种提权工具：`kdesudo`（KDE）、`pkexec`（通用）
- 程序会自动检测可用的工具
- 原理和 macOS 类似，通过检测输出判断认证结果

---

#### 📄 `src/renderer/src/sudo/tmp.ts` - 临时文件管理

```typescript
import { randomBytes } from 'crypto'
import { promises as fs } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

// 临时文件目录
const TMP_DIR = join(tmpdir(), 'goldshellwalletimager')

// 生成随机文件路径
function randomFilePath(prefix: string, postfix: string): string {
  const randomPart = randomBytes(6).toString('hex')
  return join(TMP_DIR, `${prefix}${randomPart}${postfix}`)
}

// 创建临时文件
export async function tmpFile({
  keepOpen = true,
  prefix = 'tmp-',
  postfix = '.tmp',
}): Promise<{ path: string; fileHandle?: fs.FileHandle }> {
  // 确保临时目录存在
  await createTmpRoot()
  
  let fileHandle
  let path
  
  // 尝试创建文件（最多5次）
  for (let i = 0; i < 5; i++) {
    path = randomFilePath(prefix, postfix)
    try {
      // 'wx+' 表示：创建文件，如果存在则失败
      fileHandle = await fs.open(path, 'wx+')
      break
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }
  }
  
  // 如果不需要保持打开，关闭文件句柄
  if (!keepOpen && fileHandle) {
    await fileHandle.close()
    fileHandle = undefined
  }
  
  return { fileHandle, path }
}

// 使用临时文件执行操作，完成后自动清理
export async function withTmpFile<T>(
  options: TmpFileOptions,
  fn: (result: TmpFileResult) => Promise<T>
): Promise<T> {
  const result = await tmpFile(options)
  try {
    return await fn(result)  // 执行传入的函数
  } finally {
    // 无论成功还是失败，都清理临时文件
    if (options.keepOpen && result.fileHandle) {
      await result.fileHandle.close()
    }
    try {
      await fs.unlink(result.path)  // 删除文件
    } catch (error) {
      // 忽略文件不存在的错误
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  }
}
```

**新手理解要点**：
- 临时文件用于存储启动脚本
- 使用随机名称避免文件名冲突
- `finally` 确保文件使用后被清理

---

#### 📄 `src/renderer/src/sudo/errors.ts` - 错误处理

```typescript
// 人类友好的错误信息
export const HUMAN_FRIENDLY = {
  ENOENT: {
    title: (error) => `找不到文件或目录: ${error.path}`,
    description: () => "你要访问的文件不存在",
  },
  EPERM: {
    title: () => "你没有执行此操作的权限",
    description: () => '请确保你有必要的权限',
  },
  EACCES: {
    title: () => "你没有访问此资源的权限",
    description: () => '请确保你有必要的访问权限',
  },
  ENOMEM: {
    title: () => '系统内存不足',
    description: () => '请确保系统有足够的可用内存',
  },
}

// 创建错误对象
export function createError(options: {
  title: string
  description?: string
  code?: string
}): Error {
  const error = new Error(options.title)
  error.description = options.description
  error.code = options.code
  return error
}

// 创建用户错误（不需要上报的错误）
export function createUserError(options: {
  title: string
  description: string
}): Error {
  return createError({
    ...options,
    report: false  // 标记为不需要上报
  })
}
```

**新手理解要点**：
- 将系统错误代码转换为用户能理解的信息
- 区分系统错误和用户操作错误
- 统一的错误处理方式

---

## 数据流程图

### 完整烧录流程

```
用户点击 "Flash" 按钮
         │
         ↓
┌─────────────────────────────────────────────────────────────────┐
│ [渲染进程] GenDisk.vue                                          │
│                                                                 │
│  handleDownloadAndBurn()                                        │
│         │                                                       │
│         ↓                                                       │
│  window.api.downloadAndBurn(url, drivePath, driveSize)         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ IPC 通信
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│ [主进程] main/index.ts                                          │
│                                                                 │
│  ipcMain.handle('download-and-burn', ...)                      │
│         │                                                       │
│         ↓                                                       │
│  1. 获取固件信息 fetchLatestFirmware(url)                       │
│         │                                                       │
│         ↓ 发送 'success1'                                       │
│  2. 下载固件文件 downloadFile(fileUrl, filePath)                │
│         │                                                       │
│         ↓ 发送 'success2'                                       │
│  3. 烧录镜像                                                    │
│         ├─── Windows: childwriter_fun()                        │
│         │       └── 使用 etcher-image-write 库                 │
│         │                                                       │
│         └─── macOS/Linux: burnImage()                          │
│                 └── 使用 dd 命令 + sudo 提权                   │
│         │                                                       │
│         ↓ 发送 'progress' (多次)                                │
│  4. 验证数据完整性 checkvalid()                                 │
│         │                                                       │
│         ↓ 发送 'done' 或 'error'                                │
└──────────────────────────────┬──────────────────────────────────┘
                               │ IPC 通信
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│ [渲染进程] 更新 UI                                              │
│                                                                 │
│  - success1: 固件信息获取成功                                   │
│  - success2: 显示烧录进度弹窗                                   │
│  - progress: 更新进度条                                         │
│  - done: 显示完成弹窗                                           │
│  - error: 显示错误弹窗                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 常见问题解答

### Q1: 为什么需要管理员权限？

**A**: 直接写入磁盘设备（绕过文件系统）是一种底层操作，可能会导致数据丢失。操作系统为了安全，要求这类操作必须有管理员权限。

### Q2: 为什么 Windows 和 macOS/Linux 使用不同的烧录方式？

**A**: 
- **Windows**: 使用 `etcher-image-write` 库，因为 Windows 的磁盘访问 API 和 Unix 不同
- **macOS/Linux**: 使用 `dd` 命令，这是 Unix 系统的标准磁盘复制工具

### Q3: 什么是 CRC32 校验？

**A**: CRC32 是一种校验算法，可以为任意数据生成一个 32 位的"指纹"。通过比较原始文件和写入后读回的数据的 CRC32 值，可以验证数据是否正确写入。

### Q4: 为什么要分三个进程（主进程、预加载、渲染进程）？

**A**: 这是 Electron 的安全架构：
- **渲染进程**（网页）不能直接访问文件系统等危险 API
- **预加载脚本** 选择性地暴露安全的 API
- **主进程** 执行所有敏感操作

### Q5: 如何添加新的设备支持？

**A**: 在 `GenDisk.vue` 的 `devices` 数组中添加新设备：

```typescript
const devices = ref([
  // 现有设备
  { id: 1, name: 'Goldshell Wallet', url: '...', /* ... */ },
  // 新设备
  { id: 2, name: '新设备名称', url: '新固件URL', imageSrc: '图片', clickimageSrc: '点击图片' }
])
```

### Q6: 为什么下载有重试机制？

**A**: 网络不稳定时下载可能失败。重试机制（最多 3 次，每次间隔 1.5 秒）可以提高下载成功率，改善用户体验。

---

## 结语

这份文档详细介绍了 Goldshell Wallet Imager 的代码结构和实现原理。如果你是新手，建议：

1. 先理解 Electron 的三层架构
2. 学习 Vue.js 的基础语法
3. 了解 async/await 异步编程
4. 尝试运行 `npm run dev` 启动开发环境

如有问题，可以：
- 查看官方文档：[Electron](https://www.electronjs.org/docs) | [Vue](https://vuejs.org/)
- 在代码中添加 `console.log()` 调试
- 使用开发者工具查看网络请求和控制台输出

Happy Coding! 🚀
