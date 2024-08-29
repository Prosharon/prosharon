import { TbX } from "react-icons/tb";
import Modal from "../Modal";
import TextInput from "../inputs/TextInput";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	makeFolder: () => void;
}

const CreateFolderModal = ({ isOpen, onClose, makeFolder }: ModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex justify-between gap-4">
				<div>
					<h2 className="text-xl font-bold">Make folder</h2>
				</div>
				<button
					onClick={onClose}
					className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
				>
					<TbX />
				</button>
			</div>
			<div className="flex gap-4">
				<TextInput id="folder-name" placeholder="Folder name"/>
				<button onClick={makeFolder} className="bg-green-500 text-white px-4 rounded-md">Create</button>
			</div>
		</Modal>
	);
};

export default CreateFolderModal;
