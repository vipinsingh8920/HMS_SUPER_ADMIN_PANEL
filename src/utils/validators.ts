/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  return emailRegex.test(email.trim());
};

/**
 * Indian mobile number validation
 */
export const isValidMobile = (phone: string): boolean => {
  const normalizedPhone = phone.replace(/[\s-]/g, "");

  const mobileRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

  return mobileRegex.test(normalizedPhone);
};

/**
 * Email validation with error message
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required.";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  return null;
};

/**
 * Mobile validation with error message
 */
export const validateMobile = (phone: string): string | null => {
  if (!phone.trim()) {
    return "Mobile number is required.";
  }

  if (!isValidMobile(phone)) {
    return "Please enter a valid Indian mobile number.";
  }

  return null;
};