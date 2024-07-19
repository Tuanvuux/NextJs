import { Button } from "@/components/ui/button"
import RegisterForm from "./registerform"
import Link from "next/link"
const RegisterPage = () => {

    return(
        <div>
            <h1 className="text-xl font-semibold text-center">Đăng kí</h1>
            <div className="flex justify-center">
            <RegisterForm/>
            
            </div>
        </div>
    ) 
}
export default RegisterPage