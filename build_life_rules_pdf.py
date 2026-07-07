from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


OUTPUT = "my-life-rules.pdf"


TEXT = [
    "我不再让任何人随手拿走我的时间、脑力、身体、审美、判断力和精神能量。<br/>这些都是我的命，不是公共资源。",
    "我不再因为别人痛苦、迷茫、受伤，就自动去承接。<br/>别人的课题，不自动成为我的责任。<br/>我可以理解，但我不负责收拾。",
    "我不再把高价值的东西混在暧昧、友情、同情和临时兴起里白白送掉。<br/>凡是需要我认真判断、分析、书写、设计、制作的内容，都属于劳动。<br/>劳动就有价值，价值就该被尊重。",
    "我不再为了被爱、被理解、被看见，而降低自己的边界。<br/>真正适合我的关系，不会靠我自我削弱来维持。<br/>谁让我变小，谁就不适合进入我的生命。",
    "我不再因为性欲、寂寞、共振感和短暂心动，就把不该进来的人放进来。<br/>有吸引不等于有资格。<br/>有张力不等于有未来。<br/>身体的火，不配替我做决定。",
    "我不再把“看起来很美”的共同愿景，当成我可以交付自己的理由。<br/>再好的梦，如果不能落实成清楚的分工、节奏、收入和边界，也只是梦。<br/>我先有自己的结构，再谈任何合作和共建。",
    "我不再重复父母的命。<br/>他们的痛苦、毛病、混乱、匮乏、拉扯，到我这里为止。<br/>我已经替这些旧结构活过、痛过、付过代价。<br/>从现在开始，我要活我自己的命。",
    "我不再把拖延、散乱、幻想和无形的内耗，当成命运本身。<br/>我的命不是用来反复困在感觉里的。<br/>我的命要落到现实里：<br/>写出来，做出来，摆出来，卖出去，活下去。",
    "我不再怀疑自己有价值。<br/>我过去的问题不是没有价值，<br/>而是价值长期没有被我自己认真接住。<br/>从现在开始，我要亲自接住它。",
    "我不再向低质量交换妥协。<br/>我不接模糊的索取。<br/>我不接混乱的情绪。<br/>我不接没有分寸的靠近。<br/>我不接只有欲望没有尊重的关系。<br/>我不接只有愿景没有结构的合作。",
    "我允许自己慢，但我不允许自己继续散。<br/>慢是我的方法，不是我的借口。<br/>我可以慢慢做，但我要持续做。<br/>每一周，我都要在现实里留下东西。",
    "我接受我不是早早展开的人。<br/>我前面的很多年不是成果期，而是清障期。<br/>那些痛苦和浪费感我承认。<br/>但我不再把余生继续交给懊悔。<br/>我的后半生，不再替过去陪葬。",
    "我知道自己真正要的，不只是活着。<br/>我要的是有主体地活，有边界地活，有作品地活，有收入地活，有尊严地活。<br/>我要建立自己的结构，而不是漂在别人和情绪里。",
    "从现在开始，我的命由我自己收回。<br/>一步一步收回。<br/>不着急，不讨好，不降价，不自弃。<br/>我不再向下流失。<br/>我要向内扎根，向外成形。",
]


def build():
    pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "TitleCN",
        parent=styles["Title"],
        fontName="STSong-Light",
        fontSize=18,
        leading=24,
        spaceAfter=12,
    )
    body = ParagraphStyle(
        "BodyCN",
        parent=styles["BodyText"],
        fontName="STSong-Light",
        fontSize=11,
        leading=16,
        spaceAfter=8,
    )

    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
    )

    story = [Paragraph("我的人生铁规矩", title), Spacer(1, 4)]
    story.extend(Paragraph(item, body) for item in TEXT)
    doc.build(story)


if __name__ == "__main__":
    build()
