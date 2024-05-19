import {
  Md5
} from 'ts-md5/dist/md5';

import { parseuri } from "./parseuri";

export interface DataType {
  appid: string;
  version: string;
  device: string;
  platform: string;
  nonce_str: string;
  nonce_time: number;
  debug?: string;
  crypto?: number
}

export class Secure {
  appid: string
  secret: string
  version: string

  device?: string
  platform?: string

  constructor(appid: string, secret: string, version: string, device?: string, platform?: string) {
    this.appid = appid
    this.secret = secret
    this.version = version

    this.device = device
    this.platform = platform
  }

  getSign(url: string, crypto?: number) {
    let debug = 'false'
    try {
      debug = localStorage && localStorage['env'] == 'local' ? 'true' : 'false'
    } catch (e) { }


    let params: DataType = {
      appid: this.appid,
      version: this.version,
      device: this.device || "",
      platform: this.platform || "",
      nonce_str: this._generateNonceString(8),
      nonce_time: this._generateNonceDateline(),
    };

    if (debug == 'true') {
      params.debug = debug
    }

    if (crypto && crypto > 0) {
      params.crypto = crypto
    }
    return this._generateSign(url, params)
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

    console.log(stringSignTemp)

    var signMd5 = 'sign=' + Md5.hashStr(stringSignTemp).toString().toLowerCase()
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
};