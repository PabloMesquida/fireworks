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

const MemoizedFireworksManager = memo(FireworksManager, (prevProps, nextProps) => {
  // Comprobar si las propiedades han cambiado
  if (prevProps.sizes !== nextProps.sizes) {
    console.log('sizes ha cambiado')
    return false // sizes ha cambiado, se debe renderizar de nuevo
  }

  // Comprobar si fireworks ha cambiado (referencia de array)
  if (prevProps.fireworks !== nextProps.fireworks) {
    console.log('fireworks ha cambiado')
    return false // fireworks ha cambiado, se debe renderizar de nuevo
  }

  // Comprobar si callbacksRef ha cambiado (referencia de objeto)
  if (prevProps.callbacksRef !== nextProps.callbacksRef) {
    console.log('callbacksRef ha cambiado')
    return false // callbacksRef ha cambiado, se debe renderizar de nuevo
  }

  // Comprobar si handleComplete ha cambiado
  if (prevProps.handleComplete !== nextProps.handleComplete) {
    console.log('handleComplete ha cambiado')
    return false // handleComplete ha cambiado, se debe renderizar de nuevo
  }

  // Si ninguna propiedad ha cambiado, no renderizar de nuevo
  return true
})

export default MemoizedFireworksManager
