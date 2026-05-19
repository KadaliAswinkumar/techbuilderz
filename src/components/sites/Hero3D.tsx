import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current!;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = el.clientWidth;
    const h = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    const detail = isMobile ? 2 : 4;
    const geo = new THREE.IcosahedronGeometry(isMobile ? 1.65 : 2, detail);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x6b5cff,
      wireframe: true,
      emissive: 0x4b3cff,
      emissiveIntensity: 0.6,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const pCount = isMobile ? 500 : 1200;
    const pGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 4 + Math.random() * 8;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      pos[i * 3 + 2] = r * Math.cos(p);
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x9bd8ff,
      size: isMobile ? 0.02 : 0.03,
      transparent: true,
      opacity: 0.8,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const l1 = new THREE.PointLight(0x6b5cff, 2, 30);
    l1.position.set(5, 5, 5);
    scene.add(l1);
    const l2 = new THREE.PointLight(0x00e5ff, 2, 30);
    l2.position.set(-5, -3, 4);
    scene.add(l2);

    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener("mousemove", onMove);

    const orig = (geo.attributes.position.array as Float32Array).slice();
    let raf = 0;
    const start = performance.now();

    const animate = () => {
      const t = (performance.now() - start) / 1000;
      if (!prefersReducedMotion) {
        const arr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          const x = orig[i];
          const y = orig[i + 1];
          const z = orig[i + 2];
          const n = Math.sin(t * 1.2 + x * 1.5) * 0.15 + Math.cos(t + y * 1.5) * 0.15;
          const s = 1 + n;
          arr[i] = x * s;
          arr[i + 1] = y * s;
          arr[i + 2] = z * s;
        }
        geo.attributes.position.needsUpdate = true;
      }

      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.001;
      if (!isMobile) mesh.rotation.y += mx * 0.002;
      points.rotation.y += 0.0008;

      if (!isMobile) {
        camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
        camera.position.y += (-my * 0.5 - camera.position.y) * 0.04;
      }
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      pGeo.dispose();
      pMat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="absolute inset-0" />;
}
