import { useEffect, useMemo, memo } from 'react'
import { AdditiveBlending, Uniform, BufferGeometry, ShaderMaterial, BufferAttribute, MeshBasicMaterial } from 'three'
import gsap from 'gsap'
import fireworksVertexShader from '../../../shaders/fireworks/vertex.glsl'
import fireworksFragmentShader from '../../../shaders/fireworks/fragment.glsl'
import usePositionSizeAndTimeArrays from '../../../hooks/usePositionSizeAndTimeArrays'
import { Cloud, Clouds } from '@react-three/drei'

function CreateFireworks({ count, size, sizes, position, texture, radius, color, handleAnimationComplete, blending = AdditiveBlending, trailLength }) {
  const { positionsArray, sizesArray, timeMultipliersArray, trailOffsetsArray } = usePositionSizeAndTimeArrays(count, radius, trailLength)

  const geometry = useMemo(() => {
    const geom = new BufferGeometry()

    geom.setAttribute('position', new BufferAttribute(positionsArray, 3))
    geom.setAttribute('aSize', new BufferAttribute(sizesArray, 1))
    geom.setAttribute('aTimeMultiplier', new BufferAttribute(timeMultipliersArray, 1))
    geom.setAttribute('aTrailOffset', new BufferAttribute(trailOffsetsArray, 1))

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
      <points geometry={geometry} material={material} position={position} />
      <Clouds material={MeshBasicMaterial}>
        <Cloud segments={1} bounds={[1, 1, 1]} volume={12} scale={0.3} color={color} position={position} fade={80} concentrate='inside' speed={0.2} />
      </Clouds>
    </>
  )
}

const MemoizedCreateFireworks = memo(CreateFireworks)

export default MemoizedCreateFireworks
