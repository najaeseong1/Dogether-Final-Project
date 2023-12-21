import React from 'react';
import './MyPage.scss';
import { Link, useNavigate } from 'react-router-dom';
const MyPage = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };

  return (
    <div className='mypage-fixed'>
      <div className='group-wrapper'>
        <div className='group'>
          <div className='overlap'>
            <button className='text-wrapper'>
              <Link to='/user/mypage'>마이페이지</Link>
            </button>
          </div>

          <img
            className='img'
            alt='Rectangle'
            src='https://cdn.animaapp.com/projects/656ec6d75c84f45c76814d5f/releases/6572de57df8c3c94cf99e02d/img/rectangle-42@2x.png'
          />

          <button className='div'>
            <Link to='/user/modify'>개인정보변경</Link>
          </button>
          <button className='text-wrapper-2'>
            <Link to='/user/adoptionstatus'>입양신청현황</Link>
          </button>
          <button className='text-wrapper-3'>
            <Link to='/user/likelist'>좋아요목록</Link>
          </button>
          <Link to='/knowledges/knowledge'>
            <div className='know-group'>
              <p className='knowledge'>지식백과</p>
              <p className='knowledgecon'>바로가기</p>
            </div>
          </Link>
          <div className='completion-group'>
            <p className='completion'>수료여부</p>
            <p className='completion-status'>수료</p>
          </div>
          <div className='quiz-group'>
            <p className='quiz'>퀴즈 점수</p>
            <p className='quiz-score'>95점</p>
          </div>
          <div className='text-wrapper-12'>게시판</div>
          <div className='overlap-3'>
            <p className='p'>조장... 혈액형 B로 밝혀져 .....</p>
            <div className='text-wrapper-9'>2023-11-23</div>
            <div className='text-wrapper-10'>수정</div>
            <div className='text-wrapper-11'>삭제</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
