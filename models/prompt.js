import { Schema, model, models } from "mongoose";

const MESSAGES = {
	PROMPT_REQ: "Prompt is required.",
	TAG_REQ: "Tag is required.",
};

const PromptSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	prompt: {
		type: String,
		required: [true, MESSAGES.PROMPT_REQ],
	},
	tag: {
		type: String,
		required: [true, MESSAGES.TAG_REQ],
	},
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
