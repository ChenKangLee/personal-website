import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'

import 'katex/dist/katex.min.css'

import markdownStyles from '../../styles/markdown-styles.module.css'

import CaptionedImage from '../../components/captionedImage'
import methodTable from '../../public/assets/blog/takeover/all_methods.png'
import handoverImg from '../../public/assets/blog/takeover/handover.png'
import arrowImg from '../../public/assets/blog/takeover/arrow.png'
import comprehensionMethods from '../../public/assets/blog/takeover/comprehension_methods.png'
import comprehensionDisplay from '../../public/assets/blog/takeover/comprehension_display.png'
import comfortAS from '../../public/assets/blog/takeover/Com_A_S.png'
import comfortNF from '../../public/assets/blog/takeover/Com_nf.png'
import comfortR from '../../public/assets/blog/takeover/Com_R.png'
import speedMethods from '../../public/assets/blog/takeover/speed_methods.png'
import speedDisplay from '../../public/assets/blog/takeover/speed_display.png'
import successRate from '../../public/assets/blog/takeover/success_rate.png'
import responseTime from '../../public/assets/blog/takeover/response_time.png'

export default function TakeoverPost() {
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
                <title>Takeover</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title='To Read or to Take Over? A Case Study of Safety Aware Reading Experience on Self-Driving Cars'
                coverImage='/assets/img/temple.jpg'
                date='2019-03-16T05:35:07.322Z'
                photoDescription='A temple in Taichung. Shot on Kodak ColorPlus 200.'
              />
              <div className="max-w-2xl mx-auto text-justify">
                <div className={markdownStyles['markdown']}>
                  <p>
                    This is the topic for my undergraduate research at NTHU. It was co-authored with my
                    teammate Wei-Hsuan Hsu, adviced by Professor Shan-Hung Wu.
                  </p>
                  <p>
                    The Society of Automotive Engineers, defines the intelligence level and automation
                    capabilities of vehicles, ranking through 0 to 5. 
                    At level 0, vehicles are fully controlled by human. 
                    At level 5, vehicles are fully automated and no human intervention is required.
                    In between these two extremes, semi-autonomous vehicles come into the picture.
                    These vehicles have a certain level of automation, yet the human drivers are required to stay
                    vigilant at all times in case they need to take over the control of the car.
                    This transition process is called <i>handover</i>.
                  </p>

                  <p>
                    In this research, we study the design of an in-car interactive system that allows users to <i>read</i> safely.
                    Reading is a common activity people engage when commuting.  However, a good reading experience seems to be a
                    conflicting goal with safety,  it keeps the driver's gaze off the road, which may jeopardize driver's ability 
                    to react to a handover event.
                    We then ask the question: is it possible to design an in-car reading
                    system such that it can deliver good reading experience and at the same time ensure driving safety. 
                  </p>

                  <h2>An In-Car Reader</h2>
                  <p>
                    When handover occurs, a driver needs to 1) understand the current situation 
                    (e.g., looking at the road and searching for dangerous objects) and 
                    2) perform physical movements (e.g. turning their head or putting their hands back on the steering wheel)
                    in order to drive manually. Thus, we focus on in-car readers that 1)
                    keeps the driver's gaze on the road and 2) keeps the driver's hand on the steering wheel.
                  </p>

                  <p>
                    With recent development of HUD (Heads Up Display) that allows text to be projected
                    on a large portion of the windshield and keeps a driver's visual focus on the front,
                    we propose using an HUD as the display of text. Furthermore, a modern car usually have
                    control buttons on the steering wheel. We require the driver to interact with the HUD
                    display through those buttons such that he/she will keep hands on the steering wheel
                    when reading.
                  </p>

                  <p>
                    We propose 8 in-car reading methods following the above  principles.  These methods takes
                    different approaches in 3 key design aspects:
                  </p>
                  <p><b>(1) Should the reading zone be placed on the road or off road?</b></p>
                  <p><b>(2) Should the reading zone be displayed at a fixed position or a dynamic position changing according to road conditions?</b></p>
                  <p><b>(3) Should text  in the reading zone be displayed paragraph by paragraph, sentence by sentence, or word by word?</b></p>
                  <p>
                    The following table gives a summary of the 8 different methods from the combinations
                    of the three aforementioned design decisions:
                  </p>

                  <CaptionedImage src={methodTable} />

                  <h3>Hypotheses</h3>
                  <p>We have six hypothesis for our research:</p>

                  <div className='ml-5'>
                    <p>(1) By placing the reading zone to an off road section (Sky), one can expect drive to have better reading performance.</p>
                    <p>(2) Dynamic positioning induces extra movement of the text, thus may reduce reading performance.</p>
                    <p>(3) Dynamic positioning can help driver locate the position of the incident faster, resulting in better handover performance.</p>
                    <p>(4) Sentence-by-Sentence content display leads to better reading performance than Paragraph-by-Paragraph display.</p>
                    <p>(5) RSVP content display limits reading comprehension since there is no chance to look back.</p>
                    <p>(6) RSVP display can lead to better handover performance due by limiting gaze.</p>
                  </div>

                  <h2>Experiments</h2>
                  <p>
                    The experiment was conducted in a Unity3D environment. The vehicle can be controlled
                    using a Logitech G29 Steering Wheel Set with pedals and clutch. PS4 style joystick 
                    buttons can be found on the steering wheel and is used to control text movements of 
                    the reader. The design is intended to keep the drivers' hands on the steering wheel even 
                    in automatic driving modes, this way the drivers can immediately gain control of the wheel 
                    upon Handover, hence reducing response time even further. 
                  </p>

                  <h3>The Simulation Environment</h3>
                  <p>
                    The driving environment consisted of a three lane highway in a rural setting with no
                    intersections. A steel beam bridge is included in the scene. Driver's car is driving
                    at approximately 45 miles per hour. Traffic in the opposite lane is presented at a rate
                    of about 1 per minute. A light traffic of non-player vehicles consisting Trucks and
                    four-seat sedans can be seen.
                  </p>

                  <h3>The Reading Task</h3>
                  <p>
                    There are eight distinct reading passages for the eight sessions. Buttons on the
                    steering wheel can be used to control the scrolling of the text. For the word-by-word
                    displays, the participants pressed the same two buttons to adjust update speed.
                    One press increases/decreases the speed by 10 wpm(words per minute). Attention to
                    the reading passages was required as the participant were asked to answer reading
                    comprehension questions at the end of each session.
                  </p>

                  <h3>Handover Scenarios</h3>
                  <p>
                    We have designed several different handover scenarios, all of them are implemented
                    in the same highway terrain mentioned above. The scenarios involves different types
                    of vehicles on different part of the highway.  They are modeled in such a way that
                    they resembles those accidents that do occur in real-world roads.
                  </p>

                  <h3>The Flow</h3>
                  <p>
                    In our design, there are a total of eight different reading methods that we aim to
                    evaluate. We examine each of those representations
                    with a simulation session. Thus, the participants will experience a total of eight
                    handover situations along with eight kinds of reading methods.
                  </p>

                  <p>
                    Ordering of these eight sessions are purely random to avoid performance gain
                    through increasing in mastery of the system. Each session starts in the auto-driving
                    mode with the reading content displayed on the windshield. The auto-driving mode
                    lasted for roughly 1 minute, and a handover scenario would occurred. The screen would
                    flash red with the text "Handover!!" on the center of the screen (see figure 1), and
                    the steering wheel generates haptic feedback to alert the driver to take over the control
                    of the vehicle. 
                  </p>
                  <p>
                    On the position of the incident in the handover scenario, an arrow would
                    appear (see figure 2). The arrow was randomly generated from the four directions of up,
                    down, left and right. The participants had to press the corresponding button on the
                    steering wheel as soon as they identified the location of the incident. 
                    This design helps us record the time each participants requires to locate and identify the incident.
                    Once they successfully pressed the right button, the handover process was completed, 
                    and the auto-pilot mode was disabled. Only then can the participants regain control of the vehicle. 
                    They needed to brake or to accurately steer the wheel to avoid crashing into the accident. 
                    The process is repeated for eight times for each of the reading methods.
                  </p>

                  <CaptionedImage 
                    src={handoverImg} 
                    scale={80}
                    caption="Fig 1. The handover alert scene: Once the incident take place ahead, the screen turns red to alert the participants of the handover"
                  />

                  <CaptionedImage
                    src={arrowImg}
                    scale={80}
                    caption="Fig 2. The response task: After the handover, the participants should press the corresponding arrow button on the steering wheel as soon as they identify the incident."
                  />

                  <h3>Measurements</h3>
                  <p>
                    There are two main metrics to evaluate our research: 
                  </p>
                    
                  <p>
                    <b>Response Behavior: </b> which is defined
                    as the time spent from the handover occurs till the moment the driver pressed the corresponding
                    arrow button. Additionally, to evaluate the driver's behavior after the handover, we kept track
                    of the car trajectory and established a list of unsafe behavior including crashing into the
                    accident car or hitting the guardrail.
                  </p>

                  <p>
                    <b>Reading Performance: </b> In our questionnaire there were several reading comprehension
                    questions, we calculated the accuracy of those questions to know how well the participants
                    understand the reading content displayed on the windshield in the auto-driving mode.
                  </p>

                  <h2>Results (Reading Performance)</h2>

                  <h3>Accuracy of Reading Comprehension Questions</h3>
                  <p>
                    Based on the following tables, we can see that among the display methods, participants show
                    higher comprehension when the content is displayed sentence-by-sentence with an average accuracy
                    of 90.63%, which is significantly higher than the other two.
                  </p>
                  <CaptionedImage
                    src={comprehensionMethods}
                    scale={70}
                    caption="Display method's effects on comnprehension accuracy."
                  />

                  <p>
                    We have also discussed whether dynamic positioning influence the participants reading comprehension.
                    According to the following table, static positioning of the reading zone results in an average
                    accuracy of 85.48%, which is almost 8% higher than dynamic positioning of the reading zone.
                    The result is understandable because moving text is hard to comprehend. However, we can see
                    a significant difference between the static and dynamic content positioning in Paragraph-by-Paragraph content.
                    The participants reported that when there were less content shown, even if they were shifting, they could
                    easily track the content. However, when a long paragraph was displayed at a time, they couldn't focus on the
                    text they were reading when shifting. Thus, the difference in accuracy in other three content display method
                    isn't as significant as in the Paragraph-by-Paragraph content.
                  </p>
                  <CaptionedImage
                    src={comprehensionDisplay}
                    scale={70}
                    caption="Text placement's effects on comnprehension accuracy."
                  />

                  <h3>Reading Comfort</h3>
                  <p>
                    The Off-road positioning was specifically designed to increase reading comfort, because the complexity
                    of the background on-road may effect reading comfort. However, only 20.8% of the participants enjoy
                    this positioning. It turned out that comparing to the complexity of the background, participants
                    still prefer to keep the road traffic in their sight. 
                  </p>
                  <CaptionedImage
                    src={comfortNF}
                    scale={70}
                    caption="On-Road/Off-Road's effects on reading comfort."
                  />

                  <p>
                    Moreover, In our results (see follwing figures),
                    74.4% of the participants perceived the content display method of Sentence-by-Sentence content as pleasant,
                    while only 23.6% and 3.9% enjoyed reading paragraph-by-paragraph content and word-by-word content.
                    This perfectly fits the result of the accuracy in reading comprehension questions, and proven a correlation
                    between both metrics.
                  </p>
                  <p>
                    We have expected that content displayed paragraph-by-paragraph would lead to the best reading performance.
                    However, the accuracy of displaying paragraph-by-paragraph is lower comparing to displaying sentence-by-sentence.
                    Since displaying content paragraph-by-paragraph resembles our reading habit the most, we have suspected that
                    readers can perfectly comprehend the content. Notwithstanding, the participants commented that, if showing
                    too much content at a time, they often lost track when they look back to remind themselves of previous plots.
                    This not only contributes to a lower accuracy, but is also the reason why most of the participants considered
                    the reading experience fair but not pleasant. 
                  </p>
                  <CaptionedImage
                    src={comfortR}
                    scale={70}
                    caption="Display method's effects on reading comfort."
                  />

                  <p>
                    Static and dynamic reading zone positioning also influence reading comfort.
                    In average, 52% of the participants perceived static positioning as pleasant, while,
                    only 34.5% of them enjoy dynamic positioning. This also matches the explanation stated
                    in accuracy of reading comprehension questions section. 
                  </p>
                  <CaptionedImage
                    src={comfortAS}
                    scale={70}
                    caption="Dynamic text placement's effects on reading comfort."
                  />
                  
                  <h3>Reading Speed</h3>
                  <p>
                    The eight reading passage are all of the same length. The reading speed percentage
                    represents the percentage of the passage the participants have read during the experiment.
                    The following table reports the participant's reading speed under different settings.
                    The results corresponds to reading comfort that Sentence-by-Sentence content has the
                    best reading performance, with RSVP content has the poorest. As for the influence on
                    reading zone positioning, dynamic positioning performs slower reading speed which is
                    also plausible because generally we have to pay more attention and time when reading
                    moving text.
                  </p>
                  <CaptionedImage
                    src={speedMethods}
                    scale={70}
                    caption="Display method's effects on reading speed."
                  />
                  <CaptionedImage
                    src={speedDisplay}
                    scale={70}
                    caption="Text placement's effects on reading speed."
                  />

                  <h2>Results (Response Behavior)</h2>

                  <h3>Successful Response Rate</h3>
                  <p>
                    The rate of participants that successfully performed the response task is shown in the following table.
                    In most of the trials, participants are able to successfully perform the correct response task
                    before their vehicles crash, with success rates all exceeding 90%.
                  </p>
                  <p>
                    Still, we can observe that reading methods with dynamic positioning of reading zones generally have
                    a higher success rate. This corresponds with the assumption that dynamic positioned texts boosts
                    a safer handover.
                  </p>
                  <CaptionedImage
                    src={successRate}
                    scale={70}
                    caption="Successful response rate of different reading methods."
                  />

                  <h3>Response Time</h3>
                  <p>
                    The following table/figure depicts the mean response time for each content display method.
                    In some of the trials, the participant failed to press the correct button all the way until
                    they crashed into the accident car. These failed trials will have response time of 3.2 seconds,
                    since the drivers have approximately 3.2 seconds to react until their car crash into the
                    vehicle(s) that caused that handover. However adding this "penalty response time" has caused 
                    the standard deviation to increase by quite a bit. It is worth noting that otherwise the
                    response time are not that scattered.
                  </p>
                  <CaptionedImage
                    src={responseTime}
                    scale={70}
                    caption="Successful response rate of different reading methods (in Seconds)."
                  />
                  <p>
                    Consistent with the trend in Successful Response Rate, average response time decreased by
                    almost 9 percent when dynamic reading zone positioning is used.
                  </p>
                  <p>
                    Across the content display methods, Word-by-Word (RSVP) content has the lowest overall
                    response time. In fact, the best performing reading method has over 30% shorter response
                    time than the worst performing method.
                    Aside from the theorized effect of limiting eye gaze. There are other factors that could
                    contribute to this outcome. Among the participants' feedback, one prevalent response is
                    how difficult reading in RSVP is to them. It is evident that RSVP  is not a very common
                    display method, and for many participants, this is the first time they ever try reading
                    on one. Because of this, many participants anticipated RSVP to be a difficult task, and
                    ends up lowering the RSVP update rate far below average reading speed. The unusually
                    low word count of RSVP display method is an evidence of such effect. At such a low
                    input rate, the reading task became too undemanding. The drivers could then devote more
                    attention on the road condition in between the change of words, hence the lowest response time.
                  </p>
                  <p>
                    Sentence-by-Sentence contents require the longest response time. Coincidently, it is also
                    the display method that enjoys the highest reading comfort, scoring best in all of our metrics.
                    Observing both of these trends, we have theorized that the high reading comfort of the
                    sentence-by-sentence display would prompt the driver into investing too much in the
                    reading task. In fact, it is reasonable to conclude that, the over immersion in the reading
                    experience could make the handover transition slower and more sluggish.
                  </p>

                  <h2>Conclusion and Disscussions</h2>
                  <p>
                    This post is getting a little bit too long, so for those who are interested in the
                    conclusion that we draw and the further disscussions, please take a look at the
                    <a className='text-blue-500 mx-3' href="To_Read_or_to_Take_Over__A_Case_Study_of_Safety_Aware_Reading_Experience_on_Self_Driving_Cars.pdf">manuscript</a>
                    that we had came up with. The paper also contains a lot of detail about the experiment processes
                    that I chose to omit here.
                  </p>

                  <h2>Reflections</h2>
                  <p>
                    This project is the first "formal" research that I did. And looking back on it now,
                    it obviously left a lot to be desired. However, it gave me a hands on experience
                    of the whole process, from formulating the problem, designing the experiment to writing 
                    the manuscript. I learned a lot from it, and I enjoyed every second of it!
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