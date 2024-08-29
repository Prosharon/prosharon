import React from "react";

interface TextInputProps {
	id?: string;
	className?: string;
	placeholder?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = ({
	id,
	className,
	placeholder,
	value,
	onChange,
}) => {
	return (
		<div className={`relative w-full max-w-md ${className}`}>
			<input
				id={id}
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="w-full px-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm transition-all focus:ring-2 focus:azure dark:focus:ring-azure focus:outline-none"
			/>
		</div>
	);
};

export default TextInput;
