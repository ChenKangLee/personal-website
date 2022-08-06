import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../../components/container'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'

import markdownStyles from '../../styles/markdown-styles.module.css'
import CaptionedImage from '../../components/captionedImage'
import InstanceName from '../../public/assets/blog/airflow/instance_name.png'
import EditImg from '../../public/assets/blog/airflow/edit.png'
import MetaImg from '../../public/assets/blog/airflow/metadata.png'

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
                <title>Airflow</title>
                <meta property="og:image" />
              </Head>
              <PostHeader
                title='Running Commands on Google Compute Engine Using Apache Airflow'
                coverImage='/assets/img/tower.jpg'
                date='2022-07-16T05:35:07.322Z'
                photoDescription='Somewhere in Taichung. Shot with Pentax KX and Agfa APX 400.'
              />
              <div className="max-w-2xl mx-auto text-justify">
                <div className={markdownStyles['markdown']}>
                  <p>
                      This'll probably be a short one.
                  </p>

                  <p>
                      I was implementing an Apache Airflow DAG to automate the execution of 
                      machine learning models on Google Compute Engine instances, out team decided
                      that a command sent to the instance via a SSH connection is the easiest way
                      to do this. However, I was having trouble establishing the connection, and
                      the official documentation didn't provide too much help.
                  </p>

                  <p>
                      I eventually was able to get things to work by piecing together informations
                      from several StackOverflow posts. I thought I'll create this page so that
                      whoever would need to implement the same feature could save some headache.
                  </p>

                  <h2>On The Airflow Side</h2>
                  <p>
                      We are mainly relying on two Airflow operators: <code> SSHOperator() </code>
                      and <code>ComputeEngineSSHHook()</code>. To run a command via SSH, you would
                      need to setup the operator like this:
                  </p>

                  <pre>
                    <code>
                        {`
    <name of task> = SSHOperator(
        task_id="<descriptive name for the UI>",
        ssh_hook=ComputeEngineSSHHook(
            instance_name='<GCE instance name>',
            zone='<zone the machine is in>', // e.g. 'us-east4-c'
            project_id=<GCP project id>,
            use_oslogin=True,                // IMPORTANT
            use_iap_tunnel=False
        ),
        command="<some command>",
        dag=dag
    )`}
                    </code>
                  </pre>

                  <p>
                      Note that we are setting <code> use_oslogin </code> to <code> True </code> here.
                      You can leave the rest of the parameter to use the default value.
                  </p>

                  <h2>On the Compute Engine Side</h2>
                  <p>
                      The thing that you really need to pay attention to is to set a custom
                      metadata field "enable-oslogin" when you are creating the instance.
                  </p>

                  <p>
                      You could also change this value after the machine is created. To do this, open the
                      dashboard for the Google Compute Instances and click on the instance you wish to
                      connect to.
                  </p>
                  <CaptionedImage src={InstanceName} />

                  <p>Then click the "Edit" button on the top.</p>
                  <CaptionedImage src={EditImg} />

                  <p>
                    Then scroll down to the metadata section and add the key "use_oslogin", 
                    and set the value to "True".
                  </p>
                  <CaptionedImage src={MetaImg} />

                  <p>
                    With these, you should be able to run ssh commands from your Airflow DAGs!
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