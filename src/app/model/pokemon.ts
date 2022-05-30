export interface MyStat {
  name: string;
  value: number;
}

export interface Moves {
  name: string;
}

export class Pokemon {
  constructor(
    private _number: number,
    private _name: string,
    private _img: string,
    private _tipo: string[],
    private _stat: MyStat[],
    private _moves: Moves[]
  ) {}

  get number() {
    return this._number;
  }
  get name() {
    return this._name;
  }
  get img() {
    return this._img;
  }
}
