import AuthForm from "@/components/ui/authForm"
import { MdOutlineLogout } from "react-icons/md";

export default function AuthButton({ state, fns }) {
    const { loginStatus, cardloading, signIn, authError } = state
    const { setSignIn, onLogout, onClickLogin, onClickRegister, OnChangeLoginEmail, OnChangeRegisterEmail,
        OnChangeRegisterPasswordReEnter, OnChangeLoginPassword, OnChangeRegisterPassowrd, resendMailfn } = fns

    return (
        <div className="flex mb-5 w-full justify-end mr-4 md:mr-5">
            {
                !loginStatus ?
                    <AuthForm cardloadingst={cardloading} signIn={signIn}
                        setSignInfn={setSignIn} onClickLoginfn={onClickLogin}
                        onClickRegisterfn={onClickRegister} OnChangeLoginEmailfn={OnChangeLoginEmail}
                        OnChangeLoginPasswordfn={OnChangeLoginPassword} OnChangeRegisterEmailfn={OnChangeRegisterEmail}
                        OnChangeRegisterPassowrdfn={OnChangeRegisterPassowrd}
                        OnChangeRegisterPasswordReEnterfn={OnChangeRegisterPasswordReEnter} authErrorSt={authError} resendMailfn={resendMailfn}
                    />
                    : <button onClick={onLogout} className="text-lg md:text-xl p-2 md:p-3 bg-zinc-300 rounded-xl md:rounded-lg flex justify-center items-center hover:bg-blue-300"><MdOutlineLogout /></button>
            }
        </div>
    )
}