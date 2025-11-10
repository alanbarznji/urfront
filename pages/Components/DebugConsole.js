// components/DebugConsole.tsx
"use client";
import { useEffect } from "react";

export default function DebugConsole() {
  useEffect(() => {
    // منع التهيئة المتكررة
    if (typeof window === "undefined") return;
    // @ts-ignore
    if (window.__VCONSOLE_ENABLED__) return;

    import("vconsole")
      .then(({ default: VConsole }) => {
        // @ts-ignore
        window.__VCONSOLE_ENABLED__ = true;
        new VConsole(); // يظهر دائمًا على كل الأجهزة
        console.log("vConsole enabled (always-on)");
      })
      .catch((e) => {
        console.error("vConsole load failed", e);
      });
  }, []);

  return null;
}
