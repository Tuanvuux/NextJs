
import FormAdd from './AddForm';
import SidebarComponent from '@/app/home/page';

export default function Home() {
  
  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent />
      <div className='flex-1 p-5 ml-64 mr-6'>
        <FormAdd/>
      </div>
    </div>
    
  );
}