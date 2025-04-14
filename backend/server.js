import e from "express"
import { connectDB } from "./config/db.js"
import repRoutes from "./routes/rep.route.js"

const app =  e()

app.use(e.json())

app.use('/api/reps', repRoutes)


app.listen(3000, () => {
  connectDB()
  console.log("listning on http://localhost:3000");
  
})