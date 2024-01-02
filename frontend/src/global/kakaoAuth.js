import { API_FRONT_URL, KAKAO_KEY, KAKAO_URL } from './config/host-config';
/*
    개발 과정에서 API_KEY, DB관련 정보 등 외부로 노출되면 안되는 값들이 있는데,
    .env 파일을 통해 내부적으로만 사용할 수 있게 설정할 수 있다. (.env -> 환경변수 설정을 위한 파일)
    .env 파일 내의 값을 읽어올 때는 [process.env.지정한이름] 을 통해 값을 불러올 수 있다.

    React 환경에서 .env 내의 데이터를 읽어올 때는 반드시 REACT_APP_를 붙여 주셔야 합니다.
*/

const CLIENT_ID = `${KAKAO_KEY}`; // REST API 키
const REDIRECT_URI = `${API_FRONT_URL}${KAKAO_URL}`; //Redirect URI
// const REDIRECT_URI =
//   'http://gettingtest.s3-website.ap-northeast-2.amazonaws.com/oauth/callback/kakao'; //Redirect URI
// const REDIRECT_URI = 'https://happygetting.com/oauth/callback/kakao'; //Redirect URI
// const REDIRECT_URI = 'http://imcute.shop/oauth/callback/kakao'; //Redirect URI

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
// 파라미터 시작은 ? 부터.

//배포후 web플랫폼에서 배포주소 추가해주기.

// 나재성 : 이건 지금 Getting 선배님들 거라서 나중에 수정해야 합니다.
//          이런식으로 노출 되면 안됨요 찬규: 네
