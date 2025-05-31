// Form Component
import LoginForm from "@/components/modals/form/loginForm";
import SignupForm from "@/components/modals/form/signupForm";

// style
import "@/styles/components/modals/authModal.scss";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// interface
interface AuthModalType {
  isLoginShow?: boolean;
  isSignupShow?: boolean;
  onCloseClick: () => void;
}

export default function AuthModal({
  isLoginShow = false,
  isSignupShow = false,
  onCloseClick,
}: AuthModalType) {
  // function
  const checkModal = () => {
    if (isLoginShow || isSignupShow) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={`auth-modal-wrap absolute ${checkModal() ? "show" : "hide"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseOutlinedIcon className="close-icon" onClick={onCloseClick} />
      {isLoginShow && <LoginForm onSuccess={onCloseClick} />}
      {isSignupShow && <SignupForm onSuccess={onCloseClick} />}
    </div>
  );
}
