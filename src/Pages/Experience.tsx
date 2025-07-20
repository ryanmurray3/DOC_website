import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Testimonial } from '@/entities/Testimonial';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ChevronsDown } from 'lucide-react';

function createTextTexture(text, author, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  
  context.fillStyle = 'rgba(253, 246, 232, 0.9)'; // warm-cream
  context.fillRect(0, 0, width, height);
  
  context.fillStyle = '#6B1423'; // deep-burgundy
  context.font = '24px serif';
  context.textAlign = 'center';
  
  // Wrap text
  const words = text.split(' ');
  let line = '';
  let y = 50;
  const lineHeight = 30;
  const maxWidth = width - 40;
  
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, width/2, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, width/2, y);

  context.font = 'bold 20px sans-serif';
  context.fillStyle = '#D4AF37'; // accent-gold
  context.fillText(`- ${author}`, width/2, y + 40);

  return new THREE.CanvasTexture(canvas);
}

export default function ExperiencePage() {
  const mountRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Testimonial.filter({ approved: true }).then(data => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || !mountRef.current || testimonials.length === 0) return;

    const currentMount = mountRef.current;
    
    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x8B1538, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Testimonial Meshes
    const testimonialGroup = new THREE.Group();
    testimonials.forEach((testimonial, i) => {
      const texture = createTextTexture(`"${testimonial.content}"`, testimonial.author_name, 512, 256);
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const geometry = new THREE.PlaneGeometry(20, 10);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 100 - 50,
      );
      mesh.rotation.y = (Math.random() - 0.5) * Math.PI;
      testimonialGroup.add(mesh);
    });
    scene.add(testimonialGroup);

    // Mouse movement
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      testimonialGroup.children.forEach((child, i) => {
        child.position.y += Math.sin(elapsedTime + i) * 0.005;
        child.rotation.y += 0.0005;
      });

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if(currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [loading, testimonials]);

  return (
    <div className="relative w-full h-screen bg-deep-burgundy">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-warm-cream p-8 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Sparkles className="w-16 h-16 text-accent-gold" />
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold">The Experience</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">Move your mouse to explore the stories and reflections from our community members.</p>
        </motion.div>
        
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="w-12 h-12 animate-spin text-accent-gold" />
          </div>
        )}

        <motion.div
            className="absolute bottom-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        >
            <ChevronsDown className="w-8 h-8 text-warm-cream/50" />
        </motion.div>
      </div>
    </div>
  );
}