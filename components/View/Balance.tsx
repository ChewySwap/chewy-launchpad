import { cn } from "@/util/cn";
import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";


interface BalanceProps {
  value?: number;
  decimals?: number;
  className?: string;
  unit?: string;
}

const Balance: React.FC<BalanceProps> = ({
  value,
  className,
  decimals,
  unit,
}) => {
  const previousValue = useRef(0);

  useEffect(() => {
    if (typeof value === "number") {
      previousValue.current = value;
    }
  }, [value]);

  return (
    <div className={className}>
      <CountUp
        start={previousValue.current}
        end={value ?? 0}
        decimals={decimals}
        duration={1}
        separator=","
      />
      {value && unit && <span>{unit}</span>}
    </div>
  );
};

export default Balance;
