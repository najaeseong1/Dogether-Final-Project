import React from 'react';
import './Join.scss';

const Join = () => {
  return (
    <div className='joinmain'>
      <div className='joinmsg'>회원가입</div>
      <div className='joinmain2'>
        <div className='feelsudiv'>필수 정보 입력</div>

        <form action='#'>
          <div className='iddiv'>
            <input
              type='text'
              placeholder='아이디를 입력하세요.'
            ></input>
          </div>

          <div className='joogbok1'>아이디가 중복됩니다. 다시 입력하세요.</div>

          <div className='idcheckbtn'>
            <button>아이디 중복확인</button>
          </div>

          <div className='passworddiv'>
            <input
              type='password'
              placeholder='비밀번호를 입력하세요.'
            ></input>
          </div>

          <div className='passwordcheck'>
            <input
              type='password'
              placeholder='비밀번호 확인.'
            ></input>
          </div>

          <div className='joogbok2'>비밀번호가 일치합니다.</div>

          <div className='emailinput'>
            <input
              type='email'
              placeholder='이메일을 입력하세요.'
            ></input>
          </div>

          <div className='joogbok3'>이메일이 발송되었습니다.</div>

          <div className='emailsendbtn'>
            <button>이메일 발송받기</button>
          </div>

          <div className='emailinput2'>
            <input
              type='email'
              placeholder='인증메일을 입력하세요.'
            ></input>
          </div>

          <div className='joogbok4'>인증메일이 일치하지 않습니다.</div>

          <div className='emailcheckbtn'>
            <button>이메일 발송받기</button>
          </div>

          <div className='namediv'>
            <input
              type='text'
              placeholder='이름을 입력하세요.'
            ></input>
          </div>

          <div className='phonediv'>
            <input
              type='tel'
              placeholder='전화번호를 입력하세요.'
            ></input>
          </div>

          <div className='feelsudiv2'>주소 입력</div>

          <div className='postdiv'>
            <input
              type='text'
              placeholder='우편 번호'
            ></input>
          </div>

          <div className='postbtn'>
            <button>검색</button>
          </div>

          <div className='addrdiv'>
            <input
              type='text'
              placeholder='기본 주소'
            ></input>
          </div>

          <div className='addrdetaildiv'>
            <input
              type='text'
              placeholder='상세 주소'
            ></input>
          </div>

          <div className='feelsudiv3'>약관 동의</div>

          <div className='dongebtn'>
            <input type='checkbox'></input>&nbsp;&nbsp;전체동의
          </div>

          <div className='dongetext'>
            [필수] 개인정보 수집 및 이용 약관 <br />
          </div>

          <div className='dongebtn2'>
            <input type='checkbox'></input>&nbsp;&nbsp;전체동의
          </div>

          <div className='lastjoinbtn'>
            <button>회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
