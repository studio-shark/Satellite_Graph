import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text, Float, Stars } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

// Types for our props
interface Visualization3DProps {
  stage: "2d" | "3d" | "4d" | "overview";
}

// 2D Grid Component (Traditional Strategy)
function Grid2D({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { scale, opacity } = useSpring({
    scale: active ? 1 : 0,
    opacity: active ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <animated.group 
      ref={groupRef} 
      scale={scale}
      // @ts-ignore - opacity is not directly on group but we pass it for children materials if needed
      visible={active || scale.to(s => s > 0.01)}
    >
      {/* BCG Matrix Quadrants */}
      <mesh position={[-1.5, 1.5, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <animated.meshBasicMaterial color="#004488" transparent opacity={opacity.to(o => o * 0.3)} side={THREE.DoubleSide} />
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 2.8)]} />
          <animated.lineBasicMaterial color="#00F0FF" transparent opacity={opacity} />
        </lineSegments>
      </mesh>
      <Text position={[-1.5, 1.5, 0.1]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        MARKET LEADERS
      </Text>

      <mesh position={[1.5, 1.5, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <animated.meshBasicMaterial color="#004488" transparent opacity={opacity.to(o => o * 0.2)} side={THREE.DoubleSide} />
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 2.8)]} />
          <animated.lineBasicMaterial color="#00F0FF" transparent opacity={opacity} />
        </lineSegments>
      </mesh>
      <Text position={[1.5, 1.5, 0.1]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        CORE ASSETS
      </Text>

      <mesh position={[-1.5, -1.5, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <animated.meshBasicMaterial color="#004488" transparent opacity={opacity.to(o => o * 0.2)} side={THREE.DoubleSide} />
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 2.8)]} />
          <animated.lineBasicMaterial color="#00F0FF" transparent opacity={opacity} />
        </lineSegments>
      </mesh>
      <Text position={[-1.5, -1.5, 0.1]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        EMERGING VENTURES
      </Text>

      <mesh position={[1.5, -1.5, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <animated.meshBasicMaterial color="#004488" transparent opacity={opacity.to(o => o * 0.1)} side={THREE.DoubleSide} />
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 2.8)]} />
          <animated.lineBasicMaterial color="#00F0FF" transparent opacity={opacity} />
        </lineSegments>
      </mesh>
      <Text position={[1.5, -1.5, 0.1]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        UNDERPERFORMERS
      </Text>

      {/* Axes */}
      <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(-3, -3, 0), 6, 0x00F0FF]} />
      <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(-3, -3, 0), 6, 0x00F0FF]} />
      
      <Text position={[0, -3.5, 0]} fontSize={0.2} color="#00F0FF">MARKET SHARE</Text>
      <Text position={[-3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} fontSize={0.2} color="#00F0FF">GROWTH RATE</Text>
    </animated.group>
  );
}

// 3D Cube Component (Transition)
function Cube3D({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const { scale, opacity } = useSpring({
    scale: active ? 1 : 0,
    opacity: active ? 1 : 0,
    delay: active ? 100 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <animated.group 
      scale={scale}
      // @ts-ignore
      visible={active || scale.to(s => s > 0.01)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[3, 3, 3]} />
          <animated.meshPhysicalMaterial 
            color="#00F0FF" 
            transparent 
            opacity={opacity.to(o => o * 0.15)} 
            roughness={0}
            metalness={0.8}
            clearcoat={1}
            side={THREE.DoubleSide}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 3)]} />
            <animated.lineBasicMaterial color="#00F0FF" linewidth={2} transparent opacity={opacity} />
          </lineSegments>
        </mesh>
        
        {/* Inner glowing core */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <animated.meshBasicMaterial color="#00F0FF" wireframe transparent opacity={opacity.to(o => o * 0.3)} />
        </mesh>
        
        {/* Orbital rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <animated.meshBasicMaterial color="#BD00FF" transparent opacity={opacity.to(o => o * 0.6)} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[3.2, 0.02, 16, 100]} />
          <animated.meshBasicMaterial color="#BD00FF" transparent opacity={opacity.to(o => o * 0.4)} />
        </mesh>
      </Float>
      
      <Text position={[0, -2.5, 2]} fontSize={0.3} color="#00F0FF" anchorX="center">
        EXPANSION
      </Text>
    </animated.group>
  );
}

// 4D Tesseract/Hypercube Component (Advanced Models)
function Tesseract4D({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { scale, opacity } = useSpring({
    scale: active ? 1 : 0,
    opacity: active ? 1 : 0,
    delay: active ? 200 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  // Generate particles for "Time" dimension
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      temp.push({ x, y, z, speed: Math.random() * 0.02 + 0.01 });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Complex 4D rotation simulation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <animated.group 
      ref={groupRef} 
      scale={scale}
      // @ts-ignore
      visible={active || scale.to(s => s > 0.01)}
    >
      {/* Central Cube */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <animated.meshPhysicalMaterial 
          color="#BD00FF" 
          transparent 
          opacity={opacity.to(o => o * 0.2)} 
          roughness={0.1}
          metalness={0.9}
          transmission={0.5}
        />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2, 2, 2)]} />
          <animated.lineBasicMaterial color="#BD00FF" transparent opacity={opacity} />
        </lineSegments>
      </mesh>

      {/* Outer Cube (Hypercube projection) */}
      <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <animated.meshBasicMaterial color="#00F0FF" wireframe transparent opacity={opacity.to(o => o * 0.1)} />
      </mesh>

      {/* Connecting lines for Tesseract */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4, 4, 4)]} />
        <animated.lineBasicMaterial color="#00F0FF" transparent opacity={opacity.to(o => o * 0.2)} />
      </lineSegments>

      {/* Time Slices */}
      {[...Array(4)].map((_, i) => (
        <group key={i} rotation={[0, (Math.PI / 2) * i, 0]}>
          <mesh position={[2.5, 0, 0]}>
            <planeGeometry args={[2, 2]} />
            <animated.meshBasicMaterial color="#00F0FF" transparent opacity={opacity.to(o => o * 0.1)} side={THREE.DoubleSide} />
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(2, 2)]} />
              <animated.lineBasicMaterial color="#00F0FF" transparent opacity={opacity.to(o => o * 0.3)} />
            </lineSegments>
          </mesh>
          <Text position={[2.5, 1.2, 0]} fontSize={0.15} color="#00F0FF">
            Q{i + 1} 2025
          </Text>
        </group>
      ))}

      {/* Floating Data Particles */}
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <animated.meshBasicMaterial color="#BD00FF" transparent opacity={opacity} />
        </mesh>
      ))}
    </animated.group>
  );
}

export default function Visualization3D({ stage }: Visualization3DProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-gradient-to-b from-[#050A14] to-[#020408]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#BD00FF" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {stage === "overview" ? (
          <group position={[0, 1, 0]}>
            <group position={[-6, 0, 0]} scale={0.7}>
              <Grid2D active={true} />
              <Text position={[0, -4.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center">2D: BCG MATRIX</Text>
            </group>
            
            <group position={[0, 0, 0]} scale={0.7}>
              <Cube3D active={true} />
              <Text position={[0, -4.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center">3D: TRANSITION</Text>
            </group>
            
            <group position={[6, 0, 0]} scale={0.7}>
              <Tesseract4D active={true} />
              <Text position={[0, -4.5, 0]} fontSize={0.4} color="#ffffff" anchorX="center">4D: TEMPORAL INTELLIGENCE</Text>
            </group>

            {/* Arrows */}
            <group position={[-3, 0, 0]}>
              <mesh rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.3, 0.6, 32]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
              </mesh>
              <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
              </mesh>
            </group>

            <group position={[3, 0, 0]}>
              <mesh rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.3, 0.6, 32]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
              </mesh>
              <mesh position={[-0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
              </mesh>
            </group>
          </group>
        ) : (
          <>
            <Grid2D active={stage === "2d"} />
            <Cube3D active={stage === "3d"} />
            <Tesseract4D active={stage === "4d"} />
          </>
        )}
      </Canvas>
    </div>
  );
}
