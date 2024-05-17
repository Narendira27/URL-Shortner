import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col mt-10 items-center">
            <h1 className="text-3xl text-slate-400 hover:text-slate-950 font-bold">Not Found</h1>
            <Link className="text-xl mt-10 text-blue-400 " to="/" > Go to Home</Link>
        </div>
    )
}

export default NotFound