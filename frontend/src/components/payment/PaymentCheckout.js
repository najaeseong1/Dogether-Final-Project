import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

const selector = '#payment-widget';

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
const clientKey = process.env.REACT_APP_PAYMENTS_CLIENT_KEY;
const customerKey = nanoid(); // 주문 번호
console.log('주문번호 : ' + customerKey);

// 유저 정보 받아야 함
// function PaymentCheckout({userId}) {
function PaymentCheckout() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  // const paymentWidget = usePaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
  const paymentMethodsWidgetRef = useRef(null);
  const [userId, setUserId] = useState('asd');
  const [price, setPrice] = useState(0);
  const [orderName, setOrderName] = useState('');

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const newCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      if (JSON.stringify(newCartItems) !== JSON.stringify(cartItems)) {
        setCartItems(newCartItems);
      }
    }, 100); // 0.1초마다 'cartItems'의 변화를 확인

    let orderNames = [];
    let totalFullPrice = 0;

    cartItems.map((item) => {
      // 이 곳에서 각 항목에 대한 가공을 수행하실 수 있습니다.
      const orderFullName = `${item.title}( ${item.totalCount}개 )`;
      orderNames.push(orderFullName);
      totalFullPrice += item.totalPrice;
    });
    setOrderName(orderNames.join(', ')); // 주문 이름들을 콤마로 구분하여 하나의 문자열로 합칩니다.
    setPrice(totalFullPrice + 3000); // 주문한 총 가격을 상태로 설정합니다.
    return () => {
      clearInterval(interval);
    };
  }, [cartItems]); // 'cartItems'의 변화를 감지하여 컴포넌트를 리렌더링

  useEffect(() => {
    // ------  결제 UI 렌더링 ------
    // ------ 결제 위젯을 초기화하는 부분 -------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    loadPaymentWidget(clientKey, customerKey).then(setPaymentWidget);
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  이용약관 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: 'DEFAULT' }
    );
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePayment = async () => {
    // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      const successUrl = `${
        window.location.origin
      }/paymentsuccess?orderName=${encodeURIComponent(orderName)}`;
      const failUrl = `${
        window.location.origin
      }/paymentfail?orderName=${encodeURIComponent(orderName)}`;
      await paymentWidget?.requestPayment({
        orderId: nanoid(), // 자동 생성 주문 번호
        orderName: orderName, // 주문 이름
        successUrl: successUrl, // 성공 경로
        failUrl: failUrl, // 실패 경로
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };

  localStorage.setItem('userId', JSON.stringify(userId));

  return (
    <table className='paymentTable'>
      <tbody>
        <tr>
          <td>
            <div>
              <div className='paymet-wrapper'>
                <div className='box_section'>
                  <div id='payment-widget' />
                  <div id='agreement' />
                  <div style={{ paddingLeft: '24px' }}>
                    <div className='checkable typography--p'></div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td
            rowSpan={3}
            id='rowspan3'
            style={{ padding: '0' }}
          >
            <div className='finalPrice'> 최종 결제 금액</div>
            <div id='paymentPrice'>{price}원</div>
            <br />
            <div
              id='centerPay'
              style={{ textAlign: 'center' }}
            >
              <button
                className='orderbutton'
                onClick={handlePayment}
              >
                결제하기
              </button>
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
  );
}
export default PaymentCheckout;
