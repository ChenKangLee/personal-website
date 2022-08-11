import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'

import markdownStyles from '../../styles/markdown-styles.module.css'
import CaptionedImage from '../../components/captionedImage'
import posterImg from '../../public/assets/blog/gestalta/poster.png'
import doorImg from '../../public/assets/blog/gestalta/door.png'
import officeImg from '../../public/assets/blog/gestalta/office.png'
import variousImg from '../../public/assets/blog/gestalta/various_shot.png'


export default function GestaltaPost() {
  const router = useRouter()
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>Gestalta</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title='Gestalta: A Game Written in Unity3D'
                coverImage='/assets/img/blacks.jpg'
                date='2018-12-16T05:35:07.322Z'
                photoDescription='Blacks Beach, La Jolla, California. Shot with Mamiya C33 on Ilford HP5.'
              />
              <div className="max-w-2xl mx-auto text-justify">
                <div className={markdownStyles['markdown']}>
                  <p>
                    This is the final project for the Game Design course at National Tsing Hua
                    University. It is co-developed by myself, Chi Hu, Jui-Wei Huang, Shao-Cheng Wen and
                    Wen-Ting Yang.
                  </p>
                  <div className='my-10'>
                    <CaptionedImage src={posterImg} scale={80}/>
                  </div>

                  <p>
                    Gestalta is a 2.5D adventure game written in Unity3D. The player controls a
                    miniature sketch referencing doll through various maps and settings, overcoming
                    obstacles through solving puzzles and exploring the map.
                  </p>
                  <CaptionedImage src={doorImg} />
                  <CaptionedImage src={variousImg} />
                  <CaptionedImage src={officeImg} caption="Actual screenshot of the game."/>

                  <p>
                    The key technical aspect in the camera system, a script we wrote that allows
                    more control over the camera. Here's the video we used for the University Game
                    Design Contest, where we went on and won the best music and best visual Design
                    awards.
                  </p>

                  <p className='text-center text-xl'>
                    <a className='text-blue-500' href="https://youtu.be/KAD3KSUdpdA">Video Link</a>
                  </p>

                  <p>
                    After this project, I became really comfortable with development in Unity3D.
                    And it was really eye opening working with Chi, who is an extremely talented
                    game designer/filmmaker. This game wouldn't be possible without his genius!
                  </p>
                  
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}