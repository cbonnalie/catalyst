import express from "express"
import cors from "cors"

const app = express()
// allows frontend requests
app.use(cors())
// allows req.body
app.use(express.json())

const PORT = 3000

app.get("/api", async (req, res) => {
    console.log("/api route hit")
    res.json({message: "API is working!"})
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
