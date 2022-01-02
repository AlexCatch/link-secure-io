import {GetServerSidePropsContext} from "next";
import {lookupEncryptedData} from "../lib/fauna/lookup-encrypted-data";
import PageWrapper from "../components/page-wrapper";
import React, {useCallback, useMemo, useState} from "react";
import Button from "../components/button";
import {verifyHMAC} from "../lib/utils/hmac";
import useData from "../lib/hooks/use-data";
import {useRouter} from "next/router";
import TextArea from "../components/text-area";

type LinkProps = {
  id: string;
  token: string;
  type: 'file' | 'text';
  verifyToken: string;
}

export default function Link({ id, token, type, verifyToken }: LinkProps) {
  const { fetchContent } = useData();
  const router = useRouter();
  const [text, setText] = useState<string | undefined>();
  const [isLoading, setLoading] = useState(false);

  const typeText = useMemo(() => {
    switch (type) {
      case "file":
        return "you've been sent a file - once downloaded this link will stop working and you will be unable to re-download it."
      case "text":
        return "you've been sent a piece of text - once viewed the contents will self-destruct and the link will cease to work."
    }
  }, [type]);

  const buttonText = useMemo(() => {
    switch (type) {
      case "file":
        return "Download file"
      case "text":
        return "View contents"
    }
  }, [type]);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchContent(id, type, token, verifyToken);
      if (!data) {
        return router.replace('/error');
      }
      switch (type) {
        case "text":
          setText(data);
      }
    } catch (e) {
      return router.replace('/error');
    }
  }, [fetchContent, id, router, token, type, verifyToken]);

  const pageContent = useMemo(() => {
    if (!!text) {
      return (
        <>
          <TextArea value={text} disabled className='border-indigo-500 cursor-text' />
        </>
      );
    }
    return (
      <>
        <p className='dark:text-white'>{typeText}</p>
        <Button disabled={isLoading} onClick={fetch} className='mt-3'>
          {buttonText}
        </Button>
      </>
    );
  }, [buttonText, fetch, isLoading, text, typeText]);

  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        {pageContent}
      </div>
    </PageWrapper>
  );
}

/**
 * Attempt to lookup our encrypted data for an id
 * if a document exists for the ID show the
 * @param query
 */
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const id = query.id as string;
  const token = query.token as string;
  const verifyToken = query.verif as string;

  if (!id || !token || !verifyToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  try {
    const { type } = await lookupEncryptedData(id);
    // Verify our HMAC before showing our view
    if (!verifyHMAC(verifyToken, id, token)) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return { props: { id, token, type, verifyToken } };
  } catch (error) {
    if (error.requestResult?.statusCode == 404) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return { props: { error } };
  }
}