import { TailSpin } from "react-loader-spinner";
const loader = () => {
    return (
        <div className="w-full flex justify-center items-center "><TailSpin height={"25"} color="#46b9da" />
        </div>)
}

export default function ShortnerCard({ onChangeUrlFn, onClickButtonFn, textStatus }) {
    const buttonText = !textStatus ? "Shorten URL" : loader()
    return (
        <div className="flex flex-col items-center bg-white p-2 mb-8 m-2 lg:m-5 md:pt-5 md:pl-10 md:pr-10 md:pb-5 rounded-lg shadow-2xl w-fit ">
            <h1 className="text-neutral-500 text-lg md:text-3xl font-semibold mt-5 mb-8">Paste the URL to be shortned</h1>
            <div className="flex mb-8 ">
                <input onChange={(e) => { onChangeUrlFn(e.target.value) }} className=" md:p-2 p-1 border-y border-l text-sm md:text-xl outline-none border-solid rounded-sm border-gray-300 " type="search" />
                <button onClick={() => { onClickButtonFn() }} className=" bg-blue-400 p-1  md:p-2 text-xs md:text-lg rounded-sm outline-none">{buttonText}</button>
            </div>
            <p className="font-light font-sm md:font-lg text-center mb-5">Url Shortner is a tool to shorten URLs, making it easy to share </p>
        </div>
    )
}