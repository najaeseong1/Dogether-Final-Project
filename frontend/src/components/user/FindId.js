import React, { useEffect, useState } from 'react';
import './FindId.scss';
import { EmailCheck } from '../../global/EmailCheck';
import { API_BASE_URL, USER } from '../../global/config/host-config';
import axios from 'axios';
import Swal from 'sweetalert2';

const FindId = () => {
  // 인증 번호 발송
  const [certificationNumber, setcertificationNumber] = useState(false);
  const [code, setCode] = useState('');

  // 아이디 띄워주기
  const [idMessage, setIdMessage] = useState(false);
  //  인증번호 일치하지 않을 때 메시지
  const [notificationMessage, setNotificationMessage] = useState(false);

  // 이메일 일치하고 사용자 정보 띄워줄때
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  // 이메일 입력값
  const handlerSendNumber = async () => {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;

    if (!EmailCheck(emailValue)) {
      alert('이메일을 정확하게 입력해주세요');
      return;
    } else {
      try {
        const res = await axios.post(`${API_BASE_URL}${USER}/findid`, {
          email: emailValue,
        });
        console.log(res.data.code);

        setcertificationNumber(res.data.code);
        setEmail(emailValue);
        setUserId(res.data.userId);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '인증번호가 발송되었습니다.',
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error('백엔드 응답 에러', error);
      }
    }
  };

  // 인증번호 일치하는지 확인
  const handleNumCheck = async () => {
    console.log(code);

    if (code === certificationNumber) {
      setNotificationMessage(
        <span style={{ color: 'green' }}>인증번호가 일치합니다.</span>
      );
      setIdMessage(true);
    } else {
      setNotificationMessage(
        <span style={{ color: 'red' }}>인증번호 일치하지 않습니다.</span>
      );
    }
  };

  useEffect(() => {}, [certificationNumber]);

  return (
    <div className='wrapper'>
      <div className='find-template1'>
        <div className='loginDogether'>Dogether</div>
        <p className='maintext'> 아이디 찾기</p>
        <div className='findemail'>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='이메일을 입력하세요.'
          ></input>

          <button
            className='send-btn'
            onClick={handlerSendNumber}
          >
            인증번호 발송
          </button>
        </div>
        <div>
          <input
            id='certification-number'
            name='certification-number'
            type='number'
            placeholder='인증번호를 입력해주세요.'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></input>
          <div>
            <p className='changetext'>
              <span>{notificationMessage}</span>
            </p>
          </div>
        </div>
        <button
          className='find-btn'
          onClick={handleNumCheck}
        >
          확인
        </button>

        {idMessage && (
          <div>
            <p>{email} 님의 </p>
            <p>아이디는 {userId} 입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;
