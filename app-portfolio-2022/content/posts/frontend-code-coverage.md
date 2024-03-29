---
title: 프론트엔드 코드 커버리지
tags:
  - frontend
datePublish: '2021-09-30T15:00:00.000Z'
---

개발자는 숫자를 좋아합니다. 꼭 컴퓨터와 수학의 역사가 밀접한 관련이 있기 때문만은 아닙니다. 코드는 계측과 수량화가 매우 어렵기 때문입니다. 테스트코드(이하 TC)도 크게 다르지 않습니다. 어디서 어디까지를 테스트 범위로 잡아야할지도 문제고, 테스트 통과만으로도 소프트웨어의 무결성을 증명하기는 무척 어렵습니다.

코드 커버리지가 이런 난관에 큰 도움이 됩니다. 코드 커버리지는 테스트코드에 수량화된 척도를 제시하는 도구입니다.

# 원리

원리는 간단합니다. 모든 코드에 번호를 부여하고, 테스트가 해당 코드를 지나갈 때마다 번호를 지워나갑니다.

```
1 if (a) {
2   do something
3 }
4 print('finish')
```

만약 `a == false` 라면 1번과 4번이 실행과 동시에 커버된 코드로 인정되면서 지워지고, 2번과 3번이 남습니다.

```
// a == false
1 if (a) { // 커버 됨
2   do something // 커버 안됨
3 } // 커버 안됨
4 print('finish') // 커버 됨
```

총 4 줄의 코드중에 2줄의 코드가 커버되었기 때문에, 코드 커버리지 완성도는 `2/4=50%`가 됩니다. 그렇기 때문에 테스트 코드에서 `a == true` 인 경우를 제시하면, 코드 커버리지의 완성도는 100%가 됩니다.

잠깐 생각해보면 알 수 있지만 코드 커버리지의 100%가 코드의 안전성이 100%라는 뜻은 절대 아닙니다. 다만 현재 작성한 TC가 이전에 작성한 TC에 비해서 얼마나 넓은 범위를 커버하는지를 비교할 수는 있습니다. 코드 커버리지 50%일 때보다, 코드 커버리지 60% 일 때가 상대적으로 TC의 방어범위가 높아져 더욱 안전해 졌다고 말할 수 있게 됩니다.

# 프론트엔드 코드 커버리지

위에서 본 것과 유사한 형태의 유닛 테스트는 텍스트 자료 기반의 백엔드에 더욱 알맞습니다. 그러나 프론트엔드도 테스트에 있어서 정량적인 지표가 있다면 작업이 좀 더 유리해지는 것은 자명합니다. 그래서 불완전하고 불편한 환경에도 불구하고 코드 커버리지를 어떤 식으로든 사용할 수 있게 하는 각종 도구들이 있습니다. 현재 유명한 개발스택 위주로 정리하면 이와 같은 도구들이 있습니다.

* Jest: [자체적으로 코드 커버리지를 지원](https://jestjs.io/docs/cli#--coverageboolean)합니다
* Cypress: [관련 플러그인](https://github.com/cypress-io/code-coverage)을 지원합니다 → 크로미움 내부의 `window.` 에 코드 커버리지용 별도 함수를 추가한 뒤, 함수에 모인 지표를 다시 종합하여 코드 커버리지를 작성합니다.

## 프론트엔드 코드 커버리지 통합하기

문제는 코드 커버리지 환경이 이와 같이 제각각이기 때문에, 별도의 통합 과정을 거쳐야한다는 것입니다.

그나마 다행이라고 한다면, 프론트엔드-자바스크립트(이하 JS)환경에서는 대부분의 코드 커버리지가 노드용 코드 커버리지 툴인 [istanbul](https://istanbul.js.org/) 을 기반으로 하고 있어서, 하나로 내용을 머지하기 용이합니다.

istanbul(이하 이스탄불)의 CLI라고할 수 있는 [nyc](https://github.com/istanbuljs/nyc)를 이용하여 서로 다른 코드 커버리지를 머지할 수 있습니다.

```bash
nyc merge $TARGET_FOLDER $OUTPUT
```

## 필요하지 않은 코드 커버리지 생략하기

프론트엔드의 경우 유닛테스트를 통해 확인하기 어려운 코드들이 있습니다. 노드와 브라우저의 환경이 완벽하게 일치하지 않기 때문입니다. 그 뿐만 아니라 너무나 내용이 명확하여 별도의 테스트가 필요하지 않은 경우도 있습니다. 이 경우 eslint에서 린팅을 생략하듯이 특정 코드에만 커버리지를 생략할 수 있습니다.

```javascript
// 내용이 너무 명확하여, 커버리지 생략
/* istanbul ignore next */
const makeResult: makeResultArg = (result) => {
  return { errorCode: '', error: null, result };
};

// 파일 blob을 다운로드하도록 해야하는데,
// 해당 내용을 jest 내부의 node환경에서 100% 재현하기 어렵기 때문에 커버리지 생략
/* istanbul ignore next */
saveJson(exportObj, 'settings.json');

// env 파일의 경우도 내용이 너무 명확하여, 커버리지 생략
/* istanbul ignore file */
// tiny wrapper with default env vars
const NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  NODE_ENV,
  PORT: process.env.PORT || 3000,
  isBuildPerformanceLog: process.env.BUILD_PERFORMANCE_LOG === 'true',
  isCypress: process.env.CYPRESS_MODE === 'true',
  isDevelop: NODE_ENV === 'development',
};
```

# 보고서

프론트엔드 코드 커버리지는 도구에 관계없이 대체로 `.json` 또는 `lcov.info` 파일로 생성됩니다. lcov란 GNU 컴파일러(GCC)용 코드 커버리지 도구인 gcov(Gnu code COVerage)의 리눅스(Linux code COVerage) 버전입니다. 아래는 샘플 프로젝트에서 작성한 lcov 파일입니다.

```
# lcov.info
TN:
SF:src/constants/blockMode.js
FNF:0
FNH:0
DA:1,4
DA:2,4
LF:2
LH:2
BRF:0
BRH:0
# ...
```

lcov 내부에는 알 수 없는 문자열과 숫자들 밖에 없습니다. 일반적인 코드 커버리지 리포트는 코드 커버리지를 사용하는 각종 도구간의 호환성을 보장하기 위해, 기계적인 포맷으로 제공됩니다. 사람이 읽기 어려울 수밖에 없습니다. 그래서 보통은 html이나 웹페이지 형태의 리포트를 별도로 제공합니다.

## 코드 커버리지 보고서 둘러보기

Jest로 코드 커버리지 리포트를 작성할 경우, 내부적으로 이스탄불의 코드 커버리지 도구를 사용하여 html 보고서를 작성해 줍니다. 보고서 내용은 아래와 같습니다.

![](https://sungryeol-portfolio-prod.s3.ap-northeast-2.amazonaws.com/code_coverage_html_report_a9b222b142.png)

어떤 파일이 얼마나 많은 구문에 대하여 TC가 작성되었고, 놓친 분기와 함수가 몇 개인지 등의 자료를 상세히 설명해 줍니다. 각 파일을 클릭하면 코드 커버리지를 실제 코드와 1:1 대응하여 보여줍니다.

![](https://sungryeol-portfolio-prod.s3.ap-northeast-2.amazonaws.com/html_report_detail_6dd54f644f.png)

빨간색은 커버되지 않은 내용입니다. 오른쪽에 표시된 숫자는 해당 코드를 실행한 숫자입니다.

* 숫자를 보고 중복 테스트되는 구문을 TC에서 정리할 수 있습니다.
* 빨간색 하이라이팅을 참조하여 TC내에서 실행되지 않은 구문이 어디인지 확인하고, 빠진 코드 커버리지를 빠르게 채울 수도 있습니다.

## CCaaS: Code Coverage as a Service

지금까지 많은 서비스들이 클라우드화 된 것을 관찰했습니다. Visual Regression Test를 클라우드화한 것(Percy)을 보기도 했고, 현지화를 서비스화한 LaaS 도 있었습니다. 잠깐 살펴보면 코드 커버리지도 클라우드 서비스화할 수 있는 여지가 매우 많습니다.

* 코드 커버리지 파일을 어디에 보관할 것인가? - git이 커지면 개발 환경 구성 및 각종 CICD에 악영향
* 코드 커버리지 html을 어떤 스타일로 작성할 것인가? - 이스탄불의 리포트가 보기 엄청 불편하지는 않지만, 기능성이 약간 부족하다
* 기존에 작성한 다른 커밋의 코드 커버리지와 새로운 코드 커버리지를 어떻게 비교할 것인가?

이를 해결하기 위해 통합 코드 커버리지 저장소 - 뷰어를 제공하는 서비스를 CCaaS(Code Coverage as a Service)라고 합니다.

2021년 기준으로 아래와 같은 CCaaS들이 있습니다.

* Codecov
* Coveralls
* Code Climate
* Codacy

[관련하여 블로그 내용을 참조](https://brunch.co.kr/@codertimo/5)하여 비교적 가성비라고 할 수 있는 Coveralls(이하 커버올즈)를 선택했습니다.

## CICD + CCaaS

CCaaS를 찾는 사용자들이 많아지면서 CICD 서비스에도 CCaaS 도입을 도와주는 다양한 도구들이 있습니다. 진행하고 있는 사이드프로젝트인 [Fokus](https://github.com/rabelais88/fokus) 는 CICD 서비스로 [Drone](https://drone.io)(이하 드론) 을 사용하고 있는데, 드론에도 커버올즈 세팅을 단번에 도와줄 수 있는 플러그인이 있었습니다. CICD용 yaml에 도커 이미지와 환경변수를 전달하여 커버올즈까지 업로드하는 파이프라인을 금방 완성할 수 있습니다.

```yaml
# http://plugins.drone.io/drone-plugins/drone-coveralls/
kind: pipeline
type: docker
name: "unit-test"

steps:
  # 우선 유닛 테스트를 실시한다
  - name: "jest unit test"
    image: node:12.20.2
    commands:
      - yarn install
      - yarn test-unit-ci
  # 유닛 테스트가 통과할 경우, 작성된 lcov.info파일을 coveralls용 토큰을 이용하여
  # coveralls에 업로드한다
  - name: "coveralls"
    image: lizheming/drone-coveralls
    environment:
      COVERALLS_REPO_TOKEN:
        from_secret: coveralls_token
    settings:
      files:
        - ./coverage/lcov.info
      token:
        from_secret: coveralls_token
```

### 예제

* [Coveralls에 올라간 Fokus 코드 커버리지](https://coveralls.io/github/rabelais88/fokus?branch=develop)

![](https://sungryeol-portfolio-prod.s3.ap-northeast-2.amazonaws.com/code_coverage_recent_builds_26c56c9800.png)

* improve-cicd-alt 브랜치에서 작업하여 develop 브랜치의 코드 커버리지가 48.4%로 오른 것을 확인할 수 있다.

![](https://sungryeol-portfolio-prod.s3.ap-northeast-2.amazonaws.com/code_coverage_file_detail_7449c0b99f.png)

* 이스탄불과 마찬가지로, 각 파일에 대한 지표도 확인할 수 있다.

![](https://sungryeol-portfolio-prod.s3.ap-northeast-2.amazonaws.com/code_coverage_commit_58f79a7519.png)

* 각 파일의 리포트는 이스탄불과 크게 다르지 않으나, 커밋 정보를 함께 볼 수 있어서 용이하다.

![](https://sungryeol-portfolio-prod.s3.ap-northeast-2.amazonaws.com/code_coverage_badge_a02cc5849a.png)

* 마크다운에 사용할 수 있는 뱃지도 제공한다.

커버올즈의 장점

* 세팅이 간단하고 무료티어 서비스를 제공하여 작업하기 수월

커버올즈의 단점

* UI가 매우 불편하고, 커스터마이징 지원이 약함

# 마무리

사이드 프로젝트에 코드 커버리지를 구성하며 느낀 문제점은 이러했습니다

* 코드 커버리지를 작업한다는 것은 코드를 작업하는 것도 아니고, TC를 작업하는 것도 아니다. TC만을 더욱 정밀하게 계량하기 위한 매우 부차적인 작업에 시간을 소모하게 된다.
* 프론트엔드에서 여러 종류의 코드 커버리지를 하고, 이를 머지하는 과정이 여러가지 장애물로 인해 매우 고통스럽다. 특히 테스트 컨테이너 가상화로 인해 더 어려워진 느낌.
* CCaaS가 아닌 코드 커버리지에서는 선택의 폭이 크지 않다: 대부분 내부적으로는 이스탄불을 사용하고 있다.

사이드 프로젝트에 코드 커버리지를 세팅하며 느낀 장점들은 아래와 같습니다.

* CCaaS를 도입하는 과정이 여러 서비스의 도움으로 생각보다 매우 간단해졌다.
* TC 작성이 곧 눈에 보이는 지표를 올려주는 일이 되기 때문에 TC작성을 좀 더 열심히 하게 된다.
* 아무렇게나 TC작성을 하기 보다, 코드 커버리지가 비어있는 곳 위주로 좀더 쓸모 있는 TC 작성을 하게 된다.

결론적으로는 초기 세팅을 위해 다소 자원이 소모되지만, TC의 질을 개선하기 위해서 코드 커버리지를 앞으로 새로 시작할 프로젝트에도 자주 도입할 것 같습니다. 다만 커버올즈는 여러가지 미비한 점들이 확인되어, 추후에는 Codecov를 사용할 것 같습니다.
