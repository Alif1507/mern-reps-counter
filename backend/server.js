import e from "express";
import { connectDB } from "./config/db.js";
import repRoutes from "./routes/rep.route.js";
import cors from "cors";
import path from "path"

const app = e();

app.use(cors());
const __dirname = path.resolve()
app.use(e.json());

app.use("/api/reps", repRoutes);

//deplotment config

if(process.env.NODE_ENV === "production") {
  app.use(e.static(path.join(__dirname, "/frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}


app.listen(3000, () => {
  connectDB();
  console.log("listning on http://localhost:3000");
});
