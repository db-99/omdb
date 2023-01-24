import { Injectable } from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async saveData(key: string, data: any) {
    await Preferences.set({
      // key: key,
      key,
      value: JSON.stringify(data),
    });
  }

  async getData(key: string) {
    const history = await Preferences.get({
      key
    });
    if (history.value != null)
      return JSON.parse(history.value);
  }
}
