import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import Terminal from './Terminal';
import { Play, SkipForward } from 'lucide-react';

const IntroSequence: React.FC = () => {
  const { setCurrentLevel } = useGameContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(true);

  const steps = [
    {
      title: "Welcome to CyberQuest",
      content: "You are about to embark on a journey to master cybersecurity skills. Your mission: identify and prevent various security threats.",
      delay: 2000
    },
    {
      title: "The Challenge",
      content: "A sophisticated hacker has infiltrated your organization's systems. You must prove your expertise by completing three critical challenges.",
      delay: 3000
    },
    {
      title: "Level 1: Phishing Detection",
      content: "First, you'll learn to identify phishing emails. Look for suspicious sender addresses, urgent requests, and unusual content.",
      delay: 3000
    },
    {
      title: "Level 2: Password Security",
      content: "Next, you'll master password security. Identify weak passwords and create strong ones that meet security requirements.",
      delay: 3000
    },
    {
      title: "Level 3: Insider Threat Detection",
      content: "Finally, you'll analyze employee profiles to identify potential insider threats. Look for unusual patterns in behavior and access.",
      delay: 3000
    },
    {
      title: "Ready to Begin?",
      content: "Your cybersecurity training starts now. Click the button below to begin the first challenge.",
      delay: 2000
    }
  ];

  const getCurrentLines = () => {
    if (isSkipped) {
      return steps.map(step => `\n${step.title}\n${step.content}\n`);
    }
    const currentSteps = steps.slice(0, currentStep + 1);
    return currentSteps.map(step => `\n${step.title}\n${step.content}\n`);
  };

  useEffect(() => {
    if (isSkipped) {
      setCurrentStep(steps.length - 1);
      setShowSkipButton(false);
      return;
    }

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
  };

  const handleStart = () => {
    setCurrentLevel('level1');
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Terminal 
          lines={getCurrentLines()}
          typingSpeed={isSkipped ? 0 : 30}
        />
        
        <div className="mt-8 flex justify-center space-x-4">
          {showSkipButton && currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="cyber-button flex items-center bg-cyber-warning/20 text-cyber-warning hover:bg-cyber-warning/30"
            >
              <SkipForward className="mr-2" size={18} />
              Skip Intro
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button
              onClick={handleStart}
              className="cyber-button flex items-center"
            >
              <Play className="mr-2" size={18} />
              Start Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroSequence;
