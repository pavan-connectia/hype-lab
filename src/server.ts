import app from "./app";
import connectDB from "./config/db";
import { createSuperAdmin } from "./seed/superAdmin";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await createSuperAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
