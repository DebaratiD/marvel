import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react';

function ThreeCanvas() {
  return (
      <Canvas className='canvasSize'>
        <ambientLight intensity={0.1} />
        <directionalLight color="blue" position={[0, 0, 5]} />
        <MeshComponent />
      </Canvas>
  )
}
function MeshComponent(){
    const meshRef = useRef();
    
    useFrame((state, delta) => (meshRef.current.rotation.y += delta))
    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 0.5]} />
            <meshStandardMaterial />
        </mesh>
    );
}
export default ThreeCanvas;