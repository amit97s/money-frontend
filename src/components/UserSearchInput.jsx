import React from 'react';
import { Plus } from 'lucide-react';

const UserSearchInput = ({ 
  label,
  name,
  value,
  onChange,
  showSuggestions,
  userSuggestions,
  onUserSelect,
  onAddNewUser,
  placeholder = "Type to search accounts"
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded px-3 py-1 w-full"
      />
      {showSuggestions && userSuggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1">
          {userSuggestions.map(user => (
            <div
              key={user._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onUserSelect(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
      {showSuggestions && userSuggestions.length === 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 p-2 flex items-center justify-between">
          <span className="text-red-500">No such user. Want to add new?</span>
          <button
            onClick={() => onAddNewUser(value)}
            className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearchInput;