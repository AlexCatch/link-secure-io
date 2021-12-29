import React from "react";
import PageWrapper from "../../components/page-wrapper";
import Button from "../../components/button";
import GoBackButton from "../../components/go-back-button";

const File: React.FC = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col px-4 py-4 w-full">
        <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-400 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 outline-none"
              >
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <p className="mt-2 text-sm">Files are encrypted client-side, generated links will work for 24 hours and are
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

export default File;