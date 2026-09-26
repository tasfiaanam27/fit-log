"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const showToast = (newMessage: string) => {
    setMessage(newMessage);
    setVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {visible && (
        <div
          role="status"
          className="fixed top-24 right-6 z-[9999] flex max-w-[calc(100vw-3rem)] items-center gap-3 rounded-xl border border-[#343a45] bg-[#15181e] px-5 py-4 shadow-2xl"
        >

          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C2F800] text-black">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>

          <span className="font-inter text-[13px] font-medium text-white">
            {message}
          </span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider"
    );
  }

  return context;
};