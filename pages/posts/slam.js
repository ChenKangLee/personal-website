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
import mapLayout from '../../public/assets/blog/slam/map_layout.png'
import kalmanAlgo from '../../public/assets/blog/slam/kalman.png'
import circularRes from '../../public/assets/blog/slam/circular.png'
import circularThree from '../../public/assets/blog/slam/3circular.png'
import figureEight from '../../public/assets/blog/slam/figureEight.png'

export default function SLAMPost() {
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
                <title>SLAM</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title='Visual SLAM on Jetbots using Extended Kalman Filters'
                coverImage='/assets/img/joshua_sunset.jpg'
                date='2021-11-16T05:35:07.322Z'
                photoDescription='Sunset at Joshua Tree National Park. Shot on Mamiya C33 with Portra 400.'
              />
              <div className="max-w-2xl mx-auto text-justify">
                <div className={markdownStyles['markdown']}>
                  <p>
                    This is a project for CSE 276A - "Introduction to Robotics" at UC San Diego.
                    It's taught by professor Henrik I. Christensen and is definitely one of the 
                    most challenging class I took that quarter.
                    And like they said, "What doesn't kill you make you stronger". After surviving
                    this quarter, I definitely learned a lot more.
                  </p>

                  <h2>1. The Objective</h2>
                  <p>
                    For this project,  we implemented Simultaneous Localization and Mapping (SLAM)
                    using Extended Kalman Filter (EKF). The only sensor data available is the
                    camera module on the Jetbot differential drive robot. 
                    In the current setting, we are updating our estimation of values that we cannot 
                    directly measure (the robot position) from the measurement of values that we 
                    can observe (the landmarks). The landmarks are a set of 12
                    <a className='text-blue-500' href="https://github.com/AprilRobotics/apriltag"> April Tags </a>.
                    To make things more challenging, only two types of tags are included, this means
                    that we'll need to implement data association to figure out which of the same tags
                    we are seeing now.
                  </p>

                  <CaptionedImage 
                    src={mapLayout} 
                    scale='70'
                    caption='The layout of the landmark we uses (the number is the April Tag ID)'
                  />

                  <h2>2. Formulation of the SLAM Problem</h2>
                  <p>
                    In this section, we are using the notations and algorithm depicted in the 
                    Robot Mapping course from University of Freiburg
                    <a className='text-blue-500' href="http://ais.informatik.uni-freiburg.de/teaching/ws13/mapping/pdf/slam05-ekf-slam.pdf"> [1] </a>.
                  </p>

                  <p>
                    At each timestep, given the robot control signal <Latex>{' $u_{t}$ '}</Latex>
                    and the observations <Latex>{' $z_{t}$ '}</Latex>, we try to estimate the state 
                    <Latex>{' $\\mu_{t}$ '}</Latex> consisting of the robot's pose in 2D, 
                    plus the x, y coordinates for each landmark:
                  </p>
                  <Latex>
                    {'$$\\mu_{t} = \\{ x_{robot}, y_{robot}, \\theta_{robot}, x_{tag1}, y_{tag2}, ... x_{tagN}, y_{tagN} \\}$$'}
                  </Latex>

                  <h2>3. Extended Kalman Filter</h2>
                  <p>
                    The EKF process can be broken down into <b>initialization</b>, 
                    <b> prediction</b> and the <b>update</b> step. The following
                    pseudo code describes the EKF algoritm.
                  </p>

                  <CaptionedImage 
                    src={kalmanAlgo}
                    scale='80'
                    caption='The pseudo code is from the slides of the course in [1]'
                  />

                  <h3>3.1. Initialization</h3>

                  <p>
                    We initialize the robot's position to be at the origin in world coordinate 
                    (x, y, <Latex>{' $\\theta$'}</Latex>) = <code>(0, 0, 0)</code>. 
                    Initially all the landmarks were unobserved so we initialize them to (x, y) = 
                    <code>(0, 0)</code>.
                  </p>
                  
                  <p>
                    For the noise covariance matrix <Latex>{' $\\Sigma_{0}$ '}</Latex>, since we have no 
                    uncertainty about the robot's initial position, we set the corresponding 
                    variance to <code>0</code>. As for the unseen landmarks, the uncertainty is a very 
                    large number that represents infinity (we chose <code>{'1e6'}</code>)
                  </p>

                  <Latex>
                    {`$$
                      \\Sigma_{0}=
                      \\begin{pmatrix} 
                      0 & 0 & 0 & ... & 0 & 0 & 0 & 0 \\\\ 
                      0 & 0 & 0 & ... & 0 & 0 & 0 & 0 \\\\
                      0 & 0 & 0 & ... & 0 & 0 & 0 & 0 \\\\
                      0 & 0 & 0 & ... & \\infty & 0 & 0 & 0 \\\\
                      0 & 0 & 0 & ... & 0 & \\infty & 0 & 0 \\\\
                      0 & 0 & 0 & ... & 0 & 0 & \\infty & 0 \\\\
                      0 & 0 & 0 & ... & 0 & 0 & 0 & \\infty
                      \\end{pmatrix}
                    $$`}
                  </Latex>

                  <p>
                  As for the motion and measurement noise <Latex>{' $LR_{t}$ '}</Latex> and 
                  ,<Latex>{' $Q_{t}$ '}</Latex> we simply set them to <b> diagonal matrices </b>
                  (assuming independent noise) with arbitrary variance values that are reasonable.
                  </p>

                  <h3>3.2. Prediction</h3>

                  In the prediction step, we use the motion model to calculate the estimation of 
                  the robot's position. Here, we are using a velocity based model. The control signal
                  consists of the linear velocity <Latex>{' $v$ '}</Latex>  and angular velocity 
                  <Latex>{' $\\omega$ '}</Latex> . The equations are:

                  <Latex>
                    {`$$ 
                      x_{t+1} = x_{t-1} + -\\frac{v_{t}}{\\omega_{t}}\\sin\\theta + \\frac{v_{t}}{\\omega_{t}}\\sin(\\theta + \\omega_{t}\\Delta t) \\\\
                      y_{t+1} = y_{t-1} + \\frac{v_{t}}{\\omega_{t}}\\cos\\theta - \\frac{v_{t}}{\\omega_{t}}\\cos(\\theta + \\omega_{t}\\Delta t) \\\\
                      \\theta_{t} = \\theta_{t-1} + \\omega_{t}\\Delta t
                    $$`}
                  </Latex>

                  <p>
                    Since the motion model is non-linear, we would have to use the function's Jacobian 
                    for the calculation of prediction uncertainty.
                  </p>

                  <Latex>
                    {`$$ 
                      \\overline{\\Sigma}_{t} = G_{t}\\Sigma_{t-1}G_{t}^T + R_{t}
                    $$`}
                  </Latex>

                  <p>Where</p>
                  <Latex>
                    {`$$ 
                      G_{t}=\\begin{pmatrix} J_{t}^x & 0 \\\\ 0 & I \\end{pmatrix}
                    $$`}
                  </Latex>

                  <p>And the Jacobian</p>
                  <Latex>
                    {`$$ 
                      J_{t}^x = I + 
                      \\begin{pmatrix}
                      0 & 0 & -\\frac{v_{t}}{\\omega_{t}}\\cos\\theta + \\frac{v_{t}}{\\omega_{t}}\\cos(\\theta + \\omega_{t}\\Delta t) \\\\
                      0 & 0 & -\\frac{v_{t}}{\\omega_{t}}\\sin\\theta + \\frac{v_{t}}{\\omega_{t}}\\sin(\\theta + \\omega_{t}\\Delta t) \\\\
                      0 & 0 & 0
                      \\end{pmatrix}
                    $$`}
                  </Latex>

                  <h3>3.3. Update</h3>

                  <p>
                    The detected AprilTags' poses are first transformed into the robot's frame,
                    then converted to observations in the format <Latex>{' $(r, \phi, i)$ '}</Latex>.
                    <Latex>{' $i$ '}</Latex> denotes the <b> position of the tag in the state vector </b>.
                    It is obtained in the data association step, which we will go over in it's own section.
                  </p>

                  <p>
                    The estimation for the observations are calculated from estimated position of the robot:
                  </p>
                  <Latex>
                    {`$$ 
                      \\delta = 
                      \\begin{pmatrix}
                      \\overline{\\mu}_{i, x} - \\overline{\\mu}_{robot x} \\\\
                      \\overline{\\mu}_{i, y} - \\overline{\\mu}_{robot y}
                      \\end{pmatrix}
                    $$`}
                  </Latex>
                  <Latex>
                    {`$$ 
                      \\hat{z}_{t}^i = 
                      \\begin{pmatrix}
                      \\sqrt{\\delta^T \\delta} \\\\
                      \\tan^{-1}(\\delta_{y}, \\delta_{x} - \\overline{\\mu}_{robot \\theta})
                      \\end{pmatrix}
                    $$`}
                  </Latex>

                  <p>
                    If it is the first time we've observed a landmark, the covariance matrix at <Latex>{' $i$ '}</Latex>
                    should have variance of <Latex>{' $\\infty$ '}</Latex> (in other words, we have no estimation of the landmark's position). We simply make the observation our estimation.
                  </p>

                  <p>
                  Since the estimation calculation is also non-linear, we need the jacobian to calculate the Kalman Gain 
                  (the matrix <Latex>{' $H_{t}$ '}</Latex> in step 4. of the algorithm)
                  </p>
                  <Latex>
                    {`$$ 
                      H_{t}^i= J_{obs}^i F_{x, i}
                    $$`}
                  </Latex>

                  <p>Where</p>
                  <Latex>
                    {`$$ 
                      J_{obs}^i = \\frac{1}{q} 
                      \\begin{pmatrix}
                      -\\sqrt{q} \\delta_{x} & -\\sqrt{q} \\delta_{y} & 0 & \\sqrt{q} \\delta_{x} & \\sqrt{q} \\delta_{y} \\\\
                      \\delta_{y} & -\\delta_{x} & -q & \\delta_{y} & \\delta_{x}
                      \\end{pmatrix}
                      $$
                      $$
                      q = \\delta^T \\delta
                    $$`}
                  </Latex>

                  <p>
                    And <Latex>{' $F_{x, i}$ '}</Latex> is a matrix that maps the observation back into the vector space
                  </p>
                  <Latex>
                    {`$$ 
                      F_{x, i} = 
                      \\begin{pmatrix}
                      1 & 0 & 0 & 0 & ... & 0 & 0 & ... & 0 \\\\
                      0 & 1 & 0 & 0 & ... & 0 & 0 & ... & 0 \\\\
                      0 & 0 & 1 & 0 & ... & 0 & 0 & ... & 0 \\\\
                      0 & 0 & 0 & 0 & ... & 1 & 0 & ... & 0 \\\\
                      0 & 0 & 0 & 0 & ... & 0 & 1 & ... & 0 \\\\
                      \\end{pmatrix}
                    $$`}
                  </Latex>

                  <p>
                    The position where to put the $1$ on the 4th and 5th row of the matrix <Latex>{' $F_{x, i}$ '}</Latex>
                    is <Latex>{' $(2*i + 3, 2*i+4)$ '}</Latex> respectively (recall that <Latex>{' $i$ '}</Latex> 
                    is the index of the landmark in the state vector.)
                  </p>

                  <p>
                    Plugging these in the algorithm, we can iteratively update 
                    <Latex>{' $\\mu$ '}</Latex> and <Latex>{' $\\Sigma$ '}</Latex> to get a better estimation.
                  </p>

                  <h2>4. Data Association</h2>
                  <p>
                    As mentioned earlier, since there are multiple landmarks with the same April Tags
                    patterns, we need to perform data association to determine which estimation we are
                    mapping the obeservation to.
                  </p>

                  <p>
                    At each timestep, when we recieved a list of detected Apriltags, we scan through the
                    position of the seen tags. If the estimated position of a tag is close enough to the
                    tag we are observing, we *assume that they are the same tag*. The seen tags are kept
                    in different lists according to their Apriltag ID to further reduce the posibility of
                    confusion and for landmark detection.
                  </p>

                  <p>
                    The criteria of "close enough" is simply the euclidian distance. Since the x, y position
                    is assumed to be independent, we didn't implement the Mahalanobis distance.
                  </p>

                  <p>
                    When implementing data association, we kept running into problems where landmarks cannot
                    be effective distinguished. As a we to combat this, we ended up with an implementation that
                    assumes we know the number of each tags. And when we have the correct number of a tag_id,
                    any subsequent tag is associated with one of the seen tags that has the lowest distance.
                  </p>

                  <h2>5. Results</h2>

                  <p>
                    For the experiments, we planned two movement patterns for the Jetbot,
                    and let it draw out the map using the SLAM slgorithm we implemented.
                  </p>

                  <h3>5.1. Single Circular Path</h3>
                  <p>
                    In this experiment, the robot goes around in a circle in the center of
                    the map for one time. For our circular motion, we went with a very naive control by 
                    fixing the linear and angular velocity.
                  </p>

                  <p>
                    The following image is a plot of the resulting map after exactly one full circle 
                    (the blue 'x' denotes <code> tag_id=0 </code> and green 'x' have <code> tag_id=42 </code>)
                  </p>
                  <CaptionedImage
                    src={circularRes}
                  />

                  <p>
                    We can see that after one iteration and seeing all the tags, 
                    we can come up with a map that represent the correct relative positions
                    of the robot starting point and the landmarks. However, due to the noise
                    in driving and measuring, the exact position of the landmarks are off a
                    couple of centimeters.
                  </p>

                  <h3>5.2. Multiple Circular Path</h3>
                  <p>
                    The following image is a plot of the resulting map after looping three times:
                  </p>
                  <CaptionedImage
                    src={circularThree}
                  />
                  <p>
                    Surprisingly, the result was worse despite the use of Kalman Filters.
                    We suspect that the reason is due to our naive driving model. We have observed 
                    that the circle trajectory of the robot has the tendency to gradually drift to
                    a certain direction (in this particular case, it has shifted in the <code>y</code> direction).
                    This introduced a structural noise into the system, which cannot be dealt with by
                    Kalman Filters. That is why as iteration increases, the noise build up and pushes
                    the measurement further away from their true position.
                  </p>

                  <h3>5.3. Figure 8 Path</h3>
                  <p>
                    For the figure-8 motion, we also went with a very simple motion,
                    where we go in a circle using the control described in section 2.
                    and turn once we think we're back to the origin. The following image
                    is the result of the figure-8 drive.
                  </p>
                  <CaptionedImage
                    src={figureEight}
                  />
                  <p>
                    As expected, the generated maps have more errors. Again we suspect that
                    this is due to the non-random noise in our driving.
                  </p>

                  <h2>6. Results & Discussion</h2>
                  <p>
                    In this assignment, we implemented SLAM using Apritags and EKF. While we did manage
                    to successfully come up with several maps, the results were generally quite inconsistent.
                    Due to the occational burst of inaccurate readings from the Apriltag detections, 
                    we could have very bad initializtion of the landmark positions. This could cause the robot to get lost completely.
                  </p>

                  <p>
                    Furthermore, the naive, open loop motion model proves to limit the performance as well.
                    A more sophisticated motion model is needed for a more consistent result.
                  </p>

                  <h2>7. References</h2>
                  <a className='text-blue-500' href="http://ais.informatik.uni-freiburg.de/teaching/ws13/mapping/pdf/slam05-ekf-slam.pdf">
                    [1] The lecture slides of Cyrill Stachniss on EKF SLAM
                  </a>
                </div>
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}