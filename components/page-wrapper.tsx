import React from "react";
import Link from 'next/link';
import IconLink, {IconLinkIcon} from "./icon-link";

const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className='flex h-full w-full justify-center items-center bg-gray-100 p-4'>
      <div className='flex flex-col w-full max-w-xl'>
        <Link href='/'>
          <a className='flex'>
            <div className='flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500 mr-1" viewBox="0 0 20 20"
                   fill="currentColor">
                <path fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className='font-bold text-3xl text-indigo-500'>LinkSecure.io</h1>
          </a>
        </Link>
        <p className='text-gray-500 mb-2'>Easily share self-destructing encrypted files and text</p>
        <div className="flex bg-white overflow-hidden shadow rounded-md">
          {children}
        </div>
        <div className='flex items-center justify-center mt-3'>
          <IconLink type={IconLinkIcon.github} link="https://github.com/alexcatch" />
          <IconLink type={IconLinkIcon.linkedin} link="https://www.linkedin.com/in/alex-catch/" />
        </div>
      </div>
      <Link href="https://netlify.com">
        <a className='absolute bottom-5 w-24'>
          <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="Deploys by Netlify" />
        </a>
      </Link>
    </div>
  );
};

export default PageWrapper;