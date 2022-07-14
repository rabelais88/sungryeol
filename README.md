# links

- [backend](https://github.com/rabelais88/portfolio-backend-2021)

# Troubleshooting

- `tsconfig.json`내에서 `incremental:true`일 경우 `d.ts`가 텅 빈 상태로 생성되어 `import`가 불가할 수 있음. 앱의 경우는 `incremental:true`로, 유틸은 `incremental:false`로 세팅할 것
- 로컬에서 프로젝트가 동작하지 않을 경우, 반드시 라이브러리를 빌드해줄 것. `/dist`에서 패키지를 가져오기 때문.

# Caveat

- manage workspace folders via `.vsocde/settings.json` -> `eslint.workingDirectories`
- vercel을 통해 배포할 때에는 반드시 `Root Directory`를 지정하고, `Include source files outside of the Root Directory in the Build Step.`을 체크 해제할 것. yarn workspace와 vercel의 조합이 좋지 않아 소프트링크에 대해서 분명히 파일이 존재하는 데에도 존재하지 않는다는 버그를 일으킨다.
- 로컬에서는 웹 환경과 달리 yarn workspace 설정에 따라 자동으로 소프트링크된 내용을 사용하게 되므로 주의.
- cloud services(i.e. vercel, render...) only supports yarn v1. thus, this project is forced to use yarn v1.
- migrate to yarn v2 when ecosystem is ready
  - yarn v2, v3(berry) migration fail(due to cloud compatibility disparity): 2022. July
  - [vscode symlinked multifolder workspace setting](https://code.visualstudio.com/docs/editor/workspaces#_workspace-settings)

# install, bootstrapping

https://yarnpkg.com/getting-started/migration#cli-commands

```sh
# activate appropriate yarn version before installing
(system root)$ yarn set version 1.x # check version from package.json
(project root)$ npx oao bootstrap
```

# build & publish libraries

```sh
(project root)$ yarn oao run-script build
(proejct root)$ npm login
(project root)$ yarn oao publish
(project root)$ yarn oao status
```

# maintenance for libraries

```sh
# check all outdated libs
(project root)$ yarn oao outdated
# update libs in all modules
(proejct root)$ yarn oao bump react react-dom
# clear all libs
(proejct root)$ yarn oao clean
```

# build skip

- add `[skip-build]` to commit message
