import { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

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
          {isFulfilled ? (
            <HeartFilledIcon className="inline w-4 h-4" />
          ) : (
            <HeartIcon className="inline w-4 h-4" />
          )}{" "}
        </span>
        for Pixaera
      </p>
    </div>
  );
}
