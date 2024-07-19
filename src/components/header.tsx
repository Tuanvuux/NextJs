import Link from 'next/link'
export default function Header(){
    return(
        <div>
            <ul>
                    <li><Link href='/login'>Đăng nhập</Link></li>
                    <li><Link href='/register'>Đăng kí</Link> </li>
            </ul>
        </div>
    )
}