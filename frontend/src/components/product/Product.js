// Product.js

import React, { useState, useEffect } from 'react';
import './Product.scss';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const products = [
  {
    id: 1,
    imageSrc:
      '//pethroom.com/web/product/medium/202208/6406178e3005b192086b575413018e52.jpg',
    title: '포인트 클린 세트 (포인트칫솔+클린치약)',
    subtitle: '언제 어디서든 물 없이 간편하게 세정할 수 있는 워터리스 샴푸',
    price: '11,900원',
  },
  {
    id: 2,
    imageSrc:
      '//pethroom.com/web/product/medium/202305/90946a657e97dc0f70f14f08f3f32f07.jpg',
    title: '제로 워터리스 샴푸',
    subtitle: '언제 어디서든 물 없이 간편하게 세정할 수 있는 워터리스 샴푸',
    price: '11,900원',
  },
  {
    id: 3,
    imageSrc:
      '//pethroom.com/web/product/medium/202208/6406178e3005b192086b575413018e52.jpg',
    title: '제로 워터리스 샴푸',
    subtitle: '언제 어디서든 물 없이 간편하게 세정할 수 있는 워터리스 샴푸',
    price: '11,900원',
  },
  {
    id: 4,
    imageSrc:
      '//pethroom.com/web/product/medium/202208/6406178e3005b192086b575413018e52.jpg',
    title: '제로 워터리스 샴푸',
    subtitle: '언제 어디서든 물 없이 간편하게 세정할 수 있는 워터리스 샴푸',
    price: '11,900원',
  },
];

const Product = () => {
  const redirection = useNavigate();
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 담을 useState
  const [cartCount, setCartCount] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center-center',
      showConfirmButton: false,
      timer: 1500,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: '상품이 담겼습니다.<br> 장바구니를 확인해주세요!',
    });
    setCartCount(cartCount + 1);
    setCartItems([...cartItems, product]);
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     performSearch();
  //   }
  // };
  const filterBySearchTerm = (product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase());

  const filteredData =
    products.length > 0 ? products.filter(filterBySearchTerm) : [];

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cartdatailhandler = () => {
    redirection('/cart');
  };

  const todetailProducthandler = (product) => {
    Swal.fire({
      html: `
  
   <div class="order-details">
       <img src="${product.imageSrc}" alt="상품 이미지" class="product-img">
       <h2> ${product.title}</h2>
         <p> ${product.subtitle}</p>
       <p>상품 금액: ${product.price}</p>
     <div class="caution_style">CAUTION</div>
     <P class="caution_class">
    
    1. 제품 사용 시 또는 직사광선에 의하여 사용 부위가<br>
        붉은 반점, 부어오름, 가려움증 등의 이상 증상이나 부작용 시 수의사와 상담할 것<br>
    2. 상처가 있는 부위 등 이상이 있는 부위에는 사용하지 말 것<br>
    3. 반려동물의 눈 주위, 점막 등에는 사용하지 말 것<br>
    4. 유아, 소아의 손에 닿지 않는 곳에 보관할 것<br>
 
     </P>
     <div class="caution_style">INFORMATION</div>
        <p class="info"> 판매원 : Dogether <br>
            고객 상담실 : 1644-9603 <br>
            원산지 : Made in KOREA</p>
        <p>본 제품은 공정거래위원회 고시 "소비자분쟁해결기준"에 의거하여<br> 교환 또는 보상을 받을 수 있습니다.</p>
   </div>
`,

      width: 800,
      padding: '3em',
      color: '#000000',
      backdrop: `
        rgba(0, 0, 0, 0.3)
        no-repeat
      
    `,

      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
    });
  };

  return (
    <>
      <iframe
        id='video-zoom1'
        src='https://player.vimeo.com/video/848943597?autoplay=1&loop=1&color=080037&title=0&byline=0&portrait=0&background=1'
        allow='autoplay; fullscreen; picture-in-picture'
        allowfullscreen
      />
      <div
        div
        id='productProductContainer'
      >
        <div id='divproductsearch'>
          <div className='productTitle'>ALL PRODUCTS</div>
          <input
            type='text'
            placeholder='검색어를 입력하세요.'
            id='productsearch'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
        </div>

        <div className='product-container'>
          {filteredData.map((product) => (
            <div
              className={`product-item ${
                filteredData.length === 1 ? 'small' : ''
              }`}
              key={product.id}
            >
              <img
                src={product.imageSrc}
                alt={product.title}
                onClick={() => todetailProducthandler(product)}
              />
              <div className='title'>{product.title}</div>
              <div className='subtitle'>{product.subtitle}</div>
              <div className='price'>{product.price}</div>
              <button
                className='buy-button'
                onClick={() => addToCart(product)}
              >
                구매하기
              </button>
            </div>
          ))}
        </div>
        <div className='cart'>
          <div
            className='cart-icon'
            onClick={() => cartdatailhandler()}
          >
            🛒
          </div>
          <div className='cart-count'>{cartCount}</div>
        </div>
      </div>
    </>
  );
};

export default Product;
