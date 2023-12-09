import React from 'react';
import './BoardList.scss';
import { Link } from 'react-router-dom';

const BoardList = () => {
  const boardData = [
    {
      id: '1',
      category: '후기',
      title: '멍멍이 귀요워여',
      date: '2023-12-09',
      author: '춘식이',
    },
  ];

  const renderPageNumbers = () => {
    const pageNumbers = [1, 2, 3, 4, 5]; // 가상의 페이지 번호 (예시)

    return (
      <div className='pagination'>
        {pageNumbers.map((number) => (
          <span key={number} className='page-number'>
            {number}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className='BoardListTemplate1'>
      <div className='boardTitile'>자유게시판</div>
      <div>
        <select>
          <option value='all'>전체 카테고리</option>
          <option value='notice'>후기</option>
          <option value='free'>자유</option>
        </select>
        <input type='text' placeholder='검색어 입력' id='searchboard' />

        <button className='listButton'>검색</button>
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
          {boardData.map((post) => (
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

      {renderPageNumbers()}

      <Link to={'/boardRegist'}>
        <button className='listButton'>글쓰기</button>
      </Link>
    </div>
  );
};

export default BoardList;
