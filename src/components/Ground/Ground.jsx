import { Grid, MeshReflectorMaterial } from '@react-three/drei'
import LauncherArea from './LauncherArea/LauncherArea'

function Ground() {
  return (
    <group position={[0, -2.49, 0]}>
      <LauncherArea />
      <Grid
        position={[0, 0.01, 0]}
        infiniteGrid
        sectionSize={10}
        sectionColor='#222'
        fadeDistance={30}
        fadeStrength={1}
        cellSize={1}
        cellColor='#333'
        lineWidth={0.5}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
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
    </group>

  )
}

export default Ground
