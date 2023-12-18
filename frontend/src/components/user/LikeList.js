import { Link } from 'react-router-dom';
import './LikeList.scss';
import { DisabledByDefault } from '@mui/icons-material';

const LikeList = () => {
  return (
    <div className='mypage-fixed'>
      <div className='group-wrapper'>
        <div className='group'>
          <div className='overlap'>
            <button className='text-wrapper'>
              <Link to='/user/mypage'>마이페이지</Link>
            </button>
          </div>

          <img
            className='img'
            alt='Rectangle'
            src='https://cdn.animaapp.com/projects/656ec6d75c84f45c76814d5f/releases/6572de57df8c3c94cf99e02d/img/rectangle-42@2x.png'
          />

          <button className='div'>
            <Link to='/user/modify'>개인정보변경</Link>
          </button>
          <button className='text-wrapper-3'>
            <Link to='/user/likelist'>좋아요목록</Link>
          </button>
          <button className='text-wrapper-2'>
            <Link to='/user/adoptionstatus'>입양신청현황</Link>
          </button>
          <div className='content'>
            <span>좋아요를 누른 목록이 없습니다.</span>
          </div>
          <div className='like-list'></div>
        </div>
      </div>
    </div>
  );
};

export default LikeList;
