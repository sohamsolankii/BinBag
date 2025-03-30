const jwt = require("jsonwebtoken")
const {User} = require("../models")

const auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token || req.headers.authorization?.split(" ")[1]

		if (!token) {
			return res
				.status(401)
				.json({ message: "Authentication token not provided." })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log("Decoded Token:", decoded)

		const user = await User.findById(decoded.userId)
		if (!user) {
			return res.status(401).json({ message: "User not found." })
		}

		req.user = user
		next()
	} catch (error) {
		console.error("Authentication error:", error)
		res.status(401).json({
			message: "Please authenticate.",
			error: error.message,
		})
	}
}

module.exports = {auth}
