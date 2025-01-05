'use client'

import { useTheme } from "next-themes";

export default function GradientBackground() {
  const { theme } = useTheme();

  const lightColors = ["#B7DDF0", "#ADDBF2", "#EFF5F5"];
  const darkColors = ["#0e7490", "#103E55", "#3AA6C0"];
  const [a, b, c] = theme === "light" ? lightColors : darkColors;

  const style = {
    "--color-a": a,
    "--color-b": b,
    "--color-c": c,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="blur-xl fixed -inset-16 -z-10 overflow-hidden bg-gradient-to-br from-[--color-a] via-[--color-b] to-[--color-c]
      before:absolute before:left-[20%] before:top-[10%] before:h-[50%] before:w-[70%] before:origin-center before:animate-blob
      before:rounded-full before:bg-gradient-to-br before:from-[--color-a] before:to-[--color-b] before:blur-[100px] before:brightness-125
      after:absolute after:left-[40%] after:top-[30%] after:h-[80%] after:w-[70%] after:origin-center after:animate-blob-reverse
      after:rounded-full after:bg-gradient-to-br after:from-[--color-a] after:to-[--color-b] after:blur-[100px] after:brightness-125"
    ></div>
  );
}
