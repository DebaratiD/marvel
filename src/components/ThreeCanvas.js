import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react';
import * as THREE from 'three';
import { heroStore } from '../constants';
import { useSnapshot } from 'valtio';

function ThreeCanvas() {
  return (
      <Canvas className='canvasSize' shadows camera={{ position: [5, 0, 15], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight color="blue" position={[0, 0, 5]} />
        <MeshComponent />
      </Canvas>
  )
}
function MeshComponent(){
    const meshRef = useRef();
    const snap = useSnapshot(heroStore);
    
    useFrame((state, delta) => (meshRef.current.rotation.y += 0.01));
    const texture = new THREE.TextureLoader().load(snap.heroImage);
    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[4.5, 4.7, 0.1]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
}
export default ThreeCanvas;