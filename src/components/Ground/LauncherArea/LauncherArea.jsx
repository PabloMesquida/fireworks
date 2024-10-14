import laucherAreaFragmentShader from '../../../shaders/launcherArea/fragment.glsl'
import laucherAreaVertexShader from '../../../shaders/launcherArea/vertex.glsl'

function LauncherArea() {
  return (
    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[5, 1.5]} />
      <shaderMaterial vertexShader={laucherAreaVertexShader} fragmentShader={laucherAreaFragmentShader} transparent />
    </mesh>
  )
}

export default LauncherArea
