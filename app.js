// 引用linebot SDK
var linebot = require("linebot");

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: "1621633629",
  channelSecret: "1e05170da187430db901824ea3c828af",
  channelAccessToken: "DepQ/NyOzsONFlCTFBJjjh9nX71mxRzbXZj6oF807lplqS6me869P/069620OqnaxEnZGdZX4ESymXzu9Fct7mR52RDalck2v7a2MsbOFI8G4oswX95ksJ+GAfd5krJr3ISIAMMstOrcarcgp8XzLgdB04t89/1O/w1cDnyilFU="
});

// 當有人傳送訊息給Bot時
bot.on("message", function(event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  event
    .reply(event.message.text)
    .then(function(data) {
      // 當訊息成功回傳後的處理
    })
    .catch(function(error) {
      // 當訊息回傳失敗後的處理
    });
});

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function() {
  console.log("[BOT已準備就緒]");
});
