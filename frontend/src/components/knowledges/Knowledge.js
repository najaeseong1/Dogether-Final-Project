import React from "react";
import "./Knowledge.scss";

const Knowledge = () => {
  return (
    <div className="knowledge">
      <div className="know1">
        <img
          src="/img/logodog.png"
          alt="profile"
        />
      </div>

      <div className="startmsg">
        <p>
          안녕하세요 &nbsp; <br />
          필수&nbsp;지식&nbsp;튜토리얼을&nbsp;시작할게요.
        </p>
      </div>

      <div className="head1"></div>

      <div>
        <p className="head1info">
          반려견을을 키우기 전에 준비해야 할 것들은 무엇인가요?{" "}
        </p>
      </div>

      <div className="text1">
        <p>
          강아지를 키우기 전에는 강아지가 살기에 적합한 공간과 먹이, <br />
          그리고 강아지를 위한 필수 용품들을 준비해야 합니다. <br />
          강아지가 살기에 적합한 공간은 강아지가 자유롭게 움직일 수 있는
          공간이어야 하며, <br />
          강아지가 머무르는 곳은 항상 청결하게 유지해야 합니다. <br />
          먹이는 강아지의 연령과 크기에 맞게 선택해야 하며, 강아지를 위한
          필수용품으로는 <br />
          사료 그릇, 물그릇, 목줄, 산책용 배변 패드, 샴푸 등이 있습니다. <br />
        </p>
      </div>

      <div className="head2"></div>

      <div>
        <p className="head1info2">반려견이 접종을 해야하는 이유가 무엇일까요? </p>
      </div>

      <div className="text2">
        <p>
          갓 태어난 강아지는 어미의 초유에서 면역항체를 받게 되는데요.  <br />
          생후 약 45일이 지나면 항체가 약해져 면역력이 떨어지고 각종 전염병에 쉽게 <br />
          노출될 수 있습니다. 때문에 생후 14주(4개월) 전 접종을 통해 항체를 만드는 것이 좋습니다. <br />
          강아지가 맞는 접종 종류 중 첫번째는 DHPPL 즉 '종합백신'이라는 것이 있습니다. <br />
          종합백신 DHPPL은 각 종류별 바이러스의 첫 글자를 따서 부르고 있습니다. <br />
          D: DISTEMPER(홍역), H: HEPATITIS(전염성간염), P: PARVOVIRUS(파보),<br />
          P: PARAINFLUENZA(파라인플루엔자), LEPTOSPIROSIS(렙토스피라증)
        </p>
      </div>

      <div className="head3"></div>

      <div>
        <p className="head1info3">
          중성화는 필수로 해야 되는 수술인가요?{" "}
        </p>
      </div>

      <div className="text3">
        <p>
          암컷 강아지는 약 10살 이전에 자궁축농증, 유선종양, 난소질환을 겪을 확률이 큽니다.<br />
          하지만 이러한 질병들이 성견~노견이 되어 발병되기 때문에 치료를 해주기 위해 수슬을 <br />
          하더라도 나이가 있어 무리가 될 뿐만 아니라, 재발 확률이 높고 사망에 이르기도 합니다. <br />
          하지만 중성화를 하게 될 경우, 이러한 생식관련 질환 예방에도 도움이 됩니다.<br />
          수컷 강아지가 중성화를 할 경우 전립선질환, 고환질환, 표피염 등과 같은 생식관련  <br />
          질환을 예방할 수 있으며, 행동 교정에도 도움이 됩니다. <br />
        </p>
      </div>
    </div>
  );
};

export default Knowledge;
