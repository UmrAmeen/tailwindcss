export function isLoggedIn(): boolean {
  return !!localStorage.getItem("token");
}

export function loginUser(token: string) {
  localStorage.setItem("token", token);
}

export function logoutUser() {
  localStorage.removeItem("token");
}
