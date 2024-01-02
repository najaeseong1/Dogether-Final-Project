// 브라우저에서 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;

let backEndHostName; // 백엔드 서버 호스트 이름
let frontEndHostName; // 백엔드 서버 호스트 이름

if (clientHostName === 'localhost') {
  // 개발 중
  frontEndHostName = 'http://localhost:3000';
  backEndHostName = 'http://localhost:8181';
} else if (clientHostName === 'http://dogether.site') {
  // 배포해서 서비스 중 (인스턴스 계속 바뀌니까 확인 해야함)
  frontEndHostName = 'http://dogether.site';
  backEndHostName = 'http://15.164.203.234';
}
export const API_BASE_URL = backEndHostName;
export const API_FRONT_URL = frontEndHostName;

export const KAKAO_KEY = `${process.env.REACT_APP_KAKAO_REST_KEY}`;
export const KAKAO_URL = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;

export const NAVER_KEY = `${process.env.REACT_APP_NAVER_REST_KEY}`;
export const NAVER_URL = `${process.env.REACT_APP_NAVER_REDIRECT_URL}`;

export const USER = '/user';
export const ADOPT = '/adopt';
export const CONTRACT = '/contract';
export const BOARD = '/board';
export const REPLY = '/reply';
export const KNOWLEDGES = '/knowledges';
export const PRODUCT = '/product';
export const ADMIN = '/admin';
export const PAYMENT = '/payment';
