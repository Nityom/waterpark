import { useState, useEffect } from 'react';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

function GalleryPage() {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const images = [
        // Hero images
        '/hero-2.png', '/hero-3.jpg', '/hero-4.jpg', '/hero-5.jpg',
        // Activity and general images
        '/kids.jpg', '/picnic.jpg', '/rain_dance.jpg', '/stay.jpeg', '/waves.png', '/wedding.jpg',
        // Test images
        '/test-1.jpg', '/test-2.jpg', '/test-3.jpg', '/test-4.jpg', '/test-5.jpg', '/test.jpg',
        // Gallery folder images
        '/gallery/image-1.jpeg', '/gallery/image-2.jpeg', '/gallery/image-3.jpeg',
        '/gallery/image-4.jpeg', '/gallery/image-5.jpeg', '/gallery/image-6.png',
        '/gallery/image-7.jpeg', '/gallery/image-8.jpeg', '/gallery/image-9.jpeg',
        '/gallery/image-10.jpeg', '/gallery/image-11.jpeg'
    ];

    // Handle escape key to close lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage(e);
            if (e.key === 'ArrowLeft') prevImage(e);
        };

        if (selectedImageIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-[#DDFBFF] min-h-screen py-10 md:py-20 px-4 md:px-10">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#461AA2] mb-4">
                        Our Gallery
                    </h1>
                    <p className="text-lg text-black max-w-2xl mx-auto font-medium">
                        Take a look at all the memorable and fun moments at Waves Waterpark.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden group rounded-xl shadow-lg bg-white p-2 border-2 border-[#C5FA19] hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col h-full"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg">
                                <ImageWithSkeleton
                                    src={src}
                                    alt={`Waves Waterpark Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-[#C5FA19] z-50 p-2 transition-colors"
                        onClick={closeLightbox}
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-[#C5FA19] z-50 p-2 transition-colors"
                        onClick={prevImage}
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-[#C5FA19] z-50 p-2 transition-colors"
                        onClick={nextImage}
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={images[selectedImageIndex]}
                            alt={`Gallery view ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg select-none"
                        />
                        {/* Image Counter */}
                        <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/80 text-sm font-medium">
                            {selectedImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GalleryPage;
