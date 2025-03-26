import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import { 
  getRandomEmployees, 
  insiderThreatTips, 
  showSuccessToast, 
  showErrorToast 
} from '../utils/gameUtils';
import { User, Shield, AlertTriangle, Info, Check } from 'lucide-react';

const InsiderThreatChallenge: React.FC = () => {
  const { addPoints, completedLevel, setCurrentLevel, showHint } = useGameContext();
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [employees, setEmployees] = useState(getRandomEmployees());
  
  const handleEmployeeSelect = (index: number) => {
    setSelectedEmployee(index);
  };
  
  const handleSubmit = () => {
    if (selectedEmployee === null) {
      showErrorToast("Please select an employee to analyze.");
      return;
    }
    
    const selected = employees[selectedEmployee];
    if (selected.suspiciousIndicators !== null) {
      showSuccessToast("Excellent! You've identified the insider threat.");
      addPoints(100);
      completedLevel('level3');
      setTimeout(() => {
        setCurrentLevel('victory');
      }, 2000);
    } else {
      showErrorToast("This employee's activity appears normal. Look for unusual patterns in login times, locations, and activities.");
    }
  };

  const handleRetry = () => {
    setEmployees(getRandomEmployees());
    setSelectedEmployee(null);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyber-blue mb-3">Insider Threat Detection</h1>
        <p className="text-cyber-light text-lg">
          Analyze employee profiles and activity logs to identify potential insider threats. Look for unusual patterns in login times, locations, and activities.
        </p>
      </div>
      
      {showHint && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="cyber-card border-cyber-warning mb-6 overflow-hidden"
        >
          <div className="flex items-start p-4">
            <Info className="text-cyber-warning mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-cyber-warning font-medium mb-2">What to Look For</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {insiderThreatTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="cyber-card mb-6">
        <div className="p-4 border-b border-cyber-blue/20 flex items-center justify-between">
          <div className="flex items-center">
            <User className="text-cyber-blue mr-2" size={20} />
            <h2 className="text-xl font-medium">Employee Profiles</h2>
          </div>
          <button 
            onClick={handleRetry}
            className="text-sm text-cyber-blue hover:text-cyber-blue/80"
          >
            Try Different Profiles
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((employee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`cyber-card p-4 cursor-pointer transition-colors ${
                  selectedEmployee === index
                    ? 'border-cyber-blue bg-cyber-blue/5'
                    : 'hover:border-cyber-blue/50'
                }`}
                onClick={() => handleEmployeeSelect(index)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium mb-1">{employee.name}</h3>
                    <p className="text-sm text-cyber-light/80">{employee.role}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    employee.accessLevel === 'High'
                      ? 'bg-cyber-danger/20 text-cyber-danger'
                      : employee.accessLevel === 'Medium'
                        ? 'bg-cyber-warning/20 text-cyber-warning'
                        : 'bg-cyber-success/20 text-cyber-success'
                  }`}>
                    {employee.accessLevel} Access
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Shield className="text-cyber-blue mr-2" size={14} />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="text-cyber-blue mr-2" size={14} />
                    <span>Last Login: {employee.lastLogin}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="text-cyber-blue mr-2" size={14} />
                    <span>Location: {employee.loginLocation}</span>
                  </div>
                  <div className="text-cyber-light/80">
                    <p className="font-medium mb-1">Recent Activity:</p>
                    <p>{employee.recentActivity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={handleSubmit}
          disabled={selectedEmployee === null}
          className="cyber-button flex items-center"
        >
          <Check className="mr-2" size={18} />
          Submit Analysis
        </button>
      </div>
    </motion.div>
  );
};

export default InsiderThreatChallenge;
