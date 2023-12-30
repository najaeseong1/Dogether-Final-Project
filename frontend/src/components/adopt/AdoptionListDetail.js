import React, { useEffect, useState } from 'react';
import './AdoptionListDetail.scss';
import { Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AdoptionListDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { desertionNo } = useParams();
  const { userId } = useParams();

  const [likeItems, setLikedItems] = useState([]);
  const [adoptListDetail, setAdoptListDetail] = useState(null);

  // 입양 신청서 요청하기
  //

  // 입양 신청서 요청하기
  const goAdoptionApplication = async () => {
    try {
      //const userId = await getUserId();
      const url = `http://localhost:8181/contract/test1/${desertionNo}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('입양 신청서 요청이 성공했습니다.');
        navigate(`/contract/test1/${desertionNo}`);
      } else {
        console.error('입양 신청서 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('입양 신청서 요청 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const { state } = location;
    setAdoptListDetail(state ? state.adoptListDetail : null);
  }, [location]);

  // 관심등록 버튼 클릭시 좋아요 목록
  const handleLike = (breed, age) => {
    setLikedItems([...likeItems, { breed, age }]);
  };

  const { state } = location;
  //const desertionNo = state ? state.desertionNo : null;

  return (
    <div className='main'>
      <div className='border'>
        <div className='dog-profileimg'>
          <img
            src={adoptListDetail?.profileImg}
            alt='profile'
          />
        </div>

        {/* 관심등록 버튼 */}
        <div className='likebtn'>
          <button>관심 등록</button>
        </div>

        <div className='dog-info'>
          <div className='dog-info1'>
            <p> - 입양번호:{adoptListDetail?.desertionNo}</p>
            <p> 접수일: {adoptListDetail?.noticeSdt}</p>
          </div>
          <div className='dog-info1'>
            <p> 공고기간: {adoptListDetail?.noticeEdt}</p>
          </div>
          <div className='dog-info1'>
            <p> 발견장소: {adoptListDetail?.happenAddr} </p>
          </div>
          <div className='dog-info1'>
            <p> 나이: {adoptListDetail?.age}</p>
          </div>
          <div className='dog-info1'>
            <p> 견종: {adoptListDetail?.kindCd}</p>
          </div>
          <div className='dog-info1'>
            <p> 색상: {adoptListDetail?.colorCd}</p>
          </div>
          <div className='dog-info1'>
            {' '}
            <p> 무게: {adoptListDetail?.weight}</p>
          </div>
          <div className='dog-info1'>
            <p> 성별: {adoptListDetail?.gender}</p>
          </div>
          <div className='dog-info1'>
            <p> 중성화 여부: {adoptListDetail?.neuterYn}</p>
          </div>
          <div className='dog-info1'>
            <p> 특이사항: {adoptListDetail?.specialMark}</p>
          </div>
          <div className='dog-info1'>
            <p> 보호소 이름: {adoptListDetail?.careNm}</p>
          </div>
          <div className='dog-info1'>
            <p> 보호소 전화번호: {adoptListDetail?.careTel}</p>
          </div>
          <div className='dog-info1'>
            <p> 보호장소: {adoptListDetail?.careAddr}</p>
          </div>
          <div className='dog-info1'>
            <p> 관할기관: {adoptListDetail?.orgNm}</p>
          </div>
          <div className='dog-info1'>
            <p> 담당자: {adoptListDetail?.chargeNm}</p>
          </div>
          <div className='dog-info1'>
            <p> 담당자 연락처: {adoptListDetail?.officeTel}</p>
          </div>
        </div>

        <div className='adopt-button'>
          <Button
            variant='outlined'
            onClick={goAdoptionApplication}
          >
            입양신청서
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionListDetail;
