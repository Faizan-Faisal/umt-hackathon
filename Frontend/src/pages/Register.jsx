import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'seeker',
  });
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await api.post('/auth/register', registerData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('auth-change'));

      navigate(user.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/finder');
    } catch (err) {
      console.warn('Backend not ready, using mock registration');
      const mockUser = {
        id: Date.now(),
        email: formData.email,
        name: formData.name,
        role: formData.role,
      };
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      window.dispatchEvent(new Event('auth-change'));
      navigate(mockUser.role === 'seeker' ? '/dashboard/seeker' : '/dashboard/finder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Dots */}
      <div className="campus-dots"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card relative z-10 w-full max-w-lg p-12 rounded-3xl shadow-2xl border border-white/40 backdrop-blur-xl"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-3">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Join <span className="text-indigo-600 font-semibold">CampusConnect</span> today
        </p>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="glass-input w-full px-5 py-3.5 rounded-xl placeholder-gray-400 text-gray-900"
            />
          </div>

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
              I am a...
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="glass-input w-full px-5 py-3.5 rounded-xl bg-white/70 text-gray-800 focus:outline-none"
            >
              <option value="seeker">Talent Seeker (Student/Job Seeker)</option>
              <option value="finder">Talent Finder (Employer)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="glass-input w-full px-5 py-3.5 rounded-xl placeholder-gray-400 text-gray-900"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-3.5 px-4 text-white rounded-xl font-semibold text-lg glow-button mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-purple-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
