/*import React, { useEffect, useState } from 'react';
import './OrderManagement.scss';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../global/config/host-config';
import axios from 'axios';
import { formattedDate } from '../../global/utils/AuthContext';
import { IoMdSettings } from 'react-icons/io';

const OrderManagement = () => {
  const redirection = useNavigate();

  const toLink = (loc) => {
    redirection(loc);
  };
  const [tab, setTab] = useState('접수'); // 탭 상태 관리

  // 접수대기 목록
  const [receptionList, setReceptionList] = useState([]);

  // 처리중 목록
  const [processList, setProcessList] = useState([]);

  // 취소된 목록
  const [cancelList, setCancelList] = useState([]);

  //  처리목록 없을 때
  const [listText, setlistText] = useState('');

  const handleChangeTab = (Tab) => {
    setTab(Tab);
  };

  //접수된 상품 목록 불러오기
  useEffect(() => {
    handleReception(tab);
  }, [tab]);

  // 신청 목록 접수 조회
  const handleReception = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/product`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('넘어온 데이터 :', res.data);
      if (res.data.length > 0) {
        setReceptionList(res.data);
        setlistText('');
      } else {
        setReceptionList([]);
        setlistText('접수된 목록이 없습니다.');
      }
      setReceptionList(res.data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  // 상품 주문 승인 핸들러
  const handleApprovedlist = async (item) => {
    const result = await Swal.fire({
      title: '주문된 상품 승인하시겠습니까?',
      confirmButtonText: '승인',
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      // 입양 버튼 true 라면 !
      item.adoptionStatus = 'APPROVED';
      const res = await axios.post(
        `${API_BASE_URL}/contract/adminapproved/${item.contractNo}`,
        { adoptionStatus: 'APPROVED' },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );
      // 해당 항목을 접수 목록에서 제거 히고
      setAdoptionList((prevList) =>
        prevList.filter((adoption) => adoption.contractNo !== item.contractNo)
      );

      // 해당 항목을 승인 목록에 추가
      setApprovedList((prevList) => [...prevList, item]);

      Swal.fire('입양이 승인되었습니다!', '', 'success');
    }
  };

  return (
    <>
      <div className='mainmain'>
        <div className='management'>
          <div className='title-management'>
            <p className='logo'>Dogether</p>
          </div>
          <div className='adop-profil'>
            <IoMdSettings />
            여기는 관리자 계정입니다.
          </div>
          <div className='header-left'>
            <ul className='left-menu'>
              <li
                className={tab === '접수' ? 'active' : ''}
                onClick={() => handleChangeTab('접수')}
              >
                접수대기
              </li>

              <li
                className={tab === '승인' ? 'active' : ''}
                onClick={() => handleChangeTab('승인')}
              >
                처리중
              </li>
              <li
                className={tab === '거절' ? 'active' : ''}
                onClick={() => handleChangeTab('거절')}
              >
                상품취소
              </li>
            </ul>
            <button
              className='adopt-btn'
              onClick={() => toLink('/ordermanagement')}
            >
              주문관리
            </button>
            <button
              className='adopt-btn'
              onClick={() => toLink('/adoptionmanagement')}
            >
              입양관리
            </button>
            <button
              className='adopt-btn'
              onClick={() => toLink('/adminmain')}
            >
              메인으로
            </button>
          </div>
        </div>
        <div className='main-management'>
          <div className='head-title'>
            <div className='box'>
              <h2 className='order-title'> [상품] {tab}된 목록 </h2>
              <div className='order-container'>
                {adoptionList.map((item) => (
                  <div
                    key={item.id}
                    className='list-item'
                  >
                    <div className='item-info'>
                      <p className='time'>{formattedDate(item.createDate)}</p>
                      <p className='applicant'>
                        아이디 : {item.writer} <br /> 주소 : {item.addr}
                      </p>
                      <p className='applicant'>상품 : {item.product}</p>
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
*/
