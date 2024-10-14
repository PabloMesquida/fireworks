import { useCallback, memo } from 'react'
import { Color, Vector3 } from 'three'
import { Html } from '@react-three/drei'

function ControlPanel({ setFireworks, textures }) {
  const handleClick = useCallback(() => {
    const id = Date.now() + Math.random()

    const colors = [
      new Color(0xcfec0e), // Amarillo
      new Color(0xE04144), // Rojo
      new Color(0x41E04E), // Verde
      new Color(0x6dcadc) // Azul
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    setFireworks((prev) => [
      ...prev,
      {
        id,
        position: new Vector3(
          (Math.random() - 0.5) * 10,
          Math.random() + 5.5,
          (Math.random() - 0.5) * 2
        ),
        texture: textures[3],
        shellTexture: textures[2],
        color: randomColor
      }
    ])
  }, [textures, setFireworks])

  return (
    <Html
      position={[-7, 0, -2]}
      transform
      as='div'
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100px',
        height: '100px',
        backgroundColor: 'rgba(255, 0, 0, 0.5)'
      }}
    >
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Lanzar Fuegos Artificiales
      </button>

    </Html>
  )
}

const MemoizedControlPanel = memo(ControlPanel)

export default MemoizedControlPanel
