import { useEffect, useMemo, memo } from 'react'
import { Uniform, BufferGeometry, ShaderMaterial, BufferAttribute, Vector3, AdditiveBlending } from 'three'
import trailVertexShader from '../../../shaders/trail/vertex.glsl'
import trailFragmentShader from '../../../shaders/trail/fragment.glsl'
import gsap from 'gsap'
import useTimeAndTrailOffsetsArrays from '../../../hooks/useTimeAndTrailOffsetsArrays'

const getRandomPositionInRange = (range) => (Math.random() - 0.5) * range

function CreateShell({ size, sizes, position, shellTexture, color, handleShellAnimationComplete, blending = AdditiveBlending }) {
  const startPosition = useMemo(() => new Vector3(getRandomPositionInRange(4), 0, getRandomPositionInRange(1)), [])

  const { timeMultipliersArray, trailOffsetsArray } = useTimeAndTrailOffsetsArrays(10)

  const uniforms = useMemo(() => ({
    uSize: new Uniform(size / 2),
    uResolution: new Uniform(sizes.resolution),
    uTexture: new Uniform(shellTexture),
    uColor: new Uniform(color),
    uProgress: new Uniform(0)
  }), [size, sizes.resolution, shellTexture, color])

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: trailVertexShader,
      fragmentShader: trailFragmentShader,
      uniforms,
      blending,
      depthWrite: false,
      transparent: true
    })
  }, [uniforms])

  const geometry = useMemo(() => {
    const geom = new BufferGeometry()

    const aStartPosition = new Float32Array([startPosition.x, startPosition.y, startPosition.z])
    const aEndPosition = new Float32Array([position.x, position.y, position.z])

    geom.setAttribute('position', new BufferAttribute(aStartPosition, 3))
    geom.setAttribute('aEndPosition', new BufferAttribute(aEndPosition, 3))
    geom.setAttribute('aTimeMultiplier', new BufferAttribute(timeMultipliersArray, 1))
    geom.setAttribute('aTrailOffset', new BufferAttribute(trailOffsetsArray, 1))

    return geom
  }, [position, startPosition, timeMultipliersArray, trailOffsetsArray])

  useEffect(() => {
    const animation = gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 1,
      ease: 'linear',
      onComplete: () => {
        handleShellAnimationComplete()
      }
    })

    return () => {
      geometry.dispose()
      material.dispose()
      animation.kill()
    }
  }, [geometry, material, uniforms.uProgress, handleShellAnimationComplete])

  return (
    <points geometry={geometry} material={material} />
  )
}

const MemoizedCreateShell = memo(CreateShell)

export default MemoizedCreateShell
