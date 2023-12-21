import React, { useState } from 'react';
import './BoardDetail.scss';
import { useNavigate } from 'react-router-dom';

let today = new Date();
const BoardDetail = () => {
  const [comments, setComments] = useState([]); // 댓글 목록을 저장하는 상태, 배열로 아이디 내용을 담을 거임
  const [newComment, setNewComment] = useState(''); // 새로 작성 중인 댓글
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };

  // 더미 데이터
  const post = {
    title: '고양이 귀요웡',
    date: '2023-01-01',
    content:
      '고양이가 너무 귀욥네요 사실 키울 생각은 없었는데용 다들 고양이 어떻게 키우고 계신가요 궁금해요 저는 정말로 고양이 키울생각은 없엇는데 살다보니 이런일도 생기네요 ',
    imageUrl:
      'https://www.fitpetmall.com/wp-content/uploads/2023/09/shutterstock_2205178589-1-1.png', // 예시 이미지 URL
    userId: '춘식이',
  };

  // 가상의 로그인 상태를 나타내는 함수
  const getLoggedInUserId = () => {
    //여기서 토큰 안에 있는 사용자 id 가져오면 될듯??
    return '로그인된사용자';
  };

  // 댓글 작성 핸들러
  const handleCommentSubmit = () => {
    const loggedInUserId = getLoggedInUserId();

    if (newComment.trim() !== '' && loggedInUserId) {
      // 새로운 댓글을 댓글 목록에 추가
      setComments([
        ...comments,
        //DB에서 갖고 온 값들 뿌리면 될듯
        {
          content: newComment,
          userId: loggedInUserId,
          regDate: today.toLocaleString(),
        },
      ]);
      // 입력 폼 초기화
      setNewComment('');
    } else if (newComment === '') {
      alert('댓글을 입력해주세요');
      return;
    } else if (loggedInUserId) {
      alert('로그인을 하신 후 이용해 주시기 바랍니다.');
      return;
    }
  };

  // 게시물 삭제
  const deleteBoard = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
    }
  };

  return (
    <div className='post-detail'>
      <h2>{post.title}</h2>
      <p className='post-date'>
        작성자:{post.userId} | 작성일: {post.date}
      </p>
      <div className='post-content'>
        <img
          src={post.imageUrl}
          alt='게시물 이미지'
        />
        <p>{post.content}</p>
      </div>
      <button
        onClick={deleteBoard}
        className='detail-btn'
      >
        삭제
      </button>
      <button
        onClick={() => toLink('/boardupdate')}
        className='detail-btn'
      >
        수정
      </button>
      <div className='comment-section'>
        <h3>댓글</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.userId}</strong>: {comment.content}
              <p className='replyRegDate'>{comment.regDate}</p>
            </li>
          ))}
        </ul>
        <div className='comment-form'>
          <textarea
            placeholder='댓글을 입력하세요...'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            id='replycomment'
            onClick={handleCommentSubmit}
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
