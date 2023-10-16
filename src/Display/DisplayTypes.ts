import { Size } from "../utils/toSize";

export type DisplaySizeVariant = "small" | "medium" | "large";
export type DisplayColorVariant =
  | "primary"
  | "secondary"
  | "wireframed"
  | "success"
  | "error";

export type DisplayVariantConfig = {
  backgroundColor?: string;
  fontSize?: number;
  opacity?: number;
  text?: string;
  textColor?: string;
  transparent?: boolean;
  wireframe?: boolean;
} & Size;

export const SIZE_VARIANTS: Record<DisplaySizeVariant, Size> = {
  large: {
    sizeDepth: 0.1,
    sizeHeight: 0.8,
    sizeWidth: 1.6
  },
  medium: {
    sizeDepth: 0.1,
    sizeHeight: 0.5,
    sizeWidth: 1.3
  },
  small: {
    sizeDepth: 0.1,
    sizeHeight: 0.3,
    sizeWidth: 0.6
  }
};

export const COLOR_VARIANTS: Record<
  DisplayColorVariant,
  DisplayVariantConfig
> = {
  error: {
    backgroundColor: "#F44336",
    fontSize: 0.5,
    opacity: 1,
    textColor: "white",
    transparent: false,
    wireframe: false
  },
  primary: {
    backgroundColor: "#F5F5F5",
    fontSize: 0.5,
    opacity: 1,
    textColor: "black",
    transparent: false,
    wireframe: false
  },
  secondary: {
    backgroundColor: "#333333",
    fontSize: 0.5,
    opacity: 1,
    textColor: "white",
    transparent: false,
    wireframe: false
  },
  success: {
    backgroundColor: "#4CAF50",
    fontSize: 0.5,
    opacity: 1,
    textColor: "white",
    transparent: false,
    wireframe: false
  },
  wireframed: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    fontSize: 0.5,
    opacity: 0.1,
    textColor: "black",
    transparent: true,
    wireframe: true
  }
};
