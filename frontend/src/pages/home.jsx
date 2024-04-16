import { useCallback, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

import { Toaster } from "@/components/ui/toaster";
import Title from "../components/ui/title.jsx";
import PopupCard from "@/components/ui/popupCard.jsx";
import ShortnerCard from "@/components/ui/shortnerCard.jsx";
import AuthButton from "@/components/ui/authButton.jsx";
import LinkTable from "@/components/ui/linkTable.jsx";

import { LoginHandler, ShortUrl, ShortUrlUser, AuthCheck, RefreshData, RefreshDataUser, GetUrlList, DeleteUrl, RegisterHandler } from '../functions/apiRequest/'


const Home = () => {
    // state
    const [loginStatus, setLoginStatus] = useState(false)
    const [signIn, setSignIn] = useState(true)
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [registerData, setRegisterData] = useState({ email: "", password: "", passwordConfirmation: "" })
    const [authError, setAuthError] = useState({ status: false, msg: "" })
    const [cardloading, setCardLoading] = useState(false)
    const [url, setUrl] = useState("")
    const [showCard, setShowCard] = useState(false)
    const [shortUrlData, setShortUrlData] = useState("")
    const [tableData, setTableData] = useState("")

    // toast hook
    const { toast } = useToast()

    const fetchTableData = useCallback(async () => {
        const fetchData = await GetUrlList()
        if (fetchData.status === "OK") {
            setTableData({ error: false, data: fetchData.data.urls })
        } else {
            setTableData({ error: true })
            toast({
                title: "Error",
                description: fetchData.msg
            })
        }
        toast({
            title: "Success",
            description: fetchData.msg
        })
    }, [toast])

    useEffect(() => {
        AuthCheck()
            .then((response) => {
                if (response.status === "OK") {
                    fetchTableData()
                    setLoginStatus(true)
                }
                if (response.status === "FAILURE") {
                    setLoginStatus(false)
                }
            })
    }, [setLoginStatus, fetchTableData])

    // click event
    const onClickLogin = async () => {
        setCardLoading(true)
        const Response = await LoginHandler(loginData)
        if (Response.status === "OK") {
            setAuthError((prev) => ({ ...prev, status: false, msg: "" }))
            Cookies.set('jwt', Response.jwt)
            const fetchData = await GetUrlList()
            if (fetchData.status === "OK") {
                setTableData({ error: false, data: fetchData.data.urls })
            } else {
                setTableData({ error: true })
                toast({
                    title: "Error",
                    description: fetchData.msg
                })
            }
            toast({
                title: "Success",
                description: Response.msg
            })
            setCardLoading(false)
            setLoginStatus(true)
        }
        else {
            setCardLoading(false)
            setAuthError((prev) => ({ ...prev, status: true, msg: Response.msg }))
        }
    }
    const onClickRegister = async () => {
        setCardLoading(true)
        const Response = await RegisterHandler(registerData)
        if (Response.status === "OK") {
            setAuthError((prev) => ({ ...prev, status: false, msg: "" }))
            Cookies.set('jwt', Response.jwt)
            setCardLoading(false)
            setLoginStatus(true)
        }
        else {
            setCardLoading(false)
            setAuthError((prev) => ({ ...prev, status: true, msg: Response.msg }))
        }
    }
    const onLogout = () => {
        setLoginStatus(false)
        Cookies.remove('jwt')
    }
    const onClickShortenUrl = async () => {
        if (loginStatus) {
            const Response = await ShortUrlUser(url)
            if (Response.status === "OK") {
                setShortUrlData(Response.data)
                setShowCard(true)
            }
            else {
                toast({
                    title: "Error",
                    description: Response.msg
                })
            }
            fetchTableData()
            toast({
                title: "Success",
                description: Response.msg
            })
        } else {
            const Response = await ShortUrl(url)
            if (Response.status === "OK") {
                setShortUrlData(Response.data)
                setShowCard(true)
            }
            else {
                toast({
                    title: "Error",
                    description: Response.msg
                })
            }
        }

    }
    const refreshClicks = async () => {
        if (loginStatus) {
            const Response = await RefreshDataUser(shortUrlData.shortUrl)
            console.log(Response)
            if (Response.status === "OK") {
                setShortUrlData((prev) => ({ ...prev, ...Response.data.Response }))
                fetchTableData()
            } else {
                toast({
                    title: "Error",
                    description: Response.msg
                })
            }
        } else {
            const Response = await RefreshData(shortUrlData.shortUrl)
            if (Response.status === "OK") {
                setShortUrlData((prev) => ({ ...prev, ...Response.data }))
            } else {
                toast({
                    title: "Error",
                    description: Response.msg
                })
            }
        }
    }
    const DeleteLink = async (id) => {
        const Response = await DeleteUrl(id)
        if (Response.status === "OK") {
            fetchTableData()
        } else {
            toast({
                title: "Error",
                description: Response.msg
            })
        }
    }
    // link event
    const OnChangeUrl = (value) => {
        setUrl(value)
    }
    // form events 
    const OnChangeLoginEmail = (value) => {
        setLoginData((prev) => ({ ...prev, email: value }))
    }
    const OnChangeLoginPassword = (value) => {
        setLoginData((prev) => ({ ...prev, password: value }))
    }
    const OnChangeRegisterEmail = (value) => {
        setRegisterData((prev) => ({ ...prev, email: value }))
    }
    const OnChangeRegisterPassowrd = (value) => {
        setRegisterData((prev) => ({ ...prev, password: value }))
    }
    const OnChangeRegisterPasswordReEnter = (value) => {
        setRegisterData((prev) => ({ ...prev, passwordConfirmation: value }))
    }

    return (
        <>
            <div className="flex flex-col items-center  bg-zinc-100 min-h-screen min-w-screen">

                <Title text={"Short URL"} />

                <AuthButton state={{ loginStatus, cardloading, signIn, authError }} fns={{
                    setSignIn, onLogout, onClickLogin, onClickRegister, OnChangeLoginEmail, OnChangeRegisterEmail,
                    OnChangeRegisterPasswordReEnter, OnChangeLoginPassword, OnChangeRegisterPassowrd
                }} />

                <ShortnerCard onClickButtonFn={onClickShortenUrl} onChangeUrlFn={OnChangeUrl} />

                <PopupCard refreshClicksfn={refreshClicks} showCard={showCard} setShowCardfn={setShowCard} shortUrlData={shortUrlData} />

                <LinkTable loginStatus={loginStatus} tableData={tableData} DeleteLinkfn={DeleteLink} />

            </div >

            <Toaster />
        </>
    )
}

export default Home