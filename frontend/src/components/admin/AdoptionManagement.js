// AdoptionManagement.js

import React, { useEffect, useState } from 'react';
import './AdoptionManagement.scss';
import { API_BASE_URL } from '../../global/config/host-config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { approvedAdoption, rejectedAdoption } from '../../global/Alerts';
import Swal from 'sweetalert2';
const AdoptionManagement = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };
  const [tab, setTab] = useState('접수'); // 탭 상태 관리

  //접수된 목록
  const [adoptionList, setAdoptionList] = useState([]);

  //승인된 목록
  const [approvedList, setApprovedList] = useState([]);

  // 거부된 목록
  const [rejectedList, setRejectedList] = useState([]);

  const handleChangeTab = (Tab) => {
    setTab(Tab);
  };

  const changeTab = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/pending`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('넘어온 데이터 :', res.data);
      if (res.data.length > 0) {
        const firstItem = res.data[0];
        console.log('contractNo:', firstItem.contractNo);
      } else {
        console.log('데이터가 없습니다.');
      }
      setAdoptionList(res.data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  //접수된 입양 목록 불러오기
  useEffect(() => {
    changeTab(tab);
  }, []);

  // 입양  핸들러
  const handleApprovedlist = async (item) => {
    try {
      // 서버에 입양 신청 승인 요청 보내기
      const result = await Swal.fire({
        title: '입양신청을 승인하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '승인',
      });

      if (result.isConfirmed) {
        const res = await axios.get(`${API_BASE_URL}/admin/approvedlist`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        });
        setApprovedList(res.data);
      }
      // 성공적으로 서버에 승인 요청이 전송되었을 경우
      console.log('입양이 승인되었습니다!');

      // 해당 항목을 접수 목록에서 제거
      setAdoptionList((prevList) =>
        prevList.filter((adoption) => adoption.contractNo !== item.contractNo)
      );

      // 해당 항목을 승인 목록에 추가
      setApprovedList((prevList) => [...prevList, item]);

      Swal.fire('입양이 승인되었습니다!', '', 'success');
    } catch (error) {
      console.error('입양 승인 요청 중 오류 발생:', error);
    }
  };

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
              <button onClick={() => toLink('/adminmain')}>메인으로</button>
              <button onClick={() => toLink('/ordermanagement')}>
                주문관리
              </button>
              <button onClick={() => toLink('/adoptionmanagement')}>
                입양관리
              </button>
              <li
                className={tab === '접수' ? 'active' : ''}
                onClick={() => handleChangeTab('접수')}
              >
                접수 대기
              </li>

              <li
                className={tab === '승인' ? 'active' : ''}
                onClick={() => handleChangeTab('승인')}
              >
                입양승인
              </li>
              <li
                className={tab === '거절' ? 'active' : ''}
                onClick={() => handleChangeTab('거절')}
              >
                입양거절
              </li>
            </ul>
          </div>
        </div>
        <div className='main-management'>
          <div className='head-title'>
            <div className='box'>
              {tab === '접수' && (
                <>
                  <div className='order-container'>
                    <h2 className='order-title'> [입양] {tab}된 목록 </h2>
                    {adoptionList.map((item) => (
                      <div
                        key={item.contractNo}
                        className='list-item'
                      >
                        <div className='item-info'>
                          <span className='time'>{item.createDate}</span>
                          <span className='applicant'>
                            글쓴이 : {item.userName} | 유기견 :
                            {item.desertionNo}
                          </span>
                        </div>
                        <button
                          onClick={handleApprovedlist}
                          className='detail-button'
                        >
                          입양승인
                        </button>
                        <button
                          onClick={rejectedAdoption}
                          className='detail-button2'
                        >
                          입양거절
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {tab === '승인' && (
                <div className='order-container'>
                  <h2 className='order-title'> [입양] {tab}된 목록 </h2>
                  {approvedList.map((item) => (
                    <div
                      key={item}
                      className='list-item'
                    >
                      <div className='item-info'>
                        <span className='time'>{item.createDate}</span>
                        <span className='applicant'>
                          글쓴이 : {item.userName} | 유기견 : {item.desertionNo}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === '거절' && (
                <div className='order-container'>
                  <h2 className='order-title'> [입양] {tab}된 목록 </h2>
                  {rejectedList.map((item) => (
                    <div
                      key={item.id}
                      className='list-item'
                    >
                      <div className='item-info'>
                        <span className='time'>{item.time}</span>
                        <span className='applicant'>
                          글쓴이 : {item.writer} | 유기견 : {item.desertionNo}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionManagement;
