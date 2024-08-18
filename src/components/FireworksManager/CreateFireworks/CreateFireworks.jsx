import { useEffect, useMemo, memo } from 'react'
import { AdditiveBlending, Uniform, BufferGeometry, ShaderMaterial, BufferAttribute } from 'three'
import gsap from 'gsap'
import fireworksVertexShader from '../../../shaders/fireworks/vertex.glsl'
import fireworksFragmentShader from '../../../shaders/fireworks/fragment.glsl'
import usePositionAndSizeArray from '../../../hooks/usePositionAndSizeArray'

function CreateFireworks({ count, size, sizes, position, texture, radius, color, handleAnimationComplete, blending = AdditiveBlending }) {
  const { positionsArray, sizesArray } = usePositionAndSizeArray(count, radius, position)

  const geometry = useMemo(() => {
    const geom = new BufferGeometry()

    geom.setAttribute('position', new BufferAttribute(positionsArray, 3))
    geom.setAttribute('aSize', new BufferAttribute(sizesArray, 1))

    return geom
  }, [positionsArray, sizesArray])

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
    <points geometry={geometry} material={material} position={position} />
  )
}

const MemoizedCreateFireworks = memo(CreateFireworks, (prevProps, nextProps) => {
  const propsChanged = []

  if (prevProps.count !== nextProps.count) {
    propsChanged.push('count')
  }
  if (prevProps.size !== nextProps.size) {
    propsChanged.push('size')
  }
  if (prevProps.sizes.resolution !== nextProps.sizes.resolution) {
    propsChanged.push('sizes.resolution')
  }
  if (!prevProps.position.equals(nextProps.position)) {
    propsChanged.push('position')
  }
  if (prevProps.texture !== nextProps.texture) {
    propsChanged.push('texture')
  }
  if (prevProps.radius !== nextProps.radius) {
    propsChanged.push('radius')
  }
  if (!prevProps.color.equals(nextProps.color)) {
    propsChanged.push('color')
  }
  if (prevProps.onAnimationComplete !== nextProps.onAnimationComplete) {
    propsChanged.push('onAnimationComplete')
  }

  if (propsChanged.length > 0) {
    console.log(`Props cambiadas en CreateFireworks: ${propsChanged.join(', ')}`)
  }

  // Solo renderizar si ninguna prop ha cambiado
  return propsChanged.length === 0
})

export default MemoizedCreateFireworks
