import React, { useState } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import api from "../api/api";

function Plan() {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !message.trim() || !date)
      return toast.error("Please fill all fields.");
    const utcDate = new Date(date).toISOString();
    console.log("changed date to ISO/UTC: ", utcDate);
    const allData = {
      title: title,
      message: message,
      date: utcDate,
      lock: checked,
    };
    await api
      .post("/plan", allData)
      .then((res) => {
        console.log(res.data);
        toast.success("Plan added successfully!");
        setDate("");
        setTitle("");
        setMessage("");
        setChecked(false);
      })
      .catch((error) => console.error(error));

    // console.log(allData);
    // toast.success("Wow so easy!");
  };

  const handleReset = () => {
    setTitle("");
    setMessage("");
    setDate("");
    setChecked(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[70%]">
        {/* <>{console.log("tags are: ", tags)}</> */}
        {/* <h3>heading</h3> */}
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-start gap-2 text-sm"
          >
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full min-h-[24vh] max-h-[24vh] resize-none overflow-y-auto py-4 px-4 bg-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 outline-none border-2 border-gray-100 focus:border-gray-200 focus:border-2 box-border"
              placeholder="Tell your plan to your future self."
            ></textarea>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-400 outline-none border-2 border-gray-100 focus:border-2 focus:border-gray-200"
              type="text"
              placeholder="Title"
            />
            <input
              value={date}
              onChange={(event) => {
                console.log("date selected is: ", event.target.value);
                setDate(event.target.value);
              }}
              className={`${date ? "text-gray-800" : "text-gray-400"} ${
                checked ? "bg-gray-200 text-gray-800 opacity-60" : ""
              } w-full py-3 px-4 bg-gray-100 rounded-lg  placeholder-gray-400 outline-none border-2 border-gray-100 focus:border-2 focus:border-gray-200`}
              type="date"
              disabled={checked}
              placeholder="Date"
            />
            <div className="w-full flex items-center gap-2 min-h-9 ml-2">
              <input
                className={`w-4 h-4`}
                type="checkbox"
                value={checked}
                onChange={() => setChecked(!checked)}
                disabled={!date}
              />
              <div className="w-full flex items-center gap-10">
                <p
                  className={`${
                    !date ? "text-[#ababab]" : ""
                  } text-gray-600 font-primaryMedium`}
                >
                  Lock till the day.
                </p>
                <p
                  className={`${
                    checked
                      ? "visible bg-blue-100 py-1 px-4 text-secondaryBrandColor rounded-md"
                      : "hidden"
                  } text-gray-600 text-sm`}
                >
                  If you lock it. you can't see it or edit it till that date.
                </p>
              </div>
            </div>
            {console.log("checkbox is: ", checked)}
            {/* <div className="w-full flex flex-col gap-4 mt-4 border-2"> */}
            <div className="w-full mt-6 box-border flex gap-3 justify-start items-center">
              <button
                className="flex justify-center items-center gap-2 bg-primaryBrandOptColor text-white py-[10px] px-4 w-full rounded-lg"
                type="submit"
              >
                <PlusCircleIcon className="size-5" />
                <p className="font-primaryMedium">Add Plan</p>
              </button>
              <button
                onClick={handleReset}
                className="flex justify-center items-center gap-2  bg-gray-300 text-primaryBrandOptColor py-[10px] px-4 w-full rounded-lg"
                type="reset"
              >
                {/* <PlusCircleIcon className="size-5" /> */}
                <p className="font-primaryMedium text-gray-600">Reset</p>
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Plan;
