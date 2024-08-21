/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import ConnectButton from "../components/ConnectButton";
import StakingLogo from "./StakingLogo";
import {
  ChainId,
  imageLogo,
  multiPool,
  pageTitle,
  NftPoolConfig,
  NftPoolConfigType,
  PoolId,
  telegram,
  twitter,
  website,
} from "../constants";
import { PoolSelect } from "./PoolSelect";
import { Suspense } from "react";
import MenuButton from "../widgets/Menu/index";

interface HeaderProps {
  NftPoolConfig: NftPoolConfigType | undefined;
  poolSlug: string;
}

export default function Header({ NftPoolConfig, poolSlug }: HeaderProps) {
  return (
    <>
      <Navbar shouldHideOnScroll className="p-0 md:p-2">
        <NavbarBrand>
          <StakingLogo />
          {!imageLogo && <p className="font-bold text-inherit">{pageTitle}</p>}
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex" justify="center">
          <NavbarItem>
            <PoolSelect NftPoolConfig={NftPoolConfig} poolSlug={poolSlug} />
          </NavbarItem>
          <NavbarItem>
            <Button size="md" variant="light">Home</Button>
          </NavbarItem>
          <NavbarItem>
            <Button size="md" variant="light">Farms</Button>
          </NavbarItem>
          <NavbarItem>
            <Button size="md" variant="light">About</Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <NavbarItem>
            <ConnectButton />
          </NavbarItem>
         {/* <NavbarItem>
            <MenuButton logo={<StakingLogo />} dropdown={<PoolSelect NftPoolConfig={NftPoolConfig} poolSlug={poolSlug} mobileOnly />} />
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>
      <div className="relative flex sm:hidden flex-col flex-1 items-center content-center mb-[-15px]">
        <PoolSelect NftPoolConfig={NftPoolConfig} poolSlug={poolSlug} mobileOnly />
      </div>
    </>
  );
}
