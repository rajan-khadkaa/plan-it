import React from "react";
import { MinusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
function PlanPopup({ plan, onClose }) {
  if (!plan) return null;
  return (
    <div
      onClick={onClose}
      className="flex fixed inset-0 bg-black/40 backdrop-blur-[2px]  justify-center items-center w-full h-full "
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="border-[1.8px] border-gray-200 bg-white flex relative flex-col justify-start p-4 rounded-md min-w-[40%] max-w-[50%]"
      >
        <button
          onClick={onClose}
          className="w-fit p-0 rounded-full text-gray-400 hover:text-red-600 absolute top-3 right-3"
        >
          <XCircleIcon className="size-7" />
        </button>
        <div className="w-full flex gap-4 mr-6">
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 font-primarySemiBold">{plan.title}</p>
            <p className="text-gray-400 max-w-[400px] text-xs">
              {plan.date.split("T")[0]}
            </p>
            <p className="text-gray-500 max-w-[400px] mt-3 text-sm">
              {plan.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanPopup;
