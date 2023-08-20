import { Schema, model, models } from "mongoose";

const TEXT = {
	EMAIL_UNIQUE: "Email already exist!",
	EMAIL_REQUIRED: "Email is required!",
	USERNAME_REQUIRED: "Username is required!",
	USERNAME_REQUIRED:
		"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
};

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, TEXT.EMAIL_UNIQUE],
		required: [true, TEXT.EMAIL_REQUIRED],
	},
	username: {
		type: String,
		required: [true, TEXT.USERNAME_REQUIRED],
	},
	image: {
		type: String,
	},
});

const User = models.User || model("User", UserSchema);

export default User;
