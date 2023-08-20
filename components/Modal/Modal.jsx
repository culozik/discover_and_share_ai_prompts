"use client";

import { AiOutlineClose } from "react-icons/ai";

import React from "react";

const Modal = ({ isOpen, title, onDismiss, children }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed w-screen h-screen bg-black bg-opacity-60 top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center"
			onClick={onDismiss}
		>
			<div
				className="min-w-[250px] sm:min-w-[400px] max-w-full overflow-x-hidden min-h-[200px] bg-white rounded-xl p-3 flex flex-col relative"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<AiOutlineClose
					className="absolute right-4 top-3 text-2xl text-red-600 cursor-pointer"
					onClick={onDismiss}
				/>
				<div className="w-full h-10 flex items-center mb-1 ">
					<h1 className="text-xl font-bold">{title}</h1>
				</div>
				{children}
			</div>
		</div>
	);
};

export default Modal;
