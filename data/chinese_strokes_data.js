/**
 * =========================================================================
 * Rio Chinese - Chữ Hán, 8 Nét Cơ Bản & 7 Quy Tắc Bút Thuận (chinese_strokes_data.js)
 * Cẩm nang nền tảng giải mã cấu trúc chữ Hán cho người bắt đầu từ số 0.
 * =========================================================================
 */

window.CHINESE_STROKES_DATA = {
  // =========================================================================
  // 1. 8 NÉT CƠ BẢN TRONG CHỮ HÁN (BASIC STROKES)
  // =========================================================================
  basicStrokes: [
    {
      id: "st_heng",
      name: "Nét Ngang",
      pinyin: "Héng",
      symbol: "一",
      direction: "Từ trái sang phải (—)",
      desc: "Đặt bút từ bên trái, kéo ngang sang phải dứt khoát, hơi chếch nhẹ lên trên ở cuối nét.",
      examples: [
        { hanzi: "一", pinyin: "yī", vi: "Số 1" },
        { hanzi: "十", pinyin: "shí", vi: "Số 10" },
        { hanzi: "三", pinyin: "sān", vi: "Số 3" }
      ]
    },
    {
      id: "st_shu",
      name: "Nét Sổ",
      pinyin: "Shù",
      symbol: "丨",
      direction: "Từ trên xuống dưới (|)",
      desc: "Đặt bút từ trên cao, kéo thẳng đứng vuông góc xuống dưới, nhấc bút dứt khoát.",
      examples: [
        { hanzi: "十", pinyin: "shí", vi: "Số 10" },
        { hanzi: "中", pinyin: "zhōng", vi: "Ở giữa, Trung Quốc" },
        { hanzi: "工", pinyin: "gōng", vi: "Công việc" }
      ]
    },
    {
      id: "st_pie",
      name: "Nét Phẩy",
      pinyin: "Piě",
      symbol: "丿",
      direction: "Từ trên sang trái dưới (／)",
      desc: "Bắt đầu từ góc trên bên phải, vuốt cong nhẹ lượn sang phía dưới bên trái, nhọn ở đuôi.",
      examples: [
        { hanzi: "八", pinyin: "bā", vi: "Số 8" },
        { hanzi: "人", pinyin: "rén", vi: "Con người" },
        { hanzi: "千", pinyin: "qiān", vi: "Một nghìn" }
      ]
    },
    {
      id: "st_na",
      name: "Nét Mác",
      pinyin: "Nà",
      symbol: "㇏",
      direction: "Từ trên sang phải dưới (＼)",
      desc: "Bắt đầu từ phía trên bên trái, kéo xiên xuống phía dưới bên phải, đuôi nét hơi bè rộng và nhọn ra.",
      examples: [
        { hanzi: "大", pinyin: "dà", vi: "To lớn" },
        { hanzi: "天", pinyin: "tiān", vi: "Trời, ngày" },
        { hanzi: "木", pinyin: "mù", vi: "Cây gỗ" }
      ]
    },
    {
      id: "st_dian",
      name: "Nét Chấm",
      pinyin: "Diǎn",
      symbol: "丶",
      direction: "Chấm tròn nhỏ từ trên xuống (•)",
      desc: "Đặt nhẹ đầu bút, ấn mạnh dần rồi nhấc lên, tạo thành một giọt nước nghiêng sang phải.",
      examples: [
        { hanzi: "六", pinyin: "liù", vi: "Số 6" },
        { hanzi: "太", pinyin: "tài", vi: "Quá, lắm" },
        { hanzi: "小", pinyin: "xiǎo", vi: "Nhỏ, bé" }
      ]
    },
    {
      id: "st_ti",
      name: "Nét Hất",
      pinyin: "Tí",
      symbol: "㇀",
      direction: "Từ dưới hất chếch lên trên phải (／)",
      desc: "Đặt bút từ dưới, ấn nhẹ rồi hất nhanh đầu bút chếch lên phía trên bên phải.",
      examples: [
        { hanzi: "我", pinyin: "wǒ", vi: "Tôi, ta" },
        { hanzi: "冷", pinyin: "lěng", vi: "Lạnh" },
        { hanzi: "地", pinyin: "dì", vi: "Đất đai" }
      ]
    },
    {
      id: "st_zhe",
      name: "Nét Gập",
      pinyin: "Zhé",
      symbol: "𠃍",
      direction: "Gập vuông góc một góc 90 độ (┐)",
      desc: "Kéo ngang rồi gập chuyển hướng vuông góc xuống dưới (hoặc sổ xuống rồi gập sang ngang).",
      examples: [
        { hanzi: "口", pinyin: "kǒu", vi: "Miệng, cái mồm" },
        { hanzi: "日", pinyin: "rì", vi: "Mặt trời, ngày" },
        { hanzi: "四", pinyin: "sì", vi: "Số 4" }
      ]
    },
    {
      id: "st_gou",
      name: "Nét Móc",
      pinyin: "Gōu",
      symbol: "亅",
      direction: "Sổ thẳng rồi móc nhọn lên (亅)",
      desc: "Kéo thẳng xuống dưới, dừng nhẹ rồi bật móc nhọn hướng sang bên trái hoặc bên trên.",
      examples: [
        { hanzi: "小", pinyin: "xiǎo", vi: "Nhỏ" },
        { hanzi: "你", pinyin: "nǐ", vi: "Bạn" },
        { hanzi: "子", pinyin: "zǐ", vi: "Con cái" }
      ]
    }
  ],

  // =========================================================================
  // 2. 7 QUY TẮC BÚT THUẬN KINH ĐIỂN (STROKE ORDER RULES)
  // =========================================================================
  strokeRules: [
    {
      id: "rule_heng_shu",
      title: "1. Ngang trước sổ sau",
      cn: "先横后竖",
      pinyin: "xiān héng hòu shù",
      desc: "Khi hai nét ngang và sổ giao nhau, luôn viết nét ngang trước rồi mới kéo nét sổ thẳng xuống.",
      sampleHanzi: "十",
      samplePinyin: "shí",
      sampleMeaning: "Số 10",
      steps: ["Bước 1: Viết nét ngang (一)", "Bước 2: Viết nét sổ cắt ngang qua (丨) ➔ Thành chữ '十'"]
    },
    {
      id: "rule_pie_na",
      title: "2. Phẩy trước mác sau",
      cn: "先撇后捺",
      pinyin: "xiān piě hòu nà",
      desc: "Nét phẩy sang bên trái viết trước, nét mác sang bên phải viết sau tạo sự cân xứng.",
      sampleHanzi: "八",
      samplePinyin: "bā",
      sampleMeaning: "Số 8",
      steps: ["Bước 1: Nét phẩy bên trái (丿)", "Bước 2: Nét mác bên phải (㇏) ➔ Thành chữ '八'"]
    },
    {
      id: "rule_top_down",
      title: "3. Trên trước dưới sau",
      cn: "从上到下",
      pinyin: "cóng shàng dào xià",
      desc: "Các bộ phận nằm ở tầng trên viết trước, sau đó viết dần xuống các bộ phận ở tầng dưới.",
      sampleHanzi: "三",
      samplePinyin: "sān",
      sampleMeaning: "Số 3",
      steps: ["Ngang trên cùng (一)", "Ngang ở giữa (二)", "Ngang dưới cùng (三)"]
    },
    {
      id: "rule_left_right",
      title: "4. Trái trước phải sau",
      cn: "从左到右",
      pinyin: "cóng zuǒ dào yòu",
      desc: "Các chữ ghép nhiều bộ phận theo chiều ngang, luôn viết nửa bên trái trước rồi viết nửa bên phải.",
      sampleHanzi: "你",
      samplePinyin: "nǐ",
      sampleMeaning: "Bạn (Nhĩ)",
      steps: ["Viết bộ Nhân đứng bên trái (亻)", "Viết phần bên phải (尔) ➔ Thành chữ '你'"]
    },
    {
      id: "rule_outside_in",
      title: "5. Ngoài trước trong sau",
      cn: "从外到内",
      pinyin: "cóng wài dào nèi",
      desc: "Viết khung bao bọc bên ngoài trước, sau đó mới viết các nét nằm gọn bên trong ruột.",
      sampleHanzi: "月",
      samplePinyin: "yuè",
      sampleMeaning: "Mặt trăng / Tháng",
      steps: ["Khung bao ngoài bên trái và trên", "Hai nét ngang nằm gọn bên trong"]
    },
    {
      id: "rule_enter_close",
      title: "6. Vào trước đóng sau",
      cn: "先进入后关门",
      pinyin: "xiān jìnrù hòu guānmén",
      desc: "Tưởng tượng như vào phòng rồi mới đóng cửa: Dựng khung ngoài ➔ Viết ruột bên trong ➔ Đóng nét đáy lại.",
      sampleHanzi: "回",
      samplePinyin: "huí",
      sampleMeaning: "Về, quay lại",
      steps: ["Dựng khung vuông lớn bên ngoài", "Viết ô vuông nhỏ bên trong", "Khép nét ngang đáy đóng cửa lại"]
    },
    {
      id: "rule_middle_sides",
      title: "7. Giữa trước hai bên sau",
      cn: "先中间后两边",
      pinyin: "xiān zhōngjiān hòu liǎngbiān",
      desc: "Với các chữ có trục đối xứng cân bằng hai bên, viết phần sống lưng ở giữa trước, rồi viết hai bên.",
      sampleHanzi: "小",
      samplePinyin: "xiǎo",
      sampleMeaning: "Nhỏ, bé",
      steps: ["Viết nét sổ móc ở chính giữa (亅)", "Chấm phẩy bên trái (丿)", "Chấm bên phải (丶)"]
    }
  ],

  // =========================================================================
  // 3. 20 BỘ THỦ VÀNG CHIẾM 70% CHỮ HÁN THƯỜNG DÙNG (RADICALS)
  // =========================================================================
  goldenRadicals: [
    {
      radical: "亻",
      name: "Bộ Nhân Đứng",
      pinyin: "rén",
      meaning: "Liên quan đến con người, hành vi của con người.",
      sampleWords: "你 (bạn), 他 (anh ấy), 们 (chúng tôi), 住 (ở)"
    },
    {
      radical: "口",
      name: "Bộ Khẩu",
      pinyin: "kǒu",
      meaning: "Liên quan đến cái miệng, ăn uống, lời nói, phát âm.",
      sampleWords: "吃 (ăn), 喝 (uống), 叫 (kêu, tên là), 吗 (hỏi)"
    },
    {
      radical: "氵",
      name: "Bộ Ba Chấm Thủy",
      pinyin: "shuǐ",
      meaning: "Liên quan đến nước, chất lỏng, sông suối, đại dương.",
      sampleWords: "水 (nước), 没 (chưa có), 汉 (hán), 洗 (giặt)"
    },
    {
      radical: "女",
      name: "Bộ Nữ",
      pinyin: "nǚ",
      meaning: "Liên quan đến phụ nữ, phái đẹp, người mẹ, chị em gái.",
      sampleWords: "她 (cô ấy), 妈 (mẹ), 姐 (chị gái), 妹 (em gái), 好 (tốt)"
    },
    {
      radical: "木",
      name: "Bộ Mộc",
      pinyin: "mù",
      meaning: "Liên quan đến cây cối, gỗ, đồ đạc bằng gỗ.",
      sampleWords: "杯 (cốc), 桌 (bàn), 椅子 (ghế), 树 (cây)"
    },
    {
      radical: "忄",
      name: "Bộ Tâm Đứng",
      pinyin: "xīn",
      meaning: "Liên quan đến trái tim, cảm xúc, tâm trạng, suy nghĩ.",
      sampleWords: "快 (nhanh), 慢 (chậm), 忙 (bận rộn), 怕 (sợ)"
    },
    {
      radical: "灬 / 火",
      name: "Bộ Hỏa",
      pinyin: "huǒ",
      meaning: "Liên quan đến lửa, nhiệt độ, nấu nướng nóng bức.",
      sampleWords: "热 (nóng), 烤 (nướng), 然 (nhiên)"
    },
    {
      radical: "钅",
      name: "Bộ Kim",
      pinyin: "jīn",
      meaning: "Liên quan đến kim loại, tiền bạc, đồ sắt bén.",
      sampleWords: "钱 (tiền), 钟 (chuông, đồng hồ), 铁 (sắt)"
    },
    {
      radical: "讠",
      name: "Bộ Ngôn",
      pinyin: "yán",
      meaning: "Liên quan đến lời nói, ngôn ngữ, giao tiếp đối thoại.",
      sampleWords: "语 (ngôn ngữ), 话 (lời nói), 谢 (cảm ơn), 说 (nói)"
    },
    {
      radical: "日",
      name: "Bộ Nhật",
      pinyin: "rì",
      meaning: "Liên quan đến mặt trời, ánh sáng, thời gian, ngày.",
      sampleWords: "明 (sáng sủa, ngày mai), 昨 (hôm qua), 早 (sáng sớm)"
    },
    {
      radical: "月",
      name: "Bộ Nguyệt",
      pinyin: "yuè",
      meaning: "Mặt trăng hoặc liên quan đến thịt, cơ thể người.",
      sampleWords: "朋 (bạn bè), 期 (thời kỳ), 脑 (não), 身体 (thân thể)"
    },
    {
      radical: "艹",
      name: "Bộ Thảo Đầu",
      pinyin: "cǎo",
      meaning: "Liên quan đến cỏ, hoa quả, thực vật, rau xanh.",
      sampleWords: "茶 (trà), 菜 (món ăn, rau), 苹 (táo), 花 (hoa)"
    },
    {
      radical: "辶",
      name: "Bộ Quai Xước",
      pinyin: "chuò",
      meaning: "Liên quan đến bước đi, di chuyển, khoảng cách.",
      sampleWords: "这 (này), 进 (vào), 远 (xa), 近 (gần), 边 (bên)"
    },
    {
      radical: "宀",
      name: "Bộ Miên",
      pinyin: "mián",
      meaning: "Mái nhà che chở, nơi ăn chốn ở, nơi cư trú.",
      sampleWords: "家 (nhà), 字 (chữ viết), 安 (bình an), 定 (ổn định)"
    },
    {
      radical: "饣",
      name: "Bộ Thực",
      pinyin: "shí",
      meaning: "Liên quan đến thức ăn, ăn uống, thực phẩm.",
      sampleWords: "饭 (cơm), 馆 (quán ăn), 饺 (sủi cảo), 饱 (no)"
    },
    {
      radical: "扌",
      name: "Bộ Tài Gảy",
      pinyin: "shǒu",
      meaning: "Liên quan đến bàn tay, hành động dùng tay cầm nắm.",
      sampleWords: "打 (đánh, gọi điện), 找 (tìm, thối tiền), 拿 (cầm, lấy)"
    },
    {
      radical: "⻊",
      name: "Bộ Túc",
      pinyin: "zú",
      meaning: "Liên quan đến đôi chân, chạy nhảy, đi lại.",
      sampleWords: "路 (đường đi), 跳 (nhảy), 跑 (chạy)"
    },
    {
      radical: "目",
      name: "Bộ Mục",
      pinyin: "mù",
      meaning: "Liên quan đến đôi mắt, cái nhìn, sự quan sát.",
      sampleWords: "看 (nhìn, xem), 眼 (mắt), 睛 (tròng mắt)"
    },
    {
      radical: "纟",
      name: "Bộ Mịch",
      pinyin: "mì",
      meaning: "Liên quan đến sợi tơ, vải vóc, may mặc, dệt.",
      sampleWords: "红 (màu đỏ), 绿 (màu xanh), 给 (cho)"
    },
    {
      radical: "门",
      name: "Bộ Môn",
      pinyin: "mén",
      meaning: "Liên quan đến cửa ra vào, cổng chào, lối vào.",
      sampleWords: "问 (hỏi), 间 (phòng), 闭 (đóng cửa)"
    }
  ]
};
