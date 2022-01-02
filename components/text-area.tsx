import React, {TextareaHTMLAttributes} from "react";
import classNames from "classnames";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({rows, className,...props}) => {
  return (
    <textarea
      rows={rows ?? 8}
      className={classNames("w-full resize-none dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 outline-none dark:focus:border-indigo-400 p-3 shadow-sm block w-full focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md text-gray-700", className)}
      {...props}
    />
  )
}

export default TextArea;