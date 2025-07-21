import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TestimonialType, TestimonialService } from "@/Entities/Testimonial";
import { motion } from 'framer-motion';
import { Sparkles, Loader2, ChevronsDown } from 'lucide-react';
import Header from "@/components/ui/Header";


interface CreateTextTextureOptions {
  text: string;
  author: string;
  width: number;
  height: number;
}

function createTextTexture(
  text: string,
  author: string,
  width: number,
  height: number
): THREE.Texture {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  const scale = window.devicePixelRatio || 1;
  if (!context) {
    // Return a blank texture if context is null
    return new THREE.CanvasTexture(canvas);
  }
  context.scale(scale, scale);
  // canvas.width = width * scale;
  // canvas.height = height * scale;

  
  context.fillStyle = 'rgba(250, 171, 12, 0.02)'; // warm-cream
  context.fillRect(0, 0, width, height);
  
  context.fillStyle = '#000000ff'; // deep-burgundy
  context.font = '48px serif';
  context.textAlign = 'center';
  context.shadowOffsetY = 2;
  context.shadowColor = 'rgba(255, 255, 255, 1)';
  context.fillText(text, width / 2, height / 3); // center
  
  
  
  // Wrap text
  const words: string[] = text.split(' ');
  let line = '';
  let y = height / 3; // start drawing roughly 1/3 from the top
  const lineHeight = -60;
  const maxWidth = width * 0.9; // 90% of canvas width for margin
  
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      context.fillText(line, width / 2, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
// Draw remaining line
context.fillText(line.trim(), width / 2, y);

  context.font = 'bold 36px sans-serif';
  context.fillStyle = 'rgba(250, 171, 12, 0.02)'; // accent-gold
  context.fillText(`- ${author}`, width/2, y + 40);

  // context.strokeStyle = 'blue';
  // context.lineWidth = 10;
  // context.strokeRect(0, 0, width, height);

  return new THREE.CanvasTexture(canvas);
}

export default function ExperiencePage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);

  //uncomment to fetch testimonials when real data is available
  // useEffect(() => {
  //  const fetchTestimonials = async () => {
  //     setLoading(true);
  //     const data = await TestimonialService.list();
  //     setTestimonials(data);
  //     setLoading(false);
  //   };

  //   fetchTestimonials();
  // }, []);

  useEffect(() => {
  const fakeTestimonials: TestimonialType[] = [
    {
      id: '1',
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author_name: "John Doe",
      role: "Member",
      featured: true,
      approved: true,
    },
    {
      id: '2',
      content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
      author_name: "Jane Smith",
      role: "Volunteer",
      featured: true,
      approved: true,
    },
    {
      id: '3',
      content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
      author_name: "Father Julian",
      role: "Founder",
      featured: true,
      approved: true,
    },
  ];

  setLoading(false);
  setTestimonials(fakeTestimonials);
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
      const texture = createTextTexture(`"${testimonial.content}"`, testimonial.author_name, 3840, 1920);// adjust size as needed
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const geometry = new THREE.PlaneGeometry(70, 35);
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
    interface MouseMoveEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (event: MouseMoveEvent): void => {
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
    <>
      <Header />
      <div className="bg-warm-cream text-stone-800 dark:bg-zinc-900 dark:text-white">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-screen overflow-hidden"
        >
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
        </motion.section>
      </div>
    {/* <div className="relative w-full h-screen bg-deep-burgundy">
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
    </div> */}
    </>
  );
}