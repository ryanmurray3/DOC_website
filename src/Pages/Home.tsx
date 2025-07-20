
import React, { useState, useEffect, useRef } from "react";
import { Event } from "@/entities/Event";
import { Testimonial } from "@/entities/Testimonial";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, ArrowRight, Play, Pause, Sparkles, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [recentTestimonials, setRecentTestimonials] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchPageData = async () => {
      const events = await Event.filter({ featured: true }, '-date', 3);
      setFeaturedEvents(events);
      const testimonials = await Testimonial.filter({ featured: true, approved: true }, '-created_date', 3);
      setRecentTestimonials(testimonials);
    };
    fetchPageData();
  }, []);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className="bg-warm-cream text-stone-800">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-black"
      >
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop')" }}></div>
        <div className="relative z-10 p-8 max-w-4xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            Welcome to Sacred Unity
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-stone-200"
          >
            A community dedicated to faith, fellowship, and service. Discover your purpose with us.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-accent-gold text-black hover:bg-yellow-500 shadow-lg">
              <Link to={createPageUrl("Donate")}>
                <Heart className="mr-2 h-5 w-5" /> Give Generously
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              <Link to={createPageUrl("Events")}>
                <Calendar className="mr-2 h-5 w-5" /> View Events
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Video Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-deep-burgundy">Experience Our Message</h2>
          <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
            Watch our latest sermon and get a glimpse into the heart of our community.
          </p>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="mt-10 aspect-video max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden relative group"
          >
            <iframe
              ref={videoRef}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/Gl6rC721ZGA?autoplay=${isVideoPlaying ? 1 : 0}&rel=0&controls=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {!isVideoPlaying && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                onClick={toggleVideo}
              >
                <div className="bg-white/30 backdrop-blur-sm p-4 rounded-full">
                  <Play className="w-16 h-16 text-white" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-burgundy">Upcoming Events</h2>
              <p className="mt-3 text-lg text-stone-600">Join us for fellowship and growth.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col bg-white/50 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <p className="text-sm font-semibold text-accent-gold">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <h3 className="mt-2 text-xl font-bold text-deep-burgundy">{event.title}</h3>
                      <p className="mt-2 text-stone-600 flex-grow">{event.description}</p>
                      <div className="mt-4">
                        <Button asChild variant="link" className="text-red-800 p-0">
                          <Link to={createPageUrl("Events")}>Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {recentTestimonials.length > 0 && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-burgundy">Voices of Our Community</h2>
            <p className="mt-3 text-lg text-stone-600">Hear what our members have to share.</p>
            <div className="mt-12 grid lg:grid-cols-3 gap-8">
              {recentTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-warm-cream border-stone-200 text-left">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-accent-gold mb-4" />
                    <p className="text-stone-700 italic">"{testimonial.content}"</p>
                    <p className="mt-4 font-bold text-deep-burgundy">{testimonial.author_name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button asChild size="lg" variant="outline" className="mt-12 text-deep-burgundy border-deep-burgundy hover:bg-deep-burgundy hover:text-white">
              <Link to={createPageUrl("Experience")}>
                <Sparkles className="mr-2 h-5 w-5" /> More Stories
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
