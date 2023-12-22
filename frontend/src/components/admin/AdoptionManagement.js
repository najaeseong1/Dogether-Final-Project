// AdoptionManagement.js

import React, { useState } from 'react';

const AdoptionManagement = () => {
  const [tab, setTab] = useState('접수'); // 탭 상태 관리

  // 탭 변경 함수
  const changeTab = (newTab) => {
    setTab(newTab);
  };

  // 신청 목록 데이터
  const adoptionList = [
    { id: 1, time: '2023-12-22 10:00', applicant: '홍길동' },
    { id: 2, time: '2023-12-22 11:30', applicant: '김철수' },
    // 추가적인 데이터를 여기에 추가할 수 있습니다.
  ];

  return (
    <div className='adoption-management'>
      <div className='tab-bar'>
        <button
          className={tab === '접수' ? 'active' : ''}
          onClick={() => changeTab('접수')}
        >
          입양 접수
        </button>
        <button
          className={tab === '승인' ? 'active' : ''}
          onClick={() => changeTab('승인')}
        >
          입양 승인
        </button>
        <button
          className={tab === '거절' ? 'active' : ''}
          onClick={() => changeTab('거절')}
        >
          입양 거절
        </button>
      </div>
      <div className='list-container'>
        {adoptionList.map((item) => (
          <div
            key={item.id}
            className='list-item'
          >
            <div className='item-info'>
              <span className='time'>{item.time}</span>
              <span className='applicant'>{item.applicant}</span>
            </div>
            <button className='detail-button'>상세보기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionManagement;
