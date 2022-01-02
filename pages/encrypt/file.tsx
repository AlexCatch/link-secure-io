import React, {useCallback, useMemo, useState} from "react";
import PageWrapper from "../../components/page-wrapper";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";
import FileUpload from "../../components/file-upload";

const File: React.FC = () => {
  const [file, setFile] = useState<File | undefined>();

  const onFileSelected = useCallback((file: File) => {
    console.log('set file');
    setFile(file);
  }, []);

  const isButtonEnabled = useMemo(() => {
    return !!file;
  }, [file]);

  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        <FileUpload onFileSelected={onFileSelected} />
        <p className="mt-2 text-sm">Files are encrypted client-side, generated links will work for 24 hours and are
          visible only one time before being deleted.</p>
        <div className='flex justify-between items-center mt-2'>
          <GoBackButton />
          <Button disabled={!isButtonEnabled}>
            Get a self-destructive Link
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default File;