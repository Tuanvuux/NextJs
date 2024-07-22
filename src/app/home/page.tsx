// components/Sidebar.js
import Link from 'next/link';
import styles from '@/components/Slidebar.module.css'; // Thêm file CSS để định dạng

const SidebarComponent = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Navigation</h2>
      <ul>
        <li>
            <Link href="/account">Account</Link>   
        </li>
        <li>
            <Link href="/transaction">Transaction</Link>   
        </li>
        <li>
            <Link href="/branch">Branch</Link>   
        </li>
        <li>
            <Link href="/business">Business</Link>   
        </li>
        <li>
            <Link href="/customer">Customer</Link>
        </li>
        <li>
            <Link href="/department">Department</Link>
        </li>
        <li>
          <Link href="/employee">Employee</Link>
        </li>
        <li>
          <Link href="/individual">Individual</Link>
        </li>
        <li>
          <Link href="/product">Product</Link>
        </li>
        <li>
          <Link href="/producttype">ProductType</Link>
        </li>
      
      </ul>
    </div>
  );
};

export default SidebarComponent;
