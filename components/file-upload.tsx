import React, {useCallback, useMemo, useState} from "react";
import {ErrorCode, FileRejection, useDropzone} from "react-dropzone";
import fileSize from "filesize";

type FileUploadProps = {
  onFileSelected: (file: File) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({onFileSelected}) => {
  const [file, setFile] = useState<File | undefined>();
  const [error, setError] = useState<string | undefined>();

  const onDropAccepted = useCallback(files => {
    setFile(files[0]);
    onFileSelected(files[0]);
  }, [onFileSelected]);

  const onDropRejected = useCallback((rejections: FileRejection[]) => {
    const rejection = rejections[0];
    switch (rejection.errors[0].code) {
      case ErrorCode.FileTooLarge:
        setError("The selected file is over the 10MB limit.");
        break;
      case ErrorCode.TooManyFiles:
        setError("Too many files, please select a maximum of 1 file.")
        break;
      default:
        setError("An unknown error occurred, please try a different file or try again later");
        break;
    }
  }, []);

  const readableFileSize = useMemo(() => {
    if (!file) {
      return null;
    }
    return fileSize(file.size);
  }, [file]);

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    maxSize: 10000000,
    noClick: true,
  });

  return (
    <div
      className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-400 border-dashed rounded-md" {...getRootProps()}>
      <div className="flex items-center justify-content flex-col w-full">
        {!!file ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-indigo-500 dark:text-indigo-400" fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
          </svg>
        ) : (
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
        )}
        <div className="flex text-sm justify-center items-center">
          {isDragActive ? (
            <p className='text-center text-indigo-500 dark:text-indigo-400'>Release to encrypt</p>
          ) : (
            <>
              {!!file ? (
                <p className='text-center font-semibold text-indigo-500 dark:text-indigo-400'>{file.name}</p>
              ) : (
                <>
                  {!!error ? (
                    <p className='text-center font-semibold text-red-500 dark:text-red-400'>{error}</p>
                  ) : (
                    <>
                      <label
                        onClick={open}
                        className="relative cursor-pointer font-medium text-indigo-500 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 outline-none"
                      >
                        <span>Encrypt a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <p className="text-xs text-indigo-500 dark:text-indigo-400">{!!file ? readableFileSize : (!!error ? (<label
            onClick={open}
            className="relative cursor-pointer font-medium hover:text-indigo-500 dark:hover:text-indigo-300 outline-none"
          >
            <span>Encrypt a file</span>
          </label>) : "up to 10MB in size")}</p>
        <input {...getInputProps()} className="sr-only outline-none" />
      </div>
    </div>
  );
}

export default FileUpload;