import React, { useEffect, useState } from 'react';
import './cart.scss';
import Swal from 'sweetalert2';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 카트 아이템을 가져와 설정
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems, { ...product, amount }]; // amount 추가
    setCartItems(updatedCart);
    setAmount(amount);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    Swal.fire({
      text: '선택하신 상품을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true, // cancel버튼 보이기.
      confirmButtonText: '삭제하기', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
    }).then((result) => {
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

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

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    const product = updatedCart[index];

    // 가격이 문자열로 제공될 경우 숫자로 변환
    const price = Number(product.price.replace(/[^0-9]/g, ''));

    // 수량이 1 미만으로 내려가지 않도록 조절
    if (newQuantity >= 1) {
      amount = newQuantity;
      product.totalPrice = price * newQuantity;
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }
  };

  return (
    <div className='cartListTemplate'>
      <div className='cart_title'>SHOPPINNG CART</div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
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
                        handleQuantityChange(index, item.amount - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className='amountbutton'
                      onClick={() =>
                        handleQuantityChange(index, item.amount + 1)
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
            <div className='checkoutButton'>
              <button>결제하기</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
