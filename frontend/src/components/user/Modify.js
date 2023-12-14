import React from 'react';
import { Link } from 'react-router-dom';
import './Modify.scss';

const Modify = () => {
  return (
    <>
      <div className='mypage-fixed'>
        <div className='group-wrapper'>
          <div className='group'>
            <div className='overlap'>
              <button className='mypage-tap'>
                <Link to='/user/mypage'>마이페이지</Link>
              </button>
            </div>

            <img
              className='img'
              alt='Rectangle'
              src='https://cdn.animaapp.com/projects/656ec6d75c84f45c76814d5f/releases/6572de57df8c3c94cf99e02d/img/rectangle-42@2x.png'
            />
            <img
              className='line'
              alt='Line'
              src='https://cdn.animaapp.com/projects/656ec6d75c84f45c76814d5f/releases/6572de57df8c3c94cf99e02d/img/line-6.svg'
            />
            <button className='div'>
              <Link to='/user/modify'>개인정보변경</Link>
            </button>
            <button className='text-wrapper-3'>
              <Link to='/user/likelist'>좋아요목록</Link>
            </button>
            <button className='text-wrapper-2'>
              <Link to='/user/adoptionstatus'>입양신청현황</Link>
            </button>
          </div>
        </div>
      </div>
      <form
        action='/'
        method='POST'
        class='joinForm'
        onsubmit='DoJoinForm__submit(this); return false;'
      >
        <h1> 개인정보 변경</h1>
        <div class='textForm whiteSpace'>
          <input
            name='loginId'
            type='text'
            class='id'
            placeholder='hunmo0926'
            disabled
          ></input>
        </div>
        <div class='textForm'>
          <input
            name='loginPw'
            type='password'
            class='pw'
            placeholder='비밀번호'
          />
        </div>
        <div class='textForm'>
          <input
            name='loginPwConfirm'
            type='password'
            class='pw'
            placeholder='비밀번호 확인'
          />
        </div>
        <div class='textForm whiteSpace'>
          <input
            name='name'
            type='text'
            class='name'
            placeholder='이름'
          />
        </div>
        <div class='textForm2'>
          <input
            name='number'
            type='number'
            class='name'
            placeholder='핸드폰번호'
          />
        </div>
        <div class='textForm2'>
          <input
            name='email'
            type='text'
            class='address'
            placeholder='주소'
          />
        </div>
        <div class='textForm2 whiteSpace'>
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
    </>
  );
};

export default Modify;
