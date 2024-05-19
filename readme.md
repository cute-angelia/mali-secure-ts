## mali-secure-ts

1. url签名(like:微信支付)

2. 解密数据


## install

`npm i mali-secure-ts --save-dev`


## usage

```
// 导入方式
import {Secure} from "mali-secure-ts";

// 初始化实例
// appid   应用id
// secret  秘钥
// version 版本号 1.0.1
// device  设备信息 ios_14.0.1
// platform 平台: app，wechat，h5
let s = new Secure.Secure('appid', '192006250b4c09247ec02edce69f6a2d', "1.0.3", "ios_14.2.3")

// 获得签名后的 url
let uri1 = s.SignUrl('https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=1515154505&lang=zh_CN',2)

console.log(uri1)
// https://mp.weixin.qq.com/wxamp/devprofile/get_profile?appid=appid&cid=cid1&lang=zh_CN&nonce_str=235nzeTP&nonce_time=1592213055&token=1515154505&sign=1deda92a05c849a17d4a0b0c3259f8fe


// 解密功能
console.log(s.DecryptCrypto2(inputText, key))


```

## publish

```
npm run build


npm run publish
```
