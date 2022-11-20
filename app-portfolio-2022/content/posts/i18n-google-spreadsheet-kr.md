---
title: 구글시트를 활용하여 현지화 자동화하기
tags:
  - frontend
datePublish: '2022-03-01T15:00:00.000Z'
---

안녕하세요, 개발본부 코칭크루 프론트엔드 박성렬입니다.

이번에 코칭 서비스에서는 현지화 문자열(localized string)을 시스템을 통하여 자동화된 환경으로 관리하도록 했습니다. 이 과정에서 왜 이러한 선택을 하였고, 구체적으로 어떤 방법을 사용했는지 정리해 보았습니다.

# 문자열 관리 시스템을 구성한 이유

현재 개발팀에서 화면에 표기되는 문자열은 아래와 같은 과정으로 관리합니다.

1. 💭기획 과정에서 화면을 구성
2. 🎨디자인 과정에서 화면에 있는 문자열을 그대로 복사
3. 🖥개발 과정에서 임시로 문자열 삽입
4. 🖥문자열을 개발에 용이하도록 추가 관리(key-value 형태로 관리)

이 문자열들은 모두 별도로 관리되므로 최소 3개 이상의 다른 문자열 자료들이 존재하게 됩니다.

1. 기획 문서상 문자열: atlassian confluence 문서
2. 디자인 문서상 문자열: figma, sketch 상에 표현된 문자열. 화면에서 문자열이 너무 길거나 짧을때의 심미성을 확인해야 하기 때문에 필요.
3. 개발 코드상 문자열: json 형태로 보관.

따라서 수정이 발생할 경우는 조금 더 복잡합니다. 보통 문자열 관리는 서비스의 정책과 긴밀하게 연관됩니다. 민감한 가격이나 법률적인 부분을 포함하고 있기 때문입니다. 따라서 2~4 과정을 거치며 이미 기획팀의 원안과 어느정도 차이가 있는 상태로 문자열이 관리되고 있는 상황인데, 이를 다시 기획팀에서 동기화 해야 합니다. 그리고 나서야 수정을 할 수 있고, 다시 1~3의 과정을 거쳐야 합니다.

*수정 과정:*

1. 디자인 화면에서의 문자열, 개발 코드상의 문자열이 정리된 형태와 현재 표시된 값을 파악하고, 기획 문서에 현재 문자열을 동기화
2. 💭기획 문서에 문자열을 재수정(1)
3. 🎨디자인 화면에 문자열을 재수정(2)
4. 🖥개발 코드에 문자열을 다시 반영(3)

마지막: 수정된 내용 배포

따라서 문자열 수정에는 생각보다 많은 시간이 들어가게 됩니다. 또한 각 과정에서 언제든 임의로 문자열이 변경될 수 있습니다. QA과정에서 문자열의 변화가 파악되는 경우도 있지만, 그렇지 않은 경우도 있기 때문입니다. 한 두번 정도는 괜찮지만, 여러번 하기에는 굉장히 번거롭고 스트레스 받는 과정입니다.

이러한 문자열간의 차이를 좁히기 위해 **문자열 관리를 시스템화 하게 됩니다.** 보통은 LaaS(Localization as a Service) 관리 도구를 이용하여 관리하게 되는 경우가 많습니다. 이 내용을 이전에 [개인 문서](https://www.notion.so/sungryeolp/Tech-cf996483004843ca879a093743320909)에 정리해 두었으니 궁금하신 분은 참조하셔도 좋을 것 같습니다.

문자열 관리를 시스템화할 경우 항상 모든 과정에서 같은 문자열을 사용하게 됩니다. 기획이 관리하는 하나의 문자열 자료를, 자동화 시스템을 통하여 모든 팀에 자동으로 업데이트합니다. 따라서 수정 과정이 일어나더라도 6~8과정이 필요 없고, 배포 또는 스크립트 실행만 하면 됩니다.

이번에도 개인 프로젝트의 경험을 살려 LaaS 도입을 목표로 하고 있으나, 현지화에 당장 많은 리소스를 투입하기는 팀에게 매우 부담스러울 것 같았습니다.

따라서 **최대한 작은 분량의 작업을 통해** 문자열 관리를 시스템화 하기로 했습니다.

# Google Spreadsheet + Github Flat Data

[Github Flat Data깃헙 플랫 데이터](https://next.github.com/projects/flat-data/)란 Github Action(이하 깃헙 액션) 서비스의 일부로, 데이터사이언스를 위해 주기적으로 데이터 마이닝 작업을 하여 정규화된 자료(normalized data 혹은 flat data)를 자동으로 가져오는 기능입니다. 쉽게 말하면 POSIX의 스케줄러인 [cron](https://en.wikipedia.org/wiki/Cron) 형태로 돌릴 수 있는 깃헙 액션입니다. 인스턴스를 직접 운용하지 않기 때문에 서비스 개발을 위한 부담이 매우 적습니다. 또한 깃헙 액션을 이용하므로 비용이 무료입니다. 가격도 저렴하고 작업 분량도 적기 때문에 알맞다고 생각하여, 플랫 데이터를 활용하여 현지화 파일을 가져오도록 구성해 보았습니다.

또한 문자열을 관리하는 GUI도구로는 현재 기획팀에서 사용하는 구글 스프레드시트를 그대로 사용하도록 하여, 불필요한 UI 작업을 없앴습니다.

## 구글 스프레드시트 관리하기

우선 구글 스프레드시트에서 문자열을 아래와 같이 정리합니다.

![구글 스프레드시트에 문자열을 관리하는 모습](https://d3es8xowxikdnc.cloudfront.net/Screen_Shot_2022_03_02_at_16_21_55_acb6279a26.png)

왼쪽에는 `.json` 파일에 들어갈 키값을 nested 형태로 적어주고, 오른쪽에는 i18n문자열을 정리합니다. 왼쪽에 key, 오른쪽에 value 형태로 관리합니다.

작업이 완료되면 `파일>공유>웹에 게시` 를 선택하여 `.tsv`형태로 내보냅니다. `.csv`를 사용해도 되지만, 쉼표는 현지화 과정에서도 자주 사용되기 때문에 탭 여백(tab)을 구분자(delimiter)로 사용합니다. 웹에 게시를 선택하면 나오는 URL을 가지고 `GET` 요청을 하면 `.tsv` 파일을 그대로 받아올 수 있습니다.

## Github Workflow에 Flat Data 추가하기

코드에 아래와 같이 github workflow깃헙 워크플로우를 추가합니다.

```yaml
# $WORKSPACE/.github/workflows/flat.yml
# github flat data를 위한 github workflow 파일
   
name: data
on:
  schedule:
    - cron: "*/30 * * * *" # 30분에 한 번씩 요청합니다.
  workflow_dispatch: {}
  push:
    branches:
      - main
    paths:
      - .github/workflows/flat.yml
      - ./postprocessing.ts # deno 타입스크립트를 통해 후처리합니다.
jobs:
  scheduled:
    runs-on: ubuntu-latest
    steps:
      - name: Setup deno
        uses: denoland/setup-deno@main
        with:
          deno-version: v1.10.x
      - name: Check out repo
        uses: actions/checkout@v2
      - name: Fetch data
        uses: githubocto/flat@v3
        with:
          http_url: https://docs.google.com/spreadsheets/d/e/$REDACTED_URL/pub?output=tsv # 구글 스프레드시트 url입니다
          downloaded_filename: raw_data.tsv # raw_data.tsv로 저장합니다
          postprocess: ./postprocessing.ts # deno 타입스크립트를 통해 후처리합니다.
```

후처리를 할 deno 타입스크립트 파일을 만들어줍니다.

```typescript
import {
  readCSV,
  writeJSON,
} from "https://deno.land/x/flat@0.0.14/mod.ts";
import lodash from "https://cdn.skypack.dev/lodash";

// 빠른 코드 관리를 위해 자료 타입을 미리 선언해줍니다.
interface ISpreadSheetRow {
  'key_2': string;
  'ko_KR_2': string;
}
// tsv를 사용하므로 탭을 구분자 옵션으로 제공합니다.
const rows = await readCSV(filename, { separator: "\t" });
// 해당 github action이 제대로 돌아갔는지 파악하기 위해 최초1열만 표기합니다.
// 자료의 정합성을 판단하기 위해 tail 또는 head로 자료의 일부만 출력하는 것은 데이터 사이언스의 기본입니다.
console.log(rows[0]);
const koKR = {}
rows.forEach((row) => {
  const r = (row as unknown) as ISpreadSheetRow;
  // lodash를 통해서 nested된 key값을 생성하고 값을 넣어줍니다.
  lodash.set(koKR, r["key_2"], r["ko_KR_2"])
})

// 마지막에 파일을 저장합니다
const newFilename = `i18n-data.json`;
await writeJSON(newFilename, koKR);
console.log("Wrote a post process file");
```

작업이 완료되면 깃헙 워크플로우를 깃헙 리파지토리의 액션 탭에서 수동으로 트리거하여 잘 작동하는지 테스트합니다.

![github workflow를 강제로 트리거한다.](https://d3es8xowxikdnc.cloudfront.net/Screen_Shot_2022_03_02_at_16_37_41_83840d11ff.png)

이상 없이 작업이 완료된 것을 확인할 수 있습니다.

![github workflow가 정상적으로 가동된 것을 확인했다.](https://d3es8xowxikdnc.cloudfront.net/github_workflow_success_40412f8c9f.png)

플랫 데이터는 기본적으로 코드 베이스가 바뀌었을 때에만 새롭게 `git commit` 을 하도록 되어 있으므로, 임의로 시트를 수정하고 결과물을 확인해봅니다.

```json
// 생성된 현지화 문자열 json 파일
{
  "time": {
    "relativeTime": {
      "second": "방금",
      "minute": "{0}분 전"
      /* ... */
    }
  }
  /* ... */
}
```

이상 없이 기능이 구현되어서 마무리 되는 줄 알았는데, 예상하지 못한 이슈가 있었습니다. 깃헙 액션 횟수에 월별 rate limit이 존재한다는 것입니다. 팀에서 워낙 많은 기능을 깃헙 액션에 넣어두고 있다보니, 생각보다 빠르게 rate limit에 도달한 것 같았습니다. 따라서 깃헙 액션이 아닌 다른 환경에서 현지화 문자열을 시스템화 하기로 했습니다.

# Jenkins + Docker + Node + Google Spreadsheet

개발팀은 현재 CI-CD 대부분을 젠킨스 환경에서 구현합니다. 따라서 깃헙 액션 대신 젠킨스 환경을 활용하기로 하고 기존 개발 내역을 버리고 새롭게 작업했습니다.

```sh
# 프로젝트 초기화
# axios: tsv파일을 가져오기 위한 get 요청
# d3-dsv: tsv파일을 parse하기 위한 용도
# dayjs: 날짜를 commit명에 human readable 한 상태로 포함하기 위한 용도
# simple-git: 현지화 문자열이 적용될 프로젝트의 git에 접근하기 위한 용도
# ts-node, typescript : 타입스크립트
yarn add axios d3-dsv dayjs lodash simple-git ts-node typescript
```

문제가 생길 경우 빠른 디버깅을 위하여 타입스크립트를 적용했습니다. 다만 이 과정에서 `d3-dsv`가 타입스크립트의 `import` 구문을 지원하지 않아 아래와 같이 브릿지 모듈을 추가습니다.

```javascript
// $WORKSPACE/module-bridge.cjs
// https://stackoverflow.com/questions/70810061/cant-import-d3-geo-package-into-node-js-typescript-project

module.exports = {
  d3_dsv: async function () {
    return import('d3-dsv');
  },
};
```

젠킨스에서 언제든 옵션을 수정할 수 있도록 인자를 환경 변수로 받도록 했습니다.

```typescript
// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TSV_URL: string;
      GIT_URL: string;
      GIT_TOKEN: string;
      DEST_FILE: string; // 읽고 변경할 파일명
      GIT_BRANCH: string;
      USER_NAME: string; // git에 사용할 유저명
      USER_EMAIL: string; // git에 사용할 email
    }
  }
}

export {};
```

후처리를 담당할 worker는 아래와 같이 작성했습니다. deno코드를 일반 타입스크립트로 바꾸고, 좀더 상세한 로그를 추가했습니다. 이 코드에서는 주석 대신 로그를 보면 대충 어떻게 작동하는지 알 수 있습니다.

```typescript
import axios from 'axios';
import { DSVParsedArray } from 'd3-dsv';
import { d3_dsv as raw_d3_dsv } from './module-bridge.cjs';
const {
  GIT_TOKEN,
  GIT_URL,
  TSV_URL,
  DEST_FILE,
  GIT_BRANCH,
  USER_NAME,
  USER_EMAIL,
} = process.env;
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import fs from 'fs';
import simpleGit from 'simple-git';
import dayjs from 'dayjs';

const log = (...arg: any[]) => console.log(...arg);

interface ISpreadSheetRow {
  'key_2': string;
  'ko_KR_2': string;
}

type ISpreadSheetData = DSVParsedArray<ISpreadSheetRow>;
const proc = async () => {
  log('worker up and running...');
  const res = await axios(TSV_URL);
  if (res.status !== 200) {
    log('failed to download google sheet');
    return;
  }
  log('tsv downloaded');
  const d3_dsv = await raw_d3_dsv();
  const rows = d3_dsv.tsvParse(res.data) as ISpreadSheetData;
  log(rows.slice(0, 1));
  log('total rows: ', rows.length);
  const koKR = {};
  rows.forEach((row) => {
    const r = row as unknown as ISpreadSheetRow;
    _set(koKR, r['key_2'], r['ko_KR_2']);
  });
  log('data all processed...');
  log('deleting previous git');
  fs.rmSync('./lvup-fe', { recursive: true, force: true });
  log('cloning git');
  // clone to ./lvup-fe directory
  await simpleGit().clone(`https://${GIT_TOKEN}@${GIT_URL}`, 'lvup-fe');
  log('clone finished');
  const git = simpleGit('lvup-fe');
  await git.checkout(GIT_BRANCH);
  const strDate = dayjs().format('YYYY-MM-DD--HH-mm-ss');
  const newBranch = `${GIT_BRANCH}-i18n-${strDate}`;
  log('branched out to new branch');
  await git.checkoutBranch(newBranch, `origin/${GIT_BRANCH}`);
  let prevFile: any = '{}';
  try {
    prevFile = fs.readFileSync(DEST_FILE, 'utf8');
  } catch (err) {
    log('error while reading previous file', err);
  }
  const prevData = JSON.parse(prevFile);
  const newData = JSON.stringify(koKR, null, 2);
  fs.writeFileSync('./i18n-temp.json', newData);
  const isEqual = _isEqual(prevData, newData);
  if (!isEqual) {
    log('diff found, updating...');
    fs.writeFileSync(DEST_FILE, newData);
    await git.add('.');
    await git
      .addConfig('user.name', USER_NAME)
      .addConfig('user.email', USER_EMAIL);
    await git.commit(`i18n updated to branch: ${newBranch} (${strDate})`);
    await git.push('origin', newBranch);
  } else {
    log('diff not found. file not updated');
  }

  log('finished');
};

proc();
```

## 도커 구성

작업이 완료되면 아래의 코드로 환경 변수가 잘 작동하는지 확인해봅니다.

```sh
# 중요 정보는 모두 숨김처리(REDACTED) 했습니다.

TSV_URL=https://docs.google.com/spreadsheets/d/e/$REDACTED_URL/pub?output=tsv \
	DEST_FILE=./lvup-fe/$REDACTED_FOLDERS/i18n/data/coaching.json \
	GIT_URL=github.com/$REDACTED_REPO/lvup-fe \
	GIT_TOKEN=$REDACTED \
	GIT_BRANCH=$REDACTED \
	USER_NAME=$REDACTED \
	USER_EMAIL=$REDACTED \
	yarn start
```

이상 없이 작동하는 것을 확인하였으면 도커 파일을 작성합니다.

```yaml
FROM node:lts-alpine3.14
RUN mkdir -p /home/node/app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install
RUN apk add git
COPY ./index.ts ./index.ts
COPY ./env.d.ts ./env.d.ts
COPY ./module-bridge.cjs ./module-bridge.cjs
COPY ./tsconfig.json ./tsconfig.json
CMD yarn start
```

도커 컴포즈 파일을 작성하여 환경 변수를 일괄적으로 제공하도록 합니다.

```yaml
version: '3.0'
services:
  worker:
    build:
      context: .
      dockerfile: ./dockerfile
    environment:
      - TSV_URL=$REDACTED_URL
      - DEST_FILE=./lvup-fe/$REDACTED/i18n/data/coaching.json
      - GIT_URL=$REDACTED
      - GIT_TOKEN=$REDACTED
      - GIT_BRANCH=$REDACTED
      - USER_NAME=$REDACTED
      - USER_EMAIL=$REDACTED
    volumes:
      - ./lvup-fe:/home/node/app/lvup-fe
```

아래의 커맨드를 입력해서 잘 작동하는지 확인합니다.

```
docker-compose up
```

이상 없이 작동하는 것을 확인했고, Jenkins Pipeline Script젠킨스 파이프라인 스크립트를 작성해서 파일이 구동되도록 합니다. 도커는 작성해 두었으므로, 도커를 사용해도 됩니다.

## 젠킨스 설정

우선 환경 변수에 1:1로 대응하는 젠킨스 string parameter를 만들고, 코드를 모르는 사람도 직관적으로 접근할 수 있도록 설명을 추가했습니다.

![젠킨스에 string parameter를 추가하고 설명을 달았다.](https://d3es8xowxikdnc.cloudfront.net/string_parameter_a9585b6717.png)

> 젠킨스에 string parameter를 추가하고 설명을 달았다.

파이프라인 스크립트는 아래와 같이 구성했습니다.

```groovy
node {
    try {
        // 여기에 작업 시작 알림 등 처리
        stage('git checkout') {
            git(
                url: 'https://github.com/$REDACTED/lvup-fe-i18n', // 워커 깃헙 리파지토리
                credentialsId: $JENKINS_CREDENTIAL, // 워커 리파지토리를 git clone할 계정(젠킨스로 관리)
                branch: "${branch}" // 워커 브랜치
            )
            script {
                // 워커 내의 환경 변수와 1:1로 대응한다
                env.TSV_URL = "${TSV_URL}"
                env.DEST_FILE = "${DEST_FILE}"
                env.GIT_URL = "${GIT_URL}"
                env.GIT_TOKEN = "${GIT_TOKEN}"
                env.GIT_BRANCH = "${GIT_BRANCH}"
                env.USER_NAME = "${USER_NAME}"
                env.USER_EMAIL = "${USER_EMAIL}"
            }
        }

        stage('yarn install') {
            script {
                sh '''yarn install'''
            }
        }
        
        stage('Run script on lvup-fe') {
            script {
                sh '''yarn start'''
            }
        }

    } catch (e) {
        // 에러처리
        throw e
    } finally {
        // 슬랙 알림 등 처리
    }
}
```

젠킨스에서 해당 파이프라인을 강제로 트리거하여 깃 브랜치가 생성된 것을 확인했습니다.

![](https://d3es8xowxikdnc.cloudfront.net/i18n_commit_branch_sample_c0058ba0f9.png)

> 워커를 통해 젠킨스에서 생성한 브랜치

# 남은 작업

진행하면서 일부 작업을 건너 뛰었습니다.

* **젠킨스에서 바로 도커 실행**
  팀에서 이미 도커 운용을 하며 용량(메모리, 물리적 저장공간)을 많이 사용하고 있으므로, 최대한 적은 용량으로 운용하기 위해 노드만 사용했습니다. 도커를 사용할 경우 로컬과 같은 환경에서 테스트가 가능하므로 안정성은 보장됩니다. 그러나 이미지를 빌드하는 과정에서 별도의 빌드서버를 사용하지 않고 젠킨스 내부에서 빌드하기 때문에 빌드 과정에서 용량이 두 배로 나가게 됩니다.
* **젠킨스 내부에서의 스케줄러 실행**
  팀에서 불필요한 `git commit` 발생을 우려하여 스케줄러는 세팅하지 않았습니다.
* **현지화 문자열 수정을 배포 과정까지 연결**
  팀에서 현지화 문자열이 잘못 작성될 경우 리얼 서비스가 망가지는 것을 우려하여, 배포는 수동으로 진행하기로 했습니다.
* **피그마에 바로 현지화 동기화**
  일부 유료 LaaS 서비스에서는 피그마 플러그인을 제공해 바로 피그마에도 같은 환경을 설정할 수 있습니다. 외부 서비스를 사용하지 않았기 때문에 플러그인 사용은 다루지 않았습니다.

이러한 세팅 과정은 팀에 따라 약간씩 바뀔 수 있을 것 같습니다.
