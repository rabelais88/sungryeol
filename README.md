# Troubleshooting

- `tsconfig.json`내에서 `incremental:true`일 경우 `d.ts`가 텅 빈 상태로 생성되어 `import`가 불가할 수 있음. 앱의 경우는 `incremental:true`로, 유틸은 `incremental:false`로 세팅할 것

# Caveat

- npm identity가 필요하므로 반드시 빌드와 배포는 yarn 대신 아래 빌드 커맨드로 진행
- 새로운 라이브러리가 추가되면 `.vscode/settings.json` 내부의 `eslint.workingDirectories`에 해당 디렉토리 추가
- 속도 이슈 떄문에 vscode 컨테이너에서 root user로 volume을 사용하도록 함. remote user를 사용하고 그냥 node_modules를 밀어버려서 bind mount로 작업할 경우 속도가 느려진다는 이야기가 있음.

# build & publish libraries

```sh
(project root)$ yarn build
(proejct root)$ npm login
(project root)$ npx oao publish
```
