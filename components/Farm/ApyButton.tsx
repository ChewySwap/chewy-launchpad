"use client";
import { Icon } from "@iconify/react";
import { useAccount } from "wagmi";
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
} from "@nextui-org/react";
import { customFont } from "@/constants/index";
import { cn } from "@/util/cn";
import { Address } from "viem";
import BalanceInput from "../Input/BalanceInput";
import { useAllowance } from "@/hooks/useAllowance";
import { useEffect, useState } from "react";
import { set } from "ramda";
import Col from "../Layout/Flex/Col";
import {
  FarmConfig,
  MasterChefConfig,
} from "@/constants/project-specific/farms/types";
import IconButton from "@/components/Buttons/IconButton";

// const userBatchSettings = atomWithStorage('batchSettings', batchSettings)

interface ApyButtonProps {
  symbol?: string;
  tokenAddress?: Address;
  masterChef?: MasterChefConfig;
}
export default function ApyButton({
  symbol,
  tokenAddress,
  masterChef,
}: ApyButtonProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(0);
  const { address, chainId, connector } = useAccount();

  // const [batchSettings, setBatchSettings] = useAtom(userBatchSettings);

  const handleClaimChange = (e: any) => {
    let claimValue = {};
  };

  useEffect(() => {}, [isOpen]);

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
                ROI Estimates for {symbol} Pool
              </ModalHeader>
              <ModalBody>
                <Table removeWrapper aria-label="ROI Estimate Table">
                  <TableHeader>
                    <TableColumn>TIMEFRAME</TableColumn>
                    <TableColumn>ROI</TableColumn>
                    <TableColumn>
                      {masterChef?.rewardToken.symbol} PER $1000
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>1d</TableCell>
                      <TableCell>0.08%</TableCell>
                      <TableCell>19.77</TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell>7d</TableCell>
                      <TableCell>0.54%</TableCell>
                      <TableCell>138.73</TableCell>
                    </TableRow>
                    <TableRow key="3">
                      <TableCell>30d</TableCell>
                      <TableCell>2.34%</TableCell>
                      <TableCell>599.84</TableCell>
                    </TableRow>
                    <TableRow key="4">
                      <TableCell>365d (APY)</TableCell>
                      <TableCell>32.44</TableCell>
                      <TableCell>8329.64</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Divider />
                <div className="text-sm opacity-75">
                  * Calculated based on current rates. Compounding once daily.
                  Rates are estimates provided for your convenience only, and by
                  no means represent guaranteed returns.
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger">Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <IconButton
        icon="material-symbols:calculate-outline"
        onClick={onOpen}
        className="bg-opacity-0"
      />
    </>
  );
}
