# links

- [backend](https://github.com/rabelais88/portfolio-backend-2021)

# Troubleshooting

- `tsconfig.json`내에서 `incremental:true`일 경우 `d.ts`가 텅 빈 상태로 생성되어 `import`가 불가할 수 있음. 앱의 경우는 `incremental:true`로, 유틸은 `incremental:false`로 세팅할 것
- 로컬에서 프로젝트가 동작하지 않을 경우, 반드시 라이브러리를 빌드해줄 것. `/dist`에서 패키지를 가져오기 때문.

# Caveat

- 새로운 라이브러리가 추가되면 `.vscode/settings.json` 내부의 `eslint.workingDirectories`에 해당 디렉토리 추가
- vercel을 통해 배포할 때에는 반드시 `Root Directory`를 지정하고, `Include source files outside of the Root Directory in the Build Step.`을 체크 해제할 것. yarn workspace와 vercel의 조합이 좋지 않아 소프트링크에 대해서 분명히 파일이 존재하는 데에도 존재하지 않는다는 버그를 일으킨다.
- 로컬에서는 웹 환경과 달리 yarn workspace 설정에 따라 자동으로 소프트링크된 내용을 사용하게 되므로 주의.
- cloud services such as vercel, render only supports yarn v1. thus, this project is forced to use yarn v1.

# install, bootstrapping

https://yarnpkg.com/getting-started/migration#cli-commands

```sh
# it requires minimum of yarn v2
# yarn run as v1.x in current workspace
(project root)$ yarn install
```

# build & publish libraries

```sh
# package management via oao is no longer valid since yarn v2
(project root)/lib$ yarn build
(project root)/lib$ yarn npm login
(project root)/lib$ yarn publish # possibly npm publish if it does not work
```

# maintenance for libraries

```sh
# check all outdated libs
(project root)$ yarn upgrade-interactive
```

# build skip

- add `[skip-build]` to commit message
