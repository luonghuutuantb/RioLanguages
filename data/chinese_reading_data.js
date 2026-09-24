/**
 * =========================================================================
 * Rio Chinese - Du Lieu Doc Hieu (chinese_reading_data.js)
 * 12 doan van doc hieu HSK 1-3 kem cau hoi trac nghiem
 * =========================================================================
 */
window.CHINESE_READING_DATA = [
  {
    id: "rd_001", level: "HSK1", topic: "Gia dinh",
    title: "我的家人",
    titleVi: "Gia đình tôi",
    text: [
      { cn: "我叫小明，今年八岁。", pinyin: "Wǒ jiào Xiǎomíng, jīnnián bā suì.", vi: "Tôi tên là Tiểu Minh, năm nay tám tuổi." },
      { cn: "我有一个爸爸、一个妈妈和一个妹妹。", pinyin: "Wǒ yǒu yí gè bàba, yí gè māma hé yí gè mèimei.", vi: "Tôi có một người bố, một người mẹ và một người em gái." },
      { cn: "我们住在北京。", pinyin: "Wǒmen zhù zài Běijīng.", vi: "Chúng tôi sống ở Bắc Kinh." },
      { cn: "爸爸是医生，妈妈是老师。", pinyin: "Bàba shì yīshēng, māma shì lǎoshī.", vi: "Bố là bác sĩ, mẹ là giáo viên." },
      { cn: "我很爱我的家人。", pinyin: "Wǒ hěn ài wǒ de jiārén.", vi: "Tôi rất yêu gia đình tôi." }
    ],
    questions: [
      { q: "小明今年几岁？", qVi: "Tiểu Minh năm nay bao nhiêu tuổi?", options: ["六岁", "八岁", "十岁", "五岁"], optVi: ["6 tuổi", "8 tuổi", "10 tuổi", "5 tuổi"], answer: 1 },
      { q: "他们住在哪里？", qVi: "Họ sống ở đâu?", options: ["上海", "广州", "北京", "成都"], optVi: ["Thượng Hải", "Quảng Châu", "Bắc Kinh", "Thành Đô"], answer: 2 },
      { q: "妈妈是什么职业？", qVi: "Mẹ làm nghề gì?", options: ["医生", "老师", "护士", "工程师"], optVi: ["Bác sĩ", "Giáo viên", "Y tá", "Kỹ sư"], answer: 1 },
      { q: "小明有几个兄弟姐妹？", qVi: "Tiểu Minh có mấy anh chị em?", options: ["没有", "一个哥哥", "一个妹妹", "两个妹妹"], optVi: ["Không có", "Một anh trai", "Một em gái", "Hai em gái"], answer: 2 }
    ]
  },
  {
    id: "rd_002", level: "HSK1", topic: "An uong",
    title: "我喜欢吃什么",
    titleVi: "Tôi thích ăn gì",
    text: [
      { cn: "我叫小红，我很喜欢吃东西。", pinyin: "Wǒ jiào Xiǎohóng, wǒ hěn xǐhuān chī dōngxi.", vi: "Tôi tên Tiểu Hồng, tôi rất thích ăn uống." },
      { cn: "我最喜欢吃米饭和饺子。", pinyin: "Wǒ zuì xǐhuān chī mǐfàn hé jiǎozi.", vi: "Tôi thích nhất là ăn cơm và bánh sủi cảo." },
      { cn: "我不喜欢吃辣的食物。", pinyin: "Wǒ bù xǐhuān chī là de shíwù.", vi: "Tôi không thích ăn đồ cay." },
      { cn: "每天早上，我喝牛奶、吃面包。", pinyin: "Měitiān zǎoshang, wǒ hē niúnǎi, chī miànbāo.", vi: "Mỗi buổi sáng, tôi uống sữa và ăn bánh mì." },
      { cn: "我很喜欢喝绿茶。", pinyin: "Wǒ hěn xǐhuān hē lǜchá.", vi: "Tôi rất thích uống trà xanh." }
    ],
    questions: [
      { q: "小红最喜欢吃什么？", qVi: "Tiểu Hồng thích ăn gì nhất?", options: ["面条", "米饭和饺子", "包子", "面包"], optVi: ["Mì", "Cơm và bánh sủi cảo", "Bánh bao", "Bánh mì"], answer: 1 },
      { q: "她不喜欢吃什么？", qVi: "Cô ấy không thích ăn gì?", options: ["甜的", "辣的", "咸的", "酸的"], optVi: ["Ngọt", "Cay", "Mặn", "Chua"], answer: 1 },
      { q: "她早上喝什么？", qVi: "Buổi sáng cô ấy uống gì?", options: ["咖啡", "果汁", "牛奶", "豆浆"], optVi: ["Cà phê", "Nước ép", "Sữa", "Sữa đậu nành"], answer: 2 },
      { q: "她喜欢喝什么茶？", qVi: "Cô ấy thích uống trà gì?", options: ["红茶", "花茶", "绿茶", "菊花茶"], optVi: ["Trà đen", "Trà hoa", "Trà xanh", "Trà cúc"], answer: 2 }
    ]
  },
  {
    id: "rd_003", level: "HSK1", topic: "Hoc tap",
    title: "我的学校",
    titleVi: "Trường học của tôi",
    text: [
      { cn: "我在北京第一小学读书。", pinyin: "Wǒ zài Běijīng dì yī xiǎoxué dúshū.", vi: "Tôi học ở Trường Tiểu học số 1 Bắc Kinh." },
      { cn: "我们学校很大，有五百个学生。", pinyin: "Wǒmen xuéxiào hěn dà, yǒu wǔbǎi gè xuésheng.", vi: "Trường tôi rất lớn, có năm trăm học sinh." },
      { cn: "我喜欢数学和语文。", pinyin: "Wǒ xǐhuān shùxué hé yǔwén.", vi: "Tôi thích toán học và ngữ văn." },
      { cn: "我的老师叫李老师，她非常好。", pinyin: "Wǒ de lǎoshī jiào Lǐ lǎoshī, tā fēicháng hǎo.", vi: "Giáo viên của tôi tên cô Lý, cô ấy rất tốt bụng." },
      { cn: "每天下午三点半，我们放学回家。", pinyin: "Měitiān xiàwǔ sān diǎn bàn, wǒmen fàngxué huí jiā.", vi: "Mỗi ngày 3 giờ rưỡi chiều, chúng tôi tan học về nhà." }
    ],
    questions: [
      { q: "学校有多少个学生？", qVi: "Trường có bao nhiêu học sinh?", options: ["一百", "三百", "五百", "八百"], optVi: ["100", "300", "500", "800"], answer: 2 },
      { q: "他喜欢什么科目？", qVi: "Em ấy thích môn gì?", options: ["历史和地理", "音乐和美术", "数学和语文", "英语和科学"], optVi: ["Lịch sử & Địa lý", "Âm nhạc & Mỹ thuật", "Toán & Ngữ văn", "Tiếng Anh & Khoa học"], answer: 2 },
      { q: "几点放学？", qVi: "Mấy giờ tan học?", options: ["下午两点", "下午三点", "下午三点半", "下午四点"], optVi: ["2h chiều", "3h chiều", "3h30 chiều", "4h chiều"], answer: 2 },
      { q: "老师姓什么？", qVi: "Giáo viên họ gì?", options: ["王", "张", "李", "刘"], optVi: ["Họ Vương", "Họ Trương", "Họ Lý", "Họ Lưu"], answer: 2 }
    ]
  },
  {
    id: "rd_004", level: "HSK2", topic: "Cong viec",
    title: "我的工作",
    titleVi: "Công việc của tôi",
    text: [
      { cn: "我是一名软件工程师，在一家大公司工作。", pinyin: "Wǒ shì yī míng ruǎnjiàn gōngchéngshī, zài yī jiā dà gōngsī gōngzuò.", vi: "Tôi là kỹ sư phần mềm, làm việc ở một công ty lớn." },
      { cn: "我每天早上八点上班，下午六点下班。", pinyin: "Wǒ měitiān zǎoshang bā diǎn shàngbān, xiàwǔ liù diǎn xiàbān.", vi: "Mỗi ngày tôi đi làm lúc 8 giờ sáng, tan làm lúc 6 giờ chiều." },
      { cn: "我的工作是开发手机应用程序。", pinyin: "Wǒ de gōngzuò shì kāifā shǒujī yìngyòng chéngxù.", vi: "Công việc của tôi là phát triển ứng dụng điện thoại." },
      { cn: "我很喜欢我的工作，因为很有挑战性。", pinyin: "Wǒ hěn xǐhuān wǒ de gōngzuò, yīnwèi hěn yǒu tiǎozhànxìng.", vi: "Tôi rất thích công việc của mình vì nó rất thử thách." },
      { cn: "虽然有时候很忙，但我还是很快乐。", pinyin: "Suīrán yǒu shíhòu hěn máng, dàn wǒ háishi hěn kuàilè.", vi: "Mặc dù đôi khi rất bận, nhưng tôi vẫn rất vui vẻ." }
    ],
    questions: [
      { q: "他是做什么工作的？", qVi: "Anh ấy làm nghề gì?", options: ["医生", "老师", "软件工程师", "设计师"], optVi: ["Bác sĩ", "Giáo viên", "Kỹ sư phần mềm", "Nhà thiết kế"], answer: 2 },
      { q: "他几点上班？", qVi: "Anh ấy mấy giờ đi làm?", options: ["七点", "八点", "九点", "十点"], optVi: ["7 giờ", "8 giờ", "9 giờ", "10 giờ"], answer: 1 },
      { q: "他的工作是什么？", qVi: "Công việc của anh ấy là gì?", options: ["做饭", "写文章", "开发应用程序", "教学生"], optVi: ["Nấu ăn", "Viết bài", "Phát triển ứng dụng", "Dạy học sinh"], answer: 2 },
      { q: "他为什么喜欢工作？", qVi: "Tại sao anh ấy thích công việc?", options: ["因为钱多", "因为有挑战性", "因为离家近", "因为同事好"], optVi: ["Vì lương cao", "Vì thử thách", "Vì gần nhà", "Vì đồng nghiệp tốt"], answer: 1 }
    ]
  },
  {
    id: "rd_005", level: "HSK2", topic: "Du lich",
    title: "去上海旅游",
    titleVi: "Du lịch Thượng Hải",
    text: [
      { cn: "上个月，我和朋友一起去上海旅游。", pinyin: "Shàng gè yuè, wǒ hé péngyou yīqǐ qù Shànghǎi lǚyóu.", vi: "Tháng trước, tôi và bạn cùng nhau đi du lịch Thượng Hải." },
      { cn: "我们坐高铁去，只用了两个小时。", pinyin: "Wǒmen zuò gāotiě qù, zhǐ yòng le liǎng gè xiǎoshí.", vi: "Chúng tôi đi tàu cao tốc, chỉ mất hai tiếng đồng hồ." },
      { cn: "上海非常繁华，到处都是高楼大厦。", pinyin: "Shànghǎi fēicháng fánhuá, dàochù dōu shì gāolóu dàshà.", vi: "Thượng Hải rất sầm uất, khắp nơi đều là tòa nhà cao tầng." },
      { cn: "我们去了外滩，看了东方明珠。", pinyin: "Wǒmen qù le Wàitān, kàn le Dōngfāng Míngzhū.", vi: "Chúng tôi đã đến Bến Thượng Hải, ngắm Tháp Đông Phương Minh Châu." },
      { cn: "晚上，我们吃了很多好吃的海鲜。", pinyin: "Wǎnshang, wǒmen chī le hěn duō hǎochī de hǎixiān.", vi: "Buổi tối, chúng tôi ăn rất nhiều hải sản ngon." }
    ],
    questions: [
      { q: "他们怎么去上海？", qVi: "Họ đi đến Thượng Hải bằng gì?", options: ["飞机", "汽车", "高铁", "轮船"], optVi: ["Máy bay", "Ô tô", "Tàu cao tốc", "Tàu thủy"], answer: 2 },
      { q: "去上海用了多长时间？", qVi: "Đi mất bao lâu?", options: ["一个小时", "两个小时", "三个小时", "四个小时"], optVi: ["1 tiếng", "2 tiếng", "3 tiếng", "4 tiếng"], answer: 1 },
      { q: "他们去了哪些地方？", qVi: "Họ đã đến những nơi nào?", options: ["长城", "外滩和东方明珠", "故宫", "西湖"], optVi: ["Vạn Lý Trường Thành", "Bến Thượng Hải & Tháp Đông Phương", "Cố Cung", "Tây Hồ"], answer: 1 },
      { q: "他们晚上吃了什么？", qVi: "Buổi tối họ ăn gì?", options: ["北京烤鸭", "火锅", "海鲜", "饺子"], optVi: ["Vịt quay Bắc Kinh", "Lẩu", "Hải sản", "Sủi cảo"], answer: 2 }
    ]
  },
  {
    id: "rd_006", level: "HSK2", topic: "Suc khoe",
    title: "保持健康",
    titleVi: "Giữ gìn sức khỏe",
    text: [
      { cn: "健康是最重要的事情。", pinyin: "Jiànkāng shì zuì zhòngyào de shìqing.", vi: "Sức khỏe là điều quan trọng nhất." },
      { cn: "为了保持健康，我每天早上跑步三十分钟。", pinyin: "Wèile bǎochí jiànkāng, wǒ měitiān zǎoshang pǎobù sānshí fēnzhōng.", vi: "Để giữ gìn sức khỏe, mỗi sáng tôi chạy bộ 30 phút." },
      { cn: "我也注意饮食，多吃蔬菜和水果，少吃油腻的食物。", pinyin: "Wǒ yě zhùyì yǐnshí, duō chī shūcài hé shuǐguǒ, shǎo chī yóunì de shíwù.", vi: "Tôi cũng chú ý ăn uống, ăn nhiều rau và trái cây, ít ăn đồ béo." },
      { cn: "每天睡八个小时对健康很重要。", pinyin: "Měitiān shuì bā gè xiǎoshí duì jiànkāng hěn zhòngyào.", vi: "Ngủ 8 tiếng mỗi ngày rất quan trọng cho sức khỏe." },
      { cn: "我不抽烟也不喝酒。", pinyin: "Wǒ bù chōuyān yě bù hējiǔ.", vi: "Tôi không hút thuốc và không uống rượu." }
    ],
    questions: [
      { q: "他每天跑步多长时间？", qVi: "Anh ấy chạy bộ bao lâu mỗi ngày?", options: ["十分钟", "二十分钟", "三十分钟", "一个小时"], optVi: ["10 phút", "20 phút", "30 phút", "1 tiếng"], answer: 2 },
      { q: "他喜欢吃什么？", qVi: "Anh ấy thích ăn gì?", options: ["油腻的食物", "蔬菜和水果", "肉类", "甜食"], optVi: ["Đồ béo", "Rau và trái cây", "Thịt", "Đồ ngọt"], answer: 1 },
      { q: "他每天睡几个小时？", qVi: "Anh ấy ngủ mấy tiếng mỗi ngày?", options: ["六个小时", "七个小时", "八个小时", "九个小时"], optVi: ["6 tiếng", "7 tiếng", "8 tiếng", "9 tiếng"], answer: 2 },
      { q: "他抽烟吗？", qVi: "Anh ấy có hút thuốc không?", options: ["抽烟", "不抽烟", "有时候抽", "戒烟了"], optVi: ["Có hút", "Không hút", "Đôi khi hút", "Đã bỏ"], answer: 1 }
    ]
  },
  {
    id: "rd_007", level: "HSK2", topic: "Mua sam",
    title: "周末购物",
    titleVi: "Mua sắm cuối tuần",
    text: [
      { cn: "这个周末，我去商场买东西。", pinyin: "Zhège zhōumò, wǒ qù shāngchǎng mǎi dōngxi.", vi: "Cuối tuần này, tôi đi trung tâm thương mại mua đồ." },
      { cn: "我需要买一件新衬衫和一双鞋子。", pinyin: "Wǒ xūyào mǎi yī jiàn xīn chènshān hé yī shuāng xiézi.", vi: "Tôi cần mua một chiếc áo sơ mi mới và một đôi giày." },
      { cn: "衬衫要二百块，鞋子要三百八十块。", pinyin: "Chènshān yào liǎngbǎi kuài, xiézi yào sānbǎi bāshí kuài.", vi: "Áo sơ mi giá 200 tệ, giày giá 380 tệ." },
      { cn: "我觉得太贵了，就和老板讲价。", pinyin: "Wǒ juéde tài guì le, jiù hé lǎobǎn jiǎngjià.", vi: "Tôi thấy quá đắt, liền mặc cả với chủ hàng." },
      { cn: "最后，我花了五百块买了这两件东西。", pinyin: "Zuìhòu, wǒ huā le wǔbǎi kuài mǎi le zhè liǎng jiàn dōngxi.", vi: "Cuối cùng, tôi bỏ ra 500 tệ mua được hai thứ này." }
    ],
    questions: [
      { q: "他买了什么？", qVi: "Anh ấy mua gì?", options: ["裤子和帽子", "衬衫和鞋子", "外套和包", "T恤和袜子"], optVi: ["Quần và mũ", "Áo sơ mi và giày", "Áo khoác và túi", "Áo phông và tất"], answer: 1 },
      { q: "衬衫多少钱？", qVi: "Áo sơ mi giá bao nhiêu?", options: ["一百块", "两百块", "三百块", "五百块"], optVi: ["100 tệ", "200 tệ", "300 tệ", "500 tệ"], answer: 1 },
      { q: "他为什么要讲价？", qVi: "Tại sao anh ấy mặc cả?", options: ["因为没钱", "因为太贵了", "因为质量不好", "因为不需要"], optVi: ["Vì không có tiền", "Vì quá đắt", "Vì chất lượng kém", "Vì không cần"], answer: 1 },
      { q: "他最终花了多少钱？", qVi: "Cuối cùng anh ấy tiêu bao nhiêu tiền?", options: ["三百块", "四百块", "五百块", "六百块"], optVi: ["300 tệ", "400 tệ", "500 tệ", "600 tệ"], answer: 2 }
    ]
  },
  {
    id: "rd_008", level: "HSK3", topic: "Moi truong",
    title: "保护环境",
    titleVi: "Bảo vệ môi trường",
    text: [
      { cn: "环境污染是当今世界面临的重大问题之一。", pinyin: "Huánjìng wūrǎn shì dāngjīn shìjiè miànlín de zhòngdà wèntí zhī yī.", vi: "Ô nhiễm môi trường là một trong những vấn đề lớn thế giới đang đối mặt hiện nay." },
      { cn: "工厂排放的废气和废水污染了空气和河流。", pinyin: "Gōngchǎng páifàng de fèiqì hé fèishuǐ wūrǎn le kōngqì hé héliú.", vi: "Khí thải và nước thải từ nhà máy làm ô nhiễm không khí và sông ngòi." },
      { cn: "为了保护环境，我们应该减少使用一次性塑料产品。", pinyin: "Wèile bǎohù huánjìng, wǒmen yīnggāi jiǎnshǎo shǐyòng yīcìxìng sùliào chǎnpǐn.", vi: "Để bảo vệ môi trường, chúng ta nên giảm sử dụng sản phẩm nhựa dùng một lần." },
      { cn: "垃圾分类也是保护环境的重要方式。", pinyin: "Lājī fēnlèi yě shì bǎohù huánjìng de zhòngyào fāngshì.", vi: "Phân loại rác thải cũng là cách quan trọng để bảo vệ môi trường." },
      { cn: "每个人都应该为保护地球贡献自己的力量。", pinyin: "Měi gè rén dōu yīnggāi wèi bǎohù dìqiú gòngxiàn zìjǐ de lìliàng.", vi: "Mỗi người đều nên đóng góp sức mình để bảo vệ Trái Đất." }
    ],
    questions: [
      { q: "文章的主题是什么？", qVi: "Chủ đề bài đọc là gì?", options: ["城市发展", "保护环境", "科技进步", "经济增长"], optVi: ["Phát triển đô thị", "Bảo vệ môi trường", "Tiến bộ công nghệ", "Tăng trưởng kinh tế"], answer: 1 },
      { q: "工厂造成了什么问题？", qVi: "Nhà máy gây ra vấn đề gì?", options: ["交通拥堵", "空气和河流污染", "噪音污染", "土地减少"], optVi: ["Tắc đường", "Ô nhiễm không khí và sông", "Ô nhiễm tiếng ồn", "Giảm diện tích đất"], answer: 1 },
      { q: "我们应该怎么做？", qVi: "Chúng ta nên làm gì?", options: ["多开车", "减少塑料产品", "增加工厂", "不管环境"], optVi: ["Lái xe nhiều hơn", "Giảm sản phẩm nhựa", "Tăng nhà máy", "Không quan tâm"], answer: 1 },
      { q: "垃圾分类的目的是什么？", qVi: "Mục đích của phân loại rác là gì?", options: ["节约时间", "保护环境", "增加收入", "减少工作"], optVi: ["Tiết kiệm thời gian", "Bảo vệ môi trường", "Tăng thu nhập", "Giảm công việc"], answer: 1 }
    ]
  },
  {
    id: "rd_009", level: "HSK3", topic: "Cong nghe",
    title: "科技改变生活",
    titleVi: "Công nghệ thay đổi cuộc sống",
    text: [
      { cn: "随着科技的发展，我们的生活发生了很大的变化。", pinyin: "Suízhe kējì de fāzhǎn, wǒmen de shēnghuó fāshēng le hěn dà de biànhuà.", vi: "Cùng với sự phát triển của công nghệ, cuộc sống của chúng ta đã có nhiều thay đổi lớn." },
      { cn: "智能手机让我们随时随地可以联系亲友。", pinyin: "Zhìnéng shǒujī ràng wǒmen suíshí suídì kěyǐ liánxì qīnyǒu.", vi: "Điện thoại thông minh giúp chúng ta có thể liên lạc với người thân, bạn bè bất cứ lúc nào, bất cứ nơi đâu." },
      { cn: "网上购物既方便又省时间。", pinyin: "Wǎngshàng gòuwù jì fāngbiàn yòu shěng shíjiān.", vi: "Mua sắm trực tuyến vừa tiện lợi vừa tiết kiệm thời gian." },
      { cn: "但是，科技也带来了一些问题，比如网络安全和隐私保护。", pinyin: "Dànshì, kējì yě dàilái le yīxiē wèntí, bǐrú wǎngluò ānquán hé yǐnsī bǎohù.", vi: "Tuy nhiên, công nghệ cũng mang lại một số vấn đề, chẳng hạn như an ninh mạng và bảo vệ quyền riêng tư." },
      { cn: "总的来说，科技对我们的生活利大于弊。", pinyin: "Zǒng de lái shuō, kējì duì wǒmen de shēnghuó lì dà yú bì.", vi: "Nhìn chung, công nghệ mang lại nhiều lợi ích hơn hại cho cuộc sống của chúng ta." }
    ],
    questions: [
      { q: "智能手机有什么好处？", qVi: "Điện thoại thông minh có lợi ích gì?", options: ["可以随时联系亲友", "可以看电影", "可以玩游戏", "可以听音乐"], optVi: ["Liên lạc bất cứ lúc nào", "Xem phim", "Chơi game", "Nghe nhạc"], answer: 0 },
      { q: "网上购物有什么优点？", qVi: "Mua sắm online có ưu điểm gì?", options: ["价格便宜", "质量好", "方便省时", "选择多"], optVi: ["Giá rẻ", "Chất lượng tốt", "Tiện lợi tiết kiệm thời gian", "Nhiều lựa chọn"], answer: 2 },
      { q: "科技带来了哪些问题？", qVi: "Công nghệ mang lại vấn đề gì?", options: ["交通问题", "网络安全和隐私", "环境污染", "健康问题"], optVi: ["Vấn đề giao thông", "An ninh mạng và quyền riêng tư", "Ô nhiễm môi trường", "Vấn đề sức khỏe"], answer: 1 },
      { q: "作者对科技的总体态度是？", qVi: "Thái độ chung của tác giả về công nghệ là gì?", options: ["完全反对", "完全支持", "利大于弊", "弊大于利"], optVi: ["Hoàn toàn phản đối", "Hoàn toàn ủng hộ", "Lợi nhiều hơn hại", "Hại nhiều hơn lợi"], answer: 2 }
    ]
  },
  {
    id: "rd_010", level: "HSK3", topic: "Van hoa",
    title: "中国传统节日",
    titleVi: "Lễ hội truyền thống Trung Quốc",
    text: [
      { cn: "中国有很多传统节日，其中最重要的是春节。", pinyin: "Zhōngguó yǒu hěn duō chuántǒng jiérì, qízhōng zuì zhòngyào de shì Chūnjié.", vi: "Trung Quốc có nhiều lễ hội truyền thống, trong đó quan trọng nhất là Tết Nguyên Đán." },
      { cn: "春节是农历正月初一，人们会放鞭炮、贴春联、包饺子。", pinyin: "Chūnjié shì nónglì zhēngyuè chū yī, rénmen huì fàng biānpào, tiē chūnlián, bāo jiǎozi.", vi: "Tết Nguyên Đán là ngày mồng một tháng giêng âm lịch, mọi người sẽ đốt pháo, dán câu đối đỏ, làm sủi cảo." },
      { cn: "中秋节是农历八月十五，人们吃月饼、赏月。", pinyin: "Zhōngqiūjié shì nónglì bā yuè shíwǔ, rénmen chī yuèbǐng, shǎng yuè.", vi: "Tết Trung Thu là ngày 15 tháng 8 âm lịch, mọi người ăn bánh trung thu, ngắm trăng." },
      { cn: "端午节时，人们吃粽子、赛龙舟。", pinyin: "Duānwǔjié shí, rénmen chī zòngzi, sài lóngzhōu.", vi: "Trong Tết Đoan Ngọ, mọi người ăn bánh ú lá, đua thuyền rồng." },
      { cn: "这些传统节日体现了中华文化的深厚底蕴。", pinyin: "Zhèxiē chuántǒng jiérì tǐxiàn le Zhōnghuá wénhuà de shēnhòu dǐyùn.", vi: "Những lễ hội truyền thống này thể hiện nền tảng văn hóa sâu sắc của Trung Hoa." }
    ],
    questions: [
      { q: "中国最重要的节日是？", qVi: "Lễ hội quan trọng nhất của Trung Quốc là?", options: ["中秋节", "端午节", "春节", "元宵节"], optVi: ["Tết Trung Thu", "Tết Đoan Ngọ", "Tết Nguyên Đán", "Rằm tháng Giêng"], answer: 2 },
      { q: "春节时人们做什么？", qVi: "Trong dịp Tết Nguyên Đán mọi người làm gì?", options: ["吃月饼", "赛龙舟", "放鞭炮贴春联", "看花灯"], optVi: ["Ăn bánh trung thu", "Đua thuyền rồng", "Đốt pháo dán câu đối", "Xem đèn lồng"], answer: 2 },
      { q: "中秋节是什么时候？", qVi: "Tết Trung Thu là khi nào?", options: ["正月初一", "五月初五", "七月七日", "八月十五"], optVi: ["Mồng 1/1 âm", "Mồng 5/5 âm", "Mồng 7/7 âm", "Rằm 8/8 âm"], answer: 3 },
      { q: "端午节人们吃什么？", qVi: "Trong Tết Đoan Ngọ mọi người ăn gì?", options: ["月饼", "汤圆", "粽子", "饺子"], optVi: ["Bánh trung thu", "Bánh trôi", "Bánh ú lá", "Sủi cảo"], answer: 2 }
    ]
  },
  {
    id: "rd_011", level: "HSK3", topic: "Giao duc",
    title: "学习外语的好处",
    titleVi: "Lợi ích của việc học ngoại ngữ",
    text: [
      { cn: "在全球化的今天，学习外语变得越来越重要。", pinyin: "Zài quánqiúhuà de jīntiān, xuéxí wàiyǔ biàn de yuèláiyuè zhòngyào.", vi: "Trong thời đại toàn cầu hóa ngày nay, học ngoại ngữ ngày càng trở nên quan trọng hơn." },
      { cn: "学外语可以帮助我们了解不同的文化和思维方式。", pinyin: "Xué wàiyǔ kěyǐ bāngzhù wǒmen liǎojiě bùtóng de wénhuà hé sīwéi fāngshì.", vi: "Học ngoại ngữ có thể giúp chúng ta hiểu về các nền văn hóa và cách tư duy khác nhau." },
      { cn: "掌握外语也能提高工作竞争力。", pinyin: "Zhǎngwò wàiyǔ yě néng tígāo gōngzuò jìngzhēnglì.", vi: "Thành thạo ngoại ngữ cũng có thể nâng cao khả năng cạnh tranh trong công việc." },
      { cn: "研究表明，学习外语还能训练大脑，提高记忆力。", pinyin: "Yánjiū biǎomíng, xuéxí wàiyǔ hái néng xùnliàn dànǎo, tígāo jìyìlì.", vi: "Nghiên cứu cho thấy, học ngoại ngữ còn có thể rèn luyện não bộ, cải thiện trí nhớ." },
      { cn: "因此，我建议大家从小开始学习外语。", pinyin: "Yīncǐ, wǒ jiànyì dàjiā cóng xiǎo kāishǐ xuéxí wàiyǔ.", vi: "Vì vậy, tôi khuyên mọi người nên bắt đầu học ngoại ngữ từ nhỏ." }
    ],
    questions: [
      { q: "学外语有什么好处？", qVi: "Học ngoại ngữ có lợi ích gì?", options: ["只是为了旅游", "了解文化和提高竞争力", "只是为了看电影", "没有好处"], optVi: ["Chỉ để du lịch", "Hiểu văn hóa và tăng cạnh tranh", "Chỉ để xem phim", "Không có lợi ích"], answer: 1 },
      { q: "研究表明学外语能做什么？", qVi: "Nghiên cứu cho thấy học ngoại ngữ có thể làm gì?", options: ["减肥", "训练大脑提高记忆力", "增加收入", "交更多朋友"], optVi: ["Giảm cân", "Rèn luyện não bộ cải thiện trí nhớ", "Tăng thu nhập", "Kết bạn nhiều hơn"], answer: 1 },
      { q: "作者建议什么时候开始学外语？", qVi: "Tác giả khuyên nên bắt đầu học ngoại ngữ khi nào?", options: ["大学时", "工作后", "从小开始", "退休后"], optVi: ["Khi học đại học", "Sau khi đi làm", "Từ nhỏ", "Sau khi về hưu"], answer: 2 },
      { q: "全球化指的是什么趋势？", qVi: "'Toàn cầu hóa' chỉ xu hướng gì?", options: ["更多战争", "世界联系更紧密", "环境更糟糕", "人口增加"], optVi: ["Nhiều chiến tranh hơn", "Thế giới kết nối chặt hơn", "Môi trường xấu hơn", "Dân số tăng"], answer: 1 }
    ]
  },
  {
    id: "rd_012", level: "HSK3", topic: "Xa hoi",
    title: "城市化的利与弊",
    titleVi: "Lợi và hại của đô thị hóa",
    text: [
      { cn: "近年来，越来越多的人从农村搬到城市生活。", pinyin: "Jìn nián lái, yuèláiyuè duō de rén cóng nóngcūn bān dào chéngshì shēnghuó.", vi: "Những năm gần đây, ngày càng nhiều người chuyển từ nông thôn ra thành phố sinh sống." },
      { cn: "城市提供了更多的工作机会和更好的教育资源。", pinyin: "Chéngshì tígōng le gèng duō de gōngzuò jīhuì hé gèng hǎo de jiàoyù zīyuán.", vi: "Thành phố mang lại nhiều cơ hội việc làm hơn và nguồn lực giáo dục tốt hơn." },
      { cn: "但是，城市化也带来了交通拥堵和住房紧张的问题。", pinyin: "Dànshì, chéngshìhuà yě dàilái le jiāotōng yōngdǔ hé zhùfáng jǐnzhāng de wèntí.", vi: "Tuy nhiên, đô thị hóa cũng mang lại vấn đề tắc đường và khan hiếm nhà ở." },
      { cn: "农村劳动力减少，导致农业发展受到影响。", pinyin: "Nóngcūn láodònglì jiǎnshǎo, dǎozhì nóngyè fāzhǎn shòudào yǐngxiǎng.", vi: "Lực lượng lao động nông thôn giảm, khiến sự phát triển nông nghiệp bị ảnh hưởng." },
      { cn: "因此，政府需要制定合理的政策来解决这些问题。", pinyin: "Yīncǐ, zhèngfǔ xūyào zhìdìng hélǐ de zhèngcè lái jiějué zhèxiē wèntí.", vi: "Vì vậy, chính phủ cần đề ra các chính sách hợp lý để giải quyết những vấn đề này." }
    ],
    questions: [
      { q: "城市化的好处是什么？", qVi: "Lợi ích của đô thị hóa là gì?", options: ["环境更好", "工作机会和教育资源更好", "物价更低", "生活压力小"], optVi: ["Môi trường tốt hơn", "Nhiều việc làm và giáo dục tốt hơn", "Giá cả thấp hơn", "Áp lực sống nhỏ hơn"], answer: 1 },
      { q: "城市化带来了什么问题？", qVi: "Đô thị hóa mang lại vấn đề gì?", options: ["人口减少", "交通拥堵和住房紧张", "工作减少", "文化消失"], optVi: ["Dân số giảm", "Tắc đường và khan hiếm nhà ở", "Việc làm giảm", "Văn hóa biến mất"], answer: 1 },
      { q: "农村出现了什么问题？", qVi: "Nông thôn gặp vấn đề gì?", options: ["污染增加", "教育差", "劳动力减少", "洪水频繁"], optVi: ["Ô nhiễm tăng", "Giáo dục kém", "Lực lượng lao động giảm", "Lũ lụt thường xuyên"], answer: 2 },
      { q: "谁应该解决这些问题？", qVi: "Ai nên giải quyết những vấn đề này?", options: ["个人", "企业", "政府", "学校"], optVi: ["Cá nhân", "Doanh nghiệp", "Chính phủ", "Trường học"], answer: 2 }
    ]
  }
];
