import React, { ReactElement } from "react";
import GoogleIcon from "@mui/icons-material/Google";

type Input = {
  type: "text" | "number" | "email" | "password";
  placeholder: string;
  icon: ReactElement;
  value: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({
  type,
  placeholder,
  icon,
  value,
  setInput,
}: Input) {
  return (
    <div className="w-full my-3 flex items-center gap-2 border rounded-md p-2">
      <p className="text-gray-400">{icon}</p>
      <input
        className="outline-none text-gray-600"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
