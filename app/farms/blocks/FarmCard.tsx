import { Farm, FarmConfig, Farms } from "@/constants/project-specific/farms/types";
import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { ButtonOverride as Button } from "@/components/Buttons/ButtonOverride";
import RowBetween from "@/components/Layout/Flex/RowBetween";
import Col from "@/components/Layout/Flex/Col";
import PoolLogo from "@/components/Farm/PoolLogo";
import Row from "@/components/Layout/Flex/Row";
import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import CardUserSection from "@/components/Farm/CardUserSection";
import { getMasterChefConfigBySlug } from "@/util/contracts/masterchef";
import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";
import { ChainId, fallbackChainId } from "@/constants/chain-specific";
import FarmChip from "@/components/Chip/FarmChip";
import IconButton from "@/components/Buttons/IconButton";
import ApyButton from "@/components/Farm/ApyButton";
import { formatBalance } from "@/util/balance/formatBalance";


interface FarmCardProps {
  farm: Farm;
  index: number;
}

export default function FarmCard({ farm, index }: FarmCardProps) {
  const isSinglePool: boolean = !farm?.tokenB;
  // const { farmData } = useFarmUserData(farm);
  const cardKey = `FarmCard_${
    farm?.masterChefSlug && `${farm.masterChefSlug}_`
  }${index}`;
  const dexName = farm?.dex?.name ?? "";
  const masterChef = getMasterChefConfigBySlug(farm?.masterChefSlug, ChainId.SHIBARIUM) ?? FARM_PAGE_CONFIG.defaultChef;

  return (
    <>
      <Card key={cardKey} className="w-[300px] cards-farm">
        <CardHeader className="bg-gradient-to-t from-gray-500/0 via-gray-500/20 to-gray-500/20 to-20% pb-4">
          <RowBetween className="w-full">
            <div>
              <PoolLogo farm={farm} />
            </div>
            <Col>
              <div className="text-md md:text-lg">
                {farm?.tokenA.symbol}
                {!isSinglePool && `-${farm?.tokenB?.symbol}`}
              </div>
              {dexName && (
                  <FarmChip name={masterChef.name} size="sm" logo={masterChef.rewardToken.logo} className="place-self-end" />
              )}
            </Col>
          </RowBetween>
        </CardHeader>
        <CardBody>
          <Row className="justify-between pb-1">
            <div className="w-full flex justify-start">APY:</div>
            <div className="w-full flex justify-end">
              <div className="flex">
                <ApyButton masterChef={masterChef} symbol={`${farm?.tokenA.symbol}${!isSinglePool && `-${farm?.tokenB?.symbol}`}`}/>
                {farm.apy && `%${Number(farm.apy).toLocaleString()}`}
              </div>
            </div>
          </Row>
          <Row className="justify-between pb-1">
            <div className="w-full flex justify-start">Earn:</div>
            <div className="w-full flex justify-end">{masterChef.rewardToken.symbol}</div>
          </Row>
          <Row className="justify-between pb-1">
            <div className="w-full flex justify-start">TVL:</div>
            <div className="w-full flex justify-end">{farm?.totalValue && farm?.totalValue > 0 ? `$${formatBalance(farm?.totalValue)}` : null}</div>
          </Row>
          <CardUserSection farm={farm} index={index} masterChef={masterChef} />
        </CardBody>
        <CardFooter>
          <Button
            variant="shadow"
            size="lg"
            startContent={
              <Icon icon="mingcute:down-fill" className="text-lg opacity-0" />
            }
            endContent={<Icon icon="mingcute:down-fill" className="text-lg" />}
            className="w-full mb-1"
          >
            Details
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
