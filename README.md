# Troubleshooting

- `tsconfig.json`내에서 `incremental:true`일 경우 `d.ts`가 텅 빈 상태로 생성되어 `import`가 불가할 수 있음. 앱의 경우는 `incremental:true`로, 유틸은 `incremental:false`로 세팅할 것

# Caveat

- npm identity가 필요하므로 반드시 빌드와 배포는 yarn 대신 아래 빌드 커맨드로 진행할 것

# build & publish libs

```sh
(project root)$ yarn build
(project root)$ npx oao publish
```
