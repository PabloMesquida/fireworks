import { MeshReflectorMaterial } from '@react-three/drei'

function Ground() {
  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[0, 0]}
        resolution={128}
        mixBlur={0}
        mixStrength={0.5}
        mirror={0}
        mixContrast={1}
        roughness={1}
        metalness={0.3}
        depthScale={0}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        color='#050505'
        distortion={0.5}
        debug={0}
        reflectorOffset={0}
      />
    </mesh>
  )
}

export default Ground
