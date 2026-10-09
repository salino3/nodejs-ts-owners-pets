export const utilitiesApp = () => {
  /**
   * Validates whether a given string is a properly formatted email address.
   * @param email - The email string to check.
   * @returns boolean - True if valid, false otherwise.
   */
  function isValidEmail(email: string): boolean {
    if (!email || typeof email !== "string") return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return {
    isValidEmail,
  };
};
