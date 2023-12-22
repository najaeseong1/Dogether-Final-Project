import React, { useEffect, useState } from 'react';
import './MyPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../global/config/host-config';
import axios from 'axios';

const MyPage = () => {
  const navigate = useNavigate();

  const toLink = (loc) => {
    navigate(loc);
  };
  // 점수 70 점 이상이면 수료 /
  //const score = 75;
  const [score, setScore] = useState('');

  // 점수 가져오기
  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/knowledge/quiz`)
      .then((res) => {
        setScore(res.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  // 점수에 따라 수료 여부 결정
  const completionStatus = score >= 70 ? '수료' : '미수료';
  const showLink = score < 70;

  return (
    <div className='mypage-fixed'>
      <div className='group-wrapper'>
        <div className='group'>
          <button className='mypage-tap'>
            <Link to='/user/mypage'>마이페이지</Link>
          </button>
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
            <p className='completion-status'>{completionStatus}</p>
          </div>
          {showLink ? (
            // 미수료 상태일 때 퀴즈 바로가기 링크 표시
            <Link to='/knowledges/quiz'>
              <div className='quiz-group'>
                <p className='quiz'>반려퀴즈</p>
                <p className='toquiz'>바로가기</p>
              </div>
            </Link>
          ) : (
            // 수료 상태일 때 퀴즈 점수 표시
            <div className='quiz-group'>
              <p className='quiz'>퀴즈점수</p>
              <p className='quiz-score'>{score}점</p>
            </div>
          )}
          <div className='board'>게시판</div>
          <div
            className='board-content'
            onClick={() => toLink('/boarddetail')}
          >
            <p className='text'>조장... 혈액형 B로 밝혀져 .....</p>
            <p className='date'>2023-11-23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
