/** Map a flat record of field errors to React Hook Form FieldErrors shape. */
export function mapToFormError(fieldErr: Record<string, string[]>) {
  return Object.fromEntries(
    Object.keys(fieldErr).map((i) => [
      i,
      [{ message: fieldErr[i]?.[0] ?? fieldErr[i] }],
    ])
  );
}
