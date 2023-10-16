import { isXIntersection } from "@coconut-xr/xinteraction";
import { forwardRef } from "react";
import { Mesh } from "three";

type BoxProps = {
  downState: any;
  position: any;
};

export const Box = forwardRef<Mesh, BoxProps>(
  ({ downState, position }: BoxProps, ref) => {
    return (
      <mesh
        ref={ref}
        position={position}
        scale={0.1}
        onPointerDown={(e) => {
          if (
            ref.current != null &&
            downState.current == null &&
            isXIntersection(e)
          ) {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            downState.current = {
              pointerId: e.pointerId,
              pointToObjectOffset: ref.current.position.clone().sub(e.point)
            };
          }
        }}
        onPointerUp={(e) => {
          if (downState.current?.pointerId != e.pointerId) {
            return;
          }
          downState.current = undefined;
        }}
        onPointerMove={(e) => {
          if (
            ref.current == null ||
            downState.current == null ||
            e.pointerId != downState.current.pointerId ||
            !isXIntersection(e)
          ) {
            return;
          }
          ref.current.position
            .copy(downState.current.pointToObjectOffset)
            .add(e.point);
        }}
      >
        <boxGeometry />
        <meshBasicMaterial color="red" />
      </mesh>
    );
  }
);
