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
      setFormData({
        participant_name: '',
        phone_number: '',
        day_1_supper: '',
        day_2_supper: '',
        day_3_lunch: '',
        day_3_supper: '',
        day_4_lunch: '',
      });
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen py-12 px-4 font-sans flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{
        /* Background gradient matching flyer atmosphere */
        background: 'linear-gradient(135deg, #f9f7fc 0%, #371c55 50%, #DDD6FE 100%)',
      }}
    >
      {/* SEAMLESS INTEGRATED MENU CARD */}
      <div className="w-full max-w-md bg-[#F3F1EF]/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden bg-center bg-no repeat"
            style={{ backgroundImage: "linear-gradient(rgba(248, 250, 252, 0.89), rgba(248, 250, 252, 0.84)), url('/images/logo4.png')", 
            backgroundSize: "550px"
        }}

      >
        
        {/* ELEGANT HEADER BANNER WITH LIGHT ORANGE PILL ACCENT */}
        <div className="p-7 text-center space-y-2 border-b border-slate-200/60 bg-gradient-to-b from-white/60 to-transparent">
          <h1 className="text-3xl font-bold tracking-tight text-purple-800">
            RUC 3.0 Food Menu
          </h1>
          <div className="inline-block px-3 py-1 rounded-full bg-[#FF7733]/15 text-[#E65B17] text-[11px] font-bold tracking-wider uppercase">
            Select your preferences
          </div>
        </div>

        {/* FORM CONTENTS */}
        <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-4">
          {status && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium border ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {status.text}
            </div>
          )}

          {/* PARTICIPANT DETAILS */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Your Details
            </h2>
            <input
              type="text"
              name="participant_name"
              required
              placeholder="Full Name"
              value={formData.participant_name}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] placeholder-stone-400 focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            />
            <input
              type="tel"
              name="phone_number"
              required
              placeholder="Phone Number (0xxxxxxxxx)"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] placeholder-stone-400 focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            />
          </div>

          {/* DAY 1 MENU */}
          <div className="space-y-2.5 pt-1">
            <h2 className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Day 1 Menu
            </h2>
            <select
              name="day_1_supper"
              required
              value={formData.day_1_supper}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            >
              <option value="">Select Thursday Supper</option>
              <option value="Fried Rice with Chicken">Fried Rice with Chicken</option>
              <option value="Waakye with chicken">Waakye with chicken</option>
              <option value="Yam with palava sauce">Yam with palava sauce</option>
              <option value="Omotuo with groundnut soup and chicken">Omotuo with groundnut soup and chicken</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
            </select>
          </div>

          {/* DAY 2 MENU */}
          <div className="space-y-2.5 pt-1">
            <h2 className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Day 2 Menu
            </h2>
            <select
              name="day_2_supper"
              required
              value={formData.day_2_supper}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            >
              <option value="">Select Friday Supper</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Fried Rice with chicken">Fried Rice with chicken</option>
              <option value="Yam with palava sauce">Yam with palava sauce</option>
              <option value="Omotuo with groundnut soup and chicken">Omotuo with groundnut soup and chicken</option>
            </select>
          </div>

          {/* DAY 3 MENU */}
          <div className="space-y-2.5 pt-1">
            <h2 className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Day 3 Menu
            </h2>
            <select
              name="day_3_lunch"
              required
              value={formData.day_3_lunch}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            >
              <option value="">Select Saturday Lunch</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Fried Rice with chicken">Fried Rice with chicken</option>
              <option value="Rice and stew with Chicken">Rice and stew with Chicken</option>
              <option value="Waakye with egg and wele">Waakye with egg and wele</option>
            </select>
            <select
              name="day_3_supper"
              required
              value={formData.day_3_supper}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            >
              <option value="">Select Saturday Supper</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Fried Rice with chicken">Fried Rice with chicken</option>
              <option value="Rice and stew with Chicken">Rice and stew with Chicken</option>
              <option value="Waakye with fish">Waakye with fish</option>
            </select>
          </div>

          {/* DAY 4 MENU */}
          <div className="space-y-2.5 pt-1">
            <h2 className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Day 4 Menu
            </h2>
            <select
              name="day_4_lunch"
              required
              value={formData.day_4_lunch}
              onChange={handleChange}
              className="w-full rounded-xl bg-[#EBE8E5] border border-[#E65B17] px-3.5 py-2.5 text-sm text-[#3A283A] focus:bg-stone-100 focus:ring-2 focus:ring-[#FF7733]/40 focus:border-[#FF7733] outline-none transition"
            >
              <option value="">Select Sunday Lunch</option>
              <option value="Fried Rice with Chicken">Fried Rice with Chicken</option>
              <option value="Waakye with chicken">Waakye with chicken</option>
              <option value="Jollof Rice with Chicken">Jollof Rice with Chicken</option>
              <option value="Omotuo with groundnut soup and chicken">Omotuo with groundnut soup and chicken</option>
              <option value="Banku and tilapia with pepper">Banku and tilapia with pepper</option>
            </select>
          </div>

          {/* SUBMIT BUTTON WITH SOFT LIGHT-ORANGE HOVER */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 mt-4 active:scale-[0.99]"
           style={{ backgroundColor: '#602d9b' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF7733')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#602d9b')}
          >
            {loading ? 'Submitting...' : 'Save My Aduane Choices'}
          </button>
        </form>
      </div>
    </main>
  );
}