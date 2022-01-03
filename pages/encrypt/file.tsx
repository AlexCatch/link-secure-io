import React, {useCallback, useMemo, useState} from "react";
import PageWrapper from "../../components/page-wrapper";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";
import FileUpload from "../../components/file-upload";
import useEncryption from "../../lib/hooks/encryption/use-encryption";
import uploadFile from "../../lib/api-calls/upload-file";
import useHMAC from "../../lib/hooks/encryption/use-hmac";
import constructLink from "../../lib/utils/construct-link";
import ViewLink from "../../components/view-link";

const File: React.FC = () => {
  const { encrypt, createWordArray } = useEncryption();
  const { generateHMAC } = useHMAC();
  const [link, setLink] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onFileSelected = useCallback((file: File) => {
    setFile(file);
  }, []);

  const encryptFile = useCallback(async () => {
    setIsLoading(true);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async () => {
      const wordArray = createWordArray(fileReader.result as ArrayBuffer);
      console.log(wordArray);
      const { encryptedData, keyIv } = encrypt<Uint16Array>(wordArray, 'file');
      const encryptedBlob = new Blob([encryptedData]);

      try {
        const uploadedId = await uploadFile(file.name, encryptedBlob);
        const hmac = generateHMAC(uploadedId, keyIv);
        setLink(constructLink(uploadedId, keyIv, hmac));
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }
  }, [createWordArray, encrypt, file, generateHMAC]);

  const isButtonEnabled = useMemo(() => {
    return !!file;
  }, [file]);

  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        {!!link ?
          (<ViewLink
            link={link} />) :
          (
            <>
              <FileUpload onFileSelected={onFileSelected} />
              <p className="mt-2 text-sm">Files are encrypted client-side, generated links will work for 24 hours and are
                visible only one time before being deleted.</p>
              <div className='flex justify-between items-center mt-2'>
                <GoBackButton />
                <Button onClick={encryptFile} disabled={!isButtonEnabled || isLoading}>
                  {isLoading ? "Encrypting and generating link..." : "Get a self-destructive Link"}
                </Button>
              </div>
            </>
          )
        }
      </div>
    </PageWrapper>
  );
};

export default File;