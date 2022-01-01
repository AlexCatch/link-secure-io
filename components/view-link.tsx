import React, {useCallback, useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "./button";
import GoBackButton from "./go-back-button";

type ViewLinkProps = {
  link: string;
}

const ViewLink: React.FC<ViewLinkProps> = ({link}) => {
  const [copied, setCopied] = useState(false);

  const markCopied = useCallback(() => {
    setCopied(true);
  }, [])

  return (
    <div>
      <p>Below is your self-destructing link, it's valid for 24 hours and it's contents can only be viewed once before
        self-destructing.</p>
      <div
        className='flex justify-between items-center dark:bg-gray-900 rounded-md py-2 px-3 mt-3 border border-indigo-300 dark:border-indigo-500 dark:border-indigo-400 mb-2'>
        <p className='inline whitespace-nowrap align-middle text-indigo-500 dark:text-white font-bold overflow-scroll max-w-full mr-2'>{link}</p>
        <CopyToClipboard text={link} onCopy={markCopied}>
          <Button data-testid='copy-button' disabled={copied} className='px-2 py-2'>
            {copied ? (<svg data-testid='tick-icon' xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>) : (
              <svg data-testid='copy-icon' xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
              </svg>)}
          </Button>
        </CopyToClipboard>
      </div>
      <GoBackButton />
    </div>
  )
}

export default ViewLink;