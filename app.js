// 引用linebot SDK
var linebot = require("linebot");
var request = require("request");
var schedule = require("node-schedule");
var mongoose = require("mongoose");
let User = require("./models/User");

// //連接 mongodb
mongoose.connect("mongodb://Dana:skaos53ka2@ds241059.mlab.com:41059/inv");
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: "1621633629",
  channelSecret: "e895b619a261771e845fadfd86f91057",
  channelAccessToken: "PbwTTExs+9Wmm6Cp6cWh7iph8+HbfQjuNJNwd2dItJNOPqV4SBentpdBPStg0zqoxEnZGdZX4ESymXzu9Fct7mR52RDalck2v7a2MsbOFI/7/N1wfttJANwFue4vUgtJw9pMJhNAyi8FNhVQOSWMgwdB04t89/1O/w1cDnyilFU="
});

// 當有人傳送訊息給Bot時
bot.on("message", function(event) {
  event.source.profile().then(function(profile) {
    console.log(profile);
    //[N] before save ,find the user ever exist
    User.find({ user_id: profile.userId }, "user_id user_name", function(
      err,
      user
    ) {
      console.log("user", user);
      if (user.length < 1) {
        //[N] save newUser
        var NewUser = new User({
          user_id: profile.userId,
          user_name: profile.displayName
        });

        NewUser.save(function(error) {
          event
            .reply("[A] newUser was saved!")
            .then(function(data) {
              // 當訊息成功回傳後的處理
            })
            .catch(function(error) {
              // 當訊息回傳失敗後的處理
            });
          if (error) {
            console.error(error);
          }
        });
      } else {
				.reply("[A] The user was exsit, not to save")
            .then(function(data) {
              // 當訊息成功回傳後的處理
            })
            .catch(function(error) {
              // 當訊息回傳失敗後的處理
            });
      }
      if (err) return handleError(err);
    });
  });

  //圖片
  // var replyMsg = {
  //   type: "image",
  //   originalContentUrl: "https://pbs.twimg.com/media/DuSMS-3UwAAIYtI.jpg:large",
  //   previewImageUrl: "https://pbs.twimg.com/media/DuSMS-3UwAAIYtI.jpg"
  // };
});

// 取得匯率資料並推播
function ex_push_ontime() {
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

    let sendMsg = replyInfos
      .map(info => `${info.title} ${info.ext}`)
      .join("\n");

    //[N] 取得 DB 所有用戶資訊
    User.find({}, function(err, users) {
      let userMap = [];
      users.forEach(function(user) {
        userMap.push(user);
      });
      userMap.map(user => {
        bot.push(user.user_id, [sendMsg]);
      });
    });
  });
}

// 定時跑這隻
scheduleCronstyle = () => {
  // schedule.scheduleJob("0 0 10 * * *", function() {
  schedule.scheduleJob("20 * * * * *", function() {
    console.log("scheduleCronstyle:" + new Date());
    ex_push_ontime();
  });
};

scheduleCronstyle();

// Bot所監聽的webhook路徑與port
bot.listen("/linewebhook", 3000, function() {
  console.log("[BOT is ready]");
  // console.log();
});
