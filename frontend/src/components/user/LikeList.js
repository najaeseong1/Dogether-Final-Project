import { Link } from 'react-router-dom';
import './LikeList.scss';
import { useContext, useEffect, useState } from 'react';
import { FaHeartCircleMinus } from 'react-icons/fa6';
import { API_BASE_URL } from '../../global/config/host-config';
import axios from 'axios';
import AuthContext from '../../global/utils/AuthContext';

const LikeList = () => {
  // 좋아요 상태 관리
  const [likedInfo, setLikedInfo] = useState([]);
  const authContext = useContext(AuthContext);
  // 유저 정보
  const userId = localStorage.getItem('LOGIN_USERID');

  // 좋아요 목록 요청
  const fetchLikeInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/adopt/wishlist/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log(res);
      setLikedInfo(res.data.adoptLists);
    } catch (err) {
      console.error('err : ', err);
    }
  };

  // 하트를 눌렀을 때 삭제 되도록

  const handleRemoveLike = async (wishNo) => {
    console.log('Received wishNo:', wishNo); // 추가된 부분
    try {
      await axios.delete(`${API_BASE_URL}/adopt/wish/${wishNo}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });

      // 서버에서 정상적으로 응답을 받았을 때 클라이언트에서 목록 업데이트
      setLikedInfo((prevLikedInfo) =>
        prevLikedInfo.filter((item) => item.wishNo !== wishNo)
      );
      console.log(wishNo);
      console.log('좋아요가 성공적으로 취소되었습니다.');
    } catch (error) {
      console.error('좋아요 취소 중 오류 발생:', error);
    }
  };
  useEffect(() => {
    fetchLikeInfo();
  }, []);

  return (
    <div className='mypage-fixed'>
      <div className='group-wrapper'>
        <div className='group'>
          <div className='overlap'>
            <button className='mypage-tap'>
              <Link to='/user/mypage'>마이페이지</Link>
            </button>
          </div>
          <button className='modify-tap'>
            <Link to='/user/modify'>개인정보변경</Link>
          </button>
          <button className='adoptionstatus'>
            <Link to='/user/adoptionstatus'>입양신청현황</Link>
          </button>
          <button className='like-list-tap'>
            <Link to='/user/likelist'>좋아요목록</Link>
          </button>
          <button className='order-history'>
            <Link to='/user/orderhistory'>주문 현황</Link>
          </button>
          <div className='like-list'>
            {likedInfo.length > 0 ? (
              <div className='notContent'>
                <ul>
                  <p className='text'>좋아요를 누른 목록</p>
                  <div className='info-tab-main'>
                    <span className='info-tab'>강아지 정보</span>
                    <span className='info-tab2'>좋아요취소</span>
                  </div>
                  {likedInfo.map((item) => (
                    <div
                      className='list'
                      key={item.wishNo}
                    >
                      {console.log('wishNo:', item.wishNo)}
                      <img
                        className='img'
                        src={item.profileImg}
                        alt='dog-img'
                      />
                      <div className='dogInfo'>
                        <p>No. {item.desertionNo}</p>
                        <p>나이: {item.age}</p>
                        <p>견종: {item.kindCd}</p>
                        <p>몸무게: {item.weight}</p>
                        <p>보호장소 : {item.careNm}</p>
                      </div>
                      <FaHeartCircleMinus
                        className='icon'
                        onClick={() => handleRemoveLike(item.wishNo)}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div className='content'>
                <span>좋아요를 누른 목록이 없습니다.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeList;
