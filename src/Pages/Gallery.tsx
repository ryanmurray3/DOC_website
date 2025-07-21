import React, { useState, useEffect } from "react";
// Import both type and value if needed, or just the value if GalleryItem is a class/object
import { GalleryService } from "@/Entities/Gallery";
import { GalleryItem } from "@/Entities/Gallery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog";
import { motion } from "framer-motion";
import { Tag, Loader2, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import Header from "@/components/ui/Header";


const galleryCategories = ["all", "worship", "community", "outreach", "facilities", "special"];

export default function GalleryPage() {
  const [media, setMedia] = useState<GalleryItem[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<GalleryItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const allMedia = await GalleryService.list();
      setMedia(allMedia);
      setFilteredMedia(allMedia);
      setLoading(false);
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredMedia(media);
    } else {
      setFilteredMedia(media.filter(item => item.category === category));
    }
  }, [category, media]);

  return (
    <>
      <Header />
    <div className="bg-warm-cream min-h-screen">
      <header className="bg-deep-burgundy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold">
            Moments & Memories
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-lg text-stone-200 max-w-3xl mx-auto">
            A collection of photos and videos capturing the spirit of our community.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-stone-500" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue>Filter by category</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {galleryCategories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-deep-burgundy animate-spin" />
          </div>
        ) : filteredMedia.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredMedia.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedMedia(item)}
                className="aspect-square bg-stone-200 rounded-lg overflow-hidden cursor-pointer group relative"
              >
                <img src={item.media_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="font-bold text-sm truncate">{item.title}</h3>
                  {item.media_type === 'image' ? <ImageIcon className="w-4 h-4 mt-1" /> : <VideoIcon className="w-4 h-4 mt-1" />}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-deep-burgundy">No Media Found</h3>
            <p className="mt-2 text-stone-600">There is no media matching your criteria. Please check back later!</p>
          </div>
        )}
      </main>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl">
          {selectedMedia && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMedia.title}</DialogTitle>
                <DialogDescription>{selectedMedia.description}</DialogDescription>
              </DialogHeader>
              {selectedMedia.media_type === 'image' ? (
                <img src={selectedMedia.media_url} alt={selectedMedia.title} className="w-full h-auto object-contain rounded-md mt-4" />
              ) : (
                <div className="aspect-video mt-4">
                  <iframe
                    className="w-full h-full rounded-md"
                    src={selectedMedia.media_url.replace("watch?v=", "embed/")} // Basic URL conversion for embed
                    title={selectedMedia.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  </>
  );
}