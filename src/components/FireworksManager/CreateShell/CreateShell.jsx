import { useEffect, useMemo, memo } from 'react'
import { AdditiveBlending, Uniform, BufferGeometry, ShaderMaterial, BufferAttribute, Vector3 } from 'three'
import trailVertexShader from '../../../shaders/trail/vertex.glsl'
import trailFragmentShader from '../../../shaders/trail/fragment.glsl'
import gsap from 'gsap'

const getRandomPositionInRange = (range) => (Math.random() - 0.5) * range

function CreateShell({ size, sizes, position, shellTexture, color, handleShellAnimationComplete, blending = AdditiveBlending }) {
  const startPosition = new Vector3(getRandomPositionInRange(4), 0, getRandomPositionInRange(1))

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
      depthWrite: false,
      transparent: true
    })
  }, [uniforms])

  const geometry = useMemo(() => {
    const geom = new BufferGeometry()

    // Posición inicial del vértice
    const aStartPosition = new Float32Array([startPosition.x, startPosition.y, startPosition.z])

    // Posición final del vértice
    const aEndPosition = new Float32Array([position.x, position.y, position.z])

    // Asigna el atributo 'position' para la posición inicial
    geom.setAttribute('position', new BufferAttribute(aStartPosition, 3))

    // Asigna el atributo 'aEndPosition' para la posición final
    geom.setAttribute('aEndPosition', new BufferAttribute(aEndPosition, 3))

    return geom
  }, [position, startPosition])
  useEffect(() => {
    const animation = gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 1,
      ease: 'linear',
      onComplete: () => {
        handleShellAnimationComplete() // Llamamos al callback al completar la animación
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
