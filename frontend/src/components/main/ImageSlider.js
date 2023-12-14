import React, { useState, useEffect } from 'react';

const images = [
  '/img/dogPic/dog1.png',
  '/img/dogPic/dog2.png',
  '/img/dogPic/dog3.png',
  '/img/dogPic/dog4.png',
  '/img/dogPic/dog5.png',
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const next = (current + 1) % images.length;
    const id = setTimeout(() => setCurrent(next), 3000);
    return () => clearTimeout(id);
  }, [current]);

  return (
    <div>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt=''
          style={{ display: idx === current ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
