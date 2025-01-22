import React, { useState } from "react";
import { toast } from "react-toastify";
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
  PhotoIcon,
} from "@heroicons/react/24/outline";
import api from "../../api/api";

function Idea() {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || tags.length === 0 || !content.trim())
      return toast.error("Please fill all fields.");
    // const allData = { title: title, content: content, tags: tags };

    const formData = new FormData();
    formData.append("tags", JSON.stringify(tags));
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    // console.log("form data are: ", formData);
    for (let [key, value] of formData.entries()) {
      console.log(` ${key}: ${value} `);
    }

    await api
      .post("/idea", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Idea added successfully!");
        setTags([]);
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error(error));
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setTags([]);
    setImageName("");
  };

  const handleTag = (tag) => {
    if (tags.includes(tag)) {
      const newTags = tags.filter((item) => item !== tag);
      setTags(newTags);
    } else {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      setImageName(selectedFile.name);
    }
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
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full min-h-[24vh] max-h-[24vh] resize-none overflow-y-auto py-4 px-4 bg-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 outline-none border-2 border-gray-100 focus:border-gray-200 focus:border-2 box-border"
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
            <div className="flex flex-col items-start gap-2 w-full">
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input"
                className="cursor-pointer w-full flex gap-2 justify-center items-center bg-gray-100 text-gray-400 px-4 py-[14px] rounded-md hover:bg-gray-200 hover:text-gray-500 transition-all"
              >
                <PhotoIcon className="size-4" />
                <span className="text-sm">Add image</span>
              </label>
              {imageName ? (
                <p className="text-sm w-full text-gray-600 scrollbar-thin overflow-y-auto scroll">
                  Selected: {imageName}
                </p>
              ) : (
                <p className="text-sm text-gray-400 "></p>
              )}
            </div>
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
                  <PlusCircleIcon className="size-5" />
                  <p className="font-primaryMedium">Add Idea</p>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Idea;

// // {/* Custom File Input */}
// <input
//   id="file-input"
//   type="file"
//   accept="image/*"
//   className="hidden"
//   onChange={handleFileChange}
// />
// <label
//   htmlFor="file-input"
//   className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
// >
//   Choose File
// </label>
// // {/* Display selected file name */}
// {imageName ? (
//   <p className="text-sm text-gray-600 mt-2">
//     Selected: {imageName}
//   </p>
// ) : (
//   <p className="text-sm text-gray-400 mt-2">No file chosen</p>
// )}

{
  /* <div className="w-full flex flex-col gap-4 mt-5">
              <p className="text-gray-400">
                Choose the tags that best describe your idea.
              </p>
              <div className="w-full flex flex-wrap gap-2 text-sm">
                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-sky-50 rounded-2xl">
                  <BanknotesIcon className="size-4 stroke-[1.6px] text-sky-600" />
                  <p className="text-sky-600">Finance</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-orange-50 rounded-2xl">
                  <LightBulbIcon className="size-4 stroke-[1.6px] text-orange-600" />
                  <p className="text-orange-600">Knowledge</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-blue-50 rounded-2xl">
                  <BriefcaseIcon className="size-4 stroke-[1.6px] text-blue-600" />
                  <p className="text-blue-600">Career</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-green-50 rounded-2xl">
                  <HeartIcon className="size-4 stroke-[1.6px] text-green-600" />
                  <p className="text-green-600">Health</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-teal-50 rounded-2xl">
                  <PencilSquareIcon className="size-4 stroke-[1.6px] text-teal-600" />
                  <p className="text-teal-600">Creativity</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-indigo-50 rounded-2xl">
                  <CpuChipIcon className="size-4 stroke-[1.6px] text-indigo-600" />
                  <p className="text-indigo-600">Technology</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-cyan-50 rounded-2xl">
                  <SparklesIcon className="size-4 stroke-[1.6px] text-cyan-600" />
                  <p className="text-cyan-600">Lifestyle</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-purple-50 rounded-2xl">
                  <TagIcon className="size-4 stroke-[1.6px] text-purple-600" />
                  <p className="text-purple-600">Other</p>
                </button>
              </div>
            </div> */
}
{
  /* <div className="w-full flex flex-col gap-4 mt-5">
              <p className="text-gray-400">
                Choose the tags that best describe your idea.
              </p>
              <div className="w-full flex flex-wrap gap-2 text-sm">
                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-sky-50 rounded-sm">
                  <BanknotesIcon className="size-4 stroke-[1.6px] text-sky-600" />
                  <p className="text-sky-600">Finance</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-orange-50 rounded-sm">
                  <LightBulbIcon className="size-4 stroke-[1.6px] text-orange-600" />
                  <p className="text-orange-600">Knowledge</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-blue-50 rounded-sm">
                  <BriefcaseIcon className="size-4 stroke-[1.6px] text-blue-600" />
                  <p className="text-blue-600">Career</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-green-50 rounded-sm">
                  <HeartIcon className="size-4 stroke-[1.6px] text-green-600" />
                  <p className="text-green-600">Health</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-teal-50 rounded-sm">
                  <PencilSquareIcon className="size-4 stroke-[1.6px] text-teal-600" />
                  <p className="text-teal-600">Creativity</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-indigo-50 rounded-sm">
                  <CpuChipIcon className="size-4 stroke-[1.6px] text-indigo-600" />
                  <p className="text-indigo-600">Technology</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-cyan-50 rounded-sm">
                  <SparklesIcon className="size-4 stroke-[1.6px] text-cyan-600" />
                  <p className="text-cyan-600">Lifestyle</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-purple-50 rounded-sm">
                  <TagIcon className="size-4 stroke-[1.6px] text-purple-600" />
                  <p className="text-purple-600">Other</p>
                </button>
              </div>
            </div> */
}
{
  /* <div className="w-full flex flex-col gap-4 mt-5">
              <p className="text-gray-400">
                Choose the tags that best describe your idea.
              </p>
              <div className="w-full flex flex-wrap gap-2 text-sm">
                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <BanknotesIcon className="size-4 stroke-[1.6px] text-sky-600" />
                  <p className="text-gray-500">Finance</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <LightBulbIcon className="size-4 stroke-[1.6px] text-orange-600" />
                  <p className="text-gray-500">Knowledge</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <BriefcaseIcon className="size-4 stroke-[1.6px] text-blue-600" />
                  <p className="text-gray-500">Career</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <HeartIcon className="size-4 stroke-[1.6px] text-green-600" />
                  <p className="text-gray-500">Health</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <PencilSquareIcon className="size-4 stroke-[1.6px] text-teal-600" />
                  <p className="text-gray-500">Creativity</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <CpuChipIcon className="size-4 stroke-[1.6px] text-indigo-600" />
                  <p className="text-gray-500">Technology</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <SparklesIcon className="size-4 stroke-[1.6px] text-cyan-600" />
                  <p className="text-gray-500">Lifestyle</p>
                </button>

                <button className="flex gap-[4.9px] justify-center items-center px-8 py-2 bg-gray-100 rounded-sm">
                  <TagIcon className="size-4 stroke-[1.6px] text-purple-600" />
                  <p className="text-gray-500">Other</p>
                </button>
              </div>
            </div> */
}
