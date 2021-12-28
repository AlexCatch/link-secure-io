import {EncryptionItemType} from "../components/encryption-item";
import IconLink, {IconLinkIcon} from "../components/icon-link";
import EncryptionItemSelect from "../components/encryption-item-select";
import {useCallback, useMemo, useState} from "react";

enum CurrentViewState {
  select,
  file,
  text
}

export default function Home() {
  const [currentState, setCurrentState] = useState<CurrentViewState>(CurrentViewState.select);

  const onItemSelected = useCallback((item: EncryptionItemType) => {
    switch (item) {
      case EncryptionItemType.text:
        setCurrentState(CurrentViewState.text);
        break;
      case EncryptionItemType.file:
        setCurrentState(CurrentViewState.file);
        break;
    }
  }, []);

  const currentRenderItem = useMemo(() => {
    switch (currentState) {
      case CurrentViewState.file:
        return <h1>file</h1>;
      case CurrentViewState.select:
        return <EncryptionItemSelect itemSelected={onItemSelected} />;
      case CurrentViewState.text:
        return <h1>text</h1>;
    }
  }, [currentState, onItemSelected]);

  return (
    <div className='flex h-full w-full justify-center items-center bg-gray-100 p-4'>
      <div className='flex flex-col'>
        <div className='flex'>
          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500 mr-1" viewBox="0 0 20 20"
                 fill="currentColor">
              <path fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"/>
            </svg>
          </div>
          <h1 className='font-bold text-3xl text-indigo-500'>LinkSecure.io</h1>
        </div>
        <p className='text-gray-500 mb-2'>Easily share one-time encrypted files or text</p>
        <div className="bg-white overflow-hidden shadow rounded-md">
          {currentRenderItem}
        </div>
        <div className='flex items-center justify-center mt-3'>
          <IconLink type={IconLinkIcon.github} link="https://github.com/alexcatch" />
          <IconLink type={IconLinkIcon.linkedin} link="https://www.linkedin.com/in/alex-catch/" />
        </div>
      </div>
    </div>
  );
}