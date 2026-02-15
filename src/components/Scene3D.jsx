// src/components/Scene3D.jsx - Interactive "NA" 3D Scene
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    Text3D,
    Float,
    MeshTransmissionMaterial,
    Center,
    Environment,
    Sparkles,
    OrbitControls,
    MeshDistortMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// Get theme from document
const getTheme = () => {
    if (typeof document !== 'undefined') {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
};

// Interactive "N" Letter
function LetterN({ position, mousePosition }) {
    const meshRef = useRef();
    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(getTheme());
        });

        if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme'],
            });
        }

        return () => observer.disconnect();
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Respond to mouse movement
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                mousePosition.x * 0.5,
                0.1
            );
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                -mousePosition.y * 0.3,
                0.1
            );

            // Add subtle floating animation
            meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
        }
    });

    const color = '#8b5cf6';
    const emissiveColor = '#a78bfa';

    return (
        <Float
            speed={2}
            rotationIntensity={0.3}
            floatIntensity={0.3}
        >
            <group ref={meshRef} position={position}>
                <Center>
                    <Text3D
                        font="/fonts/Inter_Bold.json"
                        size={1.5}
                        height={0.3}
                        curveSegments={32}
                        bevelEnabled
                        bevelThickness={0.05}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={8}
                    >
                        N
                        <MeshTransmissionMaterial
                            backside
                            samples={4}
                            thickness={0.5}
                            chromaticAberration={0.5}
                            anisotropy={1}
                            distortion={0.3}
                            distortionScale={0.2}
                            temporalDistortion={0.1}
                            color={color}
                            emissive={emissiveColor}
                            emissiveIntensity={0.3}
                        />
                    </Text3D>
                </Center>

                {/* Glow effect */}
                <Center>
                    <Text3D
                        font="/fonts/Inter_Bold.json"
                        size={1.52}
                        height={0.32}
                        curveSegments={16}
                    >
                        N
                        <meshBasicMaterial
                            color={emissiveColor}
                            transparent
                            opacity={0.15}
                        />
                    </Text3D>
                </Center>
            </group>
        </Float>
    );
}

// Interactive "A" Letter
function LetterA({ position, mousePosition }) {
    const meshRef = useRef();
    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(getTheme());
        });

        if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme'],
            });
        }

        return () => observer.disconnect();
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Respond to mouse movement (opposite direction for variety)
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                -mousePosition.x * 0.5,
                0.1
            );
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                mousePosition.y * 0.3,
                0.1
            );

            // Add subtle floating animation (offset from N)
            meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + Math.PI) * 0.1;
        }
    });

    const color = '#ec4899';
    const emissiveColor = '#f472b6';

    return (
        <Float
            speed={2}
            rotationIntensity={0.3}
            floatIntensity={0.3}
        >
            <group ref={meshRef} position={position}>
                <Center>
                    <Text3D
                        font="/fonts/Inter_Bold.json"
                        size={1.5}
                        height={0.3}
                        curveSegments={32}
                        bevelEnabled
                        bevelThickness={0.05}
                        bevelSize={0.02}
                        bevelOffset={0}
                        bevelSegments={8}
                    >
                        A
                        <MeshTransmissionMaterial
                            backside
                            samples={4}
                            thickness={0.5}
                            chromaticAberration={0.5}
                            anisotropy={1}
                            distortion={0.3}
                            distortionScale={0.2}
                            temporalDistortion={0.1}
                            color={color}
                            emissive={emissiveColor}
                            emissiveIntensity={0.3}
                        />
                    </Text3D>
                </Center>

                {/* Glow effect */}
                <Center>
                    <Text3D
                        font="/fonts/Inter_Bold.json"
                        size={1.52}
                        height={0.32}
                        curveSegments={16}
                    >
                        A
                        <meshBasicMaterial
                            color={emissiveColor}
                            transparent
                            opacity={0.15}
                        />
                    </Text3D>
                </Center>
            </group>
        </Float>
    );
}

// Orbiting particles around letters
function OrbitingParticles({ count = 100 }) {
    const particlesRef = useRef();

    const particlesData = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Create orbital paths
            const angle = (i / count) * Math.PI * 2;
            const radius = 3 + Math.random() * 2;
            const height = (Math.random() - 0.5) * 4;

            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            // Purple, pink, cyan for dark mode
            if (i % 3 === 0) {
                colors[i * 3] = 0.55;
                colors[i * 3 + 1] = 0.36;
                colors[i * 3 + 2] = 0.96;
            } else if (i % 3 === 1) {
                colors[i * 3] = 0.93;
                colors[i * 3 + 1] = 0.29;
                colors[i * 3 + 2] = 0.6;
            } else {
                colors[i * 3] = 0.02;
                colors[i * 3 + 1] = 0.71;
                colors[i * 3 + 2] = 0.83;
            }

            sizes[i] = Math.random() * 0.04 + 0.01;
        }

        return { positions, colors, sizes };
    }, [count]);

    useFrame((state) => {
        if (particlesRef.current) {
            const time = state.clock.getElapsedTime();
            particlesRef.current.rotation.y = time * 0.1;
            particlesRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesData.positions.length / 3}
                    array={particlesData.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particlesData.colors.length / 3}
                    array={particlesData.colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={particlesData.sizes.length}
                    array={particlesData.sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// Background geometric grid
function BackgroundGrid() {
    const gridRef = useRef();

    useFrame((state) => {
        if (gridRef.current) {
            const time = state.clock.getElapsedTime();
            gridRef.current.rotation.z = time * 0.02;
        }
    });

    const gridColor = '#8b5cf6';

    return (
        <group ref={gridRef} position={[0, 0, -5]}>
            <gridHelper
                args={[20, 20, gridColor, gridColor]}
                rotation={[Math.PI / 2, 0, 0]}
                material-opacity={0.1}
                material-transparent
            />
        </group>
    );
}

// Floating rings around the scene
function FloatingRings() {
    const ring1 = useRef();
    const ring2 = useRef();
    const ring3 = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (ring1.current) {
            ring1.current.rotation.x = time * 0.2;
            ring1.current.rotation.y = time * 0.15;
        }
        if (ring2.current) {
            ring2.current.rotation.x = -time * 0.15;
            ring2.current.rotation.z = time * 0.2;
        }
        if (ring3.current) {
            ring3.current.rotation.y = time * 0.25;
            ring3.current.rotation.z = -time * 0.1;
        }
    });

    return (
        <group>
            <mesh ref={ring1}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#a78bfa"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3.5, 0.015, 16, 100]} />
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#f472b6"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.25}
                />
            </mesh>

            <mesh ref={ring3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <torusGeometry args={[4, 0.01, 16, 100]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#22d3ee"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </group>
    );
}

// Mouse tracking component
function MouseTracker({ onMouseMove }) {
    const { viewport } = useThree();

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            onMouseMove({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [onMouseMove]);

    return null;
}

// Lighting setup
function SceneLights() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1.2}
                color="#a78bfa"
            />
            <pointLight
                position={[-5, -5, -5]}
                intensity={0.8}
                color="#ec4899"
            />
            <pointLight
                position={[5, -5, 5]}
                intensity={0.5}
                color="#06b6d4"
            />
            <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={0.5}
                color="#8b5cf6"
            />
        </>
    );
}

// Main Scene Component
const Scene3D = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(getTheme());
        });

        if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme'],
            });
        }

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (pos) => {
        setMousePosition(pos);
    };

    // Only render in dark mode
    if (theme !== 'dark') {
        return null;
    }

    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            }}
        >
            {/* Mouse tracking */}
            <MouseTracker onMouseMove={handleMouseMove} />

            {/* Lighting */}
            <SceneLights />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Background grid */}
            <BackgroundGrid />

            {/* Floating rings */}
            <FloatingRings />

            {/* Main letters - "N" and "A" */}
            <LetterN position={[-1.2, 0, 0]} mousePosition={mousePosition} />
            <LetterA position={[1.2, 0, 0]} mousePosition={mousePosition} />

            {/* Orbiting particles */}
            <OrbitingParticles count={120} />

            {/* Sparkles for magic */}
            <Sparkles
                count={60}
                scale={12}
                size={2.5}
                speed={0.4}
                opacity={0.5}
                color="#ffffff"
            />

            {/* Fog for depth */}
            <fog attach="fog" args={['#000000', 6, 20]} />

        </Canvas>
    );
};

export default Scene3D;