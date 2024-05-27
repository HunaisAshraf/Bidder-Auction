"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store/store";
import { login } from "@/lib/store/features/userSlice";
import { User } from "@/utils/types";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const userJson = localStorage.getItem("auth");
    if (userJson) {
      const user: User = JSON.parse(userJson);
      storeRef.current?.dispatch(login(user));
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
