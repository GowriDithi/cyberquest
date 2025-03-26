import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Play } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-light">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-cyber-blue mb-4">CyberQuest</h1>
          <p className="text-2xl text-cyber-light/80 mb-8">Escape the Hacker</p>
          <p className="text-lg text-cyber-light/60 max-w-2xl mx-auto">
            Embark on an exciting journey to master cybersecurity skills. Face three challenging levels and prove your expertise in detecting threats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cyber-card p-6"
          >
            <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mb-4">
              <Shield className="text-cyber-blue" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Phishing Detection</h3>
            <p className="text-cyber-light/80">
              Learn to identify suspicious emails and protect yourself from phishing attacks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cyber-card p-6"
          >
            <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mb-4">
              <Lock className="text-cyber-blue" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Password Security</h3>
            <p className="text-cyber-light/80">
              Master the art of creating and maintaining strong, secure passwords.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cyber-card p-6"
          >
            <div className="w-16 h-16 rounded-full bg-cyber-blue/20 flex items-center justify-center mb-4">
              <User className="text-cyber-blue" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Insider Threat Detection</h3>
            <p className="text-cyber-light/80">
              Develop skills to identify and prevent insider threats in your organization.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleStartGame}
            className="cyber-button flex items-center mx-auto text-lg px-8 py-4"
          >
            <Play className="mr-2" size={24} />
            Start Challenge
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage; 