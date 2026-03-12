import Link from "next/link";
import { configureCashfree } from "../../lib/cashfree";

export default async function PaymentSuccess({ searchParams }) {
  const { order_id } = await searchParams;

  if (!order_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Access</h1>
          <p className="text-gray-600 mb-6">No order ID found.</p>
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  let statusMessage = "Payment Pending";
  let isSuccess = false;

  try {
    const Cashfree = configureCashfree();

    const response = await Cashfree.PGOrderFetchPayments(order_id);
    const payments = response.data;

    const successfulPayment = payments.find(p => p.payment_status === "SUCCESS");
    const pendingPayment = payments.find(p => p.payment_status === "PENDING");

    if (successfulPayment) {
      statusMessage = "Payment Successful";
      isSuccess = true;
    } else if (pendingPayment) {
      statusMessage = "Payment Pending";
    } else {
      statusMessage = "Payment Failed";
    }
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data || error.message);
    statusMessage = "Payment Verification Failed";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
          isSuccess ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
        }`}>
          {isSuccess ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{statusMessage}</h1>
        <p className="text-gray-500 mb-8">
          Order ID: <span className="font-mono text-sm text-gray-800">{order_id}</span>
        </p>
        
        <Link 
          href="/" 
          className="inline-block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
