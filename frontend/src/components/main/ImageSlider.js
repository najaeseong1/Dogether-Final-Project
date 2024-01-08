import React, { useState, useEffect } from 'react';
import styles from './ImageSlider.module.scss';
import { useNavigate } from 'react-router-dom';

const images = [
  '/img/dogPic/dog1.png',
  '/img/dogPic/dog2.png',
  '/img/dogPic/dog3.png',
  '/img/dogPic/dog4.png',
];

const arrowImg = '/img/arrow.png';

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const next = (current + 1) % images.length;
    const id = setTimeout(() => setCurrent(next), 4000);
    return () => clearTimeout(id);
  }, [current]);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };

  return (
    <div className={styles['title-1-1']}>
      <div
        className={`${styles.arrow} ${styles.left}`}
        onClick={prevSlide}
      >
        <img
          src={arrowImg}
          alt='왼쪽 화살표'
          className={styles.arrowImg}
        />
      </div>
      {images.map((img, idx) => (
        <div
          key={idx} // key 속성 추가
          className={`${styles.slider} ${
            idx === current ? styles['slide-in'] : styles['slide-out']
          }`}
          onClick={() => toLink('/knowledges/quiz')}
        >
          <img
            key={idx}
            src={img}
            alt=''
            className={styles.sliderImg}
          />
        </div>
      ))}
      <div
        className={`${styles.arrow} ${styles.right}`}
        onClick={nextSlide}
      >
        <img
          src={arrowImg}
          alt='오른쪽 화살표'
          className={`${styles.arrowImg} ${styles.arrowRight}`}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
