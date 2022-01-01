import React from "react";

const ErrorView: React.FC = () => {
  return (
    <div className='flex flex-col h-full w-full justify-center items-center p-4'>
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart-broken"
           className="w-16 h-16 text-indigo-500 dark:text-indigo-400" role="img" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 512 512">
        <path fill="currentColor"
  d="M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z"/>
      </svg>
      <div className='mt-2'>
        <p className='dark:text-indigo-400 text-indigo-500 text-xl font-semibold text-center'>It Looks like something went wrong.</p>
        <p className='text-sm dark:text-gray-300 font-semibold text-center'>{"You can try again, if that doesn't work it's something that needs fixing so I'm on it."}</p>
      </div>
    </div>
  );
};

export default ErrorView;