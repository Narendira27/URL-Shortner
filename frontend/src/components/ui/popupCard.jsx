import { IoCloseSharp } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import url from '../../url'

export default function PopupCard({ showCard, setShowCardfn, refreshClicksfn, shortUrlData }) {
    return showCard ? (
        <div className="absolute z-10 w-full h-full flex flex-col justify-center items-center " >
            <div className="bg-white w-fit  lg:w-1/5 flex flex-col shadow-xl p-5 rounded-xl" >
                <div className="w-full flex justify-end items-end">
                    <div onClick={() => { setShowCardfn(false) }} className="cursor-pointer hover:bg-stone-300 rounded-xl p-1">
                        <IoCloseSharp />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center m-1 lg:m-2">
                        <h1 className=" text-md lg:text-xl">Url:</h1>
                        <a href={shortUrlData.url} target="__blank" className="text-md lg:text-xl ml-2">{shortUrlData.url}</a>
                    </div>
                    <div className="flex items-center m-1 lg:m-2">
                        <h1 className="text-md lg:text-xl">Short Url:</h1>
                        <a href={`${url}get/${shortUrlData.shortUrl}/`} target="__blank" className="text-md lg:text-xl ml-2">{shortUrlData.shortUrl}</a>
                        <div onClick={() => navigator.clipboard.writeText(`${url}get/${shortUrlData.shortUrl}/`)} className="cursor-pointer p-2 rounded-2xl hover:bg-slate-200 ml-2" >
                            <FaRegCopy />
                        </div>
                    </div>
                    <div className="flex items-center m-1 lg:m-2">
                        <h1 className="text-md lg:text-xl">Clicks:</h1>
                        <h1 className="text-md lg:text-xl ml-2">{shortUrlData.clicks}</h1>
                        <div onClick={() => { refreshClicksfn() }} className="text-md lg:text-xl ml-2 cursor-pointer hover:bg-slate-200 p-2 rounded-2xl">
                            <FiRefreshCw />
                        </div>
                    </div>
                </div>
            </div>
        </div>) : null
}