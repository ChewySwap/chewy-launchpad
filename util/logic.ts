
export function IfNull<T>(value: null | undefined | T, defaultValue: T): T {
    return value ?? defaultValue;
}
