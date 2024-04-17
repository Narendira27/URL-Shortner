import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import url from '../../url'

export default function UrlTable({ details, deleteFn, toastFn }) {
    const { shortId, Url, Clicks } = details

    const copyUrl = () => {
        navigator.clipboard.writeText(`${Url}`)
        toastFn({
            title: "Clipboard updated.",
        })
    }

    const copyShortUrl = () => {
        navigator.clipboard.writeText(`${url}get/${shortId}/`)
        toastFn({
            title: "Clipboard updated.",
        })
    }

    return (
        <TableBody>
            <TableRow>
                <TableCell className="font-medium "><a href={`${url}get/${shortId}/`} target="__blank" >{shortId}</a>
                    <button onClick={copyShortUrl} className="ml-2 font-medium"><FaRegCopy /></button></TableCell>
                <TableCell className="text-center "><a href={`${Url}`} target="__blank" >{Url}</a>
                    <button onClick={copyUrl} className="ml-2 font-medium"><FaRegCopy /></button></TableCell>
                <TableCell className="text-center ">{Clicks}</TableCell>
                <TableCell onClick={() => { deleteFn(shortId) }} className="text-right text-lg md:text-xl cursor-pointer"> <button className="hover:bg-red-500 p-2  rounded-3xl"><MdOutlineDeleteOutline /></button></TableCell>
            </TableRow>
        </TableBody>
    )
}