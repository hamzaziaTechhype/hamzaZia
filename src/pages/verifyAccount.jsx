import React, { useState } from 'react';

const VerifyAccount = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        console.log('Account verified successfully');
      } else {
        console.error('Account verification failed');
      }
    } catch (error) {
      console.error('Error during account verification:', error);
    }
  };

  return (
    <>
      <div className="wrapper-login">
        <div className="inner">
          <form onSubmit={handleSubmit}>
            <h3 className="text-white text-center">Verify Account</h3>
            <div className="form-holder">
              <span className="lnr lnr-user" />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-holder">
              <span className="lnr lnr-user" />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Enter your Otp here"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} type="submit" className="bg-success">
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
