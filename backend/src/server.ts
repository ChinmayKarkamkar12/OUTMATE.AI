import dotenv from "dotenv";
dotenv.config(); // MUST be first

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});