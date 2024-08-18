import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import getWindowSizes from './utils/getWindowsSizes'
import FireworksManager from './components/FireworksManager/FireworksManager'

function App() {
  const sizes = getWindowSizes()

  console.log('App rendered')

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={sizes.pixelRatio}
    >
      <Perf />
      <OrbitControls />
      <FireworksManager sizes={sizes} />
    </Canvas>
  )
}

export default App
