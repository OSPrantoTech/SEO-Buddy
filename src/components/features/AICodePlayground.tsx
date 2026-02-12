import { useState, useRef, useEffect } from 'react';
import { 
  Send, Copy, Download, Smartphone, Tablet, Monitor,
  Check, RefreshCw, Trash2, Code, Eye, Sparkles,
  Layout, ShoppingCart, LogIn, Mail, CreditCard,
  Menu, User, Image, Loader2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Template {
  id: string;
  name: string;
  icon: React.ElementType;
}

const templates: Template[] = [
  { id: 'landing', name: 'Landing Page', icon: Layout },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart },
  { id: 'login', name: 'Login Form', icon: LogIn },
  { id: 'contact', name: 'Contact Form', icon: Mail },
  { id: 'pricing', name: 'Pricing Table', icon: CreditCard },
  { id: 'navbar', name: 'Navigation Bar', icon: Menu },
  { id: 'profile', name: 'Profile Card', icon: User },
  { id: 'gallery', name: 'Image Gallery', icon: Image },
];

// Code templates
const codeTemplates: { [key: string]: { html: string; css: string; js: string } } = {
  landing: {
    html: `<nav class="navbar">
  <div class="container">
    <a href="#" class="logo"><i class="fas fa-rocket"></i> BrandName</a>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#" class="btn">Get Started</a></li>
    </ul>
  </div>
</nav>
<header class="hero">
  <div class="container">
    <span class="badge">🚀 New Feature Available</span>
    <h1>Build Amazing Products <span class="gradient-text">Faster Than Ever</span></h1>
    <p>The all-in-one platform that helps you design, develop, and deploy stunning applications.</p>
    <div class="hero-buttons">
      <a href="#" class="btn btn-primary">Start Free Trial</a>
      <a href="#" class="btn btn-secondary">Watch Demo</a>
    </div>
  </div>
</header>
<section class="features">
  <div class="container">
    <h2>Why Choose Us</h2>
    <div class="features-grid">
      <div class="feature-card">
        <i class="fas fa-bolt"></i>
        <h3>Lightning Fast</h3>
        <p>Optimized performance for the best user experience.</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-shield-alt"></i>
        <h3>Secure</h3>
        <p>Enterprise-grade security for your peace of mind.</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-heart"></i>
        <h3>Easy to Use</h3>
        <p>Intuitive interface anyone can master quickly.</p>
      </div>
    </div>
  </div>
</section>`,
    css: `:root {
  --primary: #6366f1;
  --dark: #0f172a;
  --gray: #64748b;
  --light: #f8fafc;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.navbar { background: white; padding: 15px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.navbar .container { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.5rem; font-weight: 700; color: var(--dark); text-decoration: none; }
.logo i { color: var(--primary); }
.nav-links { display: flex; list-style: none; gap: 30px; align-items: center; }
.nav-links a { text-decoration: none; color: var(--gray); font-weight: 500; }
.nav-links a:hover { color: var(--primary); }
.btn { padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; }
.btn-primary { background: var(--primary); color: white; }
.btn-secondary { background: var(--light); color: var(--dark); }
.hero { padding: 100px 0; background: linear-gradient(180deg, #f8fafc 0%, #fff 100%); text-align: center; }
.badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 50px; font-size: 0.875rem; margin-bottom: 20px; }
.hero h1 { font-size: 3rem; color: var(--dark); margin-bottom: 20px; }
.gradient-text { background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { font-size: 1.2rem; color: var(--gray); margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; }
.hero-buttons { display: flex; gap: 15px; justify-content: center; }
.features { padding: 80px 0; background: white; }
.features h2 { text-align: center; font-size: 2rem; margin-bottom: 50px; }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.feature-card { background: var(--light); padding: 30px; border-radius: 16px; text-align: center; }
.feature-card i { font-size: 2rem; color: var(--primary); margin-bottom: 15px; }
.feature-card h3 { margin-bottom: 10px; }
.feature-card p { color: var(--gray); }
@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr; }
  .hero h1 { font-size: 2rem; }
  .nav-links { display: none; }
}`,
    js: `console.log('Landing page loaded');`
  },
  login: {
    html: `<div class="auth-container">
  <div class="auth-card">
    <div class="auth-header">
      <div class="logo-icon"><i class="fas fa-rocket"></i></div>
      <h1>Welcome Back</h1>
      <p>Sign in to continue</p>
    </div>
    <form class="auth-form">
      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" placeholder="Enter your password">
      </div>
      <div class="form-options">
        <label><input type="checkbox"> Remember me</label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit" class="btn-submit">Sign In</button>
    </form>
    <div class="divider"><span>or continue with</span></div>
    <div class="social-login">
      <button class="social-btn"><i class="fab fa-google"></i></button>
      <button class="social-btn"><i class="fab fa-github"></i></button>
      <button class="social-btn"><i class="fab fa-twitter"></i></button>
    </div>
    <p class="signup-link">Don't have an account? <a href="#">Sign up</a></p>
  </div>
</div>`,
    css: `:root { --primary: #6366f1; --dark: #0f172a; --gray: #64748b; --light: #f1f5f9; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #6366f1, #8b5cf6); }
.auth-container { width: 100%; max-width: 420px; padding: 20px; }
.auth-card { background: white; padding: 40px; border-radius: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
.auth-header { text-align: center; margin-bottom: 30px; }
.logo-icon { width: 60px; height: 60px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 1.5rem; color: white; }
.auth-header h1 { font-size: 1.5rem; color: var(--dark); margin-bottom: 5px; }
.auth-header p { color: var(--gray); }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 500; color: var(--dark); margin-bottom: 8px; font-size: 0.9rem; }
.form-group input { width: 100%; padding: 12px 16px; border: 2px solid var(--light); border-radius: 12px; font-size: 1rem; }
.form-group input:focus { outline: none; border-color: var(--primary); }
.form-options { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 0.9rem; }
.form-options label { display: flex; align-items: center; gap: 8px; color: var(--gray); }
.form-options a { color: var(--primary); text-decoration: none; }
.btn-submit { width: 100%; padding: 14px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; }
.btn-submit:hover { opacity: 0.9; }
.divider { display: flex; align-items: center; margin: 25px 0; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--light); }
.divider span { padding: 0 15px; color: var(--gray); font-size: 0.85rem; }
.social-login { display: flex; justify-content: center; gap: 15px; }
.social-btn { width: 50px; height: 50px; border: 2px solid var(--light); border-radius: 12px; background: white; cursor: pointer; font-size: 1.2rem; color: var(--gray); }
.social-btn:hover { border-color: var(--primary); color: var(--primary); }
.signup-link { text-align: center; margin-top: 25px; color: var(--gray); font-size: 0.9rem; }
.signup-link a { color: var(--primary); text-decoration: none; font-weight: 600; }`,
    js: `document.querySelector('.auth-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login successful!');
});`
  },
  contact: {
    html: `<section class="contact-section">
  <div class="container">
    <div class="contact-header">
      <h1>Get in Touch</h1>
      <p>Have a question? We'd love to hear from you.</p>
    </div>
    <div class="contact-grid">
      <div class="contact-info">
        <div class="info-card"><i class="fas fa-map-marker-alt"></i><div><h3>Location</h3><p>123 Business St, NY</p></div></div>
        <div class="info-card"><i class="fas fa-envelope"></i><div><h3>Email</h3><p>hello@company.com</p></div></div>
        <div class="info-card"><i class="fas fa-phone"></i><div><h3>Phone</h3><p>+1 (555) 123-4567</p></div></div>
      </div>
      <form class="contact-form">
        <div class="form-row">
          <input type="text" placeholder="First Name">
          <input type="text" placeholder="Last Name">
        </div>
        <input type="email" placeholder="Email Address">
        <input type="text" placeholder="Subject">
        <textarea rows="5" placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</section>`,
    css: `:root { --primary: #6366f1; --dark: #0f172a; --gray: #64748b; --light: #f8fafc; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: var(--light); }
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.contact-section { padding: 80px 0; }
.contact-header { text-align: center; margin-bottom: 50px; }
.contact-header h1 { font-size: 2.5rem; color: var(--dark); margin-bottom: 10px; }
.contact-header p { color: var(--gray); font-size: 1.1rem; }
.contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 50px; }
.contact-info { display: flex; flex-direction: column; gap: 20px; }
.info-card { display: flex; gap: 15px; padding: 20px; background: white; border-radius: 12px; }
.info-card i { width: 45px; height: 45px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; }
.info-card h3 { font-size: 1rem; color: var(--dark); margin-bottom: 3px; }
.info-card p { color: var(--gray); font-size: 0.9rem; }
.contact-form { background: white; padding: 35px; border-radius: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.contact-form input, .contact-form textarea { width: 100%; padding: 14px; border: 2px solid var(--light); border-radius: 10px; font-size: 1rem; margin-bottom: 15px; }
.contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--primary); }
.contact-form button { width: 100%; padding: 14px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; }
@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }`,
    js: `document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent!');
});`
  },
  pricing: {
    html: `<section class="pricing-section">
  <div class="container">
    <div class="pricing-header">
      <h1>Simple Pricing</h1>
      <p>Choose the perfect plan for your needs</p>
    </div>
    <div class="pricing-grid">
      <div class="pricing-card">
        <h3>Starter</h3>
        <div class="price"><span>$</span>9<span>/mo</span></div>
        <ul>
          <li><i class="fas fa-check"></i> 5 Projects</li>
          <li><i class="fas fa-check"></i> 10GB Storage</li>
          <li><i class="fas fa-check"></i> Email Support</li>
        </ul>
        <button>Get Started</button>
      </div>
      <div class="pricing-card popular">
        <span class="badge">Most Popular</span>
        <h3>Professional</h3>
        <div class="price"><span>$</span>29<span>/mo</span></div>
        <ul>
          <li><i class="fas fa-check"></i> Unlimited Projects</li>
          <li><i class="fas fa-check"></i> 100GB Storage</li>
          <li><i class="fas fa-check"></i> Priority Support</li>
          <li><i class="fas fa-check"></i> Custom Domain</li>
        </ul>
        <button>Get Started</button>
      </div>
      <div class="pricing-card">
        <h3>Enterprise</h3>
        <div class="price"><span>$</span>99<span>/mo</span></div>
        <ul>
          <li><i class="fas fa-check"></i> Everything in Pro</li>
          <li><i class="fas fa-check"></i> Unlimited Storage</li>
          <li><i class="fas fa-check"></i> Dedicated Manager</li>
        </ul>
        <button>Contact Sales</button>
      </div>
    </div>
  </div>
</section>`,
    css: `:root { --primary: #6366f1; --dark: #0f172a; --gray: #64748b; --light: #f8fafc; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: var(--light); }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.pricing-section { padding: 80px 0; }
.pricing-header { text-align: center; margin-bottom: 50px; }
.pricing-header h1 { font-size: 2.5rem; color: var(--dark); margin-bottom: 10px; }
.pricing-header p { color: var(--gray); }
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.pricing-card { background: white; padding: 40px; border-radius: 20px; text-align: center; position: relative; }
.pricing-card.popular { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; transform: scale(1.05); }
.pricing-card .badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #fbbf24; color: #78350f; padding: 5px 15px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; }
.pricing-card h3 { font-size: 1.25rem; margin-bottom: 15px; }
.pricing-card:not(.popular) h3 { color: var(--dark); }
.price { font-size: 3rem; font-weight: 800; margin-bottom: 25px; }
.price span:first-child { font-size: 1.5rem; }
.price span:last-child { font-size: 1rem; opacity: 0.7; }
.pricing-card:not(.popular) .price { color: var(--dark); }
.pricing-card ul { list-style: none; margin-bottom: 30px; text-align: left; }
.pricing-card li { padding: 10px 0; display: flex; align-items: center; gap: 10px; }
.pricing-card:not(.popular) li { color: var(--gray); }
.pricing-card li i { color: #22c55e; }
.pricing-card.popular li i { color: white; }
.pricing-card button { width: 100%; padding: 14px; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; border: none; }
.pricing-card:not(.popular) button { background: var(--light); color: var(--dark); }
.pricing-card.popular button { background: white; color: var(--primary); }
@media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr; } .pricing-card.popular { transform: none; } }`,
    js: `document.querySelectorAll('.pricing-card button').forEach(btn => {
  btn.addEventListener('click', () => alert('Plan selected!'));
});`
  },
  navbar: {
    html: `<nav class="navbar">
  <div class="container">
    <a href="#" class="logo"><i class="fas fa-cube"></i> Brand</a>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="#" class="btn btn-outline">Login</a>
      <a href="#" class="btn btn-primary">Sign Up</a>
    </div>
    <button class="mobile-menu"><i class="fas fa-bars"></i></button>
  </div>
</nav>
<div class="hero">
  <h1>Welcome to Our Website</h1>
  <p>This is a sample hero section to showcase the navbar.</p>
</div>`,
    css: `:root { --primary: #6366f1; --dark: #0f172a; --gray: #64748b; --light: #f8fafc; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.navbar { background: white; padding: 15px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 100; }
.navbar .container { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.5rem; font-weight: 700; color: var(--dark); text-decoration: none; display: flex; align-items: center; gap: 8px; }
.logo i { color: var(--primary); }
.nav-links { display: flex; list-style: none; gap: 35px; }
.nav-links a { text-decoration: none; color: var(--gray); font-weight: 500; transition: color 0.3s; }
.nav-links a:hover { color: var(--primary); }
.nav-actions { display: flex; gap: 12px; }
.btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
.btn-outline { border: 2px solid var(--light); color: var(--dark); }
.btn-outline:hover { border-color: var(--primary); color: var(--primary); }
.btn-primary { background: var(--primary); color: white; }
.btn-primary:hover { opacity: 0.9; }
.mobile-menu { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--dark); }
.hero { padding: 150px 20px; text-align: center; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; }
.hero h1 { font-size: 3rem; margin-bottom: 20px; }
.hero p { font-size: 1.2rem; opacity: 0.9; }
@media (max-width: 768px) { .nav-links, .nav-actions { display: none; } .mobile-menu { display: block; } }`,
    js: `document.querySelector('.mobile-menu')?.addEventListener('click', () => {
  alert('Mobile menu clicked!');
});`
  },
  profile: {
    html: `<div class="profile-container">
  <div class="profile-card">
    <div class="profile-header">
      <div class="profile-cover"></div>
      <div class="profile-avatar">
        <img src="https://i.pravatar.cc/150?img=68" alt="Avatar">
      </div>
    </div>
    <div class="profile-body">
      <h2>John Doe</h2>
      <p class="title">Senior Developer</p>
      <p class="bio">Passionate about building amazing products. Love coding, coffee, and continuous learning.</p>
      <div class="profile-stats">
        <div class="stat"><strong>1.2K</strong><span>Followers</span></div>
        <div class="stat"><strong>348</strong><span>Following</span></div>
        <div class="stat"><strong>56</strong><span>Projects</span></div>
      </div>
      <div class="profile-actions">
        <button class="btn btn-primary">Follow</button>
        <button class="btn btn-secondary">Message</button>
      </div>
      <div class="social-links">
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-github"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
        <a href="#"><i class="fab fa-dribbble"></i></a>
      </div>
    </div>
  </div>
</div>`,
    css: `:root { --primary: #6366f1; --dark: #0f172a; --gray: #64748b; --light: #f8fafc; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--light); padding: 20px; }
.profile-container { width: 100%; max-width: 380px; }
.profile-card { background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
.profile-header { position: relative; }
.profile-cover { height: 120px; background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef); }
.profile-avatar { position: absolute; bottom: -50px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; border-radius: 50%; border: 4px solid white; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.2); }
.profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
.profile-body { padding: 60px 30px 30px; text-align: center; }
.profile-body h2 { font-size: 1.5rem; color: var(--dark); margin-bottom: 5px; }
.profile-body .title { color: var(--primary); font-weight: 500; margin-bottom: 15px; }
.profile-body .bio { color: var(--gray); font-size: 0.9rem; line-height: 1.6; margin-bottom: 25px; }
.profile-stats { display: flex; justify-content: center; gap: 30px; margin-bottom: 25px; padding: 20px 0; border-top: 1px solid var(--light); border-bottom: 1px solid var(--light); }
.stat { text-align: center; }
.stat strong { display: block; font-size: 1.25rem; color: var(--dark); }
.stat span { font-size: 0.8rem; color: var(--gray); }
.profile-actions { display: flex; gap: 12px; margin-bottom: 20px; }
.btn { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; border: none; transition: all 0.3s; }
.btn-primary { background: var(--primary); color: white; }
.btn-secondary { background: var(--light); color: var(--dark); }
.social-links { display: flex; justify-content: center; gap: 15px; }
.social-links a { width: 40px; height: 40px; border-radius: 10px; background: var(--light); display: flex; align-items: center; justify-content: center; color: var(--gray); text-decoration: none; transition: all 0.3s; }
.social-links a:hover { background: var(--primary); color: white; }`,
    js: `document.querySelector('.btn-primary')?.addEventListener('click', function() {
  this.textContent = this.textContent === 'Follow' ? 'Following' : 'Follow';
});`
  },
  ecommerce: {
    html: `<div class="shop-container">
  <h2>Featured Products</h2>
  <div class="products-grid">
    <div class="product-card">
      <div class="product-image">🎧</div>
      <div class="product-info">
        <h3>Wireless Headphones</h3>
        <div class="rating">⭐⭐⭐⭐⭐ (234)</div>
        <div class="price"><span class="current">$149.99</span><span class="old">$199.99</span></div>
        <button>Add to Cart</button>
      </div>
    </div>
    <div class="product-card">
      <div class="product-image">⌚</div>
      <div class="product-info">
        <h3>Smart Watch Pro</h3>
        <div class="rating">⭐⭐⭐⭐⭐ (567)</div>
        <div class="price"><span class="current">$299.99</span></div>
        <button>Add to Cart</button>
      </div>
    </div>
    <div class="product-card">
      <div class="product-image">🎒</div>
      <div class="product-info">
        <h3>Laptop Backpack</h3>
        <div class="rating">⭐⭐⭐⭐ (189)</div>
        <div class="price"><span class="current">$79.99</span><span class="old">$99.99</span></div>
        <button>Add to Cart</button>
      </div>
    </div>
    <div class="product-card">
      <div class="product-image">🔊</div>
      <div class="product-info">
        <h3>Bluetooth Speaker</h3>
        <div class="rating">⭐⭐⭐⭐⭐ (342)</div>
        <div class="price"><span class="current">$89.99</span></div>
        <button>Add to Cart</button>
      </div>
    </div>
  </div>
</div>`,
    css: `:root { --primary: #6366f1; --dark: #0f172a; --gray: #64748b; --light: #f8fafc; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: var(--light); padding: 40px 20px; }
.shop-container { max-width: 1200px; margin: 0 auto; }
.shop-container h2 { font-size: 2rem; color: var(--dark); margin-bottom: 30px; text-align: center; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; }
.product-card { background: white; border-radius: 16px; overflow: hidden; transition: all 0.3s; }
.product-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
.product-image { height: 180px; background: linear-gradient(135deg, #f8fafc, #e2e8f0); display: flex; align-items: center; justify-content: center; font-size: 5rem; }
.product-info { padding: 20px; }
.product-info h3 { font-size: 1rem; color: var(--dark); margin-bottom: 8px; }
.rating { font-size: 0.85rem; color: var(--gray); margin-bottom: 12px; }
.price { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
.price .current { font-size: 1.25rem; font-weight: 700; color: var(--primary); }
.price .old { font-size: 0.9rem; color: var(--gray); text-decoration: line-through; }
.product-card button { width: 100%; padding: 12px; background: var(--dark); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background 0.3s; }
.product-card button:hover { background: var(--primary); }`,
    js: `document.querySelectorAll('.product-card button').forEach(btn => {
  btn.addEventListener('click', function() {
    this.textContent = '✓ Added!';
    this.style.background = '#22c55e';
    setTimeout(() => {
      this.textContent = 'Add to Cart';
      this.style.background = '';
    }, 2000);
  });
});`
  },
  gallery: {
    html: `<div class="gallery-container">
  <h2>Photo Gallery</h2>
  <div class="gallery-grid">
    <div class="gallery-item"><div class="image" style="background: linear-gradient(135deg, #667eea, #764ba2);">🏔️</div></div>
    <div class="gallery-item large"><div class="image" style="background: linear-gradient(135deg, #f093fb, #f5576c);">🌅</div></div>
    <div class="gallery-item"><div class="image" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">🌊</div></div>
    <div class="gallery-item"><div class="image" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">🌲</div></div>
    <div class="gallery-item"><div class="image" style="background: linear-gradient(135deg, #fa709a, #fee140);">🌸</div></div>
    <div class="gallery-item large"><div class="image" style="background: linear-gradient(135deg, #a18cd1, #fbc2eb);">🌌</div></div>
  </div>
</div>`,
    css: `:root { --dark: #0f172a; --light: #f8fafc; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: var(--light); padding: 40px 20px; }
.gallery-container { max-width: 1000px; margin: 0 auto; }
.gallery-container h2 { font-size: 2rem; color: var(--dark); margin-bottom: 30px; text-align: center; }
.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
.gallery-item { border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform 0.3s; }
.gallery-item:hover { transform: scale(1.02); }
.gallery-item.large { grid-column: span 2; }
.gallery-item .image { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 4rem; }
.gallery-item.large .image { height: 250px; }
@media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr 1fr; } .gallery-item.large { grid-column: span 1; } }`,
    js: `document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    item.style.transform = 'scale(1.1)';
    setTimeout(() => item.style.transform = '', 300);
  });
});`
  }
};

// Modify code based on prompt
function modifyCode(prompt: string, code: { html: string; css: string; js: string }) {
  const lower = prompt.toLowerCase();
  let { html, css, js } = { ...code };

  // Dark mode
  if (lower.includes('dark')) {
    css += `
body { background: #0f172a !important; color: #f8fafc !important; }
.navbar, .auth-card, .contact-form, .pricing-card:not(.popular), .product-card, .profile-card, .info-card, .feature-card, .gallery-item { background: #1e293b !important; }
h1, h2, h3, h4, .profile-body h2, .product-info h3, .pricing-card h3, .contact-header h1 { color: #f8fafc !important; }
p, .bio, .rating, .stat span { color: #94a3b8 !important; }
input, select, textarea { background: #0f172a !important; color: #f8fafc !important; border-color: #334155 !important; }
.nav-links a, .logo { color: #f8fafc !important; }
`;
  }

  // Color changes
  const colors: { [key: string]: string } = {
    blue: '#3b82f6', red: '#ef4444', green: '#22c55e',
    purple: '#8b5cf6', orange: '#f97316', pink: '#ec4899'
  };
  for (const [color, hex] of Object.entries(colors)) {
    if (lower.includes(color)) {
      css = css.replace(/#6366f1/g, hex);
      css = css.replace(/--primary:\s*#[a-fA-F0-9]+/g, `--primary: ${hex}`);
      break;
    }
  }

  // Animations
  if (lower.includes('animat')) {
    css += `
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.feature-card, .pricing-card, .product-card, .info-card, .gallery-item { animation: fadeIn 0.5s ease forwards; }
`;
  }

  // Rounded
  if (lower.includes('round')) {
    css += `
.btn, button, input, .feature-card, .pricing-card, .product-card, .auth-card, .contact-form { border-radius: 24px !important; }
`;
  }

  // Shadow
  if (lower.includes('shadow')) {
    css += `
.feature-card, .pricing-card, .product-card, .auth-card, .contact-form, .profile-card { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25) !important; }
`;
  }

  // Gradient
  if (lower.includes('gradient')) {
    css += `
.hero, .profile-cover { background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) !important; }
`;
  }

  // Footer
  if (lower.includes('footer') && !html.includes('<footer')) {
    html += `
<footer style="background:#0f172a;color:#94a3b8;padding:40px 20px;text-align:center;margin-top:50px;">
  <p>&copy; 2024 Your Company. All rights reserved.</p>
</footer>`;
  }

  return { html, css, js };
}

const AICodePlayground = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCode, setCurrentCode] = useState({ html: '', css: '', js: '' });
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [codeTab, setCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (iframeRef.current && currentCode.html) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Inter',sans-serif;}${currentCode.css}</style>
</head>
<body>${currentCode.html}<script>${currentCode.js}<\/script></body>
</html>`);
        doc.close();
      }
    }
  }, [currentCode]);

  const handleTemplateClick = async (template: Template) => {
    setShowTemplates(false);
    const code = codeTemplates[template.id] || codeTemplates.landing;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: `Create a ${template.name}`,
      timestamp: new Date()
    }]);
    
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 1000));
    
    setCurrentCode(code);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `✅ ${template.name} তৈরি হয়েছে! Preview দেখুন।\n\nModify করতে বলুন:\n• "Make it dark mode"\n• "Change color to blue"\n• "Add animation"`,
      timestamp: new Date()
    }]);
    setIsGenerating(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }]);
    
    const prompt = input;
    setInput('');
    setIsGenerating(true);
    setShowTemplates(false);
    
    await new Promise(r => setTimeout(r, 1000));
    
    let newCode = currentCode.html ? modifyCode(prompt, currentCode) : codeTemplates.landing;
    setCurrentCode(newCode);
    
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: currentCode.html ? '✅ Code modify করা হয়েছে!' : '✅ Code তৈরি হয়েছে!',
      timestamp: new Date()
    }]);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    const full = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"><style>${currentCode.css}</style></head><body>${currentCode.html}<script>${currentCode.js}<\/script></body></html>`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const full = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"><style>${currentCode.css}</style></head><body>${currentCode.html}<script>${currentCode.js}<\/script></body></html>`;
    const blob = new Blob([full], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'generated.html';
    a.click();
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4">
      {/* Chat Panel */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">AI Code Playground</h2>
              <p className="text-xs text-gray-500">Prompt দিয়ে code তৈরি করুন</p>
            </div>
          </div>
          <button onClick={() => { setMessages([]); setCurrentCode({ html: '', css: '', js: '' }); setShowTemplates(true); }} className="p-2 text-gray-500 hover:text-red-500 rounded-lg">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {showTemplates && messages.length === 0 && (
            <div className="space-y-4">
              <div className="text-center py-6">
                <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">স্বাগতম! 🎉</h3>
                <p className="text-gray-500 text-sm">Template select করুন অথবা prompt লিখুন</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {templates.map(t => (
                  <button key={t.id} onClick={() => handleTemplateClick(t)} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-left">
                    <t.icon className="w-6 h-6 text-purple-500 mb-2" />
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 ${m.role === 'user' ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                <p className="text-sm whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Generating...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {currentCode.html && (
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex gap-2 overflow-x-auto">
            {['Dark mode', 'Blue', 'Green', 'Animation', 'Rounded', 'Shadow'].map(a => (
              <button key={a} onClick={() => setInput(a)} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-purple-100 whitespace-nowrap">
                {a}
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="যেমন: Make it dark mode..." className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white" />
            <button onClick={handleSend} disabled={!input.trim() || isGenerating} className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('preview')} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${activeTab === 'preview' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'text-gray-500'}`}>
              <Eye className="w-4 h-4 inline mr-1" /> Preview
            </button>
            <button onClick={() => setActiveTab('code')} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${activeTab === 'code' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : 'text-gray-500'}`}>
              <Code className="w-4 h-4 inline mr-1" /> Code
            </button>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === 'preview' && (
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button onClick={() => setPreviewMode('desktop')} className={`p-1.5 rounded ${previewMode === 'desktop' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}>
                  <Monitor className="w-4 h-4" />
                </button>
                <button onClick={() => setPreviewMode('tablet')} className={`p-1.5 rounded ${previewMode === 'tablet' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}>
                  <Tablet className="w-4 h-4" />
                </button>
                <button onClick={() => setPreviewMode('mobile')} className={`p-1.5 rounded ${previewMode === 'mobile' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}>
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
            <button onClick={() => iframeRef.current?.contentDocument?.location.reload()} className="p-2 text-gray-500 hover:text-purple-500 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleCopy} className="p-2 text-gray-500 hover:text-green-500 rounded-lg">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={handleDownload} className="p-2 text-gray-500 hover:text-blue-500 rounded-lg">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900">
          {activeTab === 'preview' ? (
            <div className="h-full flex items-start justify-center p-4 overflow-auto">
              {currentCode.html ? (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ width: getPreviewWidth(), minHeight: '400px' }}>
                  <iframe ref={iframeRef} className="w-full h-full min-h-[500px] border-0" title="Preview" sandbox="allow-scripts" />
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                  <Eye className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="font-medium">No Preview Yet</p>
                  <p className="text-sm">Template select করুন বা prompt দিন</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {(['html', 'css', 'js'] as const).map(tab => (
                  <button key={tab} onClick={() => setCodeTab(tab)} className={`px-4 py-2 text-sm font-medium ${codeTab === tab ? 'bg-white dark:bg-gray-800 text-purple-600 border-b-2 border-purple-500' : 'text-gray-500'}`}>
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-auto">
                <pre className="p-4 text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">
                  {currentCode[codeTab] || '// No code yet'}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICodePlayground;
