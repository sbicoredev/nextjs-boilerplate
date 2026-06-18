type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type Nullish<T> = {
  [K in keyof T]: undefined extends T[K]
    ? T[K] | null | undefined
    : null extends T[K]
      ? T[K] | null | undefined
      : T[K];
};

type UndefinedToNullable<T> = {
  [K in keyof T]: undefined extends T[K] ? T[K] | null | undefined : T[K];
};
