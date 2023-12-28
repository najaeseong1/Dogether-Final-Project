import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

const selector = '#payment-widget';

// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
const clientKey = process.env.REACT_APP_PAYMENTS_CLIENT_KEY;
const customerKey = nanoid(); // 여기에 고객 키 값이 들어와야 함
console.log(customerKey);

function PaymentCheckout() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  // const paymentWidget = usePaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(50000);

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

  return (
    <div>
      <div className='paymet-wrapper'>
        <div className='box_section'>
          <div id='payment-widget' />
          <div id='agreement' />
          <div style={{ paddingLeft: '24px' }}>
            <div className='checkable typography--p'></div>
          </div>
          <div className='result paymet-wrapper'>
            <button
              className='payment-button'
              style={{ marginTop: '30px' }}
              onClick={async () => {
                // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                try {
                  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                  // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                  await paymentWidget?.requestPayment({
                    orderId: nanoid(),
                    orderName: '토스 티셔츠 외 2건',
                    customerName: '김토스',
                    customerEmail: 'customer123@gmail.com',
                    customerMobilePhone: '01012341234',
                    successUrl: `${window.location.origin}/success`,
                    failUrl: `${window.location.origin}/fail`,
                  });
                } catch (error) {
                  // 에러 처리하기
                  console.error(error);
                }
              }}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaymentCheckout;
