export interface MyStat {
  name: string;
  value: number;
}

export interface Moves {
  name: string;
  url: string;
}
export interface Ability{
  name: string;
  url: string;
}

export class Pokemon {
  constructor(
    private _number: number,
    private _name: string,
    private _img: string,
    private _tipo: string[],
    private _stat: MyStat[],
    private _moves: Moves[],
    private _abilities: Ability[]
    
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
  get tipo() {
    return this._tipo;
  }
  get stat() {
    return this._stat;
  }
  get moves() {
    return this._moves;
  }
  get abilities() {
    return this._abilities;
  }
}
