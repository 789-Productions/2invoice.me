export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string) {
  const errorMessages: string[] = [];
  const hasNumberRegex = /[0-9]/;
  const hasUpperCaseRegex = /[A-Z]/;
  const hasLowerCaseRegex = /[a-z]/;
  const hasSpecialCharacterRegex = /[!@#$%^&*]/;
  if (password.length < 8) {
        errorMessages.push("Password must be at least 8 characters long.");
    }
  if (!hasNumberRegex.test(password)) {
    errorMessages.push("Password must contain at least one number.");
  }
  if (!hasUpperCaseRegex.test(password)) {
    errorMessages.push("Password must contain at least one uppercase letter.");
  }
  if (!hasLowerCaseRegex.test(password)) {
    errorMessages.push("Password must contain at least one lowercase letter.");
  }
  if (!hasSpecialCharacterRegex.test(password)) {
    errorMessages.push("Password must contain at least one special character.");
  }
  return errorMessages;
}