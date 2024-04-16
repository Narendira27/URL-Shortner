import UrlTable from './urlTable.jsx'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LinkTable({ loginStatus, tableData, DeleteLinkfn }) {

    return loginStatus ?
        (
            <>
                <Table>
                    <TableCaption>List of your shortend URLs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Short URL</TableHead>
                            <TableHead className="text-center" >URL</TableHead>
                            <TableHead className="text-center">Clicks</TableHead>
                            <TableHead className="text-right" >Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    {
                        tableData.error === false ? (tableData.data.map((each) => <UrlTable key={each._id} details={{ shortId: each.short, Url: each.url, Clicks: each.clicks }} deleteFn={(id) => DeleteLinkfn(id)} />)) : null
                    }
                </Table>
            </>
        ) : (
            <div className="flex flex-col items-center mt-10">
                <h1 className="text-lg md:text-xl mb-2 md:mb-4 text-center ">Please Login to Save Shortend Url and View Clicks</h1>
            </div>)
}

