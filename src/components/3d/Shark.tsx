import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function Shark() {
  const sharkRef = useRef<THREE.Group>(null)
  const velocity = useRef(new THREE.Vector3(0.05, 0, 0)) // initial forward speed
  const targetDirection = useRef(new THREE.Vector3(-1, 0, 0))
  const turning = useRef(false)
  const [, setIsMobile] = useState(false)

  // Temp objects to avoid allocations
  const tmpMatrix = useRef(new THREE.Matrix4())
  const tmpEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const finalQuat = useRef(new THREE.Quaternion())
  const currentEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const upVec = useRef(new THREE.Vector3(0, 1, 0))

  const { scene, animations } = useGLTF('/models/shark.glb')
  const { actions } = useAnimations(animations, sharkRef)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Play swim animation
  useEffect(() => {
    if (actions) {
      const swim =
        actions['Swim'] || Object.values(actions)[0]
      swim?.reset().play()
    }
  }, [actions])

  // Bounds for keeping shark visible
  const SAFE_BOUNDS = { x: 20, y: 8, z: 22 }
  const RETURN_CENTER = new THREE.Vector3(0, 0, -4) // center of swim area

  useEffect(() => {
  if (sharkRef.current) {
    const startPos = new THREE.Vector3(
      SAFE_BOUNDS.x + 5, // start outside screen to the right
      0,
      -4
    )
    sharkRef.current.position.copy(startPos)

    // Set velocity toward the center
    const dirToCenter = RETURN_CENTER.clone().sub(startPos).normalize()
    velocity.current.copy(dirToCenter.multiplyScalar(0.05))

    // Face toward center
    sharkRef.current.lookAt(RETURN_CENTER)
  }
}, [])

  useFrame((state) => {
    if (!sharkRef.current) return

    const pos = sharkRef.current.position
    const t = state.clock.getElapsedTime()

    // Check if shark is out of bounds
    if (
      !turning.current &&
      (Math.abs(pos.x) > SAFE_BOUNDS.x ||
        Math.abs(pos.y) > SAFE_BOUNDS.y ||
        Math.abs(pos.z) > SAFE_BOUNDS.z)
    ) {
      turning.current = true

      // Strong comeback bias toward center
      const dirToCenter = RETURN_CENTER.clone().sub(pos).normalize()

      // Reduce vertical influence to prevent rocket movement
      dirToCenter.y *= 0.3

      // Add subtle randomness for realism
      dirToCenter.x += (Math.random() - 0.5) * 0.2
      dirToCenter.z += (Math.random() - 0.5) * 0.2

      targetDirection.current.copy(dirToCenter.normalize())
    }

    // Smooth turning toward target direction
    if (turning.current) {
      velocity.current.lerp(
        targetDirection.current.clone().multiplyScalar(0.05),
        0.02
      )

      // Stop turning when mostly aligned with target
      if (
        velocity.current.clone().normalize().dot(targetDirection.current) > 0.99
      ) {
        turning.current = false
      }
    }

    // Update position
    pos.add(velocity.current)

    // Gentle horizontal-biased bobbing (small vertical movement only)
    pos.y += Math.sin(t * 1.5) * 0.01

    // ==== FIX: Prevent flipping ====
    if (velocity.current.lengthSq() > 0.0001) {
      const lookTarget = pos
        .clone()
        .add(velocity.current.clone().normalize().multiplyScalar(5))

      // Build lookAt matrix
      tmpMatrix.current.lookAt(pos, lookTarget, upVec.current)

      // Convert to Euler
      tmpEuler.current.setFromRotationMatrix(tmpMatrix.current, 'YXZ')

      // Limit pitch (X) to ±20°
      const maxPitch = THREE.MathUtils.degToRad(20)
      tmpEuler.current.x = THREE.MathUtils.clamp(
        tmpEuler.current.x,
        -maxPitch,
        maxPitch
      )

      // Always keep roll (Z) at 0 here, banking applied separately
      tmpEuler.current.z = 0

      // Create quaternion and slerp to it
      finalQuat.current.setFromEuler(tmpEuler.current)
      sharkRef.current.quaternion.slerp(finalQuat.current, 0.1)

      // Apply subtle banking after orientation
      const bank = -velocity.current.x * 2
      currentEuler.current.setFromQuaternion(sharkRef.current.quaternion, 'YXZ')
      currentEuler.current.z = THREE.MathUtils.lerp(
        currentEuler.current.z,
        bank,
        0.1
      )
      sharkRef.current.quaternion.setFromEuler(currentEuler.current)
    }
  })

  return (
    <group ref={sharkRef} scale={2} position={[0, 0, -2]}>
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/shark.glb')
