import React, { useContext, useEffect, useState } from 'react';
import './Knowledge.scss';
import AuthContext from '../../global/utils/AuthContext';

const Knowledge = () => {
  const [isText1Visible1, setText1Visible1] = useState(false);
  const [isText1Visible2, setText1Visible2] = useState(false);
  const [isText1Visible3, setText1Visible3] = useState(false);
  const userId = localStorage.getItem('USER_ID');

  const handleHead1Click1 = () => {
    setText1Visible1(!isText1Visible1);
  };
  const handleHead1Click2 = () => {
    setText1Visible2(!isText1Visible2);
  };
  const handleHead1Click3 = () => {
    setText1Visible3(!isText1Visible3);
  };

  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {}, []);

  return (
    <div className='knowledge-wrapper'>
      <span className='know1'>
        <img
          src='/img/logodog.png'
          alt='profile'
        />
      </span>

      {isLoggedIn ? (
        <div className='startmsg'>
          <p>
            안녕하세요 {userId}님&nbsp; <br />
            필수&nbsp;지식&nbsp;튜토리얼을&nbsp;시작할게요.
          </p>
        </div>
      ) : (
        <div className='startmsg'>
          <p>
            안녕하세요 <br />
            필수&nbsp;지식&nbsp;튜토리얼을&nbsp;시작할게요.
          </p>
        </div>
      )}
      <div className='head1'></div>

      <div>
        <p
          className='head1info'
          onClick={handleHead1Click1}
        >
          반려견을 키우기 전에 준비해야 할 것들은 무엇인가요?
        </p>
      </div>
      {isText1Visible1 && (
        <div className='text1'>
          <p>
            강아지를 키우기 전에는 강아지가 살기에{' '}
            <strong style={{ fontSize: '25px' }}>
              적합한 공간과 먹이, <br />
              그리고 강아지를 위한 필수 용품
            </strong>
            들을 준비해야 합니다. <br />
            강아지가 살기에 적합한 공간은 강아지가 자유롭게 움직일 수 있는
            공간이어야 하며, <br />
            강아지가 머무르는 곳은 항상 <strong>청결하게 유지</strong> 해야
            합니다. <br />
            먹이는 강아지의 연령과 크기에 맞게 선택해야 하며, 강아지를 위한
            필수용품으로는 <br />
            <strong>사료 그릇, 물그릇, 목줄, 산책용 배변 패드, 샴푸 </strong>
            등이 있습니다. <br />
          </p>
        </div>
      )}
      <div className='head2'></div>

      <div>
        <p
          className='head1info2'
          onClick={handleHead1Click2}
        >
          반려견이 접종을 해야하는 이유가 무엇일까요?
        </p>
      </div>
      {isText1Visible2 && (
        <div className='text2'>
          <p>
            갓 태어난 강아지는 어미의 초유에서 면역항체를 받게 되는데요. <br />
            생후 약 45일이 지나면 항체가 약해져 면역력이 떨어지고,{' '}
            <strong
              style={{
                fontSize: '23px',
              }}
            >
              각종 전염병에 쉽게 <br />
              노출
            </strong>
            될 수 있습니다. 때문에{' '}
            <strong>생후 14주(4개월) 전 접종을 통해 항체를 만드는 것</strong>이
            좋습니다. <br />
            강아지가 맞는 접종 종류 중 첫번째는
            <strong> DHPPL 즉 '종합백신'</strong>이라는 것이 있습니다. <br />
            종합백신 DHPPL은 각 종류별 바이러스의 첫 글자를 따서 부르고
            있습니다.
            <br />
            <strong>D :</strong> DISTEMPER(홍역), <strong>H :</strong>{' '}
            HEPATITIS(전염성간염), <strong>P :</strong> PARVOVIRUS(파보),
            <br />
            <strong>P :</strong> PARAINFLUENZA(파라인플루엔자),
            <nbsp />
            <strong>L :</strong> LEPTOSPIROSIS(렙토스피라증)
          </p>
        </div>
      )}

      <div className='head3'></div>

      <div>
        <p
          className='head1info3'
          onClick={handleHead1Click3}
        >
          중성화는 필수로 해야 되는 수술인가요?{' '}
        </p>
      </div>
      {isText1Visible3 && (
        <div className='text3'>
          <p>
            암컷 강아지는 약 10살 이전에{' '}
            <strong style={{ fontSize: '25px' }}>
              자궁축농증, 유선종양, 난소질환
            </strong>
            을 겪을 확률이 큽니다.
            <br />
            하지만 이러한 질병들이 성견~노견이 되어 발병되기 때문에 치료를
            해주기 위해 수슬을 <br />
            하더라도 나이가 있어 무리가 될 뿐만 아니라, 재발 확률이 높고 사망에
            이르기도 합니다. <br />
            하지만 중성화를 하게 될 경우, 이러한{' '}
            <strong>생식관련 질환 예방</strong>에도 도움이 됩니다.
            <br />
            수컷 강아지가 중성화를 할 경우 전립선질환, 고환질환, 표피염 등과
            같은 생식관련 <br />
            질환을 예방할 수 있으며, 행동 교정에도 도움이 됩니다. <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default Knowledge;
