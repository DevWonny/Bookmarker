// Form Component
import LoginForm from "@/components/modals/form/loginForm";
import SignupForm from "@/components/modals/form/signupForm";

export default function AuthModal() {
  return (
    <div className="auth-modal-wrap">
      {/* <p>Auth Modal</p> */}
      <LoginForm />
      <SignupForm />
    </div>
  );
}
