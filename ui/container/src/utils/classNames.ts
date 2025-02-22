const hasOwn = {}.hasOwnProperty;

interface ClassDictionary {
  [key: string]: unknown;
}
interface ClassArray extends Array<ClassValue> {}

type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassArray;

export function classNames(...args: ClassValue[]): string {
  let classes = "";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      classes = appendClass(classes, parseValue(arg));
    }
  }

  return classes;
}

function parseValue(arg: ClassValue): string {
  if (
    typeof arg === "string" ||
    typeof arg === "number" ||
    typeof arg === "boolean"
  ) {
    return arg.toString();
  }

  if (typeof arg !== "object" || arg === null) {
    return "";
  }

  if (Array.isArray(arg)) {
    return classNames(...arg);
  }

  if (
    arg.toString !== Object.prototype.toString &&
    !arg.toString.toString().includes("[native code]")
  ) {
    return arg.toString();
  }

  let classes = "";

  // eslint-disable-next-line no-restricted-syntax
  for (const key in arg as ClassDictionary) {
    if (hasOwn.call(arg, key) && (arg as ClassDictionary)[key]) {
      classes = appendClass(classes, key);
    }
  }

  return classes;
}

function appendClass(value: string, newClass: string): string {
  if (!newClass) {
    return value;
  }

  return value ? `${value} ${newClass}` : newClass;
}
