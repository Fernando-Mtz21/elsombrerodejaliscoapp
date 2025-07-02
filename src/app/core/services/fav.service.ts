import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavService {
  private localStorageName: string = '';

  private getCurrentFavList(): number[] {
    const current: string = localStorage.getItem(this.localStorageName) ?? '';

    const numberArray: number[] = current.split(',').map(Number);

    return numberArray;
  }

  public toggleFav(idProduct: number): void {
    let numberArray: number[] = this.getCurrentFavList();

    if (numberArray.includes(idProduct)) {
      numberArray = numberArray.filter((x) => x != idProduct);
    } else {
      numberArray.push(idProduct);
    }

    const serializedNumberArray: string = numberArray.join(',');

    localStorage.setItem(this.localStorageName, serializedNumberArray);
  }

  public isItemFav(idProduct: number): boolean {
    const numberArray: number[] = this.getCurrentFavList();

    return numberArray.includes(idProduct);
  }
}
