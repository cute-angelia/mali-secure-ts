export interface DataType {
    appid: string;
    version: string;
    device: string;
    platform: string;
    nonce_str: string;
    nonce_time: number;
    debug?: string;
    crypto?: number;
}
export default class Secure {
    appid: string;
    secret: string;
    version: string;
    device?: string;
    platform?: string;
    constructor(appid: string, secret: string, version: string, device?: string, platform?: string);
    SignUrl(url: string, crypto?: number): string;
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
    _generateSign(url: string, data: any): string;
    _generateNonceDateline(): number;
    _generateNonceString(length: number): string;
}
