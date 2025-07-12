import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const handleSubmit = (data) => {
    console.log("Checkout Data:", data);
    // here you can call a backend API to place the order
  };

  return (
    <div className="min-h-screen p-6">
      <CheckoutForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Checkout;
