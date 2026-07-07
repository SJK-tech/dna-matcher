import React from 'react';

const SuspectForm = ({ loci, suspects, onAddSuspect, onRemoveSuspect, onSuspectChange }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm">👤</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Suspects</h2>
        </div>
        <button
          onClick={onAddSuspect}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          + Add Suspect
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">Minimum 2 suspects required for analysis.</p>

      <div className="space-y-6">
        {suspects.map((suspect, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={suspect.name}
                onChange={(e) => onSuspectChange(idx, 'name', null, e.target.value)}
                placeholder={`Suspect ${idx + 1} name`}
                className="font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-48 pb-1"
              />
              {suspects.length > 2 && (
                <button
                  onClick={() => onRemoveSuspect(idx)}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {loci.map(locus => (
                <div key={locus}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{locus}</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={suspect.profile[locus] || ''}
                    onChange={(e) => onSuspectChange(idx, 'profile', locus, parseInt(e.target.value) || '')}
                    placeholder="Repeats"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuspectForm;
