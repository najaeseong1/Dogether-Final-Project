import React, { useState } from 'react';
import './BoardDetail.scss';

const BoardDetail = () => {
  const [comments, setComments] = useState([]); // 댓글 목록을 저장하는 상태
  const [newComment, setNewComment] = useState(''); // 새로 작성 중인 댓글

  // 더미 데이터
  const post = {
    title: '게시물 제목',
    date: '2023-01-01',
    content: '게시물 내용입니다. 여러 줄로 구성될 수 있습니다.',
    imageUrl: 'https://placekitten.com/800/400', // 예시 이미지 URL
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      // 새로운 댓글을 댓글 목록에 추가
      setComments([...comments, newComment]);
      // 입력 폼 초기화
      setNewComment('');
    }
  };

  return (
    <div className='post-detail'>
      <h2>{post.title}</h2>
      <p className='post-date'>작성일: {post.date}</p>
      <div className='post-content'>
        <img src={post.imageUrl} alt='게시물 이미지' />
        <p>{post.content}</p>
      </div>
      <div className='comment-section'>
        <h3>댓글</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <div className='comment-form'>
          <textarea
            placeholder='댓글을 입력하세요...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>댓글 작성</button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
