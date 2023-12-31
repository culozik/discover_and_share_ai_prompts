import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

const MESSAGE = {
	ON_ERR: "Failed to fetch prompt!",
	ON_ERR_UPD: "Failed to update prompt!",
	ON_ERR_DEL: "Failed to delete prompt!",
	NOT_FOUND: "Prompt not found!",
	DEL_SUCCESS: "Prompt deleted successfully!",
};

export const GET = async (req, { params }) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) return new Response(MESSAGE.NOT_FOUND, { status: 404 });

		return new Response(JSON.stringify(prompt), {
			status: 200,
		});
	} catch (err) {
		return new Response(MESSAGE.ON_ERR, { status: 500 });
	}
};

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existingPrompt = await Prompt.findById(params.id);
		if (!existingPrompt)
			return new Response(MESSAGE.NOT_FOUND, { status: 404 });

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;
		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (err) {
		return new Response(MESSAGE.ON_ERR_UPD, { status: 500 });
	}
};

export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();

		await Prompt.findByIdAndRemove(params.id);

		return new Response(MESSAGE.DEL_SUCCESS, { status: 200 });
	} catch (err) {
		return new Response(MESSAGE.ON_ERR_DEL, { status: 500 });
	}
};
