import React, { useEffect, useState } from 'react';
import './OrderManagement.scss';
import { useNavigate } from 'react-router-dom';
import { ADMIN, API_BASE_URL, PAYMENT } from '../../global/config/host-config';
import axios from 'axios';
import { formattedDate } from '../../global/utils/AuthContext';
import { IoMdSettings } from 'react-icons/io';
import Swal from 'sweetalert2';

// , 콤마 포맷터
// , 가 나올때 마다 줄 바꿈 시켜줌
const formatComma = (productList) => {
  return productList.split(',').map((product, index) => (
    <span key={index}>
      {product}
      <br />
    </span>
  ));
};

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

  const [paymentDetail, setPaymentDetail] = useState([]);

  const handleChangeTab = (Tab) => {
    setTab(Tab);
  };

  // 신청 목록 접수 조회
  const handleReception = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${ADMIN}/payment`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('넘어온 데이터 :', res.data);
      if (res.data.length > 0) {
        setReceptionList(res.data.paymentResponse);
        setlistText('');
      } else {
        setReceptionList([]);
        setlistText('접수된 목록이 없습니다.');
      }
      setReceptionList(res.data.paymentResponse);
      setPaymentDetail(res.data.paymentDetail);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  //접수된 상품 목록 불러오기
  useEffect(() => {
    handleReception(tab);
    console.log('접수된 상품 목록 불러오기 : ', tab);
  }, [tab]);

  // 승인된  목록 불러오기
  useEffect(() => {
    if (tab === '승인') {
      loadApprovedList();
    }
  }, [tab]);

  // 거절된 주문 목록 불러오기
  useEffect(() => {
    if (tab === '거절') {
      loadRejectedList();
    }
  }, [tab]);
  // 상품 주문 승인 핸들러
  const handleApprovedlist = async (item) => {
    console.log('아이템', item);
    try {
      const result = await new Promise((resolve) => {
        Swal.fire({
          title: '주문된 상품 승인하시겠습니까?',
          confirmButtonText: '승인',
          showCancelButton: true,
          confirmButtonColor: '#e89b93',
          cancelButtonColor: '#aba6a6',
          cancelButtonText: '취소',
        }).then((result) => {
          // 모달이 닫힌 후의 로직
          resolve(result);
          window.location.reload();
        });
      });

      // 확인 버튼이 눌렸을 때의 로직
      if (result.isConfirmed) {
        item.status = 'READY';
        // 주문 버튼 DONE 라면 !
        await axios.post(
          `${API_BASE_URL}${PAYMENT}/${item.orderId}`,
          { status: 'READY' },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
          }
        );
        // 해당 항목을 접수 목록에서 제거 히고
        setReceptionList((prevList) =>
          prevList.filter(
            (paymentResponse) => paymentResponse.orderId !== item.orderId
          )
        );
        // 해당 항목을 승인 목록에 추가
        processList((prevList) => [...prevList, item]);
        Swal.fire({
          text: '주문이 승인되었습니다!',
          confirmButtonColor: '#e89b93',
          confirmButtonText: '확인',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('입양 승인 중 오류 발생:', error);
      Swal.fire('에러가 발생했습니다.', '', 'error');
    }
  };

  // 승인된 주문 목록 불러오기 STATUS === READY
  const loadApprovedList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${ADMIN}/processList`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('READY 승인된 목록:', res.data);
      setProcessList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 승인 취소 핸들러
  const handleRejected = async (item) => {
    const result = await Swal.fire({
      title: '주문 거절',
      input: 'textarea',
      inputLabel: '거절 이유를 입력하세요',
      inputPlaceholder: '거절 이유를 자세히 적어주세요',
      showCancelButton: true,
      confirmButtonColor: '#e89b93',
      cancelButtonColor: '#aba6a6',
      confirmButtonText: '입력 완료',
      cancelButtonText: '취소',
      inputValidator: (value) => {
        if (!value) {
          return '거절 이유를 입력해야 합니다!';
        }
      },
    });

    if (result.isConfirmed) {
      const refusalReason = result.value;
      console.log('rrejectionReason', refusalReason);
      item.status = 'CANCELED';

      const requestData = {
        orderId: item.orderId,
        status: 'CANCELED',
        refusalReason,
      };
      try {
        // 주문 상태를 CANCELED 업데이트하기 위한 API 호출
        const res = await axios.post(
          `${API_BASE_URL}${PAYMENT}/canceled`,
          requestData,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
          }
        );
        console.log('CANCELED 요청 서버응답', res.data);

        // 상태 업데이트
        setReceptionList((prevList) =>
          prevList.filter((adoption) => adoption.orderId !== item.orderId)
        );
        setCancelList((prevList) => [...prevList, { ...item, refusalReason }]);
        Swal.fire({
          text: '정상적으로 처리되었습니다.',
          confirmButtonColor: '#e89b93',
          confirmButtonText: '확인',
          icon: 'success',
        });
      } catch (error) {
        console.error('주문 거절 중 오류 발생:', error);
        Swal.fire('에러가 발생했습니다.', '', 'error');
      }
    }
  };

  // 거절된 주문 목록 불러오기
  const loadRejectedList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${ADMIN}/cancelList`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('거절된 목록:', res.data);
      setCancelList(res.data);
    } catch (error) {
      console.error(error);
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
              {tab === '접수' && (
                <>
                  <div className='order-container'>
                    <h2 className='order-title'> [주문] {tab}된 목록 </h2>
                    <p>{listText}</p>
                    {receptionList.map((item) => (
                      <div
                        key={item.orderId}
                        className='list-item'
                      >
                        <div className='item-info'>
                          <p className='time'>
                            {formattedDate(item.approvedAt)}
                          </p>
                          <p className='applicant'>
                            주문번호{item.orderId} <br /> 주문이름 :
                            {formatComma(item.orderName)}
                          </p>
                        </div>
                        <button
                          className='detail-button'
                          onClick={() => handleApprovedlist(item)}
                        >
                          주문 접수
                        </button>
                        <button
                          className='detail-button'
                          onClick={() => handleRejected(item)}
                        >
                          주문 취소
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {tab === '승인' && (
                <div className='order-container'>
                  <h2 className='order-title'> [주문] {tab}된 목록 </h2>
                  {processList.map((item) => (
                    <div
                      key={item.orderId}
                      className='list-item'
                    >
                      <div className='item-info'>
                        <p className='time'>{formattedDate(item.approvedAt)}</p>
                        <div className='item-info'>
                          <p className='time'>
                            {formattedDate(item.approvedAt)}
                          </p>
                          <p className='applicant'>
                            주문번호{item.orderId} <br /> 주문이름 :
                            {formatComma(item.orderName)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === '거절' && (
                <div className='order-container'>
                  <h2 className='order-title'> [주문] {tab}된 목록 </h2>
                  {cancelList.map((item) => (
                    <div
                      key={item.orderId}
                      className='list-item'
                    >
                      <div className='item-info'>
                        <p className='time'>{formattedDate(item.approvedAt)}</p>
                        <div className='item-info'>
                          <p className='time'>
                            {formattedDate(item.approvedAt)}
                          </p>
                          <p className='applicant'>
                            주문번호{item.orderId} <br /> 주문이름 :
                            {formatComma(item.orderName)}
                          </p>
                        </div>
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

export default OrderManagement;
