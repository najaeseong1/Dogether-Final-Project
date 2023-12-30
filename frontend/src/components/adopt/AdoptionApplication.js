import {Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './AdoptionApplication.scss';  
import axios from 'axios';
import { error } from 'jquery';
import { json, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, CONTRACT } from '../../global/config/host-config';

const AdoptionApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {desertionNo} = useParams();
  
  const [formData, setFormData] = useState({
    userName: '',
    postAddr: '',
    userPhone: '',
    userEmail: '',
    desertionNo: desertionNo,
    careNm: '',
    age: '',
    gender: '',
    kindCd: '',
    weight: '',
    happenAddr: '',
    specialMark: '',
    neuterYn: '',
    reasonRefusal: '',
    colorCd: '',
    
    
  });

  useEffect(() => {
    const { state } = location;
    setFormData(state ? state.adoptListDetail : {});
  }, [location]);
  
 

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSummit = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}${CONTRACT}/regist`,
        {
          desertionNo: desertionNo,
          userName: formData.userName,
          userAge: formData.userAge,
          petStatus: formData.petStatus,
          job: formData.job,
          userEmail: formData.userEmail,
          userPhone: formData.userPhone,
          postAddr: formData.postAddr,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );
      console.log('응답:', response.data);
      alert('입양 신청이 완료되었습니다.')
      navigate('/'); 
    } catch (error) {
      // 에러 처리
      console.error('입양 신청 제출 오류:', error);
    }
  };


  return (
    <div className='main2'>

      
      
      <div className='userinfo'>입양신청서 기본정보</div>
        
        <div className='name'>
          이름&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='userName' className='userName' value={formData.userName} readOnly />
          </div>

        <div className='age'>
          나이&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='userAge' className='userAge' onChange={handleInputChange}  />
        </div>

        <div className='addr'>
          주소&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='postAddr' className='postAddr' value={formData.postAddr} readOnly/>
        </div>

        <div className='yeobu'>
          반려동물 여부 &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; <input type='text' id='petStatus' className='petStatus' onChange={handleInputChange}  />
        </div>

        <div className='job1'> 
          직업&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='job' className='job'  onChange={handleInputChange}/>
        </div>

        <div className='email'>
          이메일&nbsp;&nbsp;&nbsp;&nbsp; <input type='email' id='userEmail' className='userEmail' value={formData.userEmail} readOnly/>
        </div>

         <div className='tel'>
          전화번호 &nbsp;&nbsp;&nbsp;&nbsp;<input type='tel' id='userPhone'  value={formData.userPhone} readOnly/>
        </div>
        
        <div className='reason1'>
          입양사유&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='reason' className='reason' onChange={handleInputChange} />
        </div>
        
       

        
          <div className='doginfo'>유기견 기본정보</div>
         
          <div className='carenm'>
            보호소 이름 &nbsp;&nbsp;&nbsp; <input type='text' id='carenm'  value={formData.careNm} readOnly/>
          </div>
           
          <div className='age2'>
            나이 &nbsp;&nbsp;&nbsp; <input type='text' id='age2'  value={formData.age} readOnly/>
          </div>
         
          <div className='gender'>
            성별 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; <input type='text' id='gender'  value={formData.gender} readOnly/>
          </div>
           
          <div className='kind'>
            품종 &nbsp;&nbsp;&nbsp; <input type='text' id='gender'  value={formData.kindCd} readOnly />
          </div>
          
          <div className='happenplace'>
            발견장소 &nbsp;&nbsp;&nbsp;  <input type='text' id='happenplace'  value={formData.happenAddr} readOnly/>
          </div>
          
          <div className='specialmark'>
            특이사항 &nbsp;&nbsp;&nbsp; <input type='textarea' id='special'  value={formData.specialMark} readOnly/>
          </div>
         
          <div className='yeobu2'>
            중성화 여부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type='text' id='neuterYn'  value={formData.neuterYn} readOnly/>
          </div> 

         
          
          <div className='checkbutton'>
             <button onClick={handleSummit}>확인</button>
          </div>
        
          
        </div>
  )
}

export default AdoptionApplication