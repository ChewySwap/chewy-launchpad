import { Button } from "@nextui-org/react";
import React from "react";
import { useAccount } from "wagmi";
import { txLink } from "../util";
import { customFont } from "@/constants/index";

interface NotificationProps {
  message: string;
  style?: String;
  hash?: `0x${string}`;
}

function ConfirmedTx({ message, style = "info", hash }: NotificationProps) {
  const { chainId } = useAccount();
  return (
    <>
      <div className={customFont.className}>
        <div className="text-small flex flex-col md:flex-row flex-nowrap items-center">
          <div className="p-2">{message}</div>
          {chainId && (
            <a href={txLink(String(hash), chainId)} target="_blank">
              <Button variant="shadow" size="sm">
                View on Explorer
              </Button>
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default ConfirmedTx;
