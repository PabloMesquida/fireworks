/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import { Fragment, memo, useState } from 'react'
import CreateFireworks from './CreateFireworks/CreateFireworks'
import CreateShell from './CreateShell/CreateShell'
import CreateCloud from './CreateCloud/CreateCloud'
import { Clouds } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

function FireworksRenderer({ fireworks, sizes, callbacksRef, shellCallbacksRef, handleComplete }) {
  const [shellCompleted, setShellCompleted] = useState({})
  const [clouds, setClouds] = useState([])

  const handleShellAnimationCompleteInternal = (id) => {
    setShellCompleted((prevState) => ({
      ...prevState,
      [id]: true
    }))

    setTimeout(() => {
      setClouds((prevClouds) => [
        ...prevClouds,
        { id, position: fireworks.find(fw => fw.id === id).position, color: fireworks.find(fw => fw.id === id).color }
      ])

      setTimeout(() => {
        setClouds((prevClouds) => prevClouds.filter(cloud => cloud.id !== id))
      }, 10000)
    }, 200)
  }

  return (
    <>
      {fireworks.map((fw) => {
        if (!callbacksRef.current[fw.id]) {
          callbacksRef.current[fw.id] = () => handleComplete(fw.id)
        }

        if (!shellCallbacksRef.current[fw.id]) {
          shellCallbacksRef.current[fw.id] = () => handleShellAnimationCompleteInternal(fw.id, fw.position)
        }

        return (
          <Fragment key={fw.id}>
            {!shellCompleted[fw.id]
              ? <CreateShell
                size={0.5}
                sizes={sizes}
                position={fw.position}
                shellTexture={fw.shellTexture}
                color={fw.color}
                handleShellAnimationComplete={shellCallbacksRef.current[fw.id]}
              />
              : <>
                <CreateFireworks
                  count={200}
                  size={0.3}
                  sizes={sizes}
                  position={fw.position}
                  texture={fw.texture}
                  radius={3}
                  color={fw.color}
                  handleAnimationComplete={callbacksRef.current[fw.id]}
                  trailLength={10}
                />
              </>}
          </Fragment>
        )
      })}
      <Clouds material={MeshBasicMaterial}>
        {clouds.map((cloud) =>
          <CreateCloud key={cloud.id} id={cloud.id} color={cloud.color} position={cloud.position} />
        )}
      </Clouds>
    </>
  )
}

const MemoizedFireworksRenderer = memo(FireworksRenderer, (prevProps, nextProps) => {
  return (
    prevProps.sizes === nextProps.sizes &&
    prevProps.callbacksRef === nextProps.callbacksRef &&
    prevProps.shellCallbacksRef === nextProps.shellCallbacksRef &&
    prevProps.handleComplete === nextProps.handleComplete
  )
})

export default MemoizedFireworksRenderer
