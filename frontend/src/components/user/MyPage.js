import React from 'react';
import './Mypage.scss';
import { Link } from 'react-router-dom';
const MyPage = () => {
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
          <img
            className='line'
            alt='Line'
            src='https://cdn.animaapp.com/projects/656ec6d75c84f45c76814d5f/releases/6572de57df8c3c94cf99e02d/img/line-6.svg'
          />
          <img
            className='line-2'
            alt='Line'
            src='https://cdn.animaapp.com/projects/656ec6d75c84f45c76814d5f/releases/6572de57df8c3c94cf99e02d/img/line-8.svg'
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
          <div className='overlap-group-wrapper'>
            <div className='overlap-group'>
              <div className='text-wrapper-4'>퀴즈 점수</div>
              <p className='element'>
                <span className='span'>95 </span>
                <span className='text-wrapper-5'>점</span>
              </p>
            </div>
          </div>
          <div className='overlap-wrapper'>
            <div className='overlap-group'>
              <div className='text-wrapper-4'>수료 여부</div>
              <div className='text-wrapper-6'>수료</div>
            </div>
          </div>
          <div className='overlap-2'>
            <div className='rectangle-2' />
            <div className='text-wrapper-7'>지식백과</div>
            <div className='text-wrapper-8'>바로가기</div>
          </div>
          <div className='overlap-3'>
            <p className='p'>조장... 혈액형 B로 밝혀져 .....</p>
            <div className='text-wrapper-9'>2023-11-23</div>
            <div className='text-wrapper-10'>수정</div>
            <div className='text-wrapper-11'>삭제</div>
          </div>
          <div className='text-wrapper-12'>게시판</div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
