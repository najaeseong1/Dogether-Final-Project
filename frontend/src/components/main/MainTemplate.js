import React, { useEffect, useState } from 'react';
import './MainTemplate.scss';
import ImageSlider from './ImageSlider';

const MainTemplate = () => {
  const [popupVisible, setPopupVisible] = useState(() => {
    const dontShowToday = localStorage.getItem('dontShowToday');
    if (dontShowToday) {
      const date = new Date();
      if (date.toISOString().slice(0, 10) === dontShowToday) {
        return false;
      }
    }
    return true;
  });

  const onClose = () => {
    setPopupVisible(false);
  };

  const onCloseToday = () => {
    const date = new Date();
    localStorage.setItem('dontShowToday', date.toISOString().slice(0, 10));
    setPopupVisible(false);
  };

  return (
    <>
      {popupVisible && (
        <div className='popup'>
          <img src='/img/guide.png' alt='guide' />
          <div className='button-group'>
            <button onClick={onCloseToday}>하루동안 보이지 않기</button>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      )}
      <div className='wrap'>
        <div className='content-1'>
          <div className=''>
            <ImageSlider />
          </div>
        </div>
        <div className='content-2'>
          <div>
            Since 2023 “Dogether”은 대한민국에서 반려견과 가장 오래 함께 하고
            있습니다.
          </div>
        </div>
        <div className='content-3'>
          <div> 자세히보기</div>
          <div>
            강아지 사진 들어갈곳
            <div>강아지 사진</div>
          </div>
        </div>
        <div className='content-4'>
          <div>
            Review
            <div>자세히보기</div>
            <div></div>
          </div>
          <div>
            자유 뻘글 갤러리
            <div>자세히보기</div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTemplate;
