import express from "express"
import cors from "cors"
import {initializeDatabase, getDatabase} from "./database"

const app = express()
// allows frontend requests
app.use(cors())
// allows req.body
app.use(express.json())

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await initializeDatabase()
    } catch (err) {
        console.log("Error fetching database", err)
    }
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))

// test API calls
app.get("/api", async (_, res) => {
    console.log("/api route hit")
    res.json({message: "API is working!"})
})

app.get("/db", async (req, res) => {
    try {
        const db = getDatabase()
        console.log(db)
        console.log("getDB succeeded")
    } catch (err) {
        console.log("Error fetching database", err)
    }
})

startServer()