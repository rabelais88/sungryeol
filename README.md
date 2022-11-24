# Troubleshooting

- `tsconfig.json`내에서 `incremental:true`일 경우 `d.ts`가 텅 빈 상태로 생성되어 `import`가 불가할 수 있음. 앱의 경우는 `incremental:true`로, 유틸은 `incremental:false`로 세팅할 것
- 로컬에서 프로젝트가 동작하지 않을 경우, 반드시 라이브러리를 빌드해줄 것. `/dist`에서 패키지를 가져오기 때문.

# Caveat

- manage workspace folders via `.vsocde/settings.json` -> `eslint.workingDirectories`
- vercel을 통해 배포할 때에는 반드시 `Root Directory`를 지정하고, `Include source files outside of the Root Directory in the Build Step.`을 체크할 것.

# Developing inside docker container + vscode

**2022.OCT update: adopted PNPM workspace. vscode devcontainer may not work due to symlink usage in PNPM**

- can be accessed via vscode devcontainer + mutagen
- https://code.visualstudio.com/docs/remote/attach-container#_attached-container-configuration-files

```
source mutagen-workspace.sh
# clearing service
source mutagen-workspace.sh down
# rebuilding image(when global node package is updated)
source mutagen-workspace.sh build
```

- `Remote-Containers: Attach to Running Container...` to attach to mutagen-compose service
- after opening up the service in VSCODE,
  use `Remote-Containers: Open Attached Container Configuration File...` to use user-specific setting.
  refer to `.devcontainer/config-recommend.json` for recommended container setting.

# Install, bootstrapping

- https://vercel.com/docs/concepts/monorepos/turborepo

```sh
# activate appropriate yarn version before installing
(project root)$pnpm install
```

# Build & publish libraries

```sh
(project root)$ pnpm turbo build
(project root)$ pnpm login
# check changeset
(project root)$ pnpm changeset status
# strongly recommended: run below in CI
(project root)$ pnpm changeset version
(project root)$ pnpm changeset publish
```

# Maintenance for libraries

```sh
(project root)$ pnpm -r outdated
(project root)$ pnpm -r update $PACKAGE_NAME --latest
```

# Build skip

- add `[skip-build]` to commit message

# Project specific readmes

- [portfolio and blog readme](https://github.com/rabelais88/sungryeol/tree/main/app-portfolio-2022)
- [resume generator readme](https://github.com/rabelais88/sungryeol/tree/main/resume)

# Legacy

these projects are no longer maintained.

- [backend](https://github.com/rabelais88/portfolio-backend-2021)

# License

The codes are in public domain (alternatively MIT licenced), blog content and writings are protected by CC BY-NC-ND 4.0. Please check [License.md](/LICENSE.md)
