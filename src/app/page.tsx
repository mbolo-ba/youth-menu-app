'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    participant_name: '',
    phone_number: '',
    day_1_supper: '',
    day_2_supper: '',
    day_3_lunch: '',
    day_3_supper: '',
    day_4_lunch: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/select-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Submission failed');

      setStatus({ type: 'success', text: 'Success! Your selections have been saved.' });
      setFormData({ participant_name: '', phone_number: '', day_1_supper: '', day_2_supper: '', day_3_lunch: '', day_3_supper: '', day_4_lunch: '' });
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h1 className="text-xl font-bold">Rise Up Conference Food Menu</h1>
          <p className="text-indigo-100 text-xs mt-1">Select your preferences below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {status && (
            <div className={`p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {status.text}
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Your Details</h2>
            <input type="text" name="participant_name" required placeholder="Full Name" value={formData.participant_name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input type="tel" name="phone_number" required placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Day 1 Menu</h2>
            <select name="day_1_supper" required value={formData.day_1_supper} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">Select Thursday Supper</option>
              <option value="Fried Rice with Chicken">Fried Rice with Chicken</option>
              <option value="Waakye with chicken">Waakye with chicken</option>
              <option value="Yam with palava sauce">Yam with palava sauce</option>
              <option value="Omotuo with groundnut soup and chicken">Omotuo with groundnut soup and chicken</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Day 2 Menu</h2>
            <select name="day_2_supper" required value={formData.day_2_supper} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">Select Friday Supper</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Fried Rice with chicken">Fried Rice with chicken</option>
              <option value="Yam with palava sauce">Yam with palava sauce</option>
              <option value="Omotuo with groundnut soup and chicken">Omotuo with groundnut soup and chicken</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Day 3 Menu</h2>
            <select name="day_3_lunch" required value={formData.day_3_lunch} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">Select Saturday Lunch</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Fried Rice with chicken">Fried Rice with chicken</option>
              <option value="Rice and stew with Chicken">Rice and stew with Chicken</option>
              <option value="Waakye with egg and wele">Waakye with egg and wele</option>
            </select>
            <select name="day_3_supper" required value={formData.day_3_supper} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">Select Saturday Supper</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Fried Rice with chicken">Fried Rice with chicken</option>
              <option value="Rice and stew with Chicken">Rice and stew with Chicken</option>
              <option value="Waakye with fish">Waakye with fish</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Day 4 Menu</h2>
            <select name="day_4_lunch" required value={formData.day_4_lunch} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="">Select Sunday Lunch</option>
              <option value="Fried Rice with Chicken">Fried Rice with Chicken</option>
              <option value="Waakye with chicken">Waakye with chicken</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Omotuo with groundnut soup and chicken">Omotuo with groundnut soup and chicken</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-xl text-sm transition disabled:opacity-50 mt-4">
            {loading ? 'Submitting...' : 'Save My Menu Choices'}
          </button>
        </form>
      </div>
    </main>
  );
}