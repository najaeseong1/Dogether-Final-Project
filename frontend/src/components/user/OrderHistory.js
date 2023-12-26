import React from 'react';
import './OrderHistory.scss';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const orders = [
  {
    OrderNumber: '878787878785',
    img: 'https://pethroom.com/web/product/medium/202208/6406178e3005b192086b575413018e52.jpg',
    product: '제로 워터리스 샴푸',
    cardcompany: '국민카드',
    date: '2023-01-01',
    amount: 10000,
    addr: '서울시 마포구 백범로 23 지하1층 강의실',
    paymentStatus: '접수',
  },
  {
    OrderNumber: '878787878785',
    img: 'https://pethroom.com/web/product/medium/202203/4b4848ba685b299501094466f5631fa7.jpg',
    product: '칫솔 살균기 포인트 세트 (포인트칫솔+살균기)',
    cardcompany: '국민카드',
    date: '2023-01-05',
    amount: 25000,
    addr: '서울시 마포구 백범로 23 지하1층 강의실',
    paymentStatus: '배송중',
  },
  {
    OrderNumber: '878787878785',
    img: 'https://pethroom.com/web/product/medium/202203/4b4848ba685b299501094466f5631fa7.jpg',
    product: 'Product 2',
    cardcompany: '국민카드',
    date: '2023-01-05',
    amount: 25000,
    addr: '서울시 마포구 백범로 23 지하1층 강의실',
    paymentStatus: '배송중',
  },
];

const OrderHistory = () => {
  const orderPayment = (order) => {
    Swal.fire({
      html: `
      <div class= "swal_title">결제 내역</div>
   <div class="order-details">
       <img src="${order.img}" alt="상품 이미지" class="product-image">
       <p class="order-number">주문번호: ${order.OrderNumber}</p>
       <p>주문 날짜: ${order.date}</p>
       <p>상품명: ${order.product}</p>
       <p>결제 비용: ${order.amount}원</p>
       <p>배송지 정보<br> ${order.addr}원</p>
   </div>
`,

      width: 600,
      padding: '3em',
      color: '#000000',
      backdrop: `
        rgba(0, 0, 0, 0.3)
        no-repeat
      
    `,

      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
    });
  };

  const handleCancelPayment = (order) => {
    Swal.fire({
      title: '결제 취소하시겠습니까?',
      html: `
     
   <div class="order-details">
       <img src="${order.img}" alt="상품 이미지" class="product-image">
       <p class="order-number">주문번호: ${order.OrderNumber}</p>
       <p>주문 날짜: ${order.date}</p>
       <p>상품명: ${order.product}</p>
       <p>결제 비용: ${order.amount}원</p>
       <p>배송지 정보<br> ${order.addr}원</p>
   </div>
`,
      icon: 'warning',
      confirmButtonText: '결제취소',
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 결제 취소 버튼을 눌렀다면

        //   Swal.fire('결제취소 완료되었습니다.');
        const Toast = Swal.mixin({
          toast: true,
          position: 'center-center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: '결제 취소가 진행중입니다.',
        });
      }
    });
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

            <div className='ProductOrderList'>
              <div className='boardTitle'>주문 목록</div>
              {orders.length === 0 ? (
                <p style={{ textAlign: 'center' }}>장바구니가 비어있어요</p>
              ) : (
                <>
                  <table className='orderhistory_table'>
                    <thead>
                      <tr className='orderHistory_tr'>
                        <th>이미지</th>
                        <th>상품 정보</th>
                        <th>주문일자</th>
                        <th>주문금액</th>
                        <th>결제상태</th>
                        <th>결제관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.OrderNumber}>
                          <td>
                            <img
                              src={order.img}
                              alt='게시물 이미지'
                              style={{ width: '100px', height: '100px' }}
                            />
                          </td>
                          <td>{order.product}</td>
                          <td>{order.date}</td>
                          <td>{order.amount}원</td>
                          <td>{order.paymentStatus}</td>
                          <td>
                            <button
                              className='orderButton'
                              onClick={() => orderPayment(order)}
                            >
                              결제 내역
                            </button>
                            <button
                              className='cancelButton'
                              onClick={() => handleCancelPayment(order)}
                            >
                              결제 취소
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
