import React, { useEffect, useState } from 'react';
import './AdoptionList.scss';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Link,
  Pagination,
  PaginationItem,
  Stack,
} from '@mui/material';
import axios from 'axios';
import Select from 'react-select';
import LoadingPink from '../../global/LoadingPink';
import { ADOPT, API_BASE_URL } from '../../global/config/host-config';

const AdoptionList = () => {
  const navigate = useNavigate();

  //클릭시 강아지 상세정보 페이지로 이동
  // const goAdoptionListDetail = () => {
  //   navigate(`/adopt/detail/${adoptList.desertionNo}`);
  // }

  // const [adoptList, setAdoptList ] = useState([
  //   {
  //     desertionNo: '',
  //     kindCd: '',
  //     gender: '',
  //     age:'',
  //     neuterYn: '',
  //     profileImg:'',
  //   }
  // ]);

  const [uprCd, setUprCd] = useState('ALL');

  const online = [
    { value: 'ALL', label: 'ALL' },
    { value: '6110000', label: '서울특별시' },
    { value: '6260000', label: '부산광역시' },
    { value: '6270000', label: '대구광역시' },
    { value: '6280000', label: '인천광역시' },
    { value: '6290000', label: '광주광역시' },
    { value: '5690000', label: '세종특별자치시' },
    { value: '6300000', label: '대전광역시' },
    { value: '6310000', label: '울산광역시' },
    { value: '6410000', label: '경기도' },
    { value: '6530000', label: '강원특별자치도' },
    { value: '6430000', label: '충청북도' },
    { value: '6440000', label: '충청남도' },
    { value: '6450000', label: '전라북도' },
    { value: '6460000', label: '전라남도' },
    { value: '6270000', label: '경상북도' },
    { value: '6470000', label: '경상남도' },
    { value: '6500000', label: '제주특별자치도' },
  ];

  const [selectOnline, setSelectOnline] = useState(online[0]);
  const [filteredAdoptList, setFilteredAdoptList] = useState([]);

  const handleSelectChange = (selectedOption) => {
    setSelectOnline(selectedOption);
    setUprCd(selectedOption.value); // 선택된 값으로 uprCd 업데이트
  };

    //입양 리스트
   const [adoptList, setAdoptList] = useState([]);
   //로딩 상태 변수
   const [loading, setLoding] = useState();
   // 페이지 당 보여줄 프레임 개수
   const itemsPerPage = 12;
   const [currentPage, setCurrentPage] = useState(1);

   // 입양 상세페이지로 요청
   const goAdoptionListDetail = (desertionNo) => {
    fetch(`http://localhost:8181/adopt/detail/${desertionNo}`)
      .then((response) => response.json())
      .then((data) => {
        // 상세 페이지로 이동하는 로직을 추가
        // const selectedDog = adoptList.find(item => item.desertionNo === desertionNo);
        navigate(`/adopt/detail/${desertionNo}`, {
          state: { adoptListDetail: data },
        });
        console.log('상세 페이지 데이터:', data);
      })
      .catch((error) => {
        console.error('상세 페이지로 이동 중 에러 발생:', error);
      });
  };

  // 입양 리스트 조건 검색
  useEffect(() => {
    setLoding(true);
    axios
      .get(`${API_BASE_URL}${ADOPT}/adminicode?uprCd=${uprCd}`)
      .then((res) => {
        setFilteredAdoptList(res.data.adoptLists)
        setLoding(false);
      })
      .catch((err) => {
        console.error(err);
        setLoding(false);
      });
  }, [uprCd]);

  useEffect(() => {
    // 입양 리스트 '/adopt 요청'
    axios
      .get(`${API_BASE_URL}${ADOPT}`)
      .then((res)=>{
        setAdoptList(res.data.adoptLists);      //.slice(0,12)
        setFilteredAdoptList(res.data.adoptLists);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // 카테고리 선택에 따른 필터링
  useEffect(() => {
    if (uprCd && uprCd !== 'ALL') {
      const filteredList = adoptList.filter((item) => item.uprCd === uprCd);
      setFilteredAdoptList(filteredList);
    } else {
      // 카테고리가 선택되지 않은 경우 전체 목록 표시
      setFilteredAdoptList(adoptList);
    }
  }, [uprCd, adoptList]);

  console.log('입양리스트 : axios 후에', adoptList);

  const cutAdoptList = adoptList.slice(0, 12);

  // 입양 리스트 페이징 설정
  const totalItems = filteredAdoptList.length; //adoptList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    if (loading) {
      // 로딩 중일 때는 클릭 이벤트를 무시
      return;
    }
    setCurrentPage(page);
  };

  const paginatedData = filteredAdoptList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const paginatedData = adoptList.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );


 
  return (
    <div className="index">

    <div className="div">
    {loading ? (
      <div className="loading-pink" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
      {/* 로딩 바의 내용 */}
          <LoadingPink />
          </div>
        ) : (
          <>
        <form>
          <label>
            <Select
              className='category'
              options={online}
              onChange={handleSelectChange}
              defaultValue={online[0]}
              value={selectOnline}
            />
            {/* <select  className='category'  >
            <option >ALL</option>
            <option value='6110000'>서울특별시</option>
            <option value='6260000'>부산광역시</option>
            <option value='6270000'>대구광역시</option>
            <option value='6280000'>인천광역시</option>
            <option value='6290000'>광주광역시</option>
            <option value='5690000'>세종특별자치시</option>
            <option value='6300000'>대전광역시</option>
            <option value='6310000'>울산광역시</option>
            <option value='6410000'>경기도</option>
            <option value='6530000'>강원특별자치도</option>
            <option value='6430000'>충청북도</option>
            <option value='6440000'>충청남도</option>
            <option value='6450000'>전라북도</option>
            <option value='6460000'>전라남도</option>
            <option value='6270000'>경상북도</option>
            <option value='6480000'>경상남도</option>
            <option value='6500000'>제주특별자치도</option>     
          </select> */}
          </label>

          <label>
            <input
              className='searchbar'
              type='text'
              placeholder=''
            ></input>
          </label>
        </form>

        {/* {cutAdoptList.map((adoptList, index) => (
          <div key={index} className={`frame-${index + 1}`} onClick={goAdoptionListDetail}>        
            <img className={`image-${index + 1}`} src={adoptList.profileImg} alt={`dogImg ${index + 1}`} />
              <div className={`frameInfo-${index + 1}`}>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
          </div>
          
        ))} */}

        {/* 여기에 폼 코드를 추가하세요 */}
       
        {paginatedData.map((item, index) => (
          <div
            key={index}
            className={`frame-${index + 1}`}
            onClick={() => goAdoptionListDetail(item.desertionNo)}
          >
            <img
              className={`image-${index + 1}`}
              src={item.profileImg}
              alt={`dogImg ${index + 1}`}
            />
            <div className={`frameInfo-${index + 1}`}>
              견종: {item.kindCd} <br />
              성별: {item.gender} <br />
              나이: {item.age} <br />
              중성화여부: {item.neuterYn}
            </div>
          </div>
        ))}

        {/* 현재 페이지에 해당하는 데이터 표시
          <ul>
            {paginatedData.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul> */}

        <div className='pageNum'>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => handleClick(page)}
              showFirstButton //맨 마지막
              showLastButton //맨 처음
              variant='outlined'
            />
          </Stack>
          </div>

       
            
          </>
        )}
     
    </div>
    </div>
  );
};

export default AdoptionList;
