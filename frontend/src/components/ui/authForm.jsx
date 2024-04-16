import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TailSpin } from "react-loader-spinner";
import { MdOutlineLogin } from "react-icons/md";

const AuthForm = ({ cardloadingst, signIn, setSignInfn, onClickLoginfn, onClickRegisterfn, OnChangeLoginEmailfn, OnChangeLoginPasswordfn, OnChangeRegisterEmailfn, OnChangeRegisterPassowrdfn, OnChangeRegisterPasswordReEnterfn, authErrorSt }) => {
    return (<Dialog>
        <DialogTrigger className="text-lg md:text-xl p-2 md:p-3 bg-zinc-300 rounded-xl md:rounded-lg flex justify-center items-center hover:bg-blue-300"><MdOutlineLogin /></DialogTrigger>
        <DialogContent>
            {signIn ?
                (!cardloadingst ? (<>
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                    </DialogHeader>
                    <Input onChange={(e) => { OnChangeLoginEmailfn(e.target.value) }} type="email" placeholder="Email" />
                    <Input onChange={(e) => { OnChangeLoginPasswordfn(e.target.value) }} type="password" placeholder="Password" />
                    {authErrorSt.status ? <p className="text-sm text-red-500"> {authErrorSt.msg}</p> : null}
                    <Button onClick={onClickLoginfn} className="bg-blue-800 hover:bg-blue-500">Signin</Button>
                    <p className="text-center">Don't have an acount? <span onClick={() => { setSignInfn(false) }} className="hover:underline hover:underline-offset-1 cursor-pointer">SignUp</span></p>
                </>) : <div className="w-full flex justify-center items-center p-10"><TailSpin height="40"
                    width="40"
                    color="#46b9da" /></div>) :
                (<>

                    {!cardloadingst ? (<>
                        <DialogHeader>
                            <DialogTitle>Sign Up</DialogTitle>
                        </DialogHeader>
                        <Input onChange={(e) => { OnChangeRegisterEmailfn(e.target.value) }} type="email" placeholder="Email" />
                        <Input onChange={(e) => { OnChangeRegisterPassowrdfn(e.target.value) }} type="password" placeholder="Password" />
                        <Input onChange={(e) => { OnChangeRegisterPasswordReEnterfn(e.target.value) }} type="password" placeholder="Re-EnterPassword" />
                        {authErrorSt.status ? <p className="text-sm text-red-500"> {authErrorSt.msg}</p> : null}
                        <Button onClick={onClickRegisterfn} className="bg-blue-800 hover:bg-blue-500">SignUp</Button>
                        <p className="text-center">Already have an account?{" "} <span onClick={() => { setSignInfn(true) }} className="hover:underline hover:underline-offset-1 cursor-pointer">SignIn</span></p> </>) : <div className="w-full flex justify-center items-center p-10"><TailSpin height="40"
                            width="40"
                            color="#46b9da" /></div>}
                </>)}
        </DialogContent>
    </Dialog>)
}

export default AuthForm