import React from 'react'
import CreateFireworks from './CreateFireworks/CreateFireworks'

function FireworksRenderer({ fireworks, sizes, callbacksRef, handleComplete }) {
  return (
    <>
      {fireworks.map((fw) => {
        if (!callbacksRef.current[fw.id]) {
          callbacksRef.current[fw.id] = () => handleComplete(fw.id)
        }
        return (
          <CreateFireworks
            key={fw.id}
            count={100}
            size={0.12}
            sizes={sizes}
            position={fw.position}
            texture={fw.texture}
            radius={3}
            color={fw.color}
            handleAnimationComplete={callbacksRef.current[fw.id]}
            trailLength={20}
          />
        )
      })}
    </>
  )
}

export default FireworksRenderer
