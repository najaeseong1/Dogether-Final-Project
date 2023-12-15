import React from 'react';
import './AdoptionListDetail.scss';
import { Button } from '@mui/material';
import '../../img/dogdog.jpeg'
import { useNavigate } from 'react-router-dom';

const AdoptionListDetail = () => {

  const navigate = useNavigate();

  const goAdoptionApplication = () => {
    navigate("/AdoptionApplication");
  }

  return (
    
   <div className='main'>

      <div className='border'>

      <div className='dog-profileimg'>
        <img 
          src={ require('../../img/dogdog.jpeg') }
          alt='profile'
        />         
      </div>
          <div className='dog-info'>
          <div className='dog-info1'> <p> 접수일:  2023. 12 . 03</p> </div>
          <div className='dog-info1'> <p> 공고기간:  2023 12 06 ~ 2023 12 15</p> </div>
          <div className='dog-info1'> <p> 발견장소: 장흥면 유원지로 89번 90 인근 </p> </div>
          <div className='dog-info1'> <p> 나이: 2023(년생)</p> </div>
          <div className='dog-info1'> <p> 견종: 말티즈</p> </div>
          <div className='dog-info1'> <p> 색상: 흰색</p> </div>
          <div className='dog-info1'> <p> 무게: 3.2(kg)</p> </div>
          <div className='dog-info1'> <p> 성별: M</p> </div>
          <div className='dog-info1'> <p> 중성화 여부: Y</p> </div>
          <div className='dog-info1'> <p> 특이사항: 부정교합, 코갈색</p> </div>
          <div className='dog-info1'> <p> 보호소 이름: 아산동물복지지원센터</p> </div>
          <div className='dog-info1'> <p> 보호소 전화번호: 041-123-1234</p> </div>
          <div className='dog-info1'> <p> 보호장소: 충청남도 아산시 환경공원로 158 (배미동)</p> </div>
          <div className='dog-info1'> <p> 관할기관: 충청남도 아산시</p> </div>
          <div className='dog-info1'> <p> 담당자: 나재성(축산유통팀)</p> </div>
          <div className='dog-info1'> <p> 담당자 연락처: 02-1111-2222</p> </div>
          </div>
    
        <div className='adopt-button'>
        <Button variant="outlined" onClick={goAdoptionApplication}>입양신청서</Button>
        </div>

        </div>
      </div>
  
  
  
   
  )
}

export default AdoptionListDetail