// 引用linebot SDK
var linebot = require("linebot");
var request = require("request");
var schedule = require("node-schedule");

const data = require("./data.json");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: "1621633629",
  channelSecret: "1e05170da187430db901824ea3c828af",
  channelAccessToken: "DepQ/NyOzsONFlCTFBJjjh9nX71mxRzbXZj6oF807lplqS6me869P/069620OqnaxEnZGdZX4ESymXzu9Fct7mR52RDalck2v7a2MsbOFI8G4oswX95ksJ+GAfd5krJr3ISIAMMstOrcarcgp8XzLgdB04t89/1O/w1cDnyilFU="
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
    { title: "人民幣 轉 台幣", ext: (USDTWD / USDCNY).toFixed(4) },
    { title: "日幣 轉 台幣", ext: (USDTWD / USDJPY).toFixed(4) },
    { title: "加幣 轉 台幣", ext: (USDTWD / USDCAD).toFixed(4) }
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
  // var replyMsg = `Hello:${event.message.text}`;
  // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
  console.log("replyInfo", replyInfo);

  event
    .reply(replyInfo)
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
