import { useEffect, useMemo, memo } from 'react'
import { AdditiveBlending, Uniform, BufferGeometry, ShaderMaterial, BufferAttribute, Vector3 } from 'three'
import gsap from 'gsap'
import fireworksVertexShader from '../../../shaders/fireworks/vertex.glsl'
import fireworksFragmentShader from '../../../shaders/fireworks/fragment.glsl'
import trailVertexShader from '../../../shaders/trail/vertex.glsl'
import trailFragmentShader from '../../../shaders/trail/fragment.glsl'
import usePositionSizeAndTimeArrays from '../../../hooks/usePositionSizeAndTimeArrays'

function CreateFireworks({ count, size, sizes, position, texture, radius, color, handleAnimationComplete, blending = AdditiveBlending, trailLength }) {
  const { positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray } = usePositionSizeAndTimeArrays(count, radius, position, trailLength)

  const startPosition = useMemo(() => {
    const sPos = new Vector3(0.0, 0.0, 0.0)
    const posArray = new Float32Array([sPos.x, sPos.y, sPos.z])
    return posArray
  }, [])

  const geometry = useMemo(() => {
    const geom = new BufferGeometry()

    geom.setAttribute('position', new BufferAttribute(positionsArray, 3))
    geom.setAttribute('aSize', new BufferAttribute(sizesArray, 1))
    geom.setAttribute('aTimeMultiplier', new BufferAttribute(timeMultipliersArray, 1))
    geom.setAttribute('aTrailOffset', new BufferAttribute(trailOffsetsArray, 1))

    return geom
  }, [positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray])

  const geometryTrial = useMemo(() => {
    const geom = new BufferGeometry()

    // Asegúrate de que los arrays sean TypedArrays
    const validPositionsArray = positionsArray instanceof Float32Array ? positionsArray : new Float32Array(positionsArray)
    const validSizesArray = sizesArray instanceof Float32Array ? sizesArray : new Float32Array(sizesArray)
    const validTimeMultipliersArray = timeMultipliersArray instanceof Float32Array ? timeMultipliersArray : new Float32Array(timeMultipliersArray)
    const validTrailOffsetsArray = trailOffsetsArray instanceof Float32Array ? trailOffsetsArray : new Float32Array(trailOffsetsArray)

    geom.setAttribute('position', new BufferAttribute(validPositionsArray, 3))
    geom.setAttribute('aSize', new BufferAttribute(validSizesArray, 1))
    geom.setAttribute('aTimeMultiplier', new BufferAttribute(validTimeMultipliersArray, 1))
    geom.setAttribute('aTrailOffset', new BufferAttribute(validTrailOffsetsArray, 1))

    return geom
  }, [positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray])

  const uniforms = useMemo(() => ({
    uSize: new Uniform(size),
    uResolution: new Uniform(sizes.resolution),
    uTexture: new Uniform(texture),
    uColor: new Uniform(color),
    uProgress: new Uniform(0)
  }), [size, sizes.resolution, texture, color])

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: fireworksVertexShader,
      fragmentShader: fireworksFragmentShader,
      uniforms,
      blending,
      depthWrite: false,
      transparent: true
    })
  }, [uniforms, blending])

  const materialTrial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      uniforms,
      blending,
      depthWrite: false,
      transparent: true
    })
  }, [uniforms, blending])

  useEffect(() => {
    const animation = gsap.to(uniforms.uProgress, { value: 1, duration: 3, ease: 'linear', onComplete: () => handleAnimationComplete() })

    return () => {
      geometry.dispose()
      material.dispose()
      animation.kill()
    }
  }, [geometry, material, uniforms.uProgress, handleAnimationComplete])

  return (
    <>
      <points geometry={geometryTrial} material={materialTrial} position={position} />
      <points geometry={geometry} material={material} position={position} />
    </>
  )
}

const MemoizedCreateFireworks = memo(CreateFireworks)

export default MemoizedCreateFireworks
