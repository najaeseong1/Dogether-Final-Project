import React, { useState } from 'react';
import './OrderManagement.scss';

const OrderManagement = () => {
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
    <div className='order_management'>
      <div className='tab-bar'>
        <button
          className={tab === '접수' ? 'active' : ''}
          onClick={() => changeTab('접수')}
        >
          접수 대기
        </button>

        <button
          className={tab === '승인' ? 'active' : ''}
          onClick={() => changeTab('승인')}
        >
          처리중 / 배달완료
        </button>
        <button
          className={tab === '거절' ? 'active' : ''}
          onClick={() => changeTab('거절')}
        >
          주문 취소
        </button>
      </div>
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
                <br />
              </span>

              <span className='applicant'>상품 : {item.product}</span>
            </div>
            <button className='detail-button'>주문 접수</button>
            <button className='detail-button2'>주문 취소</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
