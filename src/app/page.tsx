import Image from 'next/image'
import styles from './page.module.css'
import { getUser } from '../../lib/api';
import Navbar from '../../components/Navbar';
import { Homepage }from '../../components/';

export default async function Home() {
  const user = await getUser();
    
  return <>
    <Navbar loggedIn={user !== undefined} />
    <Homepage loggedIn={user !== undefined} />
  </>;
}
