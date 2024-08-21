"use client";
import { Icon } from "@iconify/react";
import { useAccount, useWriteContract } from "wagmi";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import { projTheme } from "@/constants/project-specific/theme/index";
import VerticalSteps from "@/components/Buttons/VerticalSteps";
import { stepperClasses } from "@/constants/project-specific/theme/stepcn";
import {
  Divider,
  Modal,
  ModalBody,
  ScrollShadow,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
  ButtonGroup,
  Input,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { customFont } from "@/constants/index";
import { cn } from "@/util/cn";
import { Address } from "viem";
import BalanceInput from "../Input/BalanceInput";
import { useAllowance } from "@/hooks/useAllowance";
import { useEffect, useState } from "react";
import { set } from "ramda";
import Col from "../Layout/Flex/Col";
import { FarmConfig, MasterChefConfig } from "@/constants/project-specific/farms/types";

// const userBatchSettings = atomWithStorage('batchSettings', batchSettings)

interface DepositModalProps {
  onDeposit?: () => void;
  isOpen?: boolean | undefined;
  onChange?: (e: any) => void;
  onOpenChange?: (isOpen: boolean) => void;
  symbol?: string;
  tokenAddress?: Address;
  masterChef?: MasterChefConfig
}
export default function DepositModal({
  symbol,
  tokenAddress,
  masterChef,
  onDeposit,
  onOpenChange,
  isOpen,
}: DepositModalProps) {
  const { allowance, token, refresh } = useAllowance(
    tokenAddress,
    masterChef?.address
  );
  const { data, isPending } = useWriteContract();
  const [isOverAllowance, setIsOverAllowance] = useState(false);
  const [isOverBalance, setIsOverBalance] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const { address, chainId, connector } = useAccount();

  // const [batchSettings, setBatchSettings] = useAtom(userBatchSettings);

  const handleClaimChange = (e: any) => {
    let claimValue = {};
  };

  useEffect(() => {
    if (Number(depositAmount) > allowance.number) {
      setIsOverAllowance(true);
    } else if (isOverAllowance && Number(depositAmount) <= allowance.number) {
      setIsOverAllowance(false);
    }
    if (Number(depositAmount) > token.balance.number) {
      setIsOverBalance(true);
    } else if (isOverBalance && Number(depositAmount) <= token.balance.number) {
      setIsOverBalance(false);
    }
  }, [depositAmount, allowance, token, isOverAllowance, isOverBalance]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        scrollBehavior="inside"
        className={cn("cards-modal", customFont.className)}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Deposit {symbol} LP
              </ModalHeader>
              <ModalBody>
                <Col>
                  <BalanceInput
                    max={token.balance.number}
                    symbol={symbol ?? ""}
                    value={depositAmount}
                    isInvalid={isOverBalance}
                    errorMessage={isOverBalance ? "Insufficient Balance" : ""}
                    label="Enter Amount to Stake"
                    onChange={(e) => setDepositAmount(e.currentTarget.value)}
                    onSelectMax={() =>
                      setDepositAmount(token.balance.number.toString())
                    }
                  />
                  {isOverAllowance && (
                    <div className="pt-2">
                      <VerticalSteps
                        className={stepperClasses}
                        color="secondary"
                        currentStep={currentStep}
                        steps={[
                          {
                            title: "Approve Token",
                            description:
                              "Approve LP token to be spent and wait for confirmation.",
                          },
                          {
                            title: "Deposit and Stake",
                            description: `Complete the staking process by Depositing your ${symbol} LP tokens.`,
                          },
                        ]}
                      />
                    </div>
                  )}
                </Col>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  onClick={() => {
                    setDepositAmount("");
                    onClose();
                  }}
                >
                  Get <span className="truncate nowrap text-ellipsis max-w-[100px] px-0 mx-0">{symbol}</span> LP
                </Button>
                <Button color="success">
                  {isOverAllowance ? "Approve" : "Deposit"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
