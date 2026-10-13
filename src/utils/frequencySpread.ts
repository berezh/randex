export class RandexFrequencySpread<TItem = any> {
  private readonly _items: TItem[];

  private readonly _frequencies: number[];

  private readonly _totalFrequency: number;

  constructor(public readonly items: ReadonlyArray<readonly [TItem, number]> = []) {
    let totalFrequency = 0;
    for (const [, frequency] of items) {
      if (!Number.isFinite(frequency) || frequency < 0) {
        throw new RangeError("Frequency must be a non-negative finite number.");
      }
      totalFrequency += frequency;
      if (!Number.isFinite(totalFrequency)) {
        throw new RangeError("Total frequency must be finite.");
      }
    }

    const positiveItems = items.filter(([, frequency]) => frequency > 0);
    this._items = positiveItems.map(([item]) => item);
    this._frequencies = positiveItems.map(([, frequency]) => frequency);
    this._totalFrequency = totalFrequency;
  }

  public get isEmpty() {
    return this._totalFrequency === 0;
  }

  public spread(count = 1): TItem[] {
    if (!Number.isSafeInteger(count)) {
      throw new RangeError("Count must be a safe integer.");
    }
    if (!this._totalFrequency || count <= 0) {
      return [];
    }

    const result: TItem[] = [];
    for (let i = 0; i < count; i++) {
      let offset = Math.random() * this._totalFrequency;
      let index = 0;
      while (index < this._items.length - 1 && offset >= this._frequencies[index]) {
        offset -= this._frequencies[index];
        index++;
      }

      result.push(this._items[index]);
    }
    return result;
  }
}
