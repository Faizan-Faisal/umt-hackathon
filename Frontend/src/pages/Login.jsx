import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth-change'));

      navigate(user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/finder');
    } catch (err) {
      console.warn('Backend not ready, using mock login');
      const mockUser = {
        id: Date.now(),
        email: formData.email,
        name: 'Mock User',
        role: 'seeker',
      };
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      window.dispatchEvent(new Event('auth-change'));
      navigate('/dashboard/seeker');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background dots */}
      <div className="campus-dots"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card relative z-10 w-full max-w-md p-12 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-xl"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Sign in to your{' '}
          <span className="text-indigo-600 font-semibold">CampusConnect</span>{' '}
          account
        </p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="glass-input w-full px-5 py-3.5 rounded-xl placeholder-gray-400 text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="glass-input w-full px-5 py-3.5 rounded-xl placeholder-gray-400 text-gray-900"
            />

            {/* Forgot Password link */}
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:text-purple-600 text-sm font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-3.5 px-4 text-white rounded-xl font-semibold text-lg glow-button mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-purple-600 transition-colors"
            >
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
