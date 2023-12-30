import React, { useState } from 'react';
import './OrderManagement.scss';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };
  const [tab, setTab] = useState('접수'); // 탭 상태 관리

  const changeTab = (newTab) => {
    setTab(newTab);
  };

  // 신청 목록 데이터
  const adoptionList = [
    {
      id: 1,
      time: '2023-12-22 10:00',
      writer: '춘식이',
      product: '멍멍이 사료',
      addr: '인천 광역시 중구 운서동 영종대로 27번길 40 ',
    },
    {
      id: 2,
      time: '2023-12-22 11:30',
      writer: '김철수',
      addr: '서울 마포구 어쩌구대로',
    },
    {
      id: 2,
      time: '2023-12-22 11:30',
      writer: '김철수',
      addr: '서울 마포구 어쩌구대로',
    },
  ];

  return (
    <>
      <div className='mainmain'>
        <div className='management'>
          <div className='title-management'>
            <p className='logo'>Dogether</p>
          </div>

          <div className='profile'>여기는 관리자 계정입니다.</div>
          <div className='header-left'>
            <ul className='left-menu'>
              <button onClick={() => toLink('/ordermanagement')}>
                주문관리
              </button>
              <button onClick={() => toLink('/adoptionmanagement')}>
                입양관리
              </button>
              <li className='left-tap'>접수대기</li>
              <li className='left-tap'>처리중 / 배달완료 </li>
              <li className='left-tap'>주문취소</li>
            </ul>
          </div>
        </div>
        <div className='main-management'>
          <div className='head-title'>
            <div className='box'>
              <h2 className='order-title'> [입양] 접수된 목록 </h2>
              <div className='order-container'>
                {adoptionList.map((item) => (
                  <div
                    key={item.id}
                    className='list-item'
                  >
                    <div className='item-info'>
                      <span className='time'>{item.time}</span>
                      <span className='applicant'>
                        아이디 : {item.writer} <br /> 주소 : {item.addr}
                      </span>
                      <span className='applicant'>상품 : {item.product}</span>
                    </div>
                    <button className='detail-button'>주문 접수</button>
                    <button className='detail-button2'>주문 취소</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManagement;
