import React, { useState } from 'react';
import './Quiz.scss';
import { useNavigate } from 'react-router-dom';
import { MyPage } from '../user';

const Quiz = () => {
  // 마이페이지에 점수 띄우기
  const myScore = useNavigate();

  //현재 질문 변경
  const [question, setQuestion] = useState(0);

  //퀴즈 결과 가져오기
  const [showResult, setShowResult] = useState(false);

  //점수 가져오기
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: '강아지 귀여운 이유?',
      options: [
        { id: 0, text: '글쎄 ', isCorrect: false },
        { id: 1, text: '걍 귀여움', isCorrect: false },
        { id: 2, text: '뭘까 ', isCorrect: false },
        { id: 3, text: '이게 답', isCorrect: true },
      ],
    },
    {
      text: '강아지 귀여운 이유?',
      options: [
        { id: 0, text: '글쎄 ', isCorrect: false },
        { id: 1, text: '걍 귀여움', isCorrect: false },
        { id: 2, text: '뭘까 ', isCorrect: false },
        { id: 3, text: '이게 답', isCorrect: true },
      ],
    },
    {
      text: '강아지 귀여운 이유?',
      options: [
        { id: 0, text: '글쎄 ', isCorrect: false },
        { id: 1, text: '걍 귀여움', isCorrect: false },
        { id: 2, text: '뭘까 ', isCorrect: false },
        { id: 3, text: '이게 답', isCorrect: true },
      ],
    },
    {
      text: '강아지 귀여운 이유?',
      options: [
        { id: 0, text: '글쎄 ', isCorrect: false },
        { id: 1, text: '걍 귀여움', isCorrect: false },
        { id: 2, text: '뭘까 ', isCorrect: false },
        { id: 3, text: '이게 답', isCorrect: true },
      ],
    },
    {
      text: '강아지 귀여운 이유?',
      options: [
        { id: 0, text: '글쎄 ', isCorrect: false },
        { id: 1, text: '걍 귀여움', isCorrect: false },
        { id: 2, text: '뭘까 ', isCorrect: false },
        { id: 3, text: '이게 답', isCorrect: true },
      ],
    },
  ];

  // 정답을 클릭했을 때
  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (question + 1 < questions.length) {
      setQuestion(question + 1);
    } else {
      setShowResult(true);
    }
  };
  const restart = () => {
    setScore(0);
    setQuestion(0);
    setShowResult(false);
  };

  return (
    //App
    <div className='quiz'>
      <h1> 반려퀴즈 </h1>

      {showResult ? (
        <div className='result'>
          <h1>최종결과</h1>
          <h2>{score * 20} 점</h2>
          <button onClick={restart}> 다시하기 </button>
        </div>
      ) : (
        <div className='quiz-card'>
          <h2>
            총 {questions.length}개 질문 중 {question + 1} 번
          </h2>
          <h3>{questions[question].text} </h3>

          <ul>
            {questions[question].options.map((option) => {
              return (
                <li
                  onClick={() => optionClicked(option.isCorrect)}
                  key={option.id}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
