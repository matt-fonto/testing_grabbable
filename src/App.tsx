import {
  XRCanvas,
  PointerHand,
  PointerController,
  Hands,
  Controllers,
  Grabbable
} from "@coconut-xr/natuerlich/defaults";
import { getInputSourceId } from "@coconut-xr/natuerlich";
import { createRef, useRef } from "react";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useInputSources
} from "@coconut-xr/natuerlich/react";
import { LogDisplay } from "./LogDisplay";
import { Vector3, Mesh } from "three";

import { Box } from "./Box";
import { Collidable } from "./Collidable";

const sessionOptions: XRSessionInit = {
  requiredFeatures: ["local-floor", "hand-tracking"]
};

const box_length = 4;
const spacing = 0.3;

export default function Index() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);

  const inputSources = useInputSources();

  const boxRefs = useRef<(React.RefObject<Mesh> | null)[]>(
    Array(box_length)
      .fill(null)
      .map(() => createRef<Mesh>())
  );

  if (!boxRefs.current) return null;

  const downState = useRef<{
    pointerId: number;
    pointToObjectOffset: Vector3;
  }>();

  return (
    <div>
      <button onClick={enterAR}>Enter AR</button>
      <XRCanvas>
        <Grabbable>
        {Array.from({ length: box_length }).map((_, index) => (
          <Box
            key={index}
            boxRefs={boxRefs.current[index]}
            downState={downState}
            position={[index * spacing, 1.5, -0.3]}
          />
        ))}
        <Grabbable/>

        <Collidable />

        <LogDisplay position={[1, 1, -1]} />

        <NonImmersiveCamera position={[0, 1.5, 0]} />
        <ImmersiveSessionOrigin position={[0, 0, 0]}>
          <Hands type="grab" />
          <Controllers type="grab" />
        </ImmersiveSessionOrigin>
      </XRCanvas>
    </div>
  );
}
