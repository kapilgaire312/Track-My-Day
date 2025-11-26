export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


export function validateSignupInfo(user) {
  if (user.email === '' || user.password === '' || user.cpassword === '') {
    throw new Error('Enter all the details.')
  }
  if (!isValidEmail(user.email)) throw new Error('Enter a valid email address.')
  if (user.password.length < 8) throw new Error('Passwords must be 8 characters long.')
  if (user.cpassword) {
    if (user.password != user.cpassword) throw new Error('Passwords donot match.')
  }
}