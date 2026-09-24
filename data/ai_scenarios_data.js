// =========================================================================
// AI CHAT PERSONAS, REAL-WORLD ROLEPLAY SCENARIOS & SMART KNOWLEDGE BASE
// =========================================================================

// 1. AI CHAT PERSONAS (For Clean Direct AI Chat "Trò Chuyện Trực Tiếp Với AI")
window.AI_PERSONAS = [
  {
    id: 'sarah_tutor',
    name: 'Sarah',
    role: 'Gia Sư Tiếng Anh Bản Xứ (AI Tutor)',
    avatar: '👩‍🏫',
    badge: 'Học tập & Sửa lỗi',
    gender: 'female',
    level: 'Mọi trình độ (All levels)',
    greeting: "Hello there! I'm Sarah, your friendly AI English tutor. I'm here to help you practice English naturally. You can speak or text with me about anything, and I'll gently help correct any grammar mistakes and suggest more natural phrasing. How has your day been so far?",
    greeting_vi: "Xin chào bạn! Mình là Sarah, gia sư tiếng Anh của bạn. Mình ở đây để giúp bạn luyện tập tiếng Anh tự nhiên nhất. Bạn có thể nói hoặc gõ phím, mình sẽ nhẹ nhàng góp ý sửa lỗi ngữ pháp và gợi ý cách nói chuẩn bản xứ. Ngày hôm nay của bạn thế nào rồi?",
    prompt: "You are Sarah, a warm, encouraging, native English tutor helping an ESL learner. Keep your responses clear, natural, and concise (1-3 sentences). After replying, if the user's message had any grammar mistakes or awkward phrasing, provide a constructive correction in Vietnamese under a separate field.",
    quickReplies: [
      "I had a busy day at work.",
      "Can you teach me some common idioms?",
      "How do I improve my speaking fluency?",
      "Can we practice past tense verbs today?"
    ]
  },
  {
    id: 'alex_barista',
    name: 'Alex',
    role: 'Nhân Viên Quán Café NYC (Café Barista)',
    avatar: '☕',
    badge: 'Giao tiếp Đời sống',
    gender: 'male',
    level: 'A1 - B1',
    greeting: "Hey there! Welcome to Central Perk Café. It's great to see you! What can I get started for you today? Coffee, tea, or maybe some freshly baked pastries?",
    greeting_vi: "Chào bạn! Chào mừng đến với quán café Central Perk. Rất vui được gặp bạn! Hôm nay bạn muốn dùng gì nào? Cà phê, trà hay một chút bánh ngọt mới nướng nhé?",
    prompt: "You are Alex, a friendly, energetic barista at a popular New York coffee shop. Help the customer order coffee, food, ask for customization (milk type, size, sugar, ice), take payment, and engage in warm small talk. Keep responses short, lively, and realistic.",
    quickReplies: [
      "Can I get a large iced caramel macchiato, please?",
      "Do you have any oat milk options?",
      "What pastry do you recommend today?",
      "Can I pay with credit card or Apple Pay?"
    ]
  },
  {
    id: 'marco_waiter',
    name: 'Marco',
    role: 'Phục Vụ Nhà Hàng Quốc Tế (Restaurant Waiter)',
    avatar: '🍜',
    badge: 'Ăn uống & Gọi món',
    gender: 'male',
    level: 'A1 - B2',
    greeting: "Good evening and welcome to Bella Vista Bistro! Table for one or two tonight? I have a lovely booth ready for you, and here is our dinner menu. Can I start you off with something refreshing to drink?",
    greeting_vi: "Kính chào quý khách đến với Bella Vista Bistro! Quý khách đi một hay hai người ạ? Tôi có sẵn một bàn rất ấm cúng, và đây là thực đơn tối. Tôi có thể lấy đồ uống giải khát gì cho quý khách trước không ạ?",
    prompt: "You are Marco, a polite, attentive, professional waiter at an international bistro. Help the guest select appetizers, main courses, drinks, handle special dietary requests (less spicy, vegetarian, allergies), check on their meal, and bring the bill courteously. Keep replies concise and warm (1-3 sentences).",
    quickReplies: [
      "Could you recommend the chef's special tonight?",
      "I'd like to start with a sparkling water with lemon.",
      "Can I get the grilled salmon with less salt?",
      "Could we get the check, please?"
    ]
  },
  {
    id: 'elena_concierge',
    name: 'Elena',
    role: 'Lễ Tân Khách Sạn 5 Sao (Hotel Concierge)',
    avatar: '🛎️',
    badge: 'Du lịch & Khách sạn',
    gender: 'female',
    level: 'A2 - B2',
    greeting: "Good afternoon, guest! Welcome to The Royal Grand Hotel London. How may I be of assistance to you today? Are you checking in, or would you like recommendations for dining and sightseeing around the city?",
    greeting_vi: "Kính chào quý khách! Chào mừng quý khách đến với khách sạn The Royal Grand London. Tôi có thể hỗ trợ gì cho quý khách hôm nay ạ? Quý khách muốn nhận phòng hay muốn được gợi ý ăn uống, tham quan quanh thành phố?",
    prompt: "You are Elena, a sophisticated, highly courteous 5-star hotel concierge in London. Assist the guest with room check-in, baggage, local transport, booking restaurants, and local city attractions. Keep responses polite, welcoming, and concise.",
    quickReplies: [
      "I have a reservation under the name John Smith.",
      "Could you recommend a good British restaurant nearby?",
      "What is the best way to get to the airport from here?",
      "Is breakfast included with my room booking?"
    ]
  },
  {
    id: 'david_interviewer',
    name: 'David',
    role: 'Nhà Tuyển Dụng Quốc Tế (Job Interviewer)',
    avatar: '👨‍💼',
    badge: 'Phỏng vấn & Nghề nghiệp',
    gender: 'male',
    level: 'B1 - C1',
    greeting: "Good morning! Welcome to the interview. Thank you for taking the time to speak with me today. To get started, could you please tell me a little bit about yourself and your professional background?",
    greeting_vi: "Chào bạn! Chào mừng bạn đến với buổi phỏng vấn. Cảm ơn bạn đã dành thời gian trao đổi hôm nay. Để bắt đầu, bạn có thể giới thiệu đôi nét về bản thân và kinh nghiệm làm việc của mình không?",
    prompt: "You are David, an executive interviewer conducting a professional English job interview. Ask smart, realistic interview questions one at a time, listen carefully to the candidate's answers, comment professionally, and guide the interview forward. Keep your responses concise (2-3 sentences).",
    quickReplies: [
      "I have over 3 years of experience in software development.",
      "My strongest skill is problem-solving and teamwork.",
      "Why is this company looking for this role?",
      "Could you tell me more about the team culture?"
    ]
  },
  {
    id: 'chris_friend',
    name: 'Chris',
    role: 'Người Bạn Bản Xứ (Casual Native Friend)',
    avatar: '🏄‍♂️',
    badge: 'Tán gẫu tự do',
    gender: 'male',
    level: 'A2 - C1',
    greeting: "Yo! What's up, my friend? It's awesome hanging out with you. What have you been up to lately? Have you watched any cool movies or listened to any good music recently?",
    greeting_vi: "Yo! Dạo này sao rồi bạn tôi? Thật tuyệt khi được trò chuyện cùng bạn. Dạo này bạn thế nào? Gần đây có xem bộ phim hay nghe bài nhạc nào hay ho không?",
    prompt: "You are Chris, an easygoing, fun American friend hanging out with the user. Use natural conversational English, modern idioms, slang when appropriate, and ask engaging questions about daily life, hobbies, sports, and travel. Keep responses casual and friendly (1-3 sentences).",
    quickReplies: [
      "I've been binge-watching a new sci-fi series on Netflix.",
      "Not much, just chilling at home after a long week.",
      "I'm planning a weekend trip to the beach soon!",
      "Do you like listening to pop or indie music?"
    ]
  }
];

// 2. REAL-WORLD ROLEPLAY SCENARIOS (Dedicated for "Đóng Vai Giao Tiếp" Tab)
window.ROLEPLAY_SCENARIOS = [
  {
    id: 'roleplay_restaurant',
    title: 'Gọi Món & Ăn Tối Tại Nhà Hàng',
    partnerName: 'Marco (Phục vụ nhà hàng)',
    avatar: '🍜',
    badge: 'Ăn uống & Dịch vụ',
    level: 'A1 - B2',
    location: 'Bella Vista Bistro, New York',
    situationDesc: 'Bạn vừa bước vào nhà hàng Bella Vista Bistro sang trọng. Hãy giao tiếp với anh phục vụ Marco để gọi đồ uống, hỏi món đặc sản hôm nay, dặn dò khẩu vị (ít cay, bớt muối) và yêu cầu hóa đơn tính tiền.',
    greeting: "Good evening and welcome to Bella Vista Bistro! Table for one or two tonight? I have a lovely booth ready for you, and here is our dinner menu. Can I start you off with something refreshing to drink?",
    greeting_vi: "Kính chào quý khách đến với Bella Vista Bistro! Quý khách đi một hay hai người ạ? Tôi có sẵn một bàn rất ấm cúng, và đây là thực đơn tối. Tôi có thể lấy đồ uống giải khát gì cho quý khách trước không ạ?",
    prompt: "You are Marco, a polite, attentive waiter at Bella Vista Bistro. Guide the customer through ordering drinks, appetizers, specials, modifications, and billing. Keep responses concise, warm, and natural (1-3 sentences).",
    quickReplies: [
      "Could you recommend the chef's special tonight?",
      "I'd like to start with a sparkling water with lemon.",
      "Can I get the grilled salmon with less salt?",
      "Could we get the check, please?"
    ],
    objectives: [
      { id: 'marco_obj_1', label: 'Hỏi về món khai vị hoặc đặc sản hôm nay', pattern: /appetizer|special|starter|soup|recommend|today|chef/i },
      { id: 'marco_obj_2', label: 'Gọi món chính kèm dặn dò (ít cay / dị ứng / bớt muối)', pattern: /steak|chicken|pasta|salmon|pizza|spicy|salt|allergy|salad|order/i },
      { id: 'marco_obj_3', label: 'Yêu cầu hóa đơn tính tiền lịch sự', pattern: /check|bill|pay|card|receipt|cash/i }
    ],
    helpPrompts: [
      { en: "What is the chef's special dish this evening?", vi: "Món đặc sản của bếp trưởng tối nay là gì vậy bạn?" },
      { en: "I'd love to go with the grilled salmon, but please make it less salty.", vi: "Tôi muốn dùng món cá hồi nướng, nhưng nhờ bếp làm bớt mặn nhé." },
      { en: "Could we get the check whenever you have a moment?", vi: "Cho chúng tôi xin hóa đơn khi bạn tiện nhé." }
    ]
  },
  {
    id: 'roleplay_cafe',
    title: 'Order Cà Phê Tại Quán NYC',
    partnerName: 'Alex (Barista quán café)',
    avatar: '☕',
    badge: 'Đời sống hàng ngày',
    level: 'A1 - B1',
    location: 'Central Perk Café, New York',
    situationDesc: 'Bạn ghé một quán cà phê tấp nập tại New York. Hãy gọi loại cà phê yêu thích, tùy chỉnh kích cỡ/đá/loại sữa, hỏi bánh ngọt ăn kèm và tiến hành thanh toán.',
    greeting: "Hey there! Welcome to Central Perk Café. It's great to see you! What can I get started for you today? Coffee, tea, or maybe some freshly baked pastries?",
    greeting_vi: "Chào bạn! Chào mừng đến với quán café Central Perk. Rất vui được gặp bạn! Hôm nay bạn muốn dùng gì nào? Cà phê, trà hay một chút bánh ngọt mới nướng nhé?",
    prompt: "You are Alex, a friendly, energetic barista at a popular New York coffee shop. Help the customer order coffee, food, ask for customization, take payment, and engage in warm small talk. Keep replies short, lively, and realistic.",
    quickReplies: [
      "Can I get a large iced caramel macchiato, please?",
      "Do you have any oat milk options?",
      "What pastry do you recommend today?",
      "Can I pay with credit card or Apple Pay?"
    ],
    objectives: [
      { id: 'alex_obj_1', label: 'Gọi đồ uống kèm kích cỡ và đá / loại sữa', pattern: /coffee|latte|cappuccino|tea|iced|hot|large|medium|small|oat milk|whole milk|sugar/i },
      { id: 'alex_obj_2', label: 'Hỏi hoặc chọn một món bánh ngọt ăn kèm', pattern: /pastry|croissant|cake|muffin|recommend|snack|food|cookie/i },
      { id: 'alex_obj_3', label: 'Hỏi tổng số tiền & phương thức thanh toán', pattern: /how much|bill|check|pay|credit card|cash|apple pay|cost/i }
    ],
    helpPrompts: [
      { en: "Can I get a large iced latte with oat milk, please?", vi: "Cho tôi một ly latte đá cỡ lớn với sữa yến mạch nhé." },
      { en: "Do you have any freshly baked croissants or muffins today?", vi: "Hôm nay quán có bánh sừng bò hoặc muffin mới nướng không?" },
      { en: "How much is that in total? Can I pay with credit card?", vi: "Tổng cộng hết bao nhiêu vậy? Tôi trả bằng thẻ được không?" }
    ]
  },
  {
    id: 'roleplay_hotel',
    title: 'Check-in Khách Sạn 5 Sao',
    partnerName: 'Elena (Lễ tân khách sạn)',
    avatar: '🛎️',
    badge: 'Du lịch & Khách sạn',
    level: 'A2 - B2',
    location: 'The Royal Grand Hotel, London',
    situationDesc: 'Bạn vừa đến London và chuẩn bị nhận phòng tại khách sạn The Royal Grand. Hãy xuất trình thông tin đặt phòng, hỏi về bữa sáng và nhờ lễ tân gợi ý địa điểm tham quan.',
    greeting: "Good afternoon, guest! Welcome to The Royal Grand Hotel London. How may I be of assistance to you today? Are you checking in, or would you like recommendations for dining and sightseeing around the city?",
    greeting_vi: "Kính chào quý khách! Chào mừng quý khách đến với khách sạn The Royal Grand London. Tôi có thể hỗ trợ gì cho quý khách hôm nay ạ? Quý khách muốn nhận phòng hay muốn được gợi ý ăn uống, tham quan quanh thành phố?",
    prompt: "You are Elena, a sophisticated, highly courteous 5-star hotel concierge in London. Assist the guest with room check-in, baggage, local transport, booking restaurants, and local city attractions. Keep responses polite, welcoming, and concise.",
    quickReplies: [
      "I have a reservation under the name John Smith.",
      "Could you recommend a good British restaurant nearby?",
      "What is the best way to get to the airport from here?",
      "Is breakfast included with my room booking?"
    ],
    objectives: [
      { id: 'elena_obj_1', label: 'Yêu cầu làm thủ tục nhận phòng hoặc gửi hành lý', pattern: /check in|reservation|booked|room|luggage|baggage|name/i },
      { id: 'elena_obj_2', label: 'Hỏi xin gợi ý nhà hàng hoặc địa điểm tham quan', pattern: /recommend|restaurant|eat|visit|sightseeing|attraction|place/i },
      { id: 'elena_obj_3', label: 'Hỏi cách di chuyển ra sân bay hoặc bắt taxi', pattern: /airport|taxi|cab|bus|train|subway|transport|get to/i }
    ],
    helpPrompts: [
      { en: "Hi, I have a reservation under the name John Smith for two nights.", vi: "Xin chào, tôi có đặt phòng trước dưới tên John Smith trong 2 đêm." },
      { en: "Could you recommend a traditional local restaurant within walking distance?", vi: "Bạn có thể gợi ý nhà hàng địa phương truyền thống gần đây không?" },
      { en: "What is the fastest way to get to Heathrow Airport tomorrow morning?", vi: "Cách nhanh nhất để đến sân bay Heathrow vào sáng mai là gì?" }
    ]
  },
  {
    id: 'roleplay_interview',
    title: 'Phỏng Vấn Xin Việc Quốc Tế',
    partnerName: 'David (Giám đốc nhân sự)',
    avatar: '👨‍💼',
    badge: 'Phỏng vấn & Nghề nghiệp',
    level: 'B1 - C1',
    location: 'Tech Global Corp, Singapore',
    situationDesc: 'Bạn đang tham gia buổi phỏng vấn vị trí chuyên môn tại tập đoàn đa quốc gia. Hãy tự tin giới thiệu kinh nghiệm, nêu bật điểm mạnh giải quyết vấn đề và đặt câu hỏi thông minh.',
    greeting: "Good morning! Welcome to the interview. Thank you for taking the time to speak with me today. To get started, could you please tell me a little bit about yourself and your professional background?",
    greeting_vi: "Chào bạn! Chào mừng bạn đến với buổi phỏng vấn. Cảm ơn bạn đã dành thời gian trao đổi hôm nay. Để bắt đầu, bạn có thể giới thiệu đôi nét về bản thân và kinh nghiệm làm việc của mình không?",
    prompt: "You are David, an executive interviewer conducting a professional English job interview. Ask smart, realistic interview questions one at a time, listen carefully to the candidate's answers, comment professionally, and guide the interview forward. Keep your responses concise (2-3 sentences).",
    quickReplies: [
      "I have over 3 years of experience in software development.",
      "My strongest skill is problem-solving and teamwork.",
      "Why is this company looking for this role?",
      "Could you tell me more about the team culture?"
    ],
    objectives: [
      { id: 'david_obj_1', label: 'Giới thiệu bản thân và kinh nghiệm chuyên môn', pattern: /experience|background|worked|years|specialist|developer|manager|graduated/i },
      { id: 'david_obj_2', label: 'Nêu 1 điểm mạnh hoặc thách thức đã vượt qua', pattern: /strength|strongest|project|solved|skill|teamwork|success|leader|challenge/i },
      { id: 'david_obj_3', label: 'Đặt 1 câu hỏi ngược lại cho nhà tuyển dụng', pattern: /\?|culture|role|team|opportunity|company|expect|growth/i }
    ],
    helpPrompts: [
      { en: "I have over 3 years of hands-on experience in software development.", vi: "Tôi có hơn 3 năm kinh nghiệm thực chiến trong phát triển phần mềm." },
      { en: "My greatest strength is problem-solving and staying calm under pressure.", vi: "Điểm mạnh nhất của tôi là giải quyết vấn đề và giữ bình tĩnh dưới áp lực." },
      { en: "Could you share more about the growth opportunities within the team?", vi: "Anh có thể chia sẻ thêm về cơ hội phát triển trong đội ngũ không?" }
    ]
  },
  {
    id: 'roleplay_friend',
    title: 'Tán Gẫu & Lên Kế Hoạch Cuối Tuần',
    partnerName: 'Chris (Người bạn Mỹ)',
    avatar: '🏄‍♂️',
    badge: 'Tán gẫu tự do',
    level: 'A2 - C1',
    location: 'Venice Beach, California',
    situationDesc: 'Bạn gặp gỡ người bạn Mỹ Chris tại bãi biển California. Hãy trò chuyện về phim ảnh, âm nhạc, sử dụng các từ lóng tự nhiên và rủ nhau đi chơi cuối tuần.',
    greeting: "Yo! What's up, my friend? It's awesome hanging out with you. What have you been up to lately? Have you watched any cool movies or listened to any good music recently?",
    greeting_vi: "Yo! Dạo này sao rồi bạn tôi? Thật tuyệt khi được trò chuyện cùng bạn. Dạo này bạn thế nào? Gần đây có xem bộ phim hay nghe bài nhạc nào hay ho không?",
    prompt: "You are Chris, an easygoing, fun American friend hanging out with the user. Use natural conversational English, modern idioms, slang when appropriate, and ask engaging questions about daily life, hobbies, sports, and travel. Keep responses casual and friendly (1-3 sentences).",
    quickReplies: [
      "I've been binge-watching a new sci-fi series on Netflix.",
      "Not much, just chilling at home after a long week.",
      "I'm planning a weekend trip to the beach soon!",
      "Do you like listening to pop or indie music?"
    ],
    objectives: [
      { id: 'chris_obj_1', label: 'Kể về bộ phim hoặc bài hát bạn thích', pattern: /movie|film|song|music|band|netflix|series|watch|listen/i },
      { id: 'chris_obj_2', label: 'Rủ đi chơi hoặc hỏi về kế hoạch cuối tuần', pattern: /weekend|plan|beach|hang out|grab a beer|coffee|tomorrow|saturday|sunday/i },
      { id: 'chris_obj_3', label: 'Dùng cách diễn đạt tự nhiên (slang / phrasal verb)', pattern: /chill|hang out|cool|awesome|binge|catch up|gonna|wanna|hit the/i }
    ],
    helpPrompts: [
      { en: "I've been binge-watching this mind-blowing sci-fi series on Netflix.", vi: "Dạo này tôi đang cày bộ phim khoa học viễn tưởng cực cuốn trên Netflix." },
      { en: "Are you free this weekend? Let's grab some coffee and catch up!", vi: "Cuối tuần này bạn rảnh không? Đi cà phê tám chuyện nhé!" },
      { en: "That sounds awesome! I'm totally down for that.", vi: "Nghe đỉnh đấy! Tôi hoàn toàn sẵn sàng tham gia." }
    ]
  }
];

// Offline simulation response engine for immediate offline / zero-key usage
window.AI_OFFLINE_KNOWLEDGE = {
  // Common intent patterns & smart replies with grammar checks
  patterns: [
    {
      match: /hello|hi|hey|good morning|good afternoon|good evening/i,
      replies: [
        "Hello! It's really great to chat with you. How are you feeling today?",
        "Hi there! Wonderful to see you. What would you like to talk about today?",
        "Hey! Hope you're having an awesome day. How can I help you practice your English right now?"
      ],
      grammarCheck: null,
      suggestions: ["I'm doing great, thank you!", "I want to improve my English speaking.", "Tell me an interesting fact.", "What's the weather like where you are?"]
    },
    {
      match: /how are you|how's it going|how are things/i,
      replies: [
        "I'm doing fantastic, thanks for asking! I'm always energized and ready to practice English with you. How about yourself?",
        "Never better! I love chatting with learners who are passionate about mastering English. What's new with you today?"
      ],
      grammarCheck: null,
      suggestions: ["I had a busy day at work.", "I feel a bit tired, but happy to learn.", "I'm practicing English before sleeping."]
    },
    {
      match: /busy|work|job|office|boss|deadline/i,
      replies: [
        "Sounds like you've been working hard! Remember to take short breaks to keep your energy up. What kind of projects are you focusing on at work right now?",
        "Balancing work and English study shows great discipline! How do you usually unwind after a long working day?"
      ],
      grammarCheck: null,
      suggestions: ["I usually listen to music or read books.", "I work in technology and software.", "I like cooking dinner with my family."]
    },
    {
      match: /coffee|latte|cappuccino|tea|drink|pastry|cake|water/i,
      replies: [
        "Coming right up! Would you like that hot or iced? And do you prefer whole milk, oat milk, or almond milk?",
        "Excellent choice! Our specialty brew today has notes of dark chocolate and caramel. Would you like a fresh croissant to go with that?"
      ],
      grammarCheck: null,
      suggestions: ["Iced with oat milk, please!", "Can you make it less sweet?", "How much is that in total?", "I'd like a croissant too!"]
    },
    {
      match: /interview|experience|strength|weakness|resume|cv/i,
      replies: [
        "That's a very compelling point. Could you give me a specific example of a difficult challenge you faced in your past role and how you overcame it?",
        "Thank you for sharing that. Communication and adaptability are crucial in our team. Where do you see yourself professionally in the next three years?"
      ],
      grammarCheck: null,
      suggestions: ["I led a team to deliver the project on time.", "I improved my communication by listening more.", "I aim to become a senior specialist."]
    },
    {
      match: /hotel|room|check in|reservation|flight|airport|travel/i,
      replies: [
        "Certainly! I have located your booking details right here. Your room is on the 8th floor with a lovely city view. Complimentary breakfast is served from 7:00 to 10:30 AM in the main dining hall. Do you need any assistance with your luggage?",
        "London has so much to offer! From here, you can easily take the Underground at Piccadilly station, or I can arrange a black cab for you. Would you like a map of the city?"
      ],
      grammarCheck: null,
      suggestions: ["Yes, please arrange a cab for me.", "What time is checkout tomorrow?", "Could you recommend a quiet dinner spot?"]
    },
    {
      match: /movie|film|music|song|netflix|hobby|game|sport|football/i,
      replies: [
        "Oh, I love that topic! Stories and melodies have such a powerful way of connecting people. What's your absolute favorite one of all time?",
        "That sounds super fun! I could talk about entertainment and hobbies all day long. Who is your favorite artist or character in that?"
      ],
      grammarCheck: null,
      suggestions: ["My favorite movie is Inception.", "I really love acoustic and pop music.", "I enjoy playing football on weekends."]
    },
    {
      match: /grammar|mistake|correct|learn|improve|vocab|idiom/i,
      replies: [
        "You're doing fantastic! One great idiom you can use often is 'hit the nail on the head' — which means to describe exactly what is causing a situation or problem. Would you like to try making a sentence with it?",
        "Here's a golden tip: don't worry too much about perfection when speaking. Fluency comes from regular speaking practice, even if you make small mistakes along the way!"
      ],
      grammarCheck: null,
      suggestions: ["That's a great tip, thank you!", "Can you give me an example with that idiom?", "How can I remember new vocabulary faster?"]
    }
  ],

  // Common learner grammar checks (Bộ máy phân tích ngữ pháp tiếng Anh toàn diện cho người Việt)
  checkGrammar(userInput) {
    const text = userInput.trim();
    if (!text) return null;
    const corrections = [];

    // 1. Check "I am agree" / "I am disagree"
    if (/\bi\s+am\s+(agree|disagree)\b/i.test(text)) {
      const w = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `I am ${w}`,
        correct: `I ${w} (hoặc I agree with you)`,
        explanation: `Trong tiếng Anh, '${w}' là một động từ thường (verb), không đi cùng động từ to be 'am'. Hãy dùng 'I ${w}' nhé!`,
        better_phrasing: "I completely agree with you on that."
      });
    }

    // 2. Check "To be + bare verb": "I am come from", "I am live in", "I am work at", "I am go", "I am like", "I am think", "I am feel"
    if (/\b(i\s+am|he\s+is|she\s+is|we\s+are|they\s+are)\s+(come\s+from|live\s+in|work\s+at|work\s+in|go\s+to|like|feel|think|know|want)\b/i.test(text)) {
      const subjBe = RegExp.$1;
      const v = RegExp.$2;
      const subj = subjBe.split(' ')[0];
      corrections.push({
        has_error: true,
        wrong: `${subjBe} ${v}`,
        correct: `${subj} ${v} (hoặc ${subjBe} living/working...)`,
        explanation: `Không dùng động từ to be '${subjBe}' trước động từ nguyên thể '${v}'. Ở thì hiện tại đơn, hãy dùng '${subj} ${v}'.`,
        better_phrasing: `I currently live and work in the city.`
      });
    }

    // 3. Check "He do / She do / It do / He don't / She don't" (hỗ trợ cả dont không dấu)
    if (/\b(he|she|it)\s+do\b/i.test(text)) {
      const s = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `${s} do`,
        correct: `${s} does`,
        explanation: `Với chủ ngữ ngôi thứ 3 số ít (${s}) ở thì hiện tại đơn, ta dùng 'does' thay vì 'do'.`,
        better_phrasing: `${s} always does that very well.`
      });
    } else if (/\b(he|she|it)\s+don'?t\b/i.test(text)) {
      const s = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `${s} don't`,
        correct: `${s} doesn't`,
        explanation: `Với chủ ngữ ngôi thứ 3 số ít (${s}), thể phủ định là 'doesn't' (hoặc does not), không dùng 'don't'.`,
        better_phrasing: `${s} doesn't really seem to mind.`
      });
    }

    // 4. Check "He have / She have / It have"
    if (/\b(he|she|it)\s+have\b/i.test(text)) {
      const s = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `${s} have`,
        correct: `${s} has`,
        explanation: `Chủ ngữ ngôi thứ 3 số ít (${s}) đi cùng 'has', không dùng 'have'.`,
        better_phrasing: `${s} has a great sense of humor.`
      });
    }

    // 5. Check "I has / You has / We has / They has" hoặc "I doesn't"
    if (/\b(i|you|we|they)\s+has\b/i.test(text)) {
      const s = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `${s} has`,
        correct: `${s} have`,
        explanation: `Với chủ ngữ '${s}', động từ có là 'have', không dùng 'has'.`,
        better_phrasing: `I have plenty of time right now.`
      });
    } else if (/\b(i|you|we|they)\s+doesn'?t\b/i.test(text)) {
      const s = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `${s} doesn't`,
        correct: `${s} don't`,
        explanation: `Với chủ ngữ '${s}', thể phủ định là 'don't', không dùng 'doesn't'.`,
        better_phrasing: `I don't think that is a problem.`
      });
    }

    // 6. Check "He/She/It + verb without s/es" (like, want, need, think, know, say, eat, drink, buy, look, feel)
    if (/\b(he|she|it)\s+(like|want|need|think|know|live|work|come|see|say|tell|eat|drink|buy|look|feel)\b/i.test(text)) {
      const subj = RegExp.$1;
      const v = RegExp.$2;
      corrections.push({
        has_error: true,
        wrong: `${subj} ${v}`,
        correct: `${subj} ${v}s`,
        explanation: `Ở thì hiện tại đơn, động từ đi sau chủ ngữ ngôi thứ 3 số ít '${subj}' cần thêm đuôi -s/es: '${subj} ${v}s'.`,
        better_phrasing: `${subj} really enjoys doing that.`
      });
    }

    // 7. Check "didn't + V2" / "did you + V2" (Lỗi dùng quá khứ sau trợ động từ did/didn't)
    if (/\b(didn'?t|did\s+you)\s+(went|saw|ate|bought|came|met|made|took|had|spoke|told)\b/i.test(text)) {
      const aux = RegExp.$1;
      const vPast = RegExp.$2;
      const baseMap = {
        went: 'go', saw: 'see', ate: 'eat', bought: 'buy', came: 'come',
        met: 'meet', made: 'make', took: 'take', had: 'have', spoke: 'speak', told: 'tell'
      };
      const vBase = baseMap[vPast.toLowerCase()] || 'động từ nguyên thể';
      corrections.push({
        has_error: true,
        wrong: `${aux} ${vPast}`,
        correct: `${aux} ${vBase}`,
        explanation: `Sau trợ động từ '${aux}', động từ chính luôn ở dạng nguyên thể (base form), không chia quá khứ nữa: hãy dùng '${aux} ${vBase}'.`,
        better_phrasing: `I didn't get a chance to go there.`
      });
    }

    // 8. Check Past indicators with present verb: "yesterday I go", "last night I see", "I go there yesterday"
    if (/\b(yesterday|last\s+night|last\s+week|last\s+year|last\s+month|\d+\s+days?\s+ago)\b/i.test(text) &&
        /\b(i|he|she|we|they)\s+(go|see|eat|buy|come|meet|make|take|have|do)\b/i.test(text)) {
      const vMap = {
        go: 'went', see: 'saw', eat: 'ate', buy: 'bought', come: 'came',
        meet: 'met', make: 'made', take: 'took', have: 'had', do: 'did'
      };
      corrections.push({
        has_error: true,
        wrong: "Dùng động từ hiện tại với mốc thời gian quá khứ",
        correct: "Chia động từ ở thì Quá Khứ Đơn (V2/ed)",
        explanation: "Khi câu có các từ chỉ thời gian trong quá khứ như 'yesterday', 'last night', bạn cần chia động từ ở thì Quá Khứ Đơn (Past Simple): go -> went, see -> saw...",
        better_phrasing: "I went there yesterday and had a wonderful time."
      });
    }

    // 9. Check "I have 20 years old" -> "I am 20 years old"
    if (/\bi\s+have\s+(\d+|twenty|thirty|forty|\w+)\s+years\s+old\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "I have ... years old",
        correct: "I am ... years old",
        explanation: "Trong tiếng Anh, nói về tuổi tác ta dùng động từ to be ('I am 20 years old'), không dùng 'have'.",
        better_phrasing: "I'm in my early twenties."
      });
    }

    // 10. Check "I very like" / "I very love" -> "I really like"
    if (/\b(i|we|they|he|she)\s+very\s+(like|love|enjoy|hate|want)\b/i.test(text)) {
      const s = RegExp.$1;
      const v = RegExp.$2;
      corrections.push({
        has_error: true,
        wrong: `${s} very ${v}`,
        correct: `${s} really ${v} (hoặc ${s} ${v} ... very much)`,
        explanation: `'Very' không bổ nghĩa trực tiếp cho động từ '${v}'. Hãy dùng '${s} really ${v}' hoặc đặt 'very much' ở cuối câu nhé!`,
        better_phrasing: `I absolutely love that!`
      });
    }

    // 11. Check "I no understand / I no like / no have"
    if (/\bi\s+no\s+(understand|know|like|have|want|see)\b/i.test(text) || /\bno\s+have\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "Dùng 'no' trước động từ",
        correct: "Dùng trợ động từ 'don't' (I don't understand / I don't have)",
        explanation: "Để phủ định một động từ trong tiếng Anh, ta dùng trợ động từ 'don't' (do not), không dùng 'no'.",
        better_phrasing: "I'm afraid I don't quite understand."
      });
    }

    // 12. Check missing 'to' after want/need/hope/decide/try: "I want buy", "I need go"
    if (/\b(want|need|hope|decide|try|plan)\s+(buy|go|eat|drink|see|meet|learn|find|get|have|make|take)\b/i.test(text)) {
      const v1 = RegExp.$1;
      const v2 = RegExp.$2;
      corrections.push({
        has_error: true,
        wrong: `${v1} ${v2}`,
        correct: `${v1} to ${v2}`,
        explanation: `Sau các động từ như '${v1}', động từ theo sau phải có 'to' (to-infinitive): '${v1} to ${v2}'.`,
        better_phrasing: `I would like to ${v2} if possible.`
      });
    }

    // 13. Check modal verbs + to: "can to [verb]", "should to", "must to"
    if (/\b(can|could|should|must|will)\s+to\s+([a-z]+)\b/i.test(text)) {
      const modal = RegExp.$1;
      const v = RegExp.$2;
      corrections.push({
        has_error: true,
        wrong: `${modal} to ${v}`,
        correct: `${modal} ${v}`,
        explanation: `Sau động từ khiếm khuyết '${modal}', động từ luôn ở dạng nguyên thể không có 'to': '${modal} ${v}'.`,
        better_phrasing: `Could you please ${v}?`
      });
    }

    // 14. Check "more better / more easier / more faster"
    if (/\bmore\s+(better|easier|faster|harder|bigger|smaller|taller|cheaper|stronger)\b/i.test(text)) {
      const comp = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `more ${comp}`,
        correct: `${comp}`,
        explanation: `Tính từ so sánh hơn '${comp}' đã mang nghĩa là 'hơn', không được thêm 'more' phía trước (lỗi lặp từ).`,
        better_phrasing: `This option is much ${comp}.`
      });
    }

    // 15. Check "I am boring" (khi muốn nói tôi buồn chán)
    if (/\bi\s+am\s+boring\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "I am boring",
        correct: "I am bored",
        explanation: "'I am boring' nghĩa là 'Tôi là người tẻ nhạt'. Nếu muốn nói bạn đang cảm thấy buồn chán, hãy dùng tính từ đuôi -ed: 'I am bored'.",
        better_phrasing: "I'm feeling a bit bored today."
      });
    }

    // 16. Preposition errors
    if (/\bdiscuss\s+about\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "discuss about",
        correct: "discuss [something]",
        explanation: "'Discuss' là ngoại động từ mang nghĩa 'thảo luận về', nên không dùng kèm giới từ 'about'.",
        better_phrasing: "We can discuss this matter further."
      });
    }
    if (/\bexplain\s+me\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "explain me",
        correct: "explain to me",
        explanation: "Động từ 'explain' luôn đi với giới từ 'to' khi chỉ người nhận: 'explain to me'.",
        better_phrasing: "Could you explain that to me?"
      });
    }
    if (/\blisten\s+me\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "listen me",
        correct: "listen to me",
        explanation: "'Listen' cần giới từ 'to' trước tân ngữ chỉ người/vật: 'listen to me'.",
        better_phrasing: "Please listen to what I have to say."
      });
    }
    if (/\bwait\s+me\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "wait me",
        correct: "wait for me",
        explanation: "'Wait' đi kèm giới từ 'for': 'wait for me' (chờ tôi).",
        better_phrasing: "Could you wait for me a moment?"
      });
    }
    if (/\bmarry\s+with\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "marry with",
        correct: "marry [someone]",
        explanation: "Trong tiếng Anh, 'marry someone' (kết hôn với ai) không dùng giới từ 'with'.",
        better_phrasing: "They decided to get married last year."
      });
    }
    if (/\bgo\s+to\s+home\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "go to home",
        correct: "go home",
        explanation: "Từ 'home' trong trường hợp này đóng vai trò trạng từ nơi chốn, không dùng giới từ 'to': hãy nói 'go home'.",
        better_phrasing: "I'm heading home right now."
      });
    }
    if (/\barrive\s+to\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "arrive to",
        correct: "arrive at (nơi nhỏ) / arrive in (thành phố/quốc gia)",
        explanation: "Động từ 'arrive' không đi với 'to', mà đi với 'at' hoặc 'in'.",
        better_phrasing: "We will arrive at the airport soon."
      });
    }

    // 17. Check "many money / many information"
    if (/\bmany\s+(money|information|advice|furniture|luggage|traffic)\b/i.test(text)) {
      const noun = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `many ${noun}`,
        correct: `much / a lot of ${noun}`,
        explanation: `'${noun}' là danh từ không đếm được, ta dùng 'much' hoặc 'a lot of' thay vì 'many'.`,
        better_phrasing: `We gathered plenty of information.`
      });
    }

    // 18. Check "How you say / What you mean / Where you live" (câu hỏi thiếu trợ động từ)
    if (/\b(how|what|where|why|when)\s+you\s+(say|mean|think|know|live|want|go)\b/i.test(text)) {
      const q = RegExp.$1;
      const v = RegExp.$2;
      corrections.push({
        has_error: true,
        wrong: `${q} you ${v}`,
        correct: `${q} do you ${v}`,
        explanation: `Câu hỏi trong tiếng Anh cần có trợ động từ 'do' đứng trước chủ ngữ 'you': '${q} do you ${v}?'`,
        better_phrasing: `${q} exactly do you mean by that?`
      });
    }

    // 19. Check "How much it cost" / "How much is it cost"
    if (/\bhow\s+much\s+(it\s+cost|is\s+it\s+cost)\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "how much it cost / how much is it cost",
        correct: "how much does it cost? (hoặc how much is it?)",
        explanation: "Hỏi giá cả với động từ 'cost' cần dùng trợ động từ 'does': 'How much does it cost?' hoặc câu đơn giản 'How much is it?'",
        better_phrasing: "Could you tell me how much this is?"
      });
    }

    // 20. Check "open/close the light/TV" (lỗi dịch tiếng Việt sang tiếng Anh)
    if (/\b(open|close)\s+(the\s+)?(light|lamp|tv|television|fan|computer)\b/i.test(text)) {
      const act = RegExp.$1;
      const dev = RegExp.$3;
      const fixed = act.toLowerCase() === 'open' ? 'turn on' : 'turn off';
      corrections.push({
        has_error: true,
        wrong: `${act} the ${dev}`,
        correct: `${fixed} the ${dev}`,
        explanation: `Đối với thiết bị điện tử, bóng đèn, ta dùng cụm 'turn on' (bật) hoặc 'turn off' (tắt), không dùng 'open/close'.`,
        better_phrasing: `Could you please ${fixed} the ${dev}?`
      });
    }

    // 21. Check "see movie / see film"
    if (/\bsee\s+(a\s+)?(movie|film)\b/i.test(text)) {
      corrections.push({
        has_error: true,
        wrong: "see movie",
        correct: "watch a movie",
        explanation: "Khi xem phim hoặc chương trình truyền hình, người bản xứ dùng động từ 'watch': 'watch a movie'.",
        better_phrasing: "Let's watch a movie together tonight."
      });
    }

    // 22. Check "like/love + bare verb": "like play", "like watch"
    if (/\b(like|love|enjoy|hate)\s+(play|watch|read|listen|swim|sing|travel|cook)\b/i.test(text)) {
      const v1 = RegExp.$1;
      const v2 = RegExp.$2;
      corrections.push({
        has_error: true,
        wrong: `${v1} ${v2}`,
        correct: `${v1} ${v2}ing (hoặc ${v1} to ${v2})`,
        explanation: `Sau các động từ chỉ sở thích như '${v1}', động từ theo sau thường ở dạng V-ing ('${v1} ${v2}ing') hoặc to-V.`,
        better_phrasing: `I really enjoy ${v2}ing in my free time.`
      });
    }

    // 23. Check missing 'a' before occupation: "I am student / He is doctor"
    if (/\b(i\s+am|he\s+is|she\s+is)\s+(student|teacher|doctor|nurse|engineer|worker|driver)\b/i.test(text)) {
      const subjBe = RegExp.$1;
      const job = RegExp.$2;
      const article = /^[aeiou]/i.test(job) ? 'an' : 'a';
      corrections.push({
        has_error: true,
        wrong: `${subjBe} ${job}`,
        correct: `${subjBe} ${article} ${job}`,
        explanation: `Khi nói về nghề nghiệp trong tiếng Anh, luôn cần mạo từ 'a/an' trước danh từ số ít: '${subjBe} ${article} ${job}'.`,
        better_phrasing: `I currently work as a ${job}.`
      });
    }

    // 24. Check "a" before vowel: "a apple", "a orange", "a hour"
    if (/\ba\s+(apple|egg|orange|umbrella|ice\s+cream|engineer|onion|hour|idea|artist)\b/i.test(text)) {
      const n = RegExp.$1;
      corrections.push({
        has_error: true,
        wrong: `a ${n}`,
        correct: `an ${n}`,
        explanation: `Trước danh từ bắt đầu bằng nguyên âm hoặc âm câm (như hour), ta dùng mạo từ 'an' thay vì 'a'.`,
        better_phrasing: `I have an ${n} ready.`
      });
    }

    if (corrections.length > 0) {
      return corrections[0];
    }

    // Nếu không phát hiện lỗi ngữ pháp cơ bản, trả về phản hồi khen ngợi và gợi ý diễn đạt nâng cao
    let smartPhrasing = "";
    const lower = text.toLowerCase();
    if (/\b(i need|i want)\s+(a\s+taxi|a\s+cab|a\s+ride)\b/i.test(lower)) {
      smartPhrasing = "Could you please arrange a taxi for me?";
    } else if (/\b(i need|i want)\s+(a\s+coffee|coffee|a\s+drink)\b/i.test(lower)) {
      smartPhrasing = "I'd like to order a cup of coffee, please.";
    } else if (/\b(i need|i want)\s+(the\s+bill|the\s+check)\b/i.test(lower)) {
      smartPhrasing = "Could we please get the check whenever you have a moment?";
    } else if (/\b(how much|what price)\b/i.test(lower)) {
      smartPhrasing = "How much would that be in total?";
    } else if (/\b(can i|could i)\s+(get|have)\b/i.test(lower)) {
      smartPhrasing = `Would it be possible to ${lower.replace(/^(can|could)\s+i\s+/i, '')}?`;
    } else if (/\bi\s+want\b/i.test(lower)) {
      smartPhrasing = lower.replace(/\bi\s+want\b/i, "I'd really like to");
    } else if (text.length > 20) {
      smartPhrasing = `Cách diễn đạt lịch sự: "Could you please..." hoặc "I would appreciate it if..."`;
    }

    return {
      has_error: false,
      wrong: text,
      correct: text,
      explanation: "Câu nói của bạn đúng ngữ pháp và cấu trúc câu rất rõ ràng!",
      better_phrasing: smartPhrasing
    };
  }
};

// =========================================================================
// EXPRESSION UPGRADER KNOWLEDGE BASE & OFFLINE ENGINE (3 CẤP ĐỘ DIỄN ĐẠT)
// =========================================================================
window.EXPRESSION_UPGRADER_DB = [
  {
    keywords: /gọi món gà|muốn ăn gà|gà nướng|want chicken|order chicken/i,
    input: "Tôi muốn gọi món gà",
    basic: {
      text: "I want chicken, please.",
      ipa: "/aɪ wɒnt ˈtʃɪkɪn pliːz/",
      note: "Cách nói trực diện, đơn giản nhưng hơi cộc nếu dùng trong nhà hàng."
    },
    natural: {
      text: "I'd love to go with the grilled chicken, please.",
      ipa: "/aɪd lʌv tuː ɡoʊ wɪð ðə ɡrɪld ˈtʃɪkɪn pliːz/",
      note: "Người bản xứ ưa chuộng cụm 'go with' thay vì 'want' để gọi món một cách lịch sự, nhã nhặn."
    },
    advanced: {
      text: "I'd like to opt for the herb-roasted chicken breast with seasonal vegetables.",
      ipa: "/aɪd laɪk tuː ɒpt fɔːr ðə hɜːrb ˈroʊstɪd ˈtʃɪkɪn brɛst/",
      note: "Cấu trúc 'opt for' (lựa chọn) chuẩn C1 phong cách ẩm thực Fine Dining."
    }
  },
  {
    keywords: /xem phim|thích xem phim|cày phim|like movie|watch movie/i,
    input: "Tôi rất thích xem phim cuối tuần",
    basic: {
      text: "I like watching movies on weekends.",
      ipa: "/aɪ laɪk ˈwɒtʃɪŋ ˈmuːviz ɒn ˈwiːkɛndz/",
      note: "Đúng ngữ pháp nhưng mang tính liệt kê cơ bản."
    },
    natural: {
      text: "I'm a huge movie buff and love binge-watching series over the weekend.",
      ipa: "/aɪm ə hjuːdʒ ˈmuːvi bʌf ænd lʌv bɪndʒ ˈwɒtʃɪŋ ˈsɪəriːz/",
      note: "'Movie buff' (mọt phim) và 'binge-watch' (cày phim liên tục) là các cụm từ cực kỳ tự nhiên."
    },
    advanced: {
      text: "I frequently indulge in cinematic marathons during my leisure time.",
      ipa: "/aɪ ˈfriːkwəntli ɪnˈdʌldʒ ɪn ˌsɪnəˈmætɪk ˈmærəθɒnz/",
      note: "Dùng động từ 'indulge in' và tính từ 'cinematic' tạo phong thái học thuật, trau chuốt."
    }
  },
  {
    keywords: /rất bận|ngập đầu|nhiều việc|very busy|so busy/i,
    input: "Dạo này tôi rất bận rộn với công việc",
    basic: {
      text: "I am very busy with work these days.",
      ipa: "/aɪ æm ˈvɛri ˈbɪzi wɪð wɜːrk ðiːz deɪz/",
      note: "Cách nói dịch nghĩa từng từ (Vietlish nhẹ nếu lạm dụng 'very busy')."
    },
    natural: {
      text: "I've been completely snowed under with work lately.",
      ipa: "/aɪv biːn kəmˈpliːtli snoʊd ˈʌndər wɪð wɜːrk ˈleɪtli/",
      note: "Thành ngữ 'snowed under with work' (ngập đầu trong việc) là cách nói biểu cảm ưa thích của người bản xứ."
    },
    advanced: {
      text: "My professional commitments have been exceptionally demanding as of late.",
      ipa: "/maɪ prəˈfɛʃənl kəˈmɪtmənts hæv biːn ɪkˈsɛpʃənəli dɪˈmændɪŋ/",
      note: "'Professional commitments' thay cho 'work' thể hiện phong thái công sở cấp quản lý."
    }
  },
  {
    keywords: /đồng ý|hoàn toàn đồng ý|i am agree|i agree with you/i,
    input: "Tôi hoàn toàn đồng ý với ý kiến của bạn",
    basic: {
      text: "I agree with your opinion.",
      ipa: "/aɪ əˈɡriː wɪð jɔːr əˈpɪnjən/",
      note: "Lưu ý không dùng 'I am agree' mà luôn dùng 'I agree'."
    },
    natural: {
      text: "I couldn't agree more! You hit the nail right on the head.",
      ipa: "/aɪ ˈkʊdənt əˈɡriː mɔːr juː hɪt ðə neɪl raɪt ɒn ðə hɛd/",
      note: "Cụm 'hit the nail on the head' khen đối phương nói trúng phóc trọng tâm."
    },
    advanced: {
      text: "Your perspective aligns seamlessly with my strategic assessment.",
      ipa: "/jɔːr pərˈspɛktɪv əˈlaɪnz ˈsiːmləsli wɪð maɪ strəˈtiːdʒɪk əˈsɛsmənt/",
      note: "Thuật ngữ chuyên nghiệp dùng trong các cuộc họp và đàm phán hợp đồng quốc tế."
    }
  },
  {
    keywords: /xin hóa đơn|tính tiền|thanh toán|give me bill|check please/i,
    input: "Làm ơn cho tôi xin hóa đơn tính tiền",
    basic: {
      text: "Can I have the bill, please?",
      ipa: "/kæn aɪ hæv ðə bɪl pliːz/",
      note: "Ngắn gọn, dễ hiểu và lịch sự cơ bản."
    },
    natural: {
      text: "Could we get the check whenever you have a moment, please?",
      ipa: "/kʊd wiː ɡɛt ðə tʃɛk wɛnˈɛvər juː hæv ə ˈmoʊmənt pliːz/",
      note: "Thêm cụm 'whenever you have a moment' giúp câu giao tiếp trở nên vô cùng tinh tế và văn minh."
    },
    advanced: {
      text: "Would you kindly settle our bill at your earliest convenience?",
      ipa: "/wʊd juː ˈkaɪndli ˈsɛtl ˈaʊər bɪl æt jɔːr ˈɜːrliɪst kənˈviːnjəns/",
      note: "'At your earliest convenience' thể hiện sự tôn trọng tuyệt đối đối với nhân viên phục vụ."
    }
  },
  {
    keywords: /cà phê|latte|uống cà phê|order coffee|drink coffee/i,
    input: "Cho tôi một ly latte đá ít đường",
    basic: {
      text: "Give me an iced latte with less sugar.",
      ipa: "/ɡɪv miː ən aɪst ˈlɑːteɪ wɪð lɛs ˈʃʊɡər/",
      note: "Dùng 'Give me' hơi cộc cằn trong văn hóa quán café phương Tây."
    },
    natural: {
      text: "Could I get a large iced latte, easy on the sugar, please?",
      ipa: "/kʊd aɪ ɡɛt ə lɑːrdʒ aɪst ˈlɑːteɪ ˈiːzi ɒn ðə ˈʃʊɡər pliːz/",
      note: "Thành ngữ 'easy on the sugar' là cách nói chuẩn bản xứ để dặn 'cho ít đường'."
    },
    advanced: {
      text: "I'd appreciate an iced latte customized with oat milk and a subtle hint of sweetness.",
      ipa: "/aɪd əˈpriːʃieɪt ən aɪst ˈlɑːteɪ ˈkʌstəmaɪzd wɪð oʊt mɪlk/",
      note: "Diễn đạt tinh tế 'subtle hint of sweetness' thay vì chỉ nói 'less sugar'."
    }
  },
  {
    keywords: /hỏi đường|chỉ đường|đường đi|ở đâu|đi thế nào|lối đi|hướng đi|ask direction|direction|where is|how can i get to|way to/i,
    input: "Tôi muốn hỏi đường",
    basic: {
      text: "Excuse me, where is the nearest station?",
      ipa: "/ɪkˈskjuːz miː wɛər ɪz ðə ˈnɪərɪst ˈsteɪʃən/",
      note: "Mẫu câu hỏi đường cơ bản, ngắn gọn và trực tiếp."
    },
    natural: {
      text: "Excuse me, could you point me in the right direction for the central station?",
      ipa: "/ɪkˈskjuːz miː kʊd juː pɔɪnt miː ɪn ðə raɪt dɪˈrɛkʃən fɔːr ðə ˈsɛntrəl ˈsteɪʃən/",
      note: "Thành ngữ 'point me in the right direction' (chỉ giúp tôi đúng hướng) là cách hỏi đường lịch sự và tự nhiên nhất của người bản xứ."
    },
    advanced: {
      text: "Pardon me, would you be kind enough to direct me toward the vicinity of the main avenue?",
      ipa: "/ˈpɑːrdn miː wʊd juː biː kaɪnd ɪˈnʌf tuː dɪˈrɛkt miː təˈwɔːrd ðə vɪˈsɪnɪti ɒv ðə meɪn ˈævənjuː/",
      note: "Dùng từ 'vicinity' (khu vực lân cận) và 'direct me' chuẩn phong cách tiếng Anh quý tộc và trang trọng."
    }
  },
  {
    keywords: /giúp tôi|nhờ giúp|nhờ một chút|hỗ trợ|help me|can you help|assist|give a hand/i,
    input: "Bạn có thể giúp tôi một chút được không?",
    basic: {
      text: "Can you help me, please?",
      ipa: "/kæn juː hɛlp miː pliːz/",
      note: "Câu nhờ vả cơ bản, người đối diện hiểu ngay lập tức."
    },
    natural: {
      text: "Could you give me a quick hand with this whenever you have a second?",
      ipa: "/kʊd juː ɡɪv miː ə kwɪk hænd wɪð ðɪs wɛnˈɛvər juː hæv ə ˈsɛkənd/",
      note: "Thành ngữ 'give someone a hand' (giúp một tay) rất thân thiện, gần gũi trong giao tiếp thường ngày."
    },
    advanced: {
      text: "I would be immensely grateful if you could render some assistance regarding this matter.",
      ipa: "/aɪ wʊd biː ɪˈmɛnsli ˈɡreɪtfʊl ɪf juː kʊd ˈrɛndər sʌm əˈsɪstəns rɪˈɡɑːrdɪŋ ðɪs ˈmætər/",
      note: "'Render assistance' (cung cấp sự hỗ trợ) chuẩn ngữ cảnh ngoại giao, công vụ và đối tác doanh nghiệp."
    }
  },
  {
    keywords: /bao nhiêu tiền|giá bao nhiêu|cái này giá|giá cả|how much|price|cost/i,
    input: "Cái này giá bao nhiêu tiền vậy?",
    basic: {
      text: "How much does this cost?",
      ipa: "/haʊ mʌtʃ dʌz ðɪs kɒst/",
      note: "Câu hỏi giá cơ bản quen thuộc khi mua sắm."
    },
    natural: {
      text: "How much is this going for, if you don't mind me asking?",
      ipa: "/haʊ mʌtʃ ɪz ðɪs ˈɡoʊɪŋ fɔːr ɪf juː doʊnt maɪnd miː ˈæskɪŋ/",
      note: "Cụm 'going for' là cách nói giá phổ biến ở các cửa hàng và khu mua sắm bản xứ."
    },
    advanced: {
      text: "Could you please furnish the comprehensive pricing details and tariff breakdown for this item?",
      ipa: "/kʊd juː pliːz ˈfɜːrnɪʃ ðə ˌkɒmprɪˈhɛnsɪv ˈpraɪsɪŋ ˈdiːteɪlz/",
      note: "'Furnish pricing details' chuẩn phong cách đàm phán hợp đồng thương mại quốc tế."
    }
  },
  {
    keywords: /không hiểu|nói lại|lặp lại|chưa rõ|don't understand|repeat|say again|pardon/i,
    input: "Tôi chưa hiểu ý bạn, bạn nói lại được không?",
    basic: {
      text: "I don't understand, please say that again.",
      ipa: "/aɪ doʊnt ˌʌndərˈstænd pliːz seɪ ðæt əˈɡɛn/",
      note: "Diễn đạt trực diện, ngắn gọn."
    },
    natural: {
      text: "Sorry, I didn't quite catch that. Would you mind repeating it for me?",
      ipa: "/ˈsɒri aɪ ˈdɪdənt kwaɪt kætʃ ðæt wʊd juː maɪnd rɪˈpiːtɪŋ ɪt fɔːr miː/",
      note: "'Didn't quite catch that' (chưa nghe kịp) là cách nói cực kỳ lịch sự và tự nhiên thay vì nói thẳng 'I don't understand'."
    },
    advanced: {
      text: "Would you mind elaborating further to clarify your line of reasoning?",
      ipa: "/wʊd juː maɪnd ɪˈlæbəreɪtɪŋ ˈfɜːrðər tuː ˈklærɪfaɪ jɔːr laɪn ɒv ˈriːzənɪŋ/",
      note: "'Elaborate further' (giải thích chi tiết hơn) chuẩn văn phong học thuật và phỏng vấn cấp cao."
    }
  },
  {
    keywords: /cảm ơn|biết ơn|cảm kích|thank you|thanks a lot|grateful/i,
    input: "Cảm ơn bạn rất nhiều vì đã giúp đỡ",
    basic: {
      text: "Thank you very much for your help.",
      ipa: "/θæŋk juː ˈvɛri mʌtʃ fɔːr jɔːr hɛlp/",
      note: "Câu cảm ơn trang nhã, phổ biến."
    },
    natural: {
      text: "I really can't thank you enough! You're an absolute lifesaver.",
      ipa: "/aɪ ˈrɪəli kænt θæŋk juː ɪˈnʌf juːr ən ˈæbsəluːt ˈlaɪfˌseɪvər/",
      note: "'You're an absolute lifesaver' (bạn đúng là vị cứu tinh của mình) là lời cảm ơn nồng nhiệt, đầy cảm xúc."
    },
    advanced: {
      text: "Please accept my profound appreciation for your exemplary and steadfast support.",
      ipa: "/pliːz əkˈsɛpt maɪ prəˈfaʊnd əˌpriːʃiˈeɪʃən fɔːr jɔːr ɪɡˈzɛmpləri ænd ˈstɛdfæst səˈpɔːrt/",
      note: "Phong cách tri ân đối tác và lãnh đạo trong các thư cảm ơn chuyên nghiệp."
    }
  },
  {
    keywords: /nghĩ sao|bạn thấy thế nào|ý kiến|quan điểm|what do you think|your opinion/i,
    input: "Bạn nghĩ sao về ý tưởng này?",
    basic: {
      text: "What do you think about this idea?",
      ipa: "/wɒt duː juː θɪŋk əˈbaʊt ðɪs aɪˈdɪə/",
      note: "Câu hỏi ý kiến cơ bản."
    },
    natural: {
      text: "What's your take on this? Does that sound good to you?",
      ipa: "/wɒts jɔːr teɪk ɒn ðɪs dʌz ðæt saʊnd ɡʊd tuː juː/",
      note: "'What's your take on this?' là cách hỏi góc nhìn cực kỳ quen thuộc của người bản xứ."
    },
    advanced: {
      text: "I would welcome your analytical critique and strategic evaluation regarding this initiative.",
      ipa: "/aɪ wʊd ˈwɛlkəm jɔːr ˌænəˈlɪtɪkl krɪˈtiːk/",
      note: "Từ ngữ chuyên gia dùng trong thuyết trình dự án và hội đồng quản trị."
    }
  },
  {
    keywords: /hẹn gặp|rủ đi chơi|uống nước|cà phê cuối tuần|hang out|grab coffee|meet up/i,
    input: "Cuối tuần này đi uống cà phê với tôi nhé",
    basic: {
      text: "Do you want to drink coffee with me this weekend?",
      ipa: "/duː juː wɒnt tuː drɪŋk ˈkɒfi wɪð miː ðɪs ˈwiːkɛnd/",
      note: "Dùng 'drink coffee' hơi mang tính dịch nghĩa từng từ."
    },
    natural: {
      text: "Are you free this weekend? Let's grab some coffee and catch up!",
      ipa: "/ɑːr juː friː ðɪs ˈwiːkɛnd lɛts ɡræb sʌm ˈkɒfi ænd kætʃ ʌp/",
      note: "'Grab coffee' và 'catch up' là cặp cụm từ vàng để rủ bạn bè đi cà phê tán gẫu đúng điệu."
    },
    advanced: {
      text: "Should your schedule permit, I would be delighted to convene over coffee this upcoming weekend.",
      ipa: "/ʃʊd jɔːr ˈskɛdʒuːl pərˈmɪt aɪ wʊd biː dɪˈlaɪtɪd tuː kənˈviːn oʊvər ˈkɒfi/",
      note: "Lời mời trang trọng và lịch thiệp gửi cấp trên hoặc đối tác quan trọng."
    }
  },
  {
    keywords: /thời tiết|trời đẹp|trời mưa|nắng|weather|sunny|rainy/i,
    input: "Thời tiết hôm nay đẹp thật đấy",
    basic: {
      text: "The weather today is very nice.",
      ipa: "/ðə ˈwɛðər təˈdeɪ ɪz ˈvɛri naɪs/",
      note: "Câu nhận xét thời tiết cơ bản."
    },
    natural: {
      text: "What gorgeous weather we're having today! It couldn't be nicer.",
      ipa: "/wɒt ˈɡɔːrdʒəs ˈwɛðər wɪər ˈhævɪŋ təˈdeɪ/",
      note: "'What gorgeous weather...' là mẫu câu mở đầu cuộc trò chuyện (small talk) kinh điển của người Anh và Mỹ."
    },
    advanced: {
      text: "The prevailing atmospheric conditions today are remarkably pleasant and invigorating.",
      ipa: "/ðə prɪˈveɪlɪŋ ˌætməsˈfɛrɪk kənˈdɪʃənz/",
      note: "Văn phong học thuật miêu tả thời tiết giàu hình tượng."
    }
  },
  {
    keywords: /tạm biệt|giữ liên lạc|hẹn gặp lại|goodbye|bye|keep in touch/i,
    input: "Tạm biệt và giữ liên lạc nhé",
    basic: {
      text: "Goodbye and keep in touch.",
      ipa: "/ɡʊdˈbaɪ ænd kiːp ɪn tʌtʃ/",
      note: "Lời chào chia tay thông dụng."
    },
    natural: {
      text: "Take care of yourself! Don't be a stranger, let's keep in touch.",
      ipa: "/teɪk kɛər ɒv jɔːrˈsɛlf doʊnt biː ə ˈstreɪndʒər lɛts kiːp ɪn tʌtʃ/",
      note: "Thành ngữ 'Don't be a stranger' (Đừng biến mất nhé / Giữ liên lạc thường xuyên nhé) rất ấm áp."
    },
    advanced: {
      text: "I wish you continued prosperity and look forward to maintaining our collaborative correspondence.",
      ipa: "/aɪ wɪʃ juː kənˈtɪnjuːd prɒsˈpɛrɪti/",
      note: "Văn phong thư từ ngoại giao và kết nối mạng lưới nghề nghiệp cao cấp."
    }
  },
  {
    keywords: /mua vé|đặt vé|vé máy bay|vé xem phim|buy ticket|book ticket/i,
    input: "Tôi muốn mua một vé",
    basic: {
      text: "I want to buy a ticket, please.",
      ipa: "/aɪ wɒnt tuː baɪ ə ˈtɪkɪt pliːz/",
      note: "Dễ hiểu khi mua vé tại quầy."
    },
    natural: {
      text: "I'd like to book a one-way ticket for the next available departure, please.",
      ipa: "/aɪd laɪk tuː bʊk ə wʌn weɪ ˈtɪkɪt fɔːr ðə nɛkst əˈveɪləbl dɪˈpɑːrtʃər/",
      note: "'Next available departure' (chuyến gần nhất còn chỗ) là cách nói chuẩn phòng vé."
    },
    advanced: {
      text: "Could you kindly arrange a prioritized reservation for the upcoming transit schedule?",
      ipa: "/kʊd juː ˈkaɪndli əˈreɪndʒ ə praɪˈɔːrətaɪzd ˌrɛzərˈveɪʃən/",
      note: "Dùng từ trang trọng cho các chuyến công tác cao cấp."
    }
  },
  {
    keywords: /khách sạn|hotel|book phòng|đặt phòng|thuê phòng|phòng nghỉ|room reservation/i,
    input: "Tôi muốn book phòng khách sạn",
    basic: {
      text: "I would like to book a hotel room, please.",
      ipa: "/aɪ wʊd laɪk tuː bʊk ə hoʊˈtɛl ruːm pliːz/",
      note: "Cấu trúc cơ bản 'would like to book' chuẩn xác, rõ ràng khi đặt phòng."
    },
    natural: {
      text: "I'd like to reserve a double room for two nights, please.",
      ipa: "/aɪd laɪk tuː rɪˈzɜːrv ə ˈdʌbl ruːm fɔːr tuː naɪts pliːz/",
      note: "'Reserve a double room' và 'for two nights' là cách người bản xứ giao tiếp tự nhiên tại quầy lễ tân."
    },
    advanced: {
      text: "I wish to inquire about suite availability and secure a reservation for my upcoming stay.",
      ipa: "/aɪ wɪʃ tuː ɪnˈkwaɪər əˈbaʊt swiːt əˌveɪləˈbɪlɪti ænd sɪˈkjʊər ə ˌrɛzərˈveɪʃən/",
      note: "Văn phong học thuật & thương gia cao cấp ('inquire about availability', 'secure a reservation')."
    }
  },
  {
    keywords: /du lịch|điểm du lịch|tham quan|danh lam|thắng cảnh|chỗ chơi|chỗ du lịch|travel|tourist|sightseeing|attractions|destination/i,
    input: "Tôi muốn hỏi các điểm du lịch",
    basic: {
      text: "I would like to ask about popular tourist attractions around here.",
      ipa: "/aɪ wʊd laɪk tuː æsk əˈbaʊt ˈpɒpjʊlər ˈtʊərɪst əˈtrækʃənz əˈraʊnd hɪər/",
      note: "Cấu trúc cơ bản 'would like to ask about' rõ ràng, lịch sự khi hỏi thông tin du lịch."
    },
    natural: {
      text: "Could you recommend some must-see spots and local sights in the area?",
      ipa: "/kʊd juː ˌrɛkəˈmɛnd sʌm mʌst siː spɒts ænd ˈloʊkl saɪts ɪn ðɪ ˈeəriə/",
      note: "Cụm từ 'must-see spots' (những điểm nhất định phải ghé) và 'local sights' rất quen thuộc với khách du lịch bản ngữ."
    },
    advanced: {
      text: "Could you furnish curated recommendations regarding notable cultural landmarks and scenic attractions in this vicinity?",
      ipa: "/kʊd juː ˈfɜːrnɪʃ ˈkjʊəreɪtɪd ˌrɛkəmɛnˈdeɪʃənz rɪˈɡɑːrdɪŋ ˈnoʊtəbl ˈkʌltʃərəl ˈlændmɑːrks/",
      note: "'Curated recommendations' (gợi ý tuyển chọn) và 'scenic attractions in this vicinity' là văn phong cao cấp của hướng dẫn viên chuyên nghiệp."
    }
  },
  {
    keywords: /khám bệnh|bác sĩ|bệnh viện|đau|ốm|sức khỏe|thuốc|khám|chữa bệnh|doctor|hospital|medical|sick|illness|pain|appointment/i,
    input: "Tôi muốn khám bệnh",
    basic: {
      text: "I would like to see a doctor for a medical checkup, please.",
      ipa: "/aɪ wʊd laɪk tuː siː ə ˈdɒktər fɔːr ə ˈmɛdɪkl ˈtʃɛkʌp pliːz/",
      note: "Cấu trúc cơ bản 'would like to see a doctor' rõ ràng, dễ hiểu khi đến cơ sở y tế."
    },
    natural: {
      text: "I'd like to schedule an appointment with a doctor. I haven't been feeling well lately.",
      ipa: "/aɪd laɪk tuː ˈskɛdʒuːl ən əˈpɔɪntmənt wɪð ə ˈdɒktər aɪ hævnt biːn ˈfiːlɪŋ wɛl ˈleɪtli/",
      note: "Cụm 'schedule an appointment' và 'haven't been feeling well' (dạo này thấy không khỏe) chuẩn phong cách giao tiếp bản ngữ tại phòng khám."
    },
    advanced: {
      text: "I wish to arrange a medical consultation with a specialist to diagnose my persistent symptoms.",
      ipa: "/aɪ wɪʃ tuː əˈreɪndʒ ə ˈmɛdɪkl ˌkɒnsəlˈteɪʃən wɪð ə ˈspɛʃəlɪst tuː ˈdaɪəɡnoʊz maɪ pərˈsɪstənt ˈsɪmptəmz/",
      note: "Văn phong y khoa học thuật ('medical consultation with a specialist', 'diagnose persistent symptoms') chuẩn C1 chuyên nghiệp."
    }
  }
];

window.upgradeExpressionOffline = function(inputText) {
  if (!inputText || !inputText.trim()) return null;
  const clean = inputText.trim();

  // 1. Exact or keyword match from curated DB
  for (const item of window.EXPRESSION_UPGRADER_DB) {
    if (item.keywords.test(clean)) {
      return {
        query: clean,
        basic: item.basic,
        natural: item.natural,
        advanced: item.advanced
      };
    }
  }

  // Detect if input is Vietnamese
  const isVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(clean) ||
                       /\b(tôi|bạn|anh|em|muốn|hỏi|đường|làm|ở|đi|ăn|uống|mua|bán|giá|tiền|bao|nhiêu|gì|sao|không|được|xin|chào|cảm|ơn|giúp)\b/i.test(clean);

  // 2. If Vietnamese and no exact keyword, provide smart translated transformation
  if (isVietnamese) {
    // Check specific intent patterns
    const isAskingOrTour = /\b(hỏi|chỉ|tìm|ở đâu|điểm|du lịch|địa điểm|tham quan|chỗ nào)\b/i.test(clean);
    const isDesire = /\b(tôi muốn|muốn|cần|thích|dự định)\b/i.test(clean);
    const isQuestion = /\?$/.test(clean) || /\b(sao|thế nào|bao nhiêu|mấy giờ|có được|không|gì)\b/i.test(clean);

    let basicText, basicIpa, basicNote;
    let naturalText, naturalIpa, naturalNote;
    let advText, advIpa, advNote;

    if (isAskingOrTour) {
      basicText = "Excuse me, I would like to ask for some information and recommendations.";
      basicIpa = "/ɪkˈskjuːz miː aɪ wʊd laɪk tuː æsk fɔːr sʌm ˌɪnfərˈmeɪʃən/";
      basicNote = "Cách mở lời chuẩn chỉnh để hỏi đường, hỏi địa điểm hoặc xin gợi ý thông tin.";

      naturalText = "Could you give me a few pointers on where I should go around here?";
      naturalIpa = "/kʊd juː ɡɪv miː ə fjuː ˈpɔɪntərz ɒn wɛər aɪ ʃʊd ɡoʊ/";
      naturalNote = "Cụm 'give me a few pointers' (cho tôi vài gợi ý/lời khuyên) là cách nói cực kỳ tự nhiên của người bản xứ.";

      advText = "Would you kindly provide some comprehensive guidance and curated insights on this locale?";
      advIpa = "/wʊd juː ˈkaɪndli prəˈvaɪd sʌm ˌkɒmprɪˈhɛnsɪv ˈɡaɪdəns/";
      advNote = "Văn phong học thuật & thương gia sang trọng khi tìm hiểu thông tin chi tiết.";
    } else if (isDesire) {
      basicText = "I would like to carry this out as planned, please.";
      basicIpa = "/aɪ wʊd laɪk tuː ˈkæri ðɪs aʊt æz plænd pliːz/";
      basicNote = "Cấu trúc 'would like to' diễn đạt mong muốn hoặc ý định trang trọng, chuẩn mực.";

      naturalText = "I'm really hoping to make this happen as soon as possible.";
      naturalIpa = "/aɪm ˈrɪəli ˈhoʊpɪŋ tuː meɪk ðɪs ˈhæpən æz suːn æz ˈpɒsəbl/";
      naturalNote = "Cụm 'hoping to make this happen' bày tỏ sự hào hứng và chủ động như người bản ngữ.";

      advText = "My primary objective is to execute this initiative with the utmost efficiency.";
      advIpa = "/maɪ ˈpraɪməri əbˈdʒɛktɪv ɪz tuː ˈɛksɪkjuːt ðɪs ɪˈnɪʃətɪv/";
      advNote = "Văn phong C1 dùng trong môi trường doanh nghiệp và thuyết trình dự án.";
    } else if (isQuestion) {
      basicText = "Excuse me, could you please clarify how this works?";
      basicIpa = "/ɪkˈskjuːz miː kʊd juː pliːz ˈklærɪfaɪ haʊ ðɪs wɜːrks/";
      basicNote = "Dạng câu hỏi thông dụng, lịch sự cơ bản khi cần người khác giải thích.";

      naturalText = "Would you mind shedding some light on this for me?";
      naturalIpa = "/wʊd juː maɪnd ˈʃɛdɪŋ sʌm laɪt ɒn ðɪs fɔːr miː/";
      naturalNote = "Thành ngữ 'shed some light on' (giải thích làm sáng tỏ) giúp câu nói mượt mà, tự nhiên.";

      advText = "I would appreciate your analytical perspective and further elaboration on this matter.";
      advIpa = "/aɪ wʊd əˈpriːʃieɪt jɔːr ˌænəˈlɪtɪkl pərˈspɛktɪv/";
      advNote = "Cấu trúc phản biện cao cấp dùng trong hội nghị và phỏng vấn.";
    } else {
      basicText = "I would like to share my thoughts and perspective on this.";
      basicIpa = "/aɪ wʊd laɪk tuː ʃɛər maɪ θɔːts ænd pərˈspɛktɪv/";
      basicNote = "Mẫu câu cơ bản để bắt đầu chia sẻ ý kiến một cách lịch sự.";

      naturalText = "Here's the way I see it, and I'd love to hear your thoughts too.";
      naturalIpa = "/hɪərz ðə weɪ aɪ siː ɪt ænd aɪd lʌv tuː hɪər jɔːr θɔːts/";
      naturalNote = "Cụm 'Here's the way I see it' là cách đưa ra quan điểm rất duyên dáng và cởi mở.";

      advText = "Allow me to articulate my viewpoint and provide a well-grounded assessment.";
      advIpa = "/əˈlaʊ miː tuː ɑːrˈtɪkjʊleɪt maɪ ˈvjuːpɔɪnt/";
      advNote = "Từ vựng 'articulate' (diễn đạt khúc chiết) và 'well-grounded assessment' chuẩn C2 IELTS.";
    }

    return {
      query: clean,
      basic: { text: basicText, ipa: basicIpa, note: basicNote },
      natural: { text: naturalText, ipa: naturalIpa, note: naturalNote },
      advanced: { text: advText, ipa: advIpa, note: advNote }
    };
  }

  // 3. If English input: upgrade the English sentence cleanly
  const cap = clean.charAt(0).toUpperCase() + clean.slice(1);
  const withoutDot = cap.replace(/[.!?]+$/, '');
  const isQuestion = /\?$/.test(clean) || /^(can|could|would|how|what|where|when|why|is|are|do|does)/i.test(clean);

  if (isQuestion) {
    return {
      query: clean,
      basic: {
        text: withoutDot + "?",
        ipa: "/kæn juː teɪk ə lʊk/",
        note: "Câu hỏi cơ bản, trực tiếp rõ ràng mục đích."
      },
      natural: {
        text: `Would you mind letting me know ${withoutDot.toLowerCase().replace(/^(can|could|would)\s+you\s+/i, '')}?`,
        ipa: "/wʊd juː maɪnd ˈlɛtɪŋ miː noʊ/",
        note: "Mẫu câu 'Would you mind letting me know...' đem lại sắc thái nhã nhặn, tự nhiên."
      },
      advanced: {
        text: `I would be immensely grateful if you could elucidate on ${withoutDot.toLowerCase().replace(/^(can|could|would)\s+you\s+/i, '')}.`,
        ipa: "/aɪ wʊd biː ɪˈmɛnsli ˈɡreɪtfʊl ɪf juː kʊd ɪˈluːsɪdeɪt/",
        note: "Dùng động từ 'elucidate' (làm sáng tỏ) chuẩn phong thái học thuật C1/C2."
      }
    };
  } else {
    return {
      query: clean,
      basic: {
        text: `${withoutDot}.`,
        ipa: "/aɪ wʊd laɪk tuː/",
        note: "Cấu trúc cơ bản, diễn đạt vừa đủ ý."
      },
      natural: {
        text: `To be frank, I'd definitely say that ${withoutDot.charAt(0).toLowerCase() + withoutDot.slice(1)}.`,
        ipa: "/tuː biː fræŋk aɪd ˈdɛfɪnətli seɪ ðæt/",
        note: "Thêm liên từ 'To be frank, I'd definitely say that...' giúp câu nói lưu loát chuẩn bản xứ."
      },
      advanced: {
        text: `From an analytical standpoint, it is evident that ${withoutDot.charAt(0).toLowerCase() + withoutDot.slice(1)}.`,
        ipa: "/frɒm ən ˌænəˈlɪtɪkl ˈstændpɔɪnt ɪt ɪz ˈɛvɪdənt/",
        note: "Cụm 'From an analytical standpoint' chuẩn phong thái học thuật C1."
      }
    };
  }
};


