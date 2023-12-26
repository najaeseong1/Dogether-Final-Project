import {Button, TextField } from '@mui/material'
import React from 'react'
import './AdoptionApplication.scss';  
import axios from 'axios';

const AdoptionApplication = () => {


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8181/contract/regist');

      if (response.status === 200) {
        console.log('입양 신청서 등록이 성공했습니다.');
      } else {
        console.error('입양 신청서 등록이 실패했습니다.');
      }
    } catch (error) {
      console.error('입양 신청서 등록 중 오류 발생:', error);
    }
  };


  return (
    <div className='main2'>

      
      
      <div className='userinfo'>입양신청서 기본정보</div>
        <form>
        <div className='name'>
          이름&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='name'/>
          </div>

        <div className='age'>
          나이&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='age'/>
        </div>

        <div className='addr'>
          주소&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='addr'/>
        </div>

        <div className='yeobu'>
          반려동물 여부 &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 있음<input type='radio' id='yes'/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 없음<input type='radio' id='no'/>
        </div>

        <div className='job'> 
          직업&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' id='job'/>
        </div>

        <div className='email'>
          이메일&nbsp;&nbsp;&nbsp;&nbsp; <input type='email' id='email'/>
        </div>

         <div className='tel'>
          전화번호 &nbsp;&nbsp;&nbsp;&nbsp;<input type='tel' id='tel'/>
        </div>
        
        <div className='reason'>
          입양사유&nbsp;&nbsp;&nbsp;&nbsp; <input type='email' id='email'/>
        </div>
        
       

        
          <div className='doginfo'>유기견 기본정보</div>
         
          <div className='carenm'>
            보호소 이름 &nbsp;&nbsp;&nbsp; <input type='text' id='carenm'/>
          </div>
           
          <div className='age2'>
            나이 &nbsp;&nbsp;&nbsp; <input type='text' id='age2'/>
          </div>
         
          <div className='gender'>
            성별 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; <input type='text' id='gender'/>
          </div>
           
          <div className='kind'>
            품종 &nbsp;&nbsp;&nbsp; <input type='text' id='gender' />
          </div>
          
          <div className='happenplace'>
            발견장소 &nbsp;&nbsp;&nbsp;  <input type='text' id='happenplace'/>
          </div>
          
          <div className='specialmark'>
            특이사항 &nbsp;&nbsp;&nbsp; <input type='textarea' id='special'/>
          </div>
         
          <div className='yeobu2'>
            중성화 여부 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <button>예</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button>아니요</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button>미상</button>
          </div> 
          
          <div className='checkbutton'>
             <button onClick={handleSubmit}>확인</button>
          </div>
        
          </form>
        </div>
  )
}

export default AdoptionApplication