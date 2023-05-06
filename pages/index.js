import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../src/components/Navbar'
import Default from '../src/components/Default'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
    <Navbar />
    <Default />
    </>
  )
}
