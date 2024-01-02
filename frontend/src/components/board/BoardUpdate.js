import React, { useEffect, useRef, useState } from 'react';
import './BoardUpdate.scss'; // SCSS 파일 import
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, BOARD } from '../../global/config/host-config';
import Swal from 'sweetalert2';
import BoardDetail from './BoardDetail';

const BoardUpdate = () => {
  const $fileTag = useRef();
  const [imagePreview, setImagePreview] = useState(null); //이미지 프리뷰임
  const redirection = useNavigate();

  // 상태 관리를 위한 useState
  const { boardNo } = useParams();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [oldFile, setOldFile] = useState(null);
  const API_URL = `${API_BASE_URL}${BOARD}/modify`;
  const imageRequestURL = `${API_BASE_URL}${BOARD}/load-profile/${boardNo}`;
  const [image, setImage] = useState(null);
  const [boardDetail, setBoardDetail] = useState(null);
  // 게시물 정보 상태
  const [boardData, setBoardData] = useState(null);
  const location = useLocation();
  // 페이지 로딩되자마자 보여야하는 데이터들
  useEffect(() => {
    const { state } = location;
    setBoardDetail(state ? state.boardupdate : null);

    console.log('boardData의 값은?', boardData);
    const fetchImage = async () => {
      const res = await fetch(imageRequestURL, {
        method: 'GET',
      });

      if (res.status === 200) {
        const imageBlob = await res.blob();
        const img = window.URL.createObjectURL(imageBlob);

        setImage(imageBlob); //이미지 밥
        console.log('boardDetail', boardDetail);

        setImagePreview(img);
      } else {
        const err = await res.text();
        setImagePreview(null);
      }
    };

    fetchImage();
  }, [location]);

  useEffect(() => {
    try {
      setOldFile(
        new File([image], boardDetail?.image, {
          type: 'image/png',
        })
      );
    } catch (error) {
      console.error('처리 중 오류 발생:', error);
    }
  }, [boardDetail]);

  // 함수 호출

  // 게시물 수정 함수
  const handleSubmit = (e) => {
    // 비동기 함수로 변경
    e.preventDefault();

    boardRegist(boardNo, title, content, category);
  };

  //사용자가 입력값을 비워놓은채 요청 보내면 기본값들로 채워짐
  const boardRegist = async (boardNo, title, content, category) => {
    const formData = new FormData();

    // JSON 데이터 추가
    const jsonData = {
      boardNo: boardNo,
      title: title !== '' ? title : boardDetail?.title,
      content: content !== '' ? content : boardDetail?.content,
      category: category !== '' ? category : boardDetail?.category,
    };

    // console.log('setOldFile의 값', setOldFile(files));
    formData.append(
      'board',
      new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
    );

    console.log('뉴파일', $fileTag.current.files[0]);
    // 이미지 파일 추가
    if (file) {
      formData.append('ImageFile', $fileTag.current.files[0]);
      console.log('file 존재?', $fileTag.current.files[0]);
    } else if (!file && oldFile) {
      console.log('추가된 파일이 존재하지 않고 기존 파일이 존재하는 경우');
      formData.append('oldFile', oldFile);
    }
    console.log('oldFile의 값은?', oldFile);

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });

      if (!response.ok) {
        // 서버 응답이 오류일때
        console.error('Server error:', response.status, response.statusText);
        try {
          const errorData = await response.json();
          console.error('Server error data:', errorData);
          Swal.fire('수정 권한이 없습니다.', '', 'warning');
        } catch (error) {
          console.error('Failed to parse error response:', error);
          Swal.fire('수정 권한이 없습니다.', '', 'warning');
        }
        return;
      }

      // 성공적으로 등록된 경우의 처리
      Swal.fire('게시판 글이 수정되었습니다.', '', 'success');
      redirection('/board');
    } catch (error) {
      // 네트워크 오류 등의 문제 발생 시 처리
      console.error('Error during data submission:', error);
      alert('데이터 전송 중 오류가 발생했습니다.');
    }
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
    console.log('선택 file', file);
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
      console.log(imagePreview);
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
            defaultValue={boardDetail?.title}
            onChange={boardTitleHandler}
          />
        </label>

        <label>
          카테고리
          <select
            value={category || boardDetail?.category}
            onChange={boardCategoryHandler}
          >
            <option value=''>카테고리 선택</option>
            <option value='후기'>후기 게시판</option>
            <option value='자유'>자유 게시판</option>
          </select>
        </label>
        <label>
          파일 첨부
          <input
            type='file'
            onChange={handleFileChange}
            ref={$fileTag}
            id='fileInput'
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
            defaultValue={boardDetail?.content}
            onChange={boardContentHandler}
          />
          {/* {boardDetail.content} */}
        </label>

        <div className='buttoncn'>
          <button
            type='submit'
            className='boardButton'
          >
            수정하기
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
