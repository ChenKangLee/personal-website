import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'

import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

import weightedSum from '../../public/assets/blog/citibike/weighted_sum.png'
import normalize from '../../public/assets/blog/citibike/normalize.png'
import convolution from '../../public/assets/blog/citibike/convolution.png'
import modelStructure from '../../public/assets/blog/citibike/model_structure.png'

import markdownStyles from '../../styles/markdown-styles.module.css'
import CaptionedImage from '../../components/captionedImage'

export default function CitiBikePost() {
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
                <title>Citibike</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title='Recreating the GCN Model on Citibike Dataset'
                coverImage='/assets/img/stonewall.jpg'
                date='2020-01-16T05:35:07.322Z'
                photoDescription='A picture of a stone wall somewhere in Taichung. Shot with Pentax KX and Agfa APX 400.'
              />
              <div className="max-w-2xl mx-auto text-justify">
                <div className={markdownStyles['markdown']}>
                  <p>
                    Just got back from half a year of exchange program in Germany, 
                    I got a few months before the compulsory military service.
                    To keep myself busy, I joined the AI Research Center at Feng Chia university 
                    working as a research assistant.
                    My first task here was to implement the model from Chai et. al.
                    <a className='text-blue-500' href="https://arxiv.org/abs/1807.10934"> [1] </a>
                    on predicting rental bike flow on the NYC citibike dataset.
                    The model utilizes <b>Graph Convolution Networks</b> to embedd spatial relations 
                    between the rental stations and process the time sequences using LSTM.
                  </p>

                  <p>
                    Up until this point, I've really only had experience implementing simple models in Tensorflow.
                    This is a perfect oppurtunity to test my understanding of machine learning to implement a
                    working model entirely from scratch. With the additional benefit of working with a new library
                    -- PyTorch.
                  </p>

                  <p>Should be fun!</p>

                  <h2>1. Multi-Graph Convolution</h2>

                  <p>
                    The NYC Citibike dataset is a growing dataset of ride records from the bike rental service.
                    We can obtain a list of unique stations and their latitude/longitude from the records.
                    Then, by analizing the data, the authors came up with three graphs that captures different aspect of the stations' interactions: 
                    <b> Inverse of Distance, Average Ride per Day, Inbound-Outbound Correlation</b>.
                    In these graphs, the vertices are the stations, and the edge are the value of these metrics.
                  </p>

                  <p>
                    An important contribution of this paper is the multi-graph convolutional layer.
                    Which is realized though first combining the multiple graphs with <b> graph fusion </b>,
                    then performing graph convolution on it. The graphs are combined by a weighted sum of the adjacency
                    matrix at the element level.
                  </p>

                  <p>The weighted sum can be expressed as:</p>
                  <CaptionedImage src={weightedSum} scale="75" />

                  <p>Where D is:</p>
                  <CaptionedImage src={normalize} scale='80' />

                  <p>
                    With the fusioned graph, we can perform graph spectral convolution on the input
                    data, which is chosen to be the concatnation of each station's inflow and outflow
                    (<Latex>{'$I^\{t^\\prime\}, O^\{t^\\prime\}$'}</Latex>, respectively)
                    data in a set interval of time (it is chosen to be one hour in the paper).
                    More formally:
                  </p>
                  <CaptionedImage src={convolution} scale='50' />

                  <h2>2. The Model</h2>

                  <p>
                    The task is to predict the in and out flow for each station, given a window 
                    of history flow data and the weather. This sequencial data natrually calls
                    for recurrent neural networks such as Long short-term memory (LTSM).
                    Each "element" in the sequence are the in and outflow data embedded with
                    the convolution process (recall the <Latex>{'$H_1^\{t^\\prime\}$'}</Latex>
                    from last section.)
                  </p>

                  <p>
                    In this paper, the authors are basically using a encoder-decoder structure
                    The encoder-decoder are firse pretrained to effectively encode the history
                    ride flow data in a window. Then, a fully connected layer is trained to
                    predict the bikeflow of a timestamp from the previous history and the
                    weather data.
                  </p>
                  <CaptionedImage
                    src={modelStructure}
                    scale='80'
                    caption='The model structure during pretrain and training.'
                  />

                  <h2>3. Conclusion & Takeaway</h2>

                  <p>
                    Now that I come back to revisit the code I wrote, there's definitly some
                    things that I would do differently this time. For example, the crude way
                    of loading all ~60 GB data directly into memory. However, it's not a terrible
                    project for a first timer. The code and some additional information can be
                    found on my
                    <a className='text-blue-500' href="https://github.com/ChenKangLee/pytorch_citibike_prediction"> Github repository </a>
                  </p>

                  <p>
                    Obviously this is a gross over-simplification of the original work.
                    If you are still interested, please go and give the original paper 
                    a read. It's very well written and clear.
                  </p>

                  <p>Well that's all from me today. Till next time!</p>

                  <h2>4. References</h2>
                  All images I use in this post were from the original paper:
                  
                  <p>[1] Di Chai, Leye Wang, Qiang Yang, Bike Flow Prediction with Multi-Graph Convolutional Networks, 2018</p>
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}