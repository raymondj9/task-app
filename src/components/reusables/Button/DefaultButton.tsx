import styled from "styled-components";

interface IDefaultButtonProps {
	type?: "submit" | "button";
	onClick?: () => void;
	style?: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
}

const DefaultButton: React.FC<IDefaultButtonProps> = ({
	type = "button",
	className,
	children,
	...props
}) => {
	return (
		<StyledDefaultButton
			className={`font-semibold inline-flex flex-col items-center justify-center ${className && className}`}
			type={type}
			{...props}
		>
			{children}
		</StyledDefaultButton>
	);
};

const StyledDefaultButton = styled.button`
	height: max-content;
	border: none;
	outline: none;
`;

export default DefaultButton;
