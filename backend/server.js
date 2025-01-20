import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(5050, () => {
    console.log(`Server listening at port: ${PORT}`);
})