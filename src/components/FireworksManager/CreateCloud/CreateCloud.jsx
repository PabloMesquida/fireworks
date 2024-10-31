import { memo } from 'react'
import { Cloud } from '@react-three/drei'

const CreateCloud = memo(function CreateCloud({ color, position, seed }) {
  return (
    <Cloud
      seed={seed}
      segments={5}
      bounds={[1, 1, 1]}
      volume={6}
      color={color}
      fade={30}
      speed={0.2}
      position={position}
      opacity={0.05}
    />

  )
})

export default CreateCloud
