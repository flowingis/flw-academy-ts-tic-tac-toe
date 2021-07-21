export type Dictionary<T> = { [key: string]: T };

{
  type Point = {
    x: number;
    y: number;
  };

  type PointProp = keyof Point;
  const pointProp: PointProp = "x";
}

{
  type Point = {
    x: number;
    y: number;
  };

  type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
  };

  type MyPointReadonly = MyReadonly<Point>;
  type PointReadonly = Readonly<Point>;
}

{
  type PointReadonly = {
    readonly x: number;
    readonly y: number;
  };

  type MyRemoveReadonly<T> = {
    -readonly [K in keyof T]: T[K];
  };

  type Point = MyRemoveReadonly<PointReadonly>;
}

{
  type Point = {
    x: number;
    y: number;
  };

  type MyPartial<T> = {
    [K in keyof T]?: T[K];
  };

  type MyPartialPoint = MyPartial<Point>;
  type PartialPoint = Partial<Point>;
}

{
  type PartialPoint = {
    x?: number;
    y?: number;
  };

  type MyRequired<T> = {
    [K in keyof T]-?: T[K];
  };

  type MyPoint = MyRequired<PartialPoint>;
  type Point = Required<PartialPoint>;
}
