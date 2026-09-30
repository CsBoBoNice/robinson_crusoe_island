# 视频提示词规范（prompts/prompt-spec.md）

> 项目：`robinson_crusoe_island` · 鲁滨逊漂流记·海岛 3D 场景
> 第③步交付物：**每镜一个文件** `prompts/chapter-XX/chXX-s###.md`（如 `prompts/chapter-03/ch03-s001.md`）。
> 结构参考 `skill/MiniMax-AI.h3-prompt-writing`（T2VA 基础模式），但：**内容为中文**（字段保留英文键名，D7）、参考标签**仅 `<Picture N>` / `<Audio N>`**（D6）、旁白用**独立 `<Audio N>`**（D10）。
> 成片**不得出现字幕**（D5），风格为**实拍真人（live-action）**，非卡通、非塑料 3D（D5）。音效**只描述、不实现**（D9）。

---

## 1. 文件模板

```markdown
# chXX-s### · <镜标题>

> **章节**：第 N 章《章名》
> **时间轴**：第 N 年 …（公历 …）｜**场景**：N-x
> **时长**：S.S 秒（≤15）
> **景别 / 运镜**：<景别>｜<运动类型+幅度+速度>
> **人物**：`C-XXX`（外观阶段 `CRU-0X`）
> **参考标签**：<Picture 1> …；<Audio 1> 旁白…

**integrated_multimodal_description**：
[Shot 1] 实拍真人，电影感，……（中文；含逐秒时间轴与切镜 `[Shot 2] At 00:0X.000, ...`）

**overall_soundscape**：
……（中文 1—4 句：环境音/动作音/非语言人声；不含对白与配乐）

**non_diegetic_music**：
……（中文；无则写 N/A）

**参考标签**：
- `<Picture 1>`：……（关键帧/构图锚点说明）
- `<Audio 1>`：旁白音色/文本「……」（若本镜无旁白可省）

**备注**：与原著对应（行号）、与其他镜的衔接。
```

## 2. 写作纪律（承自 H3 规范）

1. **风格开头**：`[Shot 1]` 首句先点明「实拍真人、电影感」及初始构图，再展开。
2. **切镜**：`[Shot 1]` 不加时间戳；后续 `[Shot N] At MM:SS.mmm, the camera cuts to …`（中文写「切至」）。
3. **运镜**：类型 + 幅度 + 速度（如「缓慢推近，小幅度」）；能用运镜解决就不切镜。
4. **对白/旁白**：用稳定说话人编号 `(S1)`；对白 `<d>[中文] ……</d>`；**旁白**固定句式「（画外音旁白）：<d>[中文] ……</d>，同时其嘴唇完全闭合」。
5. **禁字幕**：画面内不出现可读文字；日期/统计/表格一律旁白或画面表达。
6. **参考标签**：只用 `<Picture N>`（关键帧/构图）与 `<Audio N>`（旁白/声音）；**不用** `<Subject N>`/`<Video N>`。
7. **音画对应**：每句都对应可见或可听之物；暴力/食人用中远景/侧写/遮挡（K1）。
8. **时长**：单镜 ≤15 秒；`integrated_multimodal_description` 的时间轴末点须与标注时长一致。

## 3. 命名与索引

- 文件：`chXX-s###.md`，`###` 自 001 递增、每章独立。
- 每章可附 `_index.md`（镜号、标题、时长、景别、对应脚本场景），便于总览与剪辑拼接。

## 4. 与前后工序的衔接

- 内容来源：`script/chapter-XX.md` 的场景与事件。
- 人物/器物/外观：`docs/characters.md`、`docs/crusoe-appearance.md`、`docs/closeup-objects.md`、`docs/species-list.md`。
- 时间轴/天气：`docs/timeline-stages.md`、`code/data/weather/weather-script.js`。
- 决策前提：`docs/script-decisions.md`（禁字幕、旁白优先、暴力尺度、模型+变体）。
