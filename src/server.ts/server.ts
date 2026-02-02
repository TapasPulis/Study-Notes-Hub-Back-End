import dotenv from "dotenv";
import { createApp } from "../app.ts/app";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
