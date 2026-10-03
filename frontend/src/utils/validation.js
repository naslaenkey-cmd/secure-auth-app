 export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
};

export const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }

  if (username.length > 20) {
    return "Username must be less than 20 characters";
  }

  return "";
};

export const validateEmailMessage = (email) => {
  if (!email) {
    return "Email is required";
  }

  if (!validateEmail(email)) {
    return "Enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateFullName = (fullName) => {
  if (!fullName) {
    return "Full name is required";
  }

  if (fullName.length < 2) {
    return "Full name must be at least 2 characters";
  }

  return "";
};