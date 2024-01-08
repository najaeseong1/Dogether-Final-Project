import { API_FRONT_URL, NAVER_KEY, NAVER_URL } from './config/host-config';

const CLIENT_ID = `${NAVER_KEY}`; // REST API 키
const REDIRECT_URI = `${API_FRONT_URL}${NAVER_URL}`; //Redirect URI

// state 생성 함수
const generateRandomState = () => {
  const state =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return state;
};

// state 값 생성
const state = generateRandomState();

// 네이버 OAuth 2.0 요청 URL 생성

// 챈규형이 추가한 무언가
// const REDIRECT_URI =
//   'http://gettingtest.s3-website.ap-northeast-2.amazonaws.com/oauth/callback/kakao'; //Redirect URI
// const REDIRECT_URI = 'https://happygetting.com/oauth/callback/kakao'; //Redirect URI
// const REDIRECT_URI = 'http://imcute.shop/oauth/callback/kakao'; //Redirect URI

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;
// 파라미터 시작은 ? 부터.

//배포후 web플랫폼에서 배포주소 추가해주기.
