import React, {useMemo} from "react";
import Link from 'next/link';

export enum EncryptionItemType {
  file,
  text
}

type EncryptionItemProps = {
  type: EncryptionItemType;
}

const EncryptionItem: React.FC<EncryptionItemProps> = ({ type }) => {
  // Determine which SVG to use dependent on the type passed in
  const iconSVG = useMemo(() => {
    switch (type) {
      case EncryptionItemType.file:
        return (
          <svg data-testid="file-svg" xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case EncryptionItemType.text:
        return (
          <svg data-testid="text-svg" xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  }, [type]);

  const itemText = useMemo(() => {
    switch (type) {
      case EncryptionItemType.text:
        return "Encrypt some text";
      case EncryptionItemType.file:
        return "Encrypt a file";
    }
  }, [type]);

  const itemLink = useMemo(() => {
    switch (type) {
      case EncryptionItemType.text:
        return "/encrypt/text";
      case EncryptionItemType.file:
        return "/encrypt/file";
    }
  }, [type]);

  return (
    <Link href={itemLink}>
      <a className='w-full sm:w-56 flex flex-1 p-4 flex-col items-center justify-center bg-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-600'>
        {iconSVG}
        <p data-testid="encryption-item-text" className='text-center text-white mt-2 font-semibold'>{itemText}</p>
      </a>
    </Link>
  );
};

export default EncryptionItem;