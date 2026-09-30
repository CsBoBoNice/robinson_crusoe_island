# RefForge · 开发笔记（PROJECT_NOTES.md）

> 本文件记录本项目的**实际**架构、关键数值、踩坑与解决办法、以及环境/开发/验收 Checklist。
>
> **维护规则（强制）**：开发中凡遇到新的坑、新约定、解决办法，必须即时写入本文件；需求文档 `REQUIREMENTS.md` 为初步定义，实际实现为准，若与文档不一致需同步回改 `REQUIREMENTS.md`。
>

---

## 1. 项目架构

### 1.1 目录结构（实际）

```
Robinson_Crusoe_prj/
├─ AGENTS.md / REQUIREMENTS.md / PROJECT_NOTES.md
├─ book/                 # 原著中译本（UTF-8, 1370 行）
├─ skill/                # 参考 skill
├─ docs/                 # 【第一步已产出】
│  ├─ species-list.md        # 物种/物体清单（含学名）
│  ├─ closeup-objects.md     # 近景精细物体清单（已列全确认）
│  ├─ characters.md          # 角色清单 C-* + 鲁滨逊穿着（L3）
│  ├─ crusoe-appearance.md   # 鲁滨逊分时间轴外观/须发/穿着（观察者法·中文）
│  ├─ island-layout.md       # 海岛尺寸/地形/地标设计（已确认）
│  ├─ timeline-stages.md     # 时间轴 12 阶段 + 月刻度（已确认）
│  └─ script-decisions.md    # 剧本全部待确认项的推荐结论（已确认）
├─ code/data/weather/
│  └─ weather-script.js      # 【已产出】天气触发数据（window.RC.data.weather）
├─ script/                   # 【第②步已产出】chapter-03.md … chapter-18.md（16 个）
├─ prompts/                  # 【第③步已产出】
│  ├─ prompt-spec.md         # 提示词规范/模板
│  ├─ chapter-03/ … chapter-18/
│  │  ├─ chXX-s###.md        # 每镜一个文件（共 199 镜）
│  │  └─ _index.md           # 每章镜次索引
```

> 剧本模板（强制）：标题 + 引用块（章节/范围/时间轴/跨度/地点/人物/概要）+ 逐场景（时间/地点/人物/环境/内容/心理活动/对白旁白/原著要点）+ 章末（事件清单/人物/环境与物产/原著出处/待确认）。

> 时间轴刻度：**月**（327 个月）；阶段 12 段为次刻度。天气：`code/data/weather/weather-script.js`。

### 1.2 数据流（实际执行顺序）

第一步（文档）：`book` → 逐章抽取 → `docs/*.md`。后续：①物种清单 → ②剧本 → ③提示词 → ④3D 程序（逐步验收）。

### 1.3 关键接口（实际签名）

- 尚未进入代码阶段。编号规则（**已确认**）：`<类别码>-<三字母名码>` + `-<3 位序号>`，类别码 `P/A/O/B/T/C`。角色及专属器物见 `docs/characters.md`。

### 1.4 环境说明（实际）

- 平台 Windows / PowerShell 5.1；书本文件为 **UTF-8**（PowerShell `Select-String` 控制台显示乱码，用 Read 工具读取正常）。
- 尚未验证 Three.js / Theatre.js 的离线非 Module 构建（见 REQUIREMENTS 十一·4）。

---

## 2. 关键数值

- 原著文件：`book/鲁滨逊漂流记 (丹尼尔·笛福,Daniel Defoe).txt`，1370 行 / 544,862 字节。
- 章节行号（1-indexed，供后续快速定位）：
  - 第 3 章 188、第 4 章 262、第 5 章 339、第 6 章 416、第 7 章 496、第 8 章 548、第 9 章 598、第 10 章 669、第 11 章 723、第 12 章 780、第 13 章 831、第 14 章 882、第 15 章 928、第 16 章 1002、第 17 章 1056、第 18 章 1131、第 19 章 1222、第 20 章 1310。
  - 剧本范围：第 3 章末（约 188 行末段）— 第 18 章末（1221 行）。
- 关键时间点：登岛 1659-09-30；第 6 年 1665-11-06 独木舟遇急流；第 23 年见野人火光；第 24 年 5-16 西班牙沉船；第 26—27 年救星期五；第 27 年派西班牙人；1686-12-19 离岛。
- 纬度 9°22′N；距大陆约 40 海里；岛设计尺寸约 24 km(东西) × 13 km(南北)。
- 时长单位：1 里格 ≈ 3 英里 ≈ 4.83 km。

## 3. 问题与解决

> 格式：**现象 / 原因 / 解决办法 / 影响范围 / 是否已回改文档**。
> 仅保留与**当前实现**相关的条目；

- 编号命名冲突：AGENTS.md 代码规范示例为 `plants-oak-01.js`（复数类别+变体两位），REQUIREMENTS 十一·3 举例 `tree-oak-001`。**解决**：先在 `docs/species-list.md` 第 0 节给出草案 `<类别码>-<名码>-<序号>`，待使用者确认后统一；影响：全部模型编号。是否回改文档：暂未（待确认）。
- 原著「企鹅」出现于加勒比海域不合理。**解决**：`species-list.md` 标注存疑，建议以当地海鸟替代。影响：建模。是否回改文档：已在清单注明。


## 4. Checklist

### 4.1 环境

- [ ] Windows 双击 `code/index.html` 离线可运行
- [ ] 无 CDN / 无运行时联网

### 4.2 开发

- [x] ①物种/物体清单（`docs/`）：`species-list.md`、`closeup-objects.md`、`characters.md`、`island-layout.md`、`timeline-stages.md` —— **已产出并确认**
- [x] 天气脚本数据 `code/data/weather/weather-script.js`
- [x] ②剧本（`script/chapter-03.md` … `chapter-18.md`，16 个）—— **已产出，待验收**
- [x] ③提示词（`prompts/`）：`prompt-spec.md` + chapter-03…18，**199 镜 + 15 索引** —— **已产出，待验收**
- [ ] ④3D 程序（`code/`）

### 4.3 验收（第一步）

- [x] `docs/species-list.md` 物种/学名/出处/用途完整，且「补充物种」合理
- [x] `docs/closeup-objects.md` 近景清单**已列全确认**
- [x] `docs/characters.md` 角色清单（C-*）；鲁滨逊及穿着 L3
- [x] `docs/island-layout.md` 岛体尺寸/地标确认（24×13 km、40 海里、原点=城堡、地标坐标确认、远景低精度）
- [x] `docs/timeline-stages.md` 阶段切分 + **月刻度**确认
- [x] 阶段 9 年份推测回填；天气脚本独立至 `code/data/weather/`
- [x] 编号规则确认（`P/A/O/B/T/C` + 三字母名码 + 3 位序号）

### 4.3b 验收（第二步·剧本）

- [x] `script/chapter-03.md` … `chapter-18.md` 共 16 个，覆盖登岛末段→第 18 章
- [x] 每章结构与模板一致（元信息/场景/心理/环境/事件清单/出处）
- [x] 事件与原著一致、无重大遗漏；时间轴/外观阶段/编号与 `docs/` 对齐
- [x] 各章「待确认」已全部按推荐结论回填（`docs/script-decisions.md`，43 项）
- [ ] K1—K3 三项关键项使用者最终拍板（见 `docs/script-decisions.md` §三）

### 4.3c 验收（第三步·提示词）

- [x] `prompts/prompt-spec.md` 规范建立，含 H3 字段与中文写作纪律
- [x] 每镜一文件 `chXX-s###.md`，单镜 ≤15 秒、时间轴末点与时长一致
- [x] 参考标签仅 `<Picture N>`/`<Audio N>`；旁白用独立 `<Audio N>`
- [x] 实拍真人风格、画面无字幕；暴力/食人用中远景/侧写/遮挡
- [x] 覆盖第 3—18 章全部剧本场景（199 镜）
- [ ] 镜数/时长是否需调整（可选：合并或拆分）

### 4.4 复现命令

```powershell
# 查看章节行号定位
Select-String -LiteralPath "book\鲁滨逊漂流记 (丹尼尔·笛福,Daniel Defoe).txt" -Pattern "^第.{1,3}章"
# 查看全部 docs / script
Get-ChildItem docs
Get-ChildItem script
# 统计提示词镜数
(Get-ChildItem prompts -Recurse -Filter "ch*-s*.md").Count
```

