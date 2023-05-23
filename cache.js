"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EyekontactCache {
    constructor() {
        this._cacheData = null;
        this.isChanged = false;
        this.timestamp = new Date();
    }
    set cacheData(data) {
        this.isChanged = true;
        this.timestamp = new Date();
        this._cacheData = data;
    }
    get cacheData() {
        return this._cacheData;
    }
}
exports.default = EyekontactCache;
