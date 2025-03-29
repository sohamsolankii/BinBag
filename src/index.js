const express = require("express")

const { ServerConfig, connectDB } = require("./config")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(ServerConfig.PORT, () => {
	console.log(
		`Successfully started the server on PORT : ${ServerConfig.PORT}`
	)
	connectDB();
})
