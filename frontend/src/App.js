import React, { useState } from 'react';
import axios from 'axios';
import CrimeProfileForm from './components/CrimeProfileForm';
import SuspectForm from './components/SuspectForm';
import ResultsPanel from './components/ResultsPanel';

const LOCI = ["TH01", "D5S818", "D13S317", "vWA"];

const emptyProfile = () => LOCI.reduce((acc, l) => ({ ...acc, [l]: '' }), {});

const App = () => {
  const [crimeProfile, setCrimeProfile] = useState(emptyProfile());
  const [suspects, setSuspects] = useState([
    { name: 'Suspect 1', profile: emptyProfile() },
    { name: 'Suspect 2', profile: emptyProfile() }
  ]);
  const [results, setResults] = useState(null);
  const [protein, setProtein] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCrimeChange = (locus, value) => {
    setCrimeProfile(prev => ({ ...prev, [locus]: value }));
  };

  const handleSuspectChange = (idx, field, locus, value) => {
    setSuspects(prev => {
      const updated = [...prev];
      if (field === 'name') {
        updated[idx] = { ...updated[idx], name: value };
      } else {
        updated[idx] = {
          ...updated[idx],
          profile: { ...updated[idx].profile, [locus]: value }
        };
      }
      return updated;
    });
  };

  const addSuspect = () => {
    setSuspects(prev => [...prev, { name: `Suspect ${prev.length + 1}`, profile: emptyProfile() }]);
  };

  const removeSuspect = (idx) => {
    setSuspects(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAnalyze = async () => {
    setError('');
    // Validate all fields filled
    for (const locus of LOCI) {
      if (!crimeProfile[locus]) {
        setError(`Please fill in crime profile for ${locus}`);
        return;
      }
    }
    for (const s of suspects) {
      if (!s.name.trim()) { setError('All suspects must have a name'); return; }
      for (const locus of LOCI) {
        if (!s.profile[locus]) {
          setError(`Please fill in all loci for ${s.name}`);
          return;
        }
      }
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/analyze', {
        crimeProfile,
        suspects
      });
      setResults(res.data.results);
      setProtein(res.data.proteinExample);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Check backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCrimeProfile(emptyProfile());
    setSuspects([
      { name: 'Suspect 1', profile: emptyProfile() },
      { name: 'Suspect 2', profile: emptyProfile() }
    ]);
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧬</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DNA STR Matcher</h1>
              <p className="text-xs text-gray-500">Forensic DNA Analysis using Machine Learning</p>
            </div>
          </div>
          <button onClick={handleReset} className="text-sm text-gray-500 hover:text-gray-700 underline">
            Reset
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: inputs */}
          <div className="space-y-6">
            <CrimeProfileForm
              loci={LOCI}
              crimeProfile={crimeProfile}
              onChange={handleCrimeChange}
            />
            <SuspectForm
              loci={LOCI}
              suspects={suspects}
              onAddSuspect={addSuspect}
              onRemoveSuspect={removeSuspect}
              onSuspectChange={handleSuspectChange}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Analyzing...' : '🔍 Run DNA Analysis'}
            </button>
          </div>

          {/* Right column: results */}
          <div>
            {results ? (
              <ResultsPanel results={results} loci={LOCI} proteinExample={protein} />
            ) : (
              <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400 h-full flex flex-col items-center justify-center gap-3">
                <span className="text-5xl">🧪</span>
                <p className="text-lg font-medium">Results will appear here</p>
                <p className="text-sm">Fill in the crime profile and suspect data, then run the analysis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
