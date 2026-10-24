import { clsx, type ClassValue } from "clsx";

// shadcn/Magic UI helper. Plain clsx (no tailwind-merge): our call sites don't pass conflicting
// utilities, and tailwind-merge added ~20 KB of JavaScript to the Home page.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
