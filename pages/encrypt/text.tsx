import PageWrapper from "../../components/page-wrapper";
import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";
import useEncryption from "../../lib/encryption/use-encryption";
import uploadText from "../../lib/api/upload-test";

const Text: React.FC = () => {
  const { encrypt } = useEncryption();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const encryptText = useCallback(async () => {
    const { encryptedData, keyIv } = encrypt(text);
    setIsLoading(true);
    try {
    const uploadedTextIdentifier = await uploadText(encryptedData);
    setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return;
    }
  }, [encrypt, text]);

  const textUpdated = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const canGenerateLink = useMemo(() => {
    return !!text.trim() && text.trim().length <= 2000;
  }, [text]);

  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        <textarea
          onChange={textUpdated}
          value={text}
          id="about"
          name="about"
          rows={8}
          className="w-full resize-none dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 outline-none dark:focus:border-indigo-400 p-3 shadow-sm block w-full focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md text-gray-700"
        />
        <p className="mt-2 text-sm">Text is encrypted client-side, generated links will work for 24 hours and are
          visible only one time before being deleted.</p>
        <div className='flex justify-between items-center mt-2'>
          <GoBackButton />
          <Button onClick={encryptText} disabled={!canGenerateLink || isLoading}>
            Get a self-destructive Link
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Text;