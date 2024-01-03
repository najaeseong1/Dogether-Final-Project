import React, { useState, useEffect } from 'react';
import './MainTemplate.scss';
import ImageSlider from './ImageSlider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { API_BASE_URL, ADOPT, BOARD } from '../../global/config/host-config';
import LoadingPink from '../../global/LoadingPink';

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
      imgage: '/img/dogPic/dog1.png',
      registDate: '2023.05.28',
    },
  ]);
  // 자유게시글 데이터
  const [boardList, setBoardList] = useState([
    {
      boardNo: 1,
      category: '분양후기',
      title: '분양 받았어요~ 진짜 우리 강아지가 얼마나 이쁘냐면요',
      registDate: '2023.05.28',
    },
  ]);
  // 로딩 상태 변수를 추가합니다.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // 데이터를 가져오기 전에 로딩 상태를 true로 설정
    // '/adopt' 요청
    axios
      .get(`${API_BASE_URL}${ADOPT}`)
      .then((res) => {
        setAdoptList(res.data.adoptLists.slice(0, 8));
        setLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // 데이터를 가져온 후 로딩 상태를 false로 설정
      });

    // '/board' 요청
    console.log(`${API_BASE_URL}`);
    axios
      .get(`${API_BASE_URL}${BOARD}`)
      .then((res) => {
        // console.log('board 요청', res);
        const reviewData = res.data.boards.filter(
          (boards) => boards.category === '후기'
        );
        setReviewList(reviewData.slice(0, 5)); // '후기' 데이터를 상태로 설정
        const boardData = res.data.boards.filter(
          (boards) => boards.category === '자유'
        );
        setBoardList(boardData.slice(0, 5)); // '자유' 데이터를 상태로 설정
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // console.log('입양리스트 : axios 후에', adoptList);
  // console.log(reviewList);
  // console.log(boardList);

  // 각 리스트의 처음 8개 또는 5개 항목만 선택
  const limitedAdoptList = adoptList.slice(0, 8);
  const limitedReviewList = reviewList.slice(0, 5);
  const limitedBoardList = boardList.slice(0, 5);

  // 로딩 상태와 컴포넌트 렌더링 부분을 분리합니다.
  let content;
  if (loading) {
    content = <LoadingPink />; // 로딩 상태이면 LoadingPink 컴포넌트를 보여주기
  } else {
    content = limitedAdoptList.map((adoptList, index) => (
      <Grid
        item
        className='image'
        key={index}
      >
        <Link to={`${ADOPT}/detail/${adoptList.desertionNo}`}>
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
    ));
  }

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
              to={`${ADOPT}`}
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
              {content}
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
                to={`${BOARD}`}
                className='readMore'
              >
                자세히보기
              </Link>
              <hr />
              <div className='reviewList'>
                {limitedBoardList.length > 0 ? (
                  limitedReviewList.map((reviewList, index) => (
                    <Grid
                      item
                      className='image'
                      key={index}
                    >
                      <Link to={`${BOARD}/${reviewList.boardNo}`}>
                        <img
                          src={reviewList.imgage}
                          alt='강아지후기사진'
                        />
                        <div className='category'>
                          후기 게시글 {reviewList.title} {reviewList.regDate}
                        </div>
                      </Link>
                    </Grid>
                  ))
                ) : (
                  <Link to={`${BOARD}`}>등록된 게시글이 없습니다.</Link>
                )}
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
                to={`${BOARD}`}
                className='readMore'
              >
                자세히보기
              </Link>
              <hr />
              <div className='boardList'>
                {limitedBoardList.length > 0 ? (
                  limitedBoardList.map((boardList, index) => (
                    <Grid
                      item
                      xs={12}
                      key={index}
                    >
                      <Link to={`${BOARD}/${boardList.boardNo}`}>
                        <div className='category'>{boardList.category}</div>
                        <div className='title'>{boardList.title}</div>
                        <div className='regDate'>{boardList.registDate}</div>
                      </Link>
                    </Grid>
                  ))
                ) : (
                  <Link to={`${BOARD}`}>등록된 게시글이 없습니다.</Link>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainTemplate;
