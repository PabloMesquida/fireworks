import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Grid } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import getWindowSizes from './utils/getWindowsSizes'
import FireworksManager from './components/FireworksManager/FireworksManager'
import Ground from './components/Ground/Ground'

function App() {
  const sizes = getWindowSizes()

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={sizes.pixelRatio}
    >
      <Perf />
      <OrbitControls
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <FireworksManager sizes={sizes} />
      <Environment preset='dawn' />
      <Grid
        position={[0, -1.49, 0]}
        infiniteGrid
        sectionSize={10}
        sectionColor='#222'
        fadeDistance={20}
        fadeStrength={1}
        cellSize={1}
        cellColor='#333'
        lineWidth={0.5}
      />
      <Ground />
    </Canvas>
  )
}

export default App
