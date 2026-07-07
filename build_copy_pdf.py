from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


OUTPUT = "instagram-site-copy.pdf"


def build():
    pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "TitleCN",
        parent=styles["Title"],
        fontName="STSong-Light",
        fontSize=18,
        leading=24,
        spaceAfter=10,
    )
    h1 = ParagraphStyle(
        "H1CN",
        parent=styles["Heading1"],
        fontName="STSong-Light",
        fontSize=14,
        leading=20,
        spaceBefore=8,
        spaceAfter=6,
    )
    h2 = ParagraphStyle(
        "H2CN",
        parent=styles["Heading2"],
        fontName="STSong-Light",
        fontSize=11.5,
        leading=16,
        spaceBefore=6,
        spaceAfter=4,
    )
    body = ParagraphStyle(
        "BodyCN",
        parent=styles["BodyText"],
        fontName="STSong-Light",
        fontSize=10.5,
        leading=15,
        spaceAfter=4,
    )

    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
    )

    story = [
        Paragraph("工作室文案整理", title),
        Paragraph("Instagram 账号结构", h1),
        Paragraph("推荐用户名", h2),
        Paragraph("yutong.studio<br/>mingxian.studio<br/>stilldraft.studio<br/>首选：yutong.studio", body),
        Paragraph("名字栏", h2),
        Paragraph("Yutong Studio<br/>Yutong Zhao Studio", body),
        Paragraph("Bio 版本 1", h2),
        Paragraph("Art, written astrology readings, handmade jewelry<br/>Based by the sea<br/>Archive / order / contact ↓", body),
        Paragraph("Bio 版本 2", h2),
        Paragraph("艺术 / 命理文字报告 / 定制珠串<br/>based by the sea<br/>作品 / 下单 / 联系 ↓", body),
        Paragraph("Bio 版本 3", h2),
        Paragraph("Art works, written readings, handmade pieces<br/>Made slowly by the sea<br/>Archive / order / contact ↓", body),
        Paragraph("高亮栏目", h2),
        Paragraph("About / Readings / Jewelry / Art / Process", body),
        Spacer(1, 6),
        Paragraph("Instagram 首批内容", h1),
        Paragraph("1. 开场帖", h2),
        Paragraph("英文版<br/>A quiet studio by the sea.<br/>This space holds three lines of work: art, written astrology readings, and handmade jewelry.<br/>I work slowly, mostly alone, and in words, images, and materials.<br/>If you want to browse the archive, order a reading, or ask about a piece, the links are below.", body),
        Paragraph("中文版<br/>海边的安静工作室。<br/>这里放三条线：艺术作品、命理文字报告、手工珠串。<br/>我更习惯安静地工作，用文字、图像和材料把事情做深。<br/>作品、下单和联系入口都在下方。", body),
        Paragraph("2. 命理报告说明帖", h2),
        Paragraph("英文版<br/>I offer written readings, not instant chatting.<br/>You can enter your birth data and generate the chart yourself.<br/>If you want a deeper reading, you can order a written report.<br/>Clear structure, direct language, no unnecessary performance.", body),
        Paragraph("中文版<br/>我提供的是文字命理报告，不是即时闲聊。<br/>你可以先自行输入资料排盘。<br/>如果需要更深入的判断，可以下单定制文字分析。<br/>结构清晰，语言直接，不做多余表演。", body),
        Paragraph("首批 12 条发布顺序", h2),
        Paragraph("1. 工作室开场：你是谁，这个账号会放什么。<br/>2. 命理报告说明：文字报告，不做即时闲聊。<br/>3. 珠串第一组：最完整、最好看的一组近图。<br/>4. 艺术作品第一张：一件最能代表你的画。<br/>5. 工作过程：手、桌面、材料、写报告或串珠过程。<br/>6. 报告样张：一小段有力量的分析文字。<br/>7. 珠串第二组：材质、配色、佩戴方式。<br/>8. 艺术系列说明：旧作品系列或新系列短说明。<br/>9. 你的方法：为什么只做文字报告、低接触、深分析。<br/>10. 海边工作室气氛：海边、桌面、光线，不要旅游照。<br/>11. 定制逻辑：珠串如何定制、如何联系、什么情况下接单。<br/>12. 总入口帖：看作品、预约报告、定制珠串的总入口。", body),
        Spacer(1, 6),
        Paragraph("首批 12 条完整文案", h1),
        Paragraph("1. 工作室开场", h2),
        Paragraph("中文<br/>海边的安静工作室。<br/>这里放三条线：艺术作品、命理文字报告、手工珠串。<br/>我更习惯安静地工作，用文字、图像和材料把事情做深。<br/>如果你想浏览作品、预约报告，或者询问一件珠串，都可以从这里进入。", body),
        Paragraph("English<br/>A quiet studio by the sea.<br/>This space holds three lines of work: art, written astrology readings, and handmade jewelry.<br/>I work slowly, mostly alone, and through words, images, and materials.<br/>If you want to browse the archive, order a reading, or ask about a piece, you can begin here.", body),
        Paragraph("2. 命理报告说明", h2),
        Paragraph("中文<br/>我提供的是文字命理报告，不是即时闲聊。<br/>你可以先自行输入资料排盘。<br/>如果需要更深入的判断，可以预约付费文字分析。<br/>我更重结构、准确度和语言本身，不做多余表演。", body),
        Paragraph("English<br/>I offer written readings, not instant chatting.<br/>You can enter your birth data and generate the chart yourself first.<br/>If you want a deeper reading, you can order a paid written report.<br/>I care about structure, precision, and language itself, not performance.", body),
        Paragraph("3. 珠串第一组", h2),
        Paragraph("中文<br/>第一批珠串作品。<br/>我喜欢材料、重量、光感和佩戴时身体的反应。<br/>有些会做成现货，有些更适合少量定制。<br/>我不追求堆砌，重的是比例、触感和气质。", body),
        Paragraph("English<br/>First group of handmade pieces.<br/>I care about material, weight, light, and the body's response when worn.<br/>Some will be offered as ready-made pieces, and some are better suited to small custom orders.<br/>I am not interested in excess. I care about proportion, touch, and presence.", body),
        Paragraph("4. 艺术作品第一张", h2),
        Paragraph("中文<br/>先放一件作品。<br/>比起解释，我更想让它先自己站着。<br/>之后会慢慢整理旧作和新系列，把它们放回各自该在的位置。<br/>作品不是库存，是长期累积出来的结构。", body),
        Paragraph("English<br/>Starting with one work.<br/>Before explaining it, I prefer to let it stand on its own.<br/>I will slowly organize older works and newer series and return each of them to its proper place.<br/>Works are not inventory to me. They are a long structure built over time.", body),
        Paragraph("5. 工作过程", h2),
        Paragraph("中文<br/>我的工作方式很简单：<br/>写，画，做，改。<br/>有时候是写一份报告，有时候是画一张画，有时候是把一串珠子来回调整很多次。<br/>慢不是拖延，是方法。", body),
        Paragraph("English<br/>My way of working is simple:<br/>write, paint, make, revise.<br/>Sometimes it means finishing a reading, sometimes a painting, sometimes adjusting one strand again and again.<br/>Slow is not delay for me. It is method.", body),
        Paragraph("6. 报告样张", h2),
        Paragraph("中文<br/>放一小段报告样张。<br/>我做的不是安慰型文字，而是把结构讲清楚。<br/>重点不是说好听的话，而是把问题、主轴和出口点写出来。<br/>如果需要深入内容，可以正式预约。", body),
        Paragraph("English<br/>A small excerpt from a reading.<br/>What I write is not comfort-writing. I try to make the structure visible.<br/>The point is not to sound pleasing, but to identify the problem, the axis, and the way out.<br/>If you want a full reading, you can order one formally.", body),
        Paragraph("7. 珠串第二组", h2),
        Paragraph("中文<br/>这一组更接近佩戴中的状态。<br/>我会反复看颜色之间的气息、石头和皮肤的关系、以及整体落在身体上的感觉。<br/>有些作品适合日常，有些更像个人护符。<br/>之后会慢慢补更多细节图。", body),
        Paragraph("English<br/>This group is closer to how the pieces actually live on the body.<br/>I pay attention to the relation between colors, stone and skin, and the overall feeling when worn.<br/>Some pieces are for daily use, and some feel more like personal talismans.<br/>I will add more detail images over time.", body),
        Paragraph("8. 艺术系列说明", h2),
        Paragraph("中文<br/>有些旧作我会作为一个完整系列重新整理。<br/>我不想把过去的作品当成散页，而是把它们重新放回一个清楚的脉络里。<br/>时间过去了，作品会变，观看它们的方法也会变。<br/>但有些线其实一直都在。", body),
        Paragraph("English<br/>Some older works will be reorganized as complete series.<br/>I do not want to treat the past as loose pages. I want to return it to a clear structure.<br/>Time changes the work, and it also changes the way we look at it.<br/>But some lines have been there all along.", body),
        Paragraph("9. 你的方法", h2),
        Paragraph("中文<br/>为什么我更偏向文字报告。<br/>因为我更相信慢一点、准一点、少一点噪音。<br/>比起即时反应，我更在意判断本身是否成立。<br/>对我来说，清楚比热闹重要。", body),
        Paragraph("English<br/>Why I prefer written readings.<br/>Because I trust slower work, more precise work, and less noise.<br/>More than instant reaction, I care whether the judgment itself holds.<br/>For me, clarity matters more than display.", body),
        Paragraph("10. 海边工作室气氛", h2),
        Paragraph("中文<br/>海边的工作状态。<br/>不是度假感，而是我真实待着、工作、发呆、继续做下去的地方。<br/>有些东西需要安静环境才能慢慢长出来。<br/>这里就是那样的地方。", body),
        Paragraph("English<br/>The working atmosphere by the sea.<br/>Not as a holiday image, but as the place where I actually stay, work, drift, and continue.<br/>Some things can only grow in a quiet environment.<br/>This is that place for me.", body),
        Paragraph("11. 定制逻辑", h2),
        Paragraph("中文<br/>关于定制。<br/>我只接少量，也不会什么都接。<br/>如果是珠串定制，我更在意需求是否清楚、审美是否对路、以及交流是否干净。<br/>如果你想询问，可以先把需求发给我。", body),
        Paragraph("English<br/>About custom work.<br/>I only take a small number of requests, and I do not accept everything.<br/>For jewelry commissions, I care about clarity of intention, visual alignment, and clean communication.<br/>If you want to ask, send me your request first.", body),
        Paragraph("12. 总入口帖", h2),
        Paragraph("中文<br/>这里是总入口。<br/>如果你想看作品，可以进作品档案。<br/>如果你想预约命理文字报告，可以直接进入下单页面。<br/>如果你想询问珠串或定制，也可以从这里联系我。", body),
        Paragraph("English<br/>This is the main entry.<br/>If you want to browse the works, go to the archive.<br/>If you want to order a written reading, go directly to the order page.<br/>If you want to ask about jewelry or a commission, you can contact me from here.", body),
        Spacer(1, 6),
        Paragraph("网站首页文案", h1),
        Paragraph("首屏", h2),
        Paragraph("主标题<br/>艺术、命理文字报告与定制珠串", body),
        Paragraph("副标题<br/>一个安静的个人工作室。<br/>在海边工作，做图像、文字判断与手工制作。", body),
        Paragraph("按钮<br/>预约报告 / 浏览作品 / 查看珠串", body),
        Paragraph("三栏说明", h2),
        Paragraph("命理报告<br/>输入资料，自助排盘；深度内容为付费文字报告。", body),
        Paragraph("定制珠串<br/>少量成品与按需求制作，材质与配色可定向调整。", body),
        Paragraph("艺术档案<br/>绘画、旧作系列与持续更新中的作品页面。", body),
        Paragraph("合作步骤", h2),
        Paragraph("标题<br/>如何进入", body),
        Paragraph("1. 浏览作品或服务<br/>2. 提交资料或联系我<br/>3. 确认后下单或定制", body),
        Paragraph("联系区", h2),
        Paragraph("Order / contact<br/>Instagram / Email / WhatsApp / WeChat", body),
        Spacer(1, 6),
        Paragraph("额外可复制短句", h1),
        Paragraph("边界感短句", h2),
        Paragraph("你可以想我，但别顺手用我。<br/>有些东西可以聊，有些东西要付费。<br/>这是工作内容，不是随手送的。<br/>私人聊天和专业报告是两回事。", body),
        Paragraph("西语对应", h2),
        Paragraph("Puedes pensar en mi, pero no me uses de paso.<br/>Hay cosas que se pueden hablar, y otras se pagan.<br/>Esto es trabajo, no algo que se da porque si.<br/>Hablar por privado y pedir un informe profesional son cosas distintas.", body),
    ]

    doc.build(story)


if __name__ == "__main__":
    build()
