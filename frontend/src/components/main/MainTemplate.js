import React, { useState } from 'react';
import './MainTemplate.scss';
import ImageSlider from './ImageSlider';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

// 모달창 설정
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

  // 게시글 데이터
  const boardList = [
    /* 게시글 데이터 배열 */
    {
      no: 1,
      category: '분양후기',
      title: '분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요',
      regDate: '2023.05.28',
    },
    {
      no: 1,
      category: '분양후기',
      title: '분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요',
      regDate: '2023.05.28',
    },
    {
      no: 1,
      category: '분양후기',
      title: '분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요',
      regDate: '2023.05.28',
    },
    {
      no: 1,
      category: '분양후기',
      title: '분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요',
      regDate: '2023.05.28',
    },
  ];

  // 처음 5개의 게시글만 선택
  const limitedBoardList = boardList.slice(0, 5);

  return (
    <div className='mainWrapper'>
      <Modal visible={popupVisible} onClose={onClose}>
        <div className='popup'>
          <img src='/img/guide.png' alt='guide' />
          <div className='button-group'>
            <button onClick={onCloseToday}>하루동안 보이지 않기</button>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </Modal>
      <Grid container direction='column' className='wrap'>
        <Grid item className='content-1'>
          <ImageSlider />
        </Grid>
        <Grid item className='content-2'>
          <Grid item className='title-2-1'>
            Since 2023 <div>“Dogether”</div>대한민국에서 반려견과 함께 하고
            있습니다.
          </Grid>
        </Grid>
        <Grid item className='content-3'>
          <Grid className='title-3-1'>
            <span>입양게시판</span>
            <Link to='/adoptlist' className='readMore'>
              자세히보기
            </Link>
            <hr />
            <Grid
              container
              spacing={1}
              columns={{ xs: 4, md: 12 }}
              direction='row'
              className='adoptList'
            >
              {/* 모바일에서 4개 까지 */}
              {/* 모바일에서 2열로 보이도록 설정 */}
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
              <Grid item className='image'>
                <Link to='/adoptlist/{}'>
                  <img src='/img/dogPic/dog1.png' alt='dogPic' />
                </Link>
                <div className='category'>~보호소</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item className='content-4'>
          <Grid container direction='row' spacing={{ xs: 6 }}>
            <Grid item md={6} xs={12} className='title-4-1 left'>
              <span>Review</span>
              <Link to='/board' className='readMore'>
                자세히보기
              </Link>
              <hr />
              <div className='reviewList'>
                <Grid item className='image'>
                  <Link to='/adoptlist/{}'>
                    <img src='/img/dogPic/dog1.png ' alt='dogPic' />
                  </Link>
                  <div className='category'>분양후기</div>
                </Grid>
                <Grid item className='image'>
                  <Link to='/adoptlist/{}'>
                    <img src='/img/dogPic/dog1.png ' alt='dogPic' />
                  </Link>
                  <div className='category'>분양후기</div>
                </Grid>
                <Grid item className='image'>
                  <Link to='/adoptlist/{}'>
                    <img src='/img/dogPic/dog1.png ' alt='dogPic' />
                  </Link>
                  <div className='category'>분양후기</div>
                </Grid>
                <Grid item className='image'>
                  <Link to='/adoptlist/{}'>
                    <img src='/img/dogPic/dog1.png ' alt='dogPic' />
                  </Link>
                  <div className='category'>분양후기</div>
                </Grid>
              </div>
            </Grid>

            <Grid item md={6} xs={12} className='title-4-1 right'>
              <span>Gallery</span>
              <Link to='/board' className='readMore'>
                자세히보기
              </Link>
              <hr />
              <div className='boardList'>
                {limitedBoardList.map((boardList, index) => (
                  <Grid item xs={12} key={index} direction='column'>
                    <Link to={`/board/${boardList.no}`}>
                      <div className='category'>{boardList.category}</div>
                      <div className='title'>{boardList.title}</div>
                      <div className='regDate'>{boardList.regDate}</div>
                    </Link>
                  </Grid>
                ))}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainTemplate;
