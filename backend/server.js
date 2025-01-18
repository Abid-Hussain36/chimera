import express from "express";
import cors from "cors";
import router from "./routes/user.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());
app.use("/user", router);

app.listen(5050, () => {
    console.log(`Server listening at port: ${PORT}`);
})