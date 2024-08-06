import { type ClassValue, clsx } from "clsx"
import { cache } from "react";
import { twMerge } from "tailwind-merge"
import { Supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isClient() {
  return typeof window !== 'undefined';
}