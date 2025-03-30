const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const { ServerConfig, connectDB } = require("./config")
const apiRoutes = require("./routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


app.use("/api", apiRoutes)

app.listen(ServerConfig.PORT, () => {
	console.log(
		`Successfully started the server on PORT : ${ServerConfig.PORT}`
	)
	connectDB();
})
