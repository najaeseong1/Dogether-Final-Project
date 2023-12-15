import { Button } from '@mui/material';
import React from 'react';
import './Join.scss';

const Join = () => {
  return (
    <div className="JoinTemplate1">
      <div className="JoinDogether">Dogether</div>
      <form className="JoinForm">
        <input
          type="text"
          id="id"
          placeholder="아이디를 입력해주세요"
        />
        <Button>아이디 중복확인</Button>
        <br />
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <br />
        <input
          type="password"
          id="password-check"
          placeholder="비밀번호를 확인."
        />
        <br />
        <input
          type="text"
          id="email"
          placeholder="이메일"
        />
        <Button>인증메일 발송</Button>
        <br />
        <input
          type="text"
          id="emailcheck"
          placeholder="메일 인증번호"
        />
        <Button>이메일 인증확인</Button>
        <br />
        <input
          type="text"
          id="name"
          placeholder="이름"
        />
        <br />
        <input
          type="text"
          id="phone"
          placeholder="전화번호"
        />
        <br />

        <button type="submit">회원가입</button>
        <button type="button">뒤로가기</button>
      </form>
    </div>
  );
};

export default Join;
//     <div className='joinmain'>

//       <div className='joinmsg'>회원가입</div>
      
//       <div className='feelsudiv'>필수 정보 입력</div>

//       <form action='#'>
//       <div className='iddiv'>
//         <input type='text' placeholder='아이디를 입력하세요.'></input>
//       </div>

//       <div className='joogbok1'>아이디가 중복됩니다. 다시 입력하세요.</div>

//       <div className='idcheckbtn'>
//         <button>아이디 중복확인</button>
//       </div>

//       <div className='passworddiv'>
//         <input type='password' placeholder='비밀번호를 입력하세요.'></input>
//       </div>

//       <div className='passwordcheck'>
//         <input type='password' placeholder='비밀번호 확인.'></input>
//       </div>

//       <div className='joogbok2'>비밀번호가 일치합니다.</div>

//       <div className='emailinput'>
//         <input type='email' placeholder='이메일을 입력하세요.'></input>
//       </div>

//       <div className='joogbok3'>이메일이 발송되었습니다.</div>

//       <div className='emailsendbtn'> 
//        <button>이메일 발송받기</button> 
//       </div>

//       <div className='emailinput2'>
//         <input type='email' placeholder='인증메일을 입력하세요.'></input>
//       </div>

//       <div className='joogbok4'>인증메일이 일치하지 않습니다.</div>

//       <div className='emailcheckbtn'> 
//        <button>이메일 발송받기</button> 
//       </div>

//       <div className='namediv'>
//         <input type='text' placeholder='이름을 입력하세요.'></input>
//       </div>

//       <div className='phonediv'>
//         <input type='text' placeholder='전화번호를 입력하세요.'></input>
//       </div>

//       <div className='feelsudiv2'>주소 정보 입력</div>

//       </form>
//     </div>

//   )
// }

// export default Join
