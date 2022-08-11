import { join } from 'path'

import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'

export default function Index({ allPosts }) {
  return (
    <>
      <Layout className='place-content-center md:w-5/6'>
        <Head>
          <title>Chen-Kang Lee's Personal Website</title>
        </Head>
        <Container>
          <Intro />
          <MoreStories topic={"Projects."} posts={allPosts} />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const projectsDirectory = join(process.cwd(), '_posts')

  const allPosts = getAllPosts(
    [
      'title',
      'date',
      'slug',
      'keywords',
      'coverImage',
      'excerpt'
    ]
  )

  return {
    props: { allPosts },
  }
}
