import { User } from "../../../../entities/user/model/User";

export interface AuthButtonsUIProps {
  user: User | null;
}

export interface AuthButtonsProps extends AuthButtonsUIProps {
  onLogout: () => void;
  onShowLogin: () => void;
  onShowSignup: () => void;
}