import VerifyEmail from "@/functions/apiRequest/verfiyEmail";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster";

const Verify = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("Code")
    const [pageLoading, setPageLoading] = useState(false)
    const [errMsg, setErrMsg] = useState({ errStatus: false, errDetails: '' })
    const { toast } = useToast()

    useEffect(() => {
        if (token === null) {
            console.log(token)
            navigate('/')
        }
        setPageLoading(true)
        VerifyEmail(token)
            .then((res) => {
                setPageLoading(false)
                if (res.status === "OK") {
                    toast({
                        title: "Success",
                        description: "Redirecting to home"
                    })
                    return navigate("/")
                }
                setErrMsg((prev) => ({ ...prev, errStatus: true, errDetails: "Something went wrong" }))

            })
    }, [navigate, token])

    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                {pageLoading ? (<div className="w-full flex justify-center items-center p-10"><TailSpin height="40" width="40" color="#46b9da" /></div>)
                    : null
                }
                {errMsg.errStatus ? <p className="text-2xl">{errMsg.errDetails}</p> : null}
            </div>
            <Toaster />
        </>
    )
}

export default Verify