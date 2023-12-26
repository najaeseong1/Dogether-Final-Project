import React, { useState, useEffect } from 'react';
import './MainTemplate.scss';
import ImageSlider from './ImageSlider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

// 모달창 설정
const Modal = ({ children, visible, onClose }) => {
  if (!visible) return null;

  return (
    <div
      className='modal-overlay'
      onClick={onClose}
    >
      <div
        className='modal-content'
        onClick={(e) => e.stopPropagation()}
      >
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

  // 상태 변수 선언
  // 입양게시글 데이터
  const [adoptList, setAdoptList] = useState([
    {
      desertionNo: 1,
      breed: '펫종',
      sex: '성별',
      age: 12,
      profileImg: '/img/dogPic/dog1.png',
    },
  ]);
  // 후기게시글 데이터
  const [reviewList, setReviewList] = useState([
    {
      boardNo: 1,
      regDate: '2023.05.28',
      imgage: '/img/dogPic/dog1.png',
    },
  ]);
  // 자유게시글 데이터
  const [boardList, setBoardList] = useState([
    {
      boardNo: 1,
      category: '분양후기',
      title: '분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요',
      regDate: '2023.05.28',
    },
  ]);

  useEffect(() => {
    // '/adopt' 요청
    axios
      .get('http://localhost:8181/adopt')
      .then((res) => {
        console.log('adopt 요청', res);
        setAdoptList(res.data.adoptLists.slice(0, 8));
      })
      .catch((err) => {
        console.error(err);
      });

    // '/board' 요청
    // axios
    //   .get('http://localhost:8181/board')
    //   .then((res) => {
    //     console.log('board 요청', res);
    //     const reviewData = res.data.boardList.filter(
    //       (item) => item.category === '후기'
    //     );
    //     setBoardList(res.data.reviewLists.slice(0, 5));
    //     const boardData = res.data.reviewList.filter(
    //       (item) => item.category === '자유'
    //     );
    //     setBoardList(res.data.boardLists.slice(0, 5));
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, []);

  console.log('입양리스트 : axios 후에', adoptList);
  console.log(reviewList);
  console.log(boardList);

  // 각 리스트의 처음 8개 또는 5개 항목만 선택
  const limitedAdoptList = adoptList.slice(0, 8);
  const limitedReviewList = reviewList.slice(0, 5);
  const limitedBoardList = boardList.slice(0, 5);

  return (
    <div className='mainWrapper'>
      <Modal
        visible={popupVisible}
        onClose={onClose}
      >
        <div className='popup'>
          <img
            src='/img/guide.png'
            alt='guide'
          />
          <div className='button-group'>
            <button onClick={onCloseToday}>하루동안 보이지 않기</button>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
      </Modal>
      <Grid
        container
        direction='column'
        className='wrap'
      >
        <Grid
          item
          className='content-1'
        >
          <ImageSlider />
        </Grid>
        <Grid
          item
          className='content-2'
        >
          <Grid
            item
            className='title-2-1'
          >
            Since 2023 <div>“Dogether”</div>대한민국에서 반려견과 함께 하고
            있습니다.
          </Grid>
        </Grid>
        <Grid
          item
          className='content-3'
        >
          <Grid className='title-3-1'>
            <span>입양게시판</span>
            <Link
              to='/adoptlist'
              className='readMore'
            >
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
              {limitedAdoptList.map((adoptList, index) => (
                <Grid
                  item
                  className='image'
                  key={index}
                >
                  <Link to={`/adopt/detail/${adoptList.desertionNo}`}>
                    <img
                      src={adoptList.profileImg}
                      alt='분양게시판 강아지사진'
                    />
                    <div className='category'>
                      {adoptList.kindCd}
                      {adoptList.gender === 'M' ? '수컷' : '암컷'}
                      {adoptList.age}
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className='content-4'
        >
          <Grid
            container
            direction='row'
            spacing={{ xs: 6 }}
          >
            <Grid
              item
              md={6}
              xs={12}
              className='title-4-1 left'
            >
              <span>Review</span>
              <Link
                to='/board'
                className='readMore'
              >
                자세히보기
              </Link>
              <hr />
              <div className='reviewList'>
                {limitedReviewList.map((reviewList, index) => (
                  <Grid
                    item
                    className='image'
                    key={index}
                  >
                    <Link to={`/board/${reviewList.boardNo}`}>
                      <img
                        src={reviewList.imgage}
                        alt='강아지후기사진'
                      />
                      <div className='category'>
                        후기 게시글 {reviewList.title} {reviewList.regDate}
                      </div>
                    </Link>
                  </Grid>
                ))}
              </div>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className='title-4-1 right'
            >
              <span>Gallery</span>
              <Link
                to='/board'
                className='readMore'
              >
                자세히보기
              </Link>
              <hr />
              <div className='boardList'>
                {limitedBoardList.map((boardList, index) => (
                  <Grid
                    item
                    xs={12}
                    key={index}
                  >
                    <Link to={`/board/${boardList.boardNo}`}>
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
