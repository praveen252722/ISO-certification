"use client";

import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  user?: User;
  token?: string;
  setSession: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  setSession: (user, token) => set({ user, token }),
  logout: () => set({ user: undefined, token: undefined })
}));
