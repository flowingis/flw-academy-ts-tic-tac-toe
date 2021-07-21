export type MyReturnType<T> = T extends (args?: any) => infer R ? R : never;

type UnboundArray<T> = T extends Array<infer TItem> ? TItem : any;
type UnboundStringArray = UnboundArray<string[]>; // string
type UnboundNumberArray = UnboundArray<string[]>; // number
type UnboundString = UnboundArray<string>; // any

export type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends bigint
  ? "bigint"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends symbol
  ? "symbol"
  : T extends Function
  ? "function"
  : T extends null
  ? "null"
  : "object";

const typeName = <T>(obj: T): TypeName<T> => {
  if (obj === null) return "null" as TypeName<T>;
  return typeof obj as TypeName<T>;
};

console.log(typeName("string")); // "string"
console.log(typeName(10)); // "number"
console.log(typeName(10n)); // "bigint"
console.log(typeName(true)); // "boolean"
console.log(typeName(undefined)); // "undefined"
console.log(typeName(Symbol())); // "symbol"
console.log(typeName(() => "result")); // "function"
console.log(typeName(null)); // "null"
console.log(typeName({ name: "name" })); // "object"
