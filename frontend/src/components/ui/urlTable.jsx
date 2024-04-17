import { MdOutlineDeleteOutline } from "react-icons/md";
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import url from '../../url'

export default function UrlTable({ details, deleteFn }) {
    const { shortId, Url, Clicks } = details
    return (
        <TableBody>
            <TableRow>
                <TableCell className="font-medium "><a href={`${url}get/${shortId}/`} target="__blank" >{shortId}</a></TableCell>
                <TableCell className="text-center "><a href={`${Url}/`} target="__blank" >{Url}</a></TableCell>
                <TableCell className="text-center ">{Clicks}</TableCell>
                <TableCell onClick={() => { deleteFn(shortId) }} className="text-right text-lg md:text-xl cursor-pointer"> <button className="hover:bg-red-500 p-2  rounded-3xl"><MdOutlineDeleteOutline /></button></TableCell>
            </TableRow>
        </TableBody>
    )
}