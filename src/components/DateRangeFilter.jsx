import React from 'react';
import { Calendar } from 'lucide-react';

const DateRangeFilter = ({ onDisplay }) => {
  return (
    <div className="flex flex-wrap gap-6 items-center">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="dd-mm-yyyy"
          className="pl-10 py-2.5 px-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block rounded-md shadow-sm"
        />
      </div>
      <span className="text-gray-500 font-medium">to</span>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="dd-mm-yyyy"
          className="pl-10 py-2.5 px-4 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block rounded-md shadow-sm"
        />
      </div>
      <button 
        onClick={onDisplay}
        className="bg-blue-600 text-white px-8 py-2.5 rounded-md hover:bg-blue-700 font-medium"
      >
        Display
      </button>
    </div>
  );
};

export default DateRangeFilter;