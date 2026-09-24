// =========================================================================
// ENGMASTER COMPREHENSIVE LISTENING TEST & PRACTICE SUITE
// 8 In-Depth Test Modes for all 12 Real-Life Bilingual English Dialogues:
// 1. Choose: Multiple-Choice Comprehension Quiz
// 2. Fill: Fill-in-the-Blank with Hints
// 3. Dictation: Listen & Type Accurate Transcript with Diff Checking
// 4. Arrange: Unscramble Interactive Word Chips into Complete Sentences
// 5. Match: Interactive Question-Response / Concept Pairing
// 6. Identify: Speaker Attribution (Speaker A/B) & True/False Logic
// 7. Shadowing: Native Audio Listen & Speech Recognition Pronunciation Scorer
// 8. Note-taking: Guided Key Information Note-taking & Keyword Discovery Checklist
// =========================================================================

window.LISTENING_TESTS_DATA = {
  // -------------------------------------------------------------
  // DIALOGUE 1: Airport Check-in & Boarding (Check-in Sân Bay & Lên Máy Bay)
  // -------------------------------------------------------------
  1: {
    choose: [
      {
        id: "c1_1",
        question: "Where is Emma traveling to?",
        options: ["Paris Charles de Gaulle", "London Heathrow", "New York JFK", "Tokyo Haneda"],
        answer: 1,
        explanation: "Trong lượt thoại thứ 2, Emma nói: 'I'm flying to London Heathrow on flight SW402.'"
      },
      {
        id: "c1_2",
        question: "What specific seat preference did Emma request?",
        options: ["A seat in the first row", "An aisle seat near the restroom", "A window seat", "An exit row seat with extra legroom"],
        answer: 2,
        explanation: "Emma hỏi: 'Could you please check if a window seat is still available?' và được cấp ghế 14A."
      },
      {
        id: "c1_3",
        question: "What time does boarding start at Gate 24?",
        options: ["10:00 AM", "10:15 AM", "10:45 AM", "11:15 AM"],
        answer: 1,
        explanation: "Marcus thông báo: 'Boarding starts promptly at 10:15 at Gate 24.'"
      },
      {
        id: "c1_4",
        question: "How heavy is Emma's checked suitcase?",
        options: ["15 kilograms", "19 kilograms", "23 kilograms", "25 kilograms"],
        answer: 1,
        explanation: "Marcus thông báo khi cân vali: 'It weighs 19 kilograms, which is well within your limit.'"
      }
    ],
    fill: [
      {
        id: "f1_1",
        sentence: "Emma is flying to London Heathrow on [ ______ ] SW402.",
        correctWord: "flight",
        hint: "Gợi ý: Chuyến bay tiếng Anh là 'f...'",
        explanation: "Lượt thoại 2: '...on flight SW402.'"
      },
      {
        id: "f1_2",
        sentence: "Marcus assigns Emma seat 14A in [ ______ ] class.",
        correctWord: "economy",
        hint: "Gợi ý: Hạng phổ thông (economy)",
        explanation: "Marcus nói: 'I have seat 14A available for you in economy class.'"
      },
      {
        id: "f1_3",
        sentence: "Emma will take a small backpack as her [ ______ ] bag.",
        correctWord: "carry-on",
        hint: "Gợi ý: Hành lý xách tay (carry-on)",
        explanation: "Emma nói: '...and I will take this small backpack as my carry-on bag.'"
      },
      {
        id: "f1_4",
        sentence: "Boarding begins promptly at Gate 24 at [ ______ ] in the morning.",
        correctWord: "10:15",
        hint: "Gợi ý: Giờ lên máy bay (10:15)",
        explanation: "Marcus: 'Boarding starts promptly at 10:15 at Gate 24.'"
      }
    ],
    dictation: [
      {
        id: "d1_1",
        speaker: "Marcus",
        text: "Where are you flying to today?",
        vi: "Hôm nay quý khách bay đi đâu ạ?",
        hint: "Câu hỏi mở đầu lịch sự của nhân viên"
      },
      {
        id: "d1_2",
        speaker: "Emma",
        text: "Could you please check if a window seat is still available?",
        vi: "Anh kiểm tra giúp tôi xem còn ghế cạnh cửa sổ không nhé?",
        hint: "Câu đề nghị lịch sự với 'Could you please...'"
      },
      {
        id: "d1_3",
        speaker: "Marcus",
        text: "Boarding starts promptly at 10:15 at Gate 24.",
        vi: "Thời gian lên máy bay bắt đầu lúc đúng 10:15 tại Cửa số 24.",
        hint: "Thông báo giờ và cửa ra máy bay"
      }
    ],
    arrange: [
      {
        id: "a1_1",
        fullSentence: "May I please see your passport and booking confirmation code?",
        scrambledWords: ["passport", "please", "code?", "I", "May", "and", "booking", "see", "your", "confirmation"],
        vi: "Tôi có thể xem hộ chiếu và mã xác nhận đặt chỗ của quý khách được không?"
      },
      {
        id: "a1_2",
        fullSentence: "Please place your suitcase onto the scale.",
        scrambledWords: ["onto", "Please", "the", "scale.", "suitcase", "your", "place"],
        vi: "Xin quý khách đặt vali lên bàn cân."
      },
      {
        id: "a1_3",
        fullSentence: "Thank you so much for your assistance.",
        scrambledWords: ["for", "assistance.", "much", "Thank", "so", "your", "you"],
        vi: "Cảm ơn anh rất nhiều vì đã giúp đỡ."
      }
    ],
    match: [
      {
        id: "m1_1",
        left: "Where are you flying to today?",
        right: "I'm flying to London Heathrow on flight SW402."
      },
      {
        id: "m1_2",
        left: "May I please see your passport?",
        right: "Certainly, here you go."
      },
      {
        id: "m1_3",
        left: "How many bags are you checking in?",
        right: "Just this large suitcase, and a small backpack."
      },
      {
        id: "m1_4",
        left: "What time does boarding begin?",
        right: "Boarding starts promptly at 10:15 at Gate 24."
      }
    ],
    identify: [
      {
        id: "i1_1",
        type: "speaker",
        quote: "Could you please check if a window seat is still available?",
        speakerA: "Emma (Hành khách)",
        speakerB: "Marcus (Nhân viên)",
        answer: "A",
        explanation: "Emma là hành khách đưa ra yêu cầu chọn ghế cửa sổ."
      },
      {
        id: "i1_2",
        type: "speaker",
        quote: "It weighs 19 kilograms, which is well within your limit.",
        speakerA: "Emma (Hành khách)",
        speakerB: "Marcus (Nhân viên)",
        answer: "B",
        explanation: "Marcus kiểm tra đồng hồ cân hành lý và thông báo cân nặng."
      },
      {
        id: "i1_3",
        type: "tf",
        statement: "Emma is traveling on flight SW402.",
        answer: true,
        explanation: "Đúng. Emma thông báo chuyến bay của mình là SW402."
      },
      {
        id: "i1_4",
        type: "tf",
        statement: "Emma has to pay an extra overweight fee for her luggage.",
        answer: false,
        explanation: "Sai. Vali nặng 19kg, hoàn toàn nằm trong mức cho phép (well within limit)."
      }
    ],
    shadowing: [
      {
        id: "s1_1",
        speaker: "Emma",
        text: "I'm flying to London Heathrow on flight SW402.",
        vi: "Tôi bay đến sân bay London Heathrow trên chuyến bay SW402.",
        difficulty: "Dễ"
      },
      {
        id: "s1_2",
        speaker: "Emma",
        text: "Could you please check if a window seat is still available?",
        vi: "Anh kiểm tra giúp tôi xem còn ghế cạnh cửa sổ không nhé?",
        difficulty: "Trung bình"
      },
      {
        id: "s1_3",
        speaker: "Marcus",
        text: "Boarding starts promptly at 10:15 at Gate 24.",
        vi: "Thời gian lên máy bay bắt đầu lúc đúng 10:15 tại Cửa số 24.",
        difficulty: "Trung bình"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép thông tin Thủ tục Sân bay & Lên máy bay",
      missionPrompt: "Nghe bài hội thoại và ghi chép lại các chi tiết then chốt: Điểm đến, Mã chuyến bay, Vị trí ghế, Cân nặng vali, Giờ lên máy bay và Cửa khởi hành.",
      keyFacts: [
        { key: "London Heathrow", label: "Điểm đến: London Heathrow", synonyms: ["london", "heathrow", "london heathrow"] },
        { key: "SW402", label: "Chuyến bay: SW402", synonyms: ["sw402", "sw 402", "flight sw402"] },
        { key: "14A", label: "Số ghế: 14A (ghế cửa sổ)", synonyms: ["14a", "14 a", "seat 14a", "window"] },
        { key: "19 kg", label: "Cân nặng vali: 19 kg", synonyms: ["19", "19kg", "19 kg", "19 kilograms"] },
        { key: "10:15", label: "Giờ boarding: 10:15", synonyms: ["10:15", "10h15", "10.15"] },
        { key: "Gate 24", label: "Cửa khởi hành: Gate 24", synonyms: ["24", "gate 24", "gate24", "cửa 24"] }
      ],
      sampleNotes: "Hành khách Emma bay đến London Heathrow trên chuyến bay SW402. Được cấp ghế cửa sổ 14A hạng phổ thông. Gửi 1 vali nặng 19kg (đúng quy định) và mang 1 balo xách tay. Cửa lên máy bay là Gate 24, bắt đầu lúc 10:15."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 2: Hotel Check-in & Amenities (Nhận Phòng Khách Sạn & Dịch Vụ)
  // -------------------------------------------------------------
  2: {
    choose: [
      {
        id: "c2_1",
        question: "How long will Lucas be staying at Grand Horizon Resort?",
        options: ["One night", "Two nights", "Three nights", "One week"],
        answer: 2,
        explanation: "Lucas nói ở lượt 2: 'I have a reservation under the name Lucas Vance for three nights.'"
      },
      {
        id: "c2_2",
        question: "What room type was reserved for Lucas?",
        options: ["Standard Twin Room", "Deluxe King Room with ocean view", "Presidential Suite", "Single Garden Studio"],
        answer: 1,
        explanation: "Sophie xác nhận: '...a Deluxe King Room with an ocean view.'"
      },
      {
        id: "c2_3",
        question: "When is the complimentary buffet breakfast served?",
        options: ["6:00 AM to 9:00 AM", "6:30 AM to 10:00 AM", "7:00 AM to 10:30 AM", "8:00 AM to 11:00 AM"],
        answer: 1,
        explanation: "Sophie thông báo: 'Buffet breakfast is served daily from 6:30 AM to 10:00 AM on the second floor.'"
      },
      {
        id: "c2_4",
        question: "Where can Lucas find the Wi-Fi password?",
        options: ["On the TV screen", "Sent via SMS", "Printed on the keycard envelope", "Written on the desk notepad"],
        answer: 2,
        explanation: "Sophie trả lời: '...the password is printed right on your keycard envelope.'"
      }
    ],
    fill: [
      {
        id: "f2_1",
        sentence: "Lucas Vance has a reservation for [ ______ ] nights.",
        correctWord: "three",
        hint: "Gợi ý: Số 3 (three)",
        explanation: "Lượt thoại 2: '...for three nights.'"
      },
      {
        id: "f2_2",
        sentence: "Buffet breakfast is served daily on the [ ______ ] floor.",
        correctWord: "second",
        hint: "Gợi ý: Tầng hai (second)",
        explanation: "Sophie: '...on the second floor.'"
      },
      {
        id: "f2_3",
        sentence: "The Wi-Fi network name is [ ______ ].",
        correctWord: "Horizon_Guest",
        hint: "Gợi ý: Tên mạng Wi-Fi (Horizon_Guest)",
        explanation: "Sophie: 'The network is Horizon_Guest...'"
      },
      {
        id: "f2_4",
        sentence: "Lucas's room number is [ ______ ] on the 7th floor.",
        correctWord: "712",
        hint: "Gợi ý: Số phòng (712)",
        explanation: "Sophie: 'You are on the 7th floor, room 712.'"
      }
    ],
    dictation: [
      {
        id: "d2_1",
        speaker: "Sophie",
        text: "How may I assist you today?",
        vi: "Tôi có thể hỗ trợ gì cho quý khách ạ?",
        hint: "Lời chào hỏi chuẩn mực của lễ tân"
      },
      {
        id: "d2_2",
        speaker: "Lucas",
        text: "Is complimentary breakfast included in my room package?",
        vi: "Bữa sáng miễn phí có bao gồm trong gói phòng của tôi không?",
        hint: "Hỏi về dịch vụ bữa sáng miễn phí"
      },
      {
        id: "d2_3",
        speaker: "Sophie",
        text: "You are on the 7th floor, room 712.",
        vi: "Quý khách ở tầng 7, phòng 712.",
        hint: "Chỉ vị trí tầng và số phòng"
      }
    ],
    arrange: [
      {
        id: "a2_1",
        fullSentence: "I have a reservation under the name Lucas Vance for three nights.",
        scrambledWords: ["name", "for", "Lucas", "reservation", "under", "three", "have", "the", "a", "nights.", "I", "Vance"],
        vi: "Tôi có đặt phòng trước dưới tên Lucas Vance trong 3 đêm."
      },
      {
        id: "a2_2",
        fullSentence: "Could you give me the Wi-Fi credentials for the room?",
        scrambledWords: ["the", "credentials", "Could", "room?", "Wi-Fi", "me", "for", "give", "you"],
        vi: "Cô có thể cho tôi thông tin đăng nhập Wi-Fi trong phòng được không?"
      },
      {
        id: "a2_3",
        fullSentence: "Thank you so much for your warm hospitality!",
        scrambledWords: ["so", "hospitality!", "your", "Thank", "warm", "for", "you", "much"],
        vi: "Cảm ơn cô rất nhiều vì sự đón tiếp chu đáo!"
      }
    ],
    match: [
      {
        id: "m2_1",
        left: "Is breakfast included in my room?",
        right: "Yes, buffet breakfast is served on the 2nd floor."
      },
      {
        id: "m2_2",
        left: "Where can I find the Wi-Fi password?",
        right: "It is printed right on your keycard envelope."
      },
      {
        id: "m2_3",
        left: "Where is the elevator located?",
        right: "Just past the lobby bar to your right."
      },
      {
        id: "m2_4",
        left: "Which room is assigned to Lucas?",
        right: "Room 712 on the 7th floor."
      }
    ],
    identify: [
      {
        id: "i2_1",
        type: "speaker",
        quote: "Is complimentary breakfast included in my room package?",
        speakerA: "Lucas (Khách hàng)",
        speakerB: "Sophie (Lễ tân)",
        answer: "A",
        explanation: "Lucas hỏi về dịch vụ bữa sáng của khách sạn."
      },
      {
        id: "i2_2",
        type: "speaker",
        quote: "The password is printed right on your keycard envelope.",
        speakerA: "Lucas (Khách hàng)",
        speakerB: "Sophie (Lễ tân)",
        answer: "B",
        explanation: "Lễ tân Sophie hướng dẫn vị trí xem mật khẩu Wi-Fi."
      },
      {
        id: "i2_3",
        type: "tf",
        statement: "Lucas reserved a room with an ocean view.",
        answer: true,
        explanation: "Đúng. Phòng của Lucas là Deluxe King Room with an ocean view."
      },
      {
        id: "i2_4",
        type: "tf",
        statement: "Buffet breakfast ends at 11:30 AM every morning.",
        answer: false,
        explanation: "Sai. Bữa sáng phục vụ từ 6:30 đến 10:00 sáng."
      }
    ],
    shadowing: [
      {
        id: "s2_1",
        speaker: "Lucas",
        text: "I have a reservation under the name Lucas Vance for three nights.",
        vi: "Tôi có đặt phòng trước dưới tên Lucas Vance trong 3 đêm.",
        difficulty: "Trung bình"
      },
      {
        id: "s2_2",
        speaker: "Sophie",
        text: "Buffet breakfast is served daily from 6:30 AM to 10:00 AM on the second floor.",
        vi: "Tiệc buffet sáng được phục vụ hàng ngày từ 6:30 đến 10:00 sáng tại tầng hai.",
        difficulty: "Nâng cao"
      },
      {
        id: "s2_3",
        speaker: "Lucas",
        text: "Thank you so much for your warm hospitality!",
        vi: "Cảm ơn cô rất nhiều vì sự đón tiếp chu đáo!",
        difficulty: "Dễ"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép thông tin Nhận phòng khách sạn",
      missionPrompt: "Nghe đoạn hội thoại và ghi chú: Tên khách, Loại phòng, Thời gian lưu trú, Giờ phục vụ bữa sáng, Mạng Wi-Fi và Số phòng.",
      keyFacts: [
        { key: "Lucas Vance", label: "Tên khách: Lucas Vance", synonyms: ["lucas", "vance", "lucas vance"] },
        { key: "Deluxe King Room", label: "Loại phòng: Deluxe King hướng biển", synonyms: ["deluxe", "king", "ocean view"] },
        { key: "3 nights", label: "Thời gian: 3 đêm", synonyms: ["3 nights", "three nights", "3 dem"] },
        { key: "6:30 - 10:00", label: "Buffet sáng: 6:30 - 10:00 (Tầng 2)", synonyms: ["6:30", "10:00", "second floor", "tầng 2"] },
        { key: "Horizon_Guest", label: "Mạng Wi-Fi: Horizon_Guest", synonyms: ["horizon_guest", "horizon"] },
        { key: "Room 712", label: "Số phòng: Phòng 712 (Tầng 7)", synonyms: ["712", "room 712", "floor 7", "tầng 7"] }
      ],
      sampleNotes: "Khách hàng Lucas Vance đặt phòng 3 đêm. Phòng Deluxe King hướng biển, số 712 ở tầng 7 (thang máy rẽ phải qua sảnh bar). Bữa sáng buffet miễn phí tại tầng 2 từ 6:30 đến 10:00. Wi-Fi: Horizon_Guest, mật khẩu in trên bìa đựng thẻ."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 3: Job Interview for Software Engineer (Phỏng Vấn Xin Việc)
  // -------------------------------------------------------------
  3: {
    choose: [
      {
        id: "c3_1",
        question: "How many years of professional experience does Sarah have?",
        options: ["3 years", "4 years", "5 years", "8 years"],
        answer: 2,
        explanation: "Sarah giới thiệu: 'I have five years of experience as a full-stack developer.'"
      },
      {
        id: "c3_2",
        question: "What major architecture migration did Sarah lead at her previous company?",
        options: ["From microservices to monolithic", "From legacy monolithic to microservices", "From local servers to Windows Azure only", "From SQL to pure spreadsheet"],
        answer: 1,
        explanation: "Sarah chia sẻ: 'I spearheaded the migration of a legacy monolithic system to microservices...'"
      },
      {
        id: "c3_3",
        question: "By what percentage did Sarah's project reduce server response times?",
        options: ["20 percent", "35 percent", "45 percent", "60 percent"],
        answer: 2,
        explanation: "Sarah nêu rõ: '...reducing server response times by 45 percent.'"
      },
      {
        id: "c3_4",
        question: "How does Sarah handle architectural disagreements with team members?",
        options: ["She always asks the CEO to make the final choice", "She builds small prototypes and relies on objective benchmarks", "She accepts majority vote without testing", "She lets the senior developer decide alone"],
        answer: 1,
        explanation: "Sarah nói: 'I always prioritize objective benchmarks and open dialogue. We build small prototypes to test performance...'"
      }
    ],
    fill: [
      {
        id: "f3_1",
        sentence: "Sarah specializes in JavaScript, React, and scalable [ ______ ] architectures.",
        correctWord: "cloud",
        hint: "Gợi ý: Đám mây (cloud)",
        explanation: "Lượt thoại 2: '...scalable cloud architectures.'"
      },
      {
        id: "f3_2",
        sentence: "The migration reduced server response times by [ ______ ] percent.",
        correctWord: "45",
        hint: "Gợi ý: Con số phần trăm (45)",
        explanation: "Sarah: '...by 45 percent.'"
      },
      {
        id: "f3_3",
        sentence: "Sarah tests performance by building small [ ______ ] first.",
        correctWord: "prototypes",
        hint: "Gợi ý: Bản mẫu thử nghiệm (prototypes)",
        explanation: "Sarah: 'We build small prototypes to test performance...'"
      },
      {
        id: "f3_4",
        sentence: "Mr. Harrison will notify Sarah about the next round within this [ ______ ].",
        correctWord: "week",
        hint: "Gợi ý: Tuần (week)",
        explanation: "Harrison: '...within this week.'"
      }
    ],
    dictation: [
      {
        id: "d3_1",
        speaker: "Sarah",
        text: "I have five years of experience as a full-stack developer.",
        vi: "Tôi có 5 năm kinh nghiệm làm lập trình viên full-stack.",
        hint: "Giới thiệu năm kinh nghiệm và vị trí"
      },
      {
        id: "d3_2",
        speaker: "Mr. Harrison",
        text: "What was the most technically challenging project you led recently?",
        vi: "Dự án có thách thức kỹ thuật lớn nhất mà bạn từng dẫn dắt gần đây là gì?",
        hint: "Câu hỏi phỏng vấn về dự án thử thách nhất"
      },
      {
        id: "d3_3",
        speaker: "Sarah",
        text: "I always prioritize objective benchmarks and open dialogue.",
        vi: "Tôi luôn ưu tiên các số liệu đo lường khách quan và đối thoại cởi mở.",
        hint: "Phương pháp giải quyết bất đồng quan điểm"
      }
    ],
    arrange: [
      {
        id: "a3_1",
        fullSentence: "Could you briefly introduce yourself to start off?",
        scrambledWords: ["briefly", "yourself", "off?", "start", "introduce", "you", "to", "Could"],
        vi: "Bạn có thể giới thiệu sơ lược về bản thân để bắt đầu không?"
      },
      {
        id: "a3_2",
        fullSentence: "We build small prototypes to test performance before making commitments.",
        scrambledWords: ["prototypes", "making", "performance", "build", "before", "We", "to", "small", "test", "commitments."],
        vi: "Chúng tôi xây dựng các bản mẫu nhỏ để kiểm tra hiệu năng trước khi đưa ra quyết định."
      },
      {
        id: "a3_3",
        fullSentence: "We will notify you about the next interview round within this week.",
        scrambledWords: ["interview", "this", "round", "We", "notify", "next", "within", "the", "will", "you", "about", "week."],
        vi: "Chúng tôi sẽ thông báo cho bạn về vòng phỏng vấn tiếp theo trong tuần này."
      }
    ],
    match: [
      {
        id: "m3_1",
        left: "What is Sarah's core specialty?",
        right: "Full-stack developer in JavaScript, React, and cloud architectures."
      },
      {
        id: "m3_2",
        left: "What was the outcome of her migration project?",
        right: "Reduced server response times by 45 percent."
      },
      {
        id: "m3_3",
        left: "How does she resolve team disagreements?",
        right: "Builds small prototypes and relies on objective benchmarks."
      },
      {
        id: "m3_4",
        left: "Why does she want to join this company?",
        right: "Dedication to open-source contributions and cutting-edge AI tools."
      }
    ],
    identify: [
      {
        id: "i3_1",
        type: "speaker",
        quote: "At my previous company, I spearheaded the migration of a legacy monolithic system to microservices.",
        speakerA: "Sarah (Ứng viên)",
        speakerB: "Mr. Harrison (Nhà tuyển dụng)",
        answer: "A",
        explanation: "Sarah giải thích về thành tích dự án của mình."
      },
      {
        id: "i3_2",
        type: "speaker",
        quote: "We will notify you about the next interview round within this week.",
        speakerA: "Sarah (Ứng viên)",
        speakerB: "Mr. Harrison (Nhà tuyển dụng)",
        answer: "B",
        explanation: "Nhà tuyển dụng Harrison thông báo về các bước tiếp theo."
      },
      {
        id: "i3_3",
        type: "tf",
        statement: "Sarah has only two years of software development experience.",
        answer: false,
        explanation: "Sai. Sarah có 5 năm kinh nghiệm làm full-stack developer."
      },
      {
        id: "i3_4",
        type: "tf",
        statement: "Sarah is passionate about open-source projects and AI tools.",
        answer: true,
        explanation: "Đúng. Sarah khẳng định sự cống hiến của công ty cho open-source và AI tools hoàn toàn phù hợp với cô."
      }
    ],
    shadowing: [
      {
        id: "s3_1",
        speaker: "Sarah",
        text: "I have five years of experience as a full-stack developer.",
        vi: "Tôi có 5 năm kinh nghiệm làm lập trình viên full-stack.",
        difficulty: "Dễ"
      },
      {
        id: "s3_2",
        speaker: "Sarah",
        text: "I spearheaded the migration of a legacy monolithic system to microservices.",
        vi: "Tôi đã đi đầu trong việc di chuyển hệ thống monolithic cũ sang kiến trúc microservices.",
        difficulty: "Nâng cao"
      },
      {
        id: "s3_3",
        speaker: "Sarah",
        text: "I always prioritize objective benchmarks and open dialogue.",
        vi: "Tôi luôn ưu tiên các số liệu đo lường khách quan và đối thoại cởi mở.",
        difficulty: "Trung bình"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép hồ sơ phỏng vấn ứng viên Kỹ sư phần mềm",
      missionPrompt: "Hãy nghe và ghi chú: Tên ứng viên, Số năm kinh nghiệm, Kỹ năng công nghệ, Thành tựu dự án nổi bật, Kỹ năng giải quyết xung đột và Kế hoạch phản hồi.",
      keyFacts: [
        { key: "Sarah", label: "Tên ứng viên: Sarah", synonyms: ["sarah"] },
        { key: "5 years", label: "Kinh nghiệm: 5 năm Full-stack", synonyms: ["5 years", "five years", "5 nam"] },
        { key: "React / Cloud", label: "Công nghệ: JS, React, Cloud", synonyms: ["react", "javascript", "cloud"] },
        { key: "45%", label: "Thành tích: Giảm thời gian phản hồi 45%", synonyms: ["45%", "45 percent", "microservices"] },
        { key: "Prototypes", label: "Giải quyết bất đồng: Đo benchmark & xây prototype", synonyms: ["benchmark", "prototype", "prototypes"] },
        { key: "Within this week", label: "Phản hồi: Trong tuần này", synonyms: ["this week", "week", "trong tuan nay"] }
      ],
      sampleNotes: "Ứng viên Sarah có 5 năm kinh nghiệm full-stack (JS, React, Cloud). Thành tựu: chuyển đổi monolithic sang microservices giúp giảm thời gian phản hồi 45%. Phong cách làm việc: ưu tiên số liệu khách quan, dựng prototype thử nghiệm. Kết quả phỏng vấn sẽ có trong tuần này."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 4: Ordering at a Fine Restaurant (Gọi Món & Thanh Toán Nhà Hàng)
  // -------------------------------------------------------------
  4: {
    choose: [
      {
        id: "c4_1",
        question: "What is the chef's special dish tonight?",
        options: ["Pan-seared Salmon with lemon sauce", "Grilled Ribeye steak with truffle mashed potatoes", "Roasted Duck breast with orange glaze", "Lobster Pasta in garlic butter"],
        answer: 1,
        explanation: "Claire giới thiệu: 'Tonight's special is grilled Ribeye steak served with truffle mashed potatoes and roasted asparagus.'"
      },
      {
        id: "c4_2",
        question: "How does David want his steak cooked?",
        options: ["Rare", "Medium-rare", "Medium-well", "Well-done"],
        answer: 1,
        explanation: "David yêu cầu: 'Medium-rare, please.'"
      },
      {
        id: "c4_3",
        question: "Why does David decline the mushroom soup appetizer?",
        options: ["He hates mushrooms", "He is lactose intolerant and it contains heavy cream", "It is too spicy", "It is overpriced"],
        answer: 1,
        explanation: "David nói: 'I'm lactose intolerant' và phục vụ Claire xác nhận súp có kem béo (heavy cream)."
      },
      {
        id: "c4_4",
        question: "What alternative appetizer does Claire recommend instead?",
        options: ["Crispy French fries", "Fresh garden salad with balsamic vinaigrette", "Garlic bread with cheddar cheese", "Tomato bisque"],
        answer: 1,
        explanation: "Claire gợi ý: '...I recommend our fresh garden salad with balsamic vinaigrette instead.'"
      }
    ],
    fill: [
      {
        id: "f4_1",
        sentence: "Tonight's chef special is grilled [ ______ ] steak.",
        correctWord: "Ribeye",
        hint: "Gợi ý: Thăn lưng bò (Ribeye)",
        explanation: "Claire: 'Tonight's special is grilled Ribeye steak...'"
      },
      {
        id: "f4_2",
        sentence: "David requests his steak cooked [ ______ ].",
        correctWord: "medium-rare",
        hint: "Gợi ý: Tái vừa (medium-rare)",
        explanation: "David: 'Medium-rare, please.'"
      },
      {
        id: "f4_3",
        sentence: "David cannot eat dairy because he is lactose [ ______ ].",
        correctWord: "intolerant",
        hint: "Gợi ý: Không dung nạp đường sữa (intolerant)",
        explanation: "David: 'I'm lactose intolerant.'"
      },
      {
        id: "f4_4",
        sentence: "David orders a glass of [ ______ ] wine to accompany his meal.",
        correctWord: "red",
        hint: "Gợi ý: Rượu vang đỏ (red)",
        explanation: "David: 'And could you bring me a glass of red wine?'"
      }
    ],
    dictation: [
      {
        id: "d4_1",
        speaker: "Claire",
        text: "How would you like your steak cooked: rare, medium-rare, or well-done?",
        vi: "Quý khách muốn bít tết được làm chín ở mức nào ạ: tái, tái vừa hay chín kỹ?",
        hint: "Hỏi mức độ chín của thịt bít tết"
      },
      {
        id: "d4_2",
        speaker: "David",
        text: "Medium-rare, please. Also, does the mushroom soup contain any dairy products?",
        vi: "Cho tôi mức tái vừa. Ngoài ra, món súp nấm có chứa sản phẩm từ sữa không?",
        hint: "Chọn độ chín và hỏi dị ứng thành phần món ăn"
      },
      {
        id: "d4_3",
        speaker: "Claire",
        text: "Your order will be served shortly!",
        vi: "Món ăn của quý khách sẽ được phục vụ ngay sau đây!",
        hint: "Lời kết thông báo món sắp ra"
      }
    ],
    arrange: [
      {
        id: "a4_1",
        fullSentence: "Are you ready to order, or would you like a few more minutes?",
        scrambledWords: ["to", "few", "like", "order,", "or", "a", "ready", "you", "minutes?", "more", "would", "Are"],
        vi: "Quý khách đã sẵn sàng gọi món chưa, hay muốn xem thêm ít phút nữa ạ?"
      },
      {
        id: "a4_2",
        fullSentence: "I recommend our fresh garden salad with balsamic vinaigrette instead.",
        scrambledWords: ["garden", "vinaigrette", "recommend", "I", "balsamic", "salad", "fresh", "instead.", "our", "with"],
        vi: "Tôi gợi ý quý khách dùng món salad vườn rau tươi sốt giấm balsamic thay thế ạ."
      },
      {
        id: "a4_3",
        fullSentence: "Could you bring me a glass of red wine?",
        scrambledWords: ["glass", "wine?", "you", "a", "bring", "me", "red", "of", "Could"],
        vi: "Cô mang cho tôi một ly rượu vang đỏ nhé?"
      }
    ],
    match: [
      {
        id: "m4_1",
        left: "What is tonight's chef special?",
        right: "Grilled Ribeye steak with truffle mashed potatoes."
      },
      {
        id: "m4_2",
        left: "How does David want the steak cooked?",
        right: "Medium-rare."
      },
      {
        id: "m4_3",
        left: "Why avoid the mushroom soup?",
        right: "Contains heavy cream, and David is lactose intolerant."
      },
      {
        id: "m4_4",
        left: "What beverage did David order?",
        right: "A glass of red wine."
      }
    ],
    identify: [
      {
        id: "i4_1",
        type: "speaker",
        quote: "Does the mushroom soup appetizer contain any dairy products? I'm lactose intolerant.",
        speakerA: "David (Thực khách)",
        speakerB: "Claire (Phục vụ bàn)",
        answer: "A",
        explanation: "David thông báo tình trạng dị ứng của mình."
      },
      {
        id: "i4_2",
        type: "speaker",
        quote: "The mushroom soup has heavy cream, so I recommend our fresh garden salad instead.",
        speakerA: "David (Thực khách)",
        speakerB: "Claire (Phục vụ bàn)",
        answer: "B",
        explanation: "Phục vụ Claire giải thích thành phần và tư vấn đổi món."
      },
      {
        id: "i4_3",
        type: "tf",
        statement: "David ordered his steak well-done.",
        answer: false,
        explanation: "Sai. David gọi thịt chín mức tái vừa (medium-rare)."
      },
      {
        id: "i4_4",
        type: "tf",
        statement: "The chef's special steak comes with truffle mashed potatoes and roasted asparagus.",
        answer: true,
        explanation: "Đúng. Bít tết Ribeye đi kèm khoai tây nghiền nấm truffle và măng tây nướng."
      }
    ],
    shadowing: [
      {
        id: "s4_1",
        speaker: "David",
        text: "What is the chef's special tonight?",
        vi: "Tối nay món đặc biệt của bếp trưởng là món gì vậy?",
        difficulty: "Dễ"
      },
      {
        id: "s4_2",
        speaker: "David",
        text: "Medium-rare, please. I'm lactose intolerant.",
        vi: "Cho tôi mức tái vừa. Tôi bị dị ứng đường lactose.",
        difficulty: "Trung bình"
      },
      {
        id: "s4_3",
        speaker: "Claire",
        text: "I recommend our fresh garden salad with balsamic vinaigrette instead.",
        vi: "Tôi gợi ý quý khách dùng món salad vườn rau tươi sốt giấm balsamic thay thế ạ.",
        difficulty: "Nâng cao"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép gọi món ăn tại Nhà hàng",
      missionPrompt: "Ghi lại: Món chính khách chọn, Độ chín thịt, Món khai vị thay thế, Lý do dị ứng và Đồ uống đi kèm.",
      keyFacts: [
        { key: "Ribeye Steak", label: "Món chính: Bít tết Ribeye", synonyms: ["ribeye", "steak", "bit tet"] },
        { key: "Medium-rare", label: "Độ chín: Tái vừa (Medium-rare)", synonyms: ["medium-rare", "medium rare", "tai vua"] },
        { key: "Lactose intolerant", label: "Dị ứng: Không dung nạp đường lactose", synonyms: ["lactose", "intolerant", "dairy"] },
        { key: "Garden Salad", label: "Khai vị: Salad rau tươi sốt balsamic", synonyms: ["salad", "garden salad", "balsamic"] },
        { key: "Red wine", label: "Đồ uống: 1 ly rượu vang đỏ", synonyms: ["red wine", "wine", "vang do"] }
      ],
      sampleNotes: "Thực khách David gọi món đặc biệt của bếp trưởng: bít tết Ribeye nướng ăn kèm khoai tây nghiền truffle. Độ chín yêu cầu: Medium-rare. Do dị ứng lactose (không ăn kem béo), khách đổi món súp nấm sang salad rau tươi sốt balsamic. Đồ uống: 1 ly vang đỏ."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 5: Shopping & Requesting a Refund (Mua Sắm Quần Áo & Đổi Trả)
  // -------------------------------------------------------------
  5: {
    choose: [
      {
        id: "c5_1",
        question: "Why did Jessica return to the store?",
        options: ["The zipper was broken", "The size medium was too tight around the shoulders", "She changed her mind about the style", "The jacket was stained"],
        answer: 1,
        explanation: "Jessica giải thích: '...the size medium is a bit too tight around the shoulders.'"
      },
      {
        id: "c5_2",
        question: "What color jacket did Jessica purchase?",
        options: ["Navy blue", "Classic black", "Olive green", "Burgundy red"],
        answer: 2,
        explanation: "Jessica khẳng định: 'I really love the olive green color.'"
      },
      {
        id: "c5_3",
        question: "Does Jessica still have the tags and receipt?",
        options: ["No, she lost them both", "She only has the paper tag", "Yes, tags are attached and she has a digital receipt on her phone", "Only credit card statement"],
        answer: 2,
        explanation: "Jessica nói: 'Yes, the tags are intact, and here is the digital receipt on my phone.'"
      },
      {
        id: "c5_4",
        question: "Did the store have a size large available for exchange?",
        options: ["No, completely sold out", "Yes, one last large jacket was found in the back room", "Only in black color", "Available in another branch"],
        answer: 1,
        explanation: "Kevin thông báo: 'We have one last large jacket in the back room.'"
      }
    ],
    fill: [
      {
        id: "f5_1",
        sentence: "Jessica purchased the winter jacket [ ______ ] days ago.",
        correctWord: "two",
        hint: "Gợi ý: Số 2 (two)",
        explanation: "Jessica: 'I purchased this winter jacket two days ago...'"
      },
      {
        id: "f5_2",
        sentence: "The size medium was too tight around the [ ______ ].",
        correctWord: "shoulders",
        hint: "Gợi ý: Phần vai (shoulders)",
        explanation: "Jessica: '...tight around the shoulders.'"
      },
      {
        id: "f5_3",
        sentence: "Jessica preferred an exchange for size [ ______ ].",
        correctWord: "large",
        hint: "Gợi ý: Cỡ L (large)",
        explanation: "Jessica: 'If you have size large in stock, I'd love an exchange.'"
      },
      {
        id: "f5_4",
        sentence: "Kevin found the jacket in the [ ______ ] room.",
        correctWord: "back",
        hint: "Gợi ý: Phòng kho phía sau (back room)",
        explanation: "Kevin: 'We have one last large jacket in the back room.'"
      }
    ],
    dictation: [
      {
        id: "d5_1",
        speaker: "Jessica",
        text: "The size medium is a bit too tight around the shoulders.",
        vi: "Cỡ M hơi bị chật ở phần vai.",
        hint: "Mô tả lý do đổi áo chật vai"
      },
      {
        id: "d5_2",
        speaker: "Kevin",
        text: "Do you still have the purchase receipt and original tags attached?",
        vi: "Quý khách còn giữ hóa đơn mua hàng và tem mác gốc đính kèm không ạ?",
        hint: "Hỏi hóa đơn và tem mác"
      },
      {
        id: "d5_3",
        speaker: "Kevin",
        text: "We have one last large jacket in the back room.",
        vi: "Chúng tôi còn đúng một chiếc cỡ L ở phòng kho.",
        hint: "Báo còn chiếc cuối cùng trong kho"
      }
    ],
    arrange: [
      {
        id: "a5_1",
        fullSentence: "Would you prefer to exchange it for a size large, or would you like a refund?",
        scrambledWords: ["exchange", "a", "you", "prefer", "refund?", "Would", "like", "size", "large,", "or", "for", "it", "to"],
        vi: "Quý khách muốn đổi sang cỡ L hay muốn được hoàn tiền ạ?"
      },
      {
        id: "a5_2",
        fullSentence: "The tags are intact and here is the digital receipt on my phone.",
        scrambledWords: ["intact", "digital", "on", "receipt", "here", "are", "The", "and", "phone.", "the", "tags", "my", "is"],
        vi: "Tem mác vẫn còn nguyên vẹn, và đây là hóa đơn điện tử trên điện thoại của tôi."
      },
      {
        id: "a5_3",
        fullSentence: "Here is your new jacket and the updated receipt.",
        scrambledWords: ["and", "jacket", "receipt.", "new", "the", "your", "is", "updated", "Here"],
        vi: "Đây là chiếc áo khoác mới và biên lai đã cập nhật của quý khách."
      }
    ],
    match: [
      {
        id: "m5_1",
        left: "Why exchange the jacket?",
        right: "Size M was too tight around the shoulders."
      },
      {
        id: "m5_2",
        left: "What color does Jessica love?",
        right: "Olive green."
      },
      {
        id: "m5_3",
        left: "What proof did Jessica bring?",
        right: "Intact original tags and digital receipt on phone."
      },
      {
        id: "m5_4",
        left: "What was the final outcome?",
        right: "Exchanged for the last size large jacket from the back room."
      }
    ],
    identify: [
      {
        id: "i5_1",
        type: "speaker",
        quote: "If you have size large in stock, I'd love an exchange.",
        speakerA: "Jessica (Khách hàng)",
        speakerB: "Kevin (Nhân viên)",
        answer: "A",
        explanation: "Jessica bày tỏ mong muốn đổi sang cỡ lớn hơn."
      },
      {
        id: "i5_2",
        type: "speaker",
        quote: "Let me check our inventory... Lucky you!",
        speakerA: "Jessica (Khách hàng)",
        speakerB: "Kevin (Nhân viên)",
        answer: "B",
        explanation: "Nhân viên Kevin kiểm tra kho và reo mừng thông báo."
      },
      {
        id: "i5_3",
        type: "tf",
        statement: "Jessica requested a cash refund instead of an exchange.",
        answer: false,
        explanation: "Sai. Jessica ưu tiên đổi lấy cỡ L vì rất thích màu áo ('I'd love an exchange')."
      },
      {
        id: "i5_4",
        type: "tf",
        statement: "Jessica kept the original tags intact on the jacket.",
        answer: true,
        explanation: "Đúng. Tem mác vẫn còn nguyên đính trên áo."
      }
    ],
    shadowing: [
      {
        id: "s5_1",
        speaker: "Jessica",
        text: "The size medium is a bit too tight around the shoulders.",
        vi: "Cỡ M hơi bị chật ở phần vai.",
        difficulty: "Trung bình"
      },
      {
        id: "s5_2",
        speaker: "Jessica",
        text: "If you have size large in stock, I'd love an exchange.",
        vi: "Nếu cửa hàng còn cỡ L trong kho thì tôi muốn đổi lấy cỡ đó.",
        difficulty: "Dễ"
      },
      {
        id: "s5_3",
        speaker: "Kevin",
        text: "Here is your new jacket and the updated receipt.",
        vi: "Đây là chiếc áo khoác mới và biên lai đã cập nhật của quý khách.",
        difficulty: "Dễ"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép thông tin Đổi trả hàng may mặc",
      missionPrompt: "Ghi lại: Tên sản phẩm, Lý do đổi trả, Màu sắc, Kích cỡ cũ/mới, Tình trạng tem mác và Kết quả đổi.",
      keyFacts: [
        { key: "Winter jacket", label: "Sản phẩm: Áo khoác mùa đông (Winter jacket)", synonyms: ["jacket", "winter jacket", "ao khoac"] },
        { key: "Tight shoulders", label: "Lý do: Chật phần vai", synonyms: ["tight", "shoulders", "chat vai"] },
        { key: "Olive green", label: "Màu sắc: Xanh ô liu (Olive green)", synonyms: ["olive green", "green", "xanh"] },
        { key: "Medium to Large", label: "Cỡ: Đổi từ M sang L", synonyms: ["medium", "large", "co l", "size l"] },
        { key: "Tags intact", label: "Tình trạng: Mác nguyên vẹn, hóa đơn điện tử", synonyms: ["tags", "digital receipt", "hoa don"] },
        { key: "Exchanged", label: "Kết quả: Đổi thành công chiếc cỡ L cuối cùng", synonyms: ["exchanged", "doi thanh cong", "back room"] }
      ],
      sampleNotes: "Khách hàng Jessica đem đổi chiếc áo khoác mùa đông màu xanh ô liu mua 2 ngày trước vì cỡ M bị chật vai. Tem mác còn nguyên vẹn, có hóa đơn điện tử trên điện thoại. Nhân viên Kevin đã kiểm tra kho và đổi cho cô chiếc cỡ L cuối cùng còn lại."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 6: Doctor Consultation & Symptoms (Khám Bệnh & Tư Vấn Bác Sĩ)
  // -------------------------------------------------------------
  6: {
    choose: [
      {
        id: "c6_1",
        question: "What main symptoms has Thomas been suffering from since Tuesday?",
        options: ["Stomach cramps and nausea", "Severe headache, high fever, and dry cough", "Sprained ankle and back pain", "Sore throat and ear infection"],
        answer: 1,
        explanation: "Thomas nói: 'I've had a severe headache and a high fever since Tuesday, along with a persistent dry cough.'"
      },
      {
        id: "c6_2",
        question: "What was Thomas's measured body temperature?",
        options: ["37.2 °C", "38.0 °C", "38.8 °C", "39.8 °C"],
        answer: 2,
        explanation: "Bác sĩ Bennett đọc kết quả: '...your temperature is 38.8 degrees Celsius...'"
      },
      {
        id: "c6_3",
        question: "Why does Dr. Bennett decline to prescribe antibiotics?",
        options: ["Thomas is allergic to penicillin", "Antibiotics do not kill viruses", "The pharmacy is closed", "Antibiotics are too expensive"],
        answer: 1,
        explanation: "Bác sĩ giải thích: 'No, antibiotics do not kill viruses.'"
      },
      {
        id: "c6_4",
        question: "How many days off work does the doctor recommend?",
        options: ["One day", "At least three full days", "One full week", "Ten days"],
        answer: 1,
        explanation: "Bác sĩ khuyên: 'Take at least three full days off work, drink plenty of warm fluids...'"
      }
    ],
    fill: [
      {
        id: "f6_1",
        sentence: "Thomas's body temperature is [ ______ ] degrees Celsius.",
        correctWord: "38.8",
        hint: "Gợi ý: Nhiệt độ sốt (38.8)",
        explanation: "Bác sĩ: '...your temperature is 38.8 degrees Celsius.'"
      },
      {
        id: "f6_2",
        sentence: "Dr. Bennett indicates that Thomas has a [ ______ ] infection.",
        correctWord: "viral",
        hint: "Gợi ý: Do virus (viral)",
        explanation: "Bác sĩ: '...which indicates a viral infection.'"
      },
      {
        id: "f6_3",
        sentence: "The doctor prescribes paracetamol and cough [ ______ ].",
        correctWord: "syrup",
        hint: "Gợi ý: Siro ho (syrup)",
        explanation: "Bác sĩ: '...paracetamol to reduce fever, and cough syrup.'"
      },
      {
        id: "f6_4",
        sentence: "Thomas is advised to drink plenty of warm [ ______ ].",
        correctWord: "fluids",
        hint: "Gợi ý: Nước/chất lỏng ấm (fluids)",
        explanation: "Bác sĩ: '...drink plenty of warm fluids...'"
      }
    ],
    dictation: [
      {
        id: "d6_1",
        speaker: "Dr. Bennett",
        text: "What seems to be the trouble today?",
        vi: "Hôm nay bạn thấy trong người khó chịu thế nào?",
        hint: "Câu hỏi thăm khám kinh điển của bác sĩ"
      },
      {
        id: "d6_2",
        speaker: "Dr. Bennett",
        text: "No, antibiotics do not kill viruses.",
        vi: "Không, kháng sinh không tiêu diệt được virus.",
        hint: "Giải thích y khoa về kháng sinh"
      },
      {
        id: "d6_3",
        speaker: "Dr. Bennett",
        text: "Take at least three full days off work, and get ample rest.",
        vi: "Nghỉ làm ít nhất 3 ngày trọn vẹn và ngủ đủ giấc.",
        hint: "Lời dặn dò nghỉ ngơi hồi phục"
      }
    ],
    arrange: [
      {
        id: "a6_1",
        fullSentence: "I have had a severe headache and high fever since Tuesday.",
        scrambledWords: ["Tuesday.", "fever", "and", "headache", "have", "severe", "a", "since", "high", "had", "I"],
        vi: "Tôi bị đau đầu dữ dội và sốt cao từ hôm thứ Ba."
      },
      {
        id: "a6_2",
        fullSentence: "Your lungs sound clear but your temperature is high.",
        scrambledWords: ["temperature", "is", "clear", "sound", "Your", "high.", "your", "lungs", "but"],
        vi: "Phổi của bạn nghe trong nhưng nhiệt độ cơ thể bạn khá cao."
      },
      {
        id: "a6_3",
        fullSentence: "If symptoms worsen please return to the clinic immediately.",
        scrambledWords: ["immediately.", "symptoms", "to", "worsen", "the", "return", "clinic", "please", "If"],
        vi: "Nếu triệu chứng trở nặng hãy quay lại phòng khám ngay nhé."
      }
    ],
    match: [
      {
        id: "m6_1",
        left: "What are Thomas's main symptoms?",
        right: "Severe headache, 38.8°C fever, and dry cough."
      },
      {
        id: "m6_2",
        left: "What is the diagnosis?",
        right: "Viral infection (lungs are clear)."
      },
      {
        id: "m6_3",
        left: "What medication was prescribed?",
        right: "Paracetamol and cough syrup (no antibiotics)."
      },
      {
        id: "m6_4",
        left: "What recovery instructions were given?",
        right: "Take 3 days off work, drink warm fluids, and rest."
      }
    ],
    identify: [
      {
        id: "i6_1",
        type: "speaker",
        quote: "Breathe in deeply, please... and exhale.",
        speakerA: "Thomas (Bệnh nhân)",
        speakerB: "Dr. Bennett (Bác sĩ)",
        answer: "B",
        explanation: "Bác sĩ Bennett dùng ống nghe kiểm tra phổi."
      },
      {
        id: "i6_2",
        type: "speaker",
        quote: "Do I need to take antibiotics for this?",
        speakerA: "Thomas (Bệnh nhân)",
        speakerB: "Dr. Bennett (Bác sĩ)",
        answer: "A",
        explanation: "Bệnh nhân Thomas thắc mắc về việc dùng thuốc kháng sinh."
      },
      {
        id: "i6_3",
        type: "tf",
        statement: "Thomas's lungs were congested and making wheezing sounds.",
        answer: false,
        explanation: "Sai. Bác sĩ xác nhận: 'Your lungs sound clear' (phổi nghe trong)."
      },
      {
        id: "i6_4",
        type: "tf",
        statement: "Antibiotics are ineffective against viral infections.",
        answer: true,
        explanation: "Đúng. Kháng sinh chỉ diệt được vi khuẩn, không diệt được virus."
      }
    ],
    shadowing: [
      {
        id: "s6_1",
        speaker: "Thomas",
        text: "I've had a severe headache and a high fever since Tuesday.",
        vi: "Tôi bị đau đầu dữ dội và sốt cao từ hôm thứ Ba.",
        difficulty: "Trung bình"
      },
      {
        id: "s6_2",
        speaker: "Dr. Bennett",
        text: "No, antibiotics do not kill viruses.",
        vi: "Không, kháng sinh không tiêu diệt được virus.",
        difficulty: "Dễ"
      },
      {
        id: "s6_3",
        speaker: "Dr. Bennett",
        text: "Take at least three full days off work, drink plenty of warm fluids, and get ample rest.",
        vi: "Nghỉ làm ít nhất 3 ngày trọn vẹn, uống nhiều nước ấm và ngủ đủ giấc.",
        difficulty: "Nâng cao"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép bệnh án & Đơn thuốc khám bệnh",
      missionPrompt: "Ghi lại: Triệu chứng của bệnh nhân, Thân nhiệt, Chẩn đoán của bác sĩ, Loại thuốc được kê và Lời khuyên nghỉ ngơi.",
      keyFacts: [
        { key: "Headache, fever, cough", label: "Triệu chứng: Đau đầu, sốt cao, ho khan", synonyms: ["headache", "fever", "cough", "dau dau", "sot"] },
        { key: "38.8 °C", label: "Thân nhiệt: 38.8 độ C", synonyms: ["38.8", "38.8 c", "38.8 degrees"] },
        { key: "Viral infection", label: "Chẩn đoán: Nhiễm virus (Phổi trong)", synonyms: ["viral", "virus", "infection"] },
        { key: "Paracetamol & syrup", label: "Thuốc: Paracetamol & siro ho", synonyms: ["paracetamol", "syrup", "cough syrup"] },
        { key: "No antibiotics", label: "Kháng sinh: Không dùng (do virus)", synonyms: ["no antibiotics", "antibiotics"] },
        { key: "3 days off", label: "Nghỉ ngơi: Ít nhất 3 ngày, uống nước ấm", synonyms: ["3 days", "three days", "warm fluids", "rest"] }
      ],
      sampleNotes: "Bệnh nhân Thomas bị sốt 38.8°C, đau đầu dữ dội và ho khan từ thứ Ba. Bác sĩ Bennett chẩn đoán nhiễm virus (phổi trong), không cần kháng sinh. Kê đơn paracetamol hạ sốt và siro ho. Dặn nghỉ làm ít nhất 3 ngày, uống nhiều nước ấm và nghỉ ngơi tĩnh dưỡng."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 7: Asking for Directions in the City (Hỏi Đường & Phương Tiện)
  // -------------------------------------------------------------
  7: {
    choose: [
      {
        id: "c7_1",
        question: "Where is Rachel trying to go?",
        options: ["Central Subway Station", "City Art Museum", "Grand Shopping Plaza", "International Airport"],
        answer: 0,
        explanation: "Rachel hỏi: 'How do I get to Central Subway Station?'"
      },
      {
        id: "c7_2",
        question: "What landmark indicates where Rachel should turn left?",
        options: ["A red post office", "A big clock tower at the intersection", "A gas station", "A stone church"],
        answer: 1,
        explanation: "Oliver hướng dẫn: 'When you see the big clock tower at the intersection, turn left onto Maple Street.'"
      },
      {
        id: "c7_3",
        question: "What building is directly opposite the subway station entrance?",
        options: ["The City Hall", "A shopping mall", "The public library", "A local bakery"],
        answer: 2,
        explanation: "Oliver nói: '...station entrance will be directly on your right, opposite the public library.'"
      },
      {
        id: "c7_4",
        question: "How long does it take to walk there?",
        options: ["Barely a five-minute walk", "Around twenty minutes", "Over half an hour", "An hour"],
        answer: 0,
        explanation: "Oliver nói: 'It's barely a five-minute walk. Enjoy the scenic stroll!'"
      }
    ],
    fill: [
      {
        id: "f7_1",
        sentence: "Rachel should walk straight ahead along the avenue for [ ______ ] blocks.",
        correctWord: "two",
        hint: "Gợi ý: Số 2 dãy nhà (two)",
        explanation: "Oliver: 'Go straight ahead along this avenue for two blocks.'"
      },
      {
        id: "f7_2",
        sentence: "At the clock tower, Rachel must turn [ ______ ] onto Maple Street.",
        correctWord: "left",
        hint: "Gợi ý: Rẽ trái (left)",
        explanation: "Oliver: '...turn left onto Maple Street.'"
      },
      {
        id: "f7_3",
        sentence: "The station entrance is opposite the public [ ______ ].",
        correctWord: "library",
        hint: "Gợi ý: Thư viện (library)",
        explanation: "Oliver: '...opposite the public library.'"
      },
      {
        id: "f7_4",
        sentence: "The walking distance is only about [ ______ ] minutes.",
        correctWord: "five",
        hint: "Gợi ý: 5 phút (five)",
        explanation: "Oliver: 'It's barely a five-minute walk.'"
      }
    ],
    dictation: [
      {
        id: "d7_1",
        speaker: "Rachel",
        text: "How do I get to Central Subway Station?",
        vi: "Làm thế nào để đến Ga tàu điện ngầm trung tâm ạ?",
        hint: "Hỏi đường đến ga tàu điện"
      },
      {
        id: "d7_2",
        speaker: "Oliver",
        text: "Go straight ahead along this avenue for two blocks.",
        vi: "Hãy đi thẳng dọc theo đại lộ này qua hai dãy nhà nữa.",
        hint: "Chỉ dẫn đi thẳng 2 dãy nhà"
      },
      {
        id: "d7_3",
        speaker: "Oliver",
        text: "Turn left at the clock tower onto Maple Street.",
        vi: "Rẽ trái tại tháp đồng hồ vào đường Maple.",
        hint: "Chỉ dẫn mốc rẽ trái"
      }
    ],
    arrange: [
      {
        id: "a7_1",
        fullSentence: "Go straight ahead along this avenue for two blocks.",
        scrambledWords: ["straight", "for", "two", "blocks.", "ahead", "this", "Go", "avenue", "along"],
        vi: "Hãy đi thẳng dọc theo đại lộ này qua hai dãy nhà nữa."
      },
      {
        id: "a7_2",
        fullSentence: "The station entrance will be directly on your right.",
        scrambledWords: ["entrance", "right.", "on", "The", "be", "your", "station", "directly", "will"],
        vi: "Lối vào nhà ga sẽ nằm ngay bên tay phải của cô."
      },
      {
        id: "a7_3",
        fullSentence: "Is it within walking distance or should I take a taxi?",
        scrambledWords: ["walking", "take", "or", "taxi?", "within", "I", "distance", "a", "Is", "it", "should"],
        vi: "Đoạn đường đó đi bộ được không hay tôi nên bắt taxi ạ?"
      }
    ],
    match: [
      {
        id: "m7_1",
        left: "Where is Rachel going?",
        right: "Central Subway Station."
      },
      {
        id: "m7_2",
        left: "Step 1: Where to walk first?",
        right: "Go straight ahead along this avenue for 2 blocks."
      },
      {
        id: "m7_3",
        left: "Step 2: Where to turn?",
        right: "Turn left at the big clock tower onto Maple Street."
      },
      {
        id: "m7_4",
        left: "Step 3: Where is the entrance?",
        right: "Walk 100 meters, entrance is on the right opposite public library."
      }
    ],
    identify: [
      {
        id: "i7_1",
        type: "speaker",
        quote: "Excuse me, sir! Could you help me? I think I'm lost.",
        speakerA: "Rachel (Khách du lịch)",
        speakerB: "Oliver (Người địa phương)",
        answer: "A",
        explanation: "Rachel mở lời nhờ giúp đỡ khi bị lạc đường."
      },
      {
        id: "i7_2",
        type: "speaker",
        quote: "Don't worry, you are not far at all.",
        speakerA: "Rachel (Khách du lịch)",
        speakerB: "Oliver (Người địa phương)",
        answer: "B",
        explanation: "Người dân Oliver trấn an khách du lịch."
      },
      {
        id: "i7_3",
        type: "tf",
        statement: "The subway station is located on Oak Avenue.",
        answer: false,
        explanation: "Sai. Ga tàu nằm trên đường Maple Street."
      },
      {
        id: "i7_4",
        type: "tf",
        statement: "The station is opposite the public library.",
        answer: true,
        explanation: "Đúng. Ga tàu nằm đối diện thư viện công cộng thành phố."
      }
    ],
    shadowing: [
      {
        id: "s7_1",
        speaker: "Rachel",
        text: "How do I get to Central Subway Station?",
        vi: "Làm thế nào để đến Ga tàu điện ngầm trung tâm ạ?",
        difficulty: "Dễ"
      },
      {
        id: "s7_2",
        speaker: "Oliver",
        text: "When you see the big clock tower at the intersection, turn left onto Maple Street.",
        vi: "Khi cô nhìn thấy tháp đồng hồ lớn ở ngã tư, hãy rẽ trái vào đường Maple.",
        difficulty: "Nâng cao"
      },
      {
        id: "s7_3",
        speaker: "Oliver",
        text: "It's barely a five-minute walk. Enjoy the scenic stroll!",
        vi: "Chỉ mất tầm 5 phút đi bộ thôi. Chúc cô có chuyến dạo bộ ngắm cảnh vui vẻ!",
        difficulty: "Trung bình"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép sơ đồ chỉ đường trong thành phố",
      missionPrompt: "Ghi lại: Điểm đến cần đến, Các bước di chuyển (hướng đi, số dãy nhà, mốc nhận diện, hướng rẽ) và Thời gian đi bộ.",
      keyFacts: [
        { key: "Central Subway Station", label: "Điểm đến: Ga tàu điện Central", synonyms: ["subway", "station", "ga tau"] },
        { key: "Straight 2 blocks", label: "Bước 1: Đi thẳng 2 block nhà", synonyms: ["straight", "2 blocks", "two blocks", "di thang"] },
        { key: "Clock tower", label: "Mốc: Tháp đồng hồ lớn ở ngã tư", synonyms: ["clock", "clock tower", "thap dong ho"] },
        { key: "Turn left Maple St", label: "Bước 2: Rẽ trái vào đường Maple", synonyms: ["turn left", "maple", "maple street", "re trai"] },
        { key: "Opposite library", label: "Vị trí: Bên phải, đối diện thư viện", synonyms: ["library", "opposite", "thu vien"] },
        { key: "5 minutes walk", label: "Thời gian: Đi bộ 5 phút", synonyms: ["5 minutes", "five minutes", "di bo 5 phut"] }
      ],
      sampleNotes: "Chỉ đường đến Ga tàu điện Central Subway Station: Đi thẳng theo đại lộ qua 2 dãy nhà. Đến ngã tư có tháp đồng hồ lớn thì rẽ trái vào đường Maple. Đi tiếp khoảng 100m, cửa ga nằm bên tay phải, đối diện thư viện công cộng. Chỉ mất tầm 5 phút đi bộ, không cần bắt taxi."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 8: Renting an Apartment (Xem & Đàm Phán Thuê Căn Hộ)
  // -------------------------------------------------------------
  8: {
    choose: [
      {
        id: "c8_1",
        question: "How many bedrooms does the apartment have?",
        options: ["Studio", "One bedroom", "Two bedrooms", "Three bedrooms"],
        answer: 2,
        explanation: "Victoria giới thiệu: '...this two-bedroom unit has plenty of natural sunlight.'"
      },
      {
        id: "c8_2",
        question: "How much is the monthly rent?",
        options: ["1100 dollars", "1250 dollars", "1400 dollars", "1600 dollars"],
        answer: 2,
        explanation: "Victoria báo giá: 'The rent is 1400 dollars per month.'"
      },
      {
        id: "c8_3",
        question: "Which utility is NOT included in the rent?",
        options: ["High-speed fiber internet", "Water", "Electricity", "Building maintenance"],
        answer: 2,
        explanation: "Victoria giải thích: 'Water and high-speed fiber internet are included, but electricity is billed separately.'"
      },
      {
        id: "c8_4",
        question: "What is the pet policy in the apartment building?",
        options: ["Strictly no pets allowed", "Cats and small dogs under 10 kg with a $100 fee", "Only birds and fish", "Any dog breed without any fee"],
        answer: 1,
        explanation: "Victoria nói: '...cats and small dogs under 10 kilograms are welcome with a one-time 100 dollar pet registration fee.'"
      }
    ],
    fill: [
      {
        id: "f8_1",
        sentence: "The apartment rent is [ ______ ] dollars per month.",
        correctWord: "1400",
        hint: "Gợi ý: Giá tiền thuê (1400)",
        explanation: "Victoria: 'The rent is 1400 dollars per month.'"
      },
      {
        id: "f8_2",
        sentence: "The security deposit required upfront equals [ ______ ] month's rent.",
        correctWord: "one",
        hint: "Gợi ý: 1 tháng (one)",
        explanation: "Victoria: 'We require one month's rent as a security deposit...'"
      },
      {
        id: "f8_3",
        sentence: "The one-time pet registration fee is [ ______ ] dollars.",
        correctWord: "100",
        hint: "Gợi ý: Phí thú cưng (100)",
        explanation: "Victoria: '...one-time 100 dollar pet registration fee.'"
      },
      {
        id: "f8_4",
        sentence: "Alex can move in as early as this upcoming [ ______ ].",
        correctWord: "Saturday",
        hint: "Gợi ý: Thứ Bảy (Saturday)",
        explanation: "Victoria: '...as early as this upcoming Saturday!'"
      }
    ],
    dictation: [
      {
        id: "d8_1",
        speaker: "Alex",
        text: "What is the monthly rent, and what utilities are included?",
        vi: "Tiền thuê hàng tháng là bao nhiêu, và đã bao gồm những tiện ích gì?",
        hint: "Hỏi giá thuê và các tiện ích điện nước mạng"
      },
      {
        id: "d8_2",
        speaker: "Victoria",
        text: "Water and high-speed fiber internet are included, but electricity is billed separately.",
        vi: "Đã bao gồm nước sinh hoạt và internet cáp quang tốc độ cao, nhưng tiền điện sẽ tính riêng.",
        hint: "Chi tiết các khoản phí dịch vụ đi kèm"
      },
      {
        id: "d8_3",
        speaker: "Victoria",
        text: "You could move in as early as this upcoming Saturday!",
        vi: "Bạn có thể chuyển đến sớm nhất vào thứ Bảy tuần này!",
        hint: "Thời gian sớm nhất có thể dọn vào"
      }
    ],
    arrange: [
      {
        id: "a8_1",
        fullSentence: "What utilities are included in the monthly rent?",
        scrambledWords: ["utilities", "in", "included", "rent?", "the", "monthly", "are", "What"],
        vi: "Những tiện ích nào đã được bao gồm trong tiền thuê hàng tháng?"
      },
      {
        id: "a8_2",
        fullSentence: "We require one month's rent as a security deposit.",
        scrambledWords: ["as", "rent", "require", "security", "one", "deposit.", "a", "month's", "We"],
        vi: "Chúng tôi yêu cầu đặt cọc bằng 1 tháng tiền thuê."
      },
      {
        id: "a8_3",
        fullSentence: "Cats and small dogs under ten kilograms are welcome.",
        scrambledWords: ["under", "Cats", "welcome.", "dogs", "and", "small", "kilograms", "are", "ten"],
        vi: "Mèo và chó nhỏ dưới 10 kg đều được chào đón."
      }
    ],
    match: [
      {
        id: "m8_1",
        left: "Monthly rent price?",
        right: "$1400 / month."
      },
      {
        id: "m8_2",
        left: "Utilities included?",
        right: "Water and high-speed fiber internet (electricity separate)."
      },
      {
        id: "m8_3",
        left: "Security deposit amount?",
        right: "One month's rent (refundable upon inspection)."
      },
      {
        id: "m8_4",
        left: "Pet policy?",
        right: "Cats and small dogs (<10kg) with $100 registration fee."
      }
    ],
    identify: [
      {
        id: "i8_1",
        type: "speaker",
        quote: "One critical question: are pets permitted in this building? I have a small cat.",
        speakerA: "Alex (Người thuê nhà)",
        speakerB: "Victoria (Môi giới nhà đất)",
        answer: "A",
        explanation: "Alex hỏi chính sách nuôi mèo cưng của tòa nhà."
      },
      {
        id: "i8_2",
        type: "speaker",
        quote: "We require one month's rent as a security deposit, fully refundable upon move-out.",
        speakerA: "Alex (Người thuê nhà)",
        speakerB: "Victoria (Môi giới nhà đất)",
        answer: "B",
        explanation: "Môi giới Victoria giải thích điều khoản tiền đặt cọc."
      },
      {
        id: "i8_3",
        type: "tf",
        statement: "Electricity is completely free of charge in this apartment.",
        answer: false,
        explanation: "Sai. Tiền điện tính riêng theo công tơ hàng tháng."
      },
      {
        id: "i8_4",
        type: "tf",
        statement: "Alex can move in this upcoming Saturday.",
        answer: true,
        explanation: "Đúng. Căn hộ đã sạch sẽ và sẵn sàng đón khách vào thứ Bảy."
      }
    ],
    shadowing: [
      {
        id: "s8_1",
        speaker: "Alex",
        text: "What is the monthly rent, and what utilities are included?",
        vi: "Tiền thuê hàng tháng là bao nhiêu, và đã bao gồm những tiện ích gì?",
        difficulty: "Dễ"
      },
      {
        id: "s8_2",
        speaker: "Victoria",
        text: "Water and high-speed fiber internet are included, but electricity is billed separately.",
        vi: "Đã bao gồm nước sinh hoạt và internet cáp quang tốc độ cao, nhưng tiền điện sẽ tính riêng.",
        difficulty: "Nâng cao"
      },
      {
        id: "s8_3",
        speaker: "Victoria",
        text: "You could move in as early as this upcoming Saturday!",
        vi: "Bạn có thể chuyển đến sớm nhất vào thứ Bảy tuần này!",
        difficulty: "Trung bình"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép hợp đồng thuê căn hộ",
      missionPrompt: "Ghi chú lại: Tên khu căn hộ, Cấu trúc phòng, Tiền thuê hàng tháng, Tiện ích bao gồm/tính riêng, Tiền cọc, Phí nuôi mèo và Ngày dọn vào.",
      keyFacts: [
        { key: "Parkview Residences", label: "Tòa nhà: Parkview Residences", synonyms: ["parkview", "parkview residences"] },
        { key: "2-bedroom", label: "Cấu trúc: Căn hộ 2 phòng ngủ", synonyms: ["2-bedroom", "two bedroom", "2 phong ngu"] },
        { key: "$1400 / month", label: "Giá thuê: 1400 USD / tháng", synonyms: ["1400", "$1400", "1400 dollars"] },
        { key: "Water & Internet", label: "Bao gồm: Nước & Internet cáp quang", synonyms: ["water", "internet", "fiber"] },
        { key: "Electricity separate", label: "Tính riêng: Tiền điện", synonyms: ["electricity", "dien tinh rieng"] },
        { key: "1 month deposit", label: "Tiền cọc: 1 tháng (hoàn lại)", synonyms: ["1 month", "one month", "deposit", "dat coc"] },
        { key: "$100 pet fee", label: "Phí nuôi thú cưng: 100 USD (mèo < 10kg)", synonyms: ["100", "pet fee", "cat"] },
        { key: "Saturday move-in", label: "Ngày dọn vào: Thứ Bảy tuần này", synonyms: ["saturday", "thu bay"] }
      ],
      sampleNotes: "Căn hộ 2 phòng ngủ tại Parkview Residences nhiều ánh sáng tự nhiên. Tiền thuê 1400$/tháng (đã có nước và internet cáp quang, điện tính riêng). Đặt cọc 1 tháng tiền nhà (hoàn trả khi dọn đi). Cho phép nuôi mèo, phí đăng ký 1 lần là 100$. Có thể dọn vào sớm nhất thứ Bảy này."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 9: Project Team Meeting & Brainstorming (Họp Nhóm & Báo Cáo Dự Án)
  // -------------------------------------------------------------
  9: {
    choose: [
      {
        id: "c9_1",
        question: "What project is the team reviewing today?",
        options: ["A company desktop website", "Mobile app redesign", "A new hardware product", "A print magazine"],
        answer: 1,
        explanation: "Daniel nói: 'Let's review the progress on our mobile app redesign.'"
      },
      {
        id: "c9_2",
        question: "What friction point did user testing reveal during checkout?",
        options: ["Credit cards were not accepted", "Payment confirmation required too many taps", "Product images failed to load", "Discount codes were invalid"],
        answer: 1,
        explanation: "Lisa giải thích: '...users felt the payment confirmation required too many taps.'"
      },
      {
        id: "c9_3",
        question: "How did Lisa's design team solve this checkout friction?",
        options: ["Removed credit card payments", "Simplified it down to a single-click checkout option", "Added an SMS verification gate", "Sent invoices by postal mail"],
        answer: 1,
        explanation: "Lisa nói: 'We simplified it down to a single-click checkout option.'"
      },
      {
        id: "c9_4",
        question: "When is the engineering handoff meeting scheduled?",
        options: ["Wednesday morning", "Thursday afternoon", "Friday afternoon", "Next Monday"],
        answer: 1,
        explanation: "Daniel chốt lịch: 'Let's schedule our engineering handoff meeting for this Thursday afternoon.'"
      }
    ],
    fill: [
      {
        id: "f9_1",
        sentence: "Lisa completed interactive wireframes for onboarding and [ ______ ] flow.",
        correctWord: "checkout",
        hint: "Gợi ý: Thanh toán đơn hàng (checkout)",
        explanation: "Lisa: '...flow and checkout system yesterday.'"
      },
      {
        id: "f9_2",
        sentence: "The team simplified the checkout to a [ ______ ] option.",
        correctWord: "single-click",
        hint: "Gợi ý: Một chạm/click (single-click)",
        explanation: "Lisa: '...to a single-click checkout option.'"
      },
      {
        id: "f9_3",
        sentence: "The designers need three more days to finalize assets for [ ______ ] mode.",
        correctWord: "dark",
        hint: "Gợi ý: Chế độ giao diện ban đêm (dark)",
        explanation: "Lisa: '...design assets for dark mode...'"
      },
      {
        id: "f9_4",
        sentence: "The engineering handoff meeting is set for Thursday [ ______ ].",
        correctWord: "afternoon",
        hint: "Gợi ý: Buổi chiều (afternoon)",
        explanation: "Daniel: '...this Thursday afternoon.'"
      }
    ],
    dictation: [
      {
        id: "d9_1",
        speaker: "Daniel",
        text: "Did user testing reveal any friction points during checkout?",
        vi: "Các đợt kiểm thử người dùng có chỉ ra điểm nghẽn nào khi thanh toán không?",
        hint: "Hỏi về phản hồi kiểm thử người dùng"
      },
      {
        id: "d9_2",
        speaker: "Lisa",
        text: "We simplified it down to a single-click checkout option.",
        vi: "Chúng tôi đã tinh gọn nó xuống chỉ còn 1 nút bấm thanh toán duy nhất.",
        hint: "Giải pháp tối ưu thanh toán 1-click"
      },
      {
        id: "d9_3",
        speaker: "Daniel",
        text: "Let's schedule our engineering handoff meeting for this Thursday afternoon.",
        vi: "Hãy lên lịch cuộc họp bàn giao kỹ thuật vào chiều thứ Năm tuần này nhé.",
        hint: "Chốt lịch họp bàn giao với đội lập trình"
      }
    ],
    arrange: [
      {
        id: "a9_1",
        fullSentence: "Let's review the progress on our mobile app redesign.",
        scrambledWords: ["app", "on", "progress", "the", "redesign.", "review", "our", "Let's", "mobile"],
        vi: "Hãy cùng điểm lại tiến độ thiết kế lại ứng dụng di động."
      },
      {
        id: "a9_2",
        fullSentence: "We completed the interactive wireframes for the user onboarding flow.",
        scrambledWords: ["onboarding", "interactive", "We", "wireframes", "flow.", "for", "completed", "the", "the", "user"],
        vi: "Chúng tôi đã hoàn thành wireframe tương tác cho quy trình giới thiệu người dùng."
      },
      {
        id: "a9_3",
        fullSentence: "We need three more days to finalize design assets for dark mode.",
        scrambledWords: ["days", "for", "mode.", "more", "dark", "to", "assets", "finalize", "three", "We", "need", "design"],
        vi: "Chúng tôi cần thêm 3 ngày nữa để hoàn thiện các tài nguyên đồ họa cho chế độ ban đêm."
      }
    ],
    match: [
      {
        id: "m9_1",
        left: "What project is being discussed?",
        right: "Mobile app redesign."
      },
      {
        id: "m9_2",
        left: "What was the checkout friction point?",
        right: "Payment confirmation required too many taps."
      },
      {
        id: "m9_3",
        left: "How was the friction solved?",
        right: "Simplified down to a single-click checkout."
      },
      {
        id: "m9_4",
        left: "What is the next team milestone?",
        right: "Engineering handoff meeting this Thursday afternoon."
      }
    ],
    identify: [
      {
        id: "i9_1",
        type: "speaker",
        quote: "How are the UI prototypes coming along?",
        speakerA: "Daniel (Quản lý dự án)",
        speakerB: "Lisa (Trưởng nhóm thiết kế)",
        answer: "A",
        explanation: "Quản lý Daniel theo dõi tiến độ công việc của nhóm thiết kế."
      },
      {
        id: "i9_2",
        type: "speaker",
        quote: "We need three more days to finalize design assets for dark mode.",
        speakerA: "Daniel (Quản lý dự án)",
        speakerB: "Lisa (Trưởng nhóm thiết kế)",
        answer: "B",
        explanation: "Nhà thiết kế Lisa báo cáo thời gian cần để hoàn thành tài nguyên giao diện tối."
      },
      {
        id: "i9_3",
        type: "tf",
        statement: "User testing showed checkout was already effortless and needed no changes.",
        answer: false,
        explanation: "Sai. Người dùng phàn nàn bước thanh toán cần quá nhiều thao tác bấm."
      },
      {
        id: "i9_4",
        type: "tf",
        statement: "The single-click checkout is expected to boost conversion rates.",
        answer: true,
        explanation: "Đúng. Daniel đồng ý: 'That will definitely boost our conversion rates.'"
      }
    ],
    shadowing: [
      {
        id: "s9_1",
        speaker: "Daniel",
        text: "Let's review the progress on our mobile app redesign.",
        vi: "Hãy cùng điểm lại tiến độ thiết kế lại ứng dụng di động.",
        difficulty: "Dễ"
      },
      {
        id: "s9_2",
        speaker: "Lisa",
        text: "We simplified it down to a single-click checkout option.",
        vi: "Chúng tôi đã tinh gọn nó xuống chỉ còn 1 nút bấm thanh toán duy nhất.",
        difficulty: "Trung bình"
      },
      {
        id: "s9_3",
        speaker: "Daniel",
        text: "Let's schedule our engineering handoff meeting for this Thursday afternoon.",
        vi: "Hãy lên lịch cuộc họp bàn giao kỹ thuật vào chiều thứ Năm tuần này nhé.",
        difficulty: "Nâng cao"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép biên bản cuộc họp dự án ứng dụng di động",
      missionPrompt: "Ghi chú: Nội dung dự án, Tiến độ wireframe, Vấn đề người dùng gặp phải, Giải pháp cải tiến, Hạng mục còn thiếu và Lịch họp tiếp theo.",
      keyFacts: [
        { key: "App Redesign", label: "Dự án: Thiết kế lại app di động", synonyms: ["app redesign", "redesign", "mobile app"] },
        { key: "Wireframes completed", label: "Tiến độ: Hoàn tất wireframe onboarding & checkout", synonyms: ["wireframes", "onboarding", "checkout"] },
        { key: "Too many taps", label: "Vấn đề: Xác nhận thanh toán mất quá nhiều thao tác bấm", synonyms: ["too many taps", "friction", "nhieu thao tac"] },
        { key: "Single-click", label: "Giải pháp: Rút gọn thành thanh toán 1 chạm (single-click)", synonyms: ["single-click", "single click", "1 click"] },
        { key: "Dark mode (3 days)", label: "Còn thiếu: Hoàn thiện dark mode trong 3 ngày", synonyms: ["dark mode", "3 days", "assets"] },
        { key: "Thursday afternoon", label: "Lịch họp: Chiều thứ Năm bàn giao cho lập trình", synonyms: ["thursday", "afternoon", "handoff", "chieu thu nam"] }
      ],
      sampleNotes: "Họp tiến độ dự án Mobile App Redesign: Lisa đã hoàn thành wireframe luồng onboarding và checkout. Thử nghiệm người dùng cho thấy bước thanh toán phức tạp nên đã tinh gọn thành single-click checkout để tăng conversion. Cần thêm 3 ngày hoàn thiện graphic assets cho Dark Mode. Lên lịch họp bàn giao với team kỹ thuật vào chiều thứ Năm."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 10: Booking Flight Tickets (Đặt Vé Máy Bay & Lịch Trình)
  // -------------------------------------------------------------
  10: {
    choose: [
      {
        id: "c10_1",
        question: "Where is Chloe planning to travel to from Los Angeles?",
        options: ["London", "Tokyo", "Sydney", "Singapore"],
        answer: 1,
        explanation: "Chloe nói: '...book a round-trip ticket from Los Angeles to Tokyo departing on November 10th.'"
      },
      {
        id: "c10_2",
        question: "When is Chloe's return flight scheduled?",
        options: ["November 15th", "November 20th", "November 24th", "December 1st"],
        answer: 2,
        explanation: "Chloe trả lời: 'On November 24th.'"
      },
      {
        id: "c10_3",
        question: "Why did Chloe choose the direct 11-hour flight over the cheaper Taipei layover?",
        options: ["She wanted airline miles", "She preferred to save energy", "The layover flight was cancelled", "She wanted special in-flight meals"],
        answer: 1,
        explanation: "Chloe nói: 'I prefer the direct flight to save energy.'"
      },
      {
        id: "c10_4",
        question: "How much checked baggage is included in Chloe's ticket?",
        options: ["One bag up to 20 kg", "Two bags up to 23 kg each", "Three bags up to 30 kg", "Carry-on baggage only"],
        answer: 1,
        explanation: "Ethan nói: 'two pieces of checked luggage up to 23 kilograms each are included free of charge.'"
      }
    ],
    fill: [
      {
        id: "f10_1",
        sentence: "Chloe departs from Los Angeles on November [ ______ ].",
        correctWord: "10th",
        hint: "Gợi ý: Ngày 10 (10th)",
        explanation: "Chloe: '...departing on November 10th.'"
      },
      {
        id: "f10_2",
        sentence: "The direct flight to Tokyo takes [ ______ ] hours.",
        correctWord: "eleven",
        hint: "Gợi ý: 11 tiếng (eleven)",
        explanation: "Ethan: 'We have a direct eleven-hour flight with Japan Airlines...'"
      },
      {
        id: "f10_3",
        sentence: "The ticket includes two pieces of checked luggage up to [ ______ ] kg each.",
        correctWord: "23",
        hint: "Gợi ý: Cân nặng kiện hành lý (23)",
        explanation: "Ethan: '...up to 23 kilograms each...'"
      },
      {
        id: "f10_4",
        sentence: "Chloe requested to add comprehensive [ ______ ] insurance to her reservation.",
        correctWord: "travel",
        hint: "Gợi ý: Bảo hiểm du lịch (travel)",
        explanation: "Chloe: '...add comprehensive travel insurance...'"
      }
    ],
    dictation: [
      {
        id: "d10_1",
        speaker: "Chloe",
        text: "Are there direct flights available, or will there be layovers?",
        vi: "Có chuyến bay thẳng không, hay phải quá cảnh?",
        hint: "Hỏi bay thẳng hay quá cảnh"
      },
      {
        id: "d10_2",
        speaker: "Chloe",
        text: "I prefer the direct flight to save energy.",
        vi: "Tôi thích bay thẳng hơn để tiết kiệm sức khỏe.",
        hint: "Lựa chọn bay thẳng tiết kiệm sức"
      },
      {
        id: "d10_3",
        speaker: "Ethan",
        text: "Two pieces of checked luggage up to 23 kilograms each are included free of charge.",
        vi: "Hai kiện hành lý ký gửi tối đa 23 kg mỗi kiện được bao gồm miễn phí.",
        hint: "Quy định số kiện và cân nặng hành lý"
      }
    ],
    arrange: [
      {
        id: "a10_1",
        fullSentence: "I would like to book a round-trip ticket from Los Angeles to Tokyo.",
        scrambledWords: ["book", "round-trip", "to", "I", "a", "ticket", "Tokyo.", "would", "from", "Los", "Angeles", "like"],
        vi: "Tôi muốn đặt vé khứ hồi từ Los Angeles đi Tokyo."
      },
      {
        id: "a10_2",
        fullSentence: "Please add comprehensive travel insurance to my flight reservation.",
        scrambledWords: ["to", "insurance", "reservation.", "Please", "comprehensive", "add", "flight", "my", "travel"],
        vi: "Vui lòng thêm gói bảo hiểm du lịch toàn diện vào đặt chỗ chuyến bay của tôi."
      },
      {
        id: "a10_3",
        fullSentence: "I have sent the booking invoice and flight schedule to your email.",
        scrambledWords: ["sent", "schedule", "and", "flight", "invoice", "the", "email.", "to", "I", "booking", "have", "your"],
        vi: "Tôi đã gửi hóa đơn đặt chỗ và lịch bay chi tiết vào email của bạn rồi."
      }
    ],
    match: [
      {
        id: "m10_1",
        left: "Flight route & dates?",
        right: "LA to Tokyo, departing Nov 10, returning Nov 24."
      },
      {
        id: "m10_2",
        left: "Selected flight option?",
        right: "Direct 11-hour flight with Japan Airlines."
      },
      {
        id: "m10_3",
        left: "Baggage allowance?",
        right: "Two checked bags up to 23kg each included free."
      },
      {
        id: "m10_4",
        left: "Extra request by Chloe?",
        right: "Comprehensive travel insurance added to reservation."
      }
    ],
    identify: [
      {
        id: "i10_1",
        type: "speaker",
        quote: "Are there direct flights available, or will there be layovers?",
        speakerA: "Chloe (Khách du lịch)",
        speakerB: "Ethan (Đại lý bán vé)",
        answer: "A",
        explanation: "Chloe hỏi về lịch trình các chuyến bay thẳng."
      },
      {
        id: "i10_2",
        type: "speaker",
        quote: "Two pieces of checked luggage up to 23 kilograms each are included free of charge.",
        speakerA: "Chloe (Khách du lịch)",
        speakerB: "Ethan (Đại lý bán vé)",
        answer: "B",
        explanation: "Ethan tư vấn tiêu chuẩn hành lý ký gửi miễn cước."
      },
      {
        id: "i10_3",
        type: "tf",
        statement: "Chloe chose the flight with a two-hour layover in Taipei.",
        answer: false,
        explanation: "Sai. Chloe chọn bay thẳng 11 tiếng của Japan Airlines."
      },
      {
        id: "i10_4",
        type: "tf",
        statement: "Chloe added comprehensive travel insurance to her ticket.",
        answer: true,
        explanation: "Đúng. Chloe yêu cầu thêm bảo hiểm du lịch."
      }
    ],
    shadowing: [
      {
        id: "s10_1",
        speaker: "Chloe",
        text: "I prefer the direct flight to save energy.",
        vi: "Tôi thích bay thẳng hơn để tiết kiệm sức khỏe.",
        difficulty: "Dễ"
      },
      {
        id: "s10_2",
        speaker: "Ethan",
        text: "Two pieces of checked luggage up to 23 kilograms each are included free of charge.",
        vi: "Hai kiện hành lý ký gửi tối đa 23 kg mỗi kiện được bao gồm miễn phí.",
        difficulty: "Nâng cao"
      },
      {
        id: "s10_3",
        speaker: "Chloe",
        text: "Please also add comprehensive travel insurance to my reservation.",
        vi: "Vui lòng thêm gói bảo hiểm du lịch toàn diện vào đặt chỗ của tôi nhé.",
        difficulty: "Trung bình"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép lịch trình & Đặt vé máy bay quốc tế",
      missionPrompt: "Ghi lại: Hành trình bay, Ngày đi & Ngày về, Hãng hàng không & Thời gian bay, Tiêu chuẩn hành lý và Dịch vụ bổ sung.",
      keyFacts: [
        { key: "LA to Tokyo", label: "Hành trình: Los Angeles đi Tokyo", synonyms: ["los angeles", "tokyo", "la", "la to tokyo"] },
        { key: "Nov 10 - Nov 24", label: "Lịch trình: Đi 10/11 - Về 24/11", synonyms: ["november 10", "november 24", "10/11", "24/11"] },
        { key: "Japan Airlines (11h)", label: "Chuyến bay: Bay thẳng 11 tiếng (Japan Airlines)", synonyms: ["japan airlines", "11 hours", "direct flight", "bay thang"] },
        { key: "2 bags x 23kg", label: "Hành lý: 2 kiện ký gửi x 23kg miễn phí", synonyms: ["23 kg", "23 kilograms", "2 pieces", "checked luggage"] },
        { key: "Travel insurance", label: "Bảo hiểm: Bảo hiểm du lịch toàn diện", synonyms: ["insurance", "travel insurance", "bao hiem"] }
      ],
      sampleNotes: "Đặt vé khứ hồi LA - Tokyo. Khởi hành: 10/11, về: 24/11. Chọn chuyến bay thẳng 11 tiếng của Japan Airlines để tiết kiệm sức. Vé bao gồm 2 kiện hành lý ký gửi (tối đa 23kg/kiện). Bổ sung bảo hiểm du lịch toàn diện. Ethan đã gửi hóa đơn và lịch trình qua email."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 11: Opening a Bank Account (Mở Tài Khoản Ngân Hàng & Ứng Dụng)
  // -------------------------------------------------------------
  11: {
    choose: [
      {
        id: "c11_1",
        question: "Why did Liam come to Apex National Bank?",
        options: ["To apply for a home mortgage", "To open a checking and savings account", "To exchange foreign currency", "To report a stolen credit card"],
        answer: 1,
        explanation: "Liam nói ở lượt 2: '...would like to open a checking and savings account.'"
      },
      {
        id: "c11_2",
        question: "What documents did Liam bring for identification and proof of address?",
        options: ["Passport, driver's license, and electricity utility bill", "Student ID, birth certificate, and gym pass", "Only work badge", "Credit card and rent contract"],
        answer: 0,
        explanation: "Liam nói: 'I brought my passport, driver's license, and my latest electricity utility bill.'"
      },
      {
        id: "c11_3",
        question: "How can Liam waive the monthly maintenance fee on Apex Premium Checking?",
        options: ["Keep at least $10,000 balance", "Set up monthly direct deposit", "Make 20 card transactions per week", "Pay an annual upfront fee"],
        answer: 1,
        explanation: "Grace giải thích: '...qualifies for no monthly fee as long as you set up monthly direct deposit.'"
      },
      {
        id: "c11_4",
        question: "How will Liam receive his temporary login pin for mobile banking?",
        options: ["By postal letter in 5 days", "Sent via SMS to his phone", "Given on a handwritten slip", "Sent via email to his boss"],
        answer: 1,
        explanation: "Grace hướng dẫn: '...and your temporary login pin will be sent via SMS.'"
      }
    ],
    fill: [
      {
        id: "f11_1",
        sentence: "Liam wants to open both a checking and a [ ______ ] account.",
        correctWord: "savings",
        hint: "Gợi ý: Tài khoản tiết kiệm (savings)",
        explanation: "Liam: '...open a checking and savings account.'"
      },
      {
        id: "f11_2",
        sentence: "Liam provided a passport, driver's license, and an electricity utility [ ______ ].",
        correctWord: "bill",
        hint: "Gợi ý: Hóa đơn (bill)",
        explanation: "Liam: '...electricity utility bill.'"
      },
      {
        id: "f11_3",
        sentence: "Liam prefers free international online [ ______ ].",
        correctWord: "transfers",
        hint: "Gợi ý: Chuyển khoản (transfers)",
        explanation: "Liam: '...free international online transfers.'"
      },
      {
        id: "f11_4",
        sentence: "The temporary mobile login pin will be sent via [ ______ ].",
        correctWord: "SMS",
        hint: "Gợi ý: Tin nhắn SMS",
        explanation: "Grace: '...will be sent via SMS.'"
      }
    ],
    dictation: [
      {
        id: "d11_1",
        speaker: "Liam",
        text: "I would like to open a checking and savings account.",
        vi: "Tôi muốn mở một tài khoản thanh toán và một tài khoản tiết kiệm.",
        hint: "Nhu cầu mở tài khoản tại ngân hàng"
      },
      {
        id: "d11_2",
        speaker: "Grace",
        text: "Do you have two forms of government identification and proof of address?",
        vi: "Quý khách có mang theo 2 loại giấy tờ tùy thân và giấy xác nhận nơi cư trú không?",
        hint: "Yêu cầu giấy tờ pháp lý của ngân hàng"
      },
      {
        id: "d11_3",
        speaker: "Grace",
        text: "Your temporary login pin will be sent via SMS.",
        vi: "Mã pin tạm thời sẽ được gửi qua tin nhắn SMS.",
        hint: "Hướng dẫn nhận mã pin đăng nhập"
      }
    ],
    arrange: [
      {
        id: "a11_1",
        fullSentence: "I brought my passport, driver's license, and electricity utility bill.",
        scrambledWords: ["electricity", "license,", "my", "utility", "passport,", "brought", "and", "driver's", "I", "bill."],
        vi: "Tôi mang theo hộ chiếu, bằng lái xe và hóa đơn tiền điện."
      },
      {
        id: "a11_2",
        fullSentence: "I prefer an account with zero maintenance fees.",
        scrambledWords: ["zero", "fees.", "with", "prefer", "account", "maintenance", "an", "I"],
        vi: "Tôi thích loại tài khoản không mất phí duy trì."
      },
      {
        id: "a11_3",
        fullSentence: "Download the mobile app and scan this QR code to access your account.",
        scrambledWords: ["code", "account.", "Download", "scan", "mobile", "access", "this", "app", "the", "and", "to", "QR", "your"],
        vi: "Tải ứng dụng di động và quét mã QR này để truy cập tài khoản của bạn."
      }
    ],
    match: [
      {
        id: "m11_1",
        left: "Customer's goal?",
        right: "Open checking and savings accounts."
      },
      {
        id: "m11_2",
        left: "Documents provided?",
        right: "Passport, driver's license, and electricity utility bill."
      },
      {
        id: "m11_3",
        left: "How to get zero monthly fees?",
        right: "Set up monthly direct deposit with company payroll."
      },
      {
        id: "m11_4",
        left: "How to activate mobile banking?",
        right: "Download Apex Mobile App, scan QR code, receive pin via SMS."
      }
    ],
    identify: [
      {
        id: "i11_1",
        type: "speaker",
        quote: "I prefer an account with zero maintenance fees and free international online transfers.",
        speakerA: "Liam (Khách hàng)",
        speakerB: "Grace (Giao dịch viên)",
        answer: "A",
        explanation: "Liam chia sẻ tiêu chí tài khoản ngân hàng mong muốn."
      },
      {
        id: "i11_2",
        type: "speaker",
        quote: "Our Apex Premium Checking qualifies for no monthly fee as long as you set up monthly direct deposit.",
        speakerA: "Liam (Khách hàng)",
        speakerB: "Grace (Giao dịch viên)",
        answer: "B",
        explanation: "Giao dịch viên Grace giới thiệu chính sách miễn phí duy trì."
      },
      {
        id: "i11_3",
        type: "tf",
        statement: "Liam forgot to bring his proof of address to the bank.",
        answer: false,
        explanation: "Sai. Liam có mang hóa đơn tiền điện mới nhất làm bằng chứng cư trú."
      },
      {
        id: "i11_4",
        type: "tf",
        statement: "Liam can use his company payroll direct deposit to waive maintenance fees.",
        answer: true,
        explanation: "Đúng. Thiết lập nhận lương tự động qua tài khoản giúp miễn phí hoàn toàn."
      }
    ],
    shadowing: [
      {
        id: "s11_1",
        speaker: "Liam",
        text: "I recently moved here and would like to open a checking and savings account.",
        vi: "Tôi mới chuyển đến đây và muốn mở một tài khoản thanh toán và một tài khoản tiết kiệm.",
        difficulty: "Trung bình"
      },
      {
        id: "s11_2",
        speaker: "Liam",
        text: "I prefer an account with zero maintenance fees and free international online transfers.",
        vi: "Tôi thích loại tài khoản không mất phí duy trì và được miễn phí chuyển tiền trực tuyến quốc tế.",
        difficulty: "Nâng cao"
      },
      {
        id: "s11_3",
        speaker: "Grace",
        text: "Download the Apex Mobile App, scan this QR code, and your temporary login pin will be sent via SMS.",
        vi: "Quý khách tải ứng dụng Apex Mobile, quét mã QR này và mã pin tạm thời sẽ được gửi qua tin nhắn SMS.",
        difficulty: "Nâng cao"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép thủ tục mở tài khoản ngân hàng",
      missionPrompt: "Ghi lại: Loại tài khoản mở, Giấy tờ tùy thân cung cấp, Gói tài khoản lựa chọn, Điều kiện miễn phí và Cách kích hoạt app ngân hàng.",
      keyFacts: [
        { key: "Checking & Savings", label: "Loại tài khoản: Checking (thanh toán) & Savings (tiết kiệm)", synonyms: ["checking", "savings", "checking and savings"] },
        { key: "Passport & Driver license", label: "Giấy tờ: Hộ chiếu & Bằng lái xe", synonyms: ["passport", "driver license", "driver's license", "ho chieu"] },
        { key: "Electricity bill", label: "Chứng minh cư trú: Hóa đơn tiền điện", synonyms: ["utility bill", "electricity bill", "hoa don tien dien"] },
        { key: "Zero fees with direct deposit", label: "Phí: Miễn phí nếu nhận lương tự động", synonyms: ["direct deposit", "zero fee", "no fee", "nhan luong"] },
        { key: "SMS login pin", label: "Kích hoạt app: Quét QR, nhận mã PIN qua SMS", synonyms: ["sms", "qr code", "pin", "apex mobile app"] }
      ],
      sampleNotes: "Liam mở tài khoản Checking và Savings tại Apex National Bank. Giấy tờ cung cấp: Hộ chiếu, bằng lái xe và hóa đơn tiền điện. Đăng ký gói Apex Premium Checking miễn phí duy trì hàng tháng nhờ nhận lương trực tiếp (direct deposit). Kích hoạt mobile app bằng cách quét mã QR và nhận mã PIN qua tin nhắn SMS."
    }
  },

  // -------------------------------------------------------------
  // DIALOGUE 12: Daily Catch-up with an Old Friend (Gặp Lại Bạn Cũ & Hàn Huyên)
  // -------------------------------------------------------------
  12: {
    choose: [
      {
        id: "c12_1",
        question: "How long had it been since Nick and Hannah last saw each other?",
        options: ["Six months", "One year", "At least two years since college graduation", "Five years"],
        answer: 2,
        explanation: "Hannah thốt lên: 'It has been at least two years since college graduation!'"
      },
      {
        id: "c12_2",
        question: "What career shift did Hannah make six months ago?",
        options: ["From accounting to human resources", "From graphic design to product marketing", "From marketing to coding", "From banking to teaching"],
        answer: 1,
        explanation: "Hannah nói: 'I transitioned into product marketing six months ago, and I absolutely love the dynamic work pace.'"
      },
      {
        id: "c12_3",
        question: "Where did Hannah move to recently?",
        options: ["Downtown high-rise", "Beachside resort", "A peaceful suburb near the mountains", "Another country"],
        answer: 2,
        explanation: "Hannah chia sẻ: '...relocated to a peaceful suburb near the mountains.'"
      },
      {
        id: "c12_4",
        question: "What recent milestone did Nick achieve at his company?",
        options: ["Quit his job to start a company", "Promoted to senior business analyst last month", "Transferred to a branch in London", "Won employee of the year award"],
        answer: 1,
        explanation: "Nick khoe: 'I just got promoted to senior business analyst last month...'"
      }
    ],
    fill: [
      {
        id: "f12_1",
        sentence: "Nick and Hannah graduated from [ ______ ] two years ago.",
        correctWord: "college",
        hint: "Gợi ý: Đại học / cao đẳng (college)",
        explanation: "Hannah: '...since college graduation!'"
      },
      {
        id: "f12_2",
        sentence: "Hannah transitioned into product [ ______ ] six months ago.",
        correctWord: "marketing",
        hint: "Gợi ý: Tiếp thị (marketing)",
        explanation: "Hannah: '...into product marketing six months ago...'"
      },
      {
        id: "f12_3",
        sentence: "Nick got promoted to senior business [ ______ ] last month.",
        correctWord: "analyst",
        hint: "Gợi ý: Chuyên viên phân tích (analyst)",
        explanation: "Nick: '...promoted to senior business analyst...'"
      },
      {
        id: "f12_4",
        sentence: "Nick is planning to travel to [ ______ ] this autumn.",
        correctWord: "Europe",
        hint: "Gợi ý: Châu Âu (Europe)",
        explanation: "Nick: '...planning to travel to Europe this autumn.'"
      }
    ],
    dictation: [
      {
        id: "d12_1",
        speaker: "Hannah",
        text: "It has been at least two years since college graduation!",
        vi: "Phải ít nhất 2 năm rồi từ ngày tốt nghiệp đại học!",
        hint: "Thốt lên vì đã 2 năm chưa gặp"
      },
      {
        id: "d12_2",
        speaker: "Hannah",
        text: "I transitioned into product marketing six months ago.",
        vi: "Tớ đã chuyển sang làm tiếp thị sản phẩm được 6 tháng rồi.",
        hint: "Chia sẻ về công việc marketing mới"
      },
      {
        id: "d12_3",
        speaker: "Hannah",
        text: "We definitely must grab dinner this weekend and catch up properly.",
        vi: "Cuối tuần này chúng mình nhất định phải cùng nhau đi ăn tối để hàn huyên nhiều hơn nhé.",
        hint: "Lời rủ đi ăn tối cuối tuần"
      }
    ],
    arrange: [
      {
        id: "a12_1",
        fullSentence: "How have you been? Are you still working in graphic design?",
        scrambledWords: ["you", "working", "still", "design?", "graphic", "in", "been?", "have", "How", "Are"],
        vi: "Cậu dạo này thế nào rồi? Vẫn làm trong ngành thiết kế đồ họa chứ?"
      },
      {
        id: "a12_2",
        fullSentence: "I recently relocated to a peaceful suburb near the mountains.",
        scrambledWords: ["peaceful", "mountains.", "the", "a", "suburb", "recently", "near", "to", "relocated", "I"],
        vi: "Gần đây tớ vừa chuyển về một vùng ngoại ô yên bình gần núi."
      },
      {
        id: "a12_3",
        fullSentence: "We definitely must grab dinner this weekend and catch up.",
        scrambledWords: ["weekend", "must", "dinner", "and", "We", "up.", "grab", "this", "catch", "definitely"],
        vi: "Cuối tuần này chúng mình nhất định phải cùng nhau đi ăn tối để hàn huyên nhé."
      }
    ],
    match: [
      {
        id: "m12_1",
        left: "How long since they last met?",
        right: "At least 2 years since college graduation."
      },
      {
        id: "m12_2",
        left: "Hannah's current job?",
        right: "Product marketing (switched from graphic design)."
      },
      {
        id: "m12_3",
        left: "Nick's recent good news?",
        right: "Promoted to senior business analyst last month."
      },
      {
        id: "m12_4",
        left: "Their upcoming plan?",
        right: "Grab dinner this weekend to catch up properly."
      }
    ],
    identify: [
      {
        id: "i12_1",
        type: "speaker",
        quote: "Actually, I transitioned into product marketing six months ago, and I absolutely love the dynamic work pace.",
        speakerA: "Nick (Bạn thân A)",
        speakerB: "Hannah (Bạn thân B)",
        answer: "B",
        explanation: "Hannah kể về bước chuyển sự nghiệp sang product marketing."
      },
      {
        id: "i12_2",
        type: "speaker",
        quote: "I just got promoted to senior business analyst last month, and I'm planning to travel to Europe this autumn.",
        speakerA: "Nick (Bạn thân A)",
        speakerB: "Hannah (Bạn thân B)",
        answer: "A",
        explanation: "Nick chia sẻ tin vui thăng chức và kế hoạch du lịch châu Âu."
      },
      {
        id: "i12_3",
        type: "tf",
        statement: "Hannah still lives in the noisy downtown area.",
        answer: false,
        explanation: "Sai. Hannah đã chuyển về vùng ngoại ô yên bình gần núi."
      },
      {
        id: "i12_4",
        type: "tf",
        statement: "Nick and Hannah agreed to meet for dinner this weekend.",
        answer: true,
        explanation: "Đúng. Cả hai hẹn đi ăn tối cuối tuần này để hàn huyên."
      }
    ],
    shadowing: [
      {
        id: "s12_1",
        speaker: "Hannah",
        text: "What a delightful surprise! It has been at least two years since college graduation!",
        vi: "Thật là một bất ngờ thú vị! Phải ít nhất 2 năm rồi từ ngày tốt nghiệp đại học!",
        difficulty: "Trung bình"
      },
      {
        id: "s12_2",
        speaker: "Nick",
        text: "I just got promoted to senior business analyst last month.",
        vi: "Tớ vừa được thăng chức lên chuyên viên phân tích kinh doanh cao cấp tháng trước.",
        difficulty: "Trung bình"
      },
      {
        id: "s12_3",
        speaker: "Hannah",
        text: "We definitely must grab dinner this weekend and catch up properly.",
        vi: "Cuối tuần này chúng mình nhất định phải cùng nhau đi ăn tối để hàn huyên nhiều hơn nhé.",
        difficulty: "Dễ"
      }
    ],
    noteTaking: {
      missionTitle: "Ghi chép thông tin hàn huyên cuộc sống bạn cũ",
      missionPrompt: "Ghi lại: Thời gian kể từ lần gặp trước, Công việc hiện tại của Hannah, Nơi ở mới của Hannah, Tin vui thăng chức của Nick, Kế hoạch du lịch của Nick và Hẹn gặp cuối tuần.",
      keyFacts: [
        { key: "2 years", label: "Thời gian: 2 năm kể từ khi tốt nghiệp", synonyms: ["2 years", "two years", "college graduation"] },
        { key: "Product marketing", label: "Công việc Hannah: Tiếp thị sản phẩm (chuyển từ thiết kế đồ họa)", synonyms: ["product marketing", "marketing"] },
        { key: "Suburb near mountains", label: "Nơi ở Hannah: Ngoại ô yên bình gần núi", synonyms: ["suburb", "mountains", "peaceful suburb", "ngoai o"] },
        { key: "Senior analyst", label: "Công việc Nick: Thăng chức Chuyên viên phân tích cao cấp", synonyms: ["senior business analyst", "analyst", "thang chuc"] },
        { key: "Europe travel", label: "Kế hoạch Nick: Du lịch châu Âu mùa thu này", synonyms: ["europe", "travel to europe", "autumn"] },
        { key: "Dinner this weekend", label: "Kế hoạch chung: Ăn tối hàn huyên cuối tuần này", synonyms: ["dinner", "weekend", "an toi", "cuoi tuan"] }
      ],
      sampleNotes: "Nick và Hannah tình cờ gặp lại sau 2 năm tốt nghiệp đại học. Hannah đã chuyển từ graphic design sang làm product marketing được 6 tháng và chuyển về sống ở vùng ngoại ô gần núi. Nick tháng trước vừa được thăng chức lên Senior Business Analyst và chuẩn bị đi du lịch châu Âu vào mùa thu. Cả hai hẹn đi ăn tối cuối tuần này để trò chuyện nhiều hơn."
    }
  }
};
