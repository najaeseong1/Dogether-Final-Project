import { Link } from 'react-router-dom';
import './LikeList.scss';

const LikeList = () => {
  const likedItems = [
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
  ];

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

          <div className='like-list'>
            {likedItems.length > 0 ? (
              <div className='content'>
                <span className='text'> 좋아요를 누른 목록 </span>
                <ul>
                  {likedItems.map((item) => (
                    <>
                      <p
                        className='list'
                        key={item.id}
                      >
                        <img
                          className='img'
                          src={item.img}
                          alt='dog-img'
                        />
                        <p>견종 :{item.name}</p>
                        <p>나이 :{item.age}</p>
                      </p>
                    </>
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
