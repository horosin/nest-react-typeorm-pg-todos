import { useState } from "react";

export default function Footer() {
  const [isFulfilled, setIsFulfilled] = useState(false);

  return (
    <div className="w-full max-w-screen-sm mx-auto mt-8 px-4">
      <p className="text-xs text-muted-foreground">
        Made by{" "}
        <a href="https://horosin.com" target="_blank" className="text-black">
          Karol
        </a>{" "}
        with{" "}
        <span
          onClick={() => setIsFulfilled(!isFulfilled)}
          className="cursor-pointer"
        >
          {isFulfilled ? "♥︎" : "♡"}{" "}
        </span>
        for Pixaera
      </p>
    </div>
  );
}
