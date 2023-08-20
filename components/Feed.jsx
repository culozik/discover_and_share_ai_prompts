"use client";

import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";

const TEXT = {
	INP_PLACEHOLDER: "Search for a tag or a username",
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [searchTimeOut, setSearchTimeOut] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");
			const data = await response.json();

			setPosts(data);
		};
		fetchPosts();
	}, []);

	const filterPrompts = (searchVal) => {
		const regex = new RegExp(searchVal, "i");
		return posts.filter(
			(post) =>
				regex.test(post.creator.username) ||
				regex.test(post.tag) ||
				regex.test(post.prompt)
		);
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeOut);

		setSearchText(e.target.value);

		setSearchTimeOut(
			setTimeout(() => {
				const searchRes = filterPrompts(e.target.value);
				setSearchResults(searchRes);
			}, 500)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPrompts(tagName);
		setSearchResults(searchResult);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder={TEXT.INP_PLACEHOLDER}
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText ? (
				<PromptCardList data={searchResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={posts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
