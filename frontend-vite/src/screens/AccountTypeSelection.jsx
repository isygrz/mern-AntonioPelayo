import { useNavigate, useSearchParams } from 'react-router-dom';

const AccountTypeSelection = () => {
  const [params] = useSearchParams();
  const email = params.get('email');
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Choose Account Type</h2>
      <button
        onClick={() => navigate(`/register/personal?email=${email}`)}
        className="bg-green-600 text-white px-4 py-2 w-full mb-4"
      >
        Personal
      </button>
      <button
        onClick={() => navigate(`/register/vendor?email=${email}`)}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Vendor
      </button>
    </div>
  );
};

export default AccountTypeSelection;
