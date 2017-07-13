export class EdgeMock {

  _data = {
    source: 2,
    target: 3,
    label: 'test label',
    weight: 4,
    color: 'secondary'
  };
  _css = {
    width: '5',
    'line-style': 'dotted'
  };

  id() {
    return 1;
  }

  public data(name: string, value: string): string | void {
    if (typeof value === 'undefined') {
      return this._data[name];
    } else {
      this._data[name] = value;
    }
  }

  public css(name: string, value: string): string | void {
    if (typeof value === 'undefined') {
      return this._css[name];
    } else {
      this._css[name] = value;
    }
  }

  numericStyle(name): number {
    return +this._css[name];
  }

  addClass() {
  }

  removeClass() {
  }
}
