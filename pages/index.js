import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout from '@/components/Layout'
import utilStyle from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'

//const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    }
  };
}


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyle.headingMd}>
        <p>
          I am a pen.
        </p>
      </section>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
      <h2>エンジニアぶろぐ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, date, thumbnail}) => (
          <article key ={id}>
            <Link href={`/posts/${id}`}>
              <img 
                src={`${thumbnail}`} 
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href={`/posts/${id}`}>
              <h3 className={utilStyle.boldText}>{title}</h3>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}
        
      </div>
      </section>
      <a href='./posts/firstPost'>Next.js</a>
    </Layout>
  )
}
