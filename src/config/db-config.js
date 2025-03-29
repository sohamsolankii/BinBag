const mongoose = require("mongoose")

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		console.log("Connected to Database")
	} catch (err) {
		console.error("Error connecting to Database:", err)
		process.exit(1) // Exit process with failure
	}
}

module.exports = connectDB
