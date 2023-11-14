// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onlyNumbers = (array: any[]) => array.every((x: any) => typeof x === 'number');