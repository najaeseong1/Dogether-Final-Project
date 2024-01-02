const CLIENT_ID = 'iC1zs4_n4fDkY9whYorf'; // REST API 키
const REDIRECT_URI = 'http://localhost:3000/user/naverlogin'; //Redirect URI
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
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`;

// 파라미터 시작은 ? 부터.

//배포후 web플랫폼에서 배포주소 추가해주기.

// 나재성 : 이건 지금 Getting 선배님들 거라서 나중에 수정해야 합니다.
//          이런식으로 노출 되면 안됨요 찬규: 네
