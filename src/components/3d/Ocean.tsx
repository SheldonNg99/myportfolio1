// src/components/3d/Ocean.tsx
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

interface OceanProps {
  children?: React.ReactNode
  followTarget?: React.RefObject<THREE.Object3D> // optional for tracking shark
}

// Optional camera follow component
function FollowCamera({ target }: { target?: React.RefObject<THREE.Object3D> }) {
  const { camera } = useThree()
  const basePos = useRef(new THREE.Vector3(0, 1, 10)) // default camera pos

  useFrame(() => {
    if (target?.current) {
      // Subtle tracking
      const sharkPos = target.current.position
      const targetCamPos = basePos.current.clone()
      targetCamPos.x += sharkPos.x * 0.05
      targetCamPos.y += sharkPos.y * 0.02
      camera.position.lerp(targetCamPos, 0.02)
      camera.lookAt(0, 0, 0)
    } else {
      // Always look toward center if no target
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}

export default function Ocean({ children, followTarget }: OceanProps) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen m-0 p-0">
      <Canvas
        camera={{
          position: [0, 1, 10], // slightly elevated view
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        className="w-screen h-screen m-0 p-0 block"
        style={{
          background:
            'linear-gradient(to bottom, #87CEEB 0%, #4682B4 50%, #191970 100%)'
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          {/* Realistic environment reflections */}
          <Environment preset="sunset" />

          {/* Optional smooth follow camera */}
          <FollowCamera target={followTarget} />

          {/* Scene objects (e.g., Shark) */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}