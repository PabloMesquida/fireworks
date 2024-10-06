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

  const handleShellAnimationComplete = (id) => {
    console.log('Boom!', id)
  }

  return (
    <>
      <FireworksRenderer
        fireworks={fireworks}
        sizes={sizes}
        callbacksRef={callbacksRef}
        shellCallbacksRef={shellCallbacksRef}
        handleComplete={handleComplete}
        handleShellAnimationComplete={handleShellAnimationComplete}
      />
      <ControlPanel setFireworks={setFireworks} textures={textures} />
    </>
  )
}

const MemoizedFireworksManager = memo(FireworksManager)

export default MemoizedFireworksManager
