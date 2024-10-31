import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
/* import { Perf } from 'r3f-perf' */
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
      {/* <Perf /> */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />

      <Environment preset='dawn' />
      <FireworksManager sizes={sizes} />
      <Ground />
    </Canvas>
  )
}

export default App
