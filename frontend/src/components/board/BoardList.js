import React, { useEffect, useState } from 'react';
import './BoardList.scss';
import { Link, useNavigate } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const itemsPerPage = 10; // 페이지당 보여줄 항목 수

const BoardList = () => {
  const redirection = useNavigate(); //페이지 전환 위해 쓴거
  const [currentPage, setCurrentPage] = useState(1); //사용자 첫 페이지 설정
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 담을 useState
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8181/board/');
        const data = await response.json();
        console.log(data.boards);
        setBoardData(data.boards);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filterBySearchTerm = (post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase());

  const filterByCategory = (post) =>
    selectedCategory === 'all' || post.category === selectedCategory;

  const filteredData =
    boardData.length > 0
      ? boardData.filter(filterByCategory).filter(filterBySearchTerm)
      : [];

  const totalButtonCount = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const boardDetailHandler = (boardNo) => {
    redirection(`/boardDetail/${boardNo}`);
  };

  //mui에서 현재 기본 정보를 담고 있는 event 객체를 원함 그래서 인자 두개
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className='BoardListTemplate1'>
      <div className='boardTitile'>자유게시판</div>
      <div className='searchText'>
        <select
          id='boardListCategory'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value='all'>전체 카테고리</option>
          <option value='category'>후기게시판</option>
          <option value='category1'>자유게시판</option>
        </select>
        <input
          type='text'
          placeholder='검색어를 입력하세요.'
          id='searchboard'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>분류</th>
            <th>제목</th>
            <th>작성일</th>
            <th>글쓴이</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((post) => (
            <tr
              key={post.boardNo}
              onClick={() => boardDetailHandler(post.boardNo)}
            >
              <td>{post.boardNo}</td>
              <td>{post.category}</td>
              <td>{post.title}</td>
              <td>{post.registDate}</td>
              <td>{post.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination-container'>
        <Stack spacing={2}>
          <Pagination
            count={totalButtonCount}
            page={currentPage}
            onChange={handlePageChange}
            variant='outlined'
          />
        </Stack>
      </div>
      <div className='listButtonDiv'>
        <Link to={'/boardRegist'}>
          <button className='listButton'>글쓰기</button>
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
