// Board.jsx

import React, { useState } from 'react';
import './Board.scss'; // SCSS 파일 import
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const redirection = useNavigate();

  // 상태 관리를 위한 useState
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // 게시물 작성 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 여기에서 게시물을 서버에 제출하거나 다른 작업을 수행할 수 있습니다.

    // 작업이 완료되면 입력값 초기화
    setTitle('');
    setCategory('');
    setContent('');
    setFile(null);
  };

  // 파일 선택 시 처리 함수
  const handleFileChange = (e) => {
    // 선택한 파일을 상태에 저장
    setFile(e.target.files[0]);
  };

  return (
    <div className='board-container'>
      <div className='boardTitle'>게시물 작성</div>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          카테고리
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=''>카테고리 선택</option>
            <option value='category1'>후기 게시판</option>
            <option value='category2'>자유 게시판</option>
          </select>
        </label>

        <label>
          내용
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <label>
          파일 첨부:
          <input type='file' onChange={handleFileChange} />
        </label>

        <div className='buttoncn'>
          <button type='submit' className='boardButton'>
            작성하기
          </button>
          <button
            type='button'
            className='boardButton'
            onClick={() => console.log('취소 버튼 클릭')}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Board;
