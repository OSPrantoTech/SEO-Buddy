import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  Download,
  RefreshCw,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
  Tablet,
  Loader2,
  Wand2,
  Layout,
  Palette,
  Globe,
  MessageSquare,
  ShoppingCart,
  Users,
  FileText,
  Mail,
  ChevronDown
} from 'lucide-react';

// Code templates based on prompts
const codeTemplates: Record<string, { html: string; css: string; js: string; description: string }> = {
  'landing page': {
    description: 'Modern Landing Page',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Landing Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo">🚀 Brand</div>
    <ul class="nav-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#pricing">Pricing</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#" class="btn-nav">Get Started</a></li>
    </ul>
  </nav>
  
  <header class="hero">
    <h1>Build Something <span class="gradient-text">Amazing</span></h1>
    <p>Create beautiful websites with ease. No coding experience required.</p>
    <div class="hero-buttons">
      <button class="btn-primary">Start Free Trial</button>
      <button class="btn-secondary">Watch Demo</button>
    </div>
  </header>
  
  <section id="features" class="features">
    <h2>Why Choose Us?</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Optimized for speed and performance.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Secure</h3>
        <p>Enterprise-grade security built-in.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>Responsive</h3>
        <p>Works on all devices seamlessly.</p>
      </div>
    </div>
  </section>
  
  <footer>
    <p>© 2024 Brand. All rights reserved.</p>
  </footer>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(255,255,255,0.95);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #667eea;
}

.btn-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
}

.hero {
  text-align: center;
  padding: 8rem 5% 6rem;
  background: white;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: #1a1a2e;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
}

.features {
  padding: 5rem 5%;
  background: #f8f9fa;
  text-align: center;
}

.features h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1a1a2e;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.feature-card p {
  color: #666;
}

footer {
  background: #1a1a2e;
  color: white;
  text-align: center;
  padding: 2rem;
}`,
    js: `// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// Animate feature cards on scroll
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});`
  },
  'login form': {
    description: 'Modern Login Form',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Form</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="login-box">
      <div class="logo">🔐</div>
      <h1>Welcome Back</h1>
      <p class="subtitle">Sign in to your account</p>
      
      <form id="loginForm">
        <div class="input-group">
          <input type="email" id="email" required>
          <label for="email">Email Address</label>
          <span class="icon">📧</span>
        </div>
        
        <div class="input-group">
          <input type="password" id="password" required>
          <label for="password">Password</label>
          <span class="icon">🔑</span>
          <button type="button" class="toggle-password">👁️</button>
        </div>
        
        <div class="options">
          <label class="remember">
            <input type="checkbox"> Remember me
          </label>
          <a href="#" class="forgot">Forgot Password?</a>
        </div>
        
        <button type="submit" class="btn-login">Sign In</button>
        
        <div class="divider">
          <span>or continue with</span>
        </div>
        
        <div class="social-login">
          <button type="button" class="btn-social google">Google</button>
          <button type="button" class="btn-social github">GitHub</button>
        </div>
        
        <p class="signup-link">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </form>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 420px;
}

.login-box {
  background: white;
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}

.logo {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

h1 {
  text-align: center;
  color: #1a1a2e;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-group input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  outline: none;
}

.input-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.input-group label {
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  transition: all 0.3s;
}

.input-group input:focus + label,
.input-group input:valid + label {
  top: 0;
  left: 1rem;
  font-size: 0.75rem;
  background: white;
  padding: 0 0.5rem;
  color: #667eea;
}

.input-group .icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.remember {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #666;
}

.forgot {
  color: #667eea;
  text-decoration: none;
}

.forgot:hover {
  text-decoration: underline;
}

.btn-login {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before { left: 0; }
.divider::after { right: 0; }

.divider span {
  color: #999;
  font-size: 0.85rem;
}

.social-login {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-social {
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-social:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.signup-link {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}`,
    js: `// Toggle password visibility
document.querySelector('.toggle-password').addEventListener('click', function() {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Add loading state
  const btn = document.querySelector('.btn-login');
  const originalText = btn.textContent;
  btn.textContent = 'Signing in...';
  btn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    alert('Login successful! Welcome ' + email);
    btn.textContent = originalText;
    btn.disabled = false;
  }, 1500);
});

// Social login buttons
document.querySelectorAll('.btn-social').forEach(btn => {
  btn.addEventListener('click', function() {
    const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
    alert('Redirecting to ' + provider + ' login...');
  });
});`
  },
  'contact form': {
    description: 'Contact Form with Validation',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="contact-card">
      <div class="card-header">
        <h1>📬 Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message!</p>
      </div>
      
      <form id="contactForm">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" placeholder="John" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" placeholder="Doe" required>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" placeholder="john@example.com" required>
        </div>
        
        <div class="form-group">
          <label for="subject">Subject</label>
          <select id="subject" required>
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="sales">Sales Question</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" rows="5" placeholder="Your message here..." required></textarea>
        </div>
        
        <button type="submit" class="btn-submit">
          <span>Send Message</span>
          <span class="btn-icon">→</span>
        </button>
      </form>
      
      <div class="contact-info">
        <div class="info-item">
          <span class="info-icon">📧</span>
          <span>hello@company.com</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📞</span>
          <span>+1 (555) 123-4567</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📍</span>
          <span>123 Business Street, NY</span>
        </div>
      </div>
    </div>
  </div>
  
  <div id="successModal" class="modal">
    <div class="modal-content">
      <span class="success-icon">✅</span>
      <h2>Message Sent!</h2>
      <p>Thank you for contacting us. We'll get back to you soon.</p>
      <button onclick="closeModal()" class="btn-close">Close</button>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 600px;
}

.contact-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-header h1 {
  font-size: 2rem;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.card-header p {
  color: #666;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 500px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  outline: none;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #11998e;
  box-shadow: 0 0 0 4px rgba(17, 153, 142, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(17, 153, 142, 0.4);
}

.btn-submit .btn-icon {
  transition: transform 0.3s;
}

.btn-submit:hover .btn-icon {
  transform: translateX(5px);
}

.contact-info {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.info-icon {
  font-size: 1.2rem;
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal.show {
  display: flex;
}

.modal-content {
  background: white;
  padding: 3rem;
  border-radius: 24px;
  text-align: center;
  max-width: 400px;
  animation: modalPop 0.3s ease;
}

@keyframes modalPop {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.modal-content h2 {
  color: #11998e;
  margin-bottom: 0.5rem;
}

.modal-content p {
  color: #666;
  margin-bottom: 1.5rem;
}

.btn-close {
  padding: 0.8rem 2rem;
  background: #11998e;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}`,
    js: `// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Simple validation
  if (!firstName || !lastName || !email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Show loading state
  const btn = document.querySelector('.btn-submit');
  const originalContent = btn.innerHTML;
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Show success modal
    document.getElementById('successModal').classList.add('show');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Reset button
    btn.innerHTML = originalContent;
    btn.disabled = false;
  }, 1500);
});

// Close modal function
function closeModal() {
  document.getElementById('successModal').classList.remove('show');
}

// Close modal on outside click
document.getElementById('successModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Add input animations
document.querySelectorAll('input, select, textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
});`
  },
  'pricing table': {
    description: 'Pricing Cards',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing Plans</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Simple, Transparent Pricing</h1>
      <p>Choose the plan that's right for you</p>
      
      <div class="toggle-container">
        <span class="toggle-label">Monthly</span>
        <label class="toggle">
          <input type="checkbox" id="billingToggle">
          <span class="slider"></span>
        </label>
        <span class="toggle-label">Yearly <span class="save-badge">Save 20%</span></span>
      </div>
    </div>
    
    <div class="pricing-grid">
      <div class="pricing-card">
        <div class="card-header">
          <h3>Starter</h3>
          <p class="price"><span class="currency">$</span><span class="amount" data-monthly="9" data-yearly="7">9</span><span class="period">/mo</span></p>
          <p class="description">Perfect for individuals</p>
        </div>
        <ul class="features">
          <li class="included">✓ 5 Projects</li>
          <li class="included">✓ 10GB Storage</li>
          <li class="included">✓ Basic Analytics</li>
          <li class="included">✓ Email Support</li>
          <li class="not-included">✗ Custom Domain</li>
          <li class="not-included">✗ Priority Support</li>
        </ul>
        <button class="btn-select">Get Started</button>
      </div>
      
      <div class="pricing-card popular">
        <div class="popular-badge">Most Popular</div>
        <div class="card-header">
          <h3>Professional</h3>
          <p class="price"><span class="currency">$</span><span class="amount" data-monthly="29" data-yearly="23">29</span><span class="period">/mo</span></p>
          <p class="description">Best for growing teams</p>
        </div>
        <ul class="features">
          <li class="included">✓ Unlimited Projects</li>
          <li class="included">✓ 100GB Storage</li>
          <li class="included">✓ Advanced Analytics</li>
          <li class="included">✓ Priority Support</li>
          <li class="included">✓ Custom Domain</li>
          <li class="not-included">✗ White Label</li>
        </ul>
        <button class="btn-select primary">Get Started</button>
      </div>
      
      <div class="pricing-card">
        <div class="card-header">
          <h3>Enterprise</h3>
          <p class="price"><span class="currency">$</span><span class="amount" data-monthly="99" data-yearly="79">99</span><span class="period">/mo</span></p>
          <p class="description">For large organizations</p>
        </div>
        <ul class="features">
          <li class="included">✓ Everything in Pro</li>
          <li class="included">✓ Unlimited Storage</li>
          <li class="included">✓ Custom Analytics</li>
          <li class="included">✓ 24/7 Support</li>
          <li class="included">✓ White Label</li>
          <li class="included">✓ SLA Guarantee</li>
        </ul>
        <button class="btn-select">Contact Sales</button>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.header > p {
  color: #a0a0a0;
  font-size: 1.1rem;
}

.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.toggle-label {
  color: #a0a0a0;
  font-size: 0.95rem;
}

.save-badge {
  background: #38ef7d;
  color: #1a1a2e;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.toggle {
  position: relative;
  width: 60px;
  height: 30px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #3a3a5a;
  border-radius: 30px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: start;
}

.pricing-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  transition: transform 0.3s;
}

.pricing-card:hover {
  transform: translateY(-10px);
}

.pricing-card.popular {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.05);
  z-index: 1;
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #38ef7d;
  color: #1a1a2e;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-header h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.price {
  font-size: 1rem;
}

.currency {
  font-size: 1.5rem;
  vertical-align: top;
}

.amount {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
}

.period {
  color: #666;
}

.popular .period {
  color: rgba(255,255,255,0.7);
}

.description {
  color: #666;
  margin-top: 0.5rem;
}

.popular .description {
  color: rgba(255,255,255,0.8);
}

.features {
  list-style: none;
  margin-bottom: 2rem;
}

.features li {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.popular .features li {
  border-bottom-color: rgba(255,255,255,0.2);
}

.included {
  color: #333;
}

.popular .included {
  color: white;
}

.not-included {
  color: #aaa;
}

.popular .not-included {
  color: rgba(255,255,255,0.5);
}

.btn-select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-select:hover {
  background: #667eea;
  color: white;
}

.btn-select.primary {
  background: white;
  color: #667eea;
  border-color: white;
}

.btn-select.primary:hover {
  background: #f0f0f0;
}`,
    js: `// Toggle billing period
const toggle = document.getElementById('billingToggle');
const amounts = document.querySelectorAll('.amount');

toggle.addEventListener('change', function() {
  const isYearly = this.checked;
  
  amounts.forEach(amount => {
    const monthly = amount.dataset.monthly;
    const yearly = amount.dataset.yearly;
    
    // Animate the price change
    amount.style.opacity = '0';
    amount.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      amount.textContent = isYearly ? yearly : monthly;
      amount.style.opacity = '1';
      amount.style.transform = 'translateY(0)';
    }, 200);
  });
});

// Add transition styles
amounts.forEach(amount => {
  amount.style.transition = 'all 0.3s ease';
});

// Button click handlers
document.querySelectorAll('.btn-select').forEach(btn => {
  btn.addEventListener('click', function() {
    const plan = this.closest('.pricing-card').querySelector('h3').textContent;
    const price = this.closest('.pricing-card').querySelector('.amount').textContent;
    const period = toggle.checked ? 'yearly' : 'monthly';
    
    alert(\`Selected: \${plan} plan at $\${price}/mo (\${period} billing)\`);
  });
});

// Add entrance animation
document.querySelectorAll('.pricing-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = card.classList.contains('popular') ? 'scale(1.05)' : 'translateY(0)';
  }, 100 * (index + 1));
});`
  },
  'navbar': {
    description: 'Responsive Navigation Bar',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Navbar</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#" class="nav-logo">
        <span class="logo-icon">🚀</span>
        <span class="logo-text">Brand</span>
      </a>
      
      <ul class="nav-menu" id="navMenu">
        <li class="nav-item">
          <a href="#" class="nav-link active">Home</a>
        </li>
        <li class="nav-item dropdown">
          <a href="#" class="nav-link dropdown-toggle">
            Products
            <span class="dropdown-arrow">▼</span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Web Apps</a></li>
            <li><a href="#">Mobile Apps</a></li>
            <li><a href="#">Desktop Apps</a></li>
            <li><a href="#">API Services</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Pricing</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">About</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">Contact</a>
        </li>
        <li class="nav-item nav-buttons">
          <a href="#" class="btn-login">Login</a>
          <a href="#" class="btn-signup">Sign Up</a>
        </li>
      </ul>
      
      <button class="hamburger" id="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </nav>
  
  <main class="content">
    <h1>Welcome to Our Website</h1>
    <p>Scroll down to see the navbar in action</p>
    <div style="height: 2000px;"></div>
  </main>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}

.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255,255,255,0.98);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 1.5rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 5px;
  list-style: none;
}

.nav-link {
  display: block;
  padding: 10px 18px;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #667eea;
  background: #f0f4ff;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-arrow {
  font-size: 0.7rem;
  margin-left: 5px;
  transition: transform 0.3s;
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 180px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  padding: 10px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s;
  list-style: none;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 10px 20px;
  color: #555;
  text-decoration: none;
  transition: all 0.3s;
}

.dropdown-menu a:hover {
  background: #f0f4ff;
  color: #667eea;
}

/* Buttons */
.nav-buttons {
  display: flex;
  gap: 10px;
  margin-left: 20px;
}

.btn-login {
  padding: 10px 24px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-login:hover {
  background: #f0f4ff;
}

.btn-signup {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-signup:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 3px;
  transition: all 0.3s;
}

/* Mobile Styles */
@media (max-width: 900px) {
  .hamburger {
    display: flex;
    z-index: 1001;
  }
  
  .hamburger.active .bar:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px);
  }
  
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active .bar:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -6px);
  }
  
  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 400px;
    height: 100vh;
    background: white;
    flex-direction: column;
    align-items: stretch;
    padding: 100px 30px 30px;
    box-shadow: -10px 0 30px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    gap: 0;
  }
  
  .nav-menu.active {
    right: 0;
  }
  
  .nav-item {
    border-bottom: 1px solid #eee;
  }
  
  .nav-link {
    padding: 15px 0;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    max-height: 0;
    overflow: hidden;
    padding: 0;
  }
  
  .dropdown.open .dropdown-menu {
    max-height: 500px;
    padding: 10px 0;
  }
  
  .nav-buttons {
    flex-direction: column;
    margin: 20px 0 0 0;
    gap: 15px;
  }
  
  .btn-login, .btn-signup {
    text-align: center;
    padding: 15px;
  }
}

/* Content */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  text-align: center;
}

.content h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.content p {
  color: #666;
  font-size: 1.1rem;
}`,
    js: `// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Dropdown toggle for mobile
document.querySelectorAll('.dropdown').forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active link update
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});`
  },
  'card': {
    description: 'Modern Card Components',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Cards</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Modern Card Components</h1>
    
    <section class="card-section">
      <h2>Product Cards</h2>
      <div class="card-grid">
        <div class="product-card">
          <div class="card-image">
            <img src="https://picsum.photos/300/200?random=1" alt="Product">
            <span class="badge">New</span>
            <button class="wishlist">❤</button>
          </div>
          <div class="card-content">
            <span class="category">Electronics</span>
            <h3>Wireless Headphones</h3>
            <div class="rating">★★★★★ <span>(128)</span></div>
            <div class="price">
              <span class="current">$99.99</span>
              <span class="original">$149.99</span>
            </div>
            <button class="btn-cart">Add to Cart</button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="card-image">
            <img src="https://picsum.photos/300/200?random=2" alt="Product">
            <span class="badge sale">-30%</span>
            <button class="wishlist">❤</button>
          </div>
          <div class="card-content">
            <span class="category">Accessories</span>
            <h3>Smart Watch Pro</h3>
            <div class="rating">★★★★☆ <span>(89)</span></div>
            <div class="price">
              <span class="current">$199.99</span>
              <span class="original">$279.99</span>
            </div>
            <button class="btn-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
    
    <section class="card-section">
      <h2>Profile Cards</h2>
      <div class="card-grid">
        <div class="profile-card">
          <div class="profile-bg"></div>
          <img src="https://i.pravatar.cc/150?img=1" alt="Profile" class="profile-img">
          <h3>Sarah Johnson</h3>
          <p class="title">Senior Developer</p>
          <div class="stats">
            <div><strong>142</strong><span>Posts</span></div>
            <div><strong>8.5K</strong><span>Followers</span></div>
            <div><strong>365</strong><span>Following</span></div>
          </div>
          <button class="btn-follow">Follow</button>
        </div>
        
        <div class="profile-card">
          <div class="profile-bg" style="background: linear-gradient(135deg, #11998e, #38ef7d);"></div>
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile" class="profile-img">
          <h3>Mike Chen</h3>
          <p class="title">UX Designer</p>
          <div class="stats">
            <div><strong>89</strong><span>Posts</span></div>
            <div><strong>12K</strong><span>Followers</span></div>
            <div><strong>198</strong><span>Following</span></div>
          </div>
          <button class="btn-follow">Follow</button>
        </div>
      </div>
    </section>
    
    <section class="card-section">
      <h2>Blog Cards</h2>
      <div class="card-grid">
        <article class="blog-card">
          <img src="https://picsum.photos/400/250?random=3" alt="Blog">
          <div class="blog-content">
            <div class="blog-meta">
              <span class="date">Dec 15, 2024</span>
              <span class="read-time">5 min read</span>
            </div>
            <h3>Getting Started with React Hooks</h3>
            <p>Learn the basics of React Hooks and how they can simplify your component logic...</p>
            <a href="#" class="read-more">Read More →</a>
          </div>
        </article>
      </div>
    </section>
  </div>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f0f2f5;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

.card-section {
  margin-bottom: 4rem;
}

.card-section h2 {
  color: #555;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* Product Card */
.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.card-image {
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .card-image img {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background: #667eea;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.sale {
  background: #ff4757;
}

.wishlist {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.wishlist:hover {
  background: #ff4757;
  color: white;
  transform: scale(1.1);
}

.card-content {
  padding: 1.5rem;
}

.category {
  color: #667eea;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.card-content h3 {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.rating {
  color: #ffc107;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.rating span {
  color: #999;
}

.price {
  margin: 1rem 0;
}

.current {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.original {
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 10px;
}

.btn-cart {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Profile Card */
.profile-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}

.profile-card:hover {
  transform: translateY(-10px);
}

.profile-bg {
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  margin-top: -50px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.profile-card h3 {
  margin: 1rem 0 0.25rem;
  color: #333;
}

.profile-card .title {
  color: #666;
  font-size: 0.9rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
  border-top: 1px solid #eee;
  margin-top: 1.5rem;
}

.stats div {
  text-align: center;
}

.stats strong {
  display: block;
  font-size: 1.25rem;
  color: #333;
}

.stats span {
  font-size: 0.8rem;
  color: #999;
}

.btn-follow {
  margin: 0 1.5rem 1.5rem;
  padding: 10px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-follow:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Blog Card */
.blog-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}

.blog-card:hover {
  transform: translateY(-10px);
}

.blog-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: #999;
}

.blog-card h3 {
  color: #333;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.blog-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.read-more:hover {
  color: #764ba2;
}`,
    js: `// Wishlist toggle
document.querySelectorAll('.wishlist').forEach(btn => {
  btn.addEventListener('click', function() {
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
      this.style.background = '#ff4757';
      this.style.color = 'white';
    } else {
      this.style.background = 'white';
      this.style.color = 'inherit';
    }
  });
});

// Add to cart animation
document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', function() {
    const originalText = this.textContent;
    this.textContent = '✓ Added!';
    this.style.background = '#38ef7d';
    
    setTimeout(() => {
      this.textContent = originalText;
      this.style.background = '';
    }, 2000);
  });
});

// Follow button toggle
document.querySelectorAll('.btn-follow').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.textContent === 'Follow') {
      this.textContent = 'Following';
      this.style.background = '#38ef7d';
    } else {
      this.textContent = 'Follow';
      this.style.background = '';
    }
  });
});

// Card entrance animation
document.querySelectorAll('.product-card, .profile-card, .blog-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  
  setTimeout(() => {
    card.style.transition = 'all 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100 * (index + 1));
});`
  },
  'button': {
    description: 'Button Collection',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Collection</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🎨 Button Collection</h1>
    
    <section>
      <h2>Solid Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-success">Success</button>
        <button class="btn btn-danger">Danger</button>
        <button class="btn btn-warning">Warning</button>
      </div>
    </section>
    
    <section>
      <h2>Gradient Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-gradient-1">Sunset</button>
        <button class="btn btn-gradient-2">Ocean</button>
        <button class="btn btn-gradient-3">Forest</button>
        <button class="btn btn-gradient-4">Purple Rain</button>
      </div>
    </section>
    
    <section>
      <h2>Outline Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-outline-primary">Primary</button>
        <button class="btn btn-outline-secondary">Secondary</button>
        <button class="btn btn-outline-success">Success</button>
        <button class="btn btn-outline-danger">Danger</button>
      </div>
    </section>
    
    <section>
      <h2>Icon Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-icon btn-primary">🔍 Search</button>
        <button class="btn btn-icon btn-success">✓ Confirm</button>
        <button class="btn btn-icon btn-danger">🗑 Delete</button>
        <button class="btn btn-icon btn-secondary">⚙ Settings</button>
      </div>
    </section>
    
    <section>
      <h2>Animated Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-animated btn-pulse">Pulse</button>
        <button class="btn btn-animated btn-shake">Shake Me</button>
        <button class="btn btn-animated btn-glow">Glow</button>
        <button class="btn btn-animated btn-slide">Slide →</button>
      </div>
    </section>
    
    <section>
      <h2>Loading Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-primary btn-loading" onclick="toggleLoading(this)">
          <span class="spinner"></span>
          <span class="text">Click to Load</span>
        </button>
        <button class="btn btn-success btn-loading" onclick="toggleLoading(this)">
          <span class="spinner"></span>
          <span class="text">Submit</span>
        </button>
      </div>
    </section>
    
    <section>
      <h2>Social Buttons</h2>
      <div class="btn-group">
        <button class="btn btn-social btn-facebook">Facebook</button>
        <button class="btn btn-social btn-twitter">Twitter</button>
        <button class="btn btn-social btn-google">Google</button>
        <button class="btn btn-social btn-github">GitHub</button>
      </div>
    </section>
    
    <section>
      <h2>Sizes</h2>
      <div class="btn-group">
        <button class="btn btn-primary btn-xs">Extra Small</button>
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary">Default</button>
        <button class="btn btn-primary btn-lg">Large</button>
        <button class="btn btn-primary btn-xl">Extra Large</button>
      </div>
    </section>
  </div>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  padding: 40px 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

section {
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
}

h2 {
  color: #a0a0a0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Base Button */
.btn {
  padding: 12px 28px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  transform: translateY(-3px);
}

.btn:active {
  transform: translateY(-1px);
}

/* Solid Buttons */
.btn-primary { background: #667eea; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-danger { background: #dc3545; color: white; }
.btn-warning { background: #ffc107; color: #333; }

.btn-primary:hover { background: #5a6fd6; box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4); }
.btn-secondary:hover { background: #5a6268; box-shadow: 0 10px 20px rgba(108, 117, 125, 0.4); }
.btn-success:hover { background: #218838; box-shadow: 0 10px 20px rgba(40, 167, 69, 0.4); }
.btn-danger:hover { background: #c82333; box-shadow: 0 10px 20px rgba(220, 53, 69, 0.4); }
.btn-warning:hover { background: #e0a800; box-shadow: 0 10px 20px rgba(255, 193, 7, 0.4); }

/* Gradient Buttons */
.btn-gradient-1 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
.btn-gradient-2 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
.btn-gradient-3 { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; }
.btn-gradient-4 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }

/* Outline Buttons */
.btn-outline-primary { background: transparent; border: 2px solid #667eea; color: #667eea; }
.btn-outline-secondary { background: transparent; border: 2px solid #6c757d; color: #6c757d; }
.btn-outline-success { background: transparent; border: 2px solid #28a745; color: #28a745; }
.btn-outline-danger { background: transparent; border: 2px solid #dc3545; color: #dc3545; }

.btn-outline-primary:hover { background: #667eea; color: white; }
.btn-outline-secondary:hover { background: #6c757d; color: white; }
.btn-outline-success:hover { background: #28a745; color: white; }
.btn-outline-danger:hover { background: #dc3545; color: white; }

/* Icon Buttons */
.btn-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Animated Buttons */
.btn-pulse {
  background: #667eea;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
  50% { box-shadow: 0 0 0 15px rgba(102, 126, 234, 0); }
}

.btn-shake:hover {
  animation: shake 0.5s;
  background: #dc3545;
  color: white;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.btn-glow {
  background: #764ba2;
  color: white;
}

.btn-glow:hover {
  box-shadow: 0 0 20px #764ba2, 0 0 40px #764ba2, 0 0 60px #764ba2;
}

.btn-slide {
  background: #28a745;
  color: white;
}

.btn-slide:hover {
  padding-right: 40px;
}

/* Loading Buttons */
.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  display: none;
  animation: spin 1s linear infinite;
}

.btn-loading.loading .spinner {
  display: block;
}

.btn-loading.loading .text {
  display: none;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Social Buttons */
.btn-facebook { background: #1877f2; color: white; }
.btn-twitter { background: #1da1f2; color: white; }
.btn-google { background: #ea4335; color: white; }
.btn-github { background: #333; color: white; }

/* Sizes */
.btn-xs { padding: 6px 14px; font-size: 0.75rem; }
.btn-sm { padding: 8px 18px; font-size: 0.875rem; }
.btn-lg { padding: 16px 36px; font-size: 1.125rem; }
.btn-xl { padding: 20px 48px; font-size: 1.25rem; }

@media (max-width: 600px) {
  .btn-group {
    justify-content: center;
  }
}`,
    js: `// Loading button toggle
function toggleLoading(btn) {
  btn.classList.toggle('loading');
  
  if (btn.classList.contains('loading')) {
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.querySelector('.text').textContent = 'Done!';
      btn.style.background = '#28a745';
      
      setTimeout(() => {
        btn.querySelector('.text').textContent = 'Click to Load';
        btn.style.background = '';
      }, 2000);
    }, 2000);
  }
}

// Ripple effect for all buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = \`
      position: absolute;
      width: \${size}px;
      height: \${size}px;
      left: \${x}px;
      top: \${y}px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    \`;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = \`
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
\`;
document.head.appendChild(style);`
  }
};

// Quick prompts for users
const quickPrompts = [
  { icon: <Layout className="w-4 h-4" />, label: 'Landing Page', prompt: 'landing page' },
  { icon: <Users className="w-4 h-4" />, label: 'Login Form', prompt: 'login form' },
  { icon: <Mail className="w-4 h-4" />, label: 'Contact Form', prompt: 'contact form' },
  { icon: <ShoppingCart className="w-4 h-4" />, label: 'Pricing Table', prompt: 'pricing table' },
  { icon: <Globe className="w-4 h-4" />, label: 'Navbar', prompt: 'navbar' },
  { icon: <FileText className="w-4 h-4" />, label: 'Cards', prompt: 'card' },
  { icon: <Palette className="w-4 h-4" />, label: 'Buttons', prompt: 'button' },
];

export default function AiCodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<{ html: string; css: string; js: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generateCode = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;
    
    setIsGenerating(true);
    setPrompt(inputPrompt);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Find matching template
    const lowerPrompt = inputPrompt.toLowerCase();
    let matchedTemplate = null;
    
    for (const [key, value] of Object.entries(codeTemplates)) {
      if (lowerPrompt.includes(key)) {
        matchedTemplate = value;
        break;
      }
    }
    
    if (matchedTemplate) {
      setGeneratedCode({
        html: matchedTemplate.html,
        css: matchedTemplate.css,
        js: matchedTemplate.js
      });
    } else {
      // Default template for unknown prompts
      setGeneratedCode({
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${inputPrompt}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>✨ ${inputPrompt}</h1>
    <p>Your custom component goes here.</p>
    <button class="btn">Get Started</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn:hover {
  transform: translateY(-3px);
}`,
        js: `document.querySelector('.btn').addEventListener('click', () => {
  alert('Button clicked!');
});`
      });
    }
    
    setIsGenerating(false);
  };

  const getPreviewHtml = () => {
    if (!generatedCode) return '';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${generatedCode.css}</style>
        </head>
        <body>
          ${generatedCode.html.replace(/<!DOCTYPE html>[\s\S]*?<body>/i, '').replace(/<\/body>[\s\S]*?<\/html>/i, '')}
          <script>${generatedCode.js}</script>
        </body>
      </html>
    `;
  };

  const copyCode = () => {
    if (!generatedCode) return;
    
    const code = activeTab === 'html' ? generatedCode.html : activeTab === 'css' ? generatedCode.css : generatedCode.js;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const zip = `
<!-- HTML (index.html) -->
${generatedCode.html}

/* CSS (style.css) */
${generatedCode.css}

// JavaScript (script.js)
${generatedCode.js}
    `;
    
    const blob = new Blob([zip], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = getPreviewHtml();
    }
  };

  useEffect(() => {
    if (generatedCode && iframeRef.current) {
      iframeRef.current.srcdoc = getPreviewHtml();
    }
  }, [generatedCode]);

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {/* Header */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Code Generator
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Prompt দিন, code পান এবং live preview দেখুন
          </p>
        </div>
        
        {generatedCode && (
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="text-sm">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        )}
      </div>

      {/* Prompt Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4 sm:mb-6">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="আপনি কি বানাতে চান? যেমন: 'landing page', 'login form', 'pricing table'..."
              className="w-full h-24 sm:h-20 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateCode(prompt);
                }
              }}
            />
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowQuickPrompts(!showQuickPrompts)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
            >
              <Wand2 className="w-3 h-3" />
              Quick Templates
              <ChevronDown className={`w-3 h-3 transition-transform ${showQuickPrompts ? 'rotate-180' : ''}`} />
            </button>
            
            {showQuickPrompts && quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => generateCode(qp.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {qp.icon}
                {qp.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => generateCode(prompt)}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor & Preview */}
      {generatedCode && (
        <div className={`grid ${isFullscreen ? 'grid-cols-1 lg:grid-cols-2 h-[calc(100vh-200px)]' : 'grid-cols-1 lg:grid-cols-2'} gap-4`}>
          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-2 py-1">
              <div className="flex">
                {(['html', 'css', 'js'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === tab
                        ? 'bg-gray-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={copyCode}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={downloadCode}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Download code"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Display */}
            <div className={`${isFullscreen ? 'flex-1' : 'h-80 sm:h-96'} overflow-auto`}>
              <pre className="p-4 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                <code>
                  {activeTab === 'html' && generatedCode.html}
                  {activeTab === 'css' && generatedCode.css}
                  {activeTab === 'js' && generatedCode.js}
                </code>
              </pre>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Preview</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded transition-colors ${previewMode === 'mobile' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                  title="Mobile view"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded transition-colors ${previewMode === 'tablet' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                  title="Tablet view"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded transition-colors ${previewMode === 'desktop' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                  title="Desktop view"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={refreshPreview}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors ml-2"
                  title="Refresh preview"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className={`${isFullscreen ? 'flex-1' : 'h-80 sm:h-96'} bg-gray-100 dark:bg-gray-900 p-4 overflow-auto flex justify-center`}>
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
                style={{ width: getPreviewWidth(), height: '100%' }}
              >
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!generatedCode && !isGenerating && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-purple-100 dark:border-gray-700 p-8 sm:p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            AI দিয়ে Code Generate করুন
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            উপরে prompt লিখুন অথবা Quick Templates থেকে select করুন। AI আপনার জন্য HTML, CSS এবং JavaScript code তৈরি করবে।
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {quickPrompts.slice(0, 4).map((qp, idx) => (
              <button
                key={idx}
                onClick={() => generateCode(qp.prompt)}
                className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  {qp.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{qp.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• <strong>Quick Templates</strong> ব্যবহার করে সহজে common components তৈরি করুন</li>
          <li>• Generated code modify করে আপনার project এ ব্যবহার করুন</li>
          <li>• Preview mode change করে responsive design check করুন</li>
          <li>• Enter press করে দ্রুত generate করুন</li>
        </ul>
      </div>
    </div>
  );
}
