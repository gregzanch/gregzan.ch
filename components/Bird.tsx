import { useRef, useState, useEffect } from "react";
import { AnimationMixer, Group } from "three";

import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type BirdProps = JSX.IntrinsicAttributes & {
  speed: number;
  factor: number;
  url: string;
} & { children?: React.ReactNode };

const Bird = ({ speed, factor, url, ...props }: BirdProps) => {
  const gltf = useLoader(GLTFLoader, url);

  const group = useRef<Group>();
  const [mixer] = useState(() => new AnimationMixer(group.current!));

  useEffect(
    () => void mixer.clipAction(gltf.animations[0], group.current).play(),
    [gltf.animations, mixer]
  );

  useFrame((state, delta) => {
    group.current!.rotation.y +=
      Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
    mixer.update(delta * speed);
  });

  return (
    <group ref={group}>
      {/* @ts-ignore */}
      <scene name="Scene" {...props}>
        <mesh
          name="Object_0"
          // @ts-ignore
          morphTargetDictionary={gltf.nodes.Object_0.morphTargetDictionary}
          // @ts-ignore
          morphTargetInfluences={gltf.nodes.Object_0.morphTargetInfluences}
          rotation={[1.5707964611537577, 0, 0]}
        >
          {/* @ts-ignore */}
          <bufferGeometry attach="geometry" {...gltf.nodes.Object_0.geometry} />
          <meshStandardMaterial
            attach="material"
            {
              /* @ts-ignore */
              ...gltf.nodes.Object_0.material
            }
            name="Material_0_COLOR_0"
          />
        </mesh>
      </scene>
    </group>
  );
};

export default Bird;
