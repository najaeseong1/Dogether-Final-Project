import React, { useRef, useState } from "react";
import "./Join.scss";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

const Join = () => {

  const redirect = useNavigate();
  

  // 초기값 세팅 (아이디(이메일?))
  const [id, setId] = useState(""); //아이디
  const [password, setPassword] = useState(""); //비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); //비밀번호 확인
  const [email, setEmail] = useState(""); //이메일
  const [emailCheck, setEmailCheck] = useState(""); //이메일 확인
  const [nickname, setNickName] = useState(""); //이름
  const [phone, setPhone] = useState(""); // 휴대전화번호
  const [postcode, setPostcode] = useState("")
  const [address, setAddress] = useState("")
  const [detailAddress, setDetailAddress] = useState("")
  const [extraAddress, setExtraAddress] = useState("")
  
  const postcodeInputRef = useRef(); //우편번호
  const addressInputRef = useRef(); //기본 주소
  const detailAddressInputRef = useRef(); // 상세주소
  const extraAddressInputRef = useRef(); //첨부주소
  
  // const [postcode, setPostcode] = useState(""); //우편번호 (04108)
  // const [address, setAddress] = useState(""); //기본주소 (서울 마포구 백범로 23)
  // const [selectedAddress, setSelectedAddress] = useState(""); //상세주소 (사용자가 직접 입력)
  // const [refAddress, setRefAddress] = useState(""); //첨부주소(목동, 청담동)


  // 오류 메세지 상태 저장
  const [idMessage, setIdMessage] = useState("");
  const [nickNameMessage, setnickNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  


  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  //const [isaddress, setIsAddress] = useState(false);

    // 아이디 유효성 검사 
    const onChangeId = (e) => {
      const currentId = e.target.value;
      setId(currentId);
      
      const idRegExp = /^[a-zA-z0-9]{4,12}$/;
      

        if(!idRegExp.test(currentId)){
          setIdMessage("아이디는 12~15글자만 입력해주세요");
          setIsId(false);
        } else {
          setIdMessage("사용 가능한 아이디입니다.");
          setIsId(true);
        }
        };

        // 이름 유효성 검사
        const onChangeNickName = (e) => {
          const currentNickName = e.target.value;
          setNickName(currentNickName);

          if(currentNickName.length < 2 || currentNickName.length > 5) {
            setnickNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
            setIsNickName(false);
          } else {
            setnickNameMessage("사용 가능한 이름 입니다.");
            setIsNickName(true);
          }
        };
        
        // 비밀번호 유효성 검사
        const onChangePassword = (e) => {
          const currentPassword = e.target.value;
          setPassword(currentPassword);
          const passwordRegExp = 
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
          if(!passwordRegExp.test(currentPassword)) {
            setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsPassword(false);
          } else {
            setPasswordMessage("사용 가능한 비밀번호 입니다.");
            setIsPassword(true);
          }
        };

        // 비밀번호 확인 유효성 검사
        const onChangePasswordCheck = (e) => {
          const currentPasswordCheck = e.target.value;
          setPasswordCheck(currentPasswordCheck);
          if (password !== currentPasswordCheck) {
            setPasswordCheckMessage("비밀번호가 일치하지 않습니다.!");
            setIsPasswordCheck(false);
          } else {
            setPasswordCheckMessage("비밀번호가 일치합니다.");
            setIsPasswordCheck(true);
          }
        };
        
        // 이메일 확인 유효성 검사
        const onChangeEmailcheck = (e) => {
          const currentEmailCheck = e.target.value;
          setEmailCheck(currentEmailCheck);
          if(email !== currentEmailCheck) {
            setEmailCheckMessage("이메일이 일치하지 않습니다.!");
            setIsEmailCheck(false);
          }else {
            setEmailCheckMessage("이메일이 일치합니다.");
            setIsEmailCheck(true);
          }

        }
       
        // 이메일 유효성 검사
        const onChangeEmail = (e) => {
          const currentEmail = e.target.value;
          setEmail(currentEmail);
          const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
       
          if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다!");
            setIsEmail(false);
          } else {
            setEmailMessage("사용 가능한 이메일 입니다.");
            setIsEmail(true);
          }
        };

        // 휴대전화번호 유효성 검사
        const onChangePhone = (getNumber) => {
          const currentPhone = getNumber;
          setPhone(currentPhone);
          const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
       
          if (!phoneRegExp.test(currentPhone)) {
            setPhoneMessage("올바른 형식이 아닙니다! - 없이 숫자만 입력하세요.");
            setIsPhone(false);
          } else {
            setPhoneMessage("사용 가능한 휴대전화번호입니다.)");
            setIsPhone(true);
          }
        };
        
        const addHyphen = (e) => {
          const currentNumber = e.target.value;
          setPhone(currentNumber);
          if (currentNumber.length === 3 || currentNumber.length === 8) {
            setPhone(currentNumber + "-");
            onChangePhone(currentNumber + "-");
          } else {
            onChangePhone(currentNumber);
          }
        };
      
        const onChangePostCode = (e) => {
          //const currentPostCode = e.target.value;
          setPostcode(e.target.value);
        };

        

        //회원가입 요청 처리 
      const onSubmit = async() => {
      console.log("ID:", id);
      console.log("Password:", password);
      console.log("Email:", email);
      console.log("ninkname:", nickname);
      console.log("phone:", phone);
      console.log("postcode:", postcode);
      console.log("address:", address);
      console.log("detailAddress:", detailAddress);
      console.log("extraAddress:", extraAddress);

      const res = await fetch("http://localhost:3000/user/join", {
        method: 'POST',
        body: JSON.stringify({
          id,
          password,
          email,
          nickname,
          phone,
          
        }),
      });

      if(res.status ===200) {
        alert('회원가입이 완료되었습니다.');
        redirect('/user/login');
      } else {
        alert('서버와의 통신이 원활하지 않습니다.')
      }
    };

    // const onSubmit = (e) => {
    //   e.preventDefault();
    // }

   
    
    // const postcodeInputRef = useRef();
    // const addressInputRef = useRef();
    // const detailAddressInputRef = useRef();
    // const extraAddressInputRef = useRef();

  const handleOpenAddressModal = () => {
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
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
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

    postcodeInputRef.current.value = data.zonecode;
    addressInputRef.current.value = addr;
    detailAddressInputRef.current.focus();
  };




  return (
    <div className="joinmain">
      <div className="joinmsg">회원가입</div>
      

        {/* <form action='#'> */}
          <div className='iddiv'>
            <input
              type='text'
              placeholder='아이디를 입력하세요.'
            ></input>
          </div>

      {/* <form action="#"> */}
        <div className="iddiv">
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={onChangeId}
            placeholder="아이디를 입력하세요."
          ></input>
        </div>

        <div className="joogbokid">
          <p className={`message ${isId ? "blue-message" : "red-message"}`}>{idMessage}</p>
        </div>

        {/* <div className="idcheckbtn">
          <button>아이디 중복확인</button>
        </div> */}

        <div className="passworddiv">
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력하세요."
          ></input>
        </div>

        <div className="joogbokpassword"><p className={`message ${isPassword ? "blue-message" : "red-message"}`}>{passwordMessage}</p></div>

        <div className="passwordcheck">
          <input
            type="password"
            placeholder="비밀번호 확인."
            id="passwordcheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          ></input>
        </div>

        <div className="joogbokpasswordcheck"><p className={`message ${isPasswordCheck ? "blue-message" : "red-message"}`}>{passwordCheckMessage}</p></div>

        <div className="emailinput">
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            id="eamil"
            value={email}
            onChange={onChangeEmail}
          ></input>
        </div>

        <div className="joogbokemail"><p className={`message ${isEmail ? "blue-message" : "red-message"}`}>{emailMessage}</p></div>

          <div className='emailinput2'>
            <input
              type='email'
              placeholder='인증메일을 입력하세요.'
            ></input>
          </div>

        <div className="emailinput2">
          <input
            type="email"
            placeholder="인증메일을 입력하세요."
            id="email"
            value={emailCheck}
            onChange={onChangeEmailcheck}
          ></input>
        </div>

        <div className="joogbokemailcheck"><p className={`message ${isEmailCheck ? "blue-message" : "red-message"}`}>{emailCheckMessage}</p></div>

        <div className="emailcheckbtn">
          <button>이메일 인증확인</button>
        </div>

        <div className="namediv">
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={onChangeNickName}
            placeholder="이름을 입력하세요."
          ></input>
        </div>

        <div className="joogbokname"><p className={`message ${isNickName ? "blue-message" : "red-message"}`}>{nickNameMessage}</p></div>

        <div className="phonediv">
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={addHyphen}
            placeholder="전화번호를 입력하세요."
          ></input>
        </div>
        
          <div className="joogbokphone"><p className={`message ${isPhone ? "blue-message" : "red-message"}`}>{phoneMessage}</p></div>

        <div className="feelsudiv2">주소 입력</div>

        <div>
          <div className="postdiv">
            <input
              type="text"
              id="sample6_postcode"
              placeholder="우편번호"
              ref={postcodeInputRef}
              value={postcode}
              onChange={onChangePostCode}
              readOnly
            />
          </div>

          <div className="postbtn">
            <input
              type="button"
              onClick={handleOpenAddressModal}
              value="우편번호 찾기"
            /><br />
            </div>
        <div className="addrdiv">
            <input
              type="text"
              id="sample6_address"
              placeholder="주소"
              ref={addressInputRef}
              value={address}        
              readOnly
            /><br />
            </div>
        <div className="addrdetaildiv">
          <input
            type="text"
            id="sample6_detailAddress"
            placeholder="상세주소"
            ref={detailAddressInputRef}
            // value={detailAddress}
          />
        </div>
        <div className="refaddrdiv">
          <input
            type="text"
            id="sample6_extraAddress"
            placeholder="참고항목"
            ref={extraAddressInputRef}
            value={extraAddress}
            readOnly
          />
        </div>
      {/*
        리액트에서는 외부 라이브러리와 연동할 때, ref 또는 state를 사용하여 상태를 업데이트하고,
        이에 따라 화면이 자동으로 업데이트되도록 하는 것이 좋습니다.
      */}
      <DaumPostcode
      className="daum"
        onComplete={handleComplete}
        autoClose
      />
    </div>

        <div className="feelsudiv3">약관 동의</div>

        <div className="dongebtn"><input type="checkbox"></input>&nbsp;&nbsp;전체동의</div>

        <div className="dongetext">
          [필수]   개인정보 수집 및 이용 약관 <br/>
        </div>

        <div className="dongebtn2">
        <input type="checkbox" ></input>&nbsp;&nbsp;동의
        </div>

        <div className="lastjoinbtn">
          <button onClick={onSubmit}>회원가입</button>
        </div>

       {/* </form>  */}
      
    </div>
  );
};

export default Join;