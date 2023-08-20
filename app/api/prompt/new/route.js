import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

const MESSAGE = {
	ON_ERR: "Failed to create a new prompt",
	TAG: "Tag is required!",
};

export const POST = async (req) => {
	const { userId, prompt, tag } = await req.json();

	try {
		await connectToDB();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (err) {
		if (err.errors.tag.path === "tag") {
			return new Response(MESSAGE.TAG, { status: 400 });
		}
		return new Response(MESSAGE.ON_ERR, { status: 500 });
	}
};
