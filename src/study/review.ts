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
// console.log(user.id);
// 存在しないプロパティにもアクセスできる。ぬるぽ！
// console.log(user.hobby);

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
// console.log(greet('Cheetah'));

interface NumberFunc {
  (n: number, m: number): number;
}
const add: NumberFunc = (n, m) => n + m;

const toArray = <T>(arg1: T, arg2: T): T[] => [arg1, arg2];
toArray(12, 12);
toArray('12', '12');
// toArray('12', 12);
// Argument of type 'number' is not assignable to parameter of type 'string'.

const toArrayVariably = <T>(...args: T[]): T[] => [...args];
toArrayVariably(1, 2, 3, 4, 5);
// toArrayVariably('1', 2, 3, 4, 5);

type Unit = 'USD' | 'EUR' | 'JPY' | 'GBP';
type TCurrency = {
  unit: Unit;
  amount: number;
};

interface User {
  name: string;
}
interface User {
  age: number;
}
interface User {
  species: 'rabbit' | 'bear' | 'fox' | 'dog';
}
const rolley: User = {
  age: 20,
  name: 'keigo',
  species: 'rabbit',
};

type Some = number & string;

const arr = [1, 2];
type NumArr = typeof arr;
const val: NumArr = [1, 3, 1, 32, 4];

const obj = {
  a: 1,
  b: 2,
  c: 3,
};
console.log('a' in obj);
// objにaというプロパティがある → true
for (const key in obj) {
  console.log(key);
}

type Fig = 'one' | 'two' | 'three';
// ユニオン型の値を展開し、値をkeyにする型を作成している
type FigMap = {
  [key in Fig]?: number;
};
const figMap: FigMap = {
  one: 12,
  two: 12,
  three: 12,
};
// figMap.four = 12;
// error TS2339: Property 'four' does not exist on type 'FigMap'.

const permissions = {
  r: 0b100 as const,
  w: 0b010 as const,
  x: 0b001 as const,
};
type PermsChar = keyof typeof permissions;
// "r" | "w" | "x"
type PermsNum = typeof permissions[PermsChar];
// 1 | 2 | 4

const override = <T, U extends T>(obj1: T, obj2: U): T & U => ({
  ...obj1,
  ...obj2,
});
override({ a: 1 }, { a: 24, b: 8 });
// override({ a: 1 }, { ax: 24, b: 8 });
// error TS2345: Argument of type '{ ax: number; b: number; }' is not assignable to parameter of type '{ a: number; }'.
// Object literal may only specify known properties, and 'ax' does not exist in type '{ a: number; }'.

{
  type User = { id: unknown };
  type NewUesr = User & { id: string };
  type OldUesr = User & { id: number };
  type Book = { isbn: string };

  type IsString<T> = T extends string ? true : false;
  type A = IsString<'a'>;
  // type A = true
  type B = IsString<1>;
  // type B = false
  type C = IsString<boolean>;
  // type C = false

  type IdOf<T> = T extends User ? T['id'] : never;

  type NewUesrId = IdOf<NewUesr>;
  type OldUesrId = IdOf<OldUesr>;
  type BookIdUesrId = IdOf<Book>;
}
