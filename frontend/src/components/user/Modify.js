import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Modify.scss';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import { API_BASE_URL, USER } from '../../global/config/host-config';

import Swal from 'sweetalert2';

const Modify = () => {
  const redirection = useNavigate();

  // 기본 정보 상태
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  // 수정 가능한 정보 상태
  const [userPass, setUserPass] = useState('');
  const [checkUserPass, setCheckUserPass] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [postNo, setPostNo] = useState('');
  const [postAddr, setPostAddr] = useState('');

  // 정보 수정
  const postcodeInputRef = useRef(); //우편번호
  const addressInputRef = useRef(); //기본 주소
  const detailAddressInputRef = useRef(); // 상세주소
  const extraAddressInputRef = useRef(); //첨부주소

  // 비밀번호 유효성 검사
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUserPass, setIsUserPass] = useState(false);
  const validatePassword = (password) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return passwordRegExp.test(password);
  };

  // 비밀번호 확인  일치하는지
  const isPasswordConfirmed = userPass === checkUserPass;
  // 비밀번호 유효성 검사

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

  // 페이지 로드 시 사용자 정보 불러오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 사용자 정보 불러오기
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}${USER}/modify`,

        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );
      const { userId, userName, userPhone, postNo, postAddr } = res.data;
      setUserId(userId);
      setUserName(userName);
      setUserPhone(userPhone);
      setPostNo(postNo);
      setPostAddr(postAddr);
    } catch (error) {
      console.error('Error while fetching user info:', error);
    }
  };

  // 개인정보 변경 핸들러
  const handleChangeUserInfo = async (e) => {
    e.preventDefault();
    console.log('수정요청들어옴!');

    // 만약 "주소찾기" 버튼을 클릭했을 경우에는 추가 처리 없이 종료
    if (e.target.className.includes('address-btn')) {
      return;
    }

    if (!validatePassword(userPass) || !isPasswordConfirmed) {
      Swal.fire({
        icon: 'error',
        text: '비밀번호를 올바르게 입력해주세요',
      });
      return;
    }
    const formData = new FormData();
    formData.append('userPass', userPass);
    formData.append('userPhone', userPhone);
    formData.append('postAddr', postAddr);
    formData.append('postNo', postNo);

    try {
      const res = await axios.post(
        `${API_BASE_URL}${USER}/modifypass`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );

      console.log('넘어온 데이터 ', res.data);

      if (res.status === 200) {
        console.log('사용자 정보가 성공적으로 업데이트되었습니다:', res.data);
      }
    } catch (error) {
      console.error(
        '사용자 정보를 업데이트하는 중에 오류가 발생했습니다:',
        error
      );
    }

    let timerInterval;
    Swal.fire({
      title: '변경되었습니다. <b></b>',
      html: '로그인을 다시 해주세요 ',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
    redirection(`${USER}/login`);
  };

  // 주소 변경
  const handleOpenAddressModal = (e) => {
    e.preventDefault();
    console.log('주소찾기 요청들어옴');
    // Daum 주소 검색 모달 열기
    // eslint-disable-next-line no-undef
    new daum.Postcode({
      oncomplete: handleComplete,
    }).open();
  };

  const handleComplete = (data) => {
    let addr = '';
    let extraAddr = '';

    if (data.userSelectedType === 'R') {
      addr = data.roadAddress;
    } else {
      addr = data.jibunAddress;
    }

    if (data.userSelectedType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }

      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddr +=
          extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }

      if (extraAddr !== '') {
        extraAddr = ` (${extraAddr})`;
        extraAddressInputRef.current.value = extraAddr;
      } else {
        extraAddressInputRef.current.value = '';
      }
    } else {
      extraAddressInputRef.current.value = '';
    }

    console.log('Selected Postcode:', data);
    console.log('Selected zonecode:', data.zonecode);
    console.log('Selected Address:', addr);

    setPostNo(data.zonecode);
    setPostAddr(addr);

    detailAddressInputRef.current.focus();
  };

  return (
    <>
      <div className='mypage-fixed'>
        <div className='group-wrapper'>
          <div className='group'>
            <button className='mypage-tap'>
              <Link to='/user/mypage'>마이페이지</Link>
            </button>
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
          </div>
        </div>
      </div>
      <div className='userinfo-title'>
        <span className='text'> 개인정보변경</span>
      </div>
      <div className='joinform-box'>
        <form
          name='user'
          className='joinForm'
        >
          <div className='textFormf'>
            <input
              name='userId'
              type='text'
              className='id'
              placeholder={userId}
              readOnly
            ></input>
          </div>
          <div className={`textForm ${isPasswordValid ? '' : 'input-error'}`}>
            <input
              name='userPass'
              type='password'
              className='pw'
              value={userPass}
              onChange={handleUserPassChange}
              placeholder='비밀번호'
            />
            <span className='error-message'> {userPassMessage}</span>
          </div>
          <div className='textForm'>
            <input
              name='userPass'
              type='password'
              className='pwcheck'
              value={checkUserPass}
              onChange={(e) => {
                setCheckUserPass(e.target.value);
              }}
              placeholder='비밀번호 확인'
            />
          </div>
          <div className='textFormf '>
            <input
              name='userName'
              type='text'
              className='name'
              placeholder={userName}
              readOnly
            />
          </div>
          <div className='textForm'>
            <input
              name='userPhone'
              type='text'
              className='phone-num'
              value={userPhone}
              onChange={(e) => {
                setUserPhone(e.target.value);
              }}
              placeholder='핸드폰번호'
            />
          </div>
          <div className='postTextForm'>
            <input
              name='postNo'
              type='text'
              className='address'
              value={postNo}
              ref={postcodeInputRef}
              onChange={(e) => {
                setPostNo(e.target.value);
              }}
              placeholder='우편번호'
            />
            <button
              className='address-btn'
              onClick={handleOpenAddressModal}
            >
              주소찾기
            </button>
          </div>

          <div className='textForm'>
            <input
              name='postAddr'
              type='text'
              className='address'
              value={postAddr}
              ref={addressInputRef}
              onChange={(e) => {
                setPostAddr(e.target.value);
              }}
              placeholder='주소'
            />
          </div>
          <div className='addr'>
            <div className='addr1'>
              <input
                name='postAddr'
                type='text'
                className='address'
                ref={detailAddressInputRef}
                placeholder='상세주소(동, 호수)'
              />
            </div>
            <div className='addr2'>
              <input
                name='postAddr'
                type='text'
                className='address'
                ref={extraAddressInputRef}
                placeholder='참고항목'
              />
            </div>
          </div>

          <DaumPostcode
            className='daum'
            onComplete={handleComplete}
            autoClose
          />

          <input
            type='submit'
            className='btn'
            value='수정'
            onClick={handleChangeUserInfo}
          />
        </form>
      </div>
    </>
  );
};

export default Modify;
