/**
 * =========================================================================
 * Rio English - IPA (International Phonetic Alphabet) Database
 * 44 Standard English Phonemes with detailed mouth/tongue guides,
 * audio examples, minimal pairs comparison, and ear-training quizzes.
 * =========================================================================
 */

window.IPA_DATA = {
  // =========================================================================
  // 1. VOWELS (NGUYÊN ÂM - 20 ÂM)
  // =========================================================================
  vowels: [
    // --- 1.1 MONOPHTHONGS (NGUYÊN ÂM ĐƠN - 12 ÂM) ---
    {
      id: "v_i_long",
      symbol: "iː",
      name: "Âm i dài",
      type: "vowel_long",
      group: "monophthong",
      typeLabel: "Nguyên âm dài",
      duration: "Kéo dài (~1.5s)",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Cơ môi căng, khóe miệng kéo dẹt sang hai bên giống như đang cười mỉm tự nhiên.",
        tongue: "Đầu lưỡi chạm mặt trong răng cửa dưới, thân lưỡi nâng rất cao về phía vòm họng trên.",
        jaw: "Miệng mở hẹp, khoảng cách giữa hai hàm răng rất nhỏ."
      },
      tipsVi: "Kéo dài hơi hơn âm 'i' tiếng Việt, cơ miệng phải căng sang hai bên. Đừng phát âm giật cục giống như từ 'đi' trong tiếng Việt.",
      examples: [
        { word: "see", ipa: "/siː/", vi: "nhìn thấy", highlight: "ee" },
        { word: "sheep", ipa: "/ʃiːp/", vi: "con cừu", highlight: "ee" },
        { word: "eat", ipa: "/iːt/", vi: "ăn", highlight: "ea" },
        { word: "team", ipa: "/tiːm/", vi: "đội ngũ", highlight: "ea" }
      ]
    },
    {
      id: "v_i_short",
      symbol: "ɪ",
      name: "Âm i ngắn",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn",
      duration: "Rất ngắn (<0.5s)",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi hoàn toàn thả lỏng, hơi mở nhẹ, không kéo căng sang hai bên như /iː/.",
        tongue: "Lưỡi hạ thấp hơn một chút so với âm /iː/, thả lỏng tự nhiên trong khoang miệng.",
        jaw: "Hàm hơi hạ nhẹ xuống so với /iː/."
      },
      tipsVi: "Âm này lai giữa 'i' và 'ê' trong tiếng Việt, phát âm dứt khoát, âm phát ra trong cổ họng rất nhanh.",
      examples: [
        { word: "ship", ipa: "/ʃɪp/", vi: "tàu thủy", highlight: "i" },
        { word: "sit", ipa: "/sɪt/", vi: "ngồi", highlight: "i" },
        { word: "hit", ipa: "/hɪt/", vi: "đánh, trúng", highlight: "i" },
        { word: "fish", ipa: "/fɪʃ/", vi: "con cá", highlight: "i" }
      ]
    },
    {
      id: "v_u_short",
      symbol: "ʊ",
      name: "Âm u ngắn",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn",
      duration: "Ngắn, dứt khoát",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi hơi tròn nhẹ, thả lỏng, không chu môi quá nhiều về phía trước.",
        tongue: "Phần sau lưỡi nâng lên vừa phải, cuống lưỡi hơi co nhẹ.",
        jaw: "Hàm mở hẹp, miệng hơi khép tự nhiên."
      },
      tipsVi: "Âm lai giữa 'u' và 'ư' tiếng Việt. Phát âm nhanh gọn, dứt khoát, không kéo dài giọng.",
      examples: [
        { word: "good", ipa: "/ɡʊd/", vi: "tốt, giỏi", highlight: "oo" },
        { word: "foot", ipa: "/fʊt/", vi: "bàn chân", highlight: "oo" },
        { word: "book", ipa: "/bʊk/", vi: "quyển sách", highlight: "oo" },
        { word: "put", ipa: "/pʊt/", vi: "đặt, để", highlight: "u" }
      ]
    },
    {
      id: "v_u_long",
      symbol: "uː",
      name: "Âm u dài",
      type: "vowel_long",
      group: "monophthong",
      typeLabel: "Nguyên âm dài",
      duration: "Kéo dài (~1.5s)",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi chu tròn căng về phía trước tạo thành hình tròn nhỏ như đang huýt sáo.",
        tongue: "Phần gốc lưỡi nâng cao về phía vòm mềm, đầu lưỡi thụt lùi lại trong khoang miệng.",
        jaw: "Hàm nâng cao, miệng khép tương đối hẹp."
      },
      tipsVi: "Môi chu tròn căng và kéo dài âm ra. Cảm nhận luồng hơi ấm đi ra từ sâu bên trong.",
      examples: [
        { word: "shoot", ipa: "/ʃuːt/", vi: "bắn, quay phim", highlight: "oo" },
        { word: "blue", ipa: "/bluː/", vi: "màu xanh da trời", highlight: "ue" },
        { word: "food", ipa: "/fuːd/", vi: "thức ăn", highlight: "oo" },
        { word: "music", ipa: "/ˈmjuːzɪk/", vi: "âm nhạc", highlight: "u" }
      ]
    },
    {
      id: "v_e",
      symbol: "e",
      name: "Âm e ngắn",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn",
      duration: "Ngắn, dứt khoát",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi mở rộng hơn âm /ɪ/, khóe miệng hơi kéo nhẹ sang hai bên.",
        tongue: "Đầu lưỡi tựa vào răng hàm dưới, thân lưỡi nâng ở tầm trung.",
        jaw: "Hạ hàm dưới xuống vừa phải (rộng hơn âm /ɪ/ nhưng hẹp hơn /æ/)."
      },
      tipsVi: "Tương tự âm 'e' tiếng Việt nhưng phát âm dứt khoát và thoát âm nhanh hơn.",
      examples: [
        { word: "bed", ipa: "/bed/", vi: "cái giường", highlight: "e" },
        { word: "pen", ipa: "/pen/", vi: "cây bút", highlight: "e" },
        { word: "red", ipa: "/red/", vi: "màu đỏ", highlight: "e" },
        { word: "send", ipa: "/send/", vi: "gửi đi", highlight: "e" }
      ]
    },
    {
      id: "v_schwa",
      symbol: "ə",
      name: "Âm Schwa (ơ ngắn)",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn / Yếu",
      duration: "Cực ngắn, âm yếu",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi và toàn bộ cơ mặt hoàn toàn thả lỏng, không cử động.",
        tongue: "Lưỡi đặt ở vị trí trung tâm tự nhiên trong miệng, không nâng cao không hạ thấp.",
        jaw: "Miệng hơi hé nhẹ tự nhiên."
      },
      tipsVi: "Đây là âm phổ biến nhất trong tiếng Anh! Xuất hiện ở hầu hết các âm tiết không nhấn trọng âm. Phát âm cực nhẹ như 'ơ' lướt.",
      examples: [
        { word: "teacher", ipa: "/ˈtiːtʃər/", vi: "giáo viên", highlight: "er" },
        { word: "about", ipa: "/əˈbaʊt/", vi: "về, khoảng", highlight: "a" },
        { word: "banana", ipa: "/bəˈnænə/", vi: "quả chuối", highlight: "a" },
        { word: "ago", ipa: "/əˈɡoʊ/", vi: "trước đây", highlight: "a" }
      ]
    },
    {
      id: "v_er_long",
      symbol: "ɜː",
      name: "Âm ơ dài",
      type: "vowel_long",
      group: "monophthong",
      typeLabel: "Nguyên âm dài",
      duration: "Kéo dài, âm sâu",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi mở hẹp tự nhiên, cơ mặt hơi căng nhẹ.",
        tongue: "Lưỡi đặt giữa vòm miệng, thân lưỡi hơi cong nhẹ, đầu lưỡi hơi cong lên.",
        jaw: "Miệng mở vừa phải, giữ nguyên vị trí trong suốt khi phát âm."
      },
      tipsVi: "Âm 'ơ' trầm và kéo dài từ trong cổ họng. Trong tiếng Anh - Mỹ thường cong lưỡi tạo âm 'r'.",
      examples: [
        { word: "bird", ipa: "/bɜːrd/", vi: "con chim", highlight: "ir" },
        { word: "girl", ipa: "/ɡɜːrl/", vi: "cô gái", highlight: "ir" },
        { word: "turn", ipa: "/tɜːrn/", vi: "rẽ, lượt", highlight: "ur" },
        { word: "learn", ipa: "/lɜːrn/", vi: "học hỏi", highlight: "ear" }
      ]
    },
    {
      id: "v_o_long",
      symbol: "ɔː",
      name: "Âm o dài",
      type: "vowel_long",
      group: "monophthong",
      typeLabel: "Nguyên âm dài",
      duration: "Kéo dài (~1.5s)",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi chu tròn rõ rệt, đẩy nhẹ về phía trước.",
        tongue: "Cuống lưỡi nâng cao về phía sau vòm họng, đầu lưỡi hạ thấp.",
        jaw: "Hàm mở rộng vừa phải, miệng tạo hình phễu."
      },
      tipsVi: "Âm 'o' tròn môi và ngân dài, âm thanh tròn trịa, phát ra từ sâu bên trong.",
      examples: [
        { word: "door", ipa: "/dɔːr/", vi: "cánh cửa", highlight: "oor" },
        { word: "water", ipa: "/ˈwɔːtər/", vi: "nước", highlight: "a" },
        { word: "call", ipa: "/kɔːl/", vi: "gọi điện", highlight: "all" },
        { word: "law", ipa: "/lɔː/", vi: "luật pháp", highlight: "aw" }
      ]
    },
    {
      id: "v_ae",
      symbol: "æ",
      name: "Âm a bẹt",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn / Mở",
      duration: "Ngắn, mở rộng hàm",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Miệng mở to hết cỡ cả về chiều dọc lẫn chiều ngang, khóe miệng kéo rộng sang hai bên.",
        tongue: "Lưỡi đè bẹp sát sàn miệng, đầu lưỡi tì chặt vào chân răng hàm dưới.",
        jaw: "Hạ hàm dưới xuống sâu tối đa."
      },
      tipsVi: "Âm lai giữa 'a' và 'e'. Miệng phải mở to như khi bác sĩ khám họng, âm thanh phát ra to rõ và bẹt.",
      examples: [
        { word: "cat", ipa: "/kæt/", vi: "con mèo", highlight: "a" },
        { word: "apple", ipa: "/ˈæpl/", vi: "quả táo", highlight: "a" },
        { word: "black", ipa: "/blæk/", vi: "màu đen", highlight: "a" },
        { word: "hand", ipa: "/hænd/", vi: "bàn tay", highlight: "a" }
      ]
    },
    {
      id: "v_wedge",
      symbol: "ʌ",
      name: "Âm á (á ngắn)",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn",
      duration: "Ngắn, dứt khoát",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi mở vừa phải, hoàn toàn thả lỏng.",
        tongue: "Thân lưỡi hơi nâng nhẹ ở phần sau, đầu lưỡi thả lỏng.",
        jaw: "Hàm dưới hạ thấp hơn âm /ə/ một chút."
      },
      tipsVi: "Gần giống âm 'ă' hoặc 'ơ' ngắn trong tiếng Việt, phát âm ngắn và bật ra nhanh từ cuống họng.",
      examples: [
        { word: "up", ipa: "/ʌp/", vi: "lên trên", highlight: "u" },
        { word: "cup", ipa: "/kʌp/", vi: "cái tách, cúp", highlight: "u" },
        { word: "love", ipa: "/lʌv/", vi: "yêu thương", highlight: "o" },
        { word: "bus", ipa: "/bʌs/", vi: "xe buýt", highlight: "u" }
      ]
    },
    {
      id: "v_a_long",
      symbol: "ɑː",
      name: "Âm a dài",
      type: "vowel_long",
      group: "monophthong",
      typeLabel: "Nguyên âm dài",
      duration: "Kéo dài, âm sâu",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Miệng mở rộng theo chiều dọc, môi thả lỏng tự nhiên không chu.",
        tongue: "Lưỡi hạ thấp và thụt sâu vào trong khoang miệng.",
        jaw: "Hàm dưới hạ thấp hoàn toàn."
      },
      tipsVi: "Âm 'a' trầm, ngân dài, phát âm từ cuống họng, khoang miệng mở rộng tạo độ vang.",
      examples: [
        { word: "car", ipa: "/kɑːr/", vi: "xe ô tô", highlight: "ar" },
        { word: "heart", ipa: "/hɑːrt/", vi: "trái tim", highlight: "ear" },
        { word: "start", ipa: "/stɑːrt/", vi: "bắt đầu", highlight: "ar" },
        { word: "father", ipa: "/ˈfɑːðər/", vi: "người cha", highlight: "a" }
      ]
    },
    {
      id: "v_o_short",
      symbol: "ɒ",
      name: "Âm o ngắn",
      type: "vowel_short",
      group: "monophthong",
      typeLabel: "Nguyên âm ngắn",
      duration: "Ngắn, dứt khoát",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi hơi tròn nhẹ, không chu ra phía trước.",
        tongue: "Lưỡi hạ thấp trong khoang miệng, hơi thụt nhẹ về phía sau.",
        jaw: "Hàm mở rộng theo chiều dọc."
      },
      tipsVi: "Âm 'o' ngắn, mở hàm to và ngắt âm dứt khoát. Người Mỹ thường phát âm gần giống /ɑː/.",
      examples: [
        { word: "on", ipa: "/ɒn/", vi: "ở trên", highlight: "o" },
        { word: "hot", ipa: "/hɒt/", vi: "nóng", highlight: "o" },
        { word: "box", ipa: "/bɒks/", vi: "cái hộp", highlight: "o" },
        { word: "stop", ipa: "/stɒp/", vi: "dừng lại", highlight: "o" }
      ]
    },

    // --- 1.2 DIPHTHONGS (NGUYÊN ÂM ĐÔI - 8 ÂM) ---
    {
      id: "d_ia",
      symbol: "ɪə",
      name: "Âm ia / i-ơ",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /ɪ/ sang /ə/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Khởi đầu từ khẩu hình /ɪ/ (môi thả lỏng) sau đó trượt mượt mà sang âm /ə/ (môi hơi mở).",
        tongue: "Lưỡi nâng cao về phía trước rồi hạ dần về vị trí trung tâm.",
        jaw: "Hàm hơi hạ nhẹ khi trượt âm."
      },
      tipsVi: "Âm đầu /ɪ/ chiếm 70% thời gian, âm sau /ə/ chiếm 30% và lướt nhẹ.",
      examples: [
        { word: "here", ipa: "/hɪər/", vi: "ở đây", highlight: "ere" },
        { word: "near", ipa: "/nɪər/", vi: "gần", highlight: "ear" },
        { word: "beer", ipa: "/bɪər/", vi: "bia", highlight: "eer" },
        { word: "clear", ipa: "/klɪər/", vi: "rõ ràng", highlight: "ear" }
      ]
    },
    {
      id: "d_ei",
      symbol: "eɪ",
      name: "Âm ê-i (ay)",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /e/ sang /ɪ/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Bắt đầu từ khẩu hình /e/ (miệng mở vừa) rồi khép hẹp lại và dẹt dần sang hai bên như /ɪ/.",
        tongue: "Lưỡi từ tầm trung di chuyển nâng cao lên phía trước.",
        jaw: "Hàm dưới hơi nâng lên khi kết thúc âm."
      },
      tipsVi: "Gần giống 'ây' trong tiếng Việt nhưng dẹt môi và ngân dài hơn.",
      examples: [
        { word: "wait", ipa: "/weɪt/", vi: "chờ đợi", highlight: "ai" },
        { word: "day", ipa: "/deɪ/", vi: "ngày", highlight: "ay" },
        { word: "name", ipa: "/neɪm/", vi: "tên", highlight: "a_e" },
        { word: "make", ipa: "/meɪk/", vi: "làm, tạo ra", highlight: "a_e" }
      ]
    },
    {
      id: "d_ua",
      symbol: "ʊə",
      name: "Âm u-ơ",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /ʊ/ sang /ə/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi ban đầu hơi tròn như /ʊ/, sau đó thả lỏng mở tự nhiên sang /ə/.",
        tongue: "Gốc lưỡi hơi nâng rồi chuyển dần về vị trí trung tâm thả lỏng.",
        jaw: "Hàm dưới hơi hạ xuống khi kết thúc."
      },
      tipsVi: "Trượt từ âm 'u' ngắn sang 'ơ' nhẹ. Tránh đọc thành 'ua' cứng của tiếng Việt.",
      examples: [
        { word: "tourist", ipa: "/ˈtʊərɪst/", vi: "khách du lịch", highlight: "our" },
        { word: "poor", ipa: "/pʊər/", vi: "nghèo, tội nghiệp", highlight: "oor" },
        { word: "sure", ipa: "/ʃʊər/", vi: "chắc chắn", highlight: "ure" },
        { word: "cure", ipa: "/kjʊər/", vi: "chữa trị", highlight: "ure" }
      ]
    },
    {
      id: "d_oi",
      symbol: "ɔɪ",
      name: "Âm o-i (oi)",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /ɔː/ sang /ɪ/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Bắt đầu với môi tròn chu như /ɔː/, sau đó dẹt dần sang hai bên thành /ɪ/.",
        tongue: "Lưỡi từ vị trí thấp lùi phía sau chuyển nhanh lên vị trí cao phía trước.",
        jaw: "Hàm dưới di chuyển từ mở sang hơi khép."
      },
      tipsVi: "Giống âm 'oi' trong tiếng Việt nhưng âm đầu tròn môi hơn và kết thúc bằng nụ cười nhẹ.",
      examples: [
        { word: "boy", ipa: "/bɔɪ/", vi: "cậu bé", highlight: "oy" },
        { word: "voice", ipa: "/vɔɪs/", vi: "giọng nói", highlight: "oi" },
        { word: "coin", ipa: "/kɔɪn/", vi: "đồng xu", highlight: "oi" },
        { word: "choice", ipa: "/tʃɔɪs/", vi: "sự lựa chọn", highlight: "oi" }
      ]
    },
    {
      id: "d_ou",
      symbol: "əʊ",
      name: "Âm ơ-u (oh)",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /ə/ sang /ʊ/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi mở tự nhiên ở âm /ə/ rồi chúm tròn dần lại thành /ʊ/.",
        tongue: "Lưỡi từ vị trí giữa lùi về phía sau và hơi nâng lên.",
        jaw: "Hàm khép lại một chút khi môi chúm tròn."
      },
      tipsVi: "Trong tiếng Anh Mỹ thường ký hiệu là /oʊ/. Nghe giống âm 'âu' hoặc 'ô' tròn môi.",
      examples: [
        { word: "show", ipa: "/ʃəʊ/", vi: "cho xem, buổi diễn", highlight: "ow" },
        { word: "go", ipa: "/ɡəʊ/", vi: "đi", highlight: "o" },
        { word: "home", ipa: "/həʊm/", vi: "ngôi nhà", highlight: "o_e" },
        { word: "phone", ipa: "/fəʊn/", vi: "điện thoại", highlight: "o_e" }
      ]
    },
    {
      id: "d_ea",
      symbol: "eə",
      name: "Âm e-ơ (air)",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /e/ sang /ə/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Môi mở vừa phải ở âm /e/, sau đó mở rộng hơn và thả lỏng sang /ə/.",
        tongue: "Lưỡi từ vị trí trước hạ thấp dần về vị trí trung tâm.",
        jaw: "Hàm dưới hơi hạ xuống khi chuyển âm."
      },
      tipsVi: "Nghe như 'e-ơ' lướt nhanh. Trong tiếng Anh Mỹ thường uốn cong lưỡi ở đuôi tạo âm 'er'.",
      examples: [
        { word: "hair", ipa: "/heər/", vi: "mái tóc", highlight: "air" },
        { word: "chair", ipa: "/tʃeər/", vi: "cái ghế", highlight: "air" },
        { word: "care", ipa: "/keər/", vi: "quan tâm", highlight: "are" },
        { word: "share", ipa: "/ʃeər/", vi: "chia sẻ", highlight: "are" }
      ]
    },
    {
      id: "d_ai",
      symbol: "aɪ",
      name: "Âm a-i (ai)",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /a/ sang /ɪ/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Bắt đầu với miệng mở to hình chữ nhật đứng, sau đó khép dần và khóe môi kéo dẹt sang hai bên.",
        tongue: "Lưỡi từ vị trí rất thấp nâng nhanh lên cao về phía trước vòm miệng.",
        jaw: "Hàm dưới chuyển động rõ rệt từ mở rộng sang khép hẹp."
      },
      tipsVi: "Giống âm 'ai' trong tiếng Việt nhưng bắt đầu bằng âm 'a' sâu và kết thúc bằng nụ cười dẹt môi.",
      examples: [
        { word: "my", ipa: "/maɪ/", vi: "của tôi", highlight: "y" },
        { word: "time", ipa: "/taɪm/", vi: "thời gian", highlight: "i_e" },
        { word: "like", ipa: "/laɪk/", vi: "thích", highlight: "i_e" },
        { word: "fly", ipa: "/flaɪ/", vi: "bay", highlight: "y" }
      ]
    },
    {
      id: "d_au",
      symbol: "aʊ",
      name: "Âm a-u (ao)",
      type: "diphthong",
      group: "diphthong",
      typeLabel: "Nguyên âm đôi",
      duration: "Trượt từ /a/ sang /ʊ/",
      vocalCords: "Có rung 🔊",
      mouthGuide: {
        lips: "Bắt đầu mở to thả lỏng, sau đó chúm môi tròn căng về phía trước.",
        tongue: "Lưỡi từ vị trí thấp và phía trước rút lùi về phía sau và hơi nâng lên.",
        jaw: "Hàm mở rộng lúc đầu, sau đó khép dần lại."
      },
      tipsVi: "Giống âm 'ao' trong tiếng Việt nhưng khẩu hình tròn môi rõ rệt hơn ở cuối.",
      examples: [
        { word: "cow", ipa: "/kaʊ/", vi: "con bò sữa", highlight: "ow" },
        { word: "now", ipa: "/naʊ/", vi: "bây giờ", highlight: "ow" },
        { word: "house", ipa: "/haʊs/", vi: "ngôi nhà", highlight: "ou" },
        { word: "mouth", ipa: "/maʊθ/", vi: "cái miệng", highlight: "ou" }
      ]
    }
  ],

  // =========================================================================
  // 2. CONSONANTS (PHỤ ÂM - 24 ÂM)
  // =========================================================================
  consonants: [
    // --- 2.1 UNVOICED CONSONANTS (PHỤ ÂM VÔ THANH - 8 ÂM) ---
    {
      id: "c_p",
      symbol: "p",
      name: "Âm /p/",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Bật hơi)",
      mouthGuide: {
        lips: "Hai môi mím chặt chặn hoàn toàn luồng không khí.",
        tongue: "Lưỡi thả lỏng tự nhiên trong miệng.",
        action: "Bật mạnh hai môi để luồng hơi thoát ra đột ngột tạo thành tiếng gió."
      },
      tipsVi: "Đặt tờ giấy trước miệng: khi phát âm /p/ tờ giấy phải bay mạnh vì có luồng hơi bật ra. Cổ họng tuyệt đối không rung.",
      examples: [
        { word: "pen", ipa: "/pen/", vi: "cây bút", highlight: "p" },
        { word: "stop", ipa: "/stɒp/", vi: "dừng lại", highlight: "p" },
        { word: "apple", ipa: "/ˈæpl/", vi: "quả táo", highlight: "pp" }
      ]
    },
    {
      id: "c_t",
      symbol: "t",
      name: "Âm /t/",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Bật hơi)",
      mouthGuide: {
        lips: "Môi hơi hé mở tự nhiên.",
        tongue: "Đầu lưỡi đặt chạm chặt vào chân nướu răng cửa trên.",
        action: "Bật đầu lưỡi nhanh xuống để luồng hơi nén thoát ra mạnh."
      },
      tipsVi: "Tuyệt đối không phát âm như chữ 'tờ' tiếng Việt. Phải bật hơi sắc sảo và chặn gió ở đầu lưỡi.",
      examples: [
        { word: "tea", ipa: "/tiː/", vi: "trà", highlight: "t" },
        { word: "cat", ipa: "/kæt/", vi: "con mèo", highlight: "t" },
        { word: "water", ipa: "/ˈwɔːtər/", vi: "nước", highlight: "t" }
      ]
    },
    {
      id: "c_tsh",
      symbol: "tʃ",
      name: "Âm /tʃ/ (ch nhẹ)",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Bật hơi)",
      mouthGuide: {
        lips: "Môi chu tròn hướng về phía trước tạo hình phễu.",
        tongue: "Đầu lưỡi chạm ngạc cứng phía trên, sau đó rút lưỡi xuống nhanh giải phóng hơi.",
        action: "Kết hợp giữa âm /t/ và /ʃ/, bật hơi xì mạnh ra ngoài."
      },
      tipsVi: "Giống âm 'ch' tiếng Việt nhưng môi phải chu ra trước và bật luồng hơi mạnh mẽ.",
      examples: [
        { word: "church", ipa: "/tʃɜːrtʃ/", vi: "nhà thờ", highlight: "ch" },
        { word: "cheese", ipa: "/tʃiːz/", vi: "phô mai", highlight: "ch" },
        { word: "watch", ipa: "/wɒtʃ/", vi: "đồng hồ, xem", highlight: "ch" }
      ]
    },
    {
      id: "c_k",
      symbol: "k",
      name: "Âm /k/",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Bật hơi)",
      mouthGuide: {
        lips: "Miệng hơi mở tự nhiên theo nguyên âm đi kèm.",
        tongue: "Cuống lưỡi nâng lên chạm ngạc mềm (vòm họng sau) để chặn luồng khí.",
        action: "Hạ nhanh cuống lưỡi xuống để luồng hơi bật ra từ cổ họng."
      },
      tipsVi: "Giống âm 'c' trong tiếng Việt nhưng bật mạnh luồng hơi từ cuống họng, thanh quản không rung.",
      examples: [
        { word: "cat", ipa: "/kæt/", vi: "con mèo", highlight: "c" },
        { word: "key", ipa: "/kiː/", vi: "chìa khóa", highlight: "k" },
        { word: "black", ipa: "/blæk/", vi: "màu đen", highlight: "ck" }
      ]
    },
    {
      id: "c_f",
      symbol: "f",
      name: "Âm /f/",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Âm xát)",
      mouthGuide: {
        lips: "Hàm răng trên nhẹ nhàng chạm vào lòng môi dưới.",
        tongue: "Lưỡi thả lỏng tự nhiên.",
        action: "Đẩy luồng không khí ma sát thoát ra qua khe hở giữa răng trên và môi dưới."
      },
      tipsVi: "Răng trên cắn nhẹ môi dưới và thổi hơi xì ra. Cổ họng không rung.",
      examples: [
        { word: "fish", ipa: "/fɪʃ/", vi: "con cá", highlight: "f" },
        { word: "coffee", ipa: "/ˈkɒfi/", vi: "cà phê", highlight: "ff" },
        { word: "life", ipa: "/laɪf/", vi: "cuộc sống", highlight: "fe" }
      ]
    },
    {
      id: "c_theta",
      symbol: "θ",
      name: "Âm /θ/ (th thổi hơi)",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Âm răng)",
      mouthGuide: {
        lips: "Môi mở hé tự nhiên.",
        tongue: "Đầu lưỡi đặt giữa hai hàm răng cửa (thè nhẹ đầu lưỡi ra ngoài).",
        action: "Thổi luồng hơi thoát ra qua khe giữa lưỡi và răng cửa trên."
      },
      tipsVi: "ĐẶC BIỆT: Đây là âm người Việt hay sai nhất! Phải đưa đầu lưỡi ra giữa 2 hàm răng và thổi hơi, KHÔNG ĐƯỢC đọc thành 'th' hay 't' tiếng Việt.",
      examples: [
        { word: "think", ipa: "/θɪŋk/", vi: "nghĩ, suy nghĩ", highlight: "th" },
        { word: "thank", ipa: "/θæŋk/", vi: "cảm ơn", highlight: "th" },
        { word: "bath", ipa: "/bɑːθ/", vi: "bồn tắm", highlight: "th" }
      ]
    },
    {
      id: "c_s",
      symbol: "s",
      name: "Âm /s/ (s xì nhẹ)",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Âm xát)",
      mouthGuide: {
        lips: "Môi hơi kéo nhẹ sang hai bên, miệng mở hé.",
        tongue: "Đầu lưỡi đưa sát chân răng cửa trên nhưng không chạm hẳn.",
        action: "Đẩy luồng hơi ma sát thoát ra qua khe hẹp tạo tiếng xì gió nhẹ như tiếng rắn rít."
      },
      tipsVi: "Tiếng xì gió nhẹ nhàng. Đây là âm đuôi 's' cực kỳ quan trọng trong số nhiều và chia động từ tiếng Anh.",
      examples: [
        { word: "see", ipa: "/siː/", vi: "nhìn thấy", highlight: "s" },
        { word: "bus", ipa: "/bʌs/", vi: "xe buýt", highlight: "s" },
        { word: "city", ipa: "/ˈsɪti/", vi: "thành phố", highlight: "c" }
      ]
    },
    {
      id: "c_sh",
      symbol: "ʃ",
      name: "Âm /ʃ/ (s nặng/chu môi)",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm vô thanh",
      vocalCords: "KHÔNG rung 💨 (Âm xát)",
      mouthGuide: {
        lips: "Môi chu tròn hướng hẳn về phía trước như đang ra hiệu im lặng 'Suỵt!'.",
        tongue: "Đầu lưỡi cong nhẹ lên hướng về ngạc cứng.",
        action: "Thổi luồng không khí dày thoát ra tạo tiếng rít trầm và dày hơn âm /s/."
      },
      tipsVi: "Môi phải chu ra trước và hơi đẩy ra tạo tiếng 'suỵt'. Khác biệt hoàn toàn với /s/ dẹt môi.",
      examples: [
        { word: "she", ipa: "/ʃiː/", vi: "cô ấy", highlight: "sh" },
        { word: "shop", ipa: "/ʃɒp/", vi: "cửa hàng", highlight: "sh" },
        { word: "fish", ipa: "/fɪʃ/", vi: "con cá", highlight: "sh" }
      ]
    },

    // --- 2.2 VOICED CONSONANTS (PHỤ ÂM HỮU THANH - 16 ÂM) ---
    {
      id: "c_b",
      symbol: "b",
      name: "Âm /b/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Hai môi mím chặt chặn khí tương tự âm /p/.",
        tongue: "Lưỡi thả lỏng.",
        action: "Bật hai môi mở ra đồng thời làm rung dây thanh quản tạo âm /b/."
      },
      tipsVi: "Đặt tay lên cổ họng: khi phát âm /b/ cổ họng phải rung lên rõ rệt. Khác với /p/ chỉ bật hơi.",
      examples: [
        { word: "boat", ipa: "/bəʊt/", vi: "con thuyền", highlight: "b" },
        { word: "big", ipa: "/bɪɡ/", vi: "to lớn", highlight: "b" },
        { word: "job", ipa: "/dʒɒb/", vi: "công việc", highlight: "b" }
      ]
    },
    {
      id: "c_d",
      symbol: "d",
      name: "Âm /d/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi mở hé tự nhiên.",
        tongue: "Đầu lưỡi chạm nướu răng cửa trên tương tự âm /t/.",
        action: "Bật đầu lưỡi xuống đồng thời làm rung thanh quản."
      },
      tipsVi: "Cổ họng rung mạnh, đầu lưỡi bật nảy tạo âm thanh dứt khoát. Nhớ phát âm rõ khi đứng ở cuối từ (bad, red).",
      examples: [
        { word: "dog", ipa: "/dɒɡ/", vi: "con chó", highlight: "d" },
        { word: "door", ipa: "/dɔːr/", vi: "cánh cửa", highlight: "d" },
        { word: "red", ipa: "/red/", vi: "màu đỏ", highlight: "d" }
      ]
    },
    {
      id: "c_dzh",
      symbol: "dʒ",
      name: "Âm /dʒ/ (ch rung)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi chu tròn về phía trước giống âm /tʃ/.",
        tongue: "Đầu lưỡi chạm ngạc cứng rồi rút xuống.",
        action: "Phát âm giống /tʃ/ nhưng cổ họng rung lên mạnh mẽ."
      },
      tipsVi: "Khẩu hình giống /tʃ/ nhưng bắt buộc phải làm rung cổ họng, âm nghe trầm và dày dặn.",
      examples: [
        { word: "job", ipa: "/dʒɒb/", vi: "công việc", highlight: "j" },
        { word: "juice", ipa: "/dʒuːs/", vi: "nước ép", highlight: "j" },
        { word: "bridge", ipa: "/brɪdʒ/", vi: "cây cầu", highlight: "dge" }
      ]
    },
    {
      id: "c_g",
      symbol: "ɡ",
      name: "Âm /ɡ/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Miệng mở tự nhiên.",
        tongue: "Cuống lưỡi nâng chạm ngạc mềm chặn khí như âm /k/.",
        action: "Hạ cuống lưỡi xuống đồng thời làm rung thanh quản."
      },
      tipsVi: "Cặp bài trùng với /k/. Khẩu hình giống hệt nhưng cổ họng rung to rõ.",
      examples: [
        { word: "girl", ipa: "/ɡɜːrl/", vi: "cô gái", highlight: "g" },
        { word: "good", ipa: "/ɡʊd/", vi: "tốt", highlight: "g" },
        { word: "bag", ipa: "/bæɡ/", vi: "cái túi", highlight: "g" }
      ]
    },
    {
      id: "c_v",
      symbol: "v",
      name: "Âm /v/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Răng cửa trên chạm nhẹ vào lòng môi dưới giống âm /f/.",
        tongue: "Lưỡi thả lỏng.",
        action: "Đẩy hơi thoát ra qua kẽ răng đồng thời làm rung thanh quản tạo tiếng rè rè."
      },
      tipsVi: "Cặp bài trùng với /f/. Răng trên cắn môi dưới và tạo độ rung tê nhẹ ở môi.",
      examples: [
        { word: "voice", ipa: "/vɔɪs/", vi: "giọng nói", highlight: "v" },
        { word: "very", ipa: "/ˈveri/", vi: "rất", highlight: "v" },
        { word: "love", ipa: "/lʌv/", vi: "yêu thương", highlight: "ve" }
      ]
    },
    {
      id: "c_eth",
      symbol: "ð",
      name: "Âm /ð/ (th rung)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi mở tự nhiên.",
        tongue: "Đầu lưỡi kẹp nhẹ giữa hai hàm răng cửa giống âm /θ/.",
        action: "Đẩy hơi qua kẽ răng đồng thời làm rung thanh quản tạo độ rung ở đầu lưỡi."
      },
      tipsVi: "Khẩu hình thè nhẹ lưỡi giống /θ/, nhưng cổ họng và đầu lưỡi rung lên rõ rệt (this, that, they).",
      examples: [
        { word: "this", ipa: "/ðɪs/", vi: "cái này", highlight: "th" },
        { word: "mother", ipa: "/ˈmʌðər/", vi: "mẹ", highlight: "th" },
        { word: "breathe", ipa: "/briːð/", vi: "hít thở", highlight: "the" }
      ]
    },
    {
      id: "c_z",
      symbol: "z",
      name: "Âm /z/ (s rung)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi hơi kéo sang hai bên giống âm /s/.",
        tongue: "Đầu lưỡi sát nướu răng cửa trên.",
        action: "Thổi hơi qua kẽ răng đồng thời làm rung thanh quản tạo tiếng vo ve như tiếng ong bay."
      },
      tipsVi: "Cặp bài trùng với /s/. Cổ họng rung tạo tiếng 'zzzz' rõ rệt.",
      examples: [
        { word: "zoo", ipa: "/zuː/", vi: "sở thú", highlight: "z" },
        { word: "easy", ipa: "/ˈiːzi/", vi: "dễ dàng", highlight: "s" },
        { word: "rose", ipa: "/rəʊz/", vi: "hoa hồng", highlight: "se" }
      ]
    },
    {
      id: "c_ezh",
      symbol: "ʒ",
      name: "Âm /ʒ/ (s nặng rung)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi chu tròn hướng về phía trước giống âm /ʃ/.",
        tongue: "Đầu lưỡi cong nhẹ lên ngạc cứng.",
        action: "Thổi luồng hơi thoát ra đồng thời làm rung thanh quản."
      },
      tipsVi: "Khẩu hình giống /ʃ/ (suỵt) nhưng cổ họng rung lên. Thường xuất hiện trong 'vision', 'measure'.",
      examples: [
        { word: "vision", ipa: "/ˈvɪʒn/", vi: "tầm nhìn", highlight: "si" },
        { word: "measure", ipa: "/ˈmeʒər/", vi: "đo lường", highlight: "s" },
        { word: "decision", ipa: "/dɪˈsɪʒn/", vi: "quyết định", highlight: "si" }
      ]
    },
    {
      id: "c_m",
      symbol: "m",
      name: "Âm /m/ (mũi)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm mũi / Hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Hai môi ngậm kín nhẹ nhàng.",
        tongue: "Lưỡi thả lỏng tự nhiên.",
        action: "Luồng hơi đi hoàn toàn lên khoang mũi và thoát ra ngoài làm rung vòm mũi."
      },
      tipsVi: "Ngậm môi và ngân âm trong mũi. Khi đứng cuối từ phải giữ môi ngậm (time, team).",
      examples: [
        { word: "man", ipa: "/mæn/", vi: "người đàn ông", highlight: "m" },
        { word: "name", ipa: "/neɪm/", vi: "tên", highlight: "m" },
        { word: "time", ipa: "/taɪm/", vi: "thời gian", highlight: "m" }
      ]
    },
    {
      id: "c_n",
      symbol: "n",
      name: "Âm /n/ (mũi)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm mũi / Hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Miệng hé mở tự nhiên.",
        tongue: "Đầu lưỡi chạm sát chân nướu răng hàm trên chặn luồng hơi miệng.",
        action: "Hơi đi qua khoang mũi làm rung mũi."
      },
      tipsVi: "Đầu lưỡi dính chặt lên hàm trên, âm thoát ra từ mũi. Chú ý âm cuối từ (sun, run).",
      examples: [
        { word: "now", ipa: "/naʊ/", vi: "bây giờ", highlight: "n" },
        { word: "sun", ipa: "/sʌn/", vi: "mặt trời", highlight: "n" },
        { word: "clean", ipa: "/kliːn/", vi: "sạch sẽ", highlight: "n" }
      ]
    },
    {
      id: "c_eng",
      symbol: "ŋ",
      name: "Âm /ŋ/ (ng mũi)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm mũi / Hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Miệng mở tự nhiên.",
        tongue: "Cuống lưỡi nâng lên chạm ngạc mềm chặn hoàn toàn hơi ở miệng.",
        action: "Hơi thoát hoàn toàn qua khoang mũi."
      },
      tipsVi: "Giống âm 'ng' trong tiếng Việt. Thường gặp trong đuôi '-ing'.",
      examples: [
        { word: "sing", ipa: "/sɪŋ/", vi: "hát", highlight: "ng" },
        { word: "ring", ipa: "/rɪŋ/", vi: "chiếc nhẫn", highlight: "ng" },
        { word: "long", ipa: "/lɒŋ/", vi: "dài", highlight: "ng" }
      ]
    },
    {
      id: "c_h",
      symbol: "h",
      name: "Âm /h/",
      type: "consonant_unvoiced",
      group: "unvoiced",
      typeLabel: "Phụ âm hơi",
      vocalCords: "KHÔNG rung 💨",
      mouthGuide: {
        lips: "Miệng mở theo hình dạng nguyên âm đứng sau nó.",
        tongue: "Lưỡi thả lỏng.",
        action: "Thở hắt nhẹ luồng không khí từ cổ họng ra ngoài như tiếng thở dài."
      },
      tipsVi: "Rất nhẹ nhàng, chỉ là luồng hơi thở ra từ họng mà không làm rung cổ họng.",
      examples: [
        { word: "hat", ipa: "/hæt/", vi: "cái mũ", highlight: "h" },
        { word: "hot", ipa: "/hɒt/", vi: "nóng", highlight: "h" },
        { word: "hello", ipa: "/həˈləʊ/", vi: "xin chào", highlight: "h" }
      ]
    },
    {
      id: "c_l",
      symbol: "l",
      name: "Âm /l/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm bên / Hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Miệng mở tự nhiên.",
        tongue: "Đầu lưỡi chạm nướu răng cửa trên.",
        action: "Luồng hơi đi vòng qua hai bên rìa lưỡi thoát ra ngoài."
      },
      tipsVi: "Khi đứng cuối từ (Dark L: milk, call, school), cuống lưỡi hơi nâng nhẹ tạo âm thanh trầm ấm.",
      examples: [
        { word: "leg", ipa: "/leɡ/", vi: "cái chân", highlight: "l" },
        { word: "call", ipa: "/kɔːl/", vi: "gọi điện", highlight: "ll" },
        { word: "light", ipa: "/laɪt/", vi: "ánh sáng", highlight: "l" }
      ]
    },
    {
      id: "c_r",
      symbol: "r",
      name: "Âm /r/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Phụ âm hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi hơi chu tròn nhẹ về phía trước.",
        tongue: "Đầu lưỡi cong ngược lên về phía ngạc cứng nhưng KHÔNG ĐƯỢC CHẠM vào vòm miệng.",
        action: "Luồng khí đi qua mặt lưỡi và làm rung thanh quản."
      },
      tipsVi: "Đầu lưỡi tuyệt đối không được chạm vào vòm miệng (không rung 'r' như tiếng Việt hay tiếng Nga).",
      examples: [
        { word: "red", ipa: "/red/", vi: "màu đỏ", highlight: "r" },
        { word: "right", ipa: "/raɪt/", vi: "đúng, bên phải", highlight: "r" },
        { word: "river", ipa: "/ˈrɪvər/", vi: "dòng sông", highlight: "r" }
      ]
    },
    {
      id: "c_w",
      symbol: "w",
      name: "Âm /w/",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Bán nguyên âm / Hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Chu môi tròn và nhỏ như đang huýt sáo.",
        tongue: "Cuống lưỡi nâng cao về phía sau.",
        action: "Mở nhanh môi sang khẩu hình của nguyên âm đi sau."
      },
      tipsVi: "Khởi đầu từ âm /uː/ chu tròn môi rồi mở nhanh ra, giống âm 'qu' hoặc 'uơ'.",
      examples: [
        { word: "wet", ipa: "/wet/", vi: "ẩm ướt", highlight: "w" },
        { word: "water", ipa: "/ˈwɔːtər/", vi: "nước", highlight: "w" },
        { word: "window", ipa: "/ˈwɪndəʊ/", vi: "cửa sổ", highlight: "w" }
      ]
    },
    {
      id: "c_j",
      symbol: "j",
      name: "Âm /j/ (d)",
      type: "consonant_voiced",
      group: "voiced",
      typeLabel: "Bán nguyên âm / Hữu thanh",
      vocalCords: "CÓ RUNG 🔊",
      mouthGuide: {
        lips: "Môi mở hé dẹt sang hai bên.",
        tongue: "Thân lưỡi nâng rất cao chạm gần ngạc cứng như âm /iː/.",
        action: "Lướt nhanh thân lưỡi xuống tạo thành âm /j/ trước nguyên âm kế tiếp."
      },
      tipsVi: "Gần giống âm 'd/gi' của miền Nam Việt Nam (trong 'da', 'gió') nhưng lướt mượt mà như 'i-e'.",
      examples: [
        { word: "yes", ipa: "/jes/", vi: "đồng ý", highlight: "y" },
        { word: "yellow", ipa: "/ˈjeləʊ/", vi: "màu vàng", highlight: "y" },
        { word: "you", ipa: "/juː/", vi: "bạn", highlight: "y" }
      ]
    }
  ],

  // =========================================================================
  // 3. MINIMAL PAIRS (CÁC CẶP ÂM KINH ĐIỂN DỄ NHẦM LẪN)
  // =========================================================================
  minimalPairs: [
    {
      id: "pair_i_long_short",
      title: "Cặp âm /iː/ vs /ɪ/",
      soundA: "iː",
      soundB: "ɪ",
      desc: "/iː/ kéo dài, dẹt căng môi; /ɪ/ ngắn giật, môi thả lỏng tự nhiên.",
      pairs: [
        { wordA: "sheep", ipaA: "/ʃiːp/", viA: "con cừu", wordB: "ship", ipaB: "/ʃɪp/", viB: "tàu thủy" },
        { wordA: "seat", ipaA: "/siːt/", viA: "chỗ ngồi", wordB: "sit", ipaB: "/sɪt/", viB: "ngồi xuống" },
        { wordA: "heat", ipaA: "/hiːt/", viA: "sức nóng", wordB: "hit", ipaB: "/hɪt/", viB: "đánh, trúng" },
        { wordA: "sleep", ipaA: "/sliːp/", viA: "ngủ", wordB: "slip", ipaB: "/slɪp/", viB: "trượt ngã" }
      ]
    },
    {
      id: "pair_u_long_short",
      title: "Cặp âm /uː/ vs /ʊ/",
      soundA: "uː",
      soundB: "ʊ",
      desc: "/uː/ chu môi tròn căng, ngân dài; /ʊ/ môi thả lỏng, ngắt hơi dứt khoát.",
      pairs: [
        { wordA: "fool", ipaA: "/fuːl/", viA: "kẻ ngốc", wordB: "full", ipaB: "/fʊl/", viB: "đầy đủ" },
        { wordA: "pool", ipaA: "/puːl/", viA: "hồ bơi", wordB: "pull", ipaB: "/pʊl/", viB: "kéo lại" },
        { wordA: "shoot", ipaA: "/ʃuːt/", viA: "bắn", wordB: "foot", ipaB: "/fʊt/", viB: "bàn chân" }
      ]
    },
    {
      id: "pair_e_ae",
      title: "Cặp âm /e/ vs /æ/",
      soundA: "e",
      soundB: "æ",
      desc: "/e/ mở hàm vừa phải; /æ/ hạ hàm thật sâu, khóe miệng kéo rộng sang hai bên.",
      pairs: [
        { wordA: "bed", ipaA: "/bed/", viA: "cái giường", wordB: "bad", ipaB: "/bæd/", viB: "tồi tệ, xấu" },
        { wordA: "men", ipaA: "/men/", viA: "những người đàn ông", wordB: "man", ipaB: "/mæn/", viB: "một người đàn ông" },
        { wordA: "pen", ipaA: "/pen/", viA: "cây bút", wordB: "pan", ipaB: "/pæn/", viB: "cái chảo" }
      ]
    },
    {
      id: "pair_s_sh",
      title: "Cặp âm /s/ vs /ʃ/",
      soundA: "s",
      soundB: "ʃ",
      desc: "/s/ khóe miệng dẹt sang hai bên, xì gió nhẹ; /ʃ/ môi chu tròn về trước tạo tiếng suỵt dày.",
      pairs: [
        { wordA: "see", ipaA: "/siː/", viA: "nhìn thấy", wordB: "she", ipaB: "/ʃiː/", viB: "cô ấy" },
        { wordA: "sea", ipaA: "/siː/", viA: "biển", wordB: "she", ipaB: "/ʃiː/", viB: "cô ấy" },
        { wordA: "sock", ipaA: "/sɒk/", viA: "chiếc tất", wordB: "shock", ipaB: "/ʃɒk/", viB: "cú sốc" },
        { wordA: "suit", ipaA: "/suːt/", viA: "bộ vest", wordB: "shoot", ipaB: "/ʃuːt/", viB: "bắn" }
      ]
    },
    {
      id: "pair_theta_eth",
      title: "Cặp âm /θ/ vs /ð/",
      soundA: "θ",
      soundB: "ð",
      desc: "Cả hai đều kẹp nhẹ đầu lưỡi giữa răng; /θ/ chỉ thổi hơi (vô thanh), /ð/ cổ họng rung (hữu thanh).",
      pairs: [
        { wordA: "think", ipaA: "/θɪŋk/", viA: "suy nghĩ", wordB: "this", ipaB: "/ðɪs/", viB: "cái này" },
        { wordA: "teeth", ipaA: "/tiːθ/", viA: "hàm răng", wordB: "teethe", ipaB: "/tiːð/", viB: "mọc răng" },
        { wordA: "breath", ipaA: "/breθ/", viA: "hơi thở", wordB: "breathe", ipaB: "/briːð/", viB: "hít thở" }
      ]
    },
    {
      id: "pair_p_b",
      title: "Cặp âm /p/ vs /b/",
      soundA: "p",
      soundB: "b",
      desc: "Đều mím môi bật hơi; /p/ là luồng hơi mạnh không rung, /b/ làm rung mạnh dây thanh quản.",
      pairs: [
        { wordA: "pen", ipaA: "/pen/", viA: "cây bút", wordB: "Ben", ipaB: "/ben/", viB: "tên Ben" },
        { wordA: "pear", ipaA: "/peər/", viA: "quả lê", wordB: "bear", ipaB: "/beər/", viB: "con gấu" },
        { wordA: "cap", ipaA: "/kæp/", viA: "mũ lưỡi trai", wordB: "cab", ipaB: "/kæb/", viB: "xe taxi" }
      ]
    },
    {
      id: "pair_l_r",
      title: "Cặp âm /l/ vs /r/",
      soundA: "l",
      soundB: "r",
      desc: "/l/ đầu lưỡi chạm nướu răng trên; /r/ đầu lưỡi uốn cong về ngạc nhưng không được chạm vào vòm miệng.",
      pairs: [
        { wordA: "light", ipaA: "/laɪt/", viA: "ánh sáng", wordB: "right", ipaB: "/raɪt/", viB: "đúng, bên phải" },
        { wordA: "lock", ipaA: "/lɒk/", viA: "khóa lại", wordB: "rock", ipaB: "/rɒk/", viB: "hòn đá" },
        { wordA: "glass", ipaA: "/ɡlɑːs/", viA: "cái ly", wordB: "grass", ipaB: "/ɡrɑːs/", viB: "bãi cỏ" }
      ]
    }
  ],

  // =========================================================================
  // 4. EAR TRAINING QUIZZES (BÀI TẬP LUYỆN TAI NGHE ÂM IPA)
  // =========================================================================
  quizBank: [
    {
      id: "q1",
      audioWord: "sheep",
      question: "Từ được phát âm chứa nguyên âm nào?",
      correctIpa: "iː",
      options: ["iː", "ɪ", "e", "æ"],
      explanation: "'sheep' /ʃiːp/ chứa âm /iː/ dài, môi dẹt căng sang hai bên."
    },
    {
      id: "q2",
      audioWord: "ship",
      question: "Từ được phát âm chứa nguyên âm nào?",
      correctIpa: "ɪ",
      options: ["iː", "ɪ", "e", "aɪ"],
      explanation: "'ship' /ʃɪp/ chứa âm /ɪ/ ngắn dứt khoát, môi thả lỏng."
    },
    {
      id: "q3",
      audioWord: "cat",
      question: "Từ 'cat' có nguyên âm chính là gì?",
      correctIpa: "æ",
      options: ["e", "æ", "ʌ", "ɑː"],
      explanation: "'cat' /kæt/ chứa âm a bẹt /æ/, miệng mở to cả hai chiều."
    },
    {
      id: "q4",
      audioWord: "think",
      question: "Âm đầu tiên của từ 'think' là phụ âm gì?",
      correctIpa: "θ",
      options: ["s", "θ", "ð", "t"],
      explanation: "'think' /θɪŋk/ bắt đầu bằng âm vô thanh /θ/ (thổi hơi qua kẽ răng)."
    },
    {
      id: "q5",
      audioWord: "this",
      question: "Âm đầu tiên của từ 'this' là phụ âm gì?",
      correctIpa: "ð",
      options: ["θ", "ð", "d", "z"],
      explanation: "'this' /ðɪs/ bắt đầu bằng phụ âm hữu thanh /ð/ (kẹp lưỡi rung cổ họng)."
    },
    {
      id: "q6",
      audioWord: "she",
      question: "Âm đầu tiên của từ 'she' là phụ âm gì?",
      correctIpa: "ʃ",
      options: ["s", "ʃ", "tʃ", "z"],
      explanation: "'she' /ʃiː/ bắt đầu bằng âm /ʃ/ chu môi dày đặc."
    },
    {
      id: "q7",
      audioWord: "bird",
      question: "Từ 'bird' chứa nguyên âm dài nào?",
      correctIpa: "ɜː",
      options: ["ɜː", "ɔː", "ə", "ɑː"],
      explanation: "'bird' /bɜːrd/ chứa âm ơ dài /ɜː/ sâu trong cổ họng."
    },
    {
      id: "q8",
      audioWord: "boy",
      question: "Từ 'boy' chứa nguyên âm đôi nào?",
      correctIpa: "ɔɪ",
      options: ["eɪ", "aɪ", "ɔɪ", "əʊ"],
      explanation: "'boy' /bɔɪ/ chứa nguyên âm đôi /ɔɪ/ trượt từ tròn sang dẹt môi."
    }
  ]
};
