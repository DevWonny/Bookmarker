// Form Component
import LoginForm from "@/components/modals/form/loginForm";
import SignupForm from "@/components/modals/form/signupForm";

// style
import "@/styles/components/modals/authModal.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function AuthModal() {
  return (
    <div className="auth-modal-wrap absolute">
      <CloseOutlinedIcon className="close-icon" />
      <LoginForm />
      <SignupForm />
    </div>
  );
}
