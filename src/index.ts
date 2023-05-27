import { Core } from "./structures";
import { resolve } from "path";

require("dotenv").config({ path: resolve(process.cwd(), "config", ".env") });
const client = new Core();

client.startUp();
