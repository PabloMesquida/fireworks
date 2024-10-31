import { useState, useRef, memo } from 'react'
import FireworksRenderer from './FireworksRenderer'
import ControlPanel from './ControlPanel/ControlPanel'
import useTextures from '../../hooks/useTextures'

function FireworksManager({ sizes }) {
  const [fireworks, setFireworks] = useState([])

  const callbacksRef = useRef({})
  const shellCallbacksRef = useRef({})

  const textures = useTextures()

  const handleComplete = (id) => {
    setFireworks((prev) => prev.filter((fw) => fw.id !== id))
  }

  return (
    <group position={[0, -2, 0]}>
      <FireworksRenderer
        fireworks={fireworks}
        sizes={sizes}
        callbacksRef={callbacksRef}
        shellCallbacksRef={shellCallbacksRef}
        handleComplete={handleComplete}

      />
      <ControlPanel setFireworks={setFireworks} textures={textures} />
    </group>
  )
}

const MemoizedFireworksManager = memo(FireworksManager)

export default MemoizedFireworksManager
