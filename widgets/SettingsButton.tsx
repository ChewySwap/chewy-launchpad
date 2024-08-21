import { useAtom } from "jotai";
import { Icon } from "@iconify/react";
import { batchSettings as defaultBatchSettings } from "../constants";
import { userBatchSettings } from "../config/atoms";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import { projTheme } from "@/constants/project-specific/theme/index";

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

// const userBatchSettings = atomWithStorage('batchSettings', batchSettings)

export default function SettingsButton(props: any) {
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onOpenChange: onSettingsOpenChange,
  } = useDisclosure();

  const [batchSettings, setBatchSettings] = useAtom(userBatchSettings);

  const handleClaimChange = (e: any) => {
    let claimValue = {};
    if (
      Number.isInteger(Number(e.target.value)) &&
      Number(e.target.value) > 0
    ) {
      claimValue = { maxBatchClaim: e.target.value };
      setBatchSettings((batchSettings) => ({
        ...batchSettings,
        ...claimValue,
      }));
    }
  };

  const handleStakeChange = (e: any) => {
    let stakeValue = {};
    if (
      Number.isInteger(Number(e.target.value)) &&
      Number(e.target.value) > 0
    ) {
      stakeValue = { maxBatchStake: e.target.value };
      setBatchSettings((batchSettings) => ({
        ...batchSettings,
        ...stakeValue,
      }));
    }
  };

  const handleUnstakeChange = (e: any) => {
    let stakeValue = {};
    if (
      Number.isInteger(Number(e.target.value)) &&
      Number(e.target.value) > 0
    ) {
      stakeValue = { maxBatchUnstake: e.target.value };
      setBatchSettings((batchSettings) => ({
        ...batchSettings,
        ...stakeValue,
      }));
    }
  };

  return (
    <>
      <Button
        color="success"
        onPress={onSettingsOpen}
        className={props.className}
        size={props.size}
        startContent={<Icon icon="material-symbols:settings" height="auto" />}
      >
        Settings
      </Button>

      <Modal
        isOpen={isSettingsOpen}
        onOpenChange={onSettingsOpenChange}
        backdrop="blur"
        placement="center"
        scrollBehavior="inside"
        className={cn("", customFont.className)}
        classNames={{
          base: "cards-modal",
          header: "text-white bg-primary/30 rounded-t-2xl mb-0 py-3",
          body: "mt-3",
        }}
      >
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User Settings
              </ModalHeader>
              <ModalBody>
                <div className="relative flex flex-col flex-1 items-center content-center">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mb-2">
                    <Input
                      key="claim"
                      variant={projTheme.input?.defaultVariant ?? "bordered"}
                      label="Max Claim Batch Size"
                      labelPlacement="inside"
                      type="number"
                      description="Max number of NFTs to claim rewards on at once"
                      value={String(
                        batchSettings.maxBatchClaim ??
                          defaultBatchSettings.maxBatchClaim
                      )}
                      onChange={(e) => handleClaimChange(e)}
                    />
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      key="stake"
                      variant={projTheme.input?.defaultVariant ?? "bordered"}
                      label="Max Stake Batch Size"
                      labelPlacement="inside"
                      type="number"
                      description="Max number of NFTs to stake at once"
                      value={String(
                        batchSettings.maxBatchStake ??
                          defaultBatchSettings.maxBatchStake
                      )}
                      onChange={(e) => handleStakeChange(e)}
                    />
                  </div>
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      key="unstake"
                      variant={projTheme.input?.defaultVariant ?? "bordered"}
                      label="Max Unstake Batch Size"
                      labelPlacement="inside"
                      type="number"
                      description="Max number of NFTs to unstake at once"
                      value={String(
                        batchSettings.maxBatchUnstake ??
                          defaultBatchSettings.maxBatchUnstake
                      )}
                      onChange={(e) => handleUnstakeChange(e)}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Popover>
                  <PopoverTrigger>
                    <Button radius="full">Help!</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Select how many NFT&apos;s to Mint
                      </div>
                      <div className="text-small font-bold">
                        Then press &quot;Mint&quot; to Continue
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  color="success"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
