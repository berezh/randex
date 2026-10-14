import { RandexSetUtil } from "../basic/set";

export class RandexFrequencySpreader<TItem = any> {
  private readonly _items: TItem[];

  private readonly _frequencies: number[];

  private readonly _totalFrequency: number;

  private _remainingFrequencies: number[];

  private _remainingCount: number;

  constructor(public readonly items: ReadonlyArray<readonly [TItem, number]> = []) {
    let totalFrequency = 0;
    for (const [, frequency] of items) {
      if (!Number.isSafeInteger(frequency) || frequency < 0) {
        throw new RangeError("Frequency must be a non-negative safe integer.");
      }
      totalFrequency += frequency;
      if (!Number.isSafeInteger(totalFrequency)) {
        throw new RangeError("Total frequency must be a safe integer.");
      }
    }

    this._items = items.map(([item]) => item);
    this._frequencies = items.map(([, frequency]) => frequency);
    this._totalFrequency = totalFrequency;
    this._remainingFrequencies = [...this._frequencies];
    this._remainingCount = totalFrequency;
  }

  public get isEmpty() {
    return this._remainingCount === 0;
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
      if (this.isEmpty) {
        this._remainingFrequencies = [...this._frequencies];
        this._remainingCount = this._totalFrequency;
      }

      let offset = RandexSetUtil.randomSingleNumber(this._remainingCount);
      let index = 0;
      while (offset >= this._remainingFrequencies[index]) {
        offset -= this._remainingFrequencies[index];
        index++;
      }

      result.push(this._items[index]);
      this._remainingFrequencies[index]--;
      this._remainingCount--;
    }
    return result;
  }
}
