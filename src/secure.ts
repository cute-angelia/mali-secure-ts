import { Md5 } from 'ts-md5/dist/md5';
var parseuri = require('./parseuri')
var crypto = require('crypto')

// var md5 = new Md5()
// console.log(Md5.hashStr(""))

class Secure {
  appid: string
  version: string
  cid: number
  secret: string

  constructor(appid: string, cid: number, secret: string, version: string) {
    this.appid = appid
    this.cid = cid
    this.secret = secret
    this.version = version
  }

  // 解密数据
  // {"code":0,"crypto":"mDeTotIpUkpOYLozkRYdjbymLRiknTHB","data":"a79d81f0647a7edfc0bea6ae3c2f3e1c3531977a1767adb937158ba68ef2cbed4b0cd3839bad9eb20f53df4f138353c85d5d449418a62384d564c978000908adc4c4c6e12b227a0bbe5873d736731b11ffb2417558247e5b8dee7ba508a47e5553ed143c8888decd02e111d7a8a47bb7133eeda41865bde0520fdd871fb7ab9b71b435317bb6f79881fe0c88506738d34208ae2166da299770ea9a34c01a12da92382e53c0b39a65d7e40372d5e708bbfd62e4680e6743f9e76fd96d1c64032a710cfc3055538d2176b286c99cff3f74c8a7312e8800182c272e2a147a0afb5bbc23167b7c8041d2a9d5a1a3664a108c99f020847e94b79219bd98e730d7d4df1b247ba994c89f7418b2c669bcd789060e137849917080cf0992a10a58bf1ef9e7ea229b450432c06be50c7f500e2c5b23c3da45aa7061da231c65c3b24bfc916d78a87094742745beb30da75616acf30ef81939546f06e1246064d3443fee94d95ff8e964945e0386a9fa5dbc934fe0ba22623ce96b802ba5e48797d574bb22","msg":"成功!"}
  decrypt(json: any) {
    if (json.crypto && json.crypto.length > 0) {
      const ALGORITHM = 'aes-256-cbc'
      const BLOCK_SIZE = 16

      let CIPHER_KEY = json.crypto
      let cipherText = json.data

      // Decrypts cipher text into plain text
      const contents = Buffer.from(cipherText, 'hex')
      const iv = contents.slice(0, BLOCK_SIZE)
      const textBytes = contents.slice(BLOCK_SIZE)

      const decipher = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, iv)
      let decrypted = decipher.update(textBytes, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      json.data = JSON.parse(decrypted)

      json.data = this.checkBase64(json.data)
    }
    return json
  }

  checkBase64(data:any) {
    try {
      return JSON.parse(window.atob(data))
    } catch (e) {
      return data
    }
  }

  // 获取签名后的地址
  // getSignPrue(url) {
  //   let debug = 'false'
  //   try {
  //     debug = localStorage && localStorage['env'] == 'local' ? 'true' : 'false'
  //   } catch (e) {}

  //   let data = {
  //     debug: debug,
  //     nonce_str: this._generateNonceString(8),
  //     nonce_time: this._generateNonceDateline(),
  //   }
  //   if (debug == 'false') {
  //     delete data.debug
  //   }
  //   return this._generateSign(url, data)
  // }

  getSign(url: string) {
    let debug = 'false'
    try {
      debug = localStorage && localStorage['env'] == 'local' ? 'true' : 'false'
    } catch (e) {}
    let data = {
      debug: debug,
      appid: this.appid,
      cid: this.cid,
      nonce_str: this._generateNonceString(8),
      nonce_time: this._generateNonceDateline(),
    }
    if (debug == 'false') {
      delete data.debug
    }
    return this._generateSign(url, data)
  }

  // data = { "nonce_str": "nonce_str=xxx", "nonce_time": "nonce_time="xxx"}
  _generateSign(url: string, data: any) {
    var parseurl = parseuri(url)
    let keys = []

    // keys for url
    for (var value in parseurl.queryKey) {
      keys.push(value)
    }

    // keys for input
    let inputKeys = Object.keys(data)
    for (let i = 0; i < inputKeys.length; i++) {
      keys.push(inputKeys[i])
    }

    // sort keys
    keys = keys.sort()
    // get url params
    var params: string[] = [];
    for (const element of keys) {
      if (parseurl.queryKey[element]) {
        params.push(element + '=' + parseurl.queryKey[element])
      } else {
        params.push(element + '=' + data[element])
      }
    }

    let stringA = params.join('&')
    let stringSignTemp = stringA + '&key=' + this.secret

    var signMd5 = 'sign=' +  Md5.hashStr(stringSignTemp).toString().toLowerCase()
    params.push(signMd5)

    if (parseurl.protocol.length > 2) {
      return (
        parseurl.protocol +
        '://' +
        parseurl.authority +
        parseurl.path +
        '?' +
        params.join('&')
      )
    } else {
      return parseurl.host + parseurl.path + '?' + params.join('&')
    }
  }

  _generateNonceDateline() {
    return (new Date().getTime() / 1000) | 1
  }

  // 获取一次性字符串
  _generateNonceString(length: number) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var maxPos = chars.length
    var noceStr = ''
    for (var i = 0; i < (length || 32); i++) {
      noceStr += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return noceStr
  }
}

module.exports.Secure = Secure;