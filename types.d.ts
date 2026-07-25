type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/** make all field to nullable*/
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

/** make any null or undefined field nullish */
type Nullish<T> = {
  [K in keyof T]: undefined extends T[K]
    ? T[K] | null | undefined
    : null extends T[K]
      ? T[K] | null | undefined
      : T[K];
};

/** make all undefined and optional field to nullable*/
type UndefinedToNullable<T> = {
  [K in keyof T]-?: undefined extends T[K]
    ? Exclude<T[K], undefined> | null
    : Exclude<T[K], undefined> extends T[K]
      ? T[K]
      : Exclude<T[K], undefined> | null;
};

/** make all nullable field to undefined*/
type NullableToUndefined<T> = {
  [K in keyof T]: null extends T[K]
    ? Exclude<T[K], null> | undefined
    : Exclude<T[K], null> extends T[K]
      ? T[K]
      : Exclude<T[K], null> | undefined;
};

/**
 * Transforms an object type by converting all fields that include `null` or `undefined`
 * into optional fields, while stripping both `null` and `undefined` from their explicit types.
 * Fields that do not include `null` or `undefined` remain required and unchanged.
 *
 * @template T - The original object type to transform.
 *
 * @example
 * type Input = {
 *   id: string;
 *   name: string | null;
 *   email: string | undefined;
 *   age?: number;
 * };
 *
 * type Output = NullableToOptional2<Input>;
 * // Result:
 * // {
 * //   id: string;       // Required, unchanged
 * //   name?: string;    // Optional, `null` and `undefined` stripped from explicit type
 * //   email?: string;   // Optional, `null` and `undefined` stripped from explicit type
 * //   age?: number;     // Optional, unchanged
 * // }
 */
type NullableToOptional<T> = Prettify<
  {
    [K in keyof T as [null, undefined] extends [T[K], T[K]]
      ? K
      : null extends T[K]
        ? K
        : undefined extends T[K]
          ? K
          : never]?: Exclude<T[K], null | undefined>;
  } & {
    [K in keyof T as null extends T[K]
      ? never
      : undefined extends T[K]
        ? never
        : K]: T[K];
  }
>;
