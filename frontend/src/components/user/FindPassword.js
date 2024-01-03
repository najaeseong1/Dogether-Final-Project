import React, { useEffect, useState } from 'react';
import './FindPassword.scss';
import { EmailCheck } from '../../global/EmailCheck';
import { API_BASE_URL, USER } from '../../global/config/host-config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ErrorAlert2, SuccessAlert2 } from '../../global/Alerts';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const redirection = useNavigate();
  const toLink = (loc) => {
    redirection(loc);
  };
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

  // 이메일 입력하지 않았을 때
  const [findPWText, setFindPWText] = useState('');

  // 비밀번호 변경
  const [userPass, setUserPass] = useState('');
  const [userPassCheck, setUserPassCheck] = useState('');

  // 비밀번호 일치하지않으면 변경 버튼 비활성화
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [message, setMessage] = useState('');

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return passwordRegExp.test(password);
  };

  // 비밀번호 유효성 검사
  const [isUserPass, setIsUserPass] = useState(false);
  const [userPassMessage, setUserPassMessage] = useState('');

  const handleUserPassChange = (e) => {
    const newPassword = e.target.value;
    const isValidPassword = validatePassword(newPassword);

    setUserPass(newPassword);

    if (!isValidPassword) {
      setUserPassMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
    } else {
      setUserPassMessage('');
    }

    setIsUserPass(isValidPassword);
  };
  // 이메일 입력값
  const handlerSendNumber = async () => {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;

    if (!EmailCheck(emailValue)) {
      alert('이메일을 정확하게 입력해주세요');
      return;
    } else {
      try {
        const res = await axios.post(`${API_BASE_URL}/user/findid`, {
          email: emailValue,
        });
        console.log(res.data.code);

        setcertificationNumber(res.data.code);
        setEmail(emailValue);
        setUserId(res.data.userId);

        SuccessAlert2(
          '인증번호가 발송되었습니다. <br/> 인증번호가 오지 않으면' +
            ' 입력하신 회원 정보와 일치하는지 확인해주세요 '
        );
      } catch (error) {
        console.error('백엔드 응답 에러', error);
        SuccessAlert2(
          '인증번호가 발송되었습니다. <br/> 인증번호가 오지 않으면' +
            ' 입력하신 회원 정보와 일치하는지 확인해주세요 '
        );
      }
    }
  };

  // 인증번호 일치하는지 확인
  const handleNumCheck = async () => {
    if (code === certificationNumber) {
      setNotificationMessage(
        <span style={{ color: 'green' }}>인증번호가 일치합니다.</span>
      );
      setIdMessage(true);
      setbuttonDisabled(false);
      setIdMessage(true);
    } else {
      setNotificationMessage(
        <span style={{ color: 'red' }}>인증번호 일치하지 않습니다.</span>
      );
      setIdMessage(false);
      setbuttonDisabled(true);
    }
  };
  // 비밀번호 변경
  const changePassword = async () => {
    if (userPass !== userPassCheck) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/user/modifypass`, {
        userId: userId,
        userPass: userPass,
      });
      if (res.status === 200) {
        SuccessAlert2('비밀번호가 성공적으로 변경되었습니다.');
        toLink(`${USER}/login`);
      } else {
        ErrorAlert2('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [certificationNumber]);
  return (
    <div className='wrapper'>
      <div className='find-password'>
        <div className='loginDogether'>Dogether</div>
        <p className='maintext'> 비밀번호 찾기 </p>

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
            <p className='changetext'>{notificationMessage}</p>
          </div>
        </div>
        <button
          className='find-btn'
          onClick={handleNumCheck}
        >
          확인
        </button>
        {idMessage && (
          <div className='checkNum'>
            <input
              id='userPass'
              name='userPass'
              type='password'
              placeholder='새로운 비밀번호를 입력하세요.'
              value={userPass}
              onChange={handleUserPassChange}
            ></input>
            <p className='error-message'> {userPassMessage}</p>
            <input
              id='userPassCheck'
              name='userPassCheck'
              type='password'
              placeholder='새로운 비밀번호를 다시 입력하세요.'
              value={userPassCheck}
              onChange={(e) => setUserPassCheck(e.target.value)}
            />
            <p className='changepassowordtext'>{message}</p>

            <button
              className='change-btn'
              onClick={changePassword}
              disabled={!isUserPass}
            >
              비밀번호 변경
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindPassword;
