import React from 'react';

interface SubmitButtonProps {
    onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => (
    <div className="submit-button-wrapper">
        <button onClick={onClick} className="submit-button">Submit</button>
    </div>
);

export default SubmitButton;
