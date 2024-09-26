import Secure from "./secure.js";

let appid = "20201111091600509389"
let appSecret = "9632d8f2265834e22648d95da558fe13"
let version = "1.0.8"
let device = "iosx"
let platform = "wechat"

let s = new Secure(appid, appSecret, version, device, platform)

let uri1 = s.SignUrl('https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=1515154505&lang=zh_CN', 2)

console.log(uri1)

