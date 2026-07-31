"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GalleryImage } from "@/types";

// EDIT: Add your photos to public/images/ and list them here
const DEFAULT_IMAGES: GalleryImage[] = [
  { src: "/images/photo1.jpg", alt: "Our memory" },
  { src: "/images/photo2.jpg", alt: "Our memory" },
  { src: "/images/photo3.jpg", alt: "Our memory" },
  { src: "/images/photo4.jpg", alt: "Our memory" },
  { src: "/images/photo5.jpg", alt: "Our memory" },
  { src: "/images/photo6.jpg", alt: "Our memory" },
];

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Try to load images dynamically from public/images
    const loadImages = async () => {
      const foundImages: GalleryImage[] = [];

      // Check for images 1-20
      for (let i = 1; i <= 20; i++) {
        try {
          const response = await fetch(`/images/photo${i}.jpg`, { method: "HEAD" });
          if (response.ok) {
            foundImages.push({ src: `/images/photo${i}.jpg`, alt: `Our memory ${i}` });
          }
        } catch {
          // Image doesn't exist, skip
        }
      }

      // Also check for common extensions
      const extensions = [".png", ".jpeg", ".webp"];
      for (let i = 1; i <= 20; i++) {
        for (const ext of extensions) {
          try {
            const response = await fetch(`/images/photo${i}${ext}`, { method: "HEAD" });
            if (response.ok) {
              foundImages.push({ src: `/images/photo${i}${ext}`, alt: `Our memory ${i}` });
            }
          } catch {
            // Skip
          }
        }
      }

      setImages(foundImages.length > 0 ? foundImages : DEFAULT_IMAGES);
    };

    loadImages();
  }, []);

  const handleImageLoad = (src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
  };

  const navigate = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (direction === "prev") {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    } else {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100 mb-3">
              Our Memories
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Moments that make me smile
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <ScrollReveal key={image.src} delay={index * 0.1}>
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-rose-50 dark:bg-slate-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    loadedImages.has(image.src) ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleImageLoad(image.src)}
                  loading="lazy"
                />
                {!loadedImages.has(image.src) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty state */}
        {images.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 dark:text-slate-500">
              Add your photos to <code className="bg-rose-50 dark:bg-slate-800 px-2 py-1 rounded text-sm">public/images/</code> to see them here
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <motion.button
                  className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("prev");
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("next");
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Image */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedIndex]?.src}
                alt={images[selectedIndex]?.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
