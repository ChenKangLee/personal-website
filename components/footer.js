import Container from './container'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className='flex-row'>
          <div className="py-28 flex flex-col lg:flex-row items-center">
            <div className='w-1/5'>
              <Image 
                src='/assets/img/profile.jpg'
                className='rounded-full'
                width={150}
                height={150}
              />
            </div>
            <div className='w-4/5 flex-col text-left mx-10 mb-10'>
              <h3 className="text-4xl font-semibold tracking-tighter leading-tight mb-5">
                About me.
              </h3>
              <p>
                I'm currently a master's student in Computer Science and Engineering at UC San Diego.
                I plan on graduating in December of 2022 and am actively looking for software engineering
                and machine learning positions in the United States.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
              <a
                href="/assets/pdf/curriculum_vitae.pdf"
                className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              >
                Resume
              </a>
              <a
                href={`https://www.linkedin.com/in/chen-kang-lee-64058a18b/`}
                className="mx-3 font-bold hover:underline"
              >
                Linkedin
              </a>
              <a
                href={`https://github.com/ChenKangLee`}
                className="mx-3 font-bold hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className='text-center italic font-light text-gray-400 my-3'>
            This website is heavily inspired by the Next.js "blog starter" layout
          </div>
        </div>
      </Container>
    </footer>
  )
}
