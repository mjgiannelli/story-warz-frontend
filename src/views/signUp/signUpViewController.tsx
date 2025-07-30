import { useState } from 'react';

const useSignUpViewController = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSignUp = () => {
    if (!username || !password) {
      alert('Missing fields');
      return;
    }

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => console.log('Login success:', data))
      .catch(err => console.error('Login failed:', err));
  };

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSignUp
  };
}

export default useSignUpViewController;