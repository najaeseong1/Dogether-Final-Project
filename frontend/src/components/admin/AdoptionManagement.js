import React, { useEffect, useState } from 'react';
import './AdoptionManagement.scss';
import { API_BASE_URL } from '../../global/config/host-config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoMdSettings } from 'react-icons/io';
import { formattedDate } from '../../global/utils/AuthContext';

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

  //  목록 없을 때
  const [adoptionText, setAdoptionText] = useState('');

  //입양 신청서 상세보기
  const [adoptionDetail, setAdoptionDetail] = useState(null);

  const handleChangeTab = (Tab) => {
    setTab(Tab);
  };

  // 입양 접수 목록 끌고오기
  const changeTab = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/pending`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('넘어온 데이터 :', res.data);
      if (res.data.length > 0) {
        setAdoptionText('');
        setAdoptionList(res.data);
      } else {
        setAdoptionText('접수된 목록이 없습니다.');
        setAdoptionList([]);
      }
      setAdoptionList(res.data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  //접수된 입양 목록 불러오기
  useEffect(() => {
    changeTab(tab);
  }, [tab]);

  // 승인된 입양 목록 불러오기
  useEffect(() => {
    if (tab === '승인') {
      loadApprovedList();
    }
  }, [tab]);

  // 거절된 입양 목록 불러오기
  useEffect(() => {
    if (tab === '거절') {
      loadRejectedList();
    }
  }, [tab]);

  // 입양  신청 승인 핸들러
  const handleApprovedlist = async (item) => {
    try {
      const result = await new Promise((resolve) => {
        Swal.fire({
          title: '입양신청을 승인하시겠습니까?',
          confirmButtonText: '승인',
          showCancelButton: true,
          confirmButtonColor: '#e89b93',
          cancelButtonColor: '#aba6a6',
          cancelButtonText: '취소',
          didOpen: () => {
            // 여기서 상세보기 모달을 닫도록 설정
            setAdoptionDetail(null);
          },
        }).then((result) => {
          // 모달이 닫힌 후의 로직
          resolve(result);
          window.location.reload();
        });
      });

      // 확인 버튼이 눌렸을 때의 로직
      if (result.isConfirmed) {
        item.adoptionStatus = 'APPROVED';

        // 입양 승인 API 호출
        await axios.post(
          `${API_BASE_URL}/contract/adminapproved/${item.contractNo}`,
          { adoptionStatus: 'APPROVED' },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
          }
        );

        // 승인된 목록 업데이트
        setApprovedList((prevList) => [...prevList, item]);

        Swal.fire({
          text: '입양이 승인되었습니다!',
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

  // 승인된 입양 목록 불러오기
  const loadApprovedList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/approvedlist`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('승인된 목록:', res.data);
      setApprovedList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 입양 거절 핸들러
  const handleRejected = async (item) => {
    const result = await Swal.fire({
      title: '입양 거절',
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
      item.adoptionStatus = 'REJECTED';

      const requestData = {
        contractNo: item.contractNo,
        adoptionStatus: 'REJECTED',
        refusalReason,
      };

      try {
        // 입양 상태를 업데이트하기 위한 API 호출
        const res = await axios.post(
          `${API_BASE_URL}/contract/adminrejected`,
          requestData,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
          }
        );
        console.log('서버응답', res.data);

        // 상태 업데이트
        setAdoptionList((prevList) =>
          prevList.filter((adoption) => adoption.contractNo !== item.contractNo)
        );
        setRejectedList((prevList) => [
          ...prevList,
          { ...item, refusalReason },
        ]);
        Swal.fire({
          text: '정상적으로 처리되었습니다.',
          confirmButtonColor: '#e89b93',
          confirmButtonText: '확인',
          icon: 'success',
        });
      } catch (error) {
        console.error('입양 거절 중 오류 발생:', error);
        Swal.fire('에러가 발생했습니다.', '', 'error');
      }
    }
  };

  // 거절된 입양 목록 불러오기
  const loadRejectedList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/rejected`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        },
      });
      console.log('거절된 목록:', res.data);
      setRejectedList(res.data);
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
                입양승인
              </li>
              <li
                className={tab === '거절' ? 'active' : ''}
                onClick={() => handleChangeTab('거절')}
              >
                입양거절
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
                    <h2 className='order-title'> [입양] {tab}된 목록 </h2>
                    <p>{adoptionText}</p>
                    {adoptionList.map((item) => (
                      <div
                        key={item.contractNo}
                        className='list-item'
                      >
                        <div className='item-info'>
                          <p className='time'>
                            {formattedDate(item.createDate)}
                          </p>
                          <div>
                            <p className='applicant'>
                              유기견No:{item.desertionNo}
                            </p>
                            <p className='applicant'>신청자: {item.userName}</p>
                            <span className='applicant'>직업: {item.job} </span>
                            <span className='applicant'>
                              | 나이: {item.userAge}
                            </span>

                            <p className='applicant'>주소: {item.postAddr}</p>
                            <p className='applicant'>사유 :{item.reason}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApprovedlist(item)}
                          className='detail-button'
                        >
                          입양승인
                        </button>
                        <button
                          onClick={() => handleRejected(item)}
                          className='detail-button'
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
                      key={item.contractNo}
                      className='list-item'
                    >
                      <div className='item-info'>
                        <p className='time'>{formattedDate(item.createDate)}</p>
                        <div>
                          <p className='applicant'>
                            유기견No:{item.desertionNo}
                          </p>
                          <p className='applicant'>신청자: {item.userName}</p>
                          <span className='applicant'>직업: {item.job} </span>
                          <span className='applicant'>
                            | 나이: {item.userAge}
                          </span>

                          <p className='applicant'>주소: {item.postAddr}</p>
                          <p className='applicant'>사유 :{item.reason}</p>
                        </div>
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
                      key={item.contractNo}
                      className='list-item'
                    >
                      <div className='item-info'>
                        <p className='time'>{formattedDate(item.createDate)}</p>
                        <div>
                          <p className='applicant'>
                            유기견No:{item.desertionNo}
                          </p>
                          <p className='applicant'>신청자: {item.userName}</p>
                          <span className='applicant'>직업: {item.job} </span>
                          <span className='applicant'>
                            | 나이: {item.userAge}
                          </span>

                          <p className='applicant'>주소: {item.postAddr}</p>
                          <p className='applicant'>사유 :{item.reason}</p>
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

export default AdoptionManagement;
