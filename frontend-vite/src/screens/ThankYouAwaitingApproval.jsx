import { Link } from 'react-router-dom';

const ThankYouAwaitingApproval = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-center bg-white shadow rounded mt-16">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        🎉 Thank You for Registering!
      </h1>
      <p className="text-gray-700 mb-6">
        Your vendor application has been submitted successfully. Our team is
        currently reviewing your details to ensure everything is in order.
      </p>
      <ul className="text-left text-sm text-gray-600 mb-6 list-disc pl-6 space-y-2">
        <li>
          <strong>Estimated Review Time:</strong> 1–3 business days
        </li>
        <li>
          <strong>Need help?</strong> Contact us anytime via{' '}
          <a
            href="mailto:support@jaliscotile.com"
            className="text-blue-600 underline"
          >
            support@jaliscotile.com
          </a>
        </li>
        <li>
          <strong>WhatsApp Support:</strong>{' '}
          <a
            href="https://wa.me/YOUR_NUMBER"
            className="text-blue-600 underline"
            target="_blank"
          >
            Chat with us
          </a>
        </li>
      </ul>
      <p className="text-gray-600 mb-8">
        You’ll be notified via email once your vendor account is approved.
      </p>
      <Link
        to="/"
        className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default ThankYouAwaitingApproval;
