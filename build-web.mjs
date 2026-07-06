// design-system 웹을 운영 API 기준으로 빌드해 www/ 로 복사한다.
// 사용: node build-web.mjs [API_BASE]  (기본 = Railway 운영 백엔드)
import { execSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const ds = join(here, "..", "design-system");
const apiBase = process.argv[2] || "https://pawdy-api-production.up.railway.app";

console.log(`[build-web] VITE_API_BASE=${apiBase}`);
execSync("npx vite build", { cwd: ds, stdio: "inherit", env: { ...process.env, VITE_API_BASE: apiBase } });

rmSync(join(here, "www"), { recursive: true, force: true });
cpSync(join(ds, "preview-dist"), join(here, "www"), { recursive: true });
console.log("[build-web] www/ 갱신 완료 — 다음: npx cap sync android && npm run apk");
