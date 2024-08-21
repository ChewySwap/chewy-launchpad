import { FARMS_CONFIG } from "@/constants/project-specific/farms/pools";
import {
  BlockchainFarmConfig,
  ChainFarmData,
  FarmConfig,
} from "@/constants/project-specific/farms/types";
import FarmCard from "./FarmCard";
import Content from "@/components/Layout/Flex/Content";
import { ChainId } from "@/constants/chain-specific";
import Row from "@/components/Layout/Flex/Row";
import RowBetween from "@/components/Layout/Flex/RowBetween";
import { Farm } from '../../../constants/project-specific/farms/types';
import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";

interface FarmOverviewProps {
  farms: ChainFarmData;
}
export default function FarmOverview({ farms }: FarmOverviewProps) {
  const farmChains = FARM_PAGE_CONFIG.chainIds;
  return (
    <>
      <Row className="justify-evenly self-center gap-x-2 gap-y-6 flex-wrap w-full pb-5">
        {farmChains.map((farmChain: any) => {
          return (
            <>
              {farms[farmChain as keyof typeof farms].map(
                (farmConfig: any, index) => (
                  <FarmCard farm={farmConfig} index={index} />
                )
              )}
            </>
          );
        })}
      </Row>
    </>
  );
}
