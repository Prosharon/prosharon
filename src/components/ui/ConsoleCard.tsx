interface props {
	className?: string,
	children?: React.ReactNode,
	notHoverable?: boolean,
}
const ConsoleCard = ({className, children, notHoverable}: props) => {
	return (
		<div className={"bg-white dark:bg-gray-900 dark:text-white shadow-md rounded-3xl transition-colors p-6" +(notHoverable ? " " : " hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 " ) + className}>
			{children}
		</div>
	);
};

export default ConsoleCard;
