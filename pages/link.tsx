import {GetServerSidePropsContext} from "next";
import {lookupEncryptedData} from "../lib/fauna/lookup-encrypted-data";
import PageWrapper from "../components/page-wrapper";
import {useMemo} from "react";
import Button from "../components/button";

type LinkProps = {
  id: string;
  token: string;
  type: string;
}

export default function Link({ id, token, type }: LinkProps) {
  const typeText = useMemo(() => {
    switch (type) {
      case "file":
        return "you've been sent a file - once downloaded this link will stop working and you will be unable to re-download it."
      case "text":
        return "you've been sent a piece of text - once viewed the contents will self-destruct and the link will cease to work."
    }
  }, [type]);

  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        {typeText}
        <Button className='mt-3'>
          View contents
        </Button>
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

  if (!id || !token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  try {
    const { type } = await lookupEncryptedData(id);
    return { props: { id, token, type } };
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