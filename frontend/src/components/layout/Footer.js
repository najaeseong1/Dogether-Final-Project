import React, { useEffect, useState } from 'react';
import './Footer.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };
  const location = useLocation();
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const [isExcludedPage, setIsExcludedPage] = useState(false);

  useEffect(() => {
    // 페이지 경로가 '/pagenotfound'이면 isNotFoundPage를 true로 설정
    setIsNotFoundPage(location.pathname === '/pagenotfound');
    setIsExcludedPage(location.pathname === '/adminmain');
  }, [location.pathname]);

  return (
    !isNotFoundPage &&
    !isExcludedPage && (
      <>
        <div className='footerContainer1'>
          <div>이용약관 | 개인정보 방침</div>
          <div id='footerDogether'>Dogether</div>

          <ul>
            <li>상호명 : 함께할개, Dogether </li>
            <li> 대표자 : 나재성 </li>
            <li> 고객센터 문의 : 1577-7777</li>
          </ul>
          <div>주소 : 서울시 마포구 백범로 23 지하1층 4강의실</div>
          <div>사업자 등록 번호 : 000-00-00000</div>
          <div>
            ※ 함께할개, Dogether은 분양자와 입양자 간의 반려견 중개자로서 거래의
            당사자가 아니며 해당게시물의 거래정보 및 거래등에 대해 책임을 지지
            않습니다.
          </div>
        </div>
        <div className='footerContainer2'></div>
      </>
    )
  );
};

export default Footer;
