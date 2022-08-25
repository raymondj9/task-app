import { Children, useState } from "react";
import styled from "styled-components";

interface InputProps {
	children?: string | React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	placeholder?: string;
	required?: boolean;
	readonly?: boolean;
	disabled?: boolean;
	id: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	name: string;
	label?: string;
	errorMsg?: string;
	value: string
}

const SelectInput: React.FC<InputProps> = ({
	value,
	children,
	className,
	disabled,
	onChange,
	label,
	errorMsg,
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
			{/* <StyledInput */}
				<div className="flex justify-center">
					<div className="mb-3 xl:w-96">
					<StyledInput className="form-select appearance-none
						block
						w-full
						px-3
						py-1.5
						text-base
						font-normal
						text-gray-700
						bg-white bg-clip-padding bg-no-repeat
						border border-solid border-gray-300
						rounded
						transition
						ease-in-out
						m-0
						focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
						aria-label="Default select example"
						value={value}
						onChange={onChange}>
						{children}
					</StyledInput>
					</div>
				</div>
			{/* /> */}
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

const StyledInput = styled.select`
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

export default SelectInput;
