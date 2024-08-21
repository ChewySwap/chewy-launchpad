import { cn } from "@/util/cn";

interface DoubleLogoProps {
  margin?: boolean;
  size?: number;
  logo0?: string;
  logo1?: string;
}

export function DoubleLogo({
  logo0,
  logo1,
  size = 40,
  margin = false,
}: DoubleLogoProps) {
  return (
    <div className={cn(margin ? "mr-[4px]" : "", "flex flex-row")}>
      {logo0 && (
        <img
          src={logo0}
          alt=""
          className="absolute origin-center z-10 drop-shadow-md"
          style={{
            width: `${size.toString()}px`,
            height: `${size.toString()}px`,
            transform: `translateX(${(size / 2.5) - 10}px) translateY(${(size / 2.5) - 10}px)`,
            marginRight: "4px",
          }}
        />
      )}
      {logo1 && (
        <img
          src={logo1}
          alt=""
          className="relative origin-center scale-90 -z-20 drop-shadow-md"
          style={{
            width: `${(size - 10).toString()}px`,
            height: `${(size - 10).toString()}px`,
            transform: `translateX(-5px) translateY(-5px)`,
          }}
        />
      )}
    </div>
  );
}
