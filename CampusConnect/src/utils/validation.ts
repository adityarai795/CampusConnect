// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain an uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain a number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain a special character");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

export const validateFileSize = (
  size: number,
  maxSizeMB: number = 10,
): boolean => {
  return size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (
  mimeType: string,
  allowedTypes: string[],
): boolean => {
  return allowedTypes.some(
    (type) =>
      type === "*" ||
      mimeType === type ||
      mimeType.startsWith(type.replace("*", "")),
  );
};

// Form validation helper
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  custom?: (value: any) => boolean | string;
};

export const validateField = (
  value: any,
  rules: ValidationRule,
): { valid: boolean; error: string } => {
  if (rules.required && !value) {
    return { valid: false, error: "This field is required" };
  }

  if (rules.email && !validateEmail(value)) {
    return { valid: false, error: "Invalid email format" };
  }

  if (rules.minLength && value.length < rules.minLength) {
    return {
      valid: false,
      error: `Minimum ${rules.minLength} characters required`,
    };
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return {
      valid: false,
      error: `Maximum ${rules.maxLength} characters allowed`,
    };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return { valid: false, error: "Invalid format" };
  }

  if (rules.custom) {
    const result = rules.custom(value);
    if (typeof result === "string") {
      return { valid: false, error: result };
    }
    if (!result) {
      return { valid: false, error: "Validation failed" };
    }
  }

  return { valid: true, error: "" };
};
