'use client'
import { useState } from "react";
import { CheckedIcon, CopyIcon } from "../../../components/Icons";

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button onClick={handleCopy}>
      {!copied ? <CopyIcon /> : <CheckedIcon className="stroke-purple dark:stroke-purple-500" />}
    </button>
  );
};

export default CopyBtn;
