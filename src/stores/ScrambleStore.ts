import { makeAutoObservable } from "mobx";
import { MainStore } from "./MainStore";

export class ScrambleStore {
    MainStore: MainStore;
    constructor(mainStore: MainStore) {
        this.MainStore = mainStore;
        
        makeAutoObservable(this, {});
    }

    public update(key: keyof this, value: any) {
        this[key] = value;
    }
}
