/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import { Fragment, useState } from 'react'
import CreateFireworks from './CreateFireworks/CreateFireworks'
import CreateShell from './CreateShell/CreateShell'

function FireworksRenderer({ fireworks, sizes, callbacksRef, shellCallbacksRef, handleComplete, handleShellAnimationComplete }) {
  const [shellCompleted, setShellCompleted] = useState({})

  const handleShellAnimationCompleteInternal = (id) => {
    setShellCompleted((prevState) => ({
      ...prevState,
      [id]: true
    }))
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
            {!shellCompleted[fw.id]
              ? <CreateShell
                size={0.2}
                sizes={sizes}
                position={fw.position}
                shellTexture={fw.shellTexture}
                color={fw.color}
                handleShellAnimationComplete={shellCallbacksRef.current[fw.id]}
              />
              : <CreateFireworks
                count={100}
                size={0.3}
                sizes={sizes}
                position={fw.position}
                texture={fw.texture}
                radius={3}
                color={fw.color}
                handleAnimationComplete={callbacksRef.current[fw.id]}
                trailLength={10}
              />}
          </Fragment>
        )
      })}
    </>
  )
}

export default FireworksRenderer
