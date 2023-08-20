"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { enqueueSnackbar } from "notistack";

import Form from "@components/Form";

const initialPost = {
	prompt: "",
	tag: "",
};

const TEXT = {
	SUCCESS: "Post created!",
};

const CreatePrompt = () => {
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState(initialPost);

	const router = useRouter();
	const { data: session } = useSession();

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.status === 400) {
				const resText = await response.text();
				enqueueSnackbar(resText, {
					variant: "warning",
					autoHideDuration: 3000,
				});
			}

			if (response.ok) {
				enqueueSnackbar(TEXT.SUCCESS, {
					variant: "success",
				});
				router.push("/");
			}
		} catch (err) {
			console.log(err);
			enqueueSnackbar(err.MESSAGE ?? "Some error", {
				variant: "ERROR",
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<Form
				type="Create"
				post={post}
				setPost={setPost}
				submitting={submitting}
				handleSubmit={createPrompt}
			/>
		</>
	);
};

export default CreatePrompt;
