import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_BASE_URL, PAYMENT } from '../../global/config/host-config';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userId = JSON.parse(localStorage.getItem('userId'));
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  useEffect(() => {
    const requestData = {
      orderId: searchParams.get('orderId'),
      orderName: decodeURIComponent(searchParams.get('orderName')),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
      userId: userId,
      productInfo: cartItems,
    };
    // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // @docs https://docs.tosspayments.com/reference/using-api/api-keys
    const secretKey = process.env.REACT_APP_PAYMENTS_SERECT_KEY;

    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedSecretKey = `Basic ${btoa(secretKey + ':')}`;

    // async function confirm() {
    //   const response = await fetch(
    //     'https://api.tosspayments.com/v1/payments/confirm',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Authorization: encryptedSecretKey,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(requestData),
    //     }
    //   );
    async function confirm() {
      console.log(`${API_BASE_URL}${PAYMENT}`);
      console.log(JSON.stringify(requestData));
      const response = await fetch(`${API_BASE_URL}${PAYMENT}`, {
        method: 'POST',
        headers: {
          Authorization: encryptedSecretKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        // TODO: 구매 실패 비즈니스 로직 구현
        console.log(json);
        navigate(`/fail?code=${json.code}&message=${json.message}`);
        return;
      }
      // 요청이 성공적으로 완료된 후에 로컬 스토리지의 항목 삭제
      localStorage.removeItem('cartItems');
      localStorage.removeItem('userId');
      localStorage.removeItem('quantityMap');
      localStorage.removeItem('@tosspayments/client-id');

      // TODO: 구매 완료 비즈니스 로직 구현
      console.log(json);
    }
    confirm();
  }, []);

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2 style={{ padding: '20px 0px 10px 0px' }}>
          <img
            width='35px'
            src='https://static.toss.im/3d-emojis/u1F389_apng.png'
            alt='축하 이미지 '
          />
          결제가 완료 되었습니다.
        </h2>
        <p>{`paymentKey = ${searchParams.get('paymentKey')}`}</p>
        <p>{`orderId = ${searchParams.get('orderId')}`}</p>
        <p>{`amount = ${Number(
          searchParams.get('amount')
        ).toLocaleString()}원`}</p>
        <div className='result wrapper'></div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
