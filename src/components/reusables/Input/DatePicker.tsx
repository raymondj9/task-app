import { useState } from "react";
import styled from "styled-components";

interface InputProps {
	classNameName?: string;
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

const DatePicker = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<InputWrapper className="relative">
			{/* {label && ( */}
				<label className="mb-2 block" htmlFor="floatingInput">
					{/* {label} */}
					Date
				</label>
			{/* )} */}
			<div className="flex items-center justify-center">
				<div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
					<input type="text"
					className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
					placeholder="Select a date" data-mdb-toggle="datepicker" />
					<label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
				</div>
			</div>
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

export default DatePicker;
