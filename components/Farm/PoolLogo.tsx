import { Avatar, AvatarGroup } from "@nextui-org/react";
import { FarmConfig } from "@/constants/project-specific/farms/types";
import { cn } from "@/util/cn";
import { DoubleLogo } from "@/components/Farm/DoubleLogo";

type Farm = FarmConfig | undefined | null;

export default function PoolLogo({
  farm,
  className,
}: {
  farm: Farm;
  className?: string;
}) {
  const isSinglePool: boolean = farm?.tokenB ? false : true;
  const styles = cn("p-2")

  if (!isSinglePool) {
    return (
      <DoubleLogo logo0={farm?.tokenA.logo} logo1={farm?.tokenB?.logo} size={50} />
    );
  } else {
    return <Avatar className={styles} src={farm?.tokenA.logo} name={farm?.tokenA.name} />;
  }
}
