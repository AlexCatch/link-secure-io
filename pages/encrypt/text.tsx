import PageWrapper from "../../components/page-wrapper";
import React from "react";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";

const Text: React.FC = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        <textarea
          autoFocus
          id="about"
          name="about"
          rows={8}
          className="w-full resize-none p-3 shadow-sm block w-full focus:ring-indigo-400 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md text-gray-700"
        />
        <p className="mt-2 text-sm text-gray-500">Text is encrypted client-side, generated links will work for 24 hours and are
          visible only one time before being deleted.</p>
        <div className='flex justify-between items-center mt-2'>
          <GoBackButton />
          <Button>
            Get a self-destructive Link
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Text;