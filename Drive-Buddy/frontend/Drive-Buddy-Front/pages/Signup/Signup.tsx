import React, { useState } from 'react';
import StudentSignup from './StudentSignup';
import DriverSignup from './DriverSignup';
import './Signup.scss';

const Signup: React.FC = () => {
  const [signupType, setSignupType] = useState<'student' | 'driver' | null>(null);

  return (
    <div className="signup-container">
      {signupType === null && (
        <div className="signup-options">
          <button onClick={() => setSignupType('student')}>Student Signup</button>
          <button onClick={() => setSignupType('driver')}>Driver Signup</button>
        </div>
      )}
      {signupType === 'student' && <StudentSignup />}
      {signupType === 'driver' && <DriverSignup />}
    </div>
  );
};

export default Signup;
