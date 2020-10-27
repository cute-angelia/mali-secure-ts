export declare class Secure {
    appid: string;
    version: string;
    cid: number;
    secret: string;
    constructor(appid: string, cid: number, secret: string, version: string);
    getSign(url: string): string;
    _generateSign(url: string, data: any): string;
    _generateNonceDateline(): number;
    _generateNonceString(length: number): string;
}
