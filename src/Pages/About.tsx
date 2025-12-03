import { Link, useNavigate} from "react-router-dom";

function About() {
    const navigate=useNavigate()

    const SetNav = () =>{
        navigate('/#projects')
    }
  return (
    <section id="about" className="px-6 h-auto py-12 mt-10 bg-gray-300 text-gray-800">
      <div className="flex flex-col h-auto md:h-[500px]  max-w-4xl  mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
        <h5 className="text-lg leading-relaxed text-center mb-8">
          Hello! I'm <span className="font-semibold text-blue-600">Seyi Oladimeji</span>, 
          a passionate <span className="font-semibold">web developer</span> with a background 
          in <span className="font-semibold">Anatomy</span> from Ladoke Akintola University of Technology.
          I specialize in creating modern, responsive, and user-friendly websites using 
          technologies like <span className="font-semibold">React.js</span>, <span className="font-semibold">Tailwind CSS</span>, 
          and <span className="font-semibold">JavaScript</span>.
        </h5>

        <h5 className="text-lg leading-relaxed text-center mb-8">
          My goal is to combine creativity and functionality to build web experiences 
          that not only look good but also perform exceptionally well. I love transforming ideas 
          into digital products and continuously learning new technologies to stay ahead in the field.
        </h5>

        <div className="flex justify-center cursor-pointer gap-4">
          <div onClick={SetNav}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            View My Projects
          </div>
          <Link to='/contact'>
          <div
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Contact Me
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;
