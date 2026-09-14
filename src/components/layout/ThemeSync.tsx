"use client";

import { useEffect } from "react";

export function ThemeSync() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("super-admin-theme");
    document.documentElement.dataset.theme = savedTheme === "dark" ? "dark" : "light";
  }, []);

  return null;
}
