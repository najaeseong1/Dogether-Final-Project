import React, { useEffect, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import './cart.scss';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [postNo, setPostNo] = useState(''); //우편번호 (04108)
  const [postAddr, setPostAddr] = useState(''); //기본주소 (서울 마포구 백범로 23)
  const [detailAddress, setDetailAddress] = useState(''); //상세주소 (사용자가 직접 입력)
  const postcodeInputRef = useRef(); //우편번호
  const addressInputRef = useRef(); //기본 주소
  const detailAddressInputRef = useRef(); // 상세주소
  const extraAddressInputRef = useRef(); //첨부주소
  const [isSameAddress, setIsSameAddress] = useState(''); // 배송지 선택에 따라 창열리기
  const [quantityMap, setQuantityMap] = useState({});
  const redirection = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    const storedQuantityMap =
      JSON.parse(localStorage.getItem('quantityMap')) || {};
    const initializedQuantityMap = {};
    let totalPrice = 0;

    storedCartItems.forEach((item, index) => {
      initializedQuantityMap[index] = storedQuantityMap[index] || 1;

      // 총 상품 가격 계산
      const price = Number(item.price.replace(/[^0-9]/g, ''));
      totalPrice += initializedQuantityMap[index] * price;
    });

    setQuantityMap(initializedQuantityMap);

    // 총 상품 가격을 업데이트
    const updatedCartWithPrice = storedCartItems.map((item, index) => {
      const price = Number(item.price.replace(/[^0-9]/g, ''));
      return {
        ...item,
        totalPrice: initializedQuantityMap[index] * price,
      };
    });

    setCartItems(updatedCartWithPrice);

    localStorage.setItem('cartItems', JSON.stringify(updatedCartWithPrice));
    localStorage.setItem('quantityMap', JSON.stringify(initializedQuantityMap));
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const addToCart = (product) => {
    const updatedCart = [...cartItems, { ...product }];
    setCartItems(updatedCart);
    // 이미 해당 제품에 대한 수량이 있다면 기존 수량을 사용, 없다면 1로 초기화
    const newQuantityMap = {
      ...quantityMap,
      [cartItems.length]: quantityMap[cartItems.length] || 1,
    };
    setQuantityMap(newQuantityMap);

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    localStorage.setItem('quantityMap', JSON.stringify(newQuantityMap));
  };

  const removeFromCart = (index) => {
    Swal.fire({
      text: '선택하신 상품을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        const updatedCart = cartItems.filter((item, i) => i !== index);
        const updatedQuantityMap = {};
        // 삭제한 상품 이후의 상품만 수량 업데이트
        updatedCart.forEach((item, i) => {
          if (i >= index) {
            // 삭제한 상품 이후의 상품에 대해서만 수량을 업데이트
            updatedQuantityMap[i] = quantityMap[i + 1];
          } else {
            updatedQuantityMap[i] = quantityMap[i];
          }
        });

        setCartItems(updatedCart);
        setQuantityMap(updatedQuantityMap);

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        localStorage.setItem('quantityMap', JSON.stringify(updatedQuantityMap));

        const Toast = Swal.mixin({
          toast: true,
          position: 'center-center',
          showConfirmButton: false,
          timer: 1000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: '선택하신 상품이 삭제되었습니다.',
        });
      }
    });
  };

  const changeAmountHandler = (newAmount, index) => {
    const newQuantityMap = { ...quantityMap, [index]: newAmount };
    setQuantityMap(newQuantityMap);

    const updatedCart = cartItems.map((item, i) => {
      if (i === index) {
        const price = Number(item.price.replace(/[^0-9]/g, ''));
        return {
          ...item,
          totalPrice: newAmount * price,
        };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    localStorage.setItem('quantityMap', JSON.stringify(newQuantityMap));
  };

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

    postcodeInputRef.current.value = data.zonecode;
    addressInputRef.current.value = addr;
    detailAddressInputRef.current.focus();
  };
  const onChangePostCode = (e) => {
    //const currentPostCode = e.target.value;
    setPostNo(e.target.value);
  };

  const handleAddressTypeChange = (e) => {
    console.log(e.target.value);
    setIsSameAddress(e.target.value);
  };
  const shoppinghandler = () => {
    redirection('/product');
  };

  return (
    <div className='cartListTemplate'>
      <div className='cart_title'>SHOPPINNG CART</div>
      {cartItems.length === 0 ? (
        <div>
          <div className='empty_Class'>
            <img
              src='https://pethroom.com/pethroom/images/PR_web_fixed_empty.png'
              style={{ width: '300px', height: '400px' }}
            />
            <div>아직 담은 상품이 없어요.</div>
            <button onClick={() => shoppinghandler()}>Continue Shopping</button>
            <spn></spn>
          </div>
        </div>
      ) : (
        <>
          <table className='Carthistory_table'>
            <thead>
              <tr className='Carthistory_tr'>
                <th>이미지</th>
                <th>상품 정보</th>
                <th>수량</th>
                <th>주문금액</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.img}
                      alt='Product Image'
                      style={{ width: '80x', height: '85px' }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      className='amountbutton'
                      onClick={() =>
                        changeAmountHandler(quantityMap[index] - 1, index)
                      }
                    >
                      -
                    </button>
                    <span>{quantityMap[index]}</span>
                    <button
                      className='amountbutton'
                      onClick={() =>
                        changeAmountHandler(quantityMap[index] + 1, index)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>{item.totalPrice}원</td>
                  <td>
                    <button
                      className='cartcancle'
                      onClick={() => removeFromCart(index)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='cartSummaryContainer'>
            <table className='cartSummary'>
              <thead>
                <tr>
                  <th>총 상품 금액</th>
                  <th>배송비</th>
                  <th>총 결제 비용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {cartItems.reduce(
                      (total, item) => total + item.totalPrice,
                      0
                    )}
                    원
                  </td>
                  <td>+ 3000원</td>
                  <td>
                    =
                    {cartItems.reduce(
                      (total, item) => total + item.totalPrice,
                      0
                    ) + 3000}
                    원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='orderTemplate'>
            <div className='cart_title'>ORDER</div>
            <div className='deliInfo'>배송정보</div>

            <table className='orderTable'>
              <tbody>
                <tr>
                  <th scope='row'>이름</th>
                  <td>
                    <input
                      type='text'
                      id='name'
                    ></input>
                  </td>
                </tr>
                <tr>
                  <th scope='row'>연락처</th>
                  <td>
                    <input
                      type='text'
                      id='phoneNum'
                    ></input>
                    <ul>
                      <li> '-'(하이픈)을 빼고 번호만 입력해주세요.</li>
                      <li> - 연락처를 통해 주문처리과정을 보내드립니다.</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope='row'>이메일</th>
                  <td>
                    <input
                      type='text'
                      id='phoneNum'
                    ></input>
                    <ul>
                      <li> - 이메일을 통해 주문처리과정을 보내드립니다.</li>
                      <li>
                        - 이메일 주소란에는 반드시 수신가능한 이메일주소를
                        입력해 주세요.
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope='row'>배송지 선택</th>
                  <td>
                    <input
                      type='radio'
                      id='sameAddr'
                      name='addrType'
                      value='sameAddr'
                      onClick={handleAddressTypeChange}
                    ></input>
                    <label
                      for='sameAddr'
                      className='addrInfo'
                    >
                      주문자 정보와 동일
                    </label>
                    <input
                      type='radio'
                      id='newAddr'
                      name='addrType'
                      value='newAddr'
                      onClick={handleAddressTypeChange}
                    ></input>
                    <label
                      for='newAddr'
                      className='addrInfo'
                    >
                      새로운 배송지
                    </label>
                  </td>
                </tr>
                <tr>
                  <th scope='row'>주소</th>
                  <td>
                    <input
                      type='text'
                      id='postAddr'
                      ref={postcodeInputRef}
                      value={postNo}
                      onChange={onChangePostCode}
                    ></input>
                    {isSameAddress === 'newAddr' && (
                      <button onClick={handleOpenAddressModal}>우편번호</button>
                    )}
                    <br />
                    <input
                      type='text'
                      placeholder='기본주소'
                      className='addr'
                      value={postAddr}
                      ref={addressInputRef}
                      style={{ width: '700px' }}
                    ></input>
                    <br />
                    {isSameAddress === 'newAddr' && (
                      <input
                        type='text'
                        placeholder='상세주소'
                        className='addr'
                        value={detailAddress}
                        ref={detailAddressInputRef}
                        style={{ width: '700px' }}
                      ></input>
                    )}
                    <ul>
                      <li>
                        - (상세주소(동, 호수)를 제대로 기재하셨나요? 주소가
                        올바르지 않을 시에는 반송위험이 있습니다. )
                      </li>
                    </ul>
                  </td>
                  <DaumPostcode
                    className='daum'
                    onComplete={handleComplete}
                    autoClose
                  />
                </tr>
                <tr>
                  <th scope='row'>배송메시지</th>
                  <td>
                    <textarea cols='70' />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='paymentTemplate'>
              <div
                className='deliInfo'
                id='paymentsubtitle'
              >
                결제수단
              </div>

              <table className='paymentTable'>
                <tbody>
                  <tr>
                    <td>토스 자리</td>
                    <td
                      rowSpan={3}
                      id='rowspan3'
                      style={{ padding: '0' }}
                    >
                      <div className='finalPrice'> 최종 결제 금액</div>
                      <div id='paymentPrice'>50800원</div>
                      <br />
                      <div
                        id='centerPay'
                        style={{ textAlign: 'center' }}
                      >
                        <button className='orderbutton'>결제하기</button>
                      </div>
                      <div className='pricePoint'>
                        <div>
                          총 적립예정금액 : <strong> 470원</strong>
                        </div>
                        <div>상품별 적립금 0원</div>
                        <div>회원 적립금 470원</div>
                        <div>쿠폰 적립금 0원</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
