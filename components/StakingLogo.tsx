import Image from "next/image";
import { imageLogo, logoExt, logoWidth } from "../constants";
import { logoHeight, pageTitle } from '../constants/project-specific/project';


export default function StakingLogo() {
  return (
    <div className={`relative h-30 w-30 md:h-full`}>
      { imageLogo ? <Image src={`/logo.${logoExt}`} alt={`${pageTitle} Logo`} width={logoWidth} height={logoHeight} className="pr-1 md:pr-2 transition-all hover:scale-110 hover:rotate-6" /> : <Image src={`/logo.${logoExt}`} alt="Staking" width={30} height={30} className="pr-1 md:pr-2 transition-all hover:scale-110 hover:rotate-6" /> }
    </div>
  );
}