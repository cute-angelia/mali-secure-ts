## mali-secure

1. 微信支付签名

2. 解密后端数据

## install

`npm i mali-secure-ts --save-dev`

[mali-secure](https://www.npmjs.com/package/mali-secure-ts)

## some example

```
// 导入方式
import {Secure} from "mali-secure-ts";

import Secure = require('mali-secure-ts');

or

var Secure = require('./secure.js')

// 初始化实例
// appid   应用id
// cid     渠道
// secret  秘钥
// version 版本号 1.0.1
// device  设备信息 ios_14.0.1
// platform 平台: app，wechat，h5
let s = new Secure.Secure('appid', 'cid1', '192006250b4c09247ec02edce69f6a2d', "1.0.3", "ios_14.2.3", "app")

// 获得签名后的 url
let uri1 = s.getSign(
  'https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=1515154505&lang=zh_CN'
)

console.log(uri1)
// https://mp.weixin.qq.com/wxamp/devprofile/get_profile?appid=appid&cid=cid1&lang=zh_CN&nonce_str=235nzeTP&nonce_time=1592213055&token=1515154505&sign=1deda92a05c849a17d4a0b0c3259f8fe


// 解密功能
let z = {"code":0,"crypto":"mDeTotIpUkpOYLozkRYdjbymLRiknTHB","data":"a79d81f0647a7edfc0bea6ae3c2f3e1c3531977a1767adb937158ba68ef2cbed4b0cd3839bad9eb20f53df4f138353c85d5d449418a62384d564c978000908adc4c4c6e12b227a0bbe5873d736731b11ffb2417558247e5b8dee7ba508a47e5553ed143c8888decd02e111d7a8a47bb7133eeda41865bde0520fdd871fb7ab9b71b435317bb6f79881fe0c88506738d34208ae2166da299770ea9a34c01a12da92382e53c0b39a65d7e40372d5e708bbfd62e4680e6743f9e76fd96d1c64032a710cfc3055538d2176b286c99cff3f74c8a7312e8800182c272e2a147a0afb5bbc23167b7c8041d2a9d5a1a3664a108c99f020847e94b79219bd98e730d7d4df1b247ba994c89f7418b2c669bcd789060e137849917080cf0992a10a58bf1ef9e7ea229b450432c06be50c7f500e2c5b23c3da45aa7061da231c65c3b24bfc916d78a87094742745beb30da75616acf30ef81939546f06e1246064d3443fee94d95ff8e964945e0386a9fa5dbc934fe0ba22623ce96b802ba5e48797d574bb22","msg":"成功!"}

console.log(s.decrypt(z))


```

## publish

```
npm run build


npm run publish
```
