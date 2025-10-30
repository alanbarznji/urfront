import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { LoginAction } from '@/Redux/Action/AuthAction';

export default function MenuLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  
  const dispatch=useDispatch()
  const handleSubmit =async (e) => {
    e.preventDefault();
    setShowSuccess(true);
    await dispatch(LoginAction(email,password))
    setShowSuccess(false);
 
  };

  const handleGuestLogin = () => {
    alert('Welcome! Browsing menu as guest');
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email');
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        {/* Logo Section */}
        <div style={styles.logo}>
          <h1 style={styles.logoTitle}>🍽️ MenuHub</h1>
          <p style={styles.logoSubtitle}>Access your digital menu</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div style={styles.successMessage}>
            Login successful! Redirecting...
          </div>
        )}

        {/* Login Area */}
        <div style={styles.formContainer}>
          {/* Email Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email or Username</label>
            <div style={styles.inputWrapper}>
              <Mail style={styles.icon} size={20} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                style={styles.input}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock style={styles.icon} size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={styles.optionsRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.rememberText}>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={styles.forgotButton}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button onClick={handleSubmit} style={styles.loginButton}>
            Login
          </button>
        </div>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>OR</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* Guest Button */}
        <button onClick={handleGuestLogin} style={styles.guestButton}>
          <User size={20} style={{marginRight: '8px'}} />
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  loginBox: {
    width: '100%',
    maxWidth: '420px',
    background: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px 32px',
    animation: 'slideIn 0.5s ease-out'
  },
  logo: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  logoTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: '8px'
  },
  logoSubtitle: {
    fontSize: '14px',
    color: '#666'
  },
  successMessage: {
    background: '#4caf50',
    color: 'white',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '24px',
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease-in'
  },
  formContainer: {
    marginBottom: '32px'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    color: '#333',
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '14px'
  },
  inputWrapper: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999'
  },
  input: {
    width: '100%',
    padding: '14px 14px 14px 48px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    fontSize: '14px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    marginRight: '8px'
  },
  rememberText: {
    color: '#333'
  },
  forgotButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0'
  },
  loginButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '32px 0',
    gap: '12px'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#e0e0e0'
  },
  dividerText: {
    color: '#999',
    fontSize: '14px'
  },
  guestButton: {
    width: '100%',
    padding: '16px',
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};