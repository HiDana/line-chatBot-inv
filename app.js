// 引用linebot SDK
var linebot = require("linebot");
var request = require("request");
var schedule = require("node-schedule");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: "1621633629",
  channelSecret: "e895b619a261771e845fadfd86f91057",
  channelAccessToken: "CHtJ+o79XwnP2sl33WyoeRpZW8R2Obl6JADVEv21cWuGXFQiYH1rAnxui/vxDwP8xEnZGdZX4ESymXzu9Fct7mR52RDalck2v7a2MsbOFI+TMnWmo8N/LDh6HWPwQEAgIli3RlVuyOdvC3LyQ/hTPgdB04t89/1O/w1cDnyilFU="
});

const userId = "Uefbd1dd6d4fe3e159fa89d398c2eb306";

let replyInfo;

request("https://tw.rter.info/capi.php", function(error, res, body) {
  // console.log("statusCode:", res && res.statusCode); // Print the response status code if a response was received
  const USDTWD = JSON.parse(res.body).USDTWD.Exrate; //美金轉台幣
  const USDJPY = JSON.parse(res.body).USDJPY.Exrate; //美金轉日圓
  const USDCNY = JSON.parse(res.body).USDCNY.Exrate; //美金轉人民幣
  const USDCAD = JSON.parse(res.body).USDCAD.Exrate; //美金轉加幣

  // console.log("人民幣轉台幣", USDTWD / USDCNY);
  // console.log("日幣轉台幣", USDTWD / USDJPY);
  // console.log("加幣轉台幣", USDTWD / USDCAD);
  replyInfos = [
    { title: "RMB -> TWD", ext: (USDTWD / USDCNY).toFixed(4) },
    { title: "JPY -> TWD", ext: (USDTWD / USDJPY).toFixed(4) }
  ];

  let sendMsg = replyInfos.map(info => `${info.title} ${info.ext}`).join("\n");
  bot.push(userId, [sendMsg]);
});

// scheduleCronstyle = () => {
//   // schedule.scheduleJob("0 0 10 * * *", function() {
//   schedule.scheduleJob("20 * * * * *", function() {
//     console.log("scheduleCronstyle:" + new Date());

//   });
// };

// scheduleCronstyle();

// 當有人傳送訊息給Bot時
bot.on("message", function(event) {
  // event.message.text是使用者傳給bot的訊息
  // 準備要回傳的內容
  // var replyMsg = `Hello: ${event.message.text}`;
  var replyMsg = {
    type: "image",
    originalContentUrl: "https://pbs.twimg.com/media/DuSMS-3UwAAIYtI.jpg:large",
    previewImageUrl: "https://pbs.twimg.com/media/DuSMS-3UwAAIYtI.jpg"
  };

  // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
  console.log("replyInfo", replyInfo);

  event
    .reply(replyMsg)
    .then(function(data) {
      // 當訊息成功回傳後的處理
    })
    .catch(function(error) {
      // 當訊息回傳失敗後的處理
    });
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function() {
  console.log("[BOT is ready]");
  // console.log();
});
