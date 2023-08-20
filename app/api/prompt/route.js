import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

const MESSAGE = {
	ON_ERR: "Failed to fetch all prompts",
};

export const GET = async (req) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find({}).populate("creator");

		return new Response(JSON.stringify(prompts), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify(MESSAGE.ON_ERR), { status: 500 });
	}
};
