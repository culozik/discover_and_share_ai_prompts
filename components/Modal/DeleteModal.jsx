const TEXT = {
	MODAL_TITLE: "Are You sure?",
	YES: "yes",
	NO: "no",
};

const DeleteModal = ({ handleDelete, handleModalClose }) => {
	return (
		<div className="my-4 flex flex-col justify-center items-center gap-8">
			<h2 className="text-gray-600 sm:text-xl max-w-2xl">{TEXT.MODAL_TITLE}</h2>
			<div className="flex justify-center items-center gap-4">
				<button
					className="px-4 py-2 bg-green-600 text-white rounded-lg first-letter:uppercase sm:min-w-[100px]"
					onClick={handleDelete}
				>
					{TEXT.YES}
				</button>
				<button
					className="px-4 py-2 bg-red-600 text-white rounded-lg first-letter:uppercase sm:min-w-[100px]"
					onClick={handleModalClose}
				>
					{TEXT.NO}
				</button>
			</div>
		</div>
	);
};

export default DeleteModal;
