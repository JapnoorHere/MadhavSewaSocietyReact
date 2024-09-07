import React, { useState, useEffect } from "react";

const ImageData = [
  {
    
    imageName: "mountains",
    imageSrc: "https://picsum.photos/id/1018/1000/600/",
  },
  {
    
    imageName: "img_nature",
    imageSrc: "https://picsum.photos/id/1015/1000/600/",
  },
  {
    
    imageName: "img_snow",
    imageSrc: "https://picsum.photos/id/1019/1000/600/",
  },
  {
    
    imageName: "img_band_ny",
    imageSrc: "https://picsum.photos/id/1025/1000/600/",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageData.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen overflow-hidden">
      <div
        className="flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ImageData.map((image, index) => (
          <div key={index} className="w-screen h-[80vh] flex-shrink-0">
            <img
              src={image.imageSrc}
              alt={image.imageName}
              className="w-screen object-cover min-h-[60vh]"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ImageData.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
