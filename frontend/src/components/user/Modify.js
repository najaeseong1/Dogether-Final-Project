import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Modify.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../global/config/host-config';

const Modify = () => {
  // 기본 정보 상태
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  // 수정 가능한 정보 상태
  const [userPass, setUserPass] = useState('');
  const [checkUserPass, setCheckUserPass] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [postNo, setPostNo] = useState('');
  const [postAddr, setPostAddr] = useState('');

  // 페이지 로드 시 사용자 정보 불러오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 사용자 정보 불러오기
  const fetchUserInfo = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/user/modify`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );
      console.log('User Info:', res.data);
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

  // 비밀번호 변경 핸들러
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (userPass !== checkUserPass) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/user/modify`,
        {
          password: userPass,
          userPhone: userPhone,
          postAddr: postAddr || '',
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );

      console.log('Password changed successfully:', res.data);
      if (res.data.code === 'success') {
        alert('비밀번호가 변경되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error while changing password:', error);
    }
  };

  // 개인정보 수정 핸들러
  /* const handleModify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`${API_BASE_URL}/user/modify`, {
        password: '1010101010!!',
        phone: userPhone,
        post_addr: postAddr,
      });

      if (res.status === 200) {
        alert('개인정보가 성공적으로 수정되었습니다.');
      } else {
        alert('개인정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error while modifying user info:', error);
    }
  };
  */

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
            <button className='like-list-tap'>
              <Link to='/user/likelist'>좋아요목록</Link>
            </button>
            <button className='text-wrapper-2'>
              <Link to='/user/adoptionstatus'>입양신청현황</Link>
            </button>
          </div>
        </div>
      </div>
      <div className='userinfo-title'>
        <span className='text'> 개인정보변경</span>
      </div>
      <div className='joinform-box'>
        <form className='joinForm'>
          <div class='textFormf'>
            <input
              name='userId'
              type='text'
              class='id'
              placeholder={userId}
              readOnly
            ></input>
          </div>
          <div class='textForm'>
            <input
              name='userPass'
              type='password'
              class='pw'
              value={userPass}
              onChange={(e) => setUserPass(e.target.value)}
              placeholder='비밀번호'
            />
          </div>
          <div class='textForm'>
            <input
              name='userPass'
              type='password'
              class='pwcheck'
              value={checkUserPass}
              onChange={(e) => setCheckUserPass(e.target.value)}
              placeholder='비밀번호 확인'
            />
          </div>
          <div class='textFormf '>
            <input
              name='userName'
              type='text'
              class='name'
              placeholder={userName}
              readOnly
            />
          </div>
          <div class='textForm'>
            <input
              name='userPhone'
              type='text'
              class='phone-num'
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder='핸드폰번호'
            />
          </div>
          <div class='textForm'>
            <input
              name='postNo '
              type='text'
              class='address'
              value={postNo}
              onChange={(e) => setPostNo(e.target.value)}
              placeholder='우편주소'
            />
          </div>
          <div class='textForm'>
            <input
              name='postAddr'
              type='text'
              class='address'
              value={postAddr}
              onChange={(e) => setPostAddr(e.target.value)}
              placeholder='주소'
            />
          </div>
          <div class='textForm'>
            <input
              name='payment'
              type='text'
              class='payment '
              placeholder='결제수단등록'
            />
            <input placeholder='카카오뱅크 1234 **** **** ****' />
          </div>
          <input
            onClick={handleChangePassword}
            type='submit'
            class='btn'
            value='수정'
          />
        </form>
      </div>
    </>
  );
};

export default Modify;
