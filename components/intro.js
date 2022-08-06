export default function Intro() {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <div className='flex-col'>
                <h1 className="mb-8 text-5xl md:text-7xl font-light tracking-normal leading-tight md:pr-8">
                    Hello!
                    <br />
                    I'm Chen-Kang.
                </h1>
            </div>
            <div>
                <h4 className="text-left text-lg text-gray-700">
                    This is a website I use to document the cool stuff I learn and did.
                </h4>
            </div>
        </section>
    )
};
