// src/components/ThreeBackground.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        // Check if mountRef exists
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Store references for cleanup
        sceneRef.current = scene;
        rendererRef.current = renderer;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;

        const posArray = new Float32Array(particlesCount * 3);
        const colorArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
            colorArray[i] = Math.random();
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create lines
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(2000 * 3);

        for(let i = 0; i < linePositions.length; i++) {
            linePositions[i] = (Math.random() - 0.5) * 20;
        }

        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x646cff,
            transparent: true,
            opacity: 0.1
        });

        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        camera.position.z = 5;

        const mouse = {
            x: 0,
            y: 0
        };

        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (particlesMesh) {
                particlesMesh.rotation.x += 0.0005;
                particlesMesh.rotation.y += 0.0005;

                particlesMesh.position.x += mouse.x * 0.01;
                particlesMesh.position.y += mouse.y * 0.01;
            }

            if (lines) {
                lines.rotation.x += 0.0003;
                lines.rotation.y += 0.0003;
                lines.position.x = mouse.x * 0.5;
                lines.position.y = mouse.y * 0.5;
            }

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // Cleanup function
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);

            // Cancel animation frame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            // Safely remove renderer from DOM
            if (mountRef.current && renderer.domElement) {
                try {
                    mountRef.current.removeChild(renderer.domElement);
                } catch (error) {
                    console.log('Cleanup: DOM element already removed');
                }
            }

            // Dispose of Three.js resources
            if (renderer) {
                renderer.dispose();
            }

            if (particlesGeometry) {
                particlesGeometry.dispose();
            }

            if (particlesMaterial) {
                particlesMaterial.dispose();
            }

            if (lineGeometry) {
                lineGeometry.dispose();
            }

            if (lineMaterial) {
                lineMaterial.dispose();
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ThreeBackground;