import React, {ButtonHTMLAttributes} from 'react';
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, ...rest }) => (
  <button
    type="button"
    className={classNames("px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 dark:bg-indigo-400 focus:ring-indigo-300 focus:outline-none", className, { 'dark:hover:bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400': !disabled, 'opacity-50': disabled })}
    {...rest}
  >
    {children}
  </button>
)

export default Button;