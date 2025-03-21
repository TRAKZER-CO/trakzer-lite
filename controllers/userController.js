const User = require("../models/User");

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { username, bio, profilePic } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (profilePic) user.profilePic = profilePic;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });
    } catch {
        res.status(500).json({ message: "Error deleting user" });
    }
};
