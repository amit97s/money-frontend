import React from 'react';
import { Calendar } from 'lucide-react';
import UserSearchInput from './UserSearchInput';

const TransactionForm = ({
  type,
  formData,
  currentDate,
  onDateChange,
  onInputChange,
  showSuggestions,
  userSuggestions,
  onUserSelect,
  onAddNewUser,
  onEnterPress,
}) => {
  const isCredit = type === 'credit';
  const title = isCredit ? 'Credit From' : 'Debit Form';
  const accountLabel = isCredit ? 'Received from :' : 'Paid to :';
  const accountField = isCredit ? 'receivedFrom' : 'paidTo';

  const handleKeyDown = (e, fieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnterPress(type, fieldName);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <div className="space-y-3">
        {isCredit && (
          <div className="flex items-center gap-4 relative">
            <div className="relative w-full">
              <input
                type="date"
                value={currentDate}
                onChange={onDateChange}
                onKeyDown={(e) => handleKeyDown(e, 'date')}
                className="border rounded px-3 py-1 w-full pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserSearchInput
            label={accountLabel}
            name={accountField}
            value={formData[accountField]}
            onChange={(e) => onInputChange(type, e)}
            onKeyDown={(e) => handleKeyDown(e, accountField)}
            showSuggestions={showSuggestions}
            userSuggestions={userSuggestions}
            onUserSelect={onUserSelect}
            onAddNewUser={onAddNewUser}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Narration:
            </label>
            <input
              type="text"
              name="narration"
              value={formData.narration}
              onChange={(e) => onInputChange(type, e)}
              onKeyDown={(e) => handleKeyDown(e, 'narration')}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={(e) => onInputChange(type, e)}
              onKeyDown={(e) => handleKeyDown(e, 'amount')}
              placeholder="0"
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expenses:
            </label>
            <input
              type="number"
              name="expenses"
              value={formData.expenses}
              onChange={(e) => onInputChange(type, e)}
              onKeyDown={(e) => handleKeyDown(e, 'expenses')}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;