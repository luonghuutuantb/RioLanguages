// =========================================================================
// CHINESE ROLEPLAY SCENARIOS (KỊCH BẢN NHẬP VAI TIẾNG TRUNG THỰC TẾ)
// =========================================================================

window.ZH_ROLEPLAY_SCENARIOS = [
  {
    id: 'zh_taxi',
    title: 'Bắt Taxi Ở Bắc Kinh',
    titleCn: '在北京搭出租车',
    partnerName: 'Lão Vương (Tài xế taxi Bắc Kinh)',
    partnerRole: '出租车司机',
    avatar: '🚕',
    badge: 'Di chuyển & Giao thông',
    level: 'HSK 1 - 2',
    location: 'Sân bay Thủ Đô → Cố Cung (Tử Cấm Thành)',
    situationDesc: 'Bạn vừa đáp xuống sân bay Bắc Kinh và lên một chiếc taxi màu vàng truyền thống. Hãy trao đổi với tài xế Lão Vương về điểm đến, hỏi đường đi, hỏi thời gian và thanh toán cước xe.',
    greeting: {
      cn: '您好！欢迎来北京。请问您要去哪里？',
      pinyin: 'Nǐ hǎo! Huānyíng lái Běijīng. Qǐngwèn nín yào qù nǎlǐ?',
      vi: 'Xin chào! Chào mừng đến Bắc Kinh. Xin hỏi bạn muốn đi đâu ạ?'
    },
    prompt: 'You are Lao Wang (老王), an experienced, friendly Beijing taxi driver with a slight Beijing accent (儿化音). Keep answers short, helpful, and natural (1-3 sentences in Chinese with pinyin and Vietnamese meaning).',
    objectives: [
      { id: 'obj_dest', label: 'Nói địa điểm muốn đến (Cố Cung / Tử Cấm Thành / Khách sạn)', keywords: ['故宫', '酒店', '王府井', '天安门', '去', '到'] },
      { id: 'obj_time', label: 'Hỏi mất bao lâu hoặc có tắc đường không', keywords: ['多久', '时间', '堵车', '几分钟', '多长时间'] },
      { id: 'obj_pay', label: 'Hỏi tiền cước và phương thức thanh toán (WeChat/Alipay/tiền mặt)', keywords: ['多少钱', '微信', '支付宝', '现金', '扫码', '买单'] }
    ],
    quickReplies: [
      { cn: '师傅，我想去故宫，谢谢！', pinyin: 'Shīfu, wǒ xiǎng qù Gùgōng, xièxie!', vi: 'Bác tài ơi, tôi muốn đến Cố Cung, cảm ơn bác!' },
      { cn: '请问到那里大概要多长时间？', pinyin: 'Qǐngwèn dào nàlǐ dàgài yào duō cháng shíjiān?', vi: 'Xin hỏi đến đó khoảng mất bao lâu ạ?' },
      { cn: '现在路上堵车吗？', pinyin: 'Xiànzài lùshang dǔchē ma?', vi: 'Bây giờ trên đường có tắc xe không ạ?' },
      { cn: '一共多少钱？我可以扫微信吗？', pinyin: 'Yígòng duōshao qián? Wǒ kěyǐ sǎo Wēixìn ma?', vi: 'Tổng cộng bao nhiêu tiền? Tôi quét WeChat được không?' }
    ],
    helpPrompts: [
      { cn: '师傅，请打表吧。', pinyin: 'Shīfu, qǐng dǎbiǎo ba.', vi: 'Bác tài ơi, vui lòng bấm đồng hồ tính tiền nhé.' },
      { cn: '请在前面的路口停一下。', pinyin: 'Qǐng zài qiánmian de lùkǒu tíng yíxià.', vi: 'Xin hãy dừng ở ngã tư phía trước một chút.' },
      { cn: '请给我一张发票，谢谢！', pinyin: 'Qǐng gěi wǒ yì zhāng fāpiào, xièxie!', vi: 'Cho tôi xin một tờ hóa đơn nhé, cảm ơn bác!' }
    ],
    scriptedReplies: [
      {
        match: ['故宫', '去', '到', '酒店', '王府井'],
        reply: {
          cn: '好嘞！故宫不远，现在走二环路大概半个小时就能到。您系好安全带！',
          pinyin: 'Hǎo lei! Gùgōng bù yuǎn, xiànzài zǒu èr huán lù dàgài bàn gè xiǎoshí jiù néng dào. Nín jì hǎo ānquándài!',
          vi: 'Được rồi! Cố Cung không xa, giờ đi đường Vành đai 2 khoảng nửa tiếng là đến. Bạn thắt dây an toàn nhé!'
        }
      },
      {
        match: ['多久', '时间', '堵车', '快'],
        reply: {
          cn: '现在不是早高峰，路上挺顺畅的，差不多二十多分钟就到了。',
          pinyin: 'Xiànzài bú shì zǎogāofēng, lùshang tǐng shùnchàng de, chàbuduō èrshí duō fēnzhōng jiù dào le.',
          vi: 'Giờ không phải giờ cao điểm sáng, đường khá thông thoáng, tầm hơn 20 phút là đến nơi thôi.'
        }
      },
      {
        match: ['多少钱', '微信', '支付宝', '现金', '扫码', '买单', '钱'],
        reply: {
          cn: '到地方啦！一共是四十八块钱。支持微信、支付宝扫码，车座后面有二维码！',
          pinyin: 'Dào dìfang la! Yígòng shì sìshíbā kuài qián. Zhīchí Wēixìn, Zhīfùbǎo sǎomǎ, chēzuò hòumian yǒu èrwéimǎ!',
          vi: 'Đến nơi rồi bạn nhé! Tổng cộng là 48 tệ. Quét WeChat hay Alipay đều được, sau lưng ghế có mã QR nhé!'
        }
      }
    ]
  },
  {
    id: 'zh_milktea',
    title: 'Order Trà Sữa & Đồ Ăn Vặt',
    titleCn: '买奶茶与点心',
    partnerName: 'Tiểu Vũ (Nhân viên quán HeyTea)',
    partnerRole: '奶茶店店员',
    avatar: '🧋',
    badge: 'Ăn uống & Đời sống',
    level: 'HSK 1 - 2',
    location: 'Quán trà sữa Hỷ Trà (HeyTea), Thượng Hải',
    situationDesc: 'Bạn bước vào quán trà sữa nổi tiếng để giải khát. Hãy tự tin gọi loại trà sữa yêu thích, dặn độ ngọt (đường), lượng đá, thêm topping trân châu và tiến hành thanh toán.',
    greeting: {
      cn: '您好，欢迎光临喜茶！请问今天想喝点什么？我们店的多肉葡萄是招牌哦！',
      pinyin: 'Nǐ hǎo, huānyíng guānglín Xǐchá! Qǐngwèn jīntiān xiǎng hē diǎn shénme? Wǒmen diàn de Duōròu Pútao shì zhāopai o!',
      vi: 'Xin chào, hoan nghênh đến HeyTea! Hôm nay bạn muốn uống gì ạ? Món Trà Nho Mọng Nước của quán là món đặc trưng đó!'
    },
    prompt: 'You are Xiao Yu (小雨), a friendly and energetic bubble tea barista. Guide the customer politely through cup size, sugar level, ice level, toppings, and billing.',
    objectives: [
      { id: 'obj_item', label: 'Gọi món trà sữa hoặc đồ uống cụ thể', keywords: ['奶茶', '多肉葡萄', '红茶', '绿茶', '要一杯', '喝'] },
      { id: 'obj_custom', label: 'Tùy chỉnh độ ngọt hoặc lượng đá (ít đường / ít đá)', keywords: ['半糖', '微糖', '少糖', '无糖', '少冰', '去冰', '常温', '珍珠'] },
      { id: 'obj_checkout', label: 'Hỏi giá và thanh toán quét mã', keywords: ['买单', '多少钱', '支付宝', '微信', '扫码'] }
    ],
    quickReplies: [
      { cn: '我要一杯多肉葡萄，大杯。', pinyin: 'Wǒ yào yì bēi Duōròu Pútao, dà bēi.', vi: 'Cho tôi một ly Trà Nho Mọng Nước, size lớn nhé.' },
      { cn: '请帮我做少冰、半糖（五分甜）。', pinyin: 'Qǐng bāng wǒ zuò shǎobīng, bàntáng (wǔ fēn tián).', vi: 'Làm giúp tôi ít đá, nửa đường (50% ngọt) nhé.' },
      { cn: '可以加一份波霸珍珠吗？', pinyin: 'Kěyǐ jiā yí fèn bōbà zhēnzhū ma?', vi: 'Có thể cho thêm một phần trân châu đen không?' },
      { cn: '请问一共多少钱？我扫码付款。', pinyin: 'Qǐngwèn yígòng duōshao qián? Wǒ sǎomǎ fùkuǎn.', vi: 'Xin hỏi tổng cộng bao nhiêu tiền? Tôi quét mã thanh toán.' }
    ],
    helpPrompts: [
      { cn: '老板，请问什么好喝？', pinyin: 'Lǎobǎn, qǐngwèn shénme hǎohē?', vi: 'Chủ quán ơi, cho hỏi món nào ngon nhất ạ?' },
      { cn: '我想要热的，不要冰的。', pinyin: 'Wǒ xiǎng yào rè de, bú yào bīng de.', vi: 'Tôi muốn uống nóng, không lấy đá nhé.' },
      { cn: '可以打包带走吗？', pinyin: 'Kěyǐ dǎbāo dàizǒu ma?', vi: 'Có thể đóng gói mang đi được không?' }
    ],
    scriptedReplies: [
      {
        match: ['多肉葡萄', '奶茶', '红茶', '一杯', '要'],
        reply: {
          cn: '好的！一杯大杯多肉葡萄。请问您想要几分甜？要加冰还是去冰呢？',
          pinyin: 'Hǎo de! Yì bēi dà bēi Duōròu Pútao. Qǐngwèn nín xiǎng yào jǐ fēn tián? Yào jiābīng háishì qùbīng ne?',
          vi: 'Dạ được ạ! Một ly lớn Trà Nho. Bạn muốn độ ngọt mấy phần? Lấy thêm đá hay bỏ đá ạ?'
        }
      },
      {
        match: ['少冰', '半糖', '微糖', '无糖', '去冰', '珍珠', '加'],
        reply: {
          cn: '没问题，少冰半糖，加一份波霸珍珠！您的餐号是88号，请稍等三分钟。',
          pinyin: 'Méi wèntí, shǎobīng bàntáng, jiā yí fèn bōbà zhēnzhū! Nín de cānhào shì bāshíbā hào, qǐng shāoděng sān fēnzhōng.',
          vi: 'Không vấn đề ạ, ít đá nửa đường, thêm trân châu! Số thứ tự của bạn là 88, đợi khoảng 3 phút nhé.'
        }
      },
      {
        match: ['多少钱', '买单', '微信', '扫码', '支付宝'],
        reply: {
          cn: '一共是二十二块钱。请在前面的小屏幕上扫码，谢谢！',
          pinyin: 'Yígòng shì èrshí’èr kuài qián. Qǐng zài qiánmian de xiǎo píngmù shang sǎomǎ, xièxie!',
          vi: 'Tổng cộng là 22 tệ. Mời bạn quét mã trên màn hình nhỏ phía trước, cảm ơn bạn!'
        }
      }
    ]
  },
  {
    id: 'zh_nightmarket',
    title: 'Mặc Cả Chợ Đêm',
    titleCn: '在夜市砍价买衣服',
    partnerName: 'Dì Trương (Chủ sạp chợ đêm)',
    partnerRole: '夜市摊主',
    avatar: '🛍️',
    badge: 'Mua sắm & Trả giá',
    level: 'HSK 2 - 3',
    location: 'Chợ đêm Tây Hồ, Hàng Châu',
    situationDesc: 'Bạn đang dạo chợ đêm sầm uất và ưng ý một chiếc áo tơ tằm thêu hoa rất đẹp. Hãy bắt chuyện với dì Trương, hỏi giá, thử đồ và vận dụng tài mặc cả để mua được giá tốt!',
    greeting: {
      cn: '美女/帅哥，快来看看！这件杭州丝绸衬衫质量特别好，今天特价卖，看看喜不喜欢？',
      pinyin: 'Měinǚ/Shuàigē, kuài lái kànkan! Zhè jiàn Hángzhōu sīchóu chènshān zhìliàng tèbié hǎo, jīntiān tèjià mài, kànkan xǐ bu xǐhuan?',
      vi: 'Người đẹp ơi / Đẹp trai ơi, ghé xem nào! Chiếc áo sơ mi lụa Hàng Châu này chất lượng cực tốt, hôm nay bán giá đặc biệt, xem có thích không?'
    },
    prompt: 'You are Auntie Zhang (张阿姨), a shrewd yet friendly night market vendor. Offer high prices first, haggle back and forth humorously, and eventually agree to a discount if the customer is polite.',
    objectives: [
      { id: 'obj_ask_price', label: 'Hỏi giá tiền của món đồ', keywords: ['多少钱', '怎么卖', '这个', '衣服', '贵'] },
      { id: 'obj_bargain', label: 'Chê đắt và thương lượng giảm giá (Rẻ chút đi)', keywords: ['便宜', '贵了', '少一点', '太贵', '打折', '八十', '一百'] },
      { id: 'obj_deal', label: 'Đồng ý chốt mua và thanh toán', keywords: ['买了', '要了', '成交', '包起来', '微信', '扫码'] }
    ],
    quickReplies: [
      { cn: '阿姨，这件衣服怎么卖？多少钱一件？', pinyin: 'Āyí, zhè jiàn yīfu zěnme mài? Duōshao qián yí jiàn?', vi: 'Dì ơi, chiếc áo này bán thế nào ạ? Bao nhiêu tiền một chiếc?' },
      { cn: '太贵了！一百块太高了，便宜一点吧？', pinyin: 'Tài guì le! Yìbǎi kuài tài gāo le, piányi yìdiǎn ba?', vi: 'Đắt quá dì ơi! 100 tệ cao quá, bớt chút đi dì?' },
      { cn: '六十块钱卖不卖？如果可以我就买两件。', pinyin: 'Liùshí kuài qián mài bu mài? Rúguǒ kěyǐ wǒ jiù mǎi liǎng jiàn.', vi: '60 tệ dì có bán không? Nếu được con lấy luôn 2 chiếc.' },
      { cn: '行！那帮我包起来吧，我扫微信给您。', pinyin: 'Xíng! Nà bāng wǒ bāo qǐlai ba, wǒ sǎo Wēixìn gěi nín.', vi: 'Được ạ! Vậy dì gói lại giúp con nhé, con quét WeChat trả dì.' }
    ],
    helpPrompts: [
      { cn: '有大一号的吗？我想试试。', pinyin: 'Yǒu dà yí hào de ma? Wǒ xiǎng shìshi.', vi: 'Có cỡ lớn hơn một số không? Con muốn mặc thử.' },
      { cn: '如果我买两件，能打八折吗？', pinyin: 'Rúguǒ wǒ mǎi liǎng jiàn, néng dǎ bā zhé ma?', vi: 'Nếu con mua 2 cái, có được giảm giá 20% không dì?' },
      { cn: '我是留学生，给个学生价吧！', pinyin: 'Wǒ shì liúxuéshēng, gěi gè xuésheng jià ba!', vi: 'Con là du học sinh, dì bớt cho con giá học sinh đi dì!' }
    ],
    scriptedReplies: [
      {
        match: ['多少钱', '怎么卖', '价格'],
        reply: {
          cn: '原价一百八，看你面善，给个开门价一百二！纯真丝的面料，摸摸看有多软！',
          pinyin: 'Yuánjià yìbǎi bā, kàn nǐ miànshàn, gěi gè kāimén jià yìbǎi èr! Chún zhēnsī de miànliào, mōmo kàn yǒu duō ruǎn!',
          vi: 'Giá gốc 180 đó, thấy cháu dễ mến dì để giá mở hàng 120 tệ! Vải tơ lụa 100% đó, sờ thử xem mềm mịn thế nào!'
        }
      },
      {
        match: ['贵', '便宜', '六十', '八十', '少一点', '折'],
        reply: {
          cn: '哎呀，六十块我连进货本钱都不够！看你真心想要，一口价八十块，不能再低啦！',
          pinyin: 'Āiyā, liùshí kuài wǒ lián jìnhuò běnqián dōu bú gòu! Kàn nǐ zhēnxīn xiǎng yào, yìkǒu jià bāshí kuài, bù néng zài dī la!',
          vi: 'Ui trời, 60 tệ dì còn chưa đủ vốn nhập vào nữa! Thấy cháu thực bụng muốn mua, giá chốt 80 tệ, không bớt hơn được nữa đâu nhé!'
        }
      },
      {
        match: ['买', '要了', '包', '扫码', '行', '成交'],
        reply: {
          cn: '好勒！八十块成交，给你装个漂亮的袋子。来，扫摊位上的二维码就行！',
          pinyin: 'Hǎo lei! Bāshí kuài chéngjiāo, gěi nǐ zhuāng gè piàoliang de dàizi. Lái, sǎo tānwèi shang de èrwéimǎ jiù xíng!',
          vi: 'Xong luôn! 80 tệ chốt đơn, dì đóng vào túi đẹp cho cháu. Nào, quét mã QR trên sạp là được nhé!'
        }
      }
    ]
  },
  {
    id: 'zh_duck_restaurant',
    title: 'Nhà Hàng Vịt Quay Bắc Kinh',
    titleCn: '吃北京烤鸭',
    partnerName: 'Tiểu Lý (Phục vụ nhà hàng Toàn Tụ Đức)',
    partnerRole: '餐馆服务员',
    avatar: '🍗',
    badge: 'Ẩm thực Trung Hoa',
    level: 'HSK 2',
    location: 'Nhà hàng Quanjude (Toàn Tụ Đức), Tiền Môn',
    situationDesc: 'Bạn đến ăn tối tại nhà hàng vịt quay Bắc Kinh trứ danh. Hãy gọi bàn, gọi nửa con vịt quay truyền thống, hỏi bánh tráng cuốn và dặn đầu bếp làm canh vịt thơm lừng.',
    greeting: {
      cn: '晚上好！欢迎光临全聚德。请问您一共几位？大厅还是包厢？',
      pinyin: 'Wǎnshang hǎo! Huānyíng guānglín Quánjùdé. Qǐngwèn nín yígòng jǐ wèi? Dàtīng háishì bāoxiāng?',
      vi: 'Buổi tối tốt lành! Hoan nghênh đến Toàn Tụ Đức. Xin hỏi quý khách đi mấy người ạ? Ngồi sảnh ngoài hay phòng riêng?'
    },
    prompt: 'You are Xiao Li (小李), a courteous and knowledgeable waiter at Quanjude Peking Duck. Help the guest order duck, condiments, side dishes, and answer food questions.',
    objectives: [
      { id: 'obj_table', label: 'Báo số người ăn và xin thực đơn', keywords: ['一位', '两位', '两个人', '三位', '菜单', '大厅'] },
      { id: 'obj_order_duck', label: 'Gọi vịt quay (nửa con hoặc 1 con) và bánh cuốn', keywords: ['烤鸭', '半只', '一只', '荷叶饼', '酱', '葱'] },
      { id: 'obj_bill', label: 'Dặn dò khẩu vị hoặc xin hóa đơn tính tiền', keywords: ['不要太咸', '不辣', '鸭架汤', '买单', '结账', '发票'] }
    ],
    quickReplies: [
      { cn: '我们两个人，请给我们一个靠窗的桌子。', pinyin: 'Wǒmen liǎng gè rén, qǐng gěi wǒmen yí gè kàochuāng de zhuōzi.', vi: 'Chúng tôi đi 2 người, cho chúng tôi một bàn gần cửa sổ nhé.' },
      { cn: '请来半只传统北京烤鸭，加一套荷叶饼。', pinyin: 'Qǐng lái bàn zhī chuántǒng Běijīng kǎoyā, jiā yí tào héyèbǐng.', vi: 'Cho chúng tôi nửa con vịt quay truyền thống, thêm 1 phần bánh tráng cuốn.' },
      { cn: '鸭架请帮我们做成清炖鸭汤，谢谢！', pinyin: 'Yājià qǐng bāng wǒmen zuò chéng qīngdùn yātāng, xièxie!', vi: 'Khung xương vịt nhờ bếp nấu thành canh vịt hầm thanh ngọt nhé!' },
      { cn: '服务员，请问可以结账了吗？', pinyin: 'Fúwùyuán, qǐngwèn kěyǐ jiézhàng le ma?', vi: 'Phục vụ ơi, cho chúng tôi thanh toán được chưa ạ?' }
    ],
    helpPrompts: [
      { cn: '烤鸭需要等多久？', pinyin: 'Kǎoyā xūyào děng duōjiǔ?', vi: 'Món vịt quay cần chờ bao lâu ạ?' },
      { cn: '师傅会在桌前切鸭子吗？', pinyin: 'Shīfu huì zài zhuō qián qiē yāzi ma?', vi: 'Đầu bếp có ra thái vịt trực tiếp tại bàn không?' },
      { cn: '这个菜辣不辣？', pinyin: 'Zhè gè cài là bu là?', vi: 'Món này có cay không ạ?' }
    ],
    scriptedReplies: [
      {
        match: ['位', '人', '桌', '大厅', '窗'],
        reply: {
          cn: '两位里面请！靠窗这个位置视野好，请坐。这是我们的菜单，招牌挂炉烤鸭特别香！',
          pinyin: 'Liǎng wèi lǐmian qǐng! Kàochuāng zhè gè wèizhi shìyě hǎo, qǐng zuò. Zhè shì wǒmen de càidān, zhāopai guàlú kǎoyā tèbié xiāng!',
          vi: 'Mời hai vị vào trong! Vị trí gần cửa sổ này view rất đẹp, mời ngồi ạ. Đây là thực đơn, món vịt nướng lu đặc trưng thơm lắm ạ!'
        }
      },
      {
        match: ['烤鸭', '半只', '一只', '饼', '汤', '菜'],
        reply: {
          cn: '好嘞！半只烤鸭配荷叶饼、甜面酱和大葱丝。鸭架给您熬成白菜豆腐汤，大概15分钟上齐！',
          pinyin: 'Hǎo lei! Bàn zhī kǎoyā pèi héyèbǐng, tiánmiànjiàng hé dàcōngsī. Yājià gěi nín áo chéng báicài dòufu tāng, dàgài shíwǔ fēnzhōng shàng qí!',
          vi: 'Dạ được ạ! Nửa con vịt kèm bánh tráng, sốt tương ngọt và hành hoa thái sợi. Xương vịt nấu canh cải đậu hũ, tầm 15 phút sẽ lên đủ ạ!'
        }
      },
      {
        match: ['买单', '结账', '多少钱', '发票'],
        reply: {
          cn: '吃得满意吗？一共是一百六十八块钱。微信、支付宝或者刷卡都可以！',
          pinyin: 'Chī de mǎnyì ma? Yígòng shì yìbǎi liùshíbā kuài qián. Wēixìn, Zhīfùbǎo huòzhě shuākǎ dōu kěyǐ!',
          vi: 'Hai vị dùng bữa hài lòng chứ ạ? Tổng cộng là 168 tệ. Quét WeChat, Alipay hay cà thẻ đều được ạ!'
        }
      }
    ]
  },
  {
    id: 'zh_hotel',
    title: 'Nhận Phòng Khách Sạn',
    titleCn: '在酒店办理入住',
    partnerName: 'Quản lý Vương (Lễ tân khách sạn)',
    partnerRole: '酒店前台经理',
    avatar: '🏨',
    badge: 'Du lịch & Khách sạn',
    level: 'HSK 2 - 3',
    location: 'Khách sạn Hòa Bình (Peace Hotel), Bến Thượng Hải',
    situationDesc: 'Bạn đến nhận phòng khách sạn sau chuyến bay dài. Hãy trình hộ chiếu/mã đặt phòng, hỏi về mật khẩu Wi-Fi, giờ ăn sáng buffet và nhờ hỗ trợ hành lý lên phòng.',
    greeting: {
      cn: '您好，下午好！欢迎来到和平饭店。请问有什么可以帮您？',
      pinyin: 'Nǐ hǎo, xiàwǔ hǎo! Huānyíng lái dào Hépíng Fàndiàn. Qǐngwèn yǒu shénme kěyǐ bāng nín?',
      vi: 'Xin chào, buổi chiều an lành! Chào mừng quý khách đến khách sạn Hòa Bình. Tôi có thể hỗ trợ gì cho quý khách ạ?'
    },
    prompt: 'You are Manager Wang (王经理), a professional and refined luxury hotel front desk officer. Handle guest check-in, keycard distribution, Wi-Fi info, breakfast details, and luggage help smoothly.',
    objectives: [
      { id: 'obj_checkin', label: 'Báo có đặt phòng trước và trình hộ chiếu', keywords: ['预订', '入住', '护照', '订房', '名字'] },
      { id: 'obj_amenities', label: 'Hỏi về mật khẩu Wi-Fi hoặc giờ ăn sáng', keywords: ['无线网', 'wifi', 'WiFi', '密码', '早餐', '几点'] },
      { id: 'obj_roomkey', label: 'Nhận thẻ phòng và hỏi vị trí thang máy', keywords: ['房卡', '钥匙', '电梯', '几楼', '行李'] }
    ],
    quickReplies: [
      { cn: '您好，我在携程上预订了一间大床房，我叫阮文南。', pinyin: 'Nǐ hǎo, wǒ zài Xiécéng shang yùdìng le yì jiān dàchuángfáng, wǒ jiào Ruǎn Wénnán.', vi: 'Xin chào, tôi đã đặt trước một phòng giường lớn trên Ctrip, tôi tên là Nguyễn Văn Nam.' },
      { cn: '这是我的护照，请帮我办理入住手续。', pinyin: 'Zhè shì wǒ de hùzhào, qǐng bāng wǒ bànlǐ rùzhù shǒuxù.', vi: 'Đây là hộ chiếu của tôi, làm thủ tục nhận phòng giúp tôi nhé.' },
      { cn: '请问酒店的Wi-Fi密码是多少？早餐在几楼？', pinyin: 'Qǐngwèn jiǔdiàn de Wi-Fi mìmǎ shì duōshao? Zǎocān zài jǐ lóu?', vi: 'Xin hỏi mật khẩu Wi-Fi là gì ạ? Bữa sáng ở tầng mấy?' },
      { cn: '请问电梯在哪里？能帮我把行李送到房间吗？', pinyin: 'Qǐngwèn diàntī zài nǎlǐ? Néng bāng wǒ bǎ xíngli sòng dào fángjiān ma?', vi: 'Xin hỏi thang máy ở đâu ạ? Có thể hỗ trợ chuyển hành lý lên phòng giúp tôi không?' }
    ],
    helpPrompts: [
      { cn: '退房时间是几点？', pinyin: 'Tuìfáng shíjiān shì jǐ diǎn?', vi: 'Giờ trả phòng (check-out) là mấy giờ ạ?' },
      { cn: '可以帮我安排一间高楼层、安静的房间吗？', pinyin: 'Kěyǐ bāng wǒ ānpái yì jiān gāolóucéng, ānjìng de fángjiān ma?', vi: 'Có thể xếp cho tôi phòng tầng cao, yên tĩnh được không?' },
      { cn: '押金需要付多少？', pinyin: 'Yājīn xūyào fù duōshao?', vi: 'Tiền đặt cọc (tiền cọc phòng) là bao nhiêu ạ?' }
    ],
    scriptedReplies: [
      {
        match: ['预订', '入住', '护照', '订房', '名字', '阮'],
        reply: {
          cn: '查到您的订单了！豪华江景大床房两晚。请出示您的护照，我们需要登记一下并收取两百元押金。',
          pinyin: 'Chá dào nín de dìngdān le! Háohuá jiāngjǐng dàchuángfáng liǎng wǎn. Qǐng chūshì nín de hùzhào, wǒmen xūyào dēngjì yíxià bìng shōuqǔ liǎngbǎi yuán yājīn.',
          vi: 'Đã tra thấy đơn đặt phòng của quý khách rồi ạ! Phòng King view sông sang trọng 2 đêm. Xin quý khách xuất trình hộ chiếu để đăng ký và gửi cọc 200 tệ ạ.'
        }
      },
      {
        match: ['wifi', 'WiFi', '密码', '早餐', '几点', '网'],
        reply: {
          cn: '房间Wi-Fi不需要密码，连上后输入房间号即可。早餐在二楼餐厅，早晨6:30到10:00供应中西式自助餐。',
          pinyin: 'Fángjiān Wi-Fi bù xūyào mìmǎ, lián shàng hòu shūrù fángjiānhào jíkě. Zǎocān zài èr lóu cāntīng, zǎochén liù diǎn bàn dào shí diǎn gōngyìng zhōng-xīshì zìzhùcān.',
          vi: 'Wi-Fi phòng không cần mật khẩu, kết nối rồi nhập số phòng là được. Bữa sáng ở nhà hàng tầng 2, từ 6h30 đến 10h sáng buffet Á - Âu ạ.'
        }
      },
      {
        match: ['电梯', '房卡', '行李', '钥匙', '几楼'],
        reply: {
          cn: '这是您的房卡，房间是1808房。大厅左转就是电梯。行李员马上会帮您把行李送上去，祝您入住愉快！',
          pinyin: 'Zhè shì nín de fángkǎ, fángjiān shì yāo-bā-líng-bā fáng. Dàtīng zuǒzhuǎn jiù shì diàntī. Xíngliyuán mǎshàng huì bāng nín bǎ xíngli sòng shàngqu, zhù nín rùzhù yúkuài!',
          vi: 'Đây là thẻ phòng của quý khách, phòng 1808. Rẽ trái sảnh là thang máy. Nhân viên hành lý sẽ chuyển hành lý lên ngay, chúc quý khách kỳ nghỉ vui vẻ!'
        }
      }
    ]
  },
  {
    id: 'zh_subway',
    title: 'Lạc Đường & Ga Tàu Điện',
    titleCn: '问路与乘地铁',
    partnerName: 'Lý Nam (Tình nguyện viên ga tàu)',
    partnerRole: '地铁站志愿者',
    avatar: '🚇',
    badge: 'Chỉ đường & Giao thông',
    level: 'HSK 1 - 2',
    location: 'Ga tàu điện ngầm Tây Đơn (Xidan), Bắc Kinh',
    situationDesc: 'Bạn bị lạc trong ga tàu điện ngầm rộng lớn và cần đổi tuyến để đến Vương Phủ Tỉnh. Hãy hỏi bạn tình nguyện viên Lý Nam về tuyến tàu, mua thẻ vé tự động và cách chuyển tuyến.',
    greeting: {
      cn: '同学您好！我是地铁站志愿者。看您在看地图，需要帮忙指路吗？',
      pinyin: 'Tóngxué nǐ hǎo! Wǒ shì dìtiězhàn zhìyuànzhě. Kàn nǐ zài kàn dìtú, xūyào bāngmáng zhǐlù ma?',
      vi: 'Chào bạn! Mình là tình nguyện viên ga tàu. Thấy bạn đang xem bản đồ, có cần mình giúp chỉ đường không?'
    },
    prompt: 'You are Li Nan (李楠), an eager young volunteer guide at Beijing subway station. Help travelers navigate lines, buy single tickets, and make transfers.',
    objectives: [
      { id: 'obj_ask_line', label: 'Hỏi tuyến tàu điện đến Vương Phủ Tỉnh', keywords: ['王府井', '几号线', '怎么去', '哪条线', '坐车'] },
      { id: 'obj_transfer', label: 'Hỏi cách đổi tàu/chuyển tuyến', keywords: ['换乘', '换车', '转车', '哪一站'] },
      { id: 'obj_ticket', label: 'Hỏi cách mua vé hoặc quét mã đi tàu', keywords: ['买票', '自动售票机', '扫码', '乘车码', '一卡通'] }
    ],
    quickReplies: [
      { cn: '你好！请问去王府井应该坐几号线？', pinyin: 'Nǐ hǎo! Qǐngwèn qù Wángfǔjǐng yīnggāi zuò jǐ hào xiàn?', vi: 'Chào bạn! Cho hỏi đi Vương Phủ Tỉnh thì nên đi tàu tuyến số mấy?' },
      { cn: '需要在哪个车站换乘吗？', pinyin: 'Xūyào zài nǎ gè chēzhàn huànchéng ma?', vi: 'Có cần chuyển tuyến ở ga nào không bạn?' },
      { cn: '自动售票机在哪里？可以用手机扫码乘车吗？', pinyin: 'Zìdòng shòupiàojī zài nǎlǐ? Kěyǐ yòng shǒujī sǎomǎ chéngchē ma?', vi: 'Máy bán vé tự động ở đâu? Có thể dùng điện thoại quét mã đi tàu không?' },
      { cn: '太感谢你了，祝你工作顺利！', pinyin: 'Tài gǎnxiè nǐ le, zhù nǐ gōngzuò shùnlì!', vi: 'Cảm ơn bạn nhiều lắm, chúc bạn công việc thuận lợi nhé!' }
    ],
    helpPrompts: [
      { cn: '末班车是几点？', pinyin: 'Mòbānchē shì jǐ diǎn?', vi: 'Chuyến tàu cuối cùng trong ngày là mấy giờ?' },
      { cn: '这趟车往哪个方向开？', pinyin: 'Zhè tàng chē wǎng nǎ gè fāngxiàng kāi?', vi: 'Chuyến tàu này chạy về hướng nào vậy bạn?' },
      { cn: '去洗手间怎么走？', pinyin: 'Qù xǐshǒujiān zěnme zǒu?', vi: 'Đến nhà vệ sinh thì đi lối nào ạ?' }
    ],
    scriptedReplies: [
      {
        match: ['王府井', '几号线', '怎么去', '哪条线'],
        reply: {
          cn: '去王府井很方便！直接坐1号线（红色标识），往环球度假区方向坐四站就到王府井站了，不用换乘！',
          pinyin: 'Qù Wángfǔjǐng hěn fāngbiàn! Zhíjiē zuò yī hào xiàn (hóngsè biāozhì), wǎng Huánqiú Dùjiàqū fāngxiàng zuò sì zhàn jiù dào Wángfǔjǐng zhàn le, bú yòng huànchéng!',
          vi: 'Đến Vương Phủ Tỉnh tiện lắm! Bạn cứ đi thẳng tuyến số 1 (màu đỏ), hướng đi Universal Resort đi 4 ga là tới ga Vương Phủ Tỉnh, không cần đổi tuyến đâu!'
        }
      },
      {
        match: ['换乘', '换车', '转', '哪一站'],
        reply: {
          cn: '不用换乘哦，直达的！如果您之后要去别的地方，站台天花板上都有清晰的换乘箭头指示牌。',
          pinyin: 'Bú yòng huànchéng o, zhídá de! Rúguǒ nín zhīhòu yào qù bié de dìfang, zhàntái tiānhuābǎn shang dōu yǒu qīngxī de huànchéng jiàntóu zhǐshìpái.',
          vi: 'Không cần chuyển tuyến đâu, tàu chạy thẳng luôn! Nếu sau đó bạn muốn đi đâu khác, trên trần ga đều có bảng mũi tên chỉ dẫn đổi tuyến rất rõ ràng.'
        }
      },
      {
        match: ['买票', '自动', '扫码', '乘车码', '一卡通'],
        reply: {
          cn: '售票机就在安检口旁边。如果您有支付宝，打开“出行”切换到北京地铁，直接刷乘车码进站最方便！',
          pinyin: 'Shòupiàojī jiù zài ānjiǎnkǒu pángbiān. Rúguǒ nín yǒu Zhīfùbǎo, dǎkāi “chūxíng” qiēhuàn dào Běijīng dìtiě, zhíjiē shuā chéngchēmǎ jìnzhàn zuì fāngbiàn!',
          vi: 'Máy bán vé ở ngay cạnh cổng soi an ninh. Nếu bạn có Alipay, mở mục "Di chuyển" chuyển sang Tàu điện Bắc Kinh, quét mã trực tiếp qua cửa là tiện nhất!'
        }
      }
    ]
  },
  {
    id: 'zh_interview',
    title: 'Phỏng Vấn Việc Làm HSK',
    titleCn: '中文工作面试',
    partnerName: 'Giám đốc nhân sự Trần (HR Director)',
    partnerRole: '人力资源总监',
    avatar: '💼',
    badge: 'Công việc & Phỏng vấn',
    level: 'HSK 3',
    location: 'Văn phòng Công ty Thương Mại Điện Tử Quốc Tế, Thâm Quyến',
    situationDesc: 'Bạn tham gia phỏng vấn vị trí Chuyên viên Quản lý Khách hàng nói tiếng Trung. Hãy chào hỏi lịch sự, tự tin giới thiệu bản thân, trình bày năng lực tiếng Hán và mong muốn học hỏi.',
    greeting: {
      cn: '阮先生/阮女士，你好！欢迎来到我们公司面试。请先用中文做一个简单的自我介绍吧。',
      pinyin: 'Ruǎn xiānsheng/Ruǎn nǚshì, nǐ hǎo! Huānyíng lái dào wǒmen gōngsī miànshì. Qǐng xiān yòng zhōngwén zuò yí gè jiǎndān de zìwǒ jièshào ba.',
      vi: 'Chào anh/chị! Chào mừng đến phỏng vấn tại công ty chúng tôi. Xin mời anh/chị giới thiệu ngắn gọn về bản thân bằng tiếng Trung trước nhé.'
    },
    prompt: 'You are Director Chen (陈总监), a sharp, encouraging HR director. Ask typical job interview questions: self introduction, Chinese learning experience, reasons for applying, and salary expectations.',
    objectives: [
      { id: 'obj_intro', label: 'Tự giới thiệu tên, tuổi hoặc trường/ngành học', keywords: ['我叫', '毕业', '专业', '大学', '来自', '学习'] },
      { id: 'obj_hsk', label: 'Trình bày khả năng tiếng Trung hoặc chứng chỉ HSK', keywords: ['HSK', '汉语', '中文', '水平', '交流', '流利', '年'] },
      { id: 'obj_motivation', label: 'Nêu lý do ứng tuyển hoặc thế mạnh bản thân', keywords: ['喜欢', '贵公司', '经验', '努力', '合作', '机会', '发展'] }
    ],
    quickReplies: [
      { cn: '陈总监好！我叫阮文南，毕业于河内大学国际贸易专业。', pinyin: 'Chén zǒngjiān hǎo! Wǒ jiào Ruǎn Wénnán, bìyè yú Hénèi Dàxué guójì màoyì zhuānyè.', vi: 'Chào Giám đốc Trần! Tôi tên là Nguyễn Văn Nam, tốt nghiệp chuyên ngành Thương mại Quốc tế tại Đại học Hà Nội.' },
      { cn: '我学习中文两年了，已经考取了HSK4级证书，能流利进行商务沟通。', pinyin: 'Wǒ xuéxí zhōngwén liǎng nián le, yǐjīng kǎoqǔ le HSK sì jí zhèngshū, néng liúlì jìnxíng shāngwù gōutōng.', vi: 'Tôi học tiếng Trung được 2 năm rồi, đã thi đỗ chứng chỉ HSK 4 và có thể giao tiếp thương mại lưu loát.' },
      { cn: '我非常看好贵公司的跨境电商发展前景，希望能加入团队贡献力量。', pinyin: 'Wǒ fēicháng kànhǎo guì gōngsī de kuàjìng diànshāng fāzhǎn qiánjǐng, xīwàng néng jiārù tuánduì gòngxiàn lìliang.', vi: 'Tôi rất kỳ vọng vào triển vọng phát triển thương mại điện tử xuyên biên giới của quý công ty, và hy vọng được gia nhập đội ngũ cống hiến.' },
      { cn: '如果遇到不懂的新事物，我非常愿意虚心学习并快速掌握。', pinyin: 'Rúguǒ yù dào bù dǒng de xīn shìwù, wǒ fēicháng yuànyì xūxīn xuéxí bìng kuàisù zhǎngwò.', vi: 'Nếu gặp những điều mới mẻ chưa rõ, tôi rất sẵn lòng khiêm tốn học hỏi và nắm bắt nhanh chóng.' }
    ],
    helpPrompts: [
      { cn: '请问这个职位的日常工作内容包括什么？', pinyin: 'Qǐngwèn zhè gè zhíwèi de rìcháng gōngzuò nèiróng bāokuò shénme?', vi: 'Xin hỏi công việc hàng ngày của vị trí này bao gồm những gì ạ?' },
      { cn: '请问贵公司会为新员工提供专业培训吗？', pinyin: 'Qǐngwèn guì gōngsī huì wèi xīn yuángōng tígōng zhuānyè péixùn ma?', vi: 'Xin hỏi quý công ty có cung cấp đào tạo chuyên môn cho nhân viên mới không ạ?' }
    ],
    scriptedReplies: [
      {
        match: ['我叫', '毕业', '专业', '大学', '来自'],
        reply: {
          cn: '很好，背景很符合！请问你平时是如何学习中文的？在跟中国客户交流方面有信心吗？',
          pinyin: 'Hěn hǎo, bèijǐng hěn fúhé! Qǐngwèn nǐ píngshí shì rúhé xuéxí zhōngwén de? Zài gēn Zhōngguó kèhù jiāoliú fāngmiàn yǒu xìnxīn ma?',
          vi: 'Rất tốt, lý lịch rất phù hợp! Xin hỏi ngày thường bạn học tiếng Trung thế nào? Có tự tin trong việc giao lưu với khách hàng Trung Quốc không?'
        }
      },
      {
        match: ['HSK', '汉语', '中文', '沟通', '交流', '流利'],
        reply: {
          cn: '你的发音相当标准！我们公司经常需要与广州、义乌的供应商对接，你的中文能力完全能派上用场。',
          pinyin: 'Nǐ de fāyīn xiāngdāng biāozhǔn! Wǒmen gōngsī jīngcháng xūyào yǔ Guǎngzhōu, Yìwū de gōngyìngshāng duìjiē, nǐ de zhōngwén nénglì wánquán néng pài shàng yòngchǎng.',
          vi: 'Phát âm của bạn khá chuẩn đấy! Công ty chúng tôi thường xuyên cần làm việc với nhà cung ứng ở Quảng Châu, Nghĩa Ô, năng lực tiếng Trung của bạn hoàn toàn phát huy tốt.'
        }
      },
      {
        match: ['发展', '前景', '加入', '机会', '学习', '贵公司'],
        reply: {
          cn: '非常棒，我们欣赏有积极进取心态的年轻人。人事部门会在三天内给你发送具体的录用意向书，欢迎你！',
          pinyin: 'Fēicháng bàng, wǒmen xīnshǎng yǒu jījí jìnqǔ xīntài de niánqīngrén. Rénshì bùmén huì zài sān tiān nèi gěi nǐ fāsòng jùtǐ de lùyòng yìxiàngshū, huānyíng nǐ!',
          vi: 'Rất tuyệt vời, chúng tôi đánh giá cao những bạn trẻ có tinh thần cầu tiến. Bộ phận nhân sự sẽ gửi thư mời nhận việc cụ thể trong vòng 3 ngày tới, chào mừng bạn!'
        }
      }
    ]
  },
  {
    id: 'zh_pharmacy',
    title: 'Mua Thuốc Tại Hiệu Thuốc',
    titleCn: '在药店买药',
    partnerName: 'Dược sĩ Lâm (Dược sĩ Đồng Nhân Đường)',
    partnerRole: '执业药剂师',
    avatar: '💊',
    badge: 'Sức khỏe & Y tế',
    level: 'HSK 2',
    location: 'Hiệu thuốc Đông Y Đồng Nhân Đường (Tongrentang)',
    situationDesc: 'Bạn bị dính mưa hôm qua và sáng nay thức dậy thấy hơi sốt, đau họng, chảy nước mũi. Hãy đến hiệu thuốc mô tả triệu chứng, mua thuốc cảm cúm, hỏi liều dùng và cách uống.',
    greeting: {
      cn: '您好！请问哪里不舒服？需要看西药还是中成药？',
      pinyin: 'Nǐ hǎo! Qǐngwèn nǎlǐ bù shūfu? Xūyào kàn xīyào háishì zhōngchéngyào?',
      vi: 'Xin chào! Bạn cảm thấy không khỏe ở đâu ạ? Bạn muốn tìm thuốc tây y hay thuốc đông y?'
    },
    prompt: 'You are Pharmacist Lin (林药剂师), a compassionate and careful pharmacy professional. Ask about symptoms (fever, cough, sore throat, allergies), recommend appropriate medicine, explain dosage and precautions.',
    objectives: [
      { id: 'obj_symptom', label: 'Mô tả triệu chứng (cảm cúm, sốt, đau đầu, đau họng)', keywords: ['感冒', '发烧', '头痛', '咳嗽', '嗓子疼', '流鼻涕', '不舒服'] },
      { id: 'obj_dosage', label: 'Hỏi cách uống (ngày mấy lần, mấy viên, trước/sau ăn)', keywords: ['怎么吃', '一次几粒', '一天几次', '饭前', '饭后', '服用'] },
      { id: 'obj_pay_med', label: 'Hỏi giá và thanh toán tiền thuốc', keywords: ['多少钱', '一盒', '买单', '微信', '支付宝'] }
    ],
    quickReplies: [
      { cn: '我昨天淋雨了，今天有点发烧、嗓子疼，还流鼻涕。', pinyin: 'Wǒ zuótiān línyǔ le, jīntiān yǒudiǎn fāshāo, sǎngzi téng, hái liú bítì.', vi: 'Hôm qua tôi bị dính mưa, hôm nay hơi sốt, đau họng lại còn chảy nước mũi nữa.' },
      { cn: '有没有见效快一点的感冒药和润喉糖？', pinyin: 'Yǒu méiyǒu jiànxiào kuài yìdiǎn de gǎnmàoyào hé rùnhóutáng?', vi: 'Có thuốc cảm cúm nào tác dụng nhanh và kẹo ngậm bổ họng không ạ?' },
      { cn: '这个药应该怎么吃？一天吃几次，一次吃几粒？', pinyin: 'Zhè gè yào yīnggāi zěnme chī? Yì tiān chī jǐ cì, yí cì chī jǐ lì?', vi: 'Thuốc này nên uống thế nào ạ? Một ngày uống mấy lần, một lần mấy viên?' },
      { cn: '一共多少钱？饭前吃还是饭后吃？', pinyin: 'Yígòng duōshao qián? Fànqián chī háishì fànhòu chī?', vi: 'Tổng cộng bao nhiêu tiền ạ? Uống trước bữa ăn hay sau bữa ăn vậy bạn?' }
    ],
    helpPrompts: [
      { cn: '吃了这个药会犯困吗？', pinyin: 'Chī le zhè gè yào huì fànkùn ma?', vi: 'Uống thuốc này vào có bị buồn ngủ không ạ?' },
      { cn: '需要多喝温水吗？', pinyin: 'Xūyào duō hē wēnshuǐ ma?', vi: 'Có cần uống nhiều nước ấm không ạ?' }
    ],
    scriptedReplies: [
      {
        match: ['发烧', '感冒', '嗓子', '头痛', '流鼻涕', '咳嗽'],
        reply: {
          cn: '这是受了风寒。我给您拿一盒感冒灵颗粒和一板西瓜霜润喉片，对退烧和止喉咙痛特别有效。',
          pinyin: 'Zhè shì shòu le fēnghán. Wǒ gěi nín ná yì hé Gǎnmàolíng Kēlì hé yì bǎn Xīguāshuāng rùnhóupiàn, duì tuìshāo hé zhǐ hóulóng tòng tèbié yǒuxiào.',
          vi: 'Đây là bị nhiễm phong hàn rồi. Tôi lấy cho bạn 1 hộp Cảm Mạo Linh dạng cốm và 1 vỉ ngậm bổ họng Dưa Hấu Sương, hạ sốt và giảm đau họng rất hiệu nghiệm.'
        }
      },
      {
        match: ['怎么吃', '几次', '几粒', '饭前', '饭后', '吃法'],
        reply: {
          cn: '感冒颗粒一天三次，一次一袋，用温水冲服。记得一定要在饭后半小时喝，多喝温开水，早点休息！',
          pinyin: 'Gǎnmào kēlì yì tiān sān cì, yí cì yí dài, yòng wēnshuǐ chōngfú. Jìde yídìng yào zài fànhòu bàn xiǎoshí hē, duō hē wēnkāishuǐ, zǎodiǎn xiūxi!',
          vi: 'Cốm cảm ngày uống 3 lần, mỗi lần 1 gói, pha với nước ấm uống. Nhớ uống sau bữa ăn nửa tiếng nhé, uống nhiều nước ấm và ngủ sớm!'
        }
      },
      {
        match: ['多少钱', '买单', '一盒', '结账', '微信'],
        reply: {
          cn: '两样加起来一共三十五块钱。祝您早日康复！支持微信、支付宝扫码付款。',
          pinyin: 'Liǎng yàng jiā qǐlai yígòng sānshíwǔ kuài qián. Zhù nín zǎorì kāngfù! Zhīchí Wēixìn, Zhīfùbǎo sǎomǎ fùkuǎn.',
          vi: 'Cả 2 loại cộng lại là 35 tệ. Chúc bạn mau bình phục nhé! Hỗ trợ quét mã WeChat hoặc Alipay.'
        }
      }
    ]
  }
];

if (typeof window !== 'undefined') {
  console.log('[ChineseRoleplay] Loaded', (window.ZH_ROLEPLAY_SCENARIOS || []).length, 'roleplay scenarios.');
}
