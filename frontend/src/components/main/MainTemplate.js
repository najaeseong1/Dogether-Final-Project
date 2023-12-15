import React, { useEffect, useState } from 'react';
import './MainTemplate.scss';
import ImageSlider from './ImageSlider';
import { Link } from 'react-router-dom';

const Modal = ({ children, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

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
      <Modal visible={popupVisible} onClose={onClose}>
        <div className='popup'>
          <img src='/img/guide.png' alt='guide' />
          <div className='button-group'>
            <button onClick={onCloseToday}>하루동안 보이지 않기</button>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </Modal>
      <div className='wrap'>
        <div className='content-1'>
          <ImageSlider />
        </div>
        <div className='content-2'>
          <div className='title-2-1'>
            Since 2023 <div>“Dogether”</div>대한민국에서 반려견과 함께 하고
            있습니다.
          </div>
        </div>
        <div className='content-3'>
          <div className='title-3-1'>
            <div>
              <span>입양게시판</span>
              <Link to='/adoptlist' className='readMore'>
                {' '}
                자세히보기
              </Link>
            </div>
            <hr />
            <div className='adoptList'>
              <Link to='/adoptlist/{}'>
                <div className='image'>
                  <img src='/img/dogPic/dog1.png' />
                  <div className='category'>~보호소</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className='content-4'>
          <div className='title-4-1 left'>
            <div>
              <span>Review</span>
              <Link to='/board' className='readMore'>
                {' '}
                자세히보기
              </Link>
            </div>
            <hr />
            {/* reviewList 리뷰 3개 넘게 쌓이면 안됨 */}
            <div className='reviewList'>
              <Link to='/board/{}'>
                <div className='image'>
                  <img src='/img/dogPic/dog1.png' />
                  <div className='category'>분양후기</div>
                </div>
              </Link>
            </div>
          </div>
          <div className='title-4-1 right'>
            <span>Gallery</span>
            <Link to='/board' className='readMore'>
              {' '}
              자세히보기
            </Link>
            <hr />
            {/* 분양 후기 3~4개 까지 */}
            <div className='boardList'>
              <Link to='/board/{}'>
                <div className='category'>분양후기</div>
                <div className='title'>
                  분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요
                </div>
                <div className='regDate'> 2023.05.28</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainTemplate;
