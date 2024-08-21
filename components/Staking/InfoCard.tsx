import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import BarImage from "../BarImage";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  pid: number;
  content: React.ReactNode;
  src?: string;
  footer?: React.ReactNode;
  action?: React.ReactNode;
  actionText?: string;
  chart?: React.ReactNode;
}

export default function InfoCard({
  title,
  subtitle,
  content,
  pid,
  chart,
  src,
  action,
  actionText,
  footer,
}: InfoCardProps) {
  return (
    <>
      <Card isFooterBlurred className="w-full cards-nftstakeinfo">
        <CardHeader className="z-10 top-1 flex-col items-start pb-0">
          <h4 className="text-white/90 font-medium text-">{title}</h4>
          {subtitle && <p className="text-tiny text-white/60">{subtitle}</p>}
        </CardHeader>
        <CardBody>
          <div className="flex flex-row justify-center align-middle items-center content-center p-1">
            <div className="m-auto">
              {chart ? chart : <BarImage url={src} pool={pid} />}
            </div>
            <div className="m-auto align-middle">{content}</div>
          </div>
        </CardBody>
        {action ? (
          <CardFooter className="bg-black/50 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between align-middle py-[4px]">
            {actionText && (
              <div className="flex text-xs align-middle pt-0 text-clip overflow-hidden"><span className="text-clip overflow-hidden">{actionText}</span></div>
            )}
            <div className="flex align-middle">{action}</div>
          </CardFooter>
        ) : (
          footer && (
            <CardFooter className="bg-black/50 border-t-1 border-zinc-100/50 z-10">
              <div className="align-baseline m-auto">{footer}</div>
            </CardFooter>
          )
        )}
      </Card>
    </>
  );
}
