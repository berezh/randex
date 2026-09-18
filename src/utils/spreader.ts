import { RandexSetUtil } from "../basic/set";

export class RandexSpreader<TItem = any> {
  private readonly _items: TItem[];

  private _tempItems: TItem[];

  constructor(public readonly items: TItem[] = []) {
    this._items = items;
    this._tempItems = [...items];
  }

  public spread(count = 1) {
    if (!this._items.length || count <= 0) {
      return [];
    }

    const result: TItem[] = [];

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
