import React, { useState } from 'react';
import './MyPage.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const MyPage = () => {
  // url 에서 가져오는방법
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const score = queryParams.get('score');

  return (
    <div className='mypage-fixed'>
      <div className='group-wrapper'>
        <div className='group'>
          <div className='overlap'>
            <button className='mypage-tap'>
              <Link to='/user/mypage'>마이페이지</Link>
            </button>
          </div>

          <button className='modify-tap'>
            <Link to='/user/modify'>개인정보변경</Link>
          </button>
          <button className='text-wrapper-2'>
            <Link to='/user/adoptionstatus'>입양신청현황</Link>
          </button>
          <button className='like-list-tap'>
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
            <p className='quiz-score'>{score}점</p>
          </div>
          <div className='text-wrapper-12'>게시판</div>
          <div className='overlap-3'>
            <p className='p'>조장... 혈액형 B로 밝혀져 .....</p>
            <p className='date'>2023-11-23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
