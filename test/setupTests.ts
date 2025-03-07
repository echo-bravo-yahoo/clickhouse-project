// import { fork } from "node:child_process";
// const __dirname = import.meta.dirname;
// import path from "node:path";
// import { projectRoot } from "../src/main.js";

// export async function mochaGlobalSetup() {
//   const projectRoot = path.join(__dirname, "..");
//   this.srcServer = fork(path.join(projectRoot, "/tmp/build/src/main.js"));
//   this.extServer = fork(path.join(projectRoot, "/tmp/build/ext/main.js"));
// }

// export async function mochaGlobalTeardown() {
//   this.srcServer.kill()
//   this.extServer.kill();
// }
