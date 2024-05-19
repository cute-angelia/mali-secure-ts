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
export declare class Secure {
    appid: string;
    secret: string;
    version: string;
    device?: string;
    platform?: string;
    constructor(appid: string, secret: string, version: string, device?: string, platform?: string);
    getSign(url: string, crypto?: number): string;
    _generateSign(url: string, data: any): string;
    _generateNonceDateline(): number;
    _generateNonceString(length: number): string;
}
