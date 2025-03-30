const jwt = require("jsonwebtoken")
const { User } = require("../models")

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const JWT_SECRET = process.env.JWT_SECRET

const register = async (req, res) => {
	try {
		const { name, email, password, address, bio, profilePicture } = req.body

		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" })
		}

		const validEmail = await User.findOne({ email: email })

		if (validEmail) {
			return res.status(409).json({ message: "Email already in use!" })
		}

		const user = new User({
			name,
			email,
			password,
			address,
			bio,
			profilePictureUrl: profilePicture,
		})

		await user.save()

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		})

		res.status(201)
			.cookie("token", token, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				sameSite: "None",
			})
			.json({
				message: "User registered successfully",
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					address: user.address,
					bio: user.bio,
					profilePicture: user.profilePictureUrl,
				},
			})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" })
		}

		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" })
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		})

		res.status(201)
			.cookie("token", token, {
				httpOnly: true,
				sameSite: "None",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})
			.json({
				message: "Login successful",
				token,
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					address: user.address,
					bio: user.bio,
					profilePicture: user.profilePictureUrl,
				},
			})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

const logout = async (req, res) => {
	try {
		res.cookie("token", "", {
			httpOnly: true,
			expires: new Date(0), // Expire immediately
		})

		res.json({ message: "Logged out successfully" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server error", error: error.message })
	}
}

module.exports = {
	register,
	login,
	logout,
}
