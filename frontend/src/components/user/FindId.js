import React, { useState } from 'react';
import './FindId.scss';
import { FaRegCheckCircle } from 'react-icons/fa';

const FindId = () => {
  const [certificationNumber, setcertificationNumber] = useState(false);

  // 인증번호 메시지
  const [notificationMessage, setNotificationMessage] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const handlerSendNumber = (e) => {
    const emailValue = e.target.value;

    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9][@]{1}[A-Za-z0-9]+[A-Za-z0-9][.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(emailValue)) {
      setNotificationMessage('이메일을 정확하게 입력해주세요');
    } else {
      setNotificationMessage('');
    }

    setEmailValue(emailValue);
  };

  const handlecertificationNumber = (e) => {
    const enteredNumber = e.target.value;

    const correctCertificationNumber = '123456';
    console.log('인증번호 :', correctCertificationNumber);
    const isCorrect = enteredNumber === correctCertificationNumber;

    setcertificationNumber(isCorrect);
  };

  return (
    <div className='wrapper'>
      <div className='find-template1'>
        <div className='loginDogether'>Dogether</div>
        <p className='maintext'> 아이디 찾기</p>
        <div className='findid'>
          <input
            id='email'
            name='email'
            type='text'
            placeholder='이메일을 입력하세요.'
          ></input>

          <button
            className='send-btn'
            onClick={handlerSendNumber}
          >
            인증번호 발송
          </button>
          {notificationMessage && (
            <div className='notification'>{notificationMessage}</div>
          )}
        </div>

        <div>
          <input
            id='certification-number'
            name='certification-number'
            type='number'
            placeholder='인증번호를 입력해주세요.'
            onChange={handlecertificationNumber}
          ></input>
          <div>
            <p
              className={`changetext ${certificationNumber ? 'green' : 'red'}`}
            >
              {certificationNumber ? (
                <>
                  <FaRegCheckCircle />
                  <span> 인증번호가 일치합니다.</span>
                </>
              ) : (
                '인증번호가 일치하지 않습니다.'
              )}
            </p>
          </div>
        </div>
        <button className='find-btn'>확인</button>
      </div>
    </div>
  );
};

export default FindId;
