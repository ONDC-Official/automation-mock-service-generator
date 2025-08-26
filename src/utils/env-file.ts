import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createEnvFile = async () => {
  const envContent = `
PORT= "${process.env.PORT}"
REDIS_HOST= "${process.env.REDIS_HOST}"
REDIS_PORT= "${process.env.REDIS_PORT}"
REDIS_PASSWORD= "${process.env.REDIS_PASSWORD}"
REDIS_USERNAME= "${process.env.REDIS_USERNAME}"
API_SERVICE_URL= "${process.env.API_SERVICE_URL}"
DOMAIN= "${process.env.DOMAIN}"
CONFIG_SERVICE = "${process.env.CONFIG_SERVICE}" 
`.trim();

  const outputDir = path.resolve(
		__dirname,
		"../../build-output/automation-mock-service"
	);
  const envPath = path.join(outputDir, ".env");

  // Ensure directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  // Write .env file
  fs.writeFileSync(envPath, envContent, "utf8");

  console.log(`✅ .env file created at: ${envPath}`);
};
