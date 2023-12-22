import React, { useEffect, useState } from 'react';
import './AdoptionList.scss';
import { useNavigate } from 'react-router-dom';
import { IconButton, Link, Pagination, PaginationItem, Stack } from '@mui/material';
import axios from 'axios';

const AdoptionList = () => {

  const navigate = useNavigate();

  //클릭시 강아지 상세정보 페이지로 이동
  const goAdoptionListDetail = () => {
    navigate(`/adopt/detail/${adoptList.desertionNo}`);
  }

  // 페이지 당 보여줄 아이템 개수
  const itemsPerPage = 12;

  const allData = [
    { id: 1, category: 'A', name: 'Item 1' },
    { id: 2, category: 'B', name: 'Item 2' },
    { id: 3, category: 'c', name: 'Item 3' }
  ];

  // 현재 페이지와 선택한 카테고리를 관리하는 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All'); // 초기값은 전체 카테고리

  // 선택한 카테고리에 따라 데이터 필터링
  const filteredData = selectedCategory === 'All'
    ? allData
    : allData.filter(item => item.category === selectedCategory);

  // 총 페이지 수 계산
  const totalButtonCount = Math.ceil(filteredData.length / itemsPerPage);
  
   // 현재 페이지에 해당하는 데이터 슬라이스
   const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // 카테고리 변경 함수
  const handleCategoryChange = (newCategory) => {
    setCurrentPage(1); // 카테고리가 변경되면 페이지를 1로 초기화
    setSelectedCategory(newCategory);
  };




  const [adoptList, setAdoptList ] = useState([
    {
      desertionNo: '',
      kindCd: '',
      gender: '',
      age:'',
      neuterYn: '',
      profileImg:'',
    }
  ]);

  useEffect(() => {

    // 입양 리스트 '/adopt 요청'
    axios
      .get('/adopt')
      .then((res)=>{
        setAdoptList(res.data)
      })
      .catch((err) => {
        console.error(err);
      });

    
    // 입양리스트 조건검색 요청 '/adopt/{uprCd}'
    axios
      .get(`/adopt/uprCd/adminiCode?uprCd={uprCd}`)
      .then((res) => {
        setAdoptList(res.data)
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

   
  const cutAdoptList = adoptList.slice(0, 13);

  

  //mui에서 현재 기본 정보를 담고 있는 event 객체를 원함 그래서 인자 두개
  // const handlePageChange = (event, page) => {
  //   setCurrentPage(page);
  // };

  // const paginatedData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  return (
    <div className="index">

    <div className="div">

        <form>
        <label>  
          <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className='category' >
            <option value='ALL'>ALL</option>
            <option value='부산'>부산</option>
          </select>
        </label>

        <label>
          <input className='searchbar' type='text' placeholder=''></input>
        </label>
        </form>

          {/* <div className="frame-1" onClick={goAdoptionListDetail}>
              <img
                className="image-1"
                src="/img/dogPic/dogdog.jpeg"
                alt="profile"
              />           
          </div>
          */} 

        {cutAdoptList.map((adoptList, index) => (
          <div key={index} className="frame-1" onClick={goAdoptionListDetail}>        
            <img className={`image-${index + 1}`} src="/img/dogPic/dogdog.jpeg" alt={`dogImg ${index + 1}`} />
              <div className='frameInfo-1'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
          </div>
          
        ))}

         

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-2" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 2}`} src="/img/dogPic/dogdog.jpeg" alt={`dogImg ${index + 2}`} />
              <div className='frameInfo-2'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}


        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-3" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 3}`} src={adoptList.profileImg} alt={`dogImg ${index + 3}`} />
              <div className='frameInfo-3'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-4" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 4}`} src={adoptList.profileImg} alt={`dogImg ${index + 4}`} />
              <div className='frameInfo-4'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-5" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 5}`} src={adoptList.profileImg} alt={`dogImg ${index + 5}`} />
              <div className='frameInfo-5'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-6" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 6}`} src={adoptList.profileImg} alt={`dogImg ${index + 6}`} />
              <div className='frameInfo-6'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-7" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 7}`} src={adoptList.profileImg} alt={`dogImg ${index + 7}`} />
              <div className='frameInfo-7'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-8" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 8}`} src={adoptList.profileImg} alt={`dogImg ${index + 8}`} />
              <div className='frameInfo-8'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-9" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 9}`} src={adoptList.profileImg} alt={`dogImg ${index + 9}`} />
              <div className='frameInfo-9'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-10" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 10}`} src={adoptList.profileImg} alt={`dogImg ${index + 10}`} />
              <div className='frameInfo-10'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-11" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 11}`} src={adoptList.profileImg} alt={`dogImg ${index + 11}`} />
              <div className='frameInfo-11'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
              </div>
            </div>
          ))}

        {cutAdoptList.map((adoptList, index) => (
            <div key={index} className="frame-12" onClick={goAdoptionListDetail}>        
              <img className={`image-${index + 12}`} src={adoptList.profileImg} alt={`dogImg ${index + 12}`} />
              <div className='frameInfo-12'>
                견종: {adoptList.kindCd} <br/>
                성별: {adoptList.gender} <br/>
                나이: {adoptList.age} <br/>
                중성화여부: {adoptList.neuterYn}
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
              count={totalButtonCount}
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton //맨 마지막
              showLastButton  //맨 처음
              variant='outlined'         
            />           
          </Stack>
          </div>

       
            
      
     
    </div>
  </div>
  )
}

export default AdoptionList