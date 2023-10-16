import { RoundedBox, Text } from "@react-three/drei";
import {
  COLOR_VARIANTS,
  DisplayColorVariant,
  DisplaySizeVariant,
  SIZE_VARIANTS
} from "./DisplayTypes";
import { Position, toPosition } from "../utils/toPosition";
import { Rotation, toRotation } from "../utils/toRotation";
import { toSize } from "../utils/toSize";

export type DisplayProps = {
  text?: string | number;
  sizeVariant?: DisplaySizeVariant;
  colorVariant?: DisplayColorVariant;
} & Position &
  Rotation;

export default function Display({
  text,
  sizeVariant,
  colorVariant,
  ...props
}: DisplayProps) {
  const sizeConfig = sizeVariant
    ? SIZE_VARIANTS[sizeVariant]
    : SIZE_VARIANTS.medium;
  const colorConfig = colorVariant
    ? COLOR_VARIANTS[colorVariant]
    : COLOR_VARIANTS.primary;

  const finalProps = {
    ...sizeConfig,
    ...colorConfig,
    ...props
  };

  return (
    <group position={toPosition(finalProps)} rotation={toRotation(finalProps)}>
      {/* Display Background */}
      <RoundedBox args={toSize(finalProps)}>
        <meshStandardMaterial
          color={finalProps.backgroundColor}
          transparent={finalProps.transparent}
          opacity={finalProps.opacity}
          wireframe={finalProps.wireframe}
        />
      </RoundedBox>

      <Text
        position={toPosition({
          positionOut: 0.06
        })}
        fontSize={finalProps.fontSize}
        color={finalProps.textColor}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}
