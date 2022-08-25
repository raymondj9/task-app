import { useState } from "react";
import styled from "styled-components";

interface InputProps {
	className?: string;
	style?: React.CSSProperties;
	value: string | number;
	type?: "text" | "number" | "email" | "password" | "date" | "time";
	placeholder?: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	id: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
	label?: string;
	errorMsg?: string;
}

const Input: React.FC<InputProps> = ({
	className,
	value,
	disabled,
	onChange,
	label,
	errorMsg,
	type = "text",
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<InputWrapper className="relative">
			{label && (
				<label className="mb-2 block" htmlFor={props?.id}>
					{label}
				</label>
			)}
			<StyledInput
				type={
					type !== "password"
						? type
						: type === "password" && showPassword
						? "text"
						: "password"
				}
				className={`w-full block bg-white text-black ${className}`}
				value={value}
				onChange={onChange}
				{...props}
			/>
		</InputWrapper>
	);
};

const InputWrapper = styled.div`
	& label {
		font-weight: 500;
		font-size: 17px;
		line-height: 22px;
		/* color: #333333; */

		@media screen and (max-width: 400px) {
			font-size: 15px;
			line-height: 20px;
		}
	}
`;

const StyledInput = styled.input`
	height: 40px;
	padding: 0 1rem;
	border: none;
	outline: none;
	border-radius: 5px;

	@media screen and (max-width: 400px) {
		height: 40px;
		padding: 0 0.8rem;
	}

	&:focus {
		border: none;
		outline: none;
	}

	&:disabled {
		opacity: 0.8;
	}
`;

export default Input;
