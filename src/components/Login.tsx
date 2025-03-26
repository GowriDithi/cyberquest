import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - you can replace this with actual authentication
    if (formData.username && formData.password) {
      navigate('/game');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="cyber-card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="text-cyber-blue" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-cyber-blue mb-2">CyberQuest</h1>
            <p className="text-cyber-light/80">Enter your credentials to begin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-cyber-light mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-cyber-blue" size={20} />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="cyber-input pl-10 w-full"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyber-light mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-cyber-blue" size={20} />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="cyber-input pl-10 w-full"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="text-cyber-danger text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="cyber-button w-full flex items-center justify-center"
            >
              <Shield className="mr-2" size={18} />
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 