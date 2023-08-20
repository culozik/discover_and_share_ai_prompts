import Link from "next/link";

const TEXT = {
	DESC: "and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.",
	PROMPT_LABEL: "Your AI Prompt",
	PLACEHOLDER: "Write you prompt here...",
	TAG_LABEL: "Tag",
	TAG_EXM: "(#product, #webdevelopment, #idea, etc.)",
	TAG_PLACEHOLDER: "#tag",
	LINK: "Cancel",
};

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	const handleChange = (e) => {
		const name = e.currentTarget?.name;
		setPost({ ...post, [name]: e.target.value });
	};
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} {TEXT.DESC}
			</p>
			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						{TEXT.PROMPT_LABEL}
					</span>
					<textarea
						value={post.prompt}
						name="prompt"
						onChange={handleChange}
						placeholder={TEXT.PLACEHOLDER}
						required
						className="form_textarea"
					/>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						{TEXT.TAG_LABEL} <span className="font-normal">{TEXT.TAG_EXM}</span>
					</span>
					<input
						value={post.tag}
						name="tag"
						onChange={handleChange}
						placeholder={TEXT.TAG_PLACEHOLDER}
						className="form_input"
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						{TEXT.LINK}
					</Link>
					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
