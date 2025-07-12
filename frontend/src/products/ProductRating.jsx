import { useState } from 'react';

export default function ProductRating({ productId, onRated }) {
  const [selected, setSelected] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const submitRating = async () => {
    if (!selected) return alert('Choisissez une note');

    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${productId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: selected })
      });

      const data = await res.json();
      if (data.success && onRated) onRated(data.rating);
      alert('Merci pour votre note !');
    } catch (err) {
      alert('Erreur lors de la notation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((val) => (
        <button
          key={val}
          onClick={() => setSelected(val)}
          className={`text-2xl ${val <= selected ? 'text-yellow-400' : 'text-gray-400'}`}
        >
          ★
        </button>
      ))}
      <button
        onClick={submitRating}
        className="ml-3 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={submitting}
      >
        Noter
      </button>
    </div>
  );
}
