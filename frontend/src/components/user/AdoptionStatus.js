import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdoptionStatus.scss';
import Swal from 'sweetalert2';
import { API_BASE_URL, CONTRACT } from '../../global/config/host-config';
import { formattedDate } from '../../global/utils/AuthContext';

const AdoptionStatus = () => {
  // 마이페이지 입양 목록 불러오기
  const [adoptionList, setAdoptionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${CONTRACT}/mypageadoptionlist`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userAdoptionList = data.dtoList.filter(
          (adoption) => adoption.userId === localStorage.getItem('USER_ID')
        );
        setAdoptionList(userAdoptionList);
        console.log(userAdoptionList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // 입양 신청 승인/ 거절 로직
  const handleShowModal = async (contractNo, status) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}${CONTRACT}/mypageadoptiondetail?contractNo=${contractNo}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );
      console.log(res.data);

      if (!res.ok) {
        if (res.status === 400) {
          Swal.fire({
            title: '승인되지 않았습니다.',
            text: '입양 상세 정보를 가져오는 중 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인',
          });
        } else {
          throw new Error(`네트워크 응답이 올바르지 않습니다: ${res.status}`);
        }
      }

      const detailData = await res.json();

      // title 설정
      let title;
      if (detailData.adoptionStatus === 'APPROVED') {
        title = '승인되었습니다.';
      } else if (detailData.adoptionStatus === 'REJECTED') {
        title = '거절되었습니다.';
      } else {
        title = '처리중입니다.';
      }

      const reasonsRefusal =
        detailData.adoptionStatus !== 'APPROVED'
          ? `사유 : ${detailData.reasonsRefusal}`
          : '';
      Swal.fire({
        title: title,
        text: reasonsRefusal,
        confirmButtonColor: '#e89b93',
        confirmButtonText: '확인',
      });
    } catch (error) {
      console.error('입양 상세 정보를 가져오는 중 에러 발생:', error);
    }
  };

  return (
    <div className='mypage-fixed'>
      <div className='group-wrapper'>
        <div className='group'>
          <div className='overlap'>
            <button className='mypage-tap'>
              <Link to='/user/mypage'>마이페이지</Link>
            </button>
          </div>
          <button className='modify-tap'>
            <Link to='/user/modify'>개인정보변경</Link>
          </button>
          <button className='adoptionstatus'>
            <Link to='/user/adoptionstatus'>입양신청현황</Link>
          </button>
          <button className='like-list-tap'>
            <Link to='/user/likelist'>좋아요목록</Link>
          </button>
          <button className='order-history'>
            <Link to='/user/orderhistory'>주문 현황</Link>
          </button>
          <div className='mypage-title'>
            <span> 입양 신청 현황</span>
          </div>

          <div className='adoption-status'>
            {adoptionList.length === 0 ? (
              <p>입양 신청 현황이 없습니다.</p>
            ) : (
              adoptionList.map((adoptionStatus) => (
                <div
                  key={adoptionStatus.contractNo}
                  className='divv'
                >
                  <p className='dog-profil'>
                    신청자 성함 : {adoptionStatus.userName}{' '}
                  </p>
                  <p className='dog-profil'>
                    {' '}
                    나이 : {adoptionStatus.userAge}세{' '}
                  </p>
                  <p className='dog-profil'> 직업 : {adoptionStatus.job} </p>
                  <p className='dog-profil'>
                    {' '}
                    신청날짜 : {formattedDate(adoptionStatus.createDate)}
                  </p>
                  <p className='dog-profil'>
                    입양사유 : {adoptionStatus.reason}{' '}
                  </p>
                  <p className='dog-profil2'>
                    {' '}
                    유기번호 : {adoptionStatus.desertionNo}{' '}
                  </p>
                  <p className='dog-profil2'>
                    {' '}
                    휴대전화번호 : {adoptionStatus.userPhone}{' '}
                  </p>
                  <p className='dog-profil2'>
                    {' '}
                    이메일 : {adoptionStatus.userEmail}{' '}
                  </p>
                  <p className='dog-profil2'>
                    {' '}
                    주소 : {adoptionStatus.postAddr}{' '}
                  </p>
                  {adoptionStatus.adoptionStatus === 'PENDING' ? (
                    <button
                      disabled
                      id='in-progress'
                    >
                      처리중
                    </button>
                  ) : (
                    <button
                      className='result-button'
                      onClick={() => handleShowModal(adoptionStatus.contractNo)}
                    >
                      결과확인
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionStatus;
