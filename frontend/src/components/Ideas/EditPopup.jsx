import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  BanknotesIcon,
  LightBulbIcon,
  BriefcaseIcon,
  PencilSquareIcon,
  CpuChipIcon,
  SparklesIcon,
  TagIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import api from "../../api/api.js";
import { toast } from "react-toastify";

function EditPopup({ idea, onClose }) {
  const navigate = useNavigate();
  if (!idea) return null;

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [image, setImage] = useState(null);
  // const [imageName, setImageName] = useState("");

  useEffect(() => {
    setTitle(idea.title);
    setContent(idea.content);
    setTags(idea.tags);
  }, []);

  // setImageName("");

  //   setTags(idea.tags);
  //   setTitle(idea.title);
  //   setContent(idea.content);
  //   if (idea.image) setImage(idea.image);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateData = { title, content, tags };
    // console.log("idea being sent to backend: ", updateData);
    await api
      .put(`/idea/${idea._id}`, updateData)
      .then(() => {
        toast.success("Idea updated!");
      })
      .then(() =>
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      )
      .catch((error) => {
        console.log(error);
        toast.error("SOmething went wrong. Try again.");
      });
  };
  //   const handleReset = (event) => {
  //     event.preventDefault();
  //   };

  const handleTag = (tag) => {
    if (tags.includes(tag)) {
      const newTags = tags.filter((item) => item !== tag);
      setTags(newTags);
    } else {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  // for later use if edit image feature is needed
  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     setImage(selectedFile);
  //     setImageName(selectedFile.name);
  //   }
  // };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div
      //   onClick={onClose}
      className="flex justify-center items-center w-full h-full "
    >
      <div
        // onClick={(event) => event.stopPropagation()}
        className="border-[1.8px] border-gray-200 flex flex-col justify-start h-[94%] px-6 py-4 rounded-2xl w-[65%]"
      >
        <h3 className="text-sm text-left font-primaryMedium text-gray-500 ml-1 mb-3">
          Edit your ideas.
        </h3>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-start gap-2 text-sm"
          >
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full min-h-[20vh] max-h-[24vh] resize-none overflow-y-auto py-4 px-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-400 outline-none border-2 border-gray-100 focus:border-gray-200 focus:border-2 box-border"
              placeholder="What do you have in mind?"
            ></textarea>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full py-3 px-4 bg-gray-100 rounded-lg text-gray-800 placeholder-gray-400 outline-none border-2 border-gray-100 focus:border-2 focus:border-gray-200"
              type="text"
              placeholder="Title"
            />
            {/* <input
              accept="image/*"
              className="outline-none text-sm"
              type="file"
              // accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            /> */}
            {/* <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-full flex gap-2">
              <label
                htmlFor="file-input"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
              >
                Choose File
              </label>
              {imageName || image ? (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {imageName}
                </p>
              ) : (
                <p className="text-sm text-gray-400 mt-2">No file chosen</p>
              )}
            </div> */}
            <div className="w-full flex flex-col gap-4 mt-4">
              <p className="text-gray-400">
                Choose the tags that best describe your idea.
              </p>
              <div className="w-full flex flex-wrap gap-2 text-sm">
                {/* Finance Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Finance")}
                  className={`${
                    tags.includes("Finance") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <BanknotesIcon className="size-4 stroke-[1.6px] text-sky-600" />
                  <p className="text-gray-500">Finance</p>
                </button>

                {/* Knowledge Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Knowledge")}
                  className={`${
                    tags.includes("Knowledge") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <LightBulbIcon className="size-4 stroke-[1.6px] text-orange-600" />
                  <p className="text-gray-500">Knowledge</p>
                </button>

                {/* Career Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Career")}
                  className={`${
                    tags.includes("Career") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <BriefcaseIcon className="size-4 stroke-[1.6px] text-blue-600" />
                  <p className="text-gray-500">Career</p>
                </button>

                {/* Health Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Health")}
                  className={`${
                    tags.includes("Health") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <HeartIcon className="size-4 stroke-[1.6px] text-green-600" />
                  <p className="text-gray-500">Health</p>
                </button>

                {/* Creativity Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Creativity")}
                  className={`${
                    tags.includes("Creativity") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <PencilSquareIcon className="size-4 stroke-[1.6px] text-teal-600" />
                  <p className="text-gray-500">Creativity</p>
                </button>

                {/* Technology Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Technology")}
                  className={`${
                    tags.includes("Technology") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <CpuChipIcon className="size-4 stroke-[1.6px] text-indigo-600" />
                  <p className="text-gray-500">Technology</p>
                </button>

                {/* Lifestyle Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Lifestyle")}
                  className={`${
                    tags.includes("Lifestyle") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <SparklesIcon className="size-4 stroke-[1.6px] text-cyan-600" />
                  <p className="text-gray-500">Lifestyle</p>
                </button>

                {/* Other Button */}
                <button
                  type="button"
                  onClick={() => handleTag("Other")}
                  className={`${
                    tags.includes("Other") ? "bg-blue-100" : "bg-gray-100"
                  } flex gap-[4.9px] justify-center items-center px-8 py-2 rounded-2xl`}
                >
                  <TagIcon className="size-4 stroke-[1.6px] text-purple-600" />
                  <p className="text-gray-500">Other</p>
                </button>
              </div>
              <div className="w-full mt-6 box-border flex gap-3 justify-start items-center">
                <button
                  className="flex justify-center items-center gap-2 bg-primaryBrandOptColor text-white py-[10px] px-4 w-full rounded-lg"
                  type="submit"
                >
                  {/* <BookmarkIcon className="size-5" /> */}
                  <CheckCircleIcon className="size-5" />
                  <p className="font-primaryMedium">Save Idea</p>
                </button>
                <button
                  //   onClick={handleReset}
                  onClick={onClose}
                  className="flex justify-center items-center gap-2  bg-gray-300 text-primaryBrandOptColor py-[10px] px-4 w-full rounded-lg"
                  type="reset"
                >
                  {/* <PlusCircleIcon className="size-5" /> */}
                  <p className="font-primaryMedium text-gray-600">Cancel</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
