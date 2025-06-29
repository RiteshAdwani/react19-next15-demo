"use client";

import { useFormStatus } from "react-dom";
import { MESSAGES } from "@/constants/messages.constant";

/**
 * @description Submit button component for forms, showing a loading spinner when pending.
 */
const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center space-x-2 disabled:from-blue-300 disabled:to-indigo-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
    >
      {pending ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>{MESSAGES.STATUS.SAVING}</span>
        </>
      ) : (
        <>
          <span>💾</span>
          <span>{MESSAGES.UI.SAVE_RECIPE}</span>
        </>
      )}
    </button>
  );
};

export default SubmitButton;
