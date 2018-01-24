import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public writeJwt(value: string): void {
    this.add('token', value);
  }

  public getJwt(): string {
    return this.get('token');
  }

  public add(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: string): string {
    return localStorage.getItem(key);
  }

  public deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
}
