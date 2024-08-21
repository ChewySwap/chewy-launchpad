// @ts-ignore
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Address } from "viem";
import { decimalsAtom, nameAtom, symbolAtom, totalSupplyAtom, userBatchSettings } from '@/config/atoms';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import { ButtonOverride as Button } from '@/components/Buttons/ButtonOverride';

import {
    Divider, Modal, ModalBody,
    ScrollShadow, ModalContent, ModalFooter,
    ModalHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem,
    Popover, PopoverContent, PopoverTrigger, Select, SelectItem,
    Textarea, useDisclosure, ButtonGroup, Input, Accordion,
    AccordionItem
} from '@nextui-org/react';
import { useDeployContract } from 'wagmi'
import { dn404Bytecode } from '@/constants/deployer/bytecode';
import { dn404Abi } from '@/constants/deployer/abi/dn404Abi';
import HorizontalSteps from '@/components/HorizontalSteps';

interface IFormInput {
    erc20Name: string
    erc20Symbol: string
    erc20TotalSupply: string
    erc20Decimals: string
}



// const userBatchSettings = atomWithStorage('batchSettings', batchSettings)

export default function DeployButton(props: any) {
    const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onOpenChange: onSettingsOpenChange } = useDisclosure();
    const [tokenName, setTokenName] = useAtom(nameAtom);
    const [tokenSymbol, setTokenSymbol] = useAtom(symbolAtom);
    const [totalSupply, setTotalSupply] = useAtom(totalSupplyAtom);
    const [decimals, setDecimals] = useAtom(decimalsAtom);
    const { deployContract } = useDeployContract()

    const [batchSettings, setBatchSettings] = useAtom(userBatchSettings);

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            erc20Name: "",
            erc20Symbol: "",
            erc20TotalSupply: '1000000000',
            erc20Decimals: '18',
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        console.log(data.erc20Name)

        const deployedContract = deployContract({
            abi: dn404Abi,
            args: [data.erc20Name, data.erc20Symbol, Number(data.erc20Decimals)],
            bytecode: dn404Bytecode,
        })


    }

    return (
        <>
            <Button color="success" onPress={onSettingsOpen} className={props.className} size={props.size}>Deploy</Button>

            <Modal isOpen={isSettingsOpen} onOpenChange={onSettingsOpenChange} backdrop="blur" placement="center" scrollBehavior="inside">
                <ModalContent>
                    {(onClose: () => void) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Token Deploy Wizard</ModalHeader>
                            <ModalBody>
                                <ToastContainer theme="dark" />
                                <div className="relative flex flex-col flex-1 items-center content-center">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex w-full flex-wrap md:flex-nowrap mb-2">
                                            <Controller
                                                name="erc20Name"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Name Required!"
                                                    },
                                                }}
                                                render={({ field }) => <Input
                                                    key="name"
                                                    label="Token Name"
                                                    labelPlacement="inside"
                                                    description={errors.erc20Name !== undefined ? errors.erc20Name.message : "Token Name"}
                                                    className="m-1"
                                                    isInvalid={errors.erc20Name !== undefined}
                                                    {...field}
                                                />} />
                                            <Controller
                                                name="erc20Symbol"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Symbol Required!"
                                                    },
                                                }}
                                                render={({ field }) => <Input
                                                    key="symbol"
                                                    label="Token Symbol"
                                                    labelPlacement="inside"
                                                    description={errors.erc20Symbol !== undefined ? errors.erc20Symbol.message : "Token Symbol"}
                                                    className="m-1"
                                                    isInvalid={errors.erc20Symbol !== undefined}
                                                    {...field}
                                                />} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap">
                                            <Controller
                                                name="erc20TotalSupply"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Total Supply Required!"
                                                    },
                                                }}
                                                render={({ field }) => <Input
                                                    key="totalSupply"
                                                    type="number"
                                                    label="Total Supply"
                                                    labelPlacement="inside"
                                                    description={errors.erc20TotalSupply !== undefined ? errors.erc20TotalSupply.message : "Token Total Supply"}
                                                    className="m-1"
                                                    isInvalid={errors.erc20TotalSupply !== undefined}
                                                    {...field}
                                                />} />
                                            <Controller
                                                name="erc20Decimals"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Enter Decimals (Default: 18)"
                                                    },
                                                    maxLength: { value: 2, message: "* Should be between 0 and 18" },
                                                    validate: {
                                                        positive: v => parseInt(v) > -1 || '* Should be a positive number',
                                                        lessThanTen: v => parseInt(v) < 21 || '* Should be lower than 21',
                                                    },
                                                }}
                                                render={({ field }) => <Input
                                                    key="decimals"
                                                    type="number"
                                                    label="Decimals"
                                                    labelPlacement="inside"
                                                    description={errors.erc20Decimals !== undefined ? errors.erc20Decimals.message : "Token Decimals"}
                                                    className="m-1"
                                                    isInvalid={errors.erc20Decimals !== undefined}
                                                    {...field}
                                                />} />
                                        </div>
                                    </form>
                                </div>
                            <div className="flex items-center content-center">
                                <HorizontalSteps color="secondary"
                                hideProgressBars
                                    defaultStep={1}
                                    steps={[
                                        {
                                            title: "Token Type",
                                        },
                                        {
                                            title: "Basic Info",
                                        },
                                        {
                                            title: "Trade Tax",
                                        },
                                        {
                                            title: "Token Limits",
                                        },
                                        {
                                            title: "Finalize Deploy",
                                        },
                                    ]}
                                />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button radius="full">
                                            Help!
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2">
                                            <div className="text-small font-bold">Select how many NFT&apos;s to Mint</div>
                                            <div className="text-small font-bold">Then press &quot;Mint&quot; to Continue</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <Button color="success" onClick={handleSubmit(onSubmit)}>
                                    Next
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}