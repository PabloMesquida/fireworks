import { Fragment, useState } from 'react'
import CreateFireworks from './CreateFireworks/CreateFireworks'
import CreateShell from './CreateShell/CreateShell'

function FireworksRenderer({ fireworks, sizes, callbacksRef, shellCallbacksRef, handleComplete, handleShellAnimationComplete }) {
  const [shellCompleted, setShellCompleted] = useState({})

  const handleShellAnimationCompleteInternal = (id) => {
    // Actualiza el estado para indicar que la cáscara ha completado su animación
    setShellCompleted((prevState) => ({
      ...prevState,
      [id]: true
    }))
    // Llama al callback original si es necesario
    if (handleShellAnimationComplete) {
      handleShellAnimationComplete(id)
    }
  }

  return (
    <>
      {fireworks.map((fw) => {
        if (!callbacksRef.current[fw.id]) {
          callbacksRef.current[fw.id] = () => handleComplete(fw.id)
        }
        if (!shellCallbacksRef.current[fw.id]) {
          shellCallbacksRef.current[fw.id] = () => handleShellAnimationCompleteInternal(fw.id)
        }
        return (
          <Fragment key={fw.id}>
            {/* Renderiza CreateShell solo si su animación no ha terminado */}
            {!shellCompleted[fw.id] && (
              <CreateShell
                size={0.50}
                sizes={sizes}
                position={fw.position}
                texture={fw.texture}
                color={fw.color}
                handleShellAnimationComplete={shellCallbacksRef.current[fw.id]}
              />
            )}
            {/* CreateFireworks se renderiza normalmente */}
            <CreateFireworks
              count={100}
              size={0.50}
              sizes={sizes}
              position={fw.position}
              texture={fw.texture}
              radius={3}
              color={fw.color}
              handleAnimationComplete={callbacksRef.current[fw.id]}
              trailLength={10}
            />
          </Fragment>
        )
      })}
    </>
  )
}

export default FireworksRenderer
