import { FarmConfig } from "@/constants/project-specific/farms/types"
import { readContracts } from "@wagmi/core"
import { config as wagmiConfig } from '@/config/index';
import { getMasterChefConfigBySlug } from "@/util/contracts/masterchef";
import { FARM_PAGE_CONFIG } from "@/constants/project-specific/farms";



