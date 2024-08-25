import { useMemo } from 'react'
import { Spherical, Vector3 } from 'three'

function usePositionSizeAndTimeArrays(count, radius, position) {
  return useMemo(() => {
    const positionsArray = new Float32Array(count * 3)
    const sizesArray = new Float32Array(count)
    const timeMultipliersArray = new Float32Array(count)

    const spherical = new Spherical()
    const pos = new Vector3(...position)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      spherical.radius = radius * (0.65 + Math.random() * 0.35)
      spherical.phi = Math.random() * Math.PI
      spherical.theta = Math.random() * Math.PI * 2

      pos.setFromSpherical(spherical)

      positionsArray[i3] = pos.x
      positionsArray[i3 + 1] = pos.y
      positionsArray[i3 + 2] = pos.z

      sizesArray[i] = Math.random() * 2

      timeMultipliersArray[i] = 1 + Math.random()
    }
    return { positionsArray, sizesArray, timeMultipliersArray }
  }, [count, radius, position])
}

export default usePositionSizeAndTimeArrays
