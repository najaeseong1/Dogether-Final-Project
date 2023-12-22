import React, { useState } from 'react';
import './Quiz.scss';
import { useNavigate } from 'react-router-dom';

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
      text: '강아지가 살기 적합한 공간은?',
      options: [
        { id: 0, text: '답답한 공간', isCorrect: false },
        { id: 1, text: '시끄러운 공간', isCorrect: false },
        { id: 2, text: '자유롭게 움직일 수 있는 공간 ', isCorrect: true },
        { id: 3, text: '갇힌 공간', isCorrect: false },
      ],
    },
    {
      text: '반려견을 키우기 전에 준비해야 할 것들은 무엇인가요?',
      options: [
        {
          id: 0,
          text: '따로 준비해야하는 건 없다',
          isCorrect: false,
        },
        { id: 1, text: '어떻게든 되겠다는 생각', isCorrect: false },
        {
          id: 2,
          text: '강아지를 자랑하기 위한 인스타 계정',
          isCorrect: false,
        },
        {
          id: 3,
          text: '사료 그릇, 목줄, 산책용 배변 패드, 샴푸',
          isCorrect: true,
        },
      ],
    },
    {
      text: '강아지 귀여운 이유?',
      options: [
        { id: 0, text: '글쎄 ', isCorrect: true },
        { id: 1, text: '걍 귀여움', isCorrect: false },
        { id: 2, text: '뭘까 ', isCorrect: false },
        { id: 3, text: '이게 답', isCorrect: false },
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
