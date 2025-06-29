"use client";

import { createContext, use } from "react";
import { User } from "@/shared/types";

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export function UserProvider({ children, user }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => use(UserContext);
