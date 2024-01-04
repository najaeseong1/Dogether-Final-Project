import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdoptionStatus.scss';
import Swal from 'sweetalert2';
import { API_BASE_URL, CONTRACT } from '../../global/config/host-config';

const AdoptionStatus = () => {
  // 더미데이터
  // const AdoptionStatuslist = {
  //   profile_img:
  //     'https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  //   name: '말티즈',
  //   gender: 'M',
  //   age: '2016(년생)',
  //   neuter_yn: 'Y',
  // };

  // 결과 확인 버튼 클릭시 모달창 open!

  // const handleShowModal = () => {
  //   Swal.fire({
  //     title: '승인되었습니다.',
  //     width: 600,
  //     padding: '3em',
  //     color: '#e89b93',
  //     backdrop: `
  //       rgba(0, 0, 0, 0.3)
  //       no-repeat
  //     `,
  //   });
  // };

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

        // 사용자의 아이디와 일치하는 입양신청서만 필터링
        const userAdoptionList = data.dtoList.filter(
          (adoption) => adoption.userId === localStorage.getItem('USER_ID')
        );

        setAdoptionList(userAdoptionList);
        console.log(userAdoptionList);
        //setAdoptionList(data.dtoList);
        //console.log(data.dtoList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowModal = async (contractNo, status) => {
    try {
      // contractNo를 사용하여 입양 상세 정보를 가져오기 위한 요청
      const res = await fetch(
        `${API_BASE_URL}${CONTRACT}/mypageadoptiondetail?contractNo=${contractNo}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          },
        }
      );

      if (!res.ok) {
        // 400 Bad Request인 경우
        if (res.status === 400) {
          // 모달 표시
          Swal.fire({
            title: '승인되지 않았습니다.',
            text: '입양 상세 정보를 가져오는 중 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인',
          });
        } else {
          // 다른 오류 코드에 대한 처리
          throw new Error(`네트워크 응답이 올바르지 않습니다: ${res.status}`);
        }
      }

      // 200 OK인 경우
      const detailData = await res.json();

      // title 설정
      let title;
      if (detailData.adoptionStatus === 'APPROVED') {
        title = '승인되었습니다.';
      } else if (detailData.adoptionStatus === 'REJECTED') {
        title = '거절되었습니다.';
      } else {
        title = '알 수 없는 상태입니다.';
      }

      // 입양 상세 정보를 모달에 표시
      Swal.fire({
        title: title,
        html: `
        <p>유기 동물 번호: ${detailData.desertionNo}</p>
        <p>종: ${detailData.kindCd}</p>
        <p>성별: ${detailData.gender}</p>
        <p>발견 장소: ${detailData.happenAddr}</p>
      `,
        width: 600,
        padding: '3em',
        color: '#e89b93',
        backdrop: `
          rgba(0, 0, 0, 0.3)
          no-repeat
        `,
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
                  <p className='dog-profil'> {adoptionStatus.userAge}세 </p>
                  <p className='dog-profil'> 직업 : {adoptionStatus.job} </p>
                  <p className='dog-profil'>
                    {' '}
                    신청사유 : {adoptionStatus.reason}{' '}
                  </p>
                  <p className='dog-profil'>
                    {' '}
                    유기번호 : {adoptionStatus.desertionNo}{' '}
                  </p>
                  <p className='dog-profil2'>
                    {' '}
                    신청날짜 : {adoptionStatus.createDate}{' '}
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
                    신청자 거주지 : {adoptionStatus.userEmail}{' '}
                  </p>
                  <p className='dog-profil2'>
                    {' '}
                    입양신청 상태 : {adoptionStatus.adoptionStatus}{' '}
                  </p>
                  {adoptionStatus.adoptionStatus === 'PENDING' ? (
                    <button disabled>처리중</button>
                  ) : (
                    <button
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
