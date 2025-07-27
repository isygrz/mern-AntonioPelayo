import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const LoginScreen = () => {
  const [searchParams] = useSearchParams();
  const prefillEmail = searchParams.get('email') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (prefillEmail) {
      navigate(`/check-email?email=${encodeURIComponent(prefillEmail)}`);
    } else {
      navigate('/check-email');
    }
  }, [navigate, prefillEmail]);

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Redirecting...</h2>
      <p className="text-sm text-gray-500">
        You’re being redirected to the new sign-in flow.
      </p>
    </div>
  );
};

export default LoginScreen;
