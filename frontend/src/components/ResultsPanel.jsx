import React from 'react';

const ResultsPanel = ({ results, loci, proteinExample }) => {
  const sorted = [...results].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">🔎 Analysis Results</h2>
        <div className="space-y-4">
          {sorted.map((r, idx) => (
            <div
              key={idx}
              className={`rounded-lg p-4 border-l-4 ${
                r.status === 'MATCH'
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-400 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{r.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      r.status === 'MATCH'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Confidence: {(r.confidence * 100).toFixed(0)}%
                </span>
              </div>

              {/* Confidence bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${r.status === 'MATCH' ? 'bg-green-500' : 'bg-red-400'}`}
                  style={{ width: `${r.confidence * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div className="bg-white rounded p-2 text-center">
                  <p className="font-semibold text-gray-800">{(r.matchRatio * 100).toFixed(0)}%</p>
                  <p>Loci Match</p>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <p className="font-semibold text-gray-800">{r.avgDiff}</p>
                  <p>Avg Diff</p>
                </div>
                <div className="bg-white rounded p-2 text-center">
                  <p className="font-semibold text-gray-800">{r.maxDiff}</p>
                  <p>Max Diff</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {proteinExample && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">🧬 Protein Translation Demo</h2>
          <p className="text-xs text-gray-500 mb-2">Sample DNA → Protein (via BioPython)</p>
          <code className="block bg-gray-100 rounded p-3 text-sm text-indigo-700 break-all">
            {proteinExample}
          </code>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
