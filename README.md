# What is this?

this is a mono-repo collection of...

1. personal libs and configurations that are used frequently, that are published to npm.
2. personal weblog + its content.

# Troubleshooting

- `tsconfig.json`내에서 `incremental:true`일 경우 `d.ts`가 텅 빈 상태로 생성되어 `import`가 불가할 수 있음. 앱의 경우는 `incremental:true`로, 유틸은 `incremental:false`로 세팅할 것
- the project requires `@sungryeol/lib` being built first. otherwise, it would not run. The built package is symlinked to other projects.

# Caveat

- manage workspace folders via `.vsocde/settings.json` -> `eslint.workingDirectories`
- when deploying to Vercel, `Include source files outside of the Root Directory in the Build Step.` option should be enabled.

# Developing inside docker container + vscode

~~**2022.OCT update: adopted PNPM workspace. vscode devcontainer may not work due to symlink usage in PNPM**~~

- 2022.NOV update: mutagen + devcontainer is now fully supported again.

- this project is OS independent. It can be accessed via vscode devcontainer + mutagen, in any OSs that support docker and mutagen.
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
- attach to `sungryeol-monorepo` container. DO NOT attach to `mutagen` container.

# Install, bootstrapping

- https://vercel.com/docs/concepts/monorepos/turborepo

```sh
# bootstrap the whole monorepo
(project root)$pnpm install
# build everything inside this monorepo
(project root)$ pnpm build
# start all projects in dev mode
(project root)$pnpm dev
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
