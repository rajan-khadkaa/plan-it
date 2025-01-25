import { MinusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

function ViewPopup({ idea, onClose }) {
  if (!idea) return null;
  // console.log("ideas info are: ", idea);

  return (
    <div
      onClick={onClose}
      className="flex inset-0 fixed bg-black/40 backdrop-blur-[2px] justify-center items-center w-full h-full"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="border-[1.8px] border-gray-200 bg-white flex relative flex-col justify-start p-4 rounded-md min-w-[40%] max-w-[60%]"
      >
        <button
          onClick={onClose}
          className="w-fit p-0 rounded-full text-gray-400 hover:text-red-600 absolute top-3 right-3"
        >
          <XCircleIcon className="size-7" />
        </button>
        <div className="w-full flex gap-4 mr-6">
          {idea.image && (
            <div className="w-[200px] h-[200px]">
              <img
                className="w-full h-full object-cover"
                src={idea.image}
                alt="image"
              />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <p className="text-gray-600 font-primarySemiBold">{idea.title}</p>
            {idea.tags && idea.tags.length > 0 ? (
              <ul className="flex gap-1 justify-start items-center">
                {idea.tags.map((item) => (
                  <li
                    className="py-[6px] px-3 rounded-md bg-blue-100 text-gray-600 font-primaryMedium text-xs"
                    key={item}
                  >
                    {/* <p className="text-gray-600">{item}</p> */}
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400 text-sm flex justify-start items-center gap-1">
                <MinusCircleIcon className="size-4" />
                No tags
              </div>
            )}

            <p className="text-gray-500 max-w-[400px] mt-2 text-sm">
              {idea.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPopup;
