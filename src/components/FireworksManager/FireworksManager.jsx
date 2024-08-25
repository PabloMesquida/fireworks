import { useState, useCallback, useRef, memo } from 'react'
import FireworksRenderer from './FireworksRenderer'
import ControlPanel from './ControlPanel/ControlPanel'
import useTextures from '../../hooks/useTextures'

function FireworksManager({ sizes }) {
  const [fireworks, setFireworks] = useState([])

  const callbacksRef = useRef({})

  const textures = useTextures()

  const handleComplete = useCallback((id) => {
    setFireworks((prev) => prev.filter((fw) => fw.id !== id))
  }, [])

  return (
    <>
      <FireworksRenderer
        fireworks={fireworks}
        sizes={sizes}
        callbacksRef={callbacksRef}
        handleComplete={handleComplete}
      />
      <ControlPanel setFireworks={setFireworks} textures={textures} />
    </>
  )
}

const MemoizedFireworksManager = memo(FireworksManager)

export default MemoizedFireworksManager
