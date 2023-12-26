import React, { useEffect, useRef, useState } from "react";
import "./Join.scss";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

const Join = () => {
  

  const redirect = useNavigate();
  const API_URL_USER = 'http://localhost:8181/user/join';

  // 초기값 세팅 (아이디(이메일?))
  const [userId, setUserId] = useState(""); //아이디
  const [userPass, setUserPass] = useState(""); //비밀번호
  const [userPassCheck, setUserPassCheck] = useState(""); //비밀번호 확인
  const [userEmail, setUserEmail] = useState(""); //이메일
  //const [emailCheck, setEmailCheck] = useState(""); //이메일 확인
  const [userName, setUserName] = useState(""); //이름
  const [userPhone, setUserPhone] = useState(""); // 휴대전화번호
  const [postNo, setPostNo] = useState("") //우편번호 (04108)
  const [postAddr, setPostAddr] = useState(""); //기본주소 (서울 마포구 백범로 23)
  const [detailAddress, setDetailAddress] = useState(""); //상세주소 (사용자가 직접 입력)
  const [extraAddress, setExtraAddress] = useState(""); //첨부주소(목동, 청담동)

  const [allCheckBox, setAllCheckBox] =useState(false); // 약관동의 전체체크 여부
  const [agreeCheckBox, setAgreeCheckBox] =useState(false); //선택동의 체크 여부
  const [mustCheckbox, setMustCheckBox] =useState(false); //필수동의 체크 여부

  
  const postcodeInputRef = useRef(); //우편번호
  const addressInputRef = useRef(); //기본 주소
  const detailAddressInputRef = useRef(); // 상세주소
  const extraAddressInputRef = useRef(); //첨부주소
  
  // const [postcode, setPostcode] = useState(""); //우편번호 (04108)
  // const [address, setAddress] = useState(""); //기본주소 (서울 마포구 백범로 23)
  // const [selectedAddress, setSelectedAddress] = useState(""); //상세주소 (사용자가 직접 입력)
  // const [refAddress, setRefAddress] = useState(""); //첨부주소(목동, 청담동)


  // 오류 메세지 상태 저장
  const [userIdMessage, setUserIdMessage] = useState("");
  const [UserNameMessage, setUserNameMessage] = useState("");
  const [userPassMessage, setUserPassMessage] = useState("");
  const [userPassCheckMessage, setUserPassCheckMessage] = useState("");
  const [userEmailMessage, setUserEmailMessage] = useState("");
  const [UserEmailCheckMessage, setUserEmailCheckMessage] = useState("");
  const [userPhoneMessage, setUserPhoneMessage] = useState("");
  


  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isUserPass, setIsUserPass] = useState(false);
  const [isUserPassCheck, setIsUserPassCheck] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [isUserEmailCheck, setIsUserEmailCheck] = useState(false);
  const [isUserPhone, setIsUserPhone] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  

    // 아이디 유효성 검사 
    // const onChangeId = (e) => {
    //   const currentId = e.target.value;
    //   setUserId(currentId);
      
    //   const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    //     if(!idRegExp.test(currentId)){
    //       setUserIdMessage("아이디는 12~15글자만 입력해주세요");
    //       setIsUserId(false);
    //     } else {
    //       setUserIdMessage("사용 가능한 아이디입니다.");
    //       setIsUserId(true);
    //     }
    //     };
    
    //회원가입 아아디 체크
    // const checkDuplicateId = async (userId) => {
    //   try {
    //     const response = await fetch(`http://localhost:8181/user/checkId?userId=${userId}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
        
    //     if (!response.ok) {
    //       // throw new Error('서버 응답이 실패했습니다.');
    //       throw new Error(`서버 응답이 실패했습니다. 상태 코드: ${response.status}`);
    //     }
    
    //     const result = await response.json();
    //     return result.isDuplicate;
    //   } catch (error) {
    //     console.error(error);
    //     return false; // 중복 확인 중 에러가 발생하면 기본적으로 중복되지 않음으로 처리
    //   }
    // };

    const checkDuplicateId = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8181/user/checkId?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          // throw new Error('서버 응답이 실패했습니다.');
          throw new Error(`서버 응답이 실패했습니다. 상태 코드: ${response.status}`);
        }
        const result_1 = await response.json();
        return result_1.isDuplicate;
      } catch (error) {
        console.error(error);
        return false;
      }
    };
    
    
    const onChangeId = async (e) => {
      const currentId = e.target.value;
      setUserId(currentId);
    
      const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
    
      if (!idRegExp.test(currentId)) {
        setUserIdMessage('아이디는 12~15글자만 입력해주세요');
        setIsUserId(false);
      } else {
        setUserIdMessage('사용 가능한 아이디입니다.');
    
        // 중복 확인 요청
        const isDuplicate = await checkDuplicateId(currentId);
    
        if (isDuplicate) {
          setUserIdMessage('이미 사용 중인 아이디입니다.');
          setIsUserId(false);
        } else {
          setUserIdMessage('사용 가능한 아이디입니다.');
          setIsUserId(true);
        }
      }
    };


        // 이름 유효성 검사
        const onChangeNickName = (e) => {
          const currentNickName = e.target.value;
          setUserName(currentNickName);

          if(currentNickName.length < 2 || currentNickName.length > 5) {
            setUserNameMessage("이름은 2글자 이상 5글자 이하로 입력해주세요!");
            setIsUserName(false);
          } else {
            setUserNameMessage("사용 가능한 이름 입니다.");
            setIsUserName(true);
          }
        };
        
        // 비밀번호 유효성 검사
        const onChangePassword = (e) => {
          const currentPassword = e.target.value;
          setUserPass(currentPassword);
          const passwordRegExp = 
          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
          if(!passwordRegExp.test(currentPassword)) {
            setUserPassMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
            setIsUserPass(false);
          } else {
            setUserPassMessage("사용 가능한 비밀번호 입니다.");
            setIsUserPass(true);
          }
        };

        // 비밀번호 확인 유효성 검사
        const onChangePasswordCheck = (e) => {
          const currentPasswordCheck = e.target.value;
          setUserPassCheck(currentPasswordCheck);
          if (userPass !== currentPasswordCheck) {
            setUserPassCheckMessage("비밀번호가 일치하지 않습니다.!");
            setIsUserPassCheck(false);
          } else {
            setUserPassCheckMessage("비밀번호가 일치합니다.");
            setIsUserPassCheck(true);
          }
        };

        
      
       
        // 이메일 유효성 검사
        const onChangeEmail = (e) => {
          const currentEmail = e.target.value;
          setUserEmail(currentEmail);
          const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
       
          if (!emailRegExp.test(currentEmail)) {
            setUserEmailMessage("이메일의 형식이 올바르지 않습니다!");
            setIsUserEmail(false);
          } else {
            setUserEmailMessage("사용 가능한 이메일 입니다.");
            setIsUserEmail(true);
          }
        };

        // 휴대전화번호 유효성 검사
        const onChangePhone = (getNumber) => {
          const currentPhone = getNumber;
          setUserPhone(currentPhone);
          const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
       
          if (!phoneRegExp.test(currentPhone)) {
            setUserPhoneMessage("올바른 형식이 아닙니다! - 없이 숫자만 입력하세요.");
            setIsUserPhone(false);
          } else {
            setUserPhoneMessage("사용 가능한 휴대전화번호입니다.)");
            setIsUserPhone(true);
          }
        };
        
        const addHyphen = (e) => {
          const currentNumber = e.target.value;
          setUserPhone(currentNumber);
          if (currentNumber.length === 3 || currentNumber.length === 8) {
            setUserPhone(currentNumber + "-");
            onChangePhone(currentNumber + "-");
          } else {
            onChangePhone(currentNumber);
          }
        };
      
        const onChangePostCode = (e) => {
          //const currentPostCode = e.target.value;
          setPostNo(e.target.value);
        };

      
      // 이메일 발송 요청 처리
      // const onSendVerificationCode = async () => {
      //   try {
      //     // 이메일 주소를 서버에 전송
      //     const response = await fetch('http://localhost:8181/user/join/checkMailSend', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         userEmail,
      //       }),
      //     });

      //     if (response.status === 200) {
      //       const result = await response.json();
      //       if (result.success) {
      //         alert('이메일이 발송되었습니다. 인증번호를 확인하세요.');
      //       } else {
      //         alert('이메일 발송에 실패했습니다.');
      //       }
      //     } else {
      //       throw new Error('서버 응답이 실패했습니다.');
      //     }
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };

      
 

        //회원가입 요청 처리 
      const onSubmit = async() => {

      console.log("ID:", userId);
      console.log("Password:", userPass);
      console.log("Email:", userEmail);
      console.log("ninkname:", userName);
      console.log("phone:", userPhone);
      console.log("postcode:", postNo);
      console.log("address:", postAddr);
     

      const res = await fetch('http://localhost:8181/user/join', {
        method: 'POST',
        body: JSON.stringify({
          userId: '',
          userPass: '',
          userEmail: '',
          userName: '',
          userPhone: '',
          postNo: '',
          postAddr: '',
        }),
      });

      if(res.status ===200) {
        alert('회원가입이 완료되었습니다.');
        redirect('/user/login');
      } else {
        alert('서버와의 통신이 원활하지 않습니다.')
      }
    };

 
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

  // 전체동의 체크박스 핸들러
  const  handleAllCheck = () => {
    setAllCheckBox(!allCheckBox);
    setAgreeCheckBox(!allCheckBox);
    setMustCheckBox(!mustCheckbox);
  }
  //필수동의 체크박스 핸들러
  const handleMustCheck = () => {
    setMustCheckBox(!mustCheckbox);
  }
  //선택동의 체크박스 핸들러
  const handleAgreeCheck = () => {
    setAgreeCheckBox(!agreeCheckBox);
  }

  useEffect(() => {
    // 필수 동의와 동의 체크박스의 상태를 모은 배열을 만듭니다.
    const checkboxes = [mustCheckbox, agreeCheckBox];
    
    // 배열의 모든 요소가 true이면 전체동의 체크박스를 체크합니다.
    setAllCheckBox(checkboxes.every((checkbox) => checkbox === true));
  }, [mustCheckbox, agreeCheckBox]);


  return (
    <div className="joinmain">
      <div className="joinmsg">회원가입</div>
      

   
      {/* <form action="#"> */}
        <div className="iddiv">
          <input
            type="text"
            id="id"
            name="id"
            value={userId}
            onChange={onChangeId}
            placeholder="아이디를 입력하세요."
          ></input>
        </div>

        <div className="joogbokid">
          <p className={`message ${isUserId ? "blue-message" : "red-message"}`}>{userIdMessage}</p>
        </div>

        {/* <div className="idcheckbtn">
          <button>아이디 중복확인</button>
        </div> */}

        <div className="passworddiv">
          <input
            type="password"
            id="password"
            value={userPass}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력하세요."
          ></input>
        </div>

        <div className="joogbokpassword"><p className={`message ${isUserPass ? "blue-message" : "red-message"}`}>{userPassMessage}</p></div>

        <div className="passwordcheck">
          <input
            type="password"
            placeholder="비밀번호 확인."
            id="passwordcheck"
            value={userPassCheck}
            onChange={onChangePasswordCheck}
          ></input>
        </div>

        <div className="joogbokpasswordcheck"><p className={`message ${isUserPassCheck ? "blue-message" : "red-message"}`}>{userPassCheckMessage}</p></div>

        <div className="emailinput">
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            id="eamil"
            value={userEmail}
            onChange={onChangeEmail}
          ></input>
        </div>

        <div className="joogbokemail"><p className={`message ${isUserEmail ? "blue-message" : "red-message"}`}>{userEmailMessage}</p></div>

        <div className="emailcheckbtn">
          <button >이메일 발송받기</button>
        </div>
         

         <div className="emailinput2">
          <input
            type="email"
            placeholder="인증메일을 입력하세요."
            id="email"
            // value={userEmailCheck}
            // onChange={onChangeEmailcheck}
          ></input>
        </div> 

        {/* <div className="joogbokemailcheck"><p className={`message ${isEmailCheck ? "blue-message" : "red-message"}`}>{emailCheckMessage}</p></div> */}

        <div className="emailcheckbtn">
          <button>이메일 인증확인</button>
        </div>

        <div className="namediv">
          <input
            type="text"
            id="nickname"
            value={userName}
            onChange={onChangeNickName}
            placeholder="이름을 입력하세요."
          ></input>
        </div>

        <div className="joogbokname"><p className={`message ${isUserName ? "blue-message" : "red-message"}`}>{UserNameMessage}</p></div>

        <div className="phonediv">
          <input
            type="tel"
            id="phone"
            value={userPhone}
            onChange={addHyphen}
            placeholder="전화번호를 입력하세요."
          ></input>
        </div>
        
          <div className="joogbokphone"><p className={`message ${isUserPhone ? "blue-message" : "red-message"}`}>{userPhoneMessage}</p></div>

        <div className="feelsudiv2">주소 입력</div>

        <div>
          <div className="postdiv">
            <input
              type="text"
              id="sample6_postcode"
              placeholder="우편번호"
              ref={postcodeInputRef}
              value={postNo}
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
              value={postAddr}        
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

        <div className="dongebtn"><input type="checkbox"  onChange={handleAllCheck} checked={allCheckBox}></input>&nbsp;&nbsp;전체동의</div>

        <div className="dongetext">
          [필수]   개인정보 수집 및 이용 약관 <br/>
        </div>

        <div className="dongebtn2">
        <input type="checkbox" onChange={handleMustCheck} checked={mustCheckbox} ></input>&nbsp;&nbsp;동의
        </div>

        <div className="dongetext">
          [선택]   개인정보의 제3자 제공에 관한 사항 <br/>
        </div>

        <div className="dongebtn2">
        <input type="checkbox" onChange={handleAgreeCheck} checked={agreeCheckBox} ></input>&nbsp;&nbsp;동의
        </div>

        <div className="lastjoinbtn">
          <button type="submit"
           disabled={
            isUserPass === true &&
            isUserPassCheck === true &&
            isUserEmail === true &&
            isUserPhone === true &&
            mustCheckbox
            ? false
            :true
            }
             onClick={onSubmit}>회원가입</button>
        </div>

       {/* </form>  */}
      
    </div>
  );
};

export default Join;