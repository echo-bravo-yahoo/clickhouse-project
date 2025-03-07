# clickhouse readme

this document serves as a summary of the way this project is organized, quick guides to common tasks, and a log of decisions made while building it.

## quickstart

- build the project with `npm run build`
- run it with `npm run start`
- run the dev server in watch mode with `npm run watch`
- to test, start the server and run `npm run test`

## organization

the project is split into two major parts, a stubbed backend server (in `./ext`) and an implemented frontend server (in `./src`). for expedience, they share dependencies (package.json, node_modules), but can be built and run independently. if a given file, e.g., `foo.ts`, has a significant number of types, look for `foo.types.ts` for type definitions.

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
    - _sdk_, tools for calling the frontend (`./src`) and backend (`./ext`) servers
  - _test_
  - _tmp_, build and runtime artifacts
    - _build_, build artifacts
      - _src_
        - buildinfo, a typescript project buildinfo file to allow for partial recompilation
      - _ext_
    - _runtime_, runtime db files
      - _src_
      - _ext_
  - README.md, this file
  - PROMPT.md, the initial prompt
  - curlCookbook.md, a set of example curl commands for manual usage of the frontend and backend APIs
  - tsconfig.json

## what do i wish i had time to do?

- auth middleware, even if the logic/implementation is a placeholder
- broader test suite (test spec names included as examples)
- logging
- rate-limiting
- better error representations; currently, all errors are served as 500s
- better 404 handling; customers are still served the express default HTML 404
- refactor `./ext` => `backend` and `./src` => `frontend` for clarity
- move SDKs into a third TS project, with both frontend and backend depending on them
