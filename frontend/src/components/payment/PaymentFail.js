import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PaymentFail() {
  const [searchParams] = useSearchParams();

  return (
    <div className='result wrapper'>
      <div className='box_section'>
        <h2 style={{ padding: '20px 0px 10px 0px' }}>
          <img
            width='30px'
            src='https://static.toss.im/3d-emojis/u1F6A8-apng.png'
            alt='사이렌 이미지'
          />
          결제가 실패했습니다.
        </h2>
        <p>{`code = ${searchParams.get('code')}`}</p>
        <p>{`message = ${searchParams.get('message')}`}</p>

        <div className='result wrapper'></div>
      </div>
    </div>
  );
}

export default PaymentFail;
