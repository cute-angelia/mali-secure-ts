import CryptoES from "crypto-es";
import { parseuri } from "./parseuri.js";
var Secure = /** @class */ (function () {
    function Secure(appid, secret, version, device, platform) {
        this.appid = appid;
        this.secret = secret;
        this.version = version;
        this.device = device;
        this.platform = platform;
    }
    // SignUrl 签名
    Secure.prototype.SignUrl = function (url, crypto) {
        var debug = 'false';
        try {
            debug = localStorage && localStorage['env'] == 'local' ? 'true' : 'false';
        }
        catch (e) { }
        var params = {
            appid: this.appid,
            version: this.version,
            device: this.device || "",
            platform: this.platform || "",
            nonce_str: this._generateNonceString(8),
            nonce_time: this._generateNonceDateline(),
        };
        if (debug == 'true') {
            params.debug = debug;
        }
        if (crypto && crypto > 0) {
            params.crypto = crypto;
        }
        return this._generateSign(url, params);
    };
    // DecryptCrypto2 解密密文
    /**
     * demo:
     *
     *  if (response && response.code == 0) {
          if (response.data == null || typeof response.data === 'object' || Array.isArray(response.data)) { } else {
            let key = "ydxdoaz318x3jvaf" + response.data.substr(0, 16);
            let ciphertext = response.data.substr(16, response.data.length);
            response.data = DecryptCrypto2(ciphertext, key)
          }
        }
     *
     */
    // DecryptCrypto2(inputText: string, key: string) {
    //   // 字符串转为字节数组
    //   const xorInput = decode(inputText);
    //   let result = '';
    //   for (let i = 0; i < xorInput.length; i++) {
    //     const j = i % key.length;
    //     const c = String.fromCharCode(xorInput[i] ^ key.charCodeAt(j));
    //     result += c;
    //   }
    //   // Base64解码最终结果
    //   const decodedResult = decode(result).toString();
    //   return JSON.parse(decodedResult);
    // }
    // data = { "nonce_str": "nonce_str=xxx", "nonce_time": "nonce_time="xxx"}
    Secure.prototype._generateSign = function (url, data) {
        var parseurl = parseuri(url);
        var keys = [];
        // keys for url
        for (var value in parseurl.queryKey) {
            keys.push(value);
        }
        // keys for input
        var inputKeys = Object.keys(data);
        for (var i = 0; i < inputKeys.length; i++) {
            keys.push(inputKeys[i]);
        }
        // sort keys
        keys = keys.sort();
        // get url params
        var params = [];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var element = keys_1[_i];
            if (parseurl.queryKey[element]) {
                params.push(element + '=' + parseurl.queryKey[element]);
            }
            else {
                params.push(element + '=' + data[element]);
            }
        }
        var stringA = params.join('&');
        var stringSignTemp = stringA + '&key=' + this.secret;
        // console.log(stringSignTemp)
        var signMd5 = 'sign=' + CryptoES.MD5(stringSignTemp).toString().toLowerCase();
        params.push(signMd5);
        if (parseurl.protocol.length > 2) {
            return (parseurl.protocol +
                '://' +
                parseurl.authority +
                parseurl.path +
                '?' +
                params.join('&'));
        }
        else {
            return parseurl.host + parseurl.path + '?' + params.join('&');
        }
    };
    Secure.prototype._generateNonceDateline = function () {
        return (new Date().getTime() / 1000) | 1;
    };
    // 获取一次性字符串
    Secure.prototype._generateNonceString = function (length) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var noceStr = '';
        for (var i = 0; i < (length || 32); i++) {
            noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return noceStr;
    };
    return Secure;
}());
export default Secure;
;
