import { Blog, Order, Product, User } from "./database/Database";

type CacheData = User[] | Product[] | Order[] | Blog[] | string
export default class EyekontactCache<T extends CacheData> {
    private _cacheData: T | unknown = null;
    isChanged: boolean = false;
    timestamp: Date = new Date();


    public set cacheData(data: T) {
        this.isChanged = true;
        this.timestamp = new Date();
        this._cacheData = data;
    }

    public get cacheData(): T {
        return this._cacheData as T;
    }

}
