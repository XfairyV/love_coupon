# Love Coupon
# 爱情抽抽乐

让恋人送出祝福，抽取一张爱情兑换券，看看你对对方的“爱意”，决定了你能抽出什么。使用这个项目，你可以制作各种爱情兑换券，并让你的恋人在特定时刻抽取一张，看看你对TA的“爱意”，享受甜蜜的互动。

![爱情兑换券示例](docs/img/img1.png)

目前线上使用地址：[http://love.xfairy.cn](http://love.xfairy.cn)

注意，因为浏览器限制，打开以后无法自动播放，要手动播放音乐，带端口号的可以自动播放..

这个项目完全是用各种AI工具制作的，背景音乐由 Suno 生成（npy生成的520love），爱情兑换券由 DALL-E 生成，代码由 GPT-4 编写。稍后会更新详细的音乐和兑换券制作方法。


## 功能列表

### 现有功能
- **修改背景音乐**：在 `config.json` 中修改音乐文件路径。
- **增加爱情兑换券**：支持放入自制的奖券，在 `love_coupon/coupons` 文件夹中增加图片，并在 `config.json` 中添加对应的奖券路径。
- **修改开场文字**：在 `config.json` 中修改开场文字。
- **修改模型**：支持 GPT 系列模型，可在 `config.json` 中更换模型名称和 API 密钥。
- **支持外接日志 API**：支持自定义日志 API 接口。

### 未来计划
- **增加更多模型**：支持更多 AI 模型。
- **快速生成奖券**：增加快速生成奖券的功能。

## 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/XfairyV/love_coupon.git
   cd love_coupon
   ```

2. **修改配置**
   打开 `config.json` 文件，根据需求修改配置。目前使用的是 GPT-4 模型。

3. **启动项目**
   在命令行运行以下命令：
   ```bash
   python -m http.server
   ```

4. **打开浏览器**
   打开浏览器并访问 `http://localhost:8000`，开始制作你的爱情兑换券（也可换成你的服务器路径）。

## 爱情兑换券制作方法

目前由 GPT 和 DALL-E 生成，参考 prompt 如下。欢迎联系我更新更多有趣的兑换券！

```
一个梦幻星空主题的爱情兑换券设计。深蓝色和紫色的渐变为主色调，带有星星、月亮和银河。背景有微弱的星光闪烁效果。包含一个情侣躺在毯子上看星星的场景插画。上方留白供填写文字。 --ar 2:1 --q 2
```

## 背景小故事

在520这个浪漫的日子，窗帘遮住了清晨的缕缕阳光，我却被外卖小哥的电话惊醒了，收到了一束来自npy的鲜花。

![花](docs/img/img2.jpg)

这一刻，我感到一丝丝的感动，仿佛是久违了的浪漫回归了我的生活。

我决定为这份感动做点什么，于是我上网搜索了一番程序员的表白代码，但发现它们都有些平淡无奇，不足以表达我内心的澎湃。然而，在这个AI时代，我突然想到了一个主意：为何不自己动手做一个浪漫的项目呢？于是，我又搜索了一番，找到了一张爱心气泡的图，发送给了GPT。

意想不到的是，GPT竟然很快地帮我写出了80%还原了。但我觉得还不够，我想要上一个新的高度。

恰好前几天，我在逛淘宝时，偶然看到了一种爱情兑换卡。突然间我有了灵感，既然文字和图片生成都如此方便，那我何不做一个兑换券的项目呢？给npy准备一些特别的惊喜！

这是我收到npy收到我的小惊喜后的快乐~

![聊天](docs/img/img2.png)

这是这个项目的起源~


---

感谢使用爱情抽抽乐项目，❤️希望你能通过这个项目制作出令人难忘的爱情兑换券，给你的恋人带来更多的惊喜与感动，如果你有任何问题或建议，欢迎通过 Issue 与我们联系。让我们一起将浪漫进行到底！

---
