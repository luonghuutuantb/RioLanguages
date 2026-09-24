/**
 * =========================================================================
 * Rio Chinese - Du Lieu Ngu Phap Tieng Trung (chinese_grammar_data.js)
 * 25 Chuyen de Ngu Phap Cot Loi HSK 1-3
 * =========================================================================
 */

window.CHINESE_GRAMMAR_DATA = [
  {
    id: "gr_001", level: "HSK1", icon: "⭐",
    title: "Câu khẳng định cơ bản", subtitle: "S + V + O",
    summary: "Cấu trúc câu đơn giản nhất: chủ ngữ + động từ + tân ngữ. Thứ tự từ giống tiếng Việt.",
    structure: [{ label: "Công thức", formula: "主语 + 动词 + 宾语" }],
    examples: [
      { cn: "我吃饭。", pinyin: "Wǒ chī fàn.", vi: "Tôi ăn cơm." },
      { cn: "她喝水。", pinyin: "Tā hē shuǐ.", vi: "Cô ấy uống nước." },
      { cn: "他学中文。", pinyin: "Tā xué Zhōngwén.", vi: "Anh ấy học tiếng Trung." },
      { cn: "我爱你。", pinyin: "Wǒ ài nǐ.", vi: "Tôi yêu bạn." }
    ],
    notes: "💡 Thứ tự S-V-O giống hệt tiếng Việt! Đây là điểm lợi lớn cho người Việt học tiếng Trung."
  },
  {
    id: "gr_002", level: "HSK1", icon: "❌",
    title: "Phủ định với 不 và 没", subtitle: "Không / Chưa / Không có",
    summary: "不 (bù) phủ định ý muốn, thói quen, tính chất. 没 (méi) phủ định hành động đã xảy ra hoặc sở hữu.",
    structure: [
      { label: "Phủ định thường", formula: "主语 + 不 + 动词/形容词" },
      { label: "Phủ định quá khứ/sở hữu", formula: "主语 + 没(有) + 动词/名词" }
    ],
    examples: [
      { cn: "我不去。", pinyin: "Wǒ bù qù.", vi: "Tôi không đi." },
      { cn: "他不高兴。", pinyin: "Tā bù gāoxìng.", vi: "Anh ấy không vui." },
      { cn: "我没吃饭。", pinyin: "Wǒ méi chī fàn.", vi: "Tôi chưa ăn cơm." },
      { cn: "我没有钱。", pinyin: "Wǒ méiyǒu qián.", vi: "Tôi không có tiền." }
    ],
    notes: "⚠️ Không dùng 不 để phủ định hành động đã xảy ra! Phải dùng 没.\n不吃 = không ăn (nói chung) | 没吃 = chưa ăn (lần này)"
  },
  {
    id: "gr_003", level: "HSK1", icon: "🙋",
    title: "Câu hỏi với 吗 (ma)", subtitle: "Câu hỏi Yes/No",
    summary: "Thêm 吗 vào cuối câu khẳng định để biến thành câu hỏi Yes/No. Không cần đổi thứ tự từ!",
    structure: [{ label: "Công thức", formula: "陈述句 + 吗？" }],
    examples: [
      { cn: "你是中国人吗？", pinyin: "Nǐ shì Zhōngguó rén ma?", vi: "Bạn là người Trung Quốc à?" },
      { cn: "你吃饭了吗？", pinyin: "Nǐ chī fàn le ma?", vi: "Bạn ăn cơm chưa?" },
      { cn: "他喜欢你吗？", pinyin: "Tā xǐhuān nǐ ma?", vi: "Anh ấy thích bạn không?" },
      { cn: "你好吗？", pinyin: "Nǐ hǎo ma?", vi: "Bạn có khỏe không?" }
    ],
    notes: "💡 Trả lời: dùng lại động từ để xác nhận. VD: 是/不是 | 去/不去"
  },
  {
    id: "gr_004", level: "HSK1", icon: "❓",
    title: "Câu hỏi với từ để hỏi", subtitle: "什么/谁/哪里/什么时候/多少",
    summary: "Từ để hỏi đứng ngay vị trí của thông tin cần hỏi — không cần đảo ngữ như tiếng Anh!",
    structure: [
      { label: "什么 — cái gì?", formula: "主语 + 动词 + 什么？" },
      { label: "谁 — ai?", formula: "谁 + 动词？" },
      { label: "哪里 — ở đâu?", formula: "主语 + 在 + 哪里？" },
      { label: "多少/几 — bao nhiêu?", formula: "名词 + 多少钱/几个？" }
    ],
    examples: [
      { cn: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", vi: "Bạn tên là gì?" },
      { cn: "他是谁？", pinyin: "Tā shì shéi?", vi: "Anh ấy là ai?" },
      { cn: "你住在哪里？", pinyin: "Nǐ zhù zài nǎlǐ?", vi: "Bạn sống ở đâu?" },
      { cn: "这个多少钱？", pinyin: "Zhège duōshǎo qián?", vi: "Cái này bao nhiêu tiền?" }
    ],
    notes: "💡 Không cần đảo vị trí! Đặt từ để hỏi đúng vào chỗ cần: 你吃什么？(Bạn ăn gì?)"
  },
  {
    id: "gr_005", level: "HSK1", icon: "🟰",
    title: "Động từ 是 (shì)", subtitle: "Là / To be",
    summary: "是 nối chủ ngữ với danh từ hoặc đại từ. Phủ định dùng 不是.",
    structure: [
      { label: "Khẳng định", formula: "主语 + 是 + 名词" },
      { label: "Phủ định", formula: "主语 + 不是 + 名词" }
    ],
    examples: [
      { cn: "我是越南人。", pinyin: "Wǒ shì Yuènán rén.", vi: "Tôi là người Việt Nam." },
      { cn: "他是我的朋友。", pinyin: "Tā shì wǒ de péngyou.", vi: "Anh ấy là bạn tôi." },
      { cn: "这不是我的书。", pinyin: "Zhè bù shì wǒ de shū.", vi: "Đây không phải sách của tôi." },
      { cn: "你是老师吗？", pinyin: "Nǐ shì lǎoshī ma?", vi: "Bạn có phải là giáo viên không?" }
    ],
    notes: "⚠️ 是 KHÔNG dùng với tính từ! Không nói 我是高 mà phải nói 我很高 (Tôi rất cao)."
  },
  {
    id: "gr_006", level: "HSK1", icon: "📦",
    title: "Động từ 有 (yǒu)", subtitle: "Có / Tồn tại",
    summary: "有 có hai nghĩa: (1) Sở hữu; (2) Tồn tại. Phủ định luôn dùng 没有, không dùng 不有!",
    structure: [
      { label: "Sở hữu", formula: "主语 + 有 + 名词" },
      { label: "Tồn tại", formula: "地点 + 有 + 名词" },
      { label: "Phủ định", formula: "主语 + 没有 + 名词" }
    ],
    examples: [
      { cn: "我有一本书。", pinyin: "Wǒ yǒu yī běn shū.", vi: "Tôi có một quyển sách." },
      { cn: "桌子上有一杯水。", pinyin: "Zhuōzi shàng yǒu yī bēi shuǐ.", vi: "Trên bàn có một ly nước." },
      { cn: "他没有时间。", pinyin: "Tā méiyǒu shíjiān.", vi: "Anh ấy không có thời gian." },
      { cn: "这里有人吗？", pinyin: "Zhèlǐ yǒu rén ma?", vi: "Ở đây có người không?" }
    ],
    notes: "⚠️ Phủ định của 有 là 没有, tuyệt đối KHÔNG dùng 不有!\n💡 地点 + 有 = tồn tại: 教室里有很多学生"
  },
  {
    id: "gr_007", level: "HSK1", icon: "🔢",
    title: "Lượng từ (量词)", subtitle: "Từ đếm đi kèm danh từ",
    summary: "Tiếng Trung bắt buộc dùng lượng từ khi đếm. Mỗi loại vật có lượng từ riêng.",
    structure: [{ label: "Công thức", formula: "数词 (Số) + 量词 + 名词" }],
    examples: [
      { cn: "一个人", pinyin: "yī gè rén", vi: "một người (个 — người, đồ vật)" },
      { cn: "两本书", pinyin: "liǎng běn shū", vi: "hai quyển sách (本 — sách, vở)" },
      { cn: "三张纸", pinyin: "sān zhāng zhǐ", vi: "ba tờ giấy (张 — thứ phẳng)" },
      { cn: "一只猫", pinyin: "yī zhī māo", vi: "một con mèo (只 — động vật nhỏ)" },
      { cn: "两杯咖啡", pinyin: "liǎng bēi kāfēi", vi: "hai ly cà phê (杯 — ly)" }
    ],
    notes: "📊 Phổ biến nhất: 个(người,vật) | 本(sách) | 张(phẳng) | 只(động vật nhỏ) | 条(dài) | 块(tiền)"
  },
  {
    id: "gr_008", level: "HSK2", icon: "✅",
    title: "Trợ từ 了 (le) — Hoàn thành", subtitle: "Hành động đã xảy ra/hoàn thành",
    summary: "了 đặt sau động từ chỉ hành động đã hoàn thành. Không phải lúc nào cũng là quá khứ.",
    structure: [
      { label: "Đã làm xong", formula: "主语 + 动词 + 了 + 宾语" },
      { label: "Phủ định (bỏ 了)", formula: "主语 + 没 + 动词 + 宾语" }
    ],
    examples: [
      { cn: "我吃了饭。", pinyin: "Wǒ chī le fàn.", vi: "Tôi đã ăn cơm rồi." },
      { cn: "他买了一本书。", pinyin: "Tā mǎi le yī běn shū.", vi: "Anh ấy đã mua một quyển sách." },
      { cn: "我没吃饭。", pinyin: "Wǒ méi chī fàn.", vi: "Tôi chưa ăn cơm." },
      { cn: "下雨了！", pinyin: "Xià yǔ le!", vi: "Trời mưa rồi!" }
    ],
    notes: "💡 Hai loại 了: ① V+了 = hoàn thành hành động | ② Câu+了 = thay đổi trạng thái"
  },
  {
    id: "gr_009", level: "HSK2", icon: "🕰️",
    title: "Trợ từ 过 (guò) — Kinh nghiệm", subtitle: "Đã từng (có kinh nghiệm)",
    summary: "过 chỉ kinh nghiệm đã trải qua trong cuộc đời. Phủ định dùng 没 + V + 过.",
    structure: [
      { label: "Đã từng", formula: "主语 + 动词 + 过 + 宾语" },
      { label: "Phủ định", formula: "主语 + 没 + 动词 + 过 + 宾语" }
    ],
    examples: [
      { cn: "我去过北京。", pinyin: "Wǒ qù guò Běijīng.", vi: "Tôi đã từng đến Bắc Kinh." },
      { cn: "你吃过北京烤鸭吗？", pinyin: "Nǐ chī guò Běijīng kǎoyā ma?", vi: "Bạn đã từng ăn vịt quay Bắc Kinh chưa?" },
      { cn: "我没去过中国。", pinyin: "Wǒ méi qù guò Zhōngguó.", vi: "Tôi chưa từng đến Trung Quốc." },
      { cn: "他学过越南语。", pinyin: "Tā xué guò Yuènányǔ.", vi: "Anh ấy đã từng học tiếng Việt." }
    ],
    notes: "💡 了 vs 过: 了 = vừa hoàn thành | 过 = kinh nghiệm cuộc đời\n我吃了 (tôi đã ăn xong) | 我吃过 (tôi đã từng ăn)"
  },
  {
    id: "gr_010", level: "HSK2", icon: "🔄",
    title: "Trợ từ 着 (zhe) — Tiếp diễn", subtitle: "Đang / Trạng thái duy trì",
    summary: "着 chỉ hành động đang diễn ra hoặc trạng thái được duy trì liên tục.",
    structure: [
      { label: "Trạng thái duy trì", formula: "动词 + 着 + (宾语)" },
      { label: "Làm A trong khi làm B", formula: "动词1 + 着 + 动词2" }
    ],
    examples: [
      { cn: "他睡着呢。", pinyin: "Tā shuì zhe ne.", vi: "Anh ấy đang ngủ." },
      { cn: "门开着。", pinyin: "Mén kāi zhe.", vi: "Cửa đang mở (trạng thái mở)." },
      { cn: "她笑着说。", pinyin: "Tā xiào zhe shuō.", vi: "Cô ấy vừa cười vừa nói." },
      { cn: "他站着吃饭。", pinyin: "Tā zhàn zhe chī fàn.", vi: "Anh ấy đứng ăn cơm." }
    ],
    notes: "💡 正在 vs 着: 正在 nhấn mạnh đang xảy ra | 着 nhấn mạnh trạng thái duy trì"
  },
  {
    id: "gr_011", level: "HSK2", icon: "🔗",
    title: "Phó từ 也、都、还、又", subtitle: "Cũng / Đều / Còn / Lại",
    summary: "Các phó từ thường gặp đặt trước động từ.",
    structure: [
      { label: "也 (yě) — cũng", formula: "主语 + 也 + 动词" },
      { label: "都 (dōu) — đều", formula: "主语(số nhiều) + 都 + 动词" },
      { label: "还 (hái) — còn/vẫn", formula: "主语 + 还 + 动词" },
      { label: "又 (yòu) — lại", formula: "主语 + 又 + 动词 + 了" }
    ],
    examples: [
      { cn: "我也去。", pinyin: "Wǒ yě qù.", vi: "Tôi cũng đi." },
      { cn: "我们都喜欢中文。", pinyin: "Wǒmen dōu xǐhuān Zhōngwén.", vi: "Chúng tôi đều thích tiếng Trung." },
      { cn: "他还在学习。", pinyin: "Tā hái zài xuéxí.", vi: "Anh ấy vẫn đang học." },
      { cn: "他又迟到了！", pinyin: "Tā yòu chídào le!", vi: "Anh ấy lại đi trễ rồi!" }
    ],
    notes: "⚠️ 都 đứng sau chủ ngữ: 他们都 ✓ | 都他们 ✗\n💡 再 (tương lai lặp lại) vs 又 (đã lặp lại)"
  },
  {
    id: "gr_012", level: "HSK2", icon: "📍",
    title: "Giới từ chỉ nơi chốn", subtitle: "在、到、从、离、往",
    summary: "Cụm giới từ thường đứng TRƯỚC động từ chính trong tiếng Trung.",
    structure: [
      { label: "在 (zài) — ở", formula: "主语 + 在 + 地点 + 动词" },
      { label: "从...到 — từ...đến", formula: "从 + 地点1 + 到 + 地点2" },
      { label: "离 (lí) — cách", formula: "地点1 + 离 + 地点2 + 远/近" }
    ],
    examples: [
      { cn: "我在图书馆学习。", pinyin: "Wǒ zài túshūguǎn xuéxí.", vi: "Tôi học ở thư viện." },
      { cn: "我从越南来。", pinyin: "Wǒ cóng Yuènán lái.", vi: "Tôi đến từ Việt Nam." },
      { cn: "从学校到家很远。", pinyin: "Cóng xuéxiào dào jiā hěn yuǎn.", vi: "Từ trường đến nhà rất xa." },
      { cn: "我家离公司很近。", pinyin: "Wǒ jiā lí gōngsī hěn jìn.", vi: "Nhà tôi cách công ty rất gần." }
    ],
    notes: "⚠️ Tiếng Việt: Tôi học (ở) thư viện → Tiếng Trung: 我在图书馆学习\nGiới từ + địa điểm đứng TRƯỚC động từ!"
  },
  {
    id: "gr_013", level: "HSK2", icon: "⏰",
    title: "Biểu đạt thời gian", subtitle: "正在、快要、已经、还没",
    summary: "Các phó từ thời gian diễn đạt đang, sắp, đã, chưa.",
    structure: [
      { label: "正在 — đang", formula: "主语 + 正在 + 动词 + 呢" },
      { label: "快要 — sắp", formula: "主语 + 快要 + 动词 + 了" },
      { label: "已经 — đã", formula: "主语 + 已经 + 动词 + 了" },
      { label: "还没 — chưa", formula: "主语 + 还没 + 动词 + 呢" }
    ],
    examples: [
      { cn: "我正在吃饭呢。", pinyin: "Wǒ zhèngzài chī fàn ne.", vi: "Tôi đang ăn cơm." },
      { cn: "他快要来了。", pinyin: "Tā kuài yào lái le.", vi: "Anh ấy sắp đến rồi." },
      { cn: "我已经做完了。", pinyin: "Wǒ yǐjīng zuò wán le.", vi: "Tôi đã làm xong rồi." },
      { cn: "她还没到呢。", pinyin: "Tā hái méi dào ne.", vi: "Cô ấy chưa đến." }
    ],
    notes: "💡 呢 cuối câu nhấn mạnh trạng thái đang diễn ra, giống 'đấy nhé' trong tiếng Việt."
  },
  {
    id: "gr_014", level: "HSK2", icon: "📏",
    title: "So sánh với 比", subtitle: "A 比 B + Tính từ",
    summary: "Cấu trúc so sánh hơn kém. Chú ý thứ tự: A + 比 + B + Tính từ.",
    structure: [
      { label: "Hơn", formula: "A + 比 + B + 形容词" },
      { label: "Kém hơn", formula: "A + 没有 + B + 形容词" },
      { label: "Bằng nhau", formula: "A + 跟 + B + 一样 + 形容词" }
    ],
    examples: [
      { cn: "他比我高。", pinyin: "Tā bǐ wǒ gāo.", vi: "Anh ấy cao hơn tôi." },
      { cn: "今天比昨天冷。", pinyin: "Jīntiān bǐ zuótiān lěng.", vi: "Hôm nay lạnh hơn hôm qua." },
      { cn: "我没有他高。", pinyin: "Wǒ méiyǒu tā gāo.", vi: "Tôi không cao bằng anh ấy." },
      { cn: "我跟你一样高。", pinyin: "Wǒ gēn nǐ yīyàng gāo.", vi: "Tôi cao bằng bạn." }
    ],
    notes: "⚠️ KHÔNG nói 他比我更高 ✗ — Đúng: 他比我高 ✓\n💡 Mức độ: 高多了 (cao hơn nhiều) / 高一点 (cao hơn một chút)"
  },
  {
    id: "gr_015", level: "HSK2", icon: "🎭",
    title: "Trợ từ kết cấu 的/地/得", subtitle: "Ba de — Bổ ngữ danh từ / Trạng ngữ / Mức độ",
    summary: "Ba chữ đồng âm de dùng khác nhau: 的 bổ danh từ, 地 bổ động từ, 得 chỉ mức độ.",
    structure: [
      { label: "的 — bổ ngữ danh từ", formula: "形容词/名词 + 的 + 名词" },
      { label: "地 — trạng ngữ cách thức", formula: "形容词 + 地 + 动词" },
      { label: "得 — bổ ngữ mức độ", formula: "动词 + 得 + 形容词" }
    ],
    examples: [
      { cn: "漂亮的女孩", pinyin: "piàoliang de nǚhái", vi: "cô gái xinh đẹp" },
      { cn: "认真地学习", pinyin: "rènzhēn de xuéxí", vi: "học tập chăm chỉ" },
      { cn: "他说得很快。", pinyin: "Tā shuō de hěn kuài.", vi: "Anh ấy nói rất nhanh." },
      { cn: "她唱得非常好。", pinyin: "Tā chàng de fēicháng hǎo.", vi: "Cô ấy hát cực kỳ hay." }
    ],
    notes: "💡 Mẹo nhớ: 的→danh từ | 地→động từ | 得→sau động từ chỉ mức độ"
  },
  {
    id: "gr_016", level: "HSK2", icon: "🔧",
    title: "Bổ ngữ kết quả (结果补语)", subtitle: "V + 完/好/到/见/懂/错",
    summary: "Bổ ngữ kết quả đặt sau động từ chỉ kết quả của hành động.",
    structure: [{ label: "Công thức", formula: "动词 + 结果补语" }],
    examples: [
      { cn: "我做完了。", pinyin: "Wǒ zuò wán le.", vi: "Tôi làm xong rồi. (完=xong)" },
      { cn: "他写好了。", pinyin: "Tā xiě hǎo le.", vi: "Anh ấy viết xong rồi. (好=tốt/xong)" },
      { cn: "你听懂了吗？", pinyin: "Nǐ tīng dǒng le ma?", vi: "Bạn nghe hiểu không? (懂=hiểu)" },
      { cn: "我找到了！", pinyin: "Wǒ zhǎo dào le!", vi: "Tôi tìm thấy rồi! (到=được)" }
    ],
    notes: "📊 Phổ biến: 完(xong) | 好(tốt/xong) | 到(được/thấy) | 见(thấy giác quan) | 懂(hiểu) | 错(sai)"
  },
  {
    id: "gr_017", level: "HSK2", icon: "🏃",
    title: "Bổ ngữ hướng (趋向补语)", subtitle: "V + 来/去/上/下/进/出",
    summary: "Chỉ hướng hành động. 来 = về phía người nói, 去 = xa người nói.",
    structure: [
      { label: "Hướng đơn", formula: "动词 + 来/去" },
      { label: "Hướng phức", formula: "动词 + 上/下/进/出/回 + 来/去" }
    ],
    examples: [
      { cn: "他走进来了。", pinyin: "Tā zǒu jìn lái le.", vi: "Anh ấy đi vào (phía này)." },
      { cn: "她跑出去了。", pinyin: "Tā pǎo chū qù le.", vi: "Cô ấy chạy ra ngoài (xa này)." },
      { cn: "请拿上来。", pinyin: "Qǐng ná shàng lái.", vi: "Xin mang lên đây." },
      { cn: "把书拿出去。", pinyin: "Bǎ shū ná chū qù.", vi: "Mang sách ra ngoài đi." }
    ],
    notes: "💡 来=về phía mình, 去=xa mình\n进来(vào phía này) vs 进去(vào phía đó)"
  },
  {
    id: "gr_018", level: "HSK3", icon: "🃏",
    title: "Câu 把 (bǎ cú)", subtitle: "Xử lý / Tác động lên đối tượng",
    summary: "Câu 把 nhấn mạnh chủ thể tác động lên đối tượng. Đối tượng phải xác định và cụ thể.",
    structure: [{ label: "Công thức", formula: "主语 + 把 + 宾语 + 动词 + 补语/其他" }],
    examples: [
      { cn: "我把书放在桌子上。", pinyin: "Wǒ bǎ shū fàng zài zhuōzi shàng.", vi: "Tôi đặt quyển sách lên bàn." },
      { cn: "他把饭吃完了。", pinyin: "Tā bǎ fàn chī wán le.", vi: "Anh ấy ăn hết cơm rồi." },
      { cn: "请把门关上。", pinyin: "Qǐng bǎ mén guān shàng.", vi: "Xin hãy đóng cửa lại." },
      { cn: "我把作业做完了。", pinyin: "Wǒ bǎ zuòyè zuò wán le.", vi: "Tôi đã làm xong bài tập rồi." }
    ],
    notes: "⚠️ Điều kiện: ①Đối tượng phải xác định ②V phải có bổ ngữ ③Không dùng với: 是、有、喜欢"
  },
  {
    id: "gr_019", level: "HSK3", icon: "🫸",
    title: "Câu bị động với 被 (bèi)", subtitle: "Bị làm bởi",
    summary: "被 chỉ hành động bị tác động. Thường mang hàm ý tiêu cực.",
    structure: [
      { label: "Có施事者", formula: "受事 + 被 + 施事者 + 动词 + 其他" },
      { label: "Không có施事者", formula: "受事 + 被 + 动词 + 其他" }
    ],
    examples: [
      { cn: "我的钱包被偷了。", pinyin: "Wǒ de qiánbāo bèi tōu le.", vi: "Ví của tôi bị trộm mất rồi." },
      { cn: "他被老师批评了。", pinyin: "Tā bèi lǎoshī pīpíng le.", vi: "Anh ấy bị thầy giáo phê bình." },
      { cn: "书被他拿走了。", pinyin: "Shū bèi tā ná zǒu le.", vi: "Sách bị anh ấy lấy đi rồi." },
      { cn: "玻璃被打破了。", pinyin: "Bōli bèi dǎ pò le.", vi: "Tấm kính bị đập vỡ rồi." }
    ],
    notes: "💡 被 thường chỉ điều không mong muốn. Dùng 受到 cho hàm ý tốt: 我受到表扬了"
  },
  {
    id: "gr_020", level: "HSK3", icon: "🔗",
    title: "Nhân quả: 因为...所以", subtitle: "Vì... nên...",
    summary: "Cấu trúc nối hai vế thể hiện nguyên nhân - kết quả.",
    structure: [{ label: "Nhân quả", formula: "因为 + Nguyên nhân，所以 + Kết quả" }],
    examples: [
      { cn: "因为下雨，所以我没去。", pinyin: "Yīnwèi xià yǔ, suǒyǐ wǒ méi qù.", vi: "Vì trời mưa nên tôi không đi." },
      { cn: "因为他很努力，所以成功了。", pinyin: "Yīnwèi tā hěn nǔlì, suǒyǐ chénggōng le.", vi: "Vì cố gắng nên anh ấy thành công." },
      { cn: "既然你来了，就吃饭吧。", pinyin: "Jìrán nǐ lái le, jiù chī fàn ba.", vi: "Đã đến rồi thì ăn cơm đi." }
    ],
    notes: "💡 因为...所以 ≈ 'vì...nên' trong tiếng Việt\n⚠️ Có thể dùng chỉ một vế: 因为他忙。| 所以我走了。"
  },
  {
    id: "gr_021", level: "HSK3", icon: "🔀",
    title: "Nhượng bộ: 虽然...但是", subtitle: "Mặc dù... nhưng...",
    summary: "Diễn đạt hai vế tương phản. Vế sau mang thông tin quan trọng hơn.",
    structure: [{ label: "Nhượng bộ", formula: "虽然 + Vế 1，但是/可是 + Vế 2" }],
    examples: [
      { cn: "虽然很贵，但是质量很好。", pinyin: "Suīrán hěn guì, dànshì zhìliàng hěn hǎo.", vi: "Mặc dù đắt nhưng chất lượng rất tốt." },
      { cn: "虽然他很忙，但他还是来了。", pinyin: "Suīrán tā hěn máng, dàn tā háishi lái le.", vi: "Mặc dù rất bận nhưng anh ấy vẫn đến." },
      { cn: "尽管下雨，他还是去了。", pinyin: "Jǐnguǎn xià yǔ, tā háishi qù le.", vi: "Dù trời mưa, anh ấy vẫn đi." }
    ],
    notes: "💡 虽然 = mặc dù | 但是/可是 = nhưng\n尽管 (mạnh hơn) = dù cho/cho dù"
  },
  {
    id: "gr_022", level: "HSK3", icon: "🔮",
    title: "Điều kiện: 如果...就", subtitle: "Nếu... thì...",
    summary: "Diễn đạt điều kiện và kết quả. 就 ở vế sau làm câu tự nhiên hơn.",
    structure: [
      { label: "Điều kiện thường", formula: "如果 + Điều kiện，就 + Kết quả" },
      { label: "Điều kiện tối thiểu", formula: "只要 + Điều kiện，就 + Kết quả" }
    ],
    examples: [
      { cn: "如果你来，我就高兴。", pinyin: "Rúguǒ nǐ lái, wǒ jiù gāoxìng.", vi: "Nếu bạn đến, tôi sẽ vui." },
      { cn: "如果明天下雨，我就不去了。", pinyin: "Rúguǒ míngtiān xià yǔ, wǒ jiù bù qù le.", vi: "Nếu ngày mai trời mưa, tôi sẽ không đi." },
      { cn: "只要努力，就能成功。", pinyin: "Zhǐyào nǔlì, jiù néng chénggōng.", vi: "Chỉ cần cố gắng là có thể thành công." }
    ],
    notes: "💡 就 ở vế sau giúp câu tự nhiên hơn, đừng bỏ!\n如果你来，我高兴。(cứng) → 如果你来，我就高兴。(tự nhiên)"
  },
  {
    id: "gr_023", level: "HSK3", icon: "🚀",
    title: "Câu liên động (连动句)", subtitle: "V1 rồi V2 cùng chủ ngữ",
    summary: "Hai động từ liên tiếp cùng chủ ngữ. V1 thường chỉ mục đích hoặc cách thức của V2.",
    structure: [{ label: "Công thức", formula: "主语 + V1 + (O1) + V2 + (O2)" }],
    examples: [
      { cn: "我去买东西。", pinyin: "Wǒ qù mǎi dōngxi.", vi: "Tôi đi mua đồ." },
      { cn: "她来找你。", pinyin: "Tā lái zhǎo nǐ.", vi: "Cô ấy đến tìm bạn." },
      { cn: "我用筷子吃饭。", pinyin: "Wǒ yòng kuàizi chī fàn.", vi: "Tôi ăn cơm bằng đũa." },
      { cn: "我坐地铁去上班。", pinyin: "Wǒ zuò dìtiě qù shàngbān.", vi: "Tôi đi tàu điện ngầm đi làm." }
    ],
    notes: "💡 Thứ tự động từ = thứ tự hành động trong thực tế: đi (V1) để mua (V2)"
  },
  {
    id: "gr_024", level: "HSK2", icon: "😲",
    title: "Câu cảm thán", subtitle: "太...了！/ 真...啊！",
    summary: "Cấu trúc cảm thán biểu đạt cảm xúc mạnh. 太...了 là phổ biến nhất.",
    structure: [
      { label: "Quá... rồi!", formula: "太 + 形容词 + 了！" },
      { label: "Thật... thay!", formula: "真 + 形容词 + 啊！" }
    ],
    examples: [
      { cn: "太好了！", pinyin: "Tài hǎo le!", vi: "Tuyệt vời quá!" },
      { cn: "太贵了！", pinyin: "Tài guì le!", vi: "Đắt quá!" },
      { cn: "真漂亮啊！", pinyin: "Zhēn piàoliang a!", vi: "Đẹp thật!" },
      { cn: "多有意思啊！", pinyin: "Duō yǒuyìsi a!", vi: "Thú vị biết bao!" }
    ],
    notes: "💡 太...了 dùng nhiều nhất: 太累了(mệt quá) | 太难了(khó quá) | 太好吃了(ngon quá)"
  },
  {
    id: "gr_025", level: "HSK2", icon: "🔁",
    title: "Lặp từ động từ (动词重叠)", subtitle: "V+V / AA / ABAB",
    summary: "Lặp lại động từ làm nhẹ câu, chỉ hành động thử hoặc ngắn. Rất phổ biến trong khẩu ngữ.",
    structure: [
      { label: "Động từ 1 âm tiết", formula: "V + V (AA) hoặc V + 一 + V" },
      { label: "Động từ 2 âm tiết", formula: "ABAB" }
    ],
    examples: [
      { cn: "看看吧。", pinyin: "Kàn kan ba.", vi: "Xem xem đi / Thử xem." },
      { cn: "你考虑考虑。", pinyin: "Nǐ kǎolǜ kǎolǜ.", vi: "Bạn suy nghĩ suy nghĩ đi." },
      { cn: "我想休息休息。", pinyin: "Wǒ xiǎng xiūxi xiūxi.", vi: "Tôi muốn nghỉ ngơi một chút." },
      { cn: "等一等！", pinyin: "Děng yi děng!", vi: "Chờ một chút!" }
    ],
    notes: "💡 Tác dụng: ①Lịch sự hơn ②Hành động thử ③Giảm áp lực yêu cầu"
  }
];
