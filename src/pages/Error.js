import React from 'react';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Error Page! </h1>
        <Link className="text-white bg-indigo-900 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mx-auto" to="/">Go to home</Link>
      </div>
    </div>
  );
};

export default Error;
