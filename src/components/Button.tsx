import { ReactNode } from 'react';
import '../styles/Button.css';

interface IButtonProps {
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disable?: boolean;
  onClick?: any;
}

const Button = ({ children, type, disable, onClick }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`Button ${disable ? 'disable' : 'enable'}`}
      type={type}
      disabled={disable}
    >
      {children}
    </button>
  );
};

export default Button;
