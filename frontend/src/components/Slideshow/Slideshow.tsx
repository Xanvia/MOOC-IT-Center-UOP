import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Slide {
  id: number;
  title: string;
  description: string;
  bgColor: string;
  image: string;
  buttonText: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Learn Without Limits",
    description: "Build skills with courses, certificates, and degrees online from world-class universities and companies.",
    bgColor: "from-blue-200/90",
    image: "/images/slide03.jpg",
    buttonText: "Explore Courses"
  },
  {
    id: 2,
    title: "Master New Skills",
    description: "Choose from over 1000 online video courses with new additions published every month.",
    bgColor: "from-indigo-200/90",
    image: "/images/slide02.jpg",
    buttonText: "Start Learning"
  },
  {
    id: 3,
    title: "Learn From Experts",
    description: "Select from top instructors around the world. Learn at your own pace with lifetime access on mobile and desktop.",
    bgColor: "from-sky-200/90",
    image: "/images/slide06.jpg",
    buttonText: "Meet Instructors"
  }
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  return (
    <div 
      className="relative w-full h-[400px] bg-blue-800 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out transform 
              ${index === currentSlide 
                ? 'translate-x-0 opacity-100' 
                : index < currentSlide 
                  ? '-translate-x-full opacity-0' 
                  : 'translate-x-full opacity-0'
              }`}
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} to-transparent z-10`} />
              <Image
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center p-20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-primary space-y-6">
                  <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg sm:text-xl opacity-90">
                    {slide.description}
                  </p>
                  <a 
                    href="#popular-courses"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors group"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors group"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-0 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
              ${index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/60 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;