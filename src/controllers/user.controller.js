const { User } = require("../models")

const getProfile = function (req, res) {
	try {
		//* Check if the user is trying to access their own profile
		if (req.user._id.toString() !== req.params.userId) {
			return res.status(403).json({ message: "Access denied, you can only access your own profile" })
		}

		User.findById(req.user._id)
			.select("-password")
			.then(function (user) {
				if (!user) {
					return res.status(404).json({ message: "User not found" })
				}
				res.json(user)
			})
			.catch(function (error) {
				res.status(500).json({ message: "Server error" })
			})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

const updateProfile = function (req, res) {
	try {
		if (req.user._id.toString() !== req.params.userId) {
			return res.status(403).json({ message: "Access denied, you can only access your own profile" })
		}

		var name = req.body.name,
			email = req.body.email,
			address = req.body.address,
			bio = req.body.bio,
			profilePicture = req.body.profilePicture,
			updateFields = {}

		// Only include fields that are provided in the request
		if (name) updateFields.name = name
		if (email) updateFields.email = email
		if (address) updateFields.address = address
		if (bio !== undefined) updateFields.bio = bio
		if (profilePicture !== undefined)
			updateFields.profilePicture = profilePicture

		// If email is being updated, check if it's already taken
		if (email && email !== req.user.email) {
			User.findOne({ email: email })
				.then(function (existingUser) {
					if (existingUser) {
						return res
							.status(400)
							.json({ message: "Email already in use" })
					}

					User.findByIdAndUpdate(
						req.user._id,
						{ $set: updateFields },
						{ new: true, runValidators: true }
					)
						.select("-password")
						.then(function (user) {
							if (!user) {
								return res
									.status(404)
									.json({ message: "User not found" })
							}
							res.json({
								message: "Profile updated successfully",
								user: user,
							})
						})
						.catch(function (error) {
							res.status(500).json({ message: "Server error" })
						})
				})
				.catch(function (error) {
					res.status(500).json({ message: "Server error" })
				})
		} else {
			User.findByIdAndUpdate(
				req.user._id,
				{ $set: updateFields },
				{ new: true, runValidators: true }
			)
				.select("-password")
				.then(function (user) {
					if (!user) {
						return res
							.status(404)
							.json({ message: "User not found" })
					}
					res.json({
						message: "Profile updated successfully",
						user: user,
					})
				})
				.catch(function (error) {
					res.status(500).json({ message: "Server error" })
				})
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}

const deleteProfile = function (req, res) {
	try {
		if (req.user._id.toString() !== req.params.userId) {
			return res.status(403).json({ message: "Access denied, you can only access your own profile" })
		}

		User.findByIdAndDelete(req.user._id)
			.then(function (user) {
				if (!user) {
					return res.status(404).json({ message: "User not found" })
				}
				res.json({ message: "Profile deleted successfully" })
			})
			.catch(function (error) {
				res.status(500).json({ message: "Server error" })
			})
	} catch (error) {
		res.status(500).json({ message: "Server error" })
	}
}


module.exports = {
	getProfile, 
	deleteProfile,
	updateProfile
}