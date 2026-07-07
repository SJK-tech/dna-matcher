import React from 'react';

const CrimeProfileForm = ({ loci, crimeProfile, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-red-600 text-sm">🔬</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">Crime Scene DNA Profile</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">Enter the STR repeat counts from the crime scene sample.</p>
      <div className="grid grid-cols-2 gap-4">
        {loci.map(locus => (
          <div key={locus}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{locus}</label>
            <input
              type="number"
              min="1"
              max="30"
              value={crimeProfile[locus] || ''}
              onChange={(e) => onChange(locus, parseInt(e.target.value) || '')}
              placeholder="Repeats"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrimeProfileForm;
