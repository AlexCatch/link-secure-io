import Link from "next/link";
import React from "react";

const GoBackButton: React.FC = () => (
  <Link href='/'>
    <a className='text-xs font-medium underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-500'>Go back</a>
  </Link>
);

export default GoBackButton;