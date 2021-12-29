import Link from "next/link";
import React from "react";

const GoBackButton = () => (
  <Link href='/'>
    <a className='text-xs font-medium text-gray-400 underline underline-offset-2 hover:text-gray-500'>Go back</a>
  </Link>
);

export default GoBackButton;