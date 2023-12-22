import React from 'react';
import { Link } from 'react-router-dom';
import './Modify.scss';

const Modify = () => {
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
        <form
          action='/'
          method='POST'
          class='joinForm'
          onsubmit='DoJoinForm__submit(this); return false;'
        >
          <div class='textForm'>
            <input
              name='userId'
              type='text'
              class='id'
              placeholder='hunmo0926'
              readOnly
            ></input>
          </div>
          <div class='textForm'>
            <input
              name='userPass'
              type='password'
              class='pw'
              placeholder='비밀번호'
            />
          </div>
          <div class='textForm'>
            <input
              name='userPass'
              type='password'
              class='pwcheck'
              placeholder='비밀번호 확인'
            />
          </div>
          <div class='textForm '>
            <input
              name='userName'
              type='text'
              class='name'
              placeholder='나춘식'
              readOnly
            />
          </div>
          <div class='textForm'>
            <input
              name='userPhone'
              type='number'
              class='phone-num'
              placeholder='핸드폰번호'
            />
          </div>
          <div class='textForm'>
            <input
              name='postNo '
              type='text'
              class='address'
              placeholder='우편주소'
            />
          </div>
          <div class='textForm'>
            <input
              name='postAddr'
              type='text'
              class='address'
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
