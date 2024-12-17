import app from "./config/app.config";
import swaggerDocs from "./config/swagger.config";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  swaggerDocs(app, PORT);
});
