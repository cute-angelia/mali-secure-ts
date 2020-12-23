export declare class Secure {
    appid: string;
    version: string;
    cid: number;
    secret: string;
    device: string;
    platform: string;
    constructor(appid: string, cid: number, secret: string, version: string, device: string, platform: string);
    getSign(url: string): string;
    getSignTest(url: string, nonce_str: string, nonce_time: string): string;
    _generateSign(url: string, data: any): string;
    _generateNonceDateline(): number;
    _generateNonceString(length: number): string;
}
