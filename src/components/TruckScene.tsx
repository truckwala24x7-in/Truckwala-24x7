import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Lightweight decorative WebGL scene. It is intentionally isolated from business interactions. */
export default function TruckScene() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current;
    if (!host || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(5.2, 3.2, 7.4); camera.lookAt(0, 0.4, 0);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); host.appendChild(renderer.domElement);
    const truck = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0x1779c6, metalness: 0.45, roughness: 0.38 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.5, roughness: 0.5 });
    const red = new THREE.MeshStandardMaterial({ color: 0xd32f2f, emissive: 0x330000 });
    const box = (w: number, h: number, d: number, x: number, y: number, z: number, mat = material) => { const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); mesh.position.set(x, y, z); truck.add(mesh); };
    box(3.8, 1.55, 2.1, -0.5, 1.2, 0); box(1.6, 1.4, 2.05, 2.15, 1.1, 0); box(5.3, 0.26, 1.8, 0.1, 0.3, 0, dark); box(0.1, 0.34, 1.35, 3.02, 1.25, 0, red);
    [-1.6, 1.65].forEach((x) => [-1.05, 1.05].forEach((z) => { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.34, 16), dark); wheel.rotation.x = Math.PI / 2; wheel.position.set(x, 0.38, z); truck.add(wheel); }));
    truck.rotation.y = -0.45; scene.add(truck); scene.add(new THREE.HemisphereLight(0xb9ddff, 0x080c13, 2.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.6); key.position.set(4, 7, 5); scene.add(key);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(24, 24), new THREE.MeshBasicMaterial({ color: 0x08111d, transparent: true, opacity: 0.5 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.16; scene.add(ground);
    const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    resize(); const observer = new ResizeObserver(resize); observer.observe(host); let id = 0; const start = performance.now();
    const render = (now: number) => { truck.position.y = Math.sin((now - start) / 1300) * 0.08; truck.rotation.y = -0.45 + Math.sin((now - start) / 3800) * 0.08; renderer.render(scene, camera); id = requestAnimationFrame(render); };
    id = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(id); observer.disconnect(); renderer.dispose(); host.replaceChildren(); };
  }, []);
  return <div ref={mount} aria-hidden="true" className="absolute right-0 top-0 hidden h-full w-1/2 opacity-70 lg:block" />;
}
