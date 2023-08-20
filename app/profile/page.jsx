"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Modal from "@components/Modal/Modal";
import DeleteModal from "@components/Modal/DeleteModal";

const TEXT = {
	DESC: "Welcome to your personalized profile page",
	CONFIRM: "Are you sure you want to delete this prompt?",
	MODAL_TITLE: "Delete prompt",
};

const MyProfile = () => {
	const [posts, setPosts] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [postId, setPostId] = useState("");
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		};
		if (session?.user.id) fetchPosts();
	}, []);

	const handleEdit = async (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleModalOpen = (post) => {
		setPostId(post._id);
		setIsOpen(true);
	};
	const handleModalClose = () => {
		setIsOpen(false);
		setPostId("");
	};

	const handleDelete = async () => {
		try {
			await fetch(`/api/prompt/${postId.toString()}`, { method: "DELETE" });
			const filteredPosts = posts.filter((p) => p._id !== postId);
			setPosts(filteredPosts);
			setIsOpen(false);
		} catch (err) {
			console.log(err);
		}
		// }
	};

	return (
		<>
			<Profile
				name="My"
				desc={TEXT.DESC}
				data={posts}
				handleEdit={handleEdit}
				handleDelete={handleModalOpen}
			/>
			<Modal
				isOpen={isOpen}
				onDismiss={handleModalClose}
				title={TEXT.MODAL_TITLE}
			>
				<DeleteModal
					handleDelete={handleDelete}
					handleModalClose={handleModalClose}
				/>
			</Modal>
		</>
	);
};

export default MyProfile;
