import React, { useState } from 'react';
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

  //더미데이터 -> 나중에  fetch보내서 DB에 저장된 값 가져올것임
  const boardData = [
    {
      id: '1',
      category: '후기',
      title: '강아지 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '2',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
    {
      id: '3',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '4',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
    {
      id: '5',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '6',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
    {
      id: '7',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '8',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
    {
      id: '9',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '10',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
    {
      id: '11',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '12',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
    {
      id: '13',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },

    {
      id: '14',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '야옹이',
    },
  ];

  const filterBySearchTerm = (
    post //post -> 더미데이터임
  ) => post.title.toLowerCase().includes(searchTerm.toLowerCase()); //게시물 제목에 사용자가 입력한 값 searchTerm이 포함되어 있으면 !

  const filterByCategory = (post) =>
    selectedCategory === 'all' || post.category === selectedCategory;

  const filteredData = boardData
    .filter(filterByCategory)
    .filter(filterBySearchTerm);

  const totalButtonCount = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const boardDetailHandler = () => {
    redirection('/boardDetail');
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
          <option value='후기'>후기게시판</option>
          <option value='자유'>자유게시판</option>
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
        <tbody onClick={boardDetailHandler}>
          {paginatedData.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.category}</td>
              <td>{post.title}</td>
              <td>{post.date}</td>
              <td>{post.author}</td>
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
