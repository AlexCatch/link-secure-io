import React, {useCallback, useMemo, useState} from "react";
import PageWrapper from "../../components/page-wrapper";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";
import FileUpload from "../../components/file-upload";
import useEncryption from "../../lib/hooks/encryption/use-encryption";
import {Simulate} from "react-dom/test-utils";
import encrypted = Simulate.encrypted;
import uploadFile from "../../lib/api-calls/upload-file";

const File: React.FC = () => {
  const { encrypt, createWordArray } = useEncryption();
  const [file, setFile] = useState<File | undefined>();

  const onFileSelected = useCallback((file: File) => {
    setFile(file);
  }, []);

  const encryptFile = useCallback(async () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async () => {
      const wordArray = createWordArray(fileReader.result as ArrayBuffer);
      const { encryptedData, keyIv } = encrypt(wordArray, 'file');
      const encryptedBlob = new Blob([encryptedData]);
      await uploadFile(file.name, encryptedBlob);
    }
  }, [createWordArray, encrypt, file]);

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
          <Button onClick={encryptFile} disabled={!isButtonEnabled}>
            Get a self-destructive Link
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default File;