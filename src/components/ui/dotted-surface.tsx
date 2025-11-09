'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    animationId: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Grid config
    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
    camera.position.set(0, 355, 1220);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.appendChild(renderer.domElement);

    // Geometry (positions + vertex colors)
    const positions: number[] = [];
    const colors: number[] = [];

    // Normalized color (0–1). Brighter in dark theme, darker in light theme.
    const c = theme === 'dark' ? 0.92 : 0.08;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);
        colors.push(c, c, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 12, // a touch larger for visibility
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false, // avoids odd blending with overlays
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Size to container
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    // First size
    resize();

    // Observe container size changes (more reliable than window resize alone)
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    const onWinResize = () => resize();
    window.addEventListener('resize', onWinResize);

    // Animation
    let count = 0;
    let animationId = 0;

    const animate = () => {
      // Wave on Y
      const positionAttr = geometry.attributes.position;
      const pos = positionAttr.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const idx = i * 3;
          pos[idx + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.1;

      animationId = requestAnimationFrame(animate);
    };

    // Kick off loop
    animationId = requestAnimationFrame(animate);

    // Store refs (animationId is initialized to 0 above to satisfy TS)
    sceneRef.current = {
      scene,
      camera,
      renderer,
      points,
      animationId,
      count,
    };

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWinResize);
      ro.disconnect();

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        sceneRef.current.scene.traverse((obj) => {
          if (obj instanceof THREE.Points) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });

        sceneRef.current.renderer.dispose();

        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      // Use z-0 by default (negative z utilities often fail across browsers).
      // Layer it behind content by giving foreground content a higher z-index.
      className={cn('pointer-events-none fixed inset-0 z-0', className)}
      {...props}
    />
  );
}
