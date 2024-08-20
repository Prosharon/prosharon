interface props {
	className?: string,
	children?: React.ReactNode,
}
const ConsoleCard = ({className, children}: props) => {
	return (
		<div className={"bg-white dark:bg-gray-900 dark:text-white shadow-3xl rounded-3xl hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors p-6 " + className}>
			{children}
		</div>
	);
};

export default ConsoleCard;
