const fs = require("fs");
const output = require("d3node-output");
const d3 = require("d3-node")().d3;
const d3nLine = require("./d3node");

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

const parseTime = d3.timeParse("%d-%b-%y");
const tsvString = fs.readFileSync("data/data.tsv").toString();
const data = d3.tsvParse(tsvString, d => {
  return {
    key: parseTime(d.date),
    value: +d.close
  };
});

// create output files
output("./images/lineChart", d3nLine({ data: data }), {
  width: 960,
  height: 550
});

// 當有人傳送訊息給Bot時
bot.on("message", function(event) {
  // event.message.text是使用者傳給bot的訊息
  // 準備要回傳的內容
  // var replyMsg = `Hello: ${event.message.text}`;
  var replyMsg = {
    type: "image",
    originalContentUrl: "https://drive.google.com/file/d/1hpN1ifI3Qh1D72mGIsZ4eonlJRYhfXXM/view?usp=sharing",
    previewImageUrl: "https://drive.google.com/file/d/1hpN1ifI3Qh1D72mGIsZ4eonlJRYhfXXM/view?usp=sharing"
  };

  // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者

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
