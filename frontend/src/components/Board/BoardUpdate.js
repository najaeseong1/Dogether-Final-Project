import React, { useEffect, useRef, useState } from 'react';
import './BoardUpdate.scss'; // SCSS 파일 import
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const boardNo = 1;
const API_URL = `http://localhost:8181/board/modify/${boardNo}`;

const BoardUpdate = () => {
  const $fileTag = useRef();
  const [imagePreview, setImagePreview] = useState(null); //이미지 프리뷰임
  const redirection = useNavigate();

  // 상태 관리를 위한 useState
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // 게시물 정보 상태
  const [boardData, setBoardData] = useState(null);

  // 페이지 로딩되자마자 보여야하는 데이터들
  useEffect(() => {
    const resBoardData = async () => {
      const boardNo = boardNo;

      const response = await axios.get(`{API_URL}/${boardNo}`);
      const resBoardData = response.data;

      setBoardData({
        title: resBoardData.title,
        category: resBoardData.category,
        content: resBoardData.content,
      });
    };

    resBoardData();
  }, []);

  // 가져온 정보 저장

  // 게시물 작성 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length === 0 || content.length === 0) {
      alert('입력창이 비었습니다.');
      return;
    }

    // 여기에서 fetch 보내기
    const addList = async (title, content, category) => {
      const create = {
        title: title,
        content: content,
        category: category,
      };

      const postJsonBlob = new Blob([JSON.stringify(create)], {
        type: 'application/json',
      });

      const postFormData = new FormData();
      postFormData.append('board', postJsonBlob);
      postFormData.append('ImageFile', $fileTag.current.files[0]);

      const res = await fetch(API_URL, {
        method: 'POST',
        body: postFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        alert('게시판 글이 등록되었습니다.');
        redirection('/board');
      } else {
        alert('서버와의 통신이 원활하지 않습니다.');
      }
    };
    // 작업이 완료되면 입력값 초기화
    setTitle('');
    setContent('');
    setFile(null);
    setCategory('');
  };

  //타이틀 핸들러
  const boardTitleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  //컨텐트 핸들러
  const boardContentHandler = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const boardCategoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  // 파일 선택 시 처리 함수
  const handleFileChange = (e) => {
    // 선택한 파일을 상태에 저장
    const file = $fileTag.current.files[0];

    //확장자 얻기
    const fileExt = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();

    if (
      fileExt !== 'jpg' &&
      fileExt !== 'png' &&
      fileExt !== 'jpeg' &&
      fileExt !== 'gif'
    ) {
      alert('이미지 파일 (jpg, png, jpeg, gif)만 등록 가능합니다.');
      $fileTag.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
      setImagePreview(reader.result); // 이미지 미리보기
    };
  };

  return (
    <div className='board-container'>
      <div className='boardTitle'>게시물 수정</div>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input
            type='text'
            value={title}
            onChange={boardTitleHandler}
          />
        </label>

        <label>
          카테고리
          <select
            value={category}
            onChange={boardCategoryHandler}
          >
            <option value=''>카테고리 선택</option>
            <option value='category1'>후기 게시판</option>
            <option value='category2'>자유 게시판</option>
          </select>
        </label>
        <label>
          파일 첨부
          <input
            type='file'
            onChange={handleFileChange}
            ref={$fileTag}
          />
        </label>

        {/* 사용자 이미지 첨부시 보여질 이미지 */}
        {imagePreview && (
          <div className='image-preview'>
            <img
              src={imagePreview}
              alt='이미지 미리보기'
              style={{ width: '550px', height: '400px' }}
            />
          </div>
        )}
        <label>
          내용
          <textarea
            value={content}
            onChange={boardContentHandler}
          />
        </label>

        <div className='buttoncn'>
          <button
            type='submit'
            className='boardButton'
          >
            작성하기
          </button>
          <button
            type='button'
            className='boardButton'
            onClick={() => redirection('/boardDetail/')}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardUpdate;
