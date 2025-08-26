

import path from "path";
import fse from "fs-extra";
import { fileURLToPath } from "url";
import { clearAndCopy } from "./utils/fs-utils.js";
import { createEnvFile } from "./utils/env-file.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function checkConfigExists() {
  const configDir = path.resolve("src/config");

  if (!fse.existsSync(configDir)) {
    return false;
  }

  return true;
}

export const createMockServiceLayer = async () => {
	console.log("Creating Mock Service Layer...");

	// paths
	const srcConfig = path.resolve(__dirname, "../src/config");
	const templateDir = path.resolve(__dirname, "../template/automation-mock-service");
	const outputDir = path.resolve(
		__dirname,
		"../build-output/automation-mock-service"
	);
	const outputConfig = path.resolve(outputDir, "src/config");

	// Step 1: Copy template → build-output/automation-mock-service
	await clearAndCopy(templateDir, outputDir);

	// Step 2: Copy src/config → build-output/automation-mock-service/src/config
	// await fse.ensureDir(outputConfig);
	await clearAndCopy(srcConfig, outputConfig);
  await createEnvFile()

	console.log(`✅ Mock service layer created at: ${outputDir}`);
};

(async () => {
	await createMockServiceLayer();
})();
