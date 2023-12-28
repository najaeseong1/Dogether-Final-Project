import { Link } from 'react-router-dom';
import './LikeList.scss';
import { useEffect, useState } from 'react';
import { GiHeartMinus } from 'react-icons/gi';
import { API_BASE_URL } from '../../global/config/host-config';
import axios from 'axios';

const LikeList = () => {
  // 좋아요 상태 관리
  const [likedInfo, setLikedInfo] = useState([
    {
      img: 'https://shop.peopet.co.kr/data/goods/370/2023/08/23595_temp_16921616251629view.jpg',
      id: '1',
      name: '말티즈',
      age: '4',
    },
    {
      id: '2',
      name: '치와와',
      age: '3',
    },
  ]);

  // 하트를 눌렀을 때 삭제 되도록
  const handleRemoveLike = (itemId) => {
    const updatedLikedInfo = likedInfo.filter((item) => item.id !== itemId);
    setLikedInfo(updatedLikedInfo);
  };

  // 좋아요 목록 요청
  const fetchLikeInfo = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/adopt/wishRegist/426325202300497`
      );
      setLikedInfo(res.data);
    } catch (err) {
      console.error('err : ', err);
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
          <button className='text-wrapper-2'>
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
                <span className='text'>좋아요를 누른 목록</span>
                <ul>
                  {likedInfo.map((item) => (
                    <div
                      className='list'
                      key={item.id}
                    >
                      <img
                        className='img'
                        src={item.img}
                        alt='dog-img'
                      />
                      <p className='line'>견종: {item.name}</p>
                      <p>나이: {item.age}</p>
                      <GiHeartMinus
                        className='icon'
                        onClick={() => handleRemoveLike(item.id)}
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
