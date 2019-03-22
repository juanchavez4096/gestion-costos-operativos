import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    getItemStorage(nameItem: string, parse = true, local = false) {
        const storage: any = local ? localStorage : sessionStorage;
        return parse ? JSON.parse(storage.getItem(nameItem)) : storage.getItem(nameItem);
    }

    checkItemStorage(nameItem: string, local = false): boolean {
        const storage: any = local ? localStorage : sessionStorage;
        return storage.getItem(nameItem) !== null;
    }

    setItemStorage(value: any, nameItem: string, local = false) {
        const storage: any = local ? localStorage : sessionStorage;
        storage.setItem(nameItem, JSON.stringify(value));
    }

    removeItemStorage(nameItem: string) {
        sessionStorage.removeItem(nameItem);
    }

    removeAllItems() {
        sessionStorage.clear();
    }
}
