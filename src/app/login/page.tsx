import Link from 'next/link'
import LoginForm from './loginform'

export default function Home() {
  return(
    <div>
        <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
        <div className="flex justify-center">
        <LoginForm/>
        </div>
    </div>
) 
}
