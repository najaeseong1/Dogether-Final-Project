import React, { useState } from 'react';
import './Product.scss';
import { Link, useNavigate } from 'react-router-dom';

const Product = () => {
  const imagePath =
    'https://shopping-phinf.pstatic.net/main_3752457/37524570621.2.20230130114938.jpg?type=f640';

  const redirection = useNavigate();

  const toproductdetail = () => {
    redirection('/product/productdetail');
  };
  return (
    <div className='product'>
      <h1>자체 제작 상품</h1>
      <h5>장바구니</h5>
      <div className='product_img'>
        <img
          src={imagePath}
          alt='product'
          onClick={toproductdetail}
        />
      </div>
      <Link to='#'>
        <div className='product_img'></div>
      </Link>
      <div className='product-name'>
        <span> 냠냠 맛나는 사료</span>
      </div>
      <div className='product-price'>
        <span className='price'>8,000원</span>
      </div>
    </div>
  );
};
export default Product;
