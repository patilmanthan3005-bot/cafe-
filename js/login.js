/* ============================================================
   CAFE OF HEAVEN — LOGIN PAGE JS
   Includes: tab switching, field validation, account check
   ============================================================ */

// ── TAB SWITCHER ──────────────────────────────────────────
function switchTab(name, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + name).classList.add('active');
  clearAllErrors();
}

// ── HELPERS ───────────────────────────────────────────────
function setError(inputId, errId, message) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (input) input.classList.add('input-error');
  if (err)   err.textContent = message;
}

function clearError(inputId, errId) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (input) input.classList.remove('input-error');
  if (err)   err.textContent = '';
}

function clearAllErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  const box = document.getElementById('login-error-box');
  if (box) box.classList.add('hidden');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  return /^[\d\s\+\-]{7,15}$/.test(phone.trim());
}

// ── GET REGISTERED ACCOUNTS ───────────────────────────────
// Accounts are stored as array in localStorage key 'coh_accounts'
function getAccounts() {
  return JSON.parse(localStorage.getItem('coh_accounts') || '[]');
}

function saveAccounts(accounts) {
  localStorage.setItem('coh_accounts', JSON.stringify(accounts));
}

function findAccount(email) {
  return getAccounts().find(a => a.email.toLowerCase() === email.toLowerCase().trim());
}

// ── HANDLE LOGIN ──────────────────────────────────────────
function handleLogin() {
  clearAllErrors();

  const email    = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  let valid = true;

  // Field checks
  if (!email.trim()) {
    setError('login-email', 'login-email-err', 'Please enter your email address.');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('login-email', 'login-email-err', 'Please enter a valid email address.');
    valid = false;
  }

  if (!password.trim()) {
    setError('login-password', 'login-pass-err', 'Please enter your password.');
    valid = false;
  }

  if (!valid) return;

  // Check if account exists
  const account = findAccount(email);

  if (!account) {
    // Account does NOT exist — show error box with create account prompt
    const box = document.getElementById('login-error-box');
    box.innerHTML = `
      <span class="err-icon">❌</span>
      <span>No account found for <strong>${email.trim()}</strong>. 
      Please <a onclick="switchTab('signup', document.getElementById('tab-signup'))">create an account</a> first.</span>
    `;
    box.classList.remove('hidden');
    setError('login-email', 'login-email-err', '');
    document.getElementById('login-email').classList.add('input-error');
    return;
  }

  // Account exists — check password
  if (account.password !== password) {
    setError('login-password', 'login-pass-err', 'Incorrect password. Please try again.');
    return;
  }

  // Success
  sessionStorage.setItem('coh_logged_in', 'true');
  sessionStorage.setItem('coh_user', JSON.stringify({ name: account.firstName, email: account.email }));
  showToast('✅ Welcome back, ' + account.firstName + '!');
  setTimeout(() => window.location.href = 'menu.html', 1200);
}

// ── HANDLE SIGNUP ─────────────────────────────────────────
function handleSignup() {
  clearAllErrors();

  const firstName = document.getElementById('signup-fname').value;
  const lastName  = document.getElementById('signup-lname').value;
  const email     = document.getElementById('signup-email').value;
  const phone     = document.getElementById('signup-phone').value;
  const password  = document.getElementById('signup-password').value;
  let valid = true;

  if (!firstName.trim()) {
    setError('signup-fname', 'signup-fname-err', 'First name is required.');
    valid = false;
  }

  if (!lastName.trim()) {
    setError('signup-lname', 'signup-lname-err', 'Last name is required.');
    valid = false;
  }

  if (!email.trim()) {
    setError('signup-email', 'signup-email-err', 'Please enter your email address.');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('signup-email', 'signup-email-err', 'Please enter a valid email address.');
    valid = false;
  } else if (findAccount(email)) {
    setError('signup-email', 'signup-email-err', 'This email is already registered. Please sign in.');
    valid = false;
  }

  if (!phone.trim()) {
    setError('signup-phone', 'signup-phone-err', 'Please enter your phone number.');
    valid = false;
  } else if (!isValidPhone(phone)) {
    setError('signup-phone', 'signup-phone-err', 'Please enter a valid phone number.');
    valid = false;
  }

  if (!password.trim()) {
    setError('signup-password', 'signup-pass-err', 'Please create a password.');
    valid = false;
  } else if (password.length < 8) {
    setError('signup-password', 'signup-pass-err', 'Password must be at least 8 characters.');
    valid = false;
  }

  if (!valid) return;

  // Save account
  const accounts = getAccounts();
  accounts.push({
    firstName: firstName.trim(),
    lastName:  lastName.trim(),
    email:     email.trim(),
    phone:     phone.trim(),
    password:  password,
  });
  saveAccounts(accounts);

  // Auto log in
  sessionStorage.setItem('coh_logged_in', 'true');
  sessionStorage.setItem('coh_user', JSON.stringify({ name: firstName.trim(), email: email.trim() }));

  showToast('🎉 Account created! Welcome to Heaven Rewards, ' + firstName.trim() + '!');
  setTimeout(() => window.location.href = 'menu.html', 1400);
}

// ── TOAST (fallback if main.js not loaded yet) ─────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}
