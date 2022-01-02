import PageWrapper from "../../components/page-wrapper";
import React, {ChangeEvent, useCallback, useMemo, useState} from "react";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";
import useEncryption from "../../lib/hooks/encryption/use-encryption";
import uploadText from "../../lib/api-calls/upload-text";
import ViewLink from "../../components/view-link";
import constructLink from "../../lib/utils/construct-link";
import useHMAC from "../../lib/hooks/encryption/use-hmac";
import TextArea from "../../components/text-area";

const Text: React.FC = () => {
  const {encrypt} = useEncryption();
  const { generateHMAC } = useHMAC();
  const [text, setText] = useState("");
  const [link, setLink] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const encryptText = useCallback(async () => {
    const { encryptedData, keyIv } = encrypt(text);
    setIsLoading(true);
    try {
      const uploadedTextIdentifier = await uploadText(encryptedData);
      const hmac = generateHMAC(uploadedTextIdentifier, keyIv);
      setIsLoading(false);
      setLink(constructLink(uploadedTextIdentifier, keyIv, hmac));
    } catch (err) {
      console.error(err);
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
        {!!link ?
          (<ViewLink
            link={link} />) :
          (
            <>
              <TextArea
                onChange={textUpdated}
                value={text}
                rows={8}
              />
              <p className="mt-2 text-sm">Text is encrypted client-side, generated links will work for 24 hours and are
                visible only one time before being deleted.</p>
              <div className='flex justify-between items-center mt-2'>
                <GoBackButton />
                <Button onClick={encryptText} disabled={!canGenerateLink || isLoading}>
                  Get a self-destructive Link
                </Button>
              </div>
            </>
          )
        }
      </div>
    </PageWrapper>
  );
};

export default Text;