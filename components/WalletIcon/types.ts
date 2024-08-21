import { ElementType, SVGAttributes } from "react";


export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
  spin?: boolean;
}

export type IconComponentType = {
  icon: ElementType<any>;
  isActive?: boolean;
  className?: string;
  height?: string;
  width?: string;
} & SvgProps;