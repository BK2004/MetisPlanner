import Image from 'next/image'
import styles from './page.module.css'
import { getUser } from '../../lib/api';
import Navbar from '../../components/Navbar';

export default async function Home() {
  const user = await getUser();
    
  return <>
    <Navbar loggedIn={user !== undefined} />
  </>;
}
