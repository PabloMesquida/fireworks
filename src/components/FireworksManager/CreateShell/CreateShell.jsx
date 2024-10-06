import { useEffect, useMemo } from 'react'
import { AdditiveBlending, Uniform, BufferGeometry, ShaderMaterial, BufferAttribute, Vector3 } from 'three'
import trailVertexShader from '../../../shaders/trail/vertex.glsl'
import trailFragmentShader from '../../../shaders/trail/fragment.glsl'
import gsap from 'gsap'

function CreateShell({ size, sizes, position, shellTexture, color, handleShellAnimationComplete, blending = AdditiveBlending }) {
  const startPosition = new Vector3(0, 0, 0)

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
    const points = new Float32Array([position.x, position.y, position.z])
    geom.setAttribute('position', new BufferAttribute(points, 3))
    return geom
  }, [])

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
    <points geometry={geometry} material={material} position={startPosition} />
  )
}

export default CreateShell
