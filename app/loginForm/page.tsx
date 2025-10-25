import LoginForm from "./loginForm";

export default function Login({ onSuccess }:any) {
  // Could not find the module "[project]/node_modules/next/dist/client/app-dir/link.js#default"
  return <LoginForm onSuccess={onSuccess} />;
}
