import { useState } from "react";

const CheckoutForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    country: "Egypt",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (onSubmit) onSubmit(formData);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl p-6 mx-auto bg-white border border-gray-200 shadow-xl ounded-3xl"
    >
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Checkout
      </h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Street
        </label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="block px-8 py-2 mx-auto font-semibold text-white transition mt-7 bg-amber-500 hover:bg-amber-600 rounded-3xl"
        style={{ minWidth: "180px" }}
      >
        {loading ? "Confirming Order..." : "Confirm Order"}
      </button>
    </form>
  );
};

export default CheckoutForm;
