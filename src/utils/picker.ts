import { RandexSetUtil } from "../basic/set";

export class RandexPicker {
  private readonly _items: any[];

  private _tempItems: any[];

  constructor(public readonly items: any[] = []) {
    this._items = items;
    this._tempItems = [...items];
  }

  public pick(count = 1) {
    if (!this._items.length || count <= 0) {
      return [];
    }

    const result: any[] = [];

    for (let i = 0; i < count; i++) {
      if (!this._tempItems.length) {
        this._tempItems = [...this._items];
      }

      const index = RandexSetUtil.randomSingleNumber(this._tempItems.length);
      const [item] = this._tempItems.splice(index, 1);
      result.push(item);
    }

    return result;
  }
}
