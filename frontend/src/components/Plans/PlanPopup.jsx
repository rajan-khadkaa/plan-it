import React from "react";
import { MinusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
function PlanPopup({ plan, onClose }) {
  if (!plan) return null;
  return (
    <div
      onClick={onClose}
      className="flex absolute inset-0 w-full bg-black/40 backdrop-blur-[2px]  justify-center items-center"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="border-[1.8px] border-gray-200 bg-white flex relative flex-col justify-start p-4 rounded-md w-[80%] md:w-[60%] lg:w-[45%]"
      >
        <button
          onClick={onClose}
          className="w-fit p-0 rounded-full text-gray-400 hover:text-red-600 absolute top-3 right-3"
        >
          <XCircleIcon className="size-7" />
        </button>
        <div className="w-full flex gap-4 mr-6">
          <div className="flex w-full flex-col gap-1">
            <p className="text-gray-600 font-primarySemiBold">{plan.title}</p>
            <p className="text-gray-400 max-w-[400px] text-xs">
              {plan.date.split("T")[0]}
            </p>
            <div className="w-full mt-3 max-h-[24vh] min-h-fit md:max-h-[18vh] overflow-y-auto">
              <p className="text-gray-500 text-sm">{plan.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanPopup;
