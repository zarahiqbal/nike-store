type ClassValue = string | number | boolean | undefined | null | ClassValue[] | { [key: string]: any };

function clsx(...inputs: ClassValue[]): string {
    const classes: string[] = [];

    for (const input of inputs) {
        if (!input) continue;
        if (typeof input === "string" || typeof input === "number") {
            classes.push(String(input));
        } else if (Array.isArray(input)) {
            classes.push(clsx(...input));
        } else if (typeof input === "object") {
            for (const key in input) {
                if (input[key]) classes.push(key);
            }
        }
    }

    return classes.join(" ");
}
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
