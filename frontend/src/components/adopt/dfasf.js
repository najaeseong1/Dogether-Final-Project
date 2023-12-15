import {Button, TextField } from '@mui/material'
import React from 'react'
import './AdoptionApplication.scss';  

const AdoptionApplication = () => {
  return (
    <div className='main2'>

      
      <form action='#'>
      <div className='userinfo'>입양신청서 기본정보</div>
        
        <div className='name'>
          이름 <input type='text' id='name'/>
          </div>

        <div className='age'>
          나이 <input type='text' id='age'/>
        </div>

        <div className='addr'>
          주소 <input type='text' id='addr'/>
        </div>

        <div className='yeobu'>
          반려동물 여부 &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 있음<input type='radio' id='yes'/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 없음<input type='radio' id='no'/>
        </div>

        <div className='job'> 
          직업 <input type='text' id='job'/>
        </div>

        <div className='email'>
          이메일 <input type='email' id='email'/>
        </div>

        {/* <div className='tel'>
          전화번호 <input type='tel' id='tel'/>
        </div>

        <div className='reason'>
          입양사유 <input type='textarea' id='reason'/>
        </div>
        
        </form>

        <form action='#'>
          <div className='doginfo'>유기견 기본정보</div>
          <div className='carenm'>
            보호소 이름 <input type='text' id='carenm'/>
          </div>
          <div className='age2'>
            나이 <input type='text' id='age2'/>
          </div>
          <div className='gender'>
            성별 <input type='text' id='gender'/>
          </div>
          <div className='kind'>
            품종 <input type='text' id='gender'/>
          </div>
          <div className='happenplace'>
            발견장소 <input type='text' id='happenplace'/>
          </div>
          <div className='specialmark'>
            특이사항 <input type='textarea' id='special'/>
          </div>
          <div className='yeobu2'>
            중성화 여부
          </div> */}
        </form>

        

        </div>
  )
}

export default AdoptionApplication