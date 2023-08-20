"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const initialPost = {
	prompt: "",
	tag: "",
};

const MESSAGE = {
	NO_PROMPT_ID: "Prompt ID not found!",
};

const EditPrompt = () => {
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState(initialPost);
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert(MESSAGE.NO_PROMPT_ID);

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	);
};

export default EditPrompt;
