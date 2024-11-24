import { url } from "@/url";
import { useState } from "react";

const GetUrl = () => {
  const [shortCode, setShortCode] = useState("");
  const onClickGetUrl = () => {
    const getUrl = `${url}get/${shortCode}/`;
    window.open(getUrl, "_blank");
  };
  return (
    <div className="bg-zinc-100 min-h-screen min-w-screen flex flex-col items-center justify-center">
      <div className="bg-white border shadow-md rounded-lg p-5">
        <h1 className="text-3xl font-bold mb-0.5 text-center">URL Shortener</h1>
        <p className="text-sm mb-4 text-center">Short Url Code</p>
        <input
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          className="border mb-2 w-full px-2 py-1 text-slate-600 text-lg rounded-md"
        ></input>
        <button
          onClick={onClickGetUrl}
          className=" p-1.5 mt-2 rounded-md text-sm  bg-blue-400"
        >
          Go to URL
        </button>
      </div>
    </div>
  );
};

export default GetUrl;
