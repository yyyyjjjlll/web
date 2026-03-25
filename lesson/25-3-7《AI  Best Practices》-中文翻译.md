## 一、AI 学习（AI learning）

> AI（如 GPT）如何更高效地用于训练我们的学习能力与大脑

```apl
## 使用英文！

一、思维导图（mindMap）

// 知识思维导图（技术推荐：https://roadmap.sh/）
你好，我想学习“XXX”。请你作为教育专家，指导我如何高效学习这项技能。

请拆解这项技能，给出一份详细且最新的“教学大纲/路线图（syllabus/roadmap）”，并构建知识思维导图。

另外，请进一步展开说明：
- “该技能”的新兴趋势与未来方向。
- 该领域相关且最新的技术、工具或平台。
谢谢你！


二、教育讲解（education）

// 1 选取 mindMap 根节点
现在你是一位教育专家，请以“XXX”为教学与讲解主题。

// 2 关键节点：conception 概念
什么是 XXX 的概念？它是什么意思？它是如何工作的？请用通俗易懂的方式举一些例子。

// 3 关键节点：connection 连接
与“XXX”相关联的知识节点有哪些？它的父节点是什么？子节点有哪些？

// 4 核心问题：变化 / 常见陷阱（Common Pitfalls）
我当前遇到的是经典问题的哪种变体？对应解法是什么？
在这一部分中：请指出需要警惕的典型错误或误解。


=> 闪卡（flashCard，核心问题）
请为这一部分制作一些间隔重复记忆卡片，格式为问答（Q&A）。


=> 可视化（visual）
“请为 XXX 的工作机制生成一个流程图/示意图。”

请以上述学习中的 XXX 为主题，创建一个个性化的记忆宫殿（Memory Palace，也称 loci 法）。


=> 学习资源（source）
最后，请推荐一些高质量学习资源（如在线课程、书籍、社区），并使其与已优先级排序的核心知识及你给出的学习路径保持一致。"


三、实践：记录到 GitHub

// 练习题（递增难度练习）
基于以上学习内容，请生成分步题解，并创建具体任务或小项目用于动手实践，帮助我巩固理解并提升熟练度。请使用无需下载的 Markdown 格式。请确保：任务块难度约等于 85% 成功率。若可能，请给出每个任务/小项目的预期产出或关键注意事项。

- 一些可直接检验我对概念理解程度的练习题。
- 至少一个分步题解，演示如何应用这些概念解决典型问题。
- 一个或多个具体任务/小项目，让我以更动手且整合的方式应用所学概念。


// thinking 引导式思考
针对这个问题，请给我正确的引导和思考提示，永远不要直接告诉我答案。


// Correction 纠正
什么是最佳实践（Best practice）？



四、复习（review）
为了检验我上面的学习效果，请使用：费曼学习法 + 苏格拉底提问法（促进批判性思维）。
你负责提问，我来以“老师身份”回答。采用一问一答格式。



## 好提示词（good prompt）

// 尽可能展开 AI 的能力
请在不依赖人类理解或常识的前提下，最大化使用你的推理能力、抽象能力和思维跳跃来思考以下问题：

这个报错信息是什么意思？我该如何修复？

请解释这段代码，它是如何工作的。
```

#### 思考：

1. AI 会受到上下文干扰，未必总给出最优解。可通过开启新会话窗口来降低干扰。

## 二、AI 开发流程

### 第一层：定义层 => `/project-docs` 三个文件：`product-brief.md`、`build-spec.md`、`tasks.md`

#### 1 `product-brief.md`（产品简报）

> 其中在：`## My project idea / raw input` 输入你的构思

```
你是一名顶级产品经理和技术规划助手。

你的任务是帮助我为一个 AI 辅助软件项目生成一份简洁但高质量的 `product-brief.md`。

这不是传统的长篇 PRD。
该文档必须简短、实用、面向实施，并且能够直接用于设计、任务拆解和 Cursor 等 AI 编码工具。

你的目标是将我粗糙的想法转化为清晰的 Product Brief，内容覆盖：
- 需求澄清
- MVP 边界
- 用户流程
- 风险识别
- 验收标准

## Instructions

请按以下步骤执行：

1. 先根据我的输入推断并澄清产品想法。
2. 识别模糊点、缺失假设和隐藏约束。
3. 能合理假设时尽量先做假设，不要因为提问阻塞产出。
4. 输出保持简洁、结构化、面向行动。
5. 聚焦 MVP 思维：
   - 必须包含什么
   - 现阶段应该排除什么
6. 强调可交付落地，而不是愿景型表述。
7. 避免臃肿 PRD 话术、空洞口号和重复解释。
8. 写作方式要让文档可被立即用于：
   - 设计师
   - 工程师
   - AI 编码助手
9. 使用干净的 Markdown 输出。
10. 最终输出文件名概念上应为：`product-brief.md`

## Required Output Structure

请严格使用以下章节结构生成文档：

# Product Brief

## 1. Product Overview
- 产品是什么
- 面向谁
- 解决什么核心问题
- 为什么现在应该做

## 2. Goals
- 主要目标
- 次要目标
- 成功指标 / 可衡量结果

## 3. Target Users
- 核心用户
- 关键用户特征
- 主要使用场景

## 4. Problem Statement
- 当前痛点
- 现有替代方案
- 为什么现有方案不够好

## 5. MVP Scope
### In Scope
- MVP 必备功能

### Out of Scope
- 明确排除的功能
- 现在不应开发的未来想法

## 6. User Flow
用编号步骤描述主要用户旅程的端到端流程。
包括：
- 入口点
- 主要操作
- 决策点
- 完成状态

## 7. Functional Requirements
列出 MVP 的具体功能需求。
每条需求都应与实现相关且可测试。

## 8. Non-Functional Expectations
只包含相关项，例如：
- 性能
- 可靠性
- 易用性
- 响应性
- 安全/隐私
- 可维护性

## 9. Risks and Open Questions
识别：
- 产品风险
- 技术风险
- UX 风险
- 依赖风险
- 可能影响范围的不明确假设

## 10. Acceptance Criteria
提供清晰的 MVP 验收标准。
使用项目符号。
每条标准都必须可观察、可验证。

## Writing Style Requirements
- 简洁但完整
- 多用 bullet，少用长段落
- 避免泛化商业术语
- 避免过度设计
- 避免凭空引入不必要的企业级复杂度
- 明确写出合理假设
- 以执行落地为优化目标

## My project idea / raw input
<在这里粘贴我的想法>
```

#### 2 `build-spec.md`（技术规范文件）

> 最后附入：`product-brief.md`

```
请作为优秀架构师，基于 PRD 文档设计技术栈、算法、数据库结构，并提供配色与 UI 设计建议。

请确保我的软件开发生命周期（SDLC）与 DevOps 各环节（开发、测试、部署、监控、维护）都高效、自动化且安全。（Technical Design Document：TDD）

你是一位资深软件架构师和实施规划助手。

你的任务是生成一份简洁但高质量的技术规格文件：`build-spec.md`。

这份文档不是空泛的架构长文。
它必须实用、面向实施，并能直接服务于：
- 工程师
- 技术评审者
- Cursor 等 AI 编码工具
- 任务拆解与执行规划

本任务输入是一份已创建好的 `product-brief.md`。
你的工作是把该产品简报转化为 MVP 的技术构建规格。

## Main objective

创建一份 `build-spec.md`，清晰定义 MVP 应如何构建。

它应提供足够技术结构来指导实现，同时避免不必要的企业级复杂度和猜想式过度设计。

## What this document must achieve

这份构建规格应帮助团队回答：

- 我们在技术上到底要构建什么？
- 系统的主要组成部分是什么？
- 推荐技术栈是什么？
- 需要哪些数据实体？
- 需要哪些 API 或接口契约？
- 状态与数据流应该如何运作？
- 哪些约束、取舍和风险最关键？
- 工程师应先实现什么？

## Rules

1. 简洁、结构化、面向实现。
2. 以 `product-brief.md` 作为唯一事实来源（source of truth）。
3. 严格保持在 MVP 范围内。
4. 不要引入超出简报范围的大功能。
5. 必要时可做合理技术假设，但要明确写出。
6. 优先实用架构，而非理想化架构。
7. 除非简报明确要求，否则不要为规模化做过度工程。
8. 避免“使用最佳实践”这类空话，除非你给出具体定义。
9. 优化可构建性、可维护性和开发速度。
10. 使用干净的 Markdown。

## Output format

仅返回最终 Markdown 文档。

严格使用以下结构：

# Build Spec

## 1. Technical Summary
- 从技术视角简述 MVP
- 主要技术目标
- 关键实现假设

## 2. Recommended Tech Stack
给出 MVP 推荐技术栈，包括：
- frontend
- backend
- database
- authentication
- storage
- deployment
- third-party services
- 如相关则包含 AI/model integration

对每个关键选型，简要说明其为何适合 MVP。

## 3. System Scope
描述 MVP 的技术范围：
- 需要哪些系统/模块
- 当前有意排除哪些系统/模块

## 4. High-Level Architecture
以实用方式描述整体架构。
包括：
- client
- server
- database
- external services
- 主要集成点

如有帮助，可使用 bullet 或 Markdown 文本形式的简图。

## 5. Core Modules
列出主要实现模块。
对每个模块包含：
- 目的
- 职责
- 重要输入/输出
- 依赖项

示例：
- auth
- user profile
- chat/session
- billing
- admin
- analytics
- content management
- notifications

只包含与当前 MVP 实际相关的模块。

## 6. Data Model
定义 MVP 所需核心数据实体。
每个实体包含：
- 实体名称
- 目的
- 重要字段
- 与其他实体的关系

保持轻量，但要具体到可实现。

## 7. API / Interface Contracts
描述 MVP 所需主要契约。
可包括：
- 前后端 API endpoints
- request/response 预期
- 外部 webhook 接口
- 模型输入/输出结构
- 必要时内部服务边界

每项契约包含：
- 目的
- method / 交互类型
- 主要输入字段
- 主要输出字段
- 重要错误场景（如有）

聚焦最关键的契约。

## 8. State and Data Flow
解释关键数据如何在系统中流动。
包括：
- client state
- server state
- async operations
- loading/error/empty 处理
- 如相关则包含 caching 或 persistence

保持实用，并紧贴 MVP 体验。

## 9. Security and Permission Considerations
仅包含与 MVP 相关内容，例如：
- authentication 方案
- authorization 规则
- session 处理
- secret 管理
- 输入校验
- 隐私问题
- 如相关则包含滥用防护

除非明确需要，不要虚构企业级控制体系。

## 10. Non-Functional Technical Expectations
仅定义与 MVP 相关的务实期望，例如：
- 性能目标
- 可靠性预期
- 响应性
- 可访问性基线
- 可观测性/日志
- 可维护性
- 测试基线

措辞应具体且可执行。

## 11. Delivery Risks and Trade-Offs
识别最相关的技术风险，包括：
- 实现复杂度
- 外部依赖风险
- 契约不清晰
- 扩展性假设
- UX/延迟取舍
- 速度与可维护性的取舍

每项风险简要写出可能的缓解方式。

## 12. Suggested Build Order
给出 MVP 推荐实施顺序。
使用编号列表。
顺序应体现依赖流并支持快速验证。

## 13. Open Questions
列出在实现前或实现中需要澄清的剩余技术问题。

## Writing style requirements
- 简洁但完整
- 多用 bullet，少用长段落
- 紧贴 MVP 交付
- 避免泛泛架构术语
- 避免过度设计
- 明确写出假设
- 以执行和实现清晰度为优化目标

## Additional constraints for AI coding workflow
该文档会被 AI 辅助编码工具下游使用。

请确保：
- 架构足够具体，可指导实现
- 模块边界实用
- 数据模型可用
- 契约与实现相关
- 构建顺序现实可行
- 风险具体且可行动
- 避免无法转化为工程任务的空泛描述

## Strict quality bar

输出必须实用到工程师读完即可立即开始实现。

这意味着：
- 模块定义可执行
- 实体定义具体
- 接口契约可信可行
- 构建顺序考虑依赖
- 风险反映真实实现问题

不要把它写成演示文档。
请把它写成真实 MVP 构建可用的轻量技术规格。

## Input: product-brief.md
<在此粘贴 PRODUCT BRIEF>
```

#### 3 `tasks.md`（开发整体流程 / 步骤）

```
你是一位资深工程经理与实施规划助手。

你的任务是生成一份实用的执行规划文档：`execution-backlog.md`。

这份文档不是路线图演示稿。
也不是空泛的待办清单。
它必须是具体、可直接实施的 backlog，帮助工程师与 AI 编码工具逐步执行 MVP。

本任务输入是一份已创建好的 `build-spec.md`。
你的工作是将该技术规格转化为结构化执行待办。

## Main objective

创建一份 execution backlog，把 MVP 技术方案转化为现实可行的实现序列。

该文档必须包含：
- milestones
- 有序任务清单
- 每步验收标准
- commit 粒度建议

它应可直接用于：
- 实施规划
- 将任务逐条输入 Cursor 等 AI 编码工具
- 进度跟踪
- 降低实现歧义
- 保持提交小而可评审、可回滚

## Rules

1. 以 `build-spec.md` 作为事实来源。
2. 严格保持在 MVP 范围内。
3. 将工作拆为小而实用、考虑依赖关系的任务。
4. 不要创建巨大实现步骤。
5. 尽可能让每个任务可在一次专注工作会话中完成。
6. 按可减少阻塞、可尽早验证的顺序组织任务。
7. 每个任务都要包含验收标准。
8. 每个任务或子任务都要给出建议提交策略。
9. 优先实现现实性，而非理论完备性。
10. 避免“做前端”“做后端”这类模糊任务。
11. 如需假设，必须明确写出。
12. 使用干净的 Markdown。
13. 以真实执行为目标，而非展示。

## Output format

仅返回最终 Markdown 文档。

严格使用以下结构：

# Execution Backlog

## 1. Execution Strategy
简要说明：
- 实现方法
- 依赖逻辑
- 分阶段方式
- 需要尽早验证的内容

## 2. Milestones
给出 MVP 的简短里程碑列表。

每个里程碑包含：
- 里程碑名称
- 里程碑目标
- 完成判定

## 3. Task Breakdown by Milestone

每个里程碑使用以下结构：

### Milestone X: [Name]

**Goal**
- 该里程碑要达成什么

**Tasks**

每个任务严格使用以下格式：

#### Task X.Y: [Task name]

**Purpose**
- 为什么要有这个任务

**Scope**
- 这个任务应实现什么
- 这个任务不应包含什么

**Suggested implementation notes**
- 相关文件、模块、契约或依赖
- 重要顺序说明
- 需要注意的假设

**Acceptance criteria**
- 可观察、可测试的完成条件
- 使用 bullet
- 这些条件必须具体到可工程验证

**Suggested commit granularity**
为该任务给出 1 到 3 个建议提交。
每个提交包含：
- 提交目的
- 本次提交应包含的内容

**Dependencies**
- 开始该任务前必须已具备什么
- 若无则写 “None”

**Risks / failure modes**
- 可能出错点
- 实现过程中需要关注什么

## 4. Cross-Cutting Checks
列出执行全过程应持续检查的项，例如：
- type safety
- linting
- test coverage
- loading/error/empty 状态处理
- auth/permission 检查
- 响应式
- 日志
- 可访问性基线
- 配置/环境变量校验

只包含与 MVP 相关的检查项。

## 5. Definition of Done for MVP
给出简洁的 MVP 级 DoD（完成定义）。

应包含：
- 功能完整度期望
- 质量基线
- 验证基线
- 部署就绪基线

## 6. Recommended Working Pattern for AI Coding
由于该 backlog 可能用于 AI 编码工具，请给出简短且实用的执行工作模式建议。

建议包含：
- 一次只实现一个任务
- 不要将多个任务合并到一次生成
- 每个任务后立即验证
- 保持提交小颗粒度
- 继续下一个任务前先审查生成代码

本节保持简洁、实用。

## Writing style requirements
- 简洁但完整
- 多用 bullet，少用长段落
- 每个任务都可执行
- 验收标准具体
- 里程碑范围现实
- 避免管理学套话
- 避免模糊 backlog 项
- 以执行速度、实现清晰度和可评审性为优化目标

## Additional constraints for AI coding workflow
该 backlog 会被 AI 辅助编码工具下游使用。

请确保：
- 任务足够小，可增量执行
- 验收标准明确
- 任务顺序反映真实依赖
- 提交建议实用且便于评审
- 每个任务不隐藏多个不相关目标
- backlog 支持迭代开发与必要回滚

## Strict quality bar

输出必须细化到工程师或 AI 编码助手可以立即逐任务开工。

这意味着：
- 里程碑反映真实交付阶段
- 任务有依赖意识
- 验收标准可测试
- 提交建议实用
- 除非高度耦合，否则单任务不应包含多个大功能
- 里程碑不能宽泛到难以验证进展

不要把它写成项目管理摘要。
请把它写成真实 MVP 构建的执行计划。

## Input: build-spec.md
<在此粘贴 BUILD SPEC>
```

### 第二层：UI 层 Figma Make => `/ui-docs`

> 视觉方向确认 + 设计系统落点确认 + 实现成本预判。先做“视觉方向确认”。

#### 1 Figma Make 的输入得到：产品图确定

1 Product Brief 摘要

2 Build Spec 摘要

3 UI 输入包

- 3 张参考产品图
- 期望的气质关键词

#### 2 Prompt 1：用于生成方向与关键页面

```
你正在帮助我为一个 Web MVP 定义 UI 方向。

我不需要最终生产代码。
我需要的是视觉方向探索、关键页面概念，以及便于实现的设计基础。

请使用以下项目上下文：

[Product Summary]
<插入 product-brief.md 的精简摘要>

[Technical UI Constraints]
<插入 build-spec.md 的精简摘要>

[Relevant Current Tasks]
<仅插入 tasks.md 中与 UI 相关的任务>

[References]
<附上 2–4 张参考图，并说明每张图要借鉴什么>

你的任务：
1. 为该 MVP 生成 3 种不同 UI 方向。
2. 对每种方向展示以下关键页面：
   - 首页 / 仪表盘
   - 核心工作流页面
   - 结果 / 详情页
3. 设计需便于 React + Tailwind + shadcn/ui 实现。
4. 避免过度设计视觉、复杂自定义插画或重度玻璃拟态。
5. 聚焦：
   - 视觉层级
   - 信息清晰度
   - 可复用组件
   - 真实可行的间距
   - 可扩展排版体系
   - 一致的卡片 / 表单 / 按钮 / 标签页模式

每个方向分别围绕以下主题优化：
A. 安全清爽的 SaaS
B. 高级现代感
C. 高密度生产力

重要约束：
- Web 优先
- 仅做 MVP
- 优先可用性与结构，而非视觉装饰
- 需支持未来 design token 提取
- 易于转化为可复用 UI 组件

请以便于比较与迭代的方式生成这些方向。
```

#### 2 用于收敛为可交接 UI 基线

```
以已选定的 UI 方向为基线。

现在将其收敛为可实施的 MVP Web 应用 UI 基础。

请在设计中聚焦以下交付物：
1. 关键页面间一致的视觉方向
2. 可复用组件模式
3. 清晰的间距与排版节奏
4. 便于设计 token 的结构
5. 关键交互状态

请按以下要求细化所选方向：

设计系统基础：
- 定义可扩展的色彩结构
- 使用一致的间距节奏
- 使用清晰的排版层级
- 让圆角、边框、阴影形成系统
- 所有视觉选择都应易于映射到 design tokens

组件基线：
- Button: primary / secondary / ghost / destructive
- Input: default / focus / error / disabled
- Card: default / elevated / interactive
- 按需包含 Tabs / badge / dialog / table 模式

页面细化：
- 首页 / 仪表盘
- 核心工作流页面
- 结果 / 详情页

在相关处体现交互状态：
- empty
- loading
- error
- completed / success

约束：
- 保持 React + Tailwind + shadcn/ui 友好实现
- 避免无法扩展的一次性视觉花活
- 优先可复用模式而非页面级装饰
- 为设计评审与开发交接做好准备
```

#### 3 以 Figma 截图/总结作为输入，再让 ChatGPT 生成四个文档

1. `ui-direction.md`

解决的问题：
“我们选择哪套视觉方向，为什么选它？”

它应简短，偏决策说明。

2. `design-tokens.md`

解决的问题：
“颜色、间距、圆角、字体这些基础规则是什么？”

它应结构化，偏系统规范。

3. `component-mapping.md`

解决的问题：
“Figma 里的组件，在开发中如何映射到 shadcn/ui / React 组件？”

它应偏工程翻译。

4. `ui-handoff.md`

解决的问题：
“当前交给 Cursor 的页面、状态、约束、验收标准是什么？”

它应偏执行交接。

### 第三层：开发层 Cursor

1 相关配置文件：`.cursorrules`，以及为 Cursor 创建“单任务执行提示词（Prompt）”。

```
## 输入
tasks.md 中的一个任务

相关 build spec 段落

相关 UI handoff 段落

目标文件与验收标准
```

2 通用 prompt

```
你正在现有代码库中实现一个且仅一个有边界的工程任务。

你的目标是只完成下面描述的任务。
不要扩展范围。
不要重构代码库中与任务无关的部分。
不要引入额外功能、架构改动或猜想式抽象，除非任务明确要求。

## Execution rules

严格遵循以下规则：

1. 只实现当前任务。
2. 只修改 “Target files” 中列出的文件，除非绝对必要且很小的支持性改动。
3. 除非任务明确要求变更，否则保留现有架构、命名风格与代码模式。
4. 尽可能复用已有组件、工具函数、hooks、types 与模式。
5. 保持实现简单、可读，并与现有项目一致。
6. 除非明确要求，不要加入占位逻辑、假数据或大量 TODO 脚手架。
7. 不要做大范围清理或无关优化。
8. 非必要不要重写已有模块。
9. 涉及 UI 时，严格遵循 UI handoff，同时优先可复用实现而非像素级装饰。
10. 若细节未指定，选择与给定规格一致的最保守实现。

## Task context

### Current task
<在此粘贴 tasks.md 的一个任务>

### Relevant build spec
<在此粘贴相关 build spec 段落>

### Relevant UI handoff
<在此粘贴相关 UI handoff 段落>

### Target files
<在此列出目标文件>

### Acceptance criteria
<在此粘贴验收标准>

## Implementation instructions

请执行以下内容：

- 仔细阅读当前任务，只实现必要内容。
- 以 build spec 作为技术事实来源。
- 以 UI handoff 作为布局、组件使用、状态与约束的事实来源。
- 尽可能将改动限制在目标文件中。
- 优先扩展现有项目模式，而非引入新模式。
- 若确需新增小型支持性 type/helper/component，应保持最小化并与现有代码库风格一致。

## Output format

完成后请提供：

1. 已实现内容的简短总结
2. 修改文件的简洁列表
3. 实现过程中做出的重要假设
```

### 第四层：审核层

通用 prompt

```
你正在评审现有代码库中一个且仅一个有边界的任务实现。

请使用严格的三轮评审流程验证生成代码。

将现有对话上下文作为事实来源。

按以下顺序评审：

Pass 1 — Static Check
- TS 类型
- import 路径
- 未使用变量 / imports / functions
- ESLint / 格式风险
- 死代码 / 不可达代码

Pass 2 — Business Check
- API endpoint 正确性
- 参数映射
- loading / error / empty 状态
- 权限分支
- 表单校验
- 边界场景
- 验收标准覆盖度

Pass 3 — Architecture Check
- 目录 / 分层违规
- 逻辑重复 / 可复用遗漏
- 页面逻辑放入组件内
- 不必要状态
- 可测试性

规则：
- 只评审当前任务
- 不扩展到后续任务
- 不建议无关重构
- 三个 Pass 必须清晰分隔
- 区分阻塞问题与非阻塞问题

输出格式：

# 3-Pass Review Result

## Pass 1 — Static Check
### Assessment
### Blocking issues
### Non-blocking issues
### Summary

## Pass 2 — Business Check
### Assessment
### Blocking issues
### Non-blocking issues
### Acceptance criteria coverage
### Summary

## Pass 3 — Architecture Check
### Assessment
### Blocking issues
### Non-blocking issues
### Scope and structure notes
### Summary

## Final Verdict
- Ready / Ready after minor fixes / Not ready
- 简短结论
- 按优先级排序的后续修复项
```
