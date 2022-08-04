import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'

import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

import markdownStyles from '../../styles/markdown-styles.module.css'

import CaptionedImage from '../../components/captionedImage'
import tb1Dataset from '../../public/assets/blog/spotify/tb1_dataset.png'
import fig1Popularity from '../../public/assets/blog/spotify/fig1_track_popularity.png'
import aucRes from '../../public/assets/blog/spotify/auc_res.png'
import apcRes from '../../public/assets/blog/spotify/apc_res.png'


export default function SpotifyPost() {
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
                <title>Spotify</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title='A Track Recommender System for the Spotify Million Playlist Dataset'
                coverImage='/assets/img/goldengate.jpg'
                date='2021-12-16T05:35:07.322Z'
                photoDescription='Golden State Bridge. Shot on Kodak Gold 200.'
              />
              <div className="max-w-2xl mx-auto text-justify">
                <div className={markdownStyles['markdown']}>
                  <p>
                    This is a final project for CSE 258 - Recommender Systems. For the project
                    we are tasked with using what we've learned and come up with a Recommender
                    system for a task that we've chosen.
                  </p>

                  <h2>1. Spotify Million Playlist Dataset</h2>
                  <p>
                    For this assignment, we have chosen the Spotify Million Playlist dataset 
                    <a className='text-blue-500' href="https://dl.acm.org/doi/10.1145/3240323.3240342"> [1] </a>
                    as our subject of study. The dataset of 1,000,000 playlists is sampled from the 4 billion
                    public playlists created by US spotify users between January 2010 and November 2017.
                    The dataset consist of over 2 million unique tracks by nearly 300,000 artists and
                    was originally created for the <i>Spotify Million Playlist Challenge </i>
                    that ran from January to July 2018. The version we are using in this assignment was a re-release on aicrowd.com on September 2020.
                  </p>

                  <p>
                    Each entry of the playlist dataset contains the playlist title, along with the list of
                    tracks in the playlist, as well as some metadata (number of followers, edit timestamp, etc.).
                    The tracks in each playlist are characterized by the track name, artist name and unique 
                    in-spotify uniform resource identifier (URI) corresponding to the track and artist,
                    along with metadata. The following table shows the statistics of the Spofity Million Playlist Dataset.
                  </p>
                  <CaptionedImage src={tb1Dataset} scale={60}/>

                  <h3>1.1. Adjustments Made for This Assignment</h3>
                  <p>
                    Due to the limited computing power we possess, we soon realized that it would be impossible
                    for us to utilize the whole dataset. As an effort to make the dataset more manageable,
                    we filtered the dataset and only kept  playlists with 25-30 tracks. After filtering, we are
                    left with 76,289 playlists.
                  </p>

                  <p>
                  Following this filtering step, the dataset was split into <i>training</i>, <i>validation</i>,
                  and <i>testing</i> sets with a 8:1:1 split. The track count distribution of the training set
                  is displayed in the following figure. By plotting the log of the track count, it is easy to see that a majority
                  of the tracks included in the dataset occur only once, implying there is limited training data
                  for our models to build robust representations of these rare tracks.
                  </p>
                  <CaptionedImage
                    src={fig1Popularity}
                    scale={70}
                    caption='Sorted log popularity of songs present in the training data. Taking the log of the popularity shows that a majority of the tracks in the corpus have only a single interaction to train on.'
                  />

                  <h2>2. Predictive Task</h2>
                  <p>
                    Originally, the Association of Computing Machinery (ACM) Recommender System Challenge focused 
                    on the task of <i>Automatic Playlist Continuation (APC)</i>, where models should recommend
                    tracks that fit the characteristics of an existing playlist. To define the task formally,
                    let <Latex>{' $T$ '}</Latex> be the universe of tracks in the catalog, for each playlist 
                    <Latex>{' $P$ '}</Latex> we are given <Latex>{' $k$ '}</Latex> visible tracks
                    <Latex>{' $T_{p} = \{ t_{p1}, t_{p2} ... t_{pk} \}$ '}</Latex>. The task is then to rank the tracks in
                    <Latex>{' $T - T_{p}$ '}</Latex> to be recommended to the playlist. For the testing set of the challenge,
                    playlists are grouped by different values of <Latex>{' $k$ '}</Latex>, signifying different levels of available
                    information of the playlist. In the case that <Latex>{' $k = 0$ '}</Latex>, the APC needs to rely solely on other
                    metadata of the playlist to generate the recommendations (cold start).
                  </p>

                  <p>
                    By the definition of the original problem, we would have to get every pairwise ranking of tracks in
                    <Latex>{' $T - T_{p}$ '}</Latex> to generate the recommendations. This would make the time
                    complexity for testing quadratic in the number of tracks. To make the task more manageable,
                    for this assignment, we have simplified the task into a pairwise classification problem. 
                  </p>

                  <p>
                    The pairwise classification problem in the context of recommender systems, given an user
                    <Latex>{' $u$ '}</Latex> and two items <Latex>{' $i$ '}</Latex> and <Latex>{' $j$ '}</Latex>, <Latex>{' $r_{u, i}$ '}</Latex>
                    is the model's confidence of recommending item <Latex>{' $i$ '}</Latex> to user <Latex>{' $u$ '}</Latex>.
                    The output is a binary value <Latex>{' $p_{u, i, j}$ '}</Latex>, indicating whether the model
                    will have higher confidence recommending <Latex>{' $i$ '}</Latex> to <Latex>{' $u$ '}</Latex> than <Latex>{' $j$ '}</Latex>. For example: 
                  </p>

                  <Latex>{
                    `$$
                      p_{u, i, j}=\\begin{cases}
                        1 & if r_{u, i} > r_{u, j} \\\\
                        0 & otherwise
                      \\end{cases}
                    $$`
                  }</Latex>

                  <p>
                    Under our settings, for a playlist <Latex>{' $P$ '}</Latex> with <Latex>{' $n$ '}</Latex> tracks, we are given <Latex>{' $k=10$ '}</Latex>
                    visible tracks per playlist, while the remaining <Latex>{' $n - k$ '}</Latex> tracks are hidden.
                    For each hidden track <Latex>{' $t_{h}$ '}</Latex>, we sample a negative track <Latex>{' $t_{n}$ '}</Latex>
                    from the set <Latex>{' $T - T_{p}$ '}</Latex>. The model outputs a binary value, indicating if the first item should be
                    ranked higher than the second. 
                  </p>

                  <p>
                    The model's output is considered correct if it ranks the positive track (hidden) higher than
                    the negative track (sampled). The performance of the models are measured using AUC
                    <a className='text-blue-500' href="https://doi.org/10.1007/978-1-4419-9863-7_209"> [2] </a>
                  </p>

                  <h2>3. Models Used</h2>
                  <p>
                    For the task of pairwise classification problem, we have chosen three models to rank the tracks:
                    Jaccard Similarity model, Item2vec and FISM. We shall give the detail of each implementation in
                    the following sections.
                  </p>

                  <h3>3.1. FISM</h3>
                  <p>
                    Factored Item Similarity Model (FISM) <a className='text-blue-500' href="https://dl.acm.org/doi/10.1145/2487575.2487589"> [3] </a> 
                    is a kind of user-free model. In FISM, items are embedded into a latent space where an user-item
                    query is defined as matrix multiplication between an item query matrix of items that user
                    consumed and a target item vector.
                  </p>

                  <p>
                    Let <Latex>{' $p$ '}</Latex> denote a playlist and <Latex>{' $i$ '}</Latex> and <Latex>{' $j$ '}</Latex> denote tracks. We define a playlist-track interaction
                    <Latex>{' $r_{pi}$ '}</Latex>. The recommendation score of FISM is then:
                  </p>
                  <Latex>{
                    `$$
                    \\hat r_{pi} = b_p + b_i + |p\\setminus\\{i\\}|^{-\\alpha}\\sum_{j\\in p\\setminus\\{i\\}}\\textbf{p}_j\\textbf{q}_i^T,
                    $$`
                  }</Latex>

                  <p>
                    where <Latex>{' $b_p$ '}</Latex> and <Latex>{' $b_i$ '}</Latex> are offset values for <Latex>{' $p$ '}</Latex> and <Latex>{' $i$ '}</Latex> respectively, 
                    <Latex>{' $|p\\setminus\\{i\\}|$ '}</Latex> is the size of the playlist excluding <Latex>{' $i$ '}</Latex>, <Latex>{' $\\alpha$ '}</Latex> is neighborhood agreement
                    value in the range of <Latex>{' $[0, 1]$ '}</Latex> as in the original paper, and <Latex>{' $\\textbf{p}_j$ '}</Latex>,
                    <Latex>{' $\\textbf{q}_i$ '}</Latex> are latent factor representations.
                  </p>

                  <p>
                    To train our model, we design a loss based on Bayesian Personalized Ranking (BPR) 
                    <a className='text-blue-500' href="https://arxiv.org/pdf/1205.2618.pdf"> [4] </a>
                    which optimizes the area under the curve (AUC). Specifically, for every pair of
                    positive sample and negative sample, we want to maximize the likelihood of our
                    model successfully ranking the positive sample higher:
                  </p>
                  <Latex>{
                    `$$
                    \\mathcal{L}_{AUC}=-\\sum_{p\\in P}\\sum_{i\\in p, j \\notin p}\\ln\\sigma(\\hat r_{pi} - \\hat r_{pj}),
                    $$`
                  }</Latex>
                  <p>
                    where <Latex>{' $P$ '}</Latex> is the set of all playlists. Note that <Latex>{' $b_p$ '}</Latex> is canceled out in the loss
                    so we get a model that is agnostic to specific playlists.
                  </p>

                  <p>
                    Our optimization problem is then to minimize the regularized loss:
                  </p>
                  <Latex>{
                    `$$
                    \\mathop{\\mathrm{minimize}}\\limits_{\\textbf{b},\\textbf{P},\\textbf{Q}}~~\\mathcal{L}_{AUC} + \\lambda_1(||\\textbf{b}||^2_2) + \\lambda_2(||\\textbf{P}||^2_2 +  ||\\textbf{Q}||^2_2).
                    $$`
                  }</Latex>

                  <p>
                  In practice, we randomly sample a batch of <Latex>{' $(p, i, j)$ '}</Latex>
                  in every step of gradient descent. We use <Latex>{' $\lambda_1=\lambda_2=0.01$ '}</Latex>,
                  <Latex>{' $\alpha=1$ '}</Latex> and a latent dimension of 5. We use Adam as the optimizer with a
                  learning rate of 0.01, and we use a batch size of 32.
                  </p>


                  <h3>3.2. Item2vec</h3>
                  <p>
                    Item2vec is the generalized form of the popular Word2vec collaborative filtering model,
                    which finds a similarity metric between all items in a corpus based on recurring proximity
                    across many sequences. Similar to the way in which Word2vec develops a semantic
                    understanding of word orderings and associations when the training data consists of
                    sentences, we implement skip-gram Item2vec to learn associations between songs based on
                    their inclusion and relative position in playlists. The fundamental assumption behind
                    implementing Item2vec for playlist continuation is that a user assembling a playlist will
                    tend to put similar songs near one another. 
                  </p>
                  <p>
                    The loss function used during training contains the vital conditional probability that track
                    <Latex>{' $t_j$ '}</Latex> is within a window of <Latex>{' $w$ '}</Latex> adjacent tracks to <Latex>{' $t_i$ '}</Latex>, iterated over all
                    combinations of tracks <Latex>{' $t_i$ '}</Latex> and <Latex>{' $t_j$ '}</Latex> presented in the playlist data.
                    The window hyperparameter <Latex>{' $w$ '}</Latex> will change the number of <Latex>{' $t_i$ '}</Latex> and
                    <Latex>{' $t_j$ '}</Latex> pairs, and therefore the number of training examples $N$.
                  </p>
                  <Latex>{
                    `$$
                    \\begin{aligned}
                        min \\; -\\frac{1}{N} \\; \\sum_{i} \\; \\sum_{j} \\; log P(t_j | t_i) \\\\
                    \\end{aligned}
                    $$`
                  }</Latex>

                  <p>
                    The conditional probability between a pair of tracks <Latex>{' $P(t_i |t_j)$ '}</Latex>
                    is estimated using an <Latex>{' $M$ '}</Latex> dimensional embedding vector for each track, <Latex>{' $v_i$ '}</Latex>
                    and <Latex>{' $u_j$ '}</Latex> respectively, as well as the softmax function.
                  </p>
                  <Latex>{
                    `$$
                    \\begin{aligned}
                        P(t_j | t_i) \\; = \\; \\frac{exp(u_{j}^{T} v_{i})}{\\sum_{k \\in corpus} exp(u_{k}^{T} v_i)} \\\\
                    \\end{aligned}
                    $$`
                  }</Latex>

                  <p>
                    For each selection of window size <Latex>{' $w$ '}</Latex> and embedding size <Latex>{' $M$ '}</Latex>,
                    the full training dataset is processed and weights are updated after each example to eventually arrive at a set
                    of embedding vectors of dimension <Latex>{' $||corpus||$ x $M$ '}</Latex>.
                  </p>
                  <p>
                    To determine the optimality of parameters <Latex>{' $w$ '}</Latex> and <Latex>{' $M$'}</Latex>, the trained model is evaluated on the
                    validation set by observing the set of hidden tracks belonging to each playlist,
                    randomly sampling an equal number of tracks from the corpus that are not in the playlist,
                    then evaluating each pair of hidden/negative tracks to see which has a higher joint similarity
                    to all visible tracks in the playlist. The set of parameters that yielded the best validation
                    AUC of 0.74 included a window size of 11 and embedding size of 2275.
                  </p>


                  <h3>3.3. Jaccard Similarity</h3>
                  <p>
                    In the Jaccard similarity model, we record the interaction history of all playlist and all tracks.
                    A set containing every track each playlist contains, and another containing all the playlists that a track is in.
                    After generating these two data structure from the training set, we can define how can we recommend the tracks
                    inside the withheld part of the playlist.
                  </p>
                  <p>
                    To determine the ranking between two tracks <Latex>{' $t_{i}$ '}</Latex> and <Latex>{' $t_{j}$ '}</Latex> in playlist <Latex>{' $p$'}</Latex>,
                    we sum the Jaccard Similarity <a className='text-blue-500' href="https://ieeexplore.ieee.org/document/8343073"> [5] </a> between the track in question 
                    (<Latex>{' $i$ '}</Latex> and <Latex>{' $j$ '}</Latex>) with the 10 visible songs in the playlist. And the track with the
                    higher sum will be ranked higher.
                  </p>

                  <h2>4. Experiment Results</h2>
                  <h3>4.1. Pairwise Recommendation</h3>
                  <p>
                    For the testing set, we first filter the tracks in each playlist, removing tracks that are not present in
                    the training set. Then, for each track in the hidden tracks, we randomly sampled a track from the set
                    <Latex>{' $T_{train} - T_{visible} - T_{withheld}$ '}</Latex>, where <Latex>{' $T_{train}$ '}</Latex> is the set of
                    all tracks that appeared in the training set. 
                  </p>

                  <p>
                    We measure the performance using the AUC metric. The model's output is considered correct if it ranks
                    the positive track (hidden) higher than the negative track (sampled). The following table shows a
                    summary of the performance of each model on the testing set.
                  </p>
                  <CaptionedImage src={aucRes} scale={70}/>

                  <p>
                    The three algorithms implemented to detect trends in how users construct playlists all performed above
                    random chance with FISM performing the best, Jaccard performing second best, and Item2vec performing
                    the worst. Interestingly, the Jaccard based heuristic of recommending songs present in the most
                    similar playlists to the playlist in question outperformed the unsupervised, deep learning Item2vec
                    method. One explanation for this result could come from Item2vec's requirement of a windowing parameter,
                    which further subdivides training examples into small chunks, and breaks the correlation between two
                    tracks that appear within the same playlist, but are more than <Latex>{' $\\frac{w-1}{2}$ '}</Latex>
                    tracks away from one another. This problem also makes the algorithm biased towards larger playlists,
                    where the likelihood of two similar songs occurring near one another is lower than in smaller playlists.
                    The Item2vec algorithm was initially chosen thinking that it's success in identifying synonyms after
                    training on a collection of sentences would be advantageous in identifying synonymous tracks, which occur
                    infrequently, but show up in close proximity to highly popular tracks. 
                  </p>
                  <p>
                    The factored item similarity model (FISM), which is similar to Item2vec in its aim to learn embedded
                    representations of tracks agnostic of user based features, performed extremely well relative to
                    the two alternative models. FISM is effective at learning item-to-item representations even with
                    increasingly sparse interaction data. In the context of the playlist completion task, sparse interaction
                    data takes the form of playlists that contain tracks only appearing a handful of times in the entire dataset.
                  </p>

                  <h3>4.2. Automatic Playlist Continuation</h3>
                  <p>
                    For the sake of experiment, we ran the Jaccard based model on the slightly tweaked automatic playlist
                    continuation task. Since we do not have access to the ground truth of the 500 recommended songs for each playlist,
                    we have to evaluate our model in a slightly tweaked setting. In the tweaked version, we are no longer extending
                    the playlist to 500 tracks. Instead, we generate recommendation to fill-in the withheld tracks.
                  </p>
                  <p>
                    To extend each playlist, for each track in all tracks in the set 
                    <Latex>{' $T_{train} - T_{visible} - T_{withheld}$ '}</Latex>, we calculate it's pairwise Jaccard Similarity with all the
                    visible tracks in the playlist. The Jaccard Similarity is calculated with the set of playlist each track was in.
                    The sum of these similarities would be the similarity score for that track to the playlist we are extending.
                    We then rank all the tracks based on this score, and the top <Latex>{' $n - k$ '}</Latex> ranked tracks will be our recommendations.
                  </p>
                  <p>
                    To evaluate the model, we considered two cases of available tracks. Following the 2018 RecSys contest:
                    Type 6 denotes samples where <b>only the first 25 tracks</b> are visible to us, while in Type 7, we can see 
                    <b>25 random tracks</b>. We used only 10 percent of the samples in type6 and type7 of the challenge set,
                    and the results is reported in the following table
                  </p>
                  <CaptionedImage src={apcRes} scale={70}/>

                  <p>
                    An interesting observation can be made on the results. Models trained on randomly selected visible set performed
                    significantly better than the sequentially selected ones. We believe that this is because tracks in playlist has
                    the tendency to display locality, meaning adjacent tracks in a playlist tend to share some characteristics
                    (same artist, genre or albums). Random samples of the tracks gives a more holistic view of the playlist,
                    and we get a better representation from the visible set.
                  </p>

                  <h2>5. References</h2>
                  <p><a className='text-blue-500' href="https://dl.acm.org/doi/10.1145/3240323.3240342">[1] Recsys challenge 2018: automatic music playlist continuation</a></p>
                  <p><a className='text-blue-500' href="https://link.springer.com/referenceworkentry/10.1007/978-1-4419-9863-7_209">[2] Area under the ROC Curve</a></p>
                  <p><a className='text-blue-500' href="https://dl.acm.org/doi/10.1145/2487575.2487589">[3] FISM: factored item similarity models for top-N recommender systems</a></p>
                  <p><a className='text-blue-500' href="https://arxiv.org/pdf/1205.2618.pdf">[4] BPR: Bayesian Personalized Ranking from Implicit Feedback</a></p>
                  <p><a className='text-blue-500' href="https://ieeexplore.ieee.org/document/8343073">[5] A Jaccard base similarity measure to improve performance of CF based recommender systems</a></p>

                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}