import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './PaymentSuccess.scss';

function PaymentFail() {
  const [searchParams] = useSearchParams();
  const redirection = useNavigate();
  const ToMainhome = () => {
    redirection('/');
  };

  // 'message' 파라미터 가져오기
  let rawMessage = searchParams.get('message');

  // JSON 문자열인지 확인
  let code;
  let message;
  try {
    code = rawMessage.replace(
      ': "{"code":"ALREADY_PROCESSED_PAYMENT","message":"이미 처리된 결제 입니다."}"',
      ''
    );
    console.log('코드 콘솔 ', code);
    let jsonStr = rawMessage
      .replace('400 Bad Request: "', '')
      .replace('}"', '}');
    console.log(jsonStr);
    message = JSON.parse(jsonStr);
  } catch (e) {
    // JSON 형식이 아니라면 원래 문자열 그대로 사용
    message = rawMessage;
  }
  // 실패해서 로컬 스토리지의 항목 삭제
  localStorage.removeItem('cartItems');
  localStorage.removeItem('userId');
  localStorage.removeItem('quantityMap');
  localStorage.removeItem('@tosspayments/client-id');

  return (
    <div className='payment-result-wrapper'>
      <div className='box_section'>
        <h2 style={{ padding: '20px 0px 10px 0px' }}>
          <img
            width='30px'
            src='https://static.toss.im/3d-emojis/u1F6A8-apng.png'
            alt='사이렌 이미지'
          />
          결제가 실패했습니다.
        </h2>
        <div className='payment-result-wrapper'>
          <p>{`${code}`}</p>
          <p>{`${message.message}`}</p>
          <div className='buttonSection'>
            <button
              className='Tomain'
              style={{
                borderRadius: '5px',
                border: '1px solid #dad6d6',
                background: '#6e6e6d',
                width: '120px',
                height: '50px',
                flexShrink: 0,
                color: 'azure',
                marginTop: '30px',
                cursor: 'pointer', // 마우스 커서를 버튼 위에 올렸을 때 'pointer'로 변경
              }}
              onClick={ToMainhome}
            >
              메인홈으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFail;
