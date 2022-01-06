import { Global } from '@emotion/react';

// 프리텐다드 사이트에서 제공하는 css 파일의 내용을 그대로 사용.
function GlobalStyleLoader() {
  const styles = `
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap');

@font-face {
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: local('Pretendard Variable'),
       url('/fonts/PretendardVariable.woff2') format('woff2-variations'), /* Super Modern Browsers */
       url('/fonts/PretendardVariable.tff') format('truetype'); /* Safari, Android, iOS */

}

@font-face {
	font-family: 'KP CR Tungkeun', sans-serif;
	font-weight: 500;
	font-display: swap;
	src: local('KP CR Tungkeun'), url('/fonts/KCC-KP-CR_Tungkeun-Medium-KP-2011KPS.ttf') format('truetype');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 900;
	font-display: swap;
	src: local('Pretendard Black'), url('/fonts/woff2/Pretendard-Black.woff2') format('woff2'), url('/fonts/woff/Pretendard-Black.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 800;
	font-display: swap;
	src: local('Pretendard ExtraBold'), url('/fonts/woff2/Pretendard-ExtraBold.woff2') format('woff2'), url('/fonts/woff/Pretendard-ExtraBold.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 700;
	font-display: swap;
	src: local('Pretendard Bold'), url('/fonts/woff2/Pretendard-Bold.woff2') format('woff2'), url('/fonts/woff/Pretendard-Bold.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 600;
	font-display: swap;
	src: local('Pretendard SemiBold'), url('/fonts/woff2/Pretendard-SemiBold.woff2') format('woff2'), url('/fonts/woff/Pretendard-SemiBold.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 500;
	font-display: swap;
	src: local('Pretendard Medium'), url('/fonts/woff2/Pretendard-Medium.woff2') format('woff2'), url('/fonts/woff/Pretendard-Medium.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 400;
	font-display: swap;
	src: local('Pretendard Regular'), url('/fonts/woff2/Pretendard-Regular.woff2') format('woff2'), url('/fonts/woff/Pretendard-Regular.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 300;
	font-display: swap;
	src: local('Pretendard Light'), url('/fonts/woff2/Pretendard-Light.woff2') format('woff2'), url('/fonts/woff/Pretendard-Light.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 200;
	font-display: swap;
	src: local('Pretendard ExtraLight'), url('/fonts/woff2/Pretendard-ExtraLight.woff2') format('woff2'), url('/fonts/woff/Pretendard-ExtraLight.woff') format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 100;
	font-display: swap;
	src: local('Pretendard Thin'), url('/fonts/woff2/Pretendard-Thin.woff2') format('woff2'), url('/fonts/woff/Pretendard-Thin.woff') format('woff');
}
`;

  return <Global styles={styles} />;
}
export default GlobalStyleLoader;
