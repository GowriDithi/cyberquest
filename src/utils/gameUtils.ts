import { toast } from "sonner";

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function typeWriter(text: string, speed: number = 50): Promise<string> {
  return new Promise((resolve) => {
    let index = 0;
    let result = '';
    
    function type() {
      if (index < text.length) {
        result += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve(result);
      }
    }
    
    type();
  });
}

export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
} {
  const feedback: string[] = [];
  
  // Check length
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  }
  
  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  }
  
  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter');
  }
  
  // Check for numbers
  if (!/\d/.test(password)) {
    feedback.push('Include at least one number');
  }
  
  // Check for special characters
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('Include at least one special character');
  }
  
  // Calculate strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (feedback.length <= 1) {
    strength = 'strong';
  } else if (feedback.length <= 3) {
    strength = 'medium';
  }
  
  return {
    isValid: feedback.length === 0,
    strength,
    feedback
  };
}

export function showSuccessToast(message: string) {
  toast.success(message);
}

export function showErrorToast(message: string) {
  toast.error(message);
}

export function showInfoToast(message: string) {
  toast.info(message);
}

// Data for the phishing challenge
export const allEmails = [
  // Legitimate Emails
  {
    id: 1,
    sender: 'HR Department <hr@company.com>',
    subject: 'Updated Company Policies',
    date: '10:34 AM',
    content: 'Dear Employee, Please review the updated company policies attached to this email. These changes will take effect next month. Thank you, HR Department',
    isPhishing: false
  },
  {
    id: 2,
    sender: 'Google Drive <notification@google.com>',
    subject: 'Document Shared With You',
    date: '2:15 PM',
    content: 'John Doe has shared a document with you. Click here to view the document. Google Drive Team',
    isPhishing: false
  },
  {
    id: 3,
    sender: 'Team Meeting <john.smith@company.com>',
    subject: 'Weekly Team Meeting Agenda',
    date: '9:45 AM',
    content: 'Hello team, Attached is the agenda for our weekly meeting this Friday at 2 PM. Please review and come prepared with any additional items. Best, John',
    isPhishing: false
  },
  {
    id: 4,
    sender: 'Payroll Department <payroll@company.com>',
    subject: 'Your Monthly Payslip',
    date: '1:20 PM',
    content: 'Dear Employee, Your payslip for the current month has been generated. You can access it through the HR portal. Best regards, Payroll Team',
    isPhishing: false
  },
  {
    id: 5,
    sender: 'IT Support <support@company.com>',
    subject: 'System Maintenance Notice',
    date: '3:45 PM',
    content: 'Dear Staff, We will be conducting system maintenance this weekend. The system will be unavailable from 2 AM to 4 AM on Sunday. Thank you for your understanding.',
    isPhishing: false
  },
  {
    id: 6,
    sender: 'Training Department <training@company.com>',
    subject: 'Mandatory Security Training',
    date: '11:30 AM',
    content: 'Dear Employee, Please complete the mandatory security training by the end of this week. You can access it through the learning portal. Best regards, Training Team',
    isPhishing: false
  },
  {
    id: 7,
    sender: 'Benefits Team <benefits@company.com>',
    subject: 'Open Enrollment Period',
    date: '4:15 PM',
    content: 'Dear Employee, The open enrollment period for benefits begins next week. Please review your options in the benefits portal. Best regards, Benefits Team',
    isPhishing: false
  },
  {
    id: 8,
    sender: 'Facilities <facilities@company.com>',
    subject: 'Office Maintenance Schedule',
    date: '9:20 AM',
    content: 'Dear Staff, The office will be undergoing maintenance next week. Please ensure your workstations are clear of personal items. Thank you for your cooperation.',
    isPhishing: false
  },
  {
    id: 9,
    sender: 'Legal Department <legal@company.com>',
    subject: 'Updated Compliance Guidelines',
    date: '2:40 PM',
    content: 'Dear Employee, Please review the updated compliance guidelines attached to this email. These changes are effective immediately. Best regards, Legal Team',
    isPhishing: false
  },
  {
    id: 10,
    sender: 'Marketing Team <marketing@company.com>',
    subject: 'New Campaign Launch',
    date: '10:15 AM',
    content: 'Dear Team, We are excited to announce the launch of our new marketing campaign. Please review the attached materials and provide feedback by Friday.',
    isPhishing: false
  },
  // Phishing Emails
  {
    id: 11,
    sender: 'IT Support <it-support@c0mpany.net>',
    subject: 'URGENT: Your Password Will Expire',
    date: '11:02 AM',
    content: 'Dear User, Your password will expire in 24 hours. Click here to reset your password immediately: http://password-reset.c0mpany.net/login. IT Support',
    isPhishing: true,
    clues: ['Suspicious domain (c0mpany.net instead of company.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 12,
    sender: 'FedEx Shipping <fedex-shipping@fedex-delivery.info>',
    subject: 'Your Package Delivery Status',
    date: '4:30 PM',
    content: 'Dear Customer, Your package is pending delivery. Please confirm your address details by clicking on this link: http://fedx-delivery.info/confirm?id=12345. FedEx Shipping Team',
    isPhishing: true,
    clues: ['Suspicious domain (fedex-delivery.info)', 'Misspelled company name in URL (fedx)', 'Request for personal information']
  },
  {
    id: 13,
    sender: 'PayPal Security <security@paypal-secure.com>',
    subject: 'Account Suspension Notice',
    date: '3:15 PM',
    content: 'Dear PayPal User, Your account has been suspended due to suspicious activity. Click here to verify your identity: http://paypal-secure.com/verify. PayPal Security Team',
    isPhishing: true,
    clues: ['Suspicious domain (paypal-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 14,
    sender: 'Bank Security <security@bank-secure.net>',
    subject: 'Unusual Activity Detected',
    date: '2:45 PM',
    content: 'Dear Customer, We detected unusual activity on your account. Please verify your identity by clicking here: http://bank-secure.net/verify. Bank Security Team',
    isPhishing: true,
    clues: ['Suspicious domain (bank-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 15,
    sender: 'Apple Support <support@apple-secure.com>',
    subject: 'iCloud Account Locked',
    date: '1:30 PM',
    content: 'Dear Apple User, Your iCloud account has been locked for security reasons. Click here to unlock: http://apple-secure.com/unlock. Apple Support Team',
    isPhishing: true,
    clues: ['Suspicious domain (apple-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  // Add more legitimate emails...
  {
    id: 16,
    sender: 'Project Manager <pm@company.com>',
    subject: 'Project Status Update',
    date: '10:45 AM',
    content: 'Dear Team, Please find attached the latest project status report. Review and provide feedback by end of day. Best regards, Project Manager',
    isPhishing: false
  },
  {
    id: 17,
    sender: 'Recruitment <recruitment@company.com>',
    subject: 'New Hire Orientation',
    date: '9:30 AM',
    content: 'Dear Team, We have new hires joining next week. Please review the orientation schedule attached. Best regards, Recruitment Team',
    isPhishing: false
  },
  {
    id: 18,
    sender: 'Quality Assurance <qa@company.com>',
    subject: 'QA Report Submission',
    date: '2:20 PM',
    content: 'Dear Team, Please submit your QA reports by the end of this week. The template is attached. Best regards, QA Team',
    isPhishing: false
  },
  {
    id: 19,
    sender: 'Research Department <research@company.com>',
    subject: 'Research Findings Presentation',
    date: '11:15 AM',
    content: 'Dear Team, Please review the attached research findings before tomorrow\'s presentation. Best regards, Research Team',
    isPhishing: false
  },
  {
    id: 20,
    sender: 'Customer Support <support@company.com>',
    subject: 'Customer Feedback Summary',
    date: '3:30 PM',
    content: 'Dear Team, Please find attached the monthly customer feedback summary. Review and provide suggestions for improvement. Best regards, Support Team',
    isPhishing: false
  },
  // Add more phishing emails...
  {
    id: 21,
    sender: 'Microsoft Support <support@microsoft-secure.net>',
    subject: 'Windows Security Alert',
    date: '4:15 PM',
    content: 'Dear Windows User, Your system has been compromised. Click here to secure your computer: http://microsoft-secure.net/secure. Microsoft Support',
    isPhishing: true,
    clues: ['Suspicious domain (microsoft-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 22,
    sender: 'Amazon Security <security@amazon-secure.com>',
    subject: 'Order Verification Required',
    date: '1:45 PM',
    content: 'Dear Customer, Your recent order requires verification. Click here to verify: http://amazon-secure.com/verify. Amazon Security Team',
    isPhishing: true,
    clues: ['Suspicious domain (amazon-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 23,
    sender: 'Netflix Support <support@netflix-secure.net>',
    subject: 'Account Security Alert',
    date: '2:30 PM',
    content: 'Dear Netflix User, Your account has been accessed from a new device. Click here to verify: http://netflix-secure.net/verify. Netflix Support',
    isPhishing: true,
    clues: ['Suspicious domain (netflix-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 24,
    sender: 'Instagram Security <security@instagram-secure.com>',
    subject: 'Account Recovery Required',
    date: '3:45 PM',
    content: 'Dear User, Your Instagram account needs recovery. Click here to recover: http://instagram-secure.com/recover. Instagram Security',
    isPhishing: true,
    clues: ['Suspicious domain (instagram-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 25,
    sender: 'LinkedIn Support <support@linkedin-secure.net>',
    subject: 'Profile Security Alert',
    date: '4:20 PM',
    content: 'Dear LinkedIn User, Your profile has been flagged for review. Click here to verify: http://linkedin-secure.net/verify. LinkedIn Support',
    isPhishing: true,
    clues: ['Suspicious domain (linkedin-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  // Add more legitimate emails...
  {
    id: 26,
    sender: 'Development Team <dev@company.com>',
    subject: 'Code Review Request',
    date: '10:20 AM',
    content: 'Dear Team, Please review the latest code changes in the repository. Your feedback is appreciated. Best regards, Dev Team',
    isPhishing: false
  },
  {
    id: 27,
    sender: 'Design Team <design@company.com>',
    subject: 'Design System Update',
    date: '11:30 AM',
    content: 'Dear Team, The design system has been updated. Please review the changes and update your components accordingly. Best regards, Design Team',
    isPhishing: false
  },
  {
    id: 28,
    sender: 'Product Team <product@company.com>',
    subject: 'Product Roadmap Review',
    date: '2:15 PM',
    content: 'Dear Team, Please review the updated product roadmap and provide feedback by Friday. Best regards, Product Team',
    isPhishing: false
  },
  {
    id: 29,
    sender: 'Sales Team <sales@company.com>',
    subject: 'Monthly Sales Report',
    date: '3:20 PM',
    content: 'Dear Team, Please find attached the monthly sales report. Review and prepare for tomorrow\'s meeting. Best regards, Sales Team',
    isPhishing: false
  },
  {
    id: 30,
    sender: 'Operations <operations@company.com>',
    subject: 'Process Improvement Meeting',
    date: '9:15 AM',
    content: 'Dear Team, We will be discussing process improvements in tomorrow\'s meeting. Please review the attached document. Best regards, Operations Team',
    isPhishing: false
  },
  // Add more phishing emails...
  {
    id: 31,
    sender: 'Dropbox Security <security@dropbox-secure.com>',
    subject: 'Storage Limit Exceeded',
    date: '1:20 PM',
    content: 'Dear User, Your Dropbox storage limit has been exceeded. Click here to upgrade: http://dropbox-secure.com/upgrade. Dropbox Security',
    isPhishing: true,
    clues: ['Suspicious domain (dropbox-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 32,
    sender: 'Google Security <security@google-secure.net>',
    subject: 'Account Security Alert',
    date: '2:45 PM',
    content: 'Dear Google User, Your account has been accessed from a new location. Click here to verify: http://google-secure.net/verify. Google Security',
    isPhishing: true,
    clues: ['Suspicious domain (google-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 33,
    sender: 'Twitter Support <support@twitter-secure.com>',
    subject: 'Account Verification Required',
    date: '3:30 PM',
    content: 'Dear User, Your Twitter account needs verification. Click here to verify: http://twitter-secure.com/verify. Twitter Support',
    isPhishing: true,
    clues: ['Suspicious domain (twitter-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 34,
    sender: 'Adobe Security <security@adobe-secure.net>',
    subject: 'Subscription Expiring',
    date: '4:15 PM',
    content: 'Dear Customer, Your Adobe subscription is expiring soon. Click here to renew: http://adobe-secure.net/renew. Adobe Security',
    isPhishing: true,
    clues: ['Suspicious domain (adobe-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 35,
    sender: 'Spotify Support <support@spotify-secure.com>',
    subject: 'Payment Verification Required',
    date: '1:45 PM',
    content: 'Dear User, Your payment method needs verification. Click here to verify: http://spotify-secure.com/verify. Spotify Support',
    isPhishing: true,
    clues: ['Suspicious domain (spotify-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  // Add more legitimate emails...
  {
    id: 36,
    sender: 'HR Benefits <benefits@company.com>',
    subject: 'Benefits Enrollment Reminder',
    date: '10:30 AM',
    content: 'Dear Employee, This is a reminder that the benefits enrollment period ends next week. Please complete your selections. Best regards, Benefits Team',
    isPhishing: false
  },
  {
    id: 37,
    sender: 'Training Coordinator <training@company.com>',
    subject: 'Mandatory Training Reminder',
    date: '11:15 AM',
    content: 'Dear Employee, Please complete the mandatory training modules by the end of this week. Best regards, Training Team',
    isPhishing: false
  },
  {
    id: 38,
    sender: 'IT Helpdesk <helpdesk@company.com>',
    subject: 'System Update Notice',
    date: '2:30 PM',
    content: 'Dear Staff, The system will be updated tonight at 2 AM. Please save your work before leaving. Best regards, IT Team',
    isPhishing: false
  },
  {
    id: 39,
    sender: 'Facilities Management <facilities@company.com>',
    subject: 'Office Maintenance Schedule',
    date: '3:45 PM',
    content: 'Dear Staff, The office will be undergoing maintenance this weekend. Please ensure your workstations are clear. Best regards, Facilities Team',
    isPhishing: false
  },
  {
    id: 40,
    sender: 'Security Team <security@company.com>',
    subject: 'Security Awareness Training',
    date: '9:20 AM',
    content: 'Dear Employee, Please complete the security awareness training by the end of this month. Best regards, Security Team',
    isPhishing: false
  },
  // Add more phishing emails...
  {
    id: 41,
    sender: 'PayPal Security <security@paypal-secure.net>',
    subject: 'Account Security Alert',
    date: '1:30 PM',
    content: 'Dear User, Your PayPal account has been locked. Click here to unlock: http://paypal-secure.net/unlock. PayPal Security',
    isPhishing: true,
    clues: ['Suspicious domain (paypal-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 42,
    sender: 'Amazon Support <support@amazon-secure.com>',
    subject: 'Order Confirmation Required',
    date: '2:15 PM',
    content: 'Dear Customer, Your recent order needs confirmation. Click here to confirm: http://amazon-secure.com/confirm. Amazon Support',
    isPhishing: true,
    clues: ['Suspicious domain (amazon-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 43,
    sender: 'Netflix Security <security@netflix-secure.com>',
    subject: 'Account Security Alert',
    date: '3:20 PM',
    content: 'Dear User, Your Netflix account has been accessed from a new device. Click here to verify: http://netflix-secure.com/verify. Netflix Security',
    isPhishing: true,
    clues: ['Suspicious domain (netflix-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 44,
    sender: 'Instagram Support <support@instagram-secure.net>',
    subject: 'Account Recovery Required',
    date: '4:30 PM',
    content: 'Dear User, Your Instagram account needs recovery. Click here to recover: http://instagram-secure.net/recover. Instagram Support',
    isPhishing: true,
    clues: ['Suspicious domain (instagram-secure.net)', 'Creates urgency', 'Contains suspicious link']
  },
  {
    id: 45,
    sender: 'LinkedIn Security <security@linkedin-secure.com>',
    subject: 'Profile Security Alert',
    date: '1:45 PM',
    content: 'Dear User, Your LinkedIn profile has been flagged. Click here to verify: http://linkedin-secure.com/verify. LinkedIn Security',
    isPhishing: true,
    clues: ['Suspicious domain (linkedin-secure.com)', 'Creates urgency', 'Contains suspicious link']
  },
  // Add more legitimate emails...
  {
    id: 46,
    sender: 'Project Manager <pm@company.com>',
    subject: 'Project Timeline Update',
    date: '10:15 AM',
    content: 'Dear Team, Please review the updated project timeline and provide feedback by end of day. Best regards, Project Manager',
    isPhishing: false
  },
  {
    id: 47,
    sender: 'Quality Assurance <qa@company.com>',
    subject: 'QA Report Submission',
    date: '11:30 AM',
    content: 'Dear Team, Please submit your QA reports by the end of this week. The template is attached. Best regards, QA Team',
    isPhishing: false
  },
  {
    id: 48,
    sender: 'Research Department <research@company.com>',
    subject: 'Research Findings Presentation',
    date: '2:20 PM',
    content: 'Dear Team, Please review the attached research findings before tomorrow\'s presentation. Best regards, Research Team',
    isPhishing: false
  },
  {
    id: 49,
    sender: 'Customer Support <support@company.com>',
    subject: 'Customer Feedback Summary',
    date: '3:15 PM',
    content: 'Dear Team, Please find attached the monthly customer feedback summary. Review and provide suggestions for improvement. Best regards, Support Team',
    isPhishing: false
  },
  {
    id: 50,
    sender: 'Development Team <dev@company.com>',
    subject: 'Code Review Request',
    date: '9:45 AM',
    content: 'Dear Team, Please review the latest code changes in the repository. Your feedback is appreciated. Best regards, Dev Team',
    isPhishing: false
  }
];

// Function to get random emails for the challenge
export const getRandomEmails = () => {
  // Get all phishing emails
  const phishingEmails = allEmails.filter(email => email.isPhishing);
  // Get all legitimate emails
  const legitimateEmails = allEmails.filter(email => !email.isPhishing);
  
  // Randomly select one phishing email
  const selectedPhishing = phishingEmails[Math.floor(Math.random() * phishingEmails.length)];
  
  // Randomly select 4 legitimate emails
  const selectedLegitimate = [];
  const usedIndices = new Set();
  
  while (selectedLegitimate.length < 4) {
    const randomIndex = Math.floor(Math.random() * legitimateEmails.length);
    if (!usedIndices.has(randomIndex)) {
      selectedLegitimate.push(legitimateEmails[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  
  // Combine and shuffle the selected emails
  const selectedEmails = [...selectedLegitimate, selectedPhishing];
  return selectedEmails.sort(() => Math.random() - 0.5);
};

// Data for the password challenge
export const allPasswords = [
  // Weak Passwords
  { 
    password: 'password123', 
    username: 'admin', 
    weaknessReason: 'Common word with predictable numbers' 
  },
  { 
    password: 'qwerty', 
    username: 'user1', 
    weaknessReason: 'Keyboard pattern, too short' 
  },
  { 
    password: 'company2023', 
    username: 'jdoe', 
    weaknessReason: 'Contains company name and current year' 
  },
  { 
    password: '123456', 
    username: 'guest', 
    weaknessReason: 'Simple numeric sequence' 
  },
  { 
    password: 'letmein', 
    username: 'support', 
    weaknessReason: 'Common password phrase' 
  },
  {
    password: 'admin123',
    username: 'administrator',
    weaknessReason: 'Common username as password with numbers'
  },
  {
    password: 'welcome1',
    username: 'newuser',
    weaknessReason: 'Common word with predictable number'
  },
  {
    password: 'football',
    username: 'sportsfan',
    weaknessReason: 'Common word, no numbers or special characters'
  },
  {
    password: 'abc123',
    username: 'testuser',
    weaknessReason: 'Simple pattern, too short'
  },
  {
    password: 'monkey123',
    username: 'user123',
    weaknessReason: 'Common word with predictable numbers'
  },
  {
    password: 'dragon',
    username: 'gamer',
    weaknessReason: 'Single word, no complexity'
  },
  {
    password: 'baseball',
    username: 'player',
    weaknessReason: 'Common word, no numbers or special characters'
  },
  {
    password: 'butterfly',
    username: 'nature',
    weaknessReason: 'Single word, no complexity'
  },
  {
    password: 'superman',
    username: 'hero',
    weaknessReason: 'Common word, no numbers or special characters'
  },
  {
    password: 'tiger123',
    username: 'animal',
    weaknessReason: 'Common word with predictable numbers'
  },
  // Strong Passwords
  {
    password: 'P@ssw0rd!2024',
    username: 'secure_user',
    weaknessReason: null
  },
  {
    password: 'Kj9#mP2$vL5nX8',
    username: 'admin_secure',
    weaknessReason: null
  },
  {
    password: 'Qw3rty!@#123',
    username: 'user_secure',
    weaknessReason: null
  },
  {
    password: 'M0n3y$B@nk2024',
    username: 'finance_user',
    weaknessReason: null
  },
  {
    password: 'S3cur3P@ss!',
    username: 'security_user',
    weaknessReason: null
  },
  {
    password: 'R@nd0mP@ss!',
    username: 'random_user',
    weaknessReason: null
  },
  {
    password: 'Str0ng!P@ss',
    username: 'strong_user',
    weaknessReason: null
  },
  {
    password: 'C0mpl3x!P@ss',
    username: 'complex_user',
    weaknessReason: null
  },
  {
    password: 'S@f3P@ssw0rd',
    username: 'safe_user',
    weaknessReason: null
  },
  {
    password: 'H@rd2Gu3ss!',
    username: 'hard_user',
    weaknessReason: null
  },
  {
    password: 'P@ssw0rd!2024',
    username: 'secure_user2',
    weaknessReason: null
  },
  {
    password: 'Kj9#mP2$vL5nX8',
    username: 'admin_secure2',
    weaknessReason: null
  },
  {
    password: 'Qw3rty!@#123',
    username: 'user_secure2',
    weaknessReason: null
  },
  {
    password: 'M0n3y$B@nk2024',
    username: 'finance_user2',
    weaknessReason: null
  },
  {
    password: 'S3cur3P@ss!',
    username: 'security_user2',
    weaknessReason: null
  },
  {
    password: 'R@nd0mP@ss!',
    username: 'random_user2',
    weaknessReason: null
  },
  {
    password: 'Str0ng!P@ss',
    username: 'strong_user2',
    weaknessReason: null
  },
  {
    password: 'C0mpl3x!P@ss',
    username: 'complex_user2',
    weaknessReason: null
  },
  {
    password: 'S@f3P@ssw0rd',
    username: 'safe_user2',
    weaknessReason: null
  },
  {
    password: 'H@rd2Gu3ss!',
    username: 'hard_user2',
    weaknessReason: null
  },
  {
    password: 'P@ssw0rd!2024',
    username: 'secure_user3',
    weaknessReason: null
  },
  {
    password: 'Kj9#mP2$vL5nX8',
    username: 'admin_secure3',
    weaknessReason: null
  },
  {
    password: 'Qw3rty!@#123',
    username: 'user_secure3',
    weaknessReason: null
  },
  {
    password: 'M0n3y$B@nk2024',
    username: 'finance_user3',
    weaknessReason: null
  },
  {
    password: 'S3cur3P@ss!',
    username: 'security_user3',
    weaknessReason: null
  },
  {
    password: 'R@nd0mP@ss!',
    username: 'random_user3',
    weaknessReason: null
  },
  {
    password: 'Str0ng!P@ss',
    username: 'strong_user3',
    weaknessReason: null
  },
  {
    password: 'C0mpl3x!P@ss',
    username: 'complex_user3',
    weaknessReason: null
  },
  {
    password: 'S@f3P@ssw0rd',
    username: 'safe_user3',
    weaknessReason: null
  },
  {
    password: 'H@rd2Gu3ss!',
    username: 'hard_user3',
    weaknessReason: null
  },
  {
    password: 'P@ssw0rd!2024',
    username: 'secure_user4',
    weaknessReason: null
  },
  {
    password: 'Kj9#mP2$vL5nX8',
    username: 'admin_secure4',
    weaknessReason: null
  },
  {
    password: 'Qw3rty!@#123',
    username: 'user_secure4',
    weaknessReason: null
  },
  {
    password: 'M0n3y$B@nk2024',
    username: 'finance_user4',
    weaknessReason: null
  },
  {
    password: 'S3cur3P@ss!',
    username: 'security_user4',
    weaknessReason: null
  },
  {
    password: 'R@nd0mP@ss!',
    username: 'random_user4',
    weaknessReason: null
  },
  {
    password: 'Str0ng!P@ss',
    username: 'strong_user4',
    weaknessReason: null
  },
  {
    password: 'C0mpl3x!P@ss',
    username: 'complex_user4',
    weaknessReason: null
  },
  {
    password: 'S@f3P@ssw0rd',
    username: 'safe_user4',
    weaknessReason: null
  },
  {
    password: 'H@rd2Gu3ss!',
    username: 'hard_user4',
    weaknessReason: null
  }
];

// Function to get random passwords for the challenge
export const getRandomPasswords = () => {
  // Get all weak passwords
  const weakPasswords = allPasswords.filter(pwd => pwd.weaknessReason !== null);
  // Get all strong passwords
  const strongPasswords = allPasswords.filter(pwd => pwd.weaknessReason === null);
  
  // Randomly select 1-3 weak passwords
  const numWeakPasswords = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
  const selectedWeak = [];
  const usedWeakIndices = new Set();
  
  while (selectedWeak.length < numWeakPasswords) {
    const randomIndex = Math.floor(Math.random() * weakPasswords.length);
    if (!usedWeakIndices.has(randomIndex)) {
      selectedWeak.push(weakPasswords[randomIndex]);
      usedWeakIndices.add(randomIndex);
    }
  }
  
  // Randomly select remaining passwords from strong passwords
  const numStrongPasswords = 5 - numWeakPasswords;
  const selectedStrong = [];
  const usedStrongIndices = new Set();
  
  while (selectedStrong.length < numStrongPasswords) {
    const randomIndex = Math.floor(Math.random() * strongPasswords.length);
    if (!usedStrongIndices.has(randomIndex)) {
      selectedStrong.push(strongPasswords[randomIndex]);
      usedStrongIndices.add(randomIndex);
    }
  }
  
  // Combine and shuffle the selected passwords
  const selectedPasswords = [...selectedWeak, ...selectedStrong];
  return selectedPasswords.sort(() => Math.random() - 0.5);
};

// Insider Threat Challenge Data
export const allEmployees = [
  // Legitimate Employees (40 profiles)
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    department: "Engineering",
    accessLevel: "High",
    lastLogin: "2024-02-15 09:30",
    loginLocation: "San Francisco, CA",
    recentActivity: "Normal development work, code reviews, team meetings",
    suspiciousIndicators: null
  },
  {
    name: "Michael Rodriguez",
    role: "IT Support Specialist",
    department: "IT",
    accessLevel: "Medium",
    lastLogin: "2024-02-15 10:15",
    loginLocation: "New York, NY",
    recentActivity: "Regular system maintenance, user support tickets",
    suspiciousIndicators: null
  },
  {
    name: "Emily Thompson",
    role: "HR Manager",
    department: "Human Resources",
    accessLevel: "High",
    lastLogin: "2024-02-15 08:45",
    loginLocation: "Chicago, IL",
    recentActivity: "Employee onboarding, policy updates, team meetings",
    suspiciousIndicators: null
  },
  {
    name: "David Kim",
    role: "Security Analyst",
    department: "Security",
    accessLevel: "High",
    lastLogin: "2024-02-15 11:20",
    loginLocation: "Seattle, WA",
    recentActivity: "Security monitoring, threat analysis, team training",
    suspiciousIndicators: null
  },
  {
    name: "Lisa Patel",
    role: "Data Analyst",
    department: "Analytics",
    accessLevel: "Medium",
    lastLogin: "2024-02-15 09:15",
    loginLocation: "Boston, MA",
    recentActivity: "Data analysis, report generation, team meetings",
    suspiciousIndicators: null
  },
  {
    name: "James Wilson",
    role: "Network Engineer",
    department: "IT",
    accessLevel: "High",
    lastLogin: "2024-02-15 10:30",
    loginLocation: "Austin, TX",
    recentActivity: "Network maintenance, security updates, team meetings",
    suspiciousIndicators: null
  },
  {
    name: "Rachel Martinez",
    role: "Product Manager",
    department: "Product",
    accessLevel: "Medium",
    lastLogin: "2024-02-15 08:30",
    loginLocation: "Denver, CO",
    recentActivity: "Product planning, stakeholder meetings, team updates",
    suspiciousIndicators: null
  },
  {
    name: "Thomas Anderson",
    role: "Database Administrator",
    department: "IT",
    accessLevel: "High",
    lastLogin: "2024-02-15 09:45",
    loginLocation: "Portland, OR",
    recentActivity: "Database maintenance, backup verification, team meetings",
    suspiciousIndicators: null
  },
  {
    name: "Sophia Chen",
    role: "UX Designer",
    department: "Design",
    accessLevel: "Low",
    lastLogin: "2024-02-15 10:00",
    loginLocation: "San Diego, CA",
    recentActivity: "Design reviews, user research, team meetings",
    suspiciousIndicators: null
  },
  {
    name: "Daniel Lee",
    role: "Marketing Manager",
    department: "Marketing",
    accessLevel: "Medium",
    lastLogin: "2024-02-15 08:15",
    loginLocation: "Miami, FL",
    recentActivity: "Campaign planning, content review, team meetings",
    suspiciousIndicators: null
  },
  // Insider Threats (10 profiles)
  {
    name: "Alex Thompson",
    role: "System Administrator",
    department: "IT",
    accessLevel: "High",
    lastLogin: "2024-02-15 03:30",
    loginLocation: "Unknown",
    recentActivity: "Multiple failed login attempts, unusual file access patterns, unauthorized system changes",
    suspiciousIndicators: "Unusual login time, unknown location, multiple failed attempts"
  },
  {
    name: "Maria Garcia",
    role: "Financial Analyst",
    department: "Finance",
    accessLevel: "High",
    lastLogin: "2024-02-15 02:15",
    loginLocation: "Multiple locations",
    recentActivity: "Massive data downloads, unauthorized access to sensitive files, attempts to bypass security",
    suspiciousIndicators: "Multiple login locations, unusual data access patterns"
  },
  {
    name: "Kevin O'Brien",
    role: "Database Developer",
    department: "IT",
    accessLevel: "High",
    lastLogin: "2024-02-15 04:45",
    loginLocation: "Remote location",
    recentActivity: "Suspicious database queries, unauthorized schema changes, attempts to export data",
    suspiciousIndicators: "Unusual database access patterns, unauthorized changes"
  },
  {
    name: "Sarah Johnson",
    role: "HR Specialist",
    department: "Human Resources",
    accessLevel: "High",
    lastLogin: "2024-02-15 01:30",
    loginLocation: "Multiple IP addresses",
    recentActivity: "Unauthorized access to employee records, suspicious file downloads, attempts to modify access levels",
    suspiciousIndicators: "Multiple IP addresses, unauthorized record access"
  },
  {
    name: "David Chen",
    role: "Security Engineer",
    department: "Security",
    accessLevel: "High",
    lastLogin: "2024-02-15 05:15",
    loginLocation: "Unknown",
    recentActivity: "Attempts to disable security controls, suspicious network activity, unauthorized system modifications",
    suspiciousIndicators: "Attempts to disable security, unknown location"
  },
  {
    name: "Emma Wilson",
    role: "Data Scientist",
    department: "Analytics",
    accessLevel: "High",
    lastLogin: "2024-02-15 03:00",
    loginLocation: "Multiple locations",
    recentActivity: "Massive data extraction attempts, unauthorized access to sensitive datasets, suspicious queries",
    suspiciousIndicators: "Multiple locations, unusual data access"
  },
  {
    name: "James Martinez",
    role: "Network Administrator",
    department: "IT",
    accessLevel: "High",
    lastLogin: "2024-02-15 02:30",
    loginLocation: "Remote location",
    recentActivity: "Unauthorized network configuration changes, suspicious traffic patterns, attempts to bypass firewalls",
    suspiciousIndicators: "Unauthorized network changes, suspicious traffic"
  },
  {
    name: "Sophie Anderson",
    role: "System Engineer",
    department: "Engineering",
    accessLevel: "High",
    lastLogin: "2024-02-15 04:00",
    loginLocation: "Unknown",
    recentActivity: "Attempts to modify system configurations, suspicious file transfers, unauthorized access attempts",
    suspiciousIndicators: "Unknown location, unauthorized modifications"
  },
  {
    name: "Ryan Kim",
    role: "IT Manager",
    department: "IT",
    accessLevel: "High",
    lastLogin: "2024-02-15 01:15",
    loginLocation: "Multiple IP addresses",
    recentActivity: "Suspicious privilege escalation attempts, unauthorized system changes, attempts to modify audit logs",
    suspiciousIndicators: "Multiple IP addresses, privilege escalation attempts"
  },
  {
    name: "Lisa Chen",
    role: "Security Analyst",
    department: "Security",
    accessLevel: "High",
    lastLogin: "2024-02-15 05:30",
    loginLocation: "Remote location",
    recentActivity: "Attempts to disable security monitoring, suspicious access patterns, unauthorized system modifications",
    suspiciousIndicators: "Attempts to disable monitoring, suspicious access"
  }
];

export const getRandomEmployees = () => {
  // Get one random threat
  const threats = allEmployees.filter(emp => emp.suspiciousIndicators !== null);
  const selectedThreat = threats[Math.floor(Math.random() * threats.length)];
  
  // Get four random legitimate employees
  const legitimate = allEmployees.filter(emp => emp.suspiciousIndicators === null);
  const selectedLegitimate = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * legitimate.length);
    selectedLegitimate.push(legitimate[randomIndex]);
  }
  
  // Combine and shuffle
  const selectedEmployees = [...selectedLegitimate, selectedThreat];
  return shuffleArray(selectedEmployees);
};

export const insiderThreatTips = [
  "Look for unusual access times or locations",
  "Pay attention to large data downloads",
  "Watch for attempts to access systems beyond normal job duties",
  "Notice multiple failed login attempts",
  "Check for emails sent to personal accounts with attachments"
];

export const phishingTips = [
  "Check the sender's email address carefully",
  "Be suspicious of urgent or threatening language",
  "Hover over links to see the actual URL before clicking",
  "Watch for spelling and grammar errors",
  "Be cautious of unexpected attachments",
  "Verify requests for sensitive information through other channels"
];

export const passwordTips = [
  "Use a minimum of 12 characters",
  "Include uppercase and lowercase letters, numbers, and symbols",
  "Avoid using personal information",
  "Don't use common words or patterns",
  "Use a unique password for each account",
  "Consider using a password manager"
];
