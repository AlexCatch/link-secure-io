import React, {HTMLAttributes} from 'react';
import classNames from "classnames";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }) => (
  <button
    type="button"
    className={classNames("px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-500 dark:bg-indigo-400 dark:hover:bg-indigo-500 focus:ring-indigo-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400", className)}
    {...rest}
  >
    {children}
  </button>
)

export default Button;