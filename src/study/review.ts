// ジェネリクスでArrayの型を指定
const strArr: Array<string> = ['a', 'b', 'c'];

// object はプリミティブ型以外全てに当てはまる。定義が広すぎるから使わない
const words: object = ['a', 'b', 'c'];

interface Color {
  // 読み取り専用
  readonly rgb: string;
  // プロパティの有無は問わない
  opacity?: number;
}

interface Status {
  level: number;
  hp: number;
  mp: number;
  // プロパティのvalueが数字しか入らない
  [attr: string]: number;
}
const myStatus: Status = {
  level: 99,
  hp: 999,
  mp: 999,
  attack: 999,
  defense: 999,
};

enum Pet {
  Cat,
  Dog,
  Rabbit,
}
// console.log(Pet.Cat, Pet.Dog, Pet.Rabbit);
// 0 1 2

// 値の再代入が出来てしまう
let Sakurako: Pet.Dog = Pet.Dog;
Sakurako = 12;
// console.log(Sakurako);

enum PetString {
  Cat = 'Cat',
  Dog = 'Dog',
  Rabbit = 'Rabbit',
}
let SakurakoString: PetString.Dog = PetString.Dog;
// SakurakoString = 'Hamster';
// Type '"Hamster"' is not assignable to type 'PetString.Dog'.
// 文字列"Dog"はenumのPetString.Dogと同一ではない。安全である。
// SakurakoString = 'Dog';
// Type '"Dog"' is not assignable to type 'PetString.Dog'.

// 文字列リテラル型
let Mary: 'Cat' | 'Dog' | 'Rabbit' = 'Cat';
Mary = 'Dog';
// 文字列enumよりもシンプルに記述できるため

// タプル型
const charAttrs: [number, string, boolean] = [1, 'patty', true];
const spells: [number, ...string[]] = [7, 'heal', 'sizz', 'snooz'];
// 分割代入等で使うと便利
const [id, username, isAdmin] = charAttrs;

const str = `{"id": 1, "username": "patty", "isAdmin": true}`;
// JSON.parseは返り値がany型
const user = JSON.parse(str);
console.log(user.id);
// 存在しないプロパティにもアクセスできる。ぬるぽ！

console.log(user.hobby);
const userUnknown: unknown = JSON.parse(str);
// console.log(userUnknown.id);
// Object is of type 'unknown'.
// unknownはanyの安全版、何のプロパティもプロトタイプメソッドもアクセス出来ない
// 型ガードを実装する

const greet = (friend: 'Serval' | 'Caracal' | 'Cheetah') => {
  switch (friend) {
    case 'Serval':
      return 'サーバル';
    case 'Caracal':
      return 'カラカル';
    case 'Cheetah':
      return 'チーター';
    default:
      // never型は代入されるとエラーが起きる
      const check: never = friend;
  }
};
