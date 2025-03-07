# clickhouse readme

this document serves as a summary of the way this project is organized, quick guides to common tasks, and a log of decisions made while building it.

## quickstart

- build the project with `npm run build`
- run it with `npm run start`
- run the dev server in watch mode with `npm run watch`

## organization

the project is split into two major parts, a stubbed backend server (in `./ext`) and an implemented frontend server (in `./src`). for expedience, they share dependencies (package.json, node_modules), but can be built and run independently. if a given file, e.g., `foo.ts` has a significant number of types, look for `foo.types.ts` for type definitions.

- _clickhouse_
  - _ext_
    - _config_, a directory for config parameters and sample data
    - _handlers_, a directory for business logic implementation
    - db.ts, tools for interacting with the lowdb persistence layer
    - errorHandling.ts, tools for creating and handling express errors
    - main.ts, the entrypoint for the server
    - _scripts_, ops/CI/management scripts; run with `tsx`
    - tsconfig.json, specific overrides from the tsconfig-base.json for this ts project
  - _node_modules_, shared dependencies for both `./ext` and `./src`
  - _src_, the directory for the frontend; it includes all the same parts as ext, as well as:
    - _sdk.ts_, tools for calling the frontend (`./src`) and backend (`./ext`) servers
  - _tmp_, build and runtime artifacts
    - _build_, build artifacts
      - _src_
        - buildinfo, a typescript project buildinfo file to allow for partial recompilation
      - _ext_
    - _runtime_, runtime db files
      - _src_
      - _ext_
  - tsconfig.json

## UP NEXT:

- [ ] end-to-end testing of everything pre-purchase
- [ ] implementing purchasing
- [ ] logging
- [ ] rate-limiting
- [ ] test harness ('functional' / integ)
- [x] documentation & notes
- [x] eslint file included (and eslint package.json scripts)
- [ ] postman-esque collection for manual testing
