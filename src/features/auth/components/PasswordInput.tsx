import EyeClosedIcon from "@/assets/icons/EyeClosedIcon.svg";
import EyeOpenIcon from "@/assets/icons/EyeOpenIcon.svg";

import Input from "@/components/ui/Input";

type PasswordInputProps = React.ComponentProps<typeof Input> & {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PasswordInput({
  showPassword,
  setShowPassword,
  ...props
}: PasswordInputProps) {
  return (
    <div className="relative flex items-center">
      <Input
        className="w-full"
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3"
      >
        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </button>
    </div>
  );
}
