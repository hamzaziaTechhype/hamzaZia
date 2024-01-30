import React,{useState} from 'react'
const Forgot = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
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
    <form action>
      <h3 className='text-white text-center'>Forgot</h3>
      <div className="form-holder">
        <span className="lnr lnr-user" />
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text" className="form-control mb-2" placeholder="Username / email" />
      </div>
      <button type='submit' onClick={handleSubmit} className='bg-warning '>
        <span>Find</span>
      </button>
    </form>
  </div>
</div>
    </>
  )
}

export default Forgot