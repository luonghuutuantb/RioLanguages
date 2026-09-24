// =========================================================================
// REAL-LIFE BILINGUAL ENGLISH DIALOGUE SCENARIOS & COMPREHENSION TESTS
// 12 Authentic Real-Life Scenarios with Turn-by-Turn Dialogue, Script & Quizzes
// =========================================================================

window.LISTENING_DIALOGUES = [
  {
    "id": 1,
    "key": "airport_checkin",
    "title": "Check-in Sân Bay & Lên Máy Bay",
    "title_en": "Airport Check-in & Boarding",
    "category": "Du Lịch & Di Chuyển",
    "icon": "✈️",
    "level": "A2 - B1",
    "speakerA": { "name": "Emma", "role": "Hành khách (Passenger)", "avatar": "👩", "voice": "female" },
    "speakerB": { "name": "Marcus", "role": "Nhân viên thủ tục (Agent)", "avatar": "👨‍✈️", "voice": "male" },
    "summary": "Hành khách Emma làm thủ tục check-in tại quầy sân bay, gửi hành lý ký gửi và yêu cầu chỗ ngồi gần cửa sổ.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Marcus", "text": "Good morning! Welcome to SkyWings Airlines. Where are you flying to today?", "vi": "Chào buổi sáng! Chào mừng quý khách đến với hãng hàng không SkyWings. Hôm nay quý khách bay đi đâu ạ?" },
      { "id": 2, "speaker": "A", "name": "Emma", "text": "Good morning. I'm flying to London Heathrow on flight SW402.", "vi": "Chào anh. Tôi bay đến sân bay London Heathrow trên chuyến bay SW402." },
      { "id": 3, "speaker": "B", "name": "Marcus", "text": "May I please see your passport and booking confirmation code?", "vi": "Tôi có thể xem hộ chiếu và mã xác nhận đặt chỗ của quý khách được không?" },
      { "id": 4, "speaker": "A", "name": "Emma", "text": "Certainly, here you go. Could you please check if a window seat is still available?", "vi": "Chắc chắn rồi, của anh đây. Anh kiểm tra giúp tôi xem còn ghế cạnh cửa sổ không nhé?" },
      { "id": 5, "speaker": "B", "name": "Marcus", "text": "Yes, I have seat 14A available for you in economy class. How many bags are you checking in today?", "vi": "Vâng, tôi còn ghế 14A cho quý khách ở hạng phổ thông. Hôm nay quý khách có bao nhiêu kiện hành lý ký gửi ạ?" },
      { "id": 6, "speaker": "A", "name": "Emma", "text": "Just this large suitcase, and I will take this small backpack as my carry-on bag.", "vi": "Chỉ có chiếc vali lớn này thôi, còn chiếc ba lô nhỏ này tôi sẽ mang làm hành lý xách tay." },
      { "id": 7, "speaker": "B", "name": "Marcus", "text": "Please place your suitcase onto the scale. It weighs 19 kilograms, which is well within your limit.", "vi": "Xin quý khách đặt vali lên bàn cân. Vali nặng 19 kg, hoàn toàn nằm trong giới hạn cho phép." },
      { "id": 8, "speaker": "A", "name": "Emma", "text": "That's great. What time does boarding begin, and which gate should I go to?", "vi": "Tuyệt quá. Mấy giờ thì bắt đầu lên máy bay, và tôi phải đến cửa khởi hành số mấy?" },
      { "id": 9, "speaker": "B", "name": "Marcus", "text": "Boarding starts promptly at 10:15 at Gate 24. Here is your boarding pass and passport back.", "vi": "Thời gian lên máy bay bắt đầu lúc đúng 10:15 tại Cửa số 24. Đây là thẻ lên máy bay và hộ chiếu của quý khách." },
      { "id": 10, "speaker": "A", "name": "Emma", "text": "Thank you so much for your assistance. Have a wonderful day!", "vi": "Cảm ơn anh rất nhiều vì đã giúp đỡ. Chúc anh một ngày tốt lành!" },
      { "id": 11, "speaker": "B", "name": "Marcus", "text": "You're very welcome. Enjoy your flight to London!", "vi": "Không có gì ạ. Chúc quý khách có chuyến bay tuyệt vời đến London!" }
    ],
    "test": [
      {
        "id": "t1_1",
        "type": "mcq",
        "question": "Where is Emma traveling to?",
        "options": ["Paris", "London Heathrow", "New York", "Tokyo"],
        "answer": 1,
        "explanation": "Trong câu thoại thứ 2, Emma nói: 'I'm flying to London Heathrow on flight SW402.'"
      },
      {
        "id": "t1_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Emma requested a [ ______ ] seat.",
        "sentenceWithBlank": "Emma requested a [ ______ ] seat.",
        "correctAnswer": "window",
        "hint": "Gợi ý: Từ bắt đầu bằng chữ 'w' (ghế cạnh cửa sổ)",
        "explanation": "Emma hỏi ở lượt 4: 'Could you please check if a window seat is still available?'"
      },
      {
        "id": "t1_3",
        "type": "tf",
        "question": "Emma's suitcase was over the permitted weight limit.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Vali của Emma nặng 19kg, nhân viên nói rõ: 'which is well within your limit' (hoàn toàn nằm trong giới hạn cho phép)."
      },
      {
        "id": "t1_4",
        "type": "mcq",
        "question": "What time does boarding start at Gate 24?",
        "options": ["10:00 AM", "10:15 AM", "10:45 AM", "11:15 AM"],
        "answer": 1,
        "explanation": "Ở lượt 9, nhân viên Marcus thông báo: 'Boarding starts promptly at 10:15 at Gate 24.'"
      },
      {
        "id": "t1_5",
        "type": "blank",
        "question": "Nghe & Điền từ: The agent handed Emma her [ ______ ] pass and passport.",
        "sentenceWithBlank": "The agent handed Emma her [ ______ ] pass and passport.",
        "correctAnswer": "boarding",
        "hint": "Gợi ý: Thẻ lên máy bay tiếng Anh là '... pass'",
        "explanation": "Ở lượt 9: 'Here is your boarding pass and passport back.'"
      }
    ]
  },
  {
    "id": 2,
    "key": "hotel_checkin",
    "title": "Nhận Phòng Khách Sạn & Dịch Vụ",
    "title_en": "Hotel Check-in & Amenities",
    "category": "Khách Sạn & Nghỉ Dưỡng",
    "icon": "🏨",
    "level": "A2 - B1",
    "speakerA": { "name": "Lucas", "role": "Khách hàng (Guest)", "avatar": "👨", "voice": "male" },
    "speakerB": { "name": "Sophie", "role": "Lễ tân (Receptionist)", "avatar": "👩‍💼", "voice": "female" },
    "summary": "Lucas nhận phòng tại khách sạn Grand Horizon, kiểm tra dịch vụ bữa sáng và nhận mật khẩu Wi-Fi.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Sophie", "text": "Good afternoon, sir! Welcome to the Grand Horizon Resort. How may I assist you today?", "vi": "Chào buổi chiều quý khách! Chào mừng quý khách đến với khu nghỉ dưỡng Grand Horizon. Tôi có thể hỗ trợ gì cho quý khách ạ?" },
      { "id": 2, "speaker": "A", "name": "Lucas", "text": "Hello. I have a reservation under the name Lucas Vance for three nights.", "vi": "Xin chào. Tôi có đặt phòng trước dưới tên Lucas Vance trong 3 đêm." },
      { "id": 3, "speaker": "B", "name": "Sophie", "text": "Let me pull up your record... Ah yes, Mr. Vance, a Deluxe King Room with an ocean view.", "vi": "Để tôi kiểm tra dữ liệu... À vâng, thưa ông Vance, một phòng Deluxe King hướng biển." },
      { "id": 4, "speaker": "A", "name": "Lucas", "text": "That is correct. Is complimentary breakfast included in my room package?", "vi": "Đúng rồi. Bữa sáng miễn phí có bao gồm trong gói phòng của tôi không?" },
      { "id": 5, "speaker": "B", "name": "Sophie", "text": "Yes, absolutely! Buffet breakfast is served daily from 6:30 AM to 10:00 AM on the second floor.", "vi": "Dạ vâng, chắc chắn rồi! Tiệc buffet sáng được phục vụ hàng ngày từ 6:30 đến 10:00 sáng tại tầng hai." },
      { "id": 6, "speaker": "A", "name": "Lucas", "text": "Wonderful. Also, could you give me the Wi-Fi credentials for the room?", "vi": "Tuyệt vời. Ngoài ra, cô có thể cho tôi thông tin đăng nhập Wi-Fi trong phòng được không?" },
      { "id": 7, "speaker": "B", "name": "Sophie", "text": "Certainly. The network is Horizon_Guest and the password is printed right on your keycard envelope.", "vi": "Dạ được chứ. Mạng là Horizon_Guest và mật khẩu được in ngay trên phong bì đựng thẻ từ của quý khách." },
      { "id": 8, "speaker": "A", "name": "Lucas", "text": "Great. Where is the elevator located?", "vi": "Tốt quá. Thang máy nằm ở vị trí nào vậy?" },
      { "id": 9, "speaker": "B", "name": "Sophie", "text": "Just past the lobby bar to your right. You are on the 7th floor, room 712. Here are your keys!", "vi": "Ngay qua quầy bar sảnh ở phía tay phải của quý khách. Quý khách ở tầng 7, phòng 712. Đây là thẻ từ của quý khách ạ!" },
      { "id": 10, "speaker": "A", "name": "Lucas", "text": "Thank you so much for your warm hospitality!", "vi": "Cảm ơn cô rất nhiều vì sự đón tiếp chu đáo!" }
    ],
    "test": [
      {
        "id": "t2_1",
        "type": "mcq",
        "question": "How many nights is Lucas staying at the resort?",
        "options": ["Two nights", "Three nights", "Four nights", "One week"],
        "answer": 1,
        "explanation": "Lucas nói ở lượt 2: 'I have a reservation under the name Lucas Vance for three nights.'"
      },
      {
        "id": "t2_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Buffet breakfast is served daily on the [ ______ ] floor.",
        "sentenceWithBlank": "Buffet breakfast is served daily on the [ ______ ] floor.",
        "correctAnswer": "second",
        "hint": "Gợi ý: Tầng 2 (viết bằng chữ: second)",
        "explanation": "Lễ tân Sophie giải thích: '...from 6:30 AM to 10:00 AM on the second floor.'"
      },
      {
        "id": "t2_3",
        "type": "tf",
        "question": "The guest has to pay an extra fee for breakfast.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Bữa sáng là 'complimentary' (miễn phí kèm theo gói phòng)."
      },
      {
        "id": "t2_4",
        "type": "mcq",
        "question": "What is Lucas's room number?",
        "options": ["Room 214", "Room 712", "Room 630", "Room 720"],
        "answer": 1,
        "explanation": "Sophie thông báo: 'You are on the 7th floor, room 712.'"
      }
    ]
  },
  {
    "id": 3,
    "key": "job_interview",
    "title": "Phỏng Vấn Xin Việc (Kỹ Sư Phần Mềm)",
    "title_en": "Job Interview for Software Engineer",
    "category": "Sự Nghiệp & Phỏng Vấn",
    "icon": "💼",
    "level": "B1 - B2",
    "speakerA": { "name": "Sarah", "role": "Ứng viên (Candidate)", "avatar": "👩‍💻", "voice": "female" },
    "speakerB": { "name": "Mr. Harrison", "role": "Nhà tuyển dụng (Interviewer)", "avatar": "👨‍💼", "voice": "male" },
    "summary": "Sarah tham gia buổi phỏng vấn vị trí Senior Web Developer, chia sẻ kinh nghiệm dự án và cách giải quyết xung đột trong nhóm.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Mr. Harrison", "text": "Good morning, Sarah. Thanks for joining us today. To start off, could you briefly introduce yourself?", "vi": "Chào buổi sáng, Sarah. Cảm ơn bạn đã tham gia phỏng vấn hôm nay. Để bắt đầu, bạn có thể giới thiệu sơ lược về bản thân không?" },
      { "id": 2, "speaker": "A", "name": "Sarah", "text": "Good morning, Mr. Harrison. I have five years of experience as a full-stack developer, specializing in JavaScript, React, and scalable cloud architectures.", "vi": "Chào ông Harrison. Tôi có 5 năm kinh nghiệm làm lập trình viên full-stack, chuyên về JavaScript, React và các kiến trúc đám mây có khả năng mở rộng cao." },
      { "id": 3, "speaker": "B", "name": "Mr. Harrison", "text": "That's impressive. What was the most technically challenging project you led recently?", "vi": "Rất ấn tượng. Dự án có thách thức kỹ thuật lớn nhất mà bạn từng dẫn dắt gần đây là gì?" },
      { "id": 4, "speaker": "A", "name": "Sarah", "text": "At my previous company, I spearheaded the migration of a legacy monolithic system to microservices, reducing server response times by 45 percent.", "vi": "Tại công ty trước đây, tôi đã đi đầu trong việc di chuyển hệ thống monolithic cũ sang kiến trúc microservices, giúp giảm thời gian phản hồi máy chủ 45%." },
      { "id": 5, "speaker": "B", "name": "Mr. Harrison", "text": "How do you handle disagreements with team members over architectural decisions?", "vi": "Bạn xử lý các bất đồng với đồng đội về quyết định kiến trúc như thế nào?" },
      { "id": 6, "speaker": "A", "name": "Sarah", "text": "I always prioritize objective benchmarks and open dialogue. We build small prototypes to test performance before making final commitments.", "vi": "Tôi luôn ưu tiên các số liệu đo lường khách quan và đối thoại cởi mở. Chúng tôi xây dựng các bản mẫu nhỏ để kiểm tra hiệu năng trước khi đưa ra quyết định cuối cùng." },
      { "id": 7, "speaker": "B", "name": "Mr. Harrison", "text": "Excellent approach. Why are you interested in joining our company specifically?", "vi": "Cách tiếp cận tuyệt vời. Tại sao bạn lại quan tâm đến việc gia nhập công ty chúng tôi?" },
      { "id": 8, "speaker": "A", "name": "Sarah", "text": "Your team's dedication to open-source contributions and cutting-edge AI tools truly aligns with my career ambitions.", "vi": "Sự cống hiến của công ty cho các dự án mã nguồn mở và công cụ AI tiên tiến hoàn toàn phù hợp với định hướng sự nghiệp của tôi." },
      { "id": 9, "speaker": "B", "name": "Mr. Harrison", "text": "Thank you, Sarah. We will notify you about the next interview round within this week.", "vi": "Cảm ơn Sarah. Chúng tôi sẽ thông báo cho bạn về vòng phỏng vấn tiếp theo trong tuần này." }
    ],
    "test": [
      {
        "id": "t3_1",
        "type": "mcq",
        "question": "How many years of professional experience does Sarah have?",
        "options": ["3 years", "4 years", "5 years", "7 years"],
        "answer": 2,
        "explanation": "Sarah giới thiệu ở lượt 2: 'I have five years of experience as a full-stack developer.'"
      },
      {
        "id": "t3_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Sarah helped reduce server response times by [ ______ ] percent.",
        "sentenceWithBlank": "Sarah helped reduce server response times by [ ______ ] percent.",
        "correctAnswer": "45",
        "hint": "Gợi ý: Con số phần trăm (45)",
        "explanation": "Sarah chia sẻ: '...reducing server response times by 45 percent.'"
      },
      {
        "id": "t3_3",
        "type": "tf",
        "question": "Sarah resolves technical disagreements by relying on objective benchmarks and small prototypes.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 0,
        "explanation": "Đúng. Sarah khẳng định cô dùng số liệu đo lường khách quan và thử nghiệm bằng prototype nhỏ."
      }
    ]
  },
  {
    "id": 4,
    "key": "restaurant_ordering",
    "title": "Gọi Món Tại Nhà Hàng Sang Trọng",
    "title_en": "Ordering at a Fine Restaurant",
    "category": "Ẩm Thực & Nhà Hàng",
    "icon": "🍽️",
    "level": "A2 - B1",
    "speakerA": { "name": "David", "role": "Thực khách (Customer)", "avatar": "👨", "voice": "male" },
    "speakerB": { "name": "Claire", "role": "Phục vụ bàn (Server)", "avatar": "👩‍🍳", "voice": "female" },
    "summary": "David gọi món tối tại nhà hàng bít tết Pháp, chọn độ chín của thịt và xin gợi ý loại rượu vang ăn kèm.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Claire", "text": "Good evening, sir. Are you ready to order, or would you like a few more minutes with the menu?", "vi": "Chào buổi tối quý khách. Quý khách đã sẵn sàng gọi món chưa, hay muốn xem thêm thực đơn ít phút nữa ạ?" },
      { "id": 2, "speaker": "A", "name": "David", "text": "Good evening! I'm ready. What is the chef's special tonight?", "vi": "Chào cô! Tôi sẵn sàng rồi. Tối nay món đặc biệt của bếp trưởng là món gì vậy?" },
      { "id": 3, "speaker": "B", "name": "Claire", "text": "Tonight's special is grilled Ribeye steak served with truffle mashed potatoes and roasted asparagus.", "vi": "Món đặc biệt tối nay là Bít tết thăn lưng nướng (Ribeye) ăn kèm khoai tây nghiền nấm truffle và măng tây nướng." },
      { "id": 4, "speaker": "A", "name": "David", "text": "That sounds exquisite! I'll have the Ribeye steak, please.", "vi": "Nghe hấp dẫn quá! Cho tôi một phần bít tết Ribeye nhé." },
      { "id": 5, "speaker": "B", "name": "Claire", "text": "How would you like your steak cooked: rare, medium-rare, or well-done?", "vi": "Quý khách muốn bít tết được làm chín ở mức nào ạ: tái, tái vừa hay chín kỹ?" },
      { "id": 6, "speaker": "A", "name": "David", "text": "Medium-rare, please. Also, does the mushroom soup appetizer contain any dairy products? I'm lactose intolerant.", "vi": "Cho tôi mức tái vừa. Ngoài ra, món súp nấm khai vị có chứa sữa không? Tôi bị dị ứng đường lactose." },
      { "id": 7, "speaker": "B", "name": "Claire", "text": "The mushroom soup has heavy cream, so I recommend our fresh garden salad with balsamic vinaigrette instead.", "vi": "Món súp nấm có dùng kem béo, do đó tôi gợi ý quý khách dùng món salad vườn rau tươi sốt giấm balsamic thay thế ạ." },
      { "id": 8, "speaker": "A", "name": "David", "text": "Perfect suggestion. And could you bring me a glass of red wine?", "vi": "Gợi ý hoàn hảo. Và cô mang cho tôi một ly rượu vang đỏ nhé?" },
      { "id": 9, "speaker": "B", "name": "Claire", "text": "Certainly, sir. Your order will be served shortly!", "vi": "Dạ chắc chắn rồi thưa quý khách. Món ăn của quý khách sẽ được phục vụ ngay sau đây!" }
    ],
    "test": [
      {
        "id": "t4_1",
        "type": "mcq",
        "question": "How does David want his Ribeye steak cooked?",
        "options": ["Rare", "Medium-rare", "Medium", "Well-done"],
        "answer": 1,
        "explanation": "David trả lời ở lượt 6: 'Medium-rare, please.'"
      },
      {
        "id": "t4_2",
        "type": "blank",
        "question": "Nghe & Điền từ: David cannot eat heavy cream because he is lactose [ ______ ].",
        "sentenceWithBlank": "David cannot eat heavy cream because he is lactose [ ______ ].",
        "correctAnswer": "intolerant",
        "hint": "Gợi ý: Không dung nạp sữa (intolerant)",
        "explanation": "David nói rõ: 'I'm lactose intolerant.'"
      },
      {
        "id": "t4_3",
        "type": "tf",
        "question": "The server recommended the mushroom soup for David's appetizer.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Người phục vụ khuyên David không ăn súp nấm vì có kem béo, mà khuyên đổi sang salad tươi."
      }
    ]
  },
  {
    "id": 5,
    "key": "shopping_refund",
    "title": "Mua Sắm & Đổi Trả Sản Phẩm",
    "title_en": "Shopping & Requesting a Refund",
    "category": "Mua Sắm & Dịch Vụ",
    "icon": "🛍️",
    "level": "A2 - B1",
    "speakerA": { "name": "Jessica", "role": "Khách hàng (Shopper)", "avatar": "👩", "voice": "female" },
    "speakerB": { "name": "Kevin", "role": "Nhân viên bán hàng (Assistant)", "avatar": "👨‍💼", "voice": "male" },
    "summary": "Jessica quay lại cửa hàng thời trang để đổi chiếc áo khoác bị chật lấy cỡ lớn hơn hoặc yêu cầu hoàn tiền.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Kevin", "text": "Hello! Welcome to Urban Chic. How can I help you today?", "vi": "Xin chào! Chào mừng quý khách đến với Urban Chic. Tôi có thể giúp gì cho quý khách hôm nay?" },
      { "id": 2, "speaker": "A", "name": "Jessica", "text": "Hi there. I purchased this winter jacket two days ago, but the size medium is a bit too tight around the shoulders.", "vi": "Chào anh. Tôi đã mua chiếc áo khoác mùa đông này hai ngày trước, nhưng cỡ M hơi bị chật ở phần vai." },
      { "id": 3, "speaker": "B", "name": "Kevin", "text": "I see. Do you still have the purchase receipt and original tags attached?", "vi": "Tôi hiểu rồi. Quý khách còn giữ hóa đơn mua hàng và tem mác gốc đính kèm không ạ?" },
      { "id": 4, "speaker": "A", "name": "Jessica", "text": "Yes, the tags are intact, and here is the digital receipt on my phone.", "vi": "Có chứ, tem mác vẫn còn nguyên vẹn, và đây là hóa đơn điện tử trên điện thoại của tôi." },
      { "id": 5, "speaker": "B", "name": "Kevin", "text": "Great! Would you prefer to exchange it for a size large, or would you like a full refund?", "vi": "Tuyệt quá! Quý khách muốn đổi sang cỡ L hay muốn được hoàn tiền toàn bộ ạ?" },
      { "id": 6, "speaker": "A", "name": "Jessica", "text": "I really love the olive green color. If you have size large in stock, I'd love an exchange.", "vi": "Tôi thực sự rất thích màu xanh ô liu này. Nếu cửa hàng còn cỡ L trong kho thì tôi muốn đổi lấy cỡ đó." },
      { "id": 7, "speaker": "B", "name": "Kevin", "text": "Let me check our inventory... Lucky you! We have one last large jacket in the back room.", "vi": "Để tôi kiểm tra kho hàng... Quý khách may mắn lắm! Chúng tôi còn đúng một chiếc cỡ L ở phòng kho." },
      { "id": 8, "speaker": "A", "name": "Jessica", "text": "That's wonderful! Thank you for checking so quickly.", "vi": "Tuyệt vời quá! Cảm ơn anh đã kiểm tra nhanh như vậy." },
      { "id": 9, "speaker": "B", "name": "Kevin", "text": "Here is your new jacket and the updated receipt. Have a great day!", "vi": "Đây là chiếc áo khoác mới và biên lai đã cập nhật của quý khách. Chúc quý khách một ngày tuyệt vời!" }
    ],
    "test": [
      {
        "id": "t5_1",
        "type": "mcq",
        "question": "Why did Jessica want to return the jacket?",
        "options": ["It was damaged", "The color was wrong", "The size medium was too tight", "It was too expensive"],
        "answer": 2,
        "explanation": "Jessica nói: 'the size medium is a bit too tight around the shoulders.'"
      },
      {
        "id": "t5_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Jessica really loves the olive [ ______ ] color of the jacket.",
        "sentenceWithBlank": "Jessica really loves the olive [ ______ ] color of the jacket.",
        "correctAnswer": "green",
        "hint": "Gợi ý: Màu xanh lá cây (green)",
        "explanation": "Jessica nói ở lượt 6: 'I really love the olive green color.'"
      },
      {
        "id": "t5_3",
        "type": "tf",
        "question": "The store was completely out of stock for size large.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Nhân viên tìm thấy đúng một chiếc cuối cùng trong phòng kho ('We have one last large jacket in the back room')."
      }
    ]
  },
  {
    "id": 6,
    "key": "doctor_consultation",
    "title": "Khám Bệnh & Mô Tả Triệu Chứng",
    "title_en": "Doctor Consultation & Symptoms",
    "category": "Sức Khỏe & Y Tế",
    "icon": "🩺",
    "level": "B1",
    "speakerA": { "name": "Thomas", "role": "Bệnh nhân (Patient)", "avatar": "🤒", "voice": "male" },
    "speakerB": { "name": "Dr. Bennett", "role": "Bác sĩ (Physician)", "avatar": "👩‍⚕️", "voice": "female" },
    "summary": "Thomas đến phòng khám gặp bác sĩ Bennett để kiểm tra các triệu chứng sốt cao, đau đầu và ho khan kéo dài 3 ngày.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Dr. Bennett", "text": "Good morning, Thomas. Come in and take a seat. What seems to be the trouble today?", "vi": "Chào buổi sáng, Thomas. Mời bạn vào và ngồi xuống. Hôm nay bạn thấy trong người khó chịu thế nào?" },
      { "id": 2, "speaker": "A", "name": "Thomas", "text": "Good morning, Doctor. I've had a severe headache and a high fever since Tuesday, along with a persistent dry cough.", "vi": "Chào bác sĩ. Tôi bị đau đầu dữ dội và sốt cao từ hôm thứ Ba, kèm theo những cơn ho khan dai dẳng." },
      { "id": 3, "speaker": "B", "name": "Dr. Bennett", "text": "Let me check your temperature and listen to your chest. Breathe in deeply, please... and exhale.", "vi": "Để tôi đo nhiệt độ và nghe phổi của bạn nhé. Hít vào thật sâu nào... và thở ra." },
      { "id": 4, "speaker": "A", "name": "Thomas", "text": "Is there anything concerning with my lungs?", "vi": "Phổi của tôi có vấn đề gì đáng lo ngại không bác sĩ?" },
      { "id": 5, "speaker": "B", "name": "Dr. Bennett", "text": "Your lungs sound clear, but your temperature is 38.8 degrees Celsius, which indicates a viral infection.", "vi": "Phổi của bạn nghe trong, nhưng nhiệt độ cơ thể là 38,8 độ C, cho thấy bạn đang bị nhiễm virus." },
      { "id": 6, "speaker": "A", "name": "Thomas", "text": "Do I need to take antibiotics for this?", "vi": "Tôi có cần uống kháng sinh không bác sĩ?" },
      { "id": 7, "speaker": "B", "name": "Dr. Bennett", "text": "No, antibiotics do not kill viruses. I will prescribe paracetamol to reduce fever, and cough syrup.", "vi": "Không, kháng sinh không tiêu diệt được virus. Tôi sẽ kê đơn thuốc hạ sốt paracetamol và siro ho." },
      { "id": 8, "speaker": "A", "name": "Thomas", "text": "How long should I stay home to rest?", "vi": "Tôi nên ở nhà nghỉ ngơi trong bao lâu ạ?" },
      { "id": 9, "speaker": "B", "name": "Dr. Bennett", "text": "Take at least three full days off work, drink plenty of warm fluids, and get ample rest. If symptoms worsen, return immediately.", "vi": "Nghỉ làm ít nhất 3 ngày trọn vẹn, uống nhiều nước ấm và ngủ đủ giấc. Nếu triệu chứng trở nặng hãy quay lại khám ngay nhé." }
    ],
    "test": [
      {
        "id": "t6_1",
        "type": "mcq",
        "question": "What is Thomas's body temperature?",
        "options": ["37.5 °C", "38.2 °C", "38.8 °C", "39.5 °C"],
        "answer": 2,
        "explanation": "Bác sĩ Bennett đọc kết quả: 'your temperature is 38.8 degrees Celsius.'"
      },
      {
        "id": "t6_2",
        "type": "tf",
        "question": "Dr. Bennett prescribed antibiotics for Thomas.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Bác sĩ giải thích kháng sinh không diệt được virus và kê paracetamol cùng siro ho."
      },
      {
        "id": "t6_3",
        "type": "blank",
        "question": "Nghe & Điền từ: Thomas needs to take at least [ ______ ] days off work.",
        "sentenceWithBlank": "Thomas needs to take at least [ ______ ] days off work.",
        "correctAnswer": "three",
        "hint": "Gợi ý: Số 3 (viết dạng chữ: three)",
        "explanation": "Bác sĩ khuyên: 'Take at least three full days off work.'"
      }
    ]
  },
  {
    "id": 7,
    "key": "asking_directions",
    "title": "Hỏi Đường & Phương Tiện Giao Thông",
    "title_en": "Asking for Directions in the City",
    "category": "Giao Tiếp Xã Hội",
    "icon": "🗺️",
    "level": "A2",
    "speakerA": { "name": "Rachel", "role": "Khách du lịch (Tourist)", "avatar": "👩", "voice": "female" },
    "speakerB": { "name": "Oliver", "role": "Người địa phương (Resident)", "avatar": "👨", "voice": "male" },
    "summary": "Rachel hỏi đường đến Ga tàu điện ngầm trung tâm và Thư viện công cộng thành phố.",
    "turns": [
      { "id": 1, "speaker": "A", "name": "Rachel", "text": "Excuse me, sir! Could you help me? I think I'm lost. How do I get to Central Subway Station?", "vi": "Xin lỗi anh! Anh có thể giúp tôi được không? Hình như tôi bị lạc đường rồi. Làm thế nào để đến Ga tàu điện ngầm trung tâm ạ?" },
      { "id": 2, "speaker": "B", "name": "Oliver", "text": "Don't worry, you are not far at all. Go straight ahead along this avenue for two blocks.", "vi": "Đừng lo, cô không ở xa đâu. Hãy đi thẳng dọc theo đại lộ này qua hai dãy nhà nữa." },
      { "id": 3, "speaker": "A", "name": "Rachel", "text": "Two blocks straight ahead, got it. What do I do after that?", "vi": "Đi thẳng qua hai dãy nhà, tôi nhớ rồi. Sau đó thì rẽ thế nào ạ?" },
      { "id": 4, "speaker": "B", "name": "Oliver", "text": "When you see the big clock tower at the intersection, turn left onto Maple Street.", "vi": "Khi cô nhìn thấy tháp đồng hồ lớn ở ngã tư, hãy rẽ trái vào đường Maple." },
      { "id": 5, "speaker": "A", "name": "Rachel", "text": "Turn left at the clock tower onto Maple Street. Is the station on Maple Street?", "vi": "Rẽ trái tại tháp đồng hồ vào đường Maple. Ga tàu nằm trên đường Maple phải không anh?" },
      { "id": 6, "speaker": "B", "name": "Oliver", "text": "Yes, walk about 100 meters, and the station entrance will be directly on your right, opposite the public library.", "vi": "Đúng rồi, đi bộ khoảng 100 mét nữa thì lối vào nhà ga sẽ nằm ngay bên tay phải, đối diện với thư viện công cộng." },
      { "id": 7, "speaker": "A", "name": "Rachel", "text": "Is it within walking distance, or should I take a taxi?", "vi": "Đoạn đường đó đi bộ được không, hay tôi nên bắt taxi ạ?" },
      { "id": 8, "speaker": "B", "name": "Oliver", "text": "It's barely a five-minute walk. Enjoy the scenic stroll!", "vi": "Chỉ mất tầm 5 phút đi bộ thôi. Chúc cô có chuyến dạo bộ ngắm cảnh vui vẻ!" },
      { "id": 9, "speaker": "A", "name": "Rachel", "text": "Thank you so much for your kind directions!", "vi": "Cảm ơn anh rất nhiều vì sự chỉ đường tận tình!" }
    ],
    "test": [
      {
        "id": "t7_1",
        "type": "mcq",
        "question": "What landmark should Rachel look for before turning left?",
        "options": ["A red bridge", "The big clock tower", "A shopping mall", "A coffee shop"],
        "answer": 1,
        "explanation": "Oliver dặn: 'When you see the big clock tower at the intersection, turn left onto Maple Street.'"
      },
      {
        "id": "t7_2",
        "type": "blank",
        "question": "Nghe & Điền từ: The station entrance is opposite the public [ ______ ].",
        "sentenceWithBlank": "The station entrance is opposite the public [ ______ ].",
        "correctAnswer": "library",
        "hint": "Gợi ý: Thư viện (library)",
        "explanation": "Oliver nói: '...directly on your right, opposite the public library.'"
      },
      {
        "id": "t7_3",
        "type": "tf",
        "question": "It takes about thirty minutes to walk to the station.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Oliver khẳng định: 'It's barely a five-minute walk' (chỉ tầm 5 phút đi bộ)."
      }
    ]
  },
  {
    "id": 8,
    "key": "renting_apartment",
    "title": "Thuê Căn Hộ & Thỏa Thuận Hợp Đồng",
    "title_en": "Renting an Apartment",
    "category": "Nhà Cửa & Đời Sống",
    "icon": "🏢",
    "level": "B1 - B2",
    "speakerA": { "name": "Alex", "role": "Người thuê nhà (Tenant)", "avatar": "👨", "voice": "male" },
    "speakerB": { "name": "Victoria", "role": "Môi giới nhà đất (Realtor)", "avatar": "👩‍💼", "voice": "female" },
    "summary": "Alex thảo luận với nhà môi giới Victoria về chi phí thuê, tiền đặt cọc, các tiện ích bao gồm và chính sách nuôi thú cưng.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Victoria", "text": "Welcome to the Parkview Residences, Alex! As you can see, this two-bedroom unit has plenty of natural sunlight.", "vi": "Chào mừng bạn đến với khu căn hộ Parkview, Alex! Như bạn thấy, căn hộ 2 phòng ngủ này đón rất nhiều ánh sáng tự nhiên." },
      { "id": 2, "speaker": "A", "name": "Alex", "text": "The layout is fantastic, Victoria. What is the monthly rent, and what utilities are included?", "vi": "Bố cục căn phòng tuyệt vời quá, Victoria. Tiền thuê hàng tháng là bao nhiêu, và đã bao gồm những tiện ích gì?" },
      { "id": 3, "speaker": "B", "name": "Victoria", "text": "The rent is 1400 dollars per month. Water and high-speed fiber internet are included, but electricity is billed separately.", "vi": "Tiền thuê là 1.400 đô la mỗi tháng. Đã bao gồm nước sinh hoạt và internet cáp quang tốc độ cao, nhưng tiền điện sẽ tính riêng." },
      { "id": 4, "speaker": "A", "name": "Alex", "text": "That sounds reasonable. How much is the security deposit required upfront?", "vi": "Nghe rất hợp lý. Khoản tiền đặt cọc ban đầu yêu cầu là bao nhiêu?" },
      { "id": 5, "speaker": "B", "name": "Victoria", "text": "We require one month's rent as a security deposit, fully refundable upon move-out subject to inspection.", "vi": "Chúng tôi yêu cầu đặt cọc bằng 1 tháng tiền thuê, sẽ hoàn trả 100% khi chuyển đi sau khi kiểm tra hiện trạng nhà." },
      { "id": 6, "speaker": "A", "name": "Alex", "text": "One critical question: are pets permitted in this building? I have a small cat.", "vi": "Một câu hỏi then chốt: tòa nhà này có cho phép nuôi thú cưng không? Tôi có nuôi một chú mèo nhỏ." },
      { "id": 7, "speaker": "B", "name": "Victoria", "text": "Yes, cats and small dogs under 10 kilograms are welcome with a one-time 100 dollar pet registration fee.", "vi": "Có chứ, mèo và chó nhỏ dưới 10 kg đều được chào đón với khoản phí đăng ký thú cưng một lần là 100 đô la." },
      { "id": 8, "speaker": "A", "name": "Alex", "text": "That's wonderful news. When could I officially move in if we sign the contract today?", "vi": "Tin tuyệt vời quá. Nếu chúng ta ký hợp đồng hôm nay thì khi nào tôi có thể chính thức chuyển đến?" },
      { "id": 9, "speaker": "B", "name": "Victoria", "text": "The apartment is completely cleaned and ready. You could move in as early as this upcoming Saturday!", "vi": "Căn hộ đã được dọn dẹp sạch sẽ và sẵn sàng. Bạn có thể chuyển đến sớm nhất vào thứ Bảy tuần này!" }
    ],
    "test": [
      {
        "id": "t8_1",
        "type": "mcq",
        "question": "Which utility is NOT included in the monthly rent?",
        "options": ["Water", "High-speed internet", "Electricity", "Trash disposal"],
        "answer": 2,
        "explanation": "Victoria nói: 'Water and high-speed fiber internet are included, but electricity is billed separately.'"
      },
      {
        "id": "t8_2",
        "type": "blank",
        "question": "Nghe & Điền từ: The monthly rent for this two-bedroom apartment is [ ______ ] dollars.",
        "sentenceWithBlank": "The monthly rent for this two-bedroom apartment is [ ______ ] dollars.",
        "correctAnswer": "1400",
        "hint": "Gợi ý: Con số tiền thuê (1400)",
        "explanation": "Victoria báo giá: 'The rent is 1400 dollars per month.'"
      },
      {
        "id": "t8_3",
        "type": "tf",
        "question": "Pets are strictly forbidden in this building.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Tòa nhà cho phép nuôi mèo và chó nhỏ dưới 10kg."
      }
    ]
  },
  {
    "id": 9,
    "key": "project_meeting",
    "title": "Họp Nhóm & Thảo Luận Tiến Độ Dự Án",
    "title_en": "Project Team Meeting & Brainstorming",
    "category": "Công Việc & Doanh Nghiệp",
    "icon": "📊",
    "level": "B1 - B2",
    "speakerA": { "name": "Daniel", "role": "Quản lý dự án (Manager)", "avatar": "👨‍💼", "voice": "male" },
    "speakerB": { "name": "Lisa", "role": "Trưởng nhóm thiết kế (Designer)", "avatar": "👩‍🎨", "voice": "female" },
    "summary": "Daniel và Lisa trao đổi về bản thiết kế giao diện mới, tối ưu hóa trải nghiệm người dùng và thời hạn bàn giao sản phẩm.",
    "turns": [
      { "id": 1, "speaker": "A", "name": "Daniel", "text": "Good morning everyone. Let's review the progress on our mobile app redesign. Lisa, how are the UI prototypes coming along?", "vi": "Chào buổi sáng cả nhóm. Hãy cùng điểm lại tiến độ thiết kế lại ứng dụng di động. Lisa, các bản mẫu giao diện người dùng tiến triển đến đâu rồi?" },
      { "id": 2, "speaker": "B", "name": "Lisa", "text": "Morning Daniel. We completed the interactive wireframes for the user onboarding flow and checkout system yesterday.", "vi": "Chào Daniel. Hôm qua nhóm thiết kế đã hoàn thành wireframe tương tác cho quy trình giới thiệu người dùng và hệ thống thanh toán." },
      { "id": 3, "speaker": "A", "name": "Daniel", "text": "Awesome. Did user testing reveal any friction points during checkout?", "vi": "Tuyệt vời. Các đợt kiểm thử người dùng có chỉ ra điểm nghẽn hay rào cản nào khi thanh toán không?" },
      { "id": 4, "speaker": "B", "name": "Lisa", "text": "Yes, users felt the payment confirmation required too many taps. We simplified it down to a single-click checkout option.", "vi": "Có, người dùng cảm thấy bước xác nhận thanh toán đòi hỏi quá nhiều thao tác bấm. Chúng tôi đã tinh gọn nó xuống chỉ còn 1 nút bấm thanh toán duy nhất." },
      { "id": 5, "speaker": "A", "name": "Daniel", "text": "That will definitely boost our conversion rates. What about our launch deadline?", "vi": "Điều đó chắc chắn sẽ tăng tỷ lệ chuyển đổi. Còn thời hạn ra mắt thì sao?" },
      { "id": 6, "speaker": "B", "name": "Lisa", "text": "We need three more days to finalize design assets for dark mode before handing over to the engineering team.", "vi": "Chúng tôi cần thêm 3 ngày nữa để hoàn thiện các tài nguyên đồ họa cho chế độ ban đêm trước khi bàn giao cho đội kỹ thuật." },
      { "id": 7, "speaker": "A", "name": "Daniel", "text": "Sounds like a solid plan. Let's schedule our engineering handoff meeting for this Thursday afternoon.", "vi": "Kế hoạch rất chắc chắn. Hãy lên lịch cuộc họp bàn giao kỹ thuật vào chiều thứ Năm tuần này nhé." }
    ],
    "test": [
      {
        "id": "t9_1",
        "type": "mcq",
        "question": "How did the design team improve the checkout flow?",
        "options": ["Added more discount banners", "Simplified it to a single-click option", "Removed credit card payments", "Required email confirmation"],
        "answer": 1,
        "explanation": "Lisa giải thích: 'We simplified it down to a single-click checkout option.'"
      },
      {
        "id": "t9_2",
        "type": "blank",
        "question": "Nghe & Điền từ: The design team needs three more days to finalize assets for [ ______ ] mode.",
        "sentenceWithBlank": "The design team needs three more days to finalize assets for [ ______ ] mode.",
        "correctAnswer": "dark",
        "hint": "Gợi ý: Chế độ giao diện tối (dark)",
        "explanation": "Lisa nói: '...finalize design assets for dark mode...'"
      },
      {
        "id": "t9_3",
        "type": "tf",
        "question": "The engineering handoff meeting is scheduled for Friday morning.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Daniel lên lịch họp vào chiều thứ Năm ('this Thursday afternoon')."
      }
    ]
  },
  {
    "id": 10,
    "key": "booking_flight",
    "title": "Đặt Vé Máy Bay & Lịch Trình Du Lịch",
    "title_en": "Booking Flight Tickets",
    "category": "Du Lịch & Nghỉ Dưỡng",
    "icon": "🎫",
    "level": "B1",
    "speakerA": { "name": "Chloe", "role": "Khách du lịch (Traveler)", "avatar": "👩", "voice": "female" },
    "speakerB": { "name": "Ethan", "role": "Đại lý bán vé (Travel Agent)", "avatar": "👨‍💼", "voice": "male" },
    "summary": "Chloe liên hệ đại lý du lịch để đặt chuyến bay khứ hồi đi Tokyo, tìm hiểu thời gian quá cảnh và mua bảo hiểm du lịch.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Ethan", "text": "Global Travels, Ethan speaking. How can I assist with your holiday plans today?", "vi": "Đại lý du lịch Global Travels, tôi là Ethan. Tôi có thể giúp gì cho kế hoạch kỳ nghỉ của bạn hôm nay?" },
      { "id": 2, "speaker": "A", "name": "Chloe", "text": "Hi Ethan. I'd like to book a round-trip ticket from Los Angeles to Tokyo departing on November 10th.", "vi": "Chào Ethan. Tôi muốn đặt vé khứ hồi từ Los Angeles đi Tokyo, khởi hành vào ngày 10 tháng 11." },
      { "id": 3, "speaker": "B", "name": "Ethan", "text": "Understood. When are you planning your return flight?", "vi": "Tôi hiểu rồi. Bạn dự định bay về vào ngày nào?" },
      { "id": 4, "speaker": "A", "name": "Chloe", "text": "On November 24th. Are there direct flights available, or will there be layovers?", "vi": "Vào ngày 24 tháng 11. Có chuyến bay thẳng không, hay phải quá cảnh?" },
      { "id": 5, "speaker": "B", "name": "Ethan", "text": "We have a direct eleven-hour flight with Japan Airlines, or a slightly cheaper option with a two-hour layover in Taipei.", "vi": "Chúng tôi có chuyến bay thẳng kéo dài 11 tiếng của hãng Japan Airlines, hoặc lựa chọn rẻ hơn một chút với 2 tiếng quá cảnh tại Đài Bắc." },
      { "id": 6, "speaker": "A", "name": "Chloe", "text": "I prefer the direct flight to save energy. Does the ticket include checked baggage?", "vi": "Tôi thích bay thẳng hơn để tiết kiệm sức khỏe. Vé có bao gồm hành lý ký gửi không?" },
      { "id": 7, "speaker": "B", "name": "Ethan", "text": "Yes, two pieces of checked luggage up to 23 kilograms each are included free of charge.", "vi": "Có chứ, hai kiện hành lý ký gửi tối đa 23 kg mỗi kiện được bao gồm miễn phí." },
      { "id": 8, "speaker": "A", "name": "Chloe", "text": "That's generous. Please also add comprehensive travel insurance to my reservation.", "vi": "Rất hào phóng. Vui lòng thêm gói bảo hiểm du lịch toàn diện vào đặt chỗ của tôi nhé." },
      { "id": 9, "speaker": "B", "name": "Ethan", "text": "Done! I have sent the provisional booking invoice and flight schedule to your email.", "vi": "Đã xong! Tôi đã gửi hóa đơn đặt chỗ tạm thời và lịch bay chi tiết vào email của bạn rồi nhé." }
    ],
    "test": [
      {
        "id": "t10_1",
        "type": "mcq",
        "question": "Which flight option did Chloe choose?",
        "options": ["Direct flight with Japan Airlines", "Layover in Taipei", "Flight with Korean Air", "Layover in Seoul"],
        "answer": 0,
        "explanation": "Chloe quyết định: 'I prefer the direct flight to save energy.'"
      },
      {
        "id": "t10_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Chloe's ticket allows two pieces of checked baggage up to [ ______ ] kg each.",
        "sentenceWithBlank": "Chloe's ticket allows two pieces of checked baggage up to [ ______ ] kg each.",
        "correctAnswer": "23",
        "hint": "Gợi ý: Cân nặng hành lý (23)",
        "explanation": "Ethan nêu rõ: 'two pieces of checked luggage up to 23 kilograms each...'"
      },
      {
        "id": "t10_3",
        "type": "tf",
        "question": "Chloe declined to purchase travel insurance.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Chloe yêu cầu: 'Please also add comprehensive travel insurance to my reservation.'"
      }
    ]
  },
  {
    "id": 11,
    "key": "bank_account",
    "title": "Mở Tài Khoản Ngân Hàng & Ứng Dụng Số",
    "title_en": "Opening a Bank Account",
    "category": "Tài Chính & Ngân Hàng",
    "icon": "💳",
    "level": "B1 - B2",
    "speakerA": { "name": "Liam", "role": "Khách hàng (Customer)", "avatar": "👨", "voice": "male" },
    "speakerB": { "name": "Grace", "role": "Giao dịch viên (Banker)", "avatar": "👩‍💼", "voice": "female" },
    "summary": "Liam đến ngân hàng mở tài khoản thanh toán quốc tế và kích hoạt ứng dụng ngân hàng số trên điện thoại.",
    "turns": [
      { "id": 1, "speaker": "B", "name": "Grace", "text": "Good afternoon! Welcome to Apex National Bank. How may I be of service today?", "vi": "Chào buổi chiều quý khách! Chào mừng quý khách đến với ngân hàng Apex National. Tôi có thể hỗ trợ gì cho quý khách ạ?" },
      { "id": 2, "speaker": "A", "name": "Liam", "text": "Good afternoon. I recently moved here and would like to open a checking and savings account.", "vi": "Chào cô. Tôi mới chuyển đến đây và muốn mở một tài khoản thanh toán và một tài khoản tiết kiệm." },
      { "id": 3, "speaker": "B", "name": "Grace", "text": "We'd be happy to set that up. To begin, do you have two forms of government identification and proof of address?", "vi": "Chúng tôi rất sẵn lòng hỗ trợ. Để bắt đầu, quý khách có mang theo 2 loại giấy tờ tùy thân và giấy xác nhận nơi cư trú không?" },
      { "id": 4, "speaker": "A", "name": "Liam", "text": "Yes, I brought my passport, driver's license, and my latest electricity utility bill.", "vi": "Có, tôi mang theo hộ chiếu, bằng lái xe và hóa đơn tiền điện mới nhất đây." },
      { "id": 5, "speaker": "B", "name": "Grace", "text": "Perfect documentation. Is there a minimum balance requirement you prefer?", "vi": "Giấy tờ đầy đủ hoàn hảo. Quý khách có quan tâm đến yêu cầu số dư tối thiểu không?" },
      { "id": 6, "speaker": "A", "name": "Liam", "text": "I prefer an account with zero maintenance fees and free international online transfers.", "vi": "Tôi thích loại tài khoản không mất phí duy trì và được miễn phí chuyển tiền trực tuyến quốc tế." },
      { "id": 7, "speaker": "B", "name": "Grace", "text": "Our Apex Premium Checking qualifies for no monthly fee as long as you set up monthly direct deposit.", "vi": "Tài khoản Apex Premium Checking của chúng tôi đáp ứng không tính phí hàng tháng miễn là bạn thiết lập nhận lương tự động qua tài khoản." },
      { "id": 8, "speaker": "A", "name": "Liam", "text": "That works seamlessly for my company payroll. How do I access mobile banking?", "vi": "Rất thuận tiện với bảng lương công ty tôi. Làm thế nào để tôi dùng ứng dụng ngân hàng trên điện thoại?" },
      { "id": 9, "speaker": "B", "name": "Grace", "text": "Download the Apex Mobile App, scan this QR code, and your temporary login pin will be sent via SMS.", "vi": "Quý khách tải ứng dụng Apex Mobile, quét mã QR này và mã pin tạm thời sẽ được gửi qua tin nhắn SMS." }
    ],
    "test": [
      {
        "id": "t11_1",
        "type": "mcq",
        "question": "What documents did Liam provide for identification and address proof?",
        "options": ["Student card and gym pass", "Passport, driver's license, and utility bill", "Only birth certificate", "Work contract and credit card"],
        "answer": 1,
        "explanation": "Liam nói ở lượt 4: 'I brought my passport, driver's license, and my latest electricity utility bill.'"
      },
      {
        "id": "t11_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Liam's temporary login pin will be delivered via [ ______ ].",
        "sentenceWithBlank": "Liam's temporary login pin will be delivered via [ ______ ].",
        "correctAnswer": "SMS",
        "hint": "Gợi ý: Tin nhắn điện thoại (SMS)",
        "explanation": "Grace thông báo: '...your temporary login pin will be sent via SMS.'"
      },
      {
        "id": "t11_3",
        "type": "tf",
        "question": "The checking account requires a mandatory $50 monthly maintenance fee.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Tài khoản miễn phí duy trì nếu thiết lập nhận lương tự động (monthly direct deposit)."
      }
    ]
  },
  {
    "id": 12,
    "key": "friends_catchup",
    "title": "Gặp Lại Bạn Cũ & Cuộc Sống Thường Nhật",
    "title_en": "Daily Catch-up with an Old Friend",
    "category": "Đời Sống & Tình Bạn",
    "icon": "☕",
    "level": "A2 - B1",
    "speakerA": { "name": "Nick", "role": "Bạn thân (Friend A)", "avatar": "🙋‍♂️", "voice": "male" },
    "speakerB": { "name": "Hannah", "role": "Bạn thân (Friend B)", "avatar": "🙋‍♀️", "voice": "female" },
    "summary": "Nick và Hannah tình cờ gặp lại nhau ở quán cà phê sau hai năm, hàn huyên về công việc mới và dự định tương lai.",
    "turns": [
      { "id": 1, "speaker": "A", "name": "Nick", "text": "Hannah! Is that really you? I can't believe my eyes!", "vi": "Hannah! Có phải cậu đấy không? Tớ không thể tin vào mắt mình được nữa!" },
      { "id": 2, "speaker": "B", "name": "Hannah", "text": "Nick! Oh my goodness, what a delightful surprise! It has been at least two years since college graduation!", "vi": "Nick! Trời ơi, thật là một bất ngờ thú vị! Phải ít nhất 2 năm rồi từ ngày tốt nghiệp đại học!" },
      { "id": 3, "speaker": "A", "name": "Nick", "text": "Time flies so fast! How have you been? Are you still working in graphic design?", "vi": "Thời gian trôi nhanh quá! Cậu dạo này thế nào rồi? Vẫn làm trong ngành thiết kế đồ họa chứ?" },
      { "id": 4, "speaker": "B", "name": "Hannah", "text": "Actually, I transitioned into product marketing six months ago, and I absolutely love the dynamic work pace.", "vi": "Thực ra tớ đã chuyển sang làm tiếp thị sản phẩm được 6 tháng rồi, và tớ cực kỳ thích nhịp độ làm việc năng động ở đây." },
      { "id": 5, "speaker": "A", "name": "Nick", "text": "Congratulations on the career shift! And are you still living downtown?", "vi": "Chúc mừng cậu vì bước chuyển đổi sự nghiệp nhé! Cậu vẫn sống ở trung tâm thành phố à?" },
      { "id": 6, "speaker": "B", "name": "Hannah", "text": "No, I recently relocated to a peaceful suburb near the mountains. What about you, Nick?", "vi": "Không, gần đây tớ vừa chuyển về một vùng ngoại ô yên bình gần núi. Còn cậu thì sao, Nick?" },
      { "id": 7, "speaker": "A", "name": "Nick", "text": "I just got promoted to senior business analyst last month, and I'm planning to travel to Europe this autumn.", "vi": "Tớ vừa được thăng chức lên chuyên viên phân tích kinh doanh cao cấp tháng trước, và đang tính đi du lịch châu Âu mùa thu này." },
      { "id": 8, "speaker": "B", "name": "Hannah", "text": "That sounds marvelous! We definitely must grab dinner this weekend and catch up properly.", "vi": "Nghe tuyệt vời quá! Cuối tuần này chúng mình nhất định phải cùng nhau đi ăn tối để hàn huyên nhiều hơn nhé." },
      { "id": 9, "speaker": "A", "name": "Nick", "text": "Count me in! Let me take down your new phone number.", "vi": "Nhất trí luôn! Để tớ lưu lại số điện thoại mới của cậu nào." }
    ],
    "test": [
      {
        "id": "t12_1",
        "type": "mcq",
        "question": "What new role did Hannah transition into six months ago?",
        "options": ["Software tester", "Product marketing", "Human resources", "Chef"],
        "answer": 1,
        "explanation": "Hannah chia sẻ: 'I transitioned into product marketing six months ago.'"
      },
      {
        "id": "t12_2",
        "type": "blank",
        "question": "Nghe & Điền từ: Nick was promoted to senior business [ ______ ] last month.",
        "sentenceWithBlank": "Nick was promoted to senior business [ ______ ] last month.",
        "correctAnswer": "analyst",
        "hint": "Gợi ý: Chuyên viên phân tích (analyst)",
        "explanation": "Nick chia sẻ: 'I just got promoted to senior business analyst last month.'"
      },
      {
        "id": "t12_3",
        "type": "tf",
        "question": "Hannah currently lives in the crowded downtown center.",
        "options": ["True (Đúng)", "False (Sai)"],
        "answer": 1,
        "explanation": "Sai. Hannah đã chuyển về vùng ngoại ô yên bình ('relocated to a peaceful suburb near the mountains')."
      }
    ]
  }
];
