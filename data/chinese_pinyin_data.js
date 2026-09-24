/**
 * =========================================================================
 * Rio Chinese - Bính Âm Ngữ Âm Pinyin & 4 Thanh Điệu (chinese_pinyin_data.js)
 * Toàn bộ 21 Thanh Mẫu, 36 Vận Mẫu, 4 Thanh Điệu & Biến Điệu Thực Tế
 * Thiết kế chuẩn xác cho người Việt bắt đầu học từ con số 0.
 * =========================================================================
 */

window.CHINESE_PINYIN_DATA = {
  // =========================================================================
  // 1. THANH MẪU (SHENGMU - 21 PHỤ ÂM ĐẦU)
  // =========================================================================
  shengmu: [
    // --- Nhóm 1: Âm hai môi & Răng môi ---
    {
      id: "sm_b",
      pinyin: "b",
      ipa: "[p]",
      name: "Âm /b/",
      group: "labial",
      groupName: "Âm hai môi",
      viCompare: "Đọc tương tự như âm 'p' nhẹ trong tiếng Việt, không bật hơi, dây thanh không rung.",
      mouthGuide: "Hai môi khép chặt chặn luồng hơi, sau đó mở nhanh ra để hơi thoát ra nhẹ nhàng.",
      trapVi: "Người Việt dễ nhầm thành âm 'b' tiếng Việt (bò, ba). Nhớ phát âm là 'pua' (bàba phát âm là pà-pa).",
      examples: [
        { hanzi: "爸爸", pinyin: "bàba", hanviet: "Ba ba", vi: "Bố, ba" },
        { hanzi: "八", pinyin: "bā", hanviet: "Bát", vi: "Số 8" },
        { hanzi: "杯子", pinyin: "bēizi", hanviet: "Bôi tử", vi: "Cái cốc, cái ly" }
      ]
    },
    {
      id: "sm_p",
      pinyin: "p",
      ipa: "[pʰ]",
      name: "Âm /p/ bật hơi",
      group: "labial",
      groupName: "Âm hai môi bật hơi",
      viCompare: "Giống âm /b/ nhưng BẬT HƠI RẤT MẠNH. Đặt tờ giấy trước miệng thì tờ giấy phải bay lên.",
      mouthGuide: "Hai môi mím chặt, nén luồng hơi trong miệng rồi bật mạnh ra tạo thành tiếng gió xì rõ rệt.",
      trapVi: "Nếu không bật hơi thì người bản xứ sẽ nghe nhầm thành âm 'b'. Hãy tập bật phù hơi dứt khoát.",
      examples: [
        { hanzi: "苹果", pinyin: "píngguǒ", hanviet: "Bình quả", vi: "Quả táo" },
        { hanzi: "朋友", pinyin: "péngyou", hanviet: "Bằng hữu", vi: "Bạn bè" },
        { hanzi: "便宜", pinyin: "piányi", hanviet: "Tiện nghi", vi: "Rẻ, giá cả rẻ" }
      ]
    },
    {
      id: "sm_m",
      pinyin: "m",
      ipa: "[m]",
      name: "Âm /m/",
      group: "labial",
      groupName: "Âm mũi hai môi",
      viCompare: "Hoàn toàn giống âm 'm' trong tiếng Việt (mẹ, mua).",
      mouthGuide: "Hai môi khép lại, luồng hơi thoát ra qua khoang mũi, dây thanh quản rung.",
      trapVi: "Âm này rất tự nhiên và dễ đối với người Việt, phát âm gần như 'mua'.",
      examples: [
        { hanzi: "妈妈", pinyin: "māma", hanviet: "Ma ma", vi: "Mẹ" },
        { hanzi: "买", pinyin: "mǎi", hanviet: "Mãi", vi: "Mua" },
        { hanzi: "米饭", pinyin: "mǐfàn", hanviet: "Mễ phạn", vi: "Cơm trắng" }
      ]
    },
    {
      id: "sm_f",
      pinyin: "f",
      ipa: "[f]",
      name: "Âm /f/",
      group: "labial",
      groupName: "Âm răng môi",
      viCompare: "Hoàn toàn giống âm 'ph' trong tiếng Việt (phở, phim).",
      mouthGuide: "Răng cửa hàm trên chạm nhẹ vào mặt trong môi dưới, thổi luồng hơi qua khe hở.",
      trapVi: "Dễ phát âm, không bị nhầm lẫn.",
      examples: [
        { hanzi: "饭馆", pinyin: "fànguǎn", hanviet: "Phạn quán", vi: "Nhà hàng, quán ăn" },
        { hanzi: "飞机", pinyin: "fēijī", hanviet: "Phi cơ", vi: "Máy bay" },
        { hanzi: "分钟", pinyin: "fēnzhōng", hanviet: "Phân chung", vi: "Phút (thời gian)" }
      ]
    },

    // --- Nhóm 2: Âm đầu lưỡi (d, t, n, l) ---
    {
      id: "sm_d",
      pinyin: "d",
      ipa: "[t]",
      name: "Âm /d/",
      group: "dental",
      groupName: "Âm đầu lưỡi",
      viCompare: "Đọc giống như âm 't' trong tiếng Việt (tôi, ta), không bật hơi.",
      mouthGuide: "Đầu lưỡi chạm mặt sau răng trên chặn hơi, sau đó hạ xuống để hơi thoát ra nhẹ nhàng.",
      trapVi: "Người Việt hay đọc nhầm thành chữ 'đ' tiếng Việt (đi, đâu). Nhớ phát âm là 'tưa' (ví dụ dà -> tà).",
      examples: [
        { hanzi: "大", pinyin: "dà", hanviet: "Đại", vi: "To, lớn" },
        { hanzi: "对不起", pinyin: "duìbuqǐ", hanviet: "Đối bất khởi", vi: "Xin lỗi" },
        { hanzi: "弟弟", pinyin: "dìdi", hanviet: "Đệ đệ", vi: "Em trai" }
      ]
    },
    {
      id: "sm_t",
      pinyin: "t",
      ipa: "[tʰ]",
      name: "Âm /t/ bật hơi",
      group: "dental",
      groupName: "Âm đầu lưỡi bật hơi",
      viCompare: "Đọc giống âm 'th' trong tiếng Việt (thơ, thu) nhưng có luồng hơi mạnh hơn.",
      mouthGuide: "Đầu lưỡi chạm lợi trên, nén hơi rồi bật mạnh đầu lưỡi xuống tạo luồng hơi gió.",
      trapVi: "Luồng hơi phải bật ra rõ nét để phân biệt rạch ròi với âm /d/.",
      examples: [
        { hanzi: "天气", pinyin: "tiānqì", hanviet: "Thiên khí", vi: "Thời tiết" },
        { hanzi: "听", pinyin: "tīng", hanviet: "Thính", vi: "Nghe" },
        { hanzi: "太", pinyin: "tài", hanviet: "Thái", vi: "Quá, lắm (tài hǎo le)" }
      ]
    },
    {
      id: "sm_n",
      pinyin: "n",
      ipa: "[n]",
      name: "Âm /n/",
      group: "dental",
      groupName: "Âm mũi đầu lưỡi",
      viCompare: "Hoàn toàn giống âm 'n' trong tiếng Việt (nắng, non).",
      mouthGuide: "Đầu lưỡi chạm lợi hàm trên, luồng hơi thoát ra qua đường mũi.",
      trapVi: "Âm rất tự nhiên, đọc là 'nưa'.",
      examples: [
        { hanzi: "你", pinyin: "nǐ", hanviet: "Nhĩ", vi: "Bạn, anh, chị" },
        { hanzi: "那", pinyin: "nà", hanviet: "Na", vi: "Đó, kia" },
        { hanzi: "女儿", pinyin: "nǚ'ér", hanviet: "Nữ nhi", vi: "Con gái" }
      ]
    },
    {
      id: "sm_l",
      pinyin: "l",
      ipa: "[l]",
      name: "Âm /l/",
      group: "dental",
      groupName: "Âm bên đầu lưỡi",
      viCompare: "Hoàn toàn giống âm 'l' trong tiếng Việt (làng, lá).",
      mouthGuide: "Đầu lưỡi chạm lợi hàm trên, luồng không khí lách qua hai bên rìa lưỡi thoát ra ngoài.",
      trapVi: "Đọc là 'lưa', rất giống tiếng Việt.",
      examples: [
        { hanzi: "老师", pinyin: "lǎoshī", hanviet: "Lão sư", vi: "Thầy giáo, cô giáo" },
        { hanzi: "冷", pinyin: "lěng", hanviet: "Lãnh", vi: "Lạnh" },
        { hanzi: "了", pinyin: "le", hanviet: "Liễu", vi: "Rồi (trợ từ hoàn thành)" }
      ]
    },

    // --- Nhóm 3: Âm gốc lưỡi (g, k, h) ---
    {
      id: "sm_g",
      pinyin: "g",
      ipa: "[k]",
      name: "Âm /g/",
      group: "velar",
      groupName: "Âm gốc lưỡi",
      viCompare: "Đọc giống âm 'c' hoặc 'k' trong tiếng Việt (cơm, kem), không bật hơi.",
      mouthGuide: "Gốc lưỡi nâng cao chạm ngạc mềm (vòm họng trên phía sau) chặn hơi, rồi hạ xuống thả hơi nhẹ.",
      trapVi: "Người Việt hay nhầm thành âm 'g' (gà, gỗ). Hãy nhớ 'g' trong Pinyin đọc là 'cưa'.",
      examples: [
        { hanzi: "哥哥", pinyin: "gēge", hanviet: "Ca ca", vi: "Anh trai" },
        { hanzi: "高兴", pinyin: "gāoxìng", hanviet: "Cao hứng", vi: "Vui vẻ, vui mừng" },
        { hanzi: "工作", pinyin: "gōngzuò", hanviet: "Công tác", vi: "Làm việc, công việc" }
      ]
    },
    {
      id: "sm_k",
      pinyin: "k",
      ipa: "[kʰ]",
      name: "Âm /k/ bật hơi",
      group: "velar",
      groupName: "Âm gốc lưỡi bật hơi",
      viCompare: "Đọc giống âm 'kh' trong tiếng Việt (không, khó) nhưng có luồng hơi khạc bật ra mạnh hơn.",
      mouthGuide: "Gốc lưỡi chạm vòm mềm, nén hơi rồi bật mạnh ra tạo âm thanh dứt khoát.",
      trapVi: "Phải bật hơi thật mạnh để phân biệt với /g/.",
      examples: [
        { hanzi: "看", pinyin: "kàn", hanviet: "Khán", vi: "Xem, nhìn, ngắm" },
        { hanzi: "开", pinyin: "kāi", hanviet: "Khai", vi: "Mở, lái xe" },
        { hanzi: "看见", pinyin: "kànjiàn", hanviet: "Khán kiến", vi: "Nhìn thấy" }
      ]
    },
    {
      id: "sm_h",
      pinyin: "h",
      ipa: "[x]",
      name: "Âm /h/",
      group: "velar",
      groupName: "Âm gốc lưỡi xát",
      viCompare: "Nằm giữa âm 'h' và 'kh' tiếng Việt, hơi cọ xát nhẹ ở cuống họng.",
      mouthGuide: "Gốc lưỡi nâng lên gần ngạc mềm nhưng không chạm hẳn, luồng hơi ma sát thoát ra.",
      trapVi: "Có thể đọc như 'h' tiếng Việt hoặc lai nhẹ sang 'kh' (Hǎo -> có chút ma sát cổ họng).",
      examples: [
        { hanzi: "好", pinyin: "hǎo", hanviet: "Hảo", vi: "Tốt, đẹp, xin chào" },
        { hanzi: "喝", pinyin: "hē", hanviet: "Hát", vi: "Uống" },
        { hanzi: "很", pinyin: "hěn", hanviet: "Khẩn", vi: "Rất (hěn hǎo: rất tốt)" }
      ]
    },

    // --- Nhóm 4: Âm mặt lưỡi (j, q, x) ---
    {
      id: "sm_j",
      pinyin: "j",
      ipa: "[tɕ]",
      name: "Âm /j/",
      group: "palatal",
      groupName: "Âm mặt lưỡi",
      viCompare: "Đọc giống âm 'ch' nhẹ trong tiếng Việt (chị, chơi), khóe miệng bẹt sang hai bên như đang cười.",
      mouthGuide: "Mặt trước của lưỡi nâng áp vào ngạc cứng, miệng dẹt ngang, hơi bật nhẹ không rung cổ.",
      trapVi: "Đừng chu môi. Khóe miệng luôn phải kéo bẹt sang hai bên.",
      examples: [
        { hanzi: "家", pinyin: "jiā", hanviet: "Gia", vi: "Nhà, gia đình" },
        { hanzi: "今天", pinyin: "jīntiān", hanviet: "Kim thiên", vi: "Hôm nay" },
        { hanzi: "叫", pinyin: "jiào", hanviet: "Khiếu", vi: "Gọi, tên là" }
      ]
    },
    {
      id: "sm_q",
      pinyin: "q",
      ipa: "[tɕʰ]",
      name: "Âm /q/ bật hơi",
      group: "palatal",
      groupName: "Âm mặt lưỡi bật hơi",
      viCompare: "Khẩu hình giống hệt /j/ nhưng BẬT HƠI RẤT MẠNH (như 'ch' bật hơi kèm tiếng xì gió).",
      mouthGuide: "Mặt lưỡi ép ngạc cứng, miệng dẹt, nén hơi rồi xì bật mạnh luồng gió ra.",
      trapVi: "Đây là một trong những âm người Việt hay bỏ sót bật hơi nhất. Phải bật xì gió rõ rệt.",
      examples: [
        { hanzi: "去", pinyin: "qù", hanviet: "Khứ", vi: "Đi" },
        { hanzi: "钱", pinyin: "qián", hanviet: "Tiền", vi: "Tiền bạc" },
        { hanzi: "请", pinyin: "qǐng", hanviet: "Thỉnh", vi: "Xin, mời, làm ơn" }
      ]
    },
    {
      id: "sm_x",
      pinyin: "x",
      ipa: "[ɕ]",
      name: "Âm /x/",
      group: "palatal",
      groupName: "Âm mặt lưỡi xát",
      viCompare: "Đọc tương tự âm 'x' nhẹ trong tiếng Việt (xinh, xem), miệng kéo dẹt sang hai bên.",
      mouthGuide: "Mặt lưỡi nâng gần ngạc cứng tạo khe hẹp, luồng hơi ma sát xì qua khe.",
      trapVi: "Giữ cơ môi thả lỏng kéo ngang sang hai khóe miệng.",
      examples: [
        { hanzi: "谢谢", pinyin: "xièxie", hanviet: "Tạ tạ", vi: "Cảm ơn" },
        { hanzi: "小", pinyin: "xiǎo", hanviet: "Tiểu", vi: "Nhỏ, bé" },
        { hanzi: "写", pinyin: "xiě", hanviet: "Tả", vi: "Viết" }
      ]
    },

    // --- Nhóm 5: Âm uốn lưỡi (zh, ch, sh, r) ---
    {
      id: "sm_zh",
      pinyin: "zh",
      ipa: "[ʈʂ]",
      name: "Âm /zh/ uốn lưỡi",
      group: "retroflex",
      groupName: "Âm uốn lưỡi",
      viCompare: "Đọc giống âm 'tr' miền Nam hoặc 'ch' uốn cong đầu lưỡi lên ngạc trên, không bật hơi.",
      mouthGuide: "Đầu lưỡi uốn cong lên chạm ngạc cứng phía trên, hơi mở nhẹ cho luồng hơi thoát ra.",
      trapVi: "Người Bắc hay nhầm với âm /z/. Phải uốn cong đầu lưỡi chạm vòm miệng trên.",
      examples: [
        { hanzi: "中国", pinyin: "Zhōngguó", hanviet: "Trung Quốc", vi: "Trung Quốc" },
        { hanzi: "这", pinyin: "zhè", hanviet: "Giá", vi: "Đây, này" },
        { hanzi: "住", pinyin: "zhù", hanviet: "Trú", vi: "Ở, cư trú" }
      ]
    },
    {
      id: "sm_ch",
      pinyin: "ch",
      ipa: "[ʈʂʰ]",
      name: "Âm /ch/ uốn lưỡi bật hơi",
      group: "retroflex",
      groupName: "Âm uốn lưỡi bật hơi",
      viCompare: "Khẩu hình giống /zh/ (uốn cong đầu lưỡi) nhưng BẬT HƠI RẤT MẠNH.",
      mouthGuide: "Đầu lưỡi uốn cong ép vòm họng, tích luồng hơi mạnh rồi bật phóng thích ra ngoài.",
      trapVi: "Vừa uốn lưỡi vừa bật luồng gió mạnh. Cực kỳ đặc trưng của tiếng Trung chuẩn Bắc Kinh.",
      examples: [
        { hanzi: "吃", pinyin: "chī", hanviet: "Ngật", vi: "Ăn" },
        { hanzi: "出租车", pinyin: "chūzūchē", hanviet: "Xuất tô xa", vi: "Xe taxi" },
        { hanzi: "茶", pinyin: "chá", hanviet: "Trà", vi: "Trà, chè" }
      ]
    },
    {
      id: "sm_sh",
      pinyin: "sh",
      ipa: "[ʂ]",
      name: "Âm /sh/ uốn lưỡi",
      group: "retroflex",
      groupName: "Âm uốn lưỡi xát",
      viCompare: "Đọc giống âm 's' nặng (sông, suối) hoặc 'sh' tiếng Anh, đầu lưỡi uốn cong lên.",
      mouthGuide: "Đầu lưỡi uốn cong gần ngạc trên tạo khe hẹp, thổi luồng hơi ma sát tạo tiếng rào rào.",
      trapVi: "Uốn lưỡi dày dặn, không được thả bẹt lưỡi.",
      examples: [
        { hanzi: "是", pinyin: "shì", hanviet: "Thị", vi: "Là, đúng" },
        { hanzi: "谁", pinyin: "shéi", hanviet: "Thùy", vi: "Ai" },
        { hanzi: "书", pinyin: "shū", hanviet: "Thư", vi: "Sách" }
      ]
    },
    {
      id: "sm_r",
      pinyin: "r",
      ipa: "[ʐ]",
      name: "Âm /r/ uốn lưỡi",
      group: "retroflex",
      groupName: "Âm uốn lưỡi hữu thanh",
      viCompare: "Tương tự âm 'r' trong tiếng Việt nhưng cổ họng rung, không rung đầu lưỡi.",
      mouthGuide: "Đầu lưỡi uốn cong lên, dây thanh quản rung mạnh, môi hơi tròn nhẹ.",
      trapVi: "Không rung bật đầu lưỡi như tiếng Nga hay tiếng Tây Ban Nha. Giữ êm dịu.",
      examples: [
        { hanzi: "人", pinyin: "rén", hanviet: "Nhân", vi: "Người" },
        { hanzi: "热", pinyin: "rè", hanviet: "Nhiệt", vi: "Nóng, nhiệt độ cao" },
        { hanzi: "认识", pinyin: "rènshi", hanviet: "Nhận thức", vi: "Quen biết" }
      ]
    },

    // --- Nhóm 6: Âm đầu lưỡi trước (z, c, s) ---
    {
      id: "sm_z",
      pinyin: "z",
      ipa: "[ts]",
      name: "Âm /z/",
      group: "dental_sibilant",
      groupName: "Âm đầu lưỡi trước",
      viCompare: "Đọc tương tự âm 'ch' hoặc 'tz' nhẹ, đầu lưỡi thẳng chạm mặt sau răng cửa trên, không bật hơi.",
      mouthGuide: "Đầu lưỡi để thẳng áp nhẹ vào mặt sau răng trên, hạ nhẹ đầu lưỡi cho hơi thoát ra.",
      trapVi: "Lưỡi để thẳng tự nhiên, KHÔNG uốn cong như /zh/.",
      examples: [
        { hanzi: "再见", pinyin: "zàijiàn", hanviet: "Tái kiến", vi: "Tạm biệt" },
        { hanzi: "早上", pinyin: "zǎoshang", hanviet: "Tảo thượng", vi: "Buổi sáng" },
        { hanzi: "做", pinyin: "zuò", hanviet: "Tác", vi: "Làm" }
      ]
    },
    {
      id: "sm_c",
      pinyin: "c",
      ipa: "[tsʰ]",
      name: "Âm /c/ bật hơi",
      group: "dental_sibilant",
      groupName: "Âm đầu lưỡi trước bật hơi",
      viCompare: "Khẩu hình giống /z/ (lưỡi thẳng chạm răng), nhưng BẬT HƠI XÌ GIÓ RẤT MẠNH (như âm 'xì').",
      mouthGuide: "Đầu lưỡi chạm răng trên, nén hơi rồi phóng thích luồng gió xì dứt khoát qua kẽ răng.",
      trapVi: "Phải có luồng hơi xì mạnh. Cực kỳ quan trọng để phân biệt với /z/.",
      examples: [
        { hanzi: "菜", pinyin: "cài", hanviet: "Thái", vi: "Món ăn, rau" },
        { hanzi: "从", pinyin: "cóng", hanviet: "Tòng", vi: "Từ (từ đâu đến đâu)" },
        { hanzi: "次", pinyin: "cì", hanviet: "Thứ", vi: "Lần (một lần, hai lần)" }
      ]
    },
    {
      id: "sm_s",
      pinyin: "s",
      ipa: "[s]",
      name: "Âm /s/",
      group: "dental_sibilant",
      groupName: "Âm đầu lưỡi trước xát",
      viCompare: "Đọc giống âm 'x' nhẹ trong tiếng Việt (xa, xôi), đầu lưỡi để thẳng gần mặt sau răng cửa dưới.",
      mouthGuide: "Đầu lưỡi thẳng để sát răng dưới, luồng hơi lướt qua kẽ răng phát ra tiếng xì nhẹ.",
      trapVi: "Lưỡi duỗi thẳng, không uốn cong như /sh/.",
      examples: [
        { hanzi: "三", pinyin: "sān", hanviet: "Tam", vi: "Số 3" },
        { hanzi: "四", pinyin: "sì", hanviet: "Tứ", vi: "Số 4" },
        { hanzi: "岁", pinyin: "suì", hanviet: "Tuế", vi: "Tuổi" }
      ]
    }
  ],

  // =========================================================================
  // 2. VẬN MẪU (YUNMU - 36 NGUYÊN ÂM & VẦN)
  // =========================================================================
  yunmu: [
    // Vận mẫu đơn (6)
    { symbol: "a", vi: "Đọc như 'a' tiếng Việt, miệng mở to.", ex: "bàba (爸爸)" },
    { symbol: "o", vi: "Đọc lai giữa 'ô' và 'ua', miệng tròn.", ex: "bō (波)" },
    { symbol: "e", vi: "Đọc như 'ơ' hoặc 'ưa' trong tiếng Việt.", ex: "gēge (哥哥)" },
    { symbol: "i", vi: "Đọc như 'i' (sau z, c, s, zh, ch, sh, r đọc thành 'ư').", ex: "nǐ (你), chī (吃)" },
    { symbol: "u", vi: "Đọc như 'u' tiếng Việt, môi chu tròn.", ex: "bù (不)" },
    { symbol: "ü", vi: "Đọc như 'uy' tròn môi (giữ môi tròn từ đầu đến cuối).", ex: "nǚ (女), lǜ (绿)" },

    // Vận mẫu kép (13)
    { symbol: "ai", vi: "Đọc như 'ai' tiếng Việt.", ex: "mǎi (买 - mua)" },
    { symbol: "ei", vi: "Đọc như 'ây' tiếng Việt.", ex: "bēi (杯 - cốc)" },
    { symbol: "ao", vi: "Đọc như 'ao' tiếng Việt.", ex: "hǎo (好 - tốt)" },
    { symbol: "ou", vi: "Đọc như 'âu' tiếng Việt.", ex: "dōu (都 - đều)" },
    { symbol: "ia", vi: "Đọc như 'ia' tiếng Việt.", ex: "jiā (家 - nhà)" },
    { symbol: "ie", vi: "Đọc như 'i-ê'.", ex: "xiè (谢 - tạ)" },
    { symbol: "ua", vi: "Đọc như 'oa'.", ex: "huā (花 - hoa)" },
    { symbol: "uo", vi: "Đọc như 'ua' tròn môi.", ex: "zuò (做 - làm)" },
    { symbol: "üe", vi: "Đọc như 'uy-ê'.", ex: "yuè (月 - mặt trăng/tháng)" },
    { symbol: "iao", vi: "Đọc như 'i-ao' (eo).", ex: "xiǎo (小 - nhỏ)" },
    { symbol: "iu", vi: "Viết tắt của 'iou', đọc như 'iêu'.", ex: "liù (六 - số 6)" },
    { symbol: "uai", vi: "Đọc như 'oai'.", ex: "kuài (快 - nhanh)" },
    { symbol: "ui", vi: "Viết tắt của 'uei', đọc như 'uây'.", ex: "duì (对 - đúng)" },

    // Vận mẫu mũi & ngạc (16)
    { symbol: "an", vi: "Đọc như 'an'.", ex: "fàn (饭 - cơm)" },
    { symbol: "en", vi: "Đọc như 'ơn' hoặc 'ân'.", ex: "hěn (很 - rất)" },
    { symbol: "in", vi: "Đọc như 'in'.", ex: "jīn (今 - nay)" },
    { symbol: "ün", vi: "Đọc như 'uyn'.", ex: "qún (裙 - váy)" },
    { symbol: "ang", vi: "Đọc như 'ang'.", ex: "máng (忙 - bận)" },
    { symbol: "eng", vi: "Đọc như 'âng'.", ex: "péng (朋 - bằng)" },
    { symbol: "ing", vi: "Đọc như 'inh'.", ex: "píng (苹 - táo)" },
    { symbol: "ong", vi: "Đọc như 'ung'.", ex: "zhōng (中 - trung)" },
    { symbol: "ian", vi: "Đọc như 'i-en' (iên).", ex: "tiān (天 - trời/ngày)" },
    { symbol: "uan", vi: "Đọc như 'oan'.", ex: "guān (关 - đóng)" },
    { symbol: "üan", vi: "Đọc như 'uy-en'.", ex: "yuán (元 - đồng tệ)" },
    { symbol: "un", vi: "Viết tắt của 'uen', đọc như 'uân'.", ex: "wèn (问 - hỏi)" },
    { symbol: "iang", vi: "Đọc như 'i-ang'.", ex: "xiǎng (想 - muốn)" },
    { symbol: "uang", vi: "Đọc như 'oang'.", ex: "kuāng (筐 - sọt)" },
    { symbol: "iong", vi: "Đọc như 'i-ung'.", ex: "xióng (熊 - gấu)" }
  ],

  // =========================================================================
  // 3. THANH ĐIỆU (4 THANH CHÍNH + THANH NHẸ)
  // =========================================================================
  tones: [
    {
      tone: 1,
      name: "Thanh 1 (Âm Bình)",
      mark: "ā",
      pitch: "55 (Cao đều)",
      desc: "Giữ cao độ ở mức 5/5, ngân dài đều phẳng lì từ đầu đến cuối. Không lên không xuống.",
      tip: "Tưởng tượng như đang ngân một nốt nhạc cao và phẳng.",
      sample: { hanzi: "妈", pinyin: "mā", vi: "Mẹ" }
    },
    {
      tone: 2,
      name: "Thanh 2 (Dương Bình)",
      mark: "á",
      pitch: "35 (Lên sắc)",
      desc: "Bắt đầu ở mức trung bình (3) rồi vút mạnh lên đỉnh (5). Giống hệt dấu SẮC trong tiếng Việt.",
      tip: "Giống như khi bạn hỏi ngạc nhiên: 'Hả?', 'Cái gì cơ?'",
      sample: { hanzi: "麻", pinyin: "má", vi: "Cây gai / Tê" }
    },
    {
      tone: 3,
      name: "Thanh 3 (Thượng Thanh)",
      mark: "ǎ",
      pitch: "214 (Hạ bổng)",
      desc: "Hạ giọng xuống thật sâu (2 xuống 1) rồi lượn nhẹ lên mức 4. Gần giống dấu HỎI tiếng Việt.",
      tip: "Phải trầm giọng xuống đáy cổ họng rồi mới uốn nhẹ lên.",
      sample: { hanzi: "马", pinyin: "mǎ", vi: "Con ngựa" }
    },
    {
      tone: 4,
      name: "Thanh 4 (Khứ Thanh)",
      mark: "à",
      pitch: "51 (Hạ dứt khoát)",
      desc: "Bắt đầu từ đỉnh cao nhất (5) rơi thẳng dứt khoát xuống đáy (1). Nhanh, mạnh và dứt khoát!",
      tip: "Giống như bạn ra lệnh dứt khoát hoặc thở mạnh giật: 'Dừng!'.",
      sample: { hanzi: "骂", pinyin: "mà", vi: "Mắng chửi" }
    },
    {
      tone: 0,
      name: "Thanh nhẹ (Khinh Thanh)",
      mark: "a",
      pitch: "Nhẹ & Ngắn",
      desc: "Không đánh dấu thanh điệu trên Pinyin. Đọc cực kỳ ngắn, nhẹ nhàng, lướt qua nhanh.",
      tip: "Phát âm nhẹ như một cái gõ phím lướt.",
      sample: { hanzi: "吗", pinyin: "ma", vi: "Phải không? (trợ từ nghi vấn)" }
    }
  ],

  // =========================================================================
  // 4. QUY TẮC BIẾN ĐIỆU CỐT LÕI (TONE SANDHI)
  // =========================================================================
  rules: [
    {
      id: "rule_two_tone3",
      title: "Biến điệu 2 Thanh 3: (3 + 3 ➔ 2 + 3)",
      ruleFormula: "V / + V / ➔ / + V /",
      desc: "Khi hai âm tiết mang thanh 3 đi liền nhau, âm tiết thứ nhất bắt buộc biến thành thanh 2.",
      examples: [
        { original: "Nǐ hǎo (你好)", actual: "Ní hǎo", vi: "Xin chào (Nhĩ hảo)" },
        { original: "Měi hǎo (美好)", actual: "Méi hǎo", vi: "Tốt đẹp (Mỹ hảo)" },
        { original: "Kě yǐ (可以)", actual: "Ké yǐ", vi: "Có thể (Khả dĩ)" },
        { original: "Shǒu biǎo (手表)", actual: "Shóu biǎo", vi: "Đồng hồ đeo tay (Thủ biểu)" }
      ]
    },
    {
      id: "rule_bu",
      title: "Biến điệu chữ '不' (Bù):",
      ruleFormula: "Bù + Thanh 4 ➔ Bú + Thanh 4",
      desc: "Chữ '不' nguyên bản mang thanh 4 (bù). Nhưng khi đứng trước một âm tiết mang thanh 4, nó bắt buộc biến thành thanh 2 (bú).",
      examples: [
        { original: "Bù shì (不是)", actual: "Bú shì", vi: "Không phải (Bất thị)" },
        { original: "Bù duì (不对)", actual: "Bú duì", vi: "Không đúng (Bất đối)" },
        { original: "Bù yào (不要)", actual: "Bú yào", vi: "Đừng, không cần (Bất yếu)" }
      ]
    },
    {
      id: "rule_yi",
      title: "Biến điệu chữ '一' (Yī):",
      ruleFormula: "Yī + Thanh 4 ➔ Yí | Yī + Thanh 1/2/3 ➔ Yì",
      desc: "Đứng một mình đọc thanh 1 (Yī). Trước thanh 4 đọc thành thanh 2 (Yí). Trước thanh 1, 2, 3 đọc thành thanh 4 (Yì).",
      examples: [
        { original: "Yī gè (一个)", actual: "Yí gè", vi: "Một cái (Nhất cá)" },
        { original: "Yī tiān (一天)", actual: "Yì tiān", vi: "Một ngày (Nhất thiên)" },
        { original: "Yī nián (一年)", actual: "Yì nián", vi: "Một năm (Nhất niên)" }
      ]
    }
  ],

  // =========================================================================
  // 5. NGÂN HÀNG TRẮC NGHIỆM LUYỆN TAI NGHE THANH ĐIỆU (TONE QUIZ)
  // =========================================================================
  quizBank: [
    {
      id: "tq1",
      audioWord: "妈妈",
      question: "Từ 'Mẹ' (妈妈 - māma) có âm tiết thứ nhất mang thanh mấy?",
      options: ["Thanh 1 (ā)", "Thanh 2 (á)", "Thanh 3 (ǎ)", "Thanh 4 (à)"],
      correctIndex: 0,
      explanation: "'mā' là thanh 1 (ngang cao 55)."
    },
    {
      id: "tq2",
      audioWord: "苹果",
      question: "Âm tiết 'píng' trong '苹果' mang thanh mấy?",
      options: ["Thanh 1 (ā)", "Thanh 2 (á)", "Thanh 3 (ǎ)", "Thanh 4 (à)"],
      correctIndex: 1,
      explanation: "'píng' mang thanh 2 (vút lên giống dấu sắc)."
    },
    {
      id: "tq3",
      audioWord: "好",
      question: "Từ '好' (hǎo - tốt) mang thanh điệu nào?",
      options: ["Thanh 1 (ā)", "Thanh 2 (á)", "Thanh 3 (ǎ)", "Thanh 4 (à)"],
      correctIndex: 2,
      explanation: "'hǎo' mang thanh 3 (hạ sâu xuống đáy rồi uốn nhẹ lên)."
    },
    {
      id: "tq4",
      audioWord: "谢谢",
      question: "Từ '谢谢' (xièxie - cảm ơn) có âm tiết đầu mang thanh mấy?",
      options: ["Thanh 1 (ā)", "Thanh 2 (á)", "Thanh 3 (ǎ)", "Thanh 4 (à)"],
      correctIndex: 3,
      explanation: "'xiè' mang thanh 4 (hạ dứt khoát 51)."
    },
    {
      id: "tq5",
      audioWord: "八",
      question: "Số 8 '八' (bā) mang thanh mấy?",
      options: ["Thanh 1 (bā)", "Thanh 2 (bá)", "Thanh 3 (bǎ)", "Thanh 4 (bà)"],
      correctIndex: 0,
      explanation: "'bā' mang thanh 1 cao và phẳng."
    },
    {
      id: "tq6",
      audioWord: "对",
      question: "Từ '对' (duì - đúng) mang thanh mấy?",
      options: ["Thanh 1 (duī)", "Thanh 2 (duí)", "Thanh 3 (duǐ)", "Thanh 4 (duì)"],
      correctIndex: 3,
      explanation: "'duì' mang thanh 4 dứt khoát."
    },
    {
      id: "tq7",
      audioWord: "买",
      question: "Từ '买' (mǎi - mua) mang thanh mấy?",
      options: ["Thanh 1 (māi)", "Thanh 2 (mái)", "Thanh 3 (mǎi)", "Thanh 4 (mài)"],
      correctIndex: 2,
      explanation: "'mǎi' mang thanh 3. Phân biệt với 'mài' (卖 - bán) mang thanh 4."
    },
    {
      id: "tq8",
      audioWord: "钱",
      question: "Từ '钱' (qián - tiền) mang thanh mấy?",
      options: ["Thanh 1 (qiān)", "Thanh 2 (qián)", "Thanh 3 (qiǎn)", "Thanh 4 (qiàn)"],
      correctIndex: 1,
      explanation: "'qián' mang thanh 2 vút lên như dấu sắc."
    }
  ]
};
