// User types
export const USER_TYPES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin'
};

// Local storage keys
const STORAGE_KEYS = {
  USERS: 'healthcare_users',
  CURRENT_USER: 'healthcare_current_user'
};

// Initialize default admin if no users exist
const initializeDefaultAdmin = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  if (users.length === 0) {
    const defaultAdmin = {
      id: 'admin1',
      email: 'admin@healthcare.com',
      password: 'admin123', // In a real app, this would be hashed
      name: 'Admin User',
      type: USER_TYPES.ADMIN,
      createdAt: new Date().toISOString()
    };
    users.push(defaultAdmin);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

// Initialize default doctor if no doctor exists
const initializeDefaultDoctor = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  if (!users.some(user => user.type === USER_TYPES.DOCTOR)) {
    const defaultDoctor = {
      id: 'doctor1',
      email: 'doctor@healthcare.com',
      password: 'doctor123', // In a real app, this would be hashed
      name: 'John Smith',
      type: USER_TYPES.DOCTOR,
      specialty: 'General Physician',
      experience: '10',
      createdAt: new Date().toISOString()
    };
    users.push(defaultDoctor);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

// Initialize default accounts on first load
initializeDefaultAdmin();
initializeDefaultDoctor();

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
};

// Get current user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
};

// Sign up a new user
export const signUp = (userData) => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email already exists');
  }

  const newUser = {
    id: `${userData.type}${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return newUser;
};

// Sign in a user
export const signIn = (email, password, role) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password && u.type === role);

  if (!user) {
    if (users.find(u => u.email === email && u.password === password)) {
      throw new Error('Invalid role selected for this account');
    }
    throw new Error('Invalid email or password');
  }

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return user;
};

// Sign out current user
export const signOut = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.type === USER_TYPES.ADMIN;
};

// Check if user is doctor
export const isDoctor = () => {
  const user = getCurrentUser();
  return user?.type === USER_TYPES.DOCTOR;
};

// Check if user is patient
export const isPatient = () => {
  const user = getCurrentUser();
  return user?.type === USER_TYPES.PATIENT;
}; 