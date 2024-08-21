"use client";

import React from "react";
import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spacer,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { sectionItems } from "@/constants/project-specific/menu/main-menu";
import SidebarDrawer from "./SidebarDrawer";

import Sidebar from "./Sidebar";
import { LogoIcon } from "@/components/Icons/LogoIcon";
import ConnectButton from "../ConnectButton";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
interface MenuProps {
  children: React.ReactNode;
}
export default function Menu({ children }: MenuProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const content = (
    <div className="relative flex h-full w-72 flex-1 flex-col p-4 overflow-clip">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center">
          <LogoIcon />
        </div>
        <span className="text-small font-bold uppercase text-foreground">
          Chewy Launchpad
        </span>
      </div>
      <Spacer y={8} />
      <div className="flex items-center justify-center gap-1 md:hidden">
        <ConnectButton />
      </div>

      <Spacer y={8} />

      <Sidebar defaultSelectedKey="home" items={sectionItems} />

      <Spacer y={8} />
      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="text-default-500"
              icon="solar:info-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Help & Information
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh w-full p-0 m-0">
      <SidebarDrawer
        className=" !border-r-small border-divider"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {content}
      </SidebarDrawer>
      <div className="w-full flex-1 flex-col overflow-y-scroll">
        <header className="flex h-16 items-center gap-2">
          <Navbar isBlurred={false} className="w-full p-0 m-0 md:bg-transparent" classNames={{
            wrapper: "md:bg-opacity-0",
          }}>
            <NavbarBrand className="md:hidden">
              <div className="flex items-center gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center">
                  <LogoIcon />
                </div>
                <span className="text-small font-bold uppercase text-foreground">
                  Chewy Launchpad
                </span>
              </div>
            </NavbarBrand>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  isIconOnly
                  className="flex sm:hidden"
                  size="sm"
                  variant="light"
                  onPress={onOpen}
                >
                  <Icon
                    className="text-default-500"
                    height={24}
                    icon="solar:hamburger-menu-outline"
                    width={24}
                  />
                </Button>
                <div className="hidden md:block">
                  <ConnectButton />
                </div>
              </NavbarItem>
              {/* <NavbarItem>
            <MenuButton logo={<StakingLogo />} dropdown={<PoolSelect NftPoolConfig={NftPoolConfig} poolSlug={poolSlug} mobileOnly />} />
          </NavbarItem> */}
            </NavbarContent>
          </Navbar>
        </header>
        <div className="h-full w-full">
          <main className="flex h-[90%] w-full flex-col px-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
