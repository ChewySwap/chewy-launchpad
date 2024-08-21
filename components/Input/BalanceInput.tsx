import { Input } from "@nextui-org/react";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import Col from "@/components/Layout/Flex/Col";
import CenterItems from "@/components/Layout/Flex/CenterItems";
import Row from "../Layout/Flex/RowBetween";
import Centered from "../Layout/Flex/Centered";

interface BalanceProps {
  label: string;
  placeholder?: string;
  max: number | string;
  symbol: string;
  errorMessage?: string;
  isInvalid?: boolean;
  value?: string;
  onChange?: (value: any) => void;
  onSelectMax?: () => void;
}

export default function BalanceInput({
  max,
  symbol,
  label,
  errorMessage,
  onChange,
  isInvalid,
  onSelectMax,
  value,
}: BalanceProps) {
  return (
    <Centered className="w-full">
      <Col className="items-center w-full">
        <Input
          variant="faded"
          type="number"
          aria-errormessage={errorMessage}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          classNames={{
            label: "text-xs md:text-sm",
          }}
          labelPlacement="outside"
          endContent={
            <div className="inline-flex gap-2">
              <div className="text-md h-full self-center text-xs truncate">
                {symbol}
              </div>
              <Button
                color="warning"
                variant="flat"
                size="sm"
                onClick={onSelectMax}
              >
                MAX
              </Button>
            </div>
          }
          label={label}
          onChange={onChange}
          value={value}
        />
        <span className="text-sm opacity-50 pt-2">
          ({max} {symbol} available)
        </span>
      </Col>
    </Centered>
  );
}
