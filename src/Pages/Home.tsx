import man from '../assets/man.png';
import food from '../assets/Food.jpg';
import temu from '../assets/temu.jpg';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface formProps {
  name: string,
  email: string,
  message: string
}

function Home() {
  const port = [
    { img: temu, Title: 'temu kind of website', Tech: 'react js', button: 'https://new-ecom-smoky.vercel.app/' },
    { img: food, Title: 'food ordering Website', Tech: 'react js', button: 'https://food-salad.vercel.app/' },
  ];

  const collectiondb = collection(db, 'user');
  const [inputform, setinputForm] = useState<formProps>({
    name: '',
    email: '',
    message: ''
  });

  const [greetings, setGreetings] = useState<string>('');

  const updateInputForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setinputForm((prev) => ({ ...prev, [name]: value }))
  }

  const updateShowInput = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!inputform.name || !inputform.message || !inputform.email) {
        alert('fill all the fields')
        return;
      }
      const qp = query(collectiondb, where('email', '==', inputform.email))
      const getqp = await getDocs(qp)
      if (!getqp.empty) {
        alert('email exists')
        return;
      }

      await addDoc(collectiondb, {
        name: inputform.name,
        email: inputform.email,
        message: inputform.message
      });
      alert('successful send')
      setGreetings('We will reply very soon note the information is saved into firebase')
      setinputForm({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [hash]);

  // ---- AI Chat Implementation ----
  const [chatOpen, setChatOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessageToAI = async () => {
    if (!userMessage.trim()) return;
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ChatAi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      setAiMessages(prev => [
        ...prev,
        { role: 'ai', content: data.reply || 'No reply from AI' },
      ]);
    } catch (err) {
      console.error('Error sending message to AI:', err);
      setAiMessages(prev => [
        ...prev,
        { role: 'ai', content: 'Error: Could not get a response' },
      ]);
    }
    setUserMessage('');
    setLoading(false);
  };

  return (
    <div className="w-full mt-20">
      
      <div className="relative flex flex-col md:flex-row p-5 justify-between items-center mx-auto gap-10 w-full md:w-[80%] h-auto">
        <div className='absolute pointer-events-none z-10 bg-gradient-to-t bottom-0 from-blue-800 to-transparent w-full h-[200px] md:h-[300px] lg:h-[400px]' />
        <div className='flex flex-col  gap-10'>
          <h1>Hi, <span className='text-blue-300'>I’m Seyi Oladimeji </span>👋</h1>
          <p> A Web Developer integrating <span className="font-semibold text-blue-300">AI</span> into modern web experiences.</p>
          <a href='#projects' className="flex items-center justify-center px-6 py-3 h-[50px] bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-300 duration-300 transition">
            View My Work
          </a>
          <div className='relative inline-block'>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="relative z-20 px-6 py-3 border border-blue-300 text-white rounded-xl hover:bg-red-600 hover:text-white duration-300 w-full h-[50px] transition"
            >
              Chat With My AI 🤖
            </button>

            <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-300 to-transparent w-[80%] h-full' />

           {chatOpen && (
               <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[400px] bg-white rounded-xl shadow-lg flex flex-col z-50">
                <div className="p-4 flex-1 flex flex-col gap-2 max-h-80 overflow-y-auto">
                  {aiMessages.map((msg, idx) => (
                    <div key={idx} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
                      {msg.content}
                    </div>
                  ))}
                  {loading && <div className="p-2 bg-gray-100 rounded-lg self-start">AI is typing...</div>}
                </div>

                <form onSubmit={(e) => { e.preventDefault(); sendMessageToAI() }} className="p-2 border-t border-gray-300 flex gap-2">
                  <input
                     value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
                  />
                  <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg">
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        
        <div className='relative w-full md:w-[400px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]'>
          <img src={man} className='object-cover w-full h-full rounded-2xl' />
          <div className='absolute inset-0 rounded-2xl -z-10 bg-gradient-to-b from-blue-300 to-red-500 w-full h-full ' />
        </div>
      </div>

      {/* About Me Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center mx-auto gap-10 p-5 w-full md:w-[80%] h-auto">
        <div className='absolute z-10 bg-gradient-to-r left-0 bottom-0 from-blue-800 to-transparent w-[100px] h-full' />
        <div className='absolute z-10 bg-gradient-to-l right-0 bottom-0 from-blue-800 to-transparent w-[100px] h-full' />
        <div className='w-full min-h-[400px] bg-gradient-to-l pb-4 from-blue-700 to-blue-300 rounded-2xl'>
          <div className='flex flex-col justify-between items-center mx-auto gap-10 p-10'>
            <h1>About Me</h1>
            <p>I’m a passionate Web Developer with a background in Anatomy, blending creativity and logic to build interactive, AI-powered, and scalable digital experiences. I enjoy using tools like React, TypeScript, Tailwind CSS, and Firebase to craft responsive websites that feel alive.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 place-items-center mx-auto p-2 gap-4 '>
            <div className='mx-10 w-full p-4 h-[150px] bg-gradient-to-l from-blue-800 to-blue-400 rounded-xl'>
              <div className='flex flex-col p-4 gap-4'>
                <h3>💻 Frontend Development</h3>
                <p>Creating responsive, interactive user interfaces with React and Tailwind CSS.</p>
              </div>
            </div>
            <div className='mx-10 w-full p-4 h-[150px] bg-gradient-to-l from-blue-800 to-blue-400 rounded-xl'>
              <div className='flex flex-col p-4 gap-4'>
                <h3>⚙️ AI Integration</h3>
                <p>Building smart features powered by OpenAI and Firebase for real-time engagement.</p>
              </div>
            </div>
            <div className='mx-10 w-full p-4 h-[150px] bg-gradient-to-l from-blue-800 to-blue-400 rounded-xl'>
              <div className='flex flex-col p-4 gap-4'>
                <h3>☁️ Firebase Backend</h3>
                <p>Secure authentication, hosting, and database management with Firebase.</p>
              </div>
            </div>
            <div className='mx-10 w-full p-4 h-[150px] bg-gradient-to-l from-blue-800 to-blue-400 rounded-xl'>
              <div className='flex flex-col p-4 gap-4'>
                <h3>🎨 Creative Design</h3>
                <p>Translating ideas into visually appealing and user-friendly interfaces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative flex flex-col items-center justify-center w-full md:w-[80%] mx-auto mt-16 px-4 md:px-8 py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 opacity-90 rounded-3xl shadow-2xl min-h-[300px] md:min-h-[400px]" />
        <h2 id='projects' className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          My <span className="text-red-400">Projects</span>
        </h2>
        <h3 className="text-white mb-6">Some of my works</h3>
        <div className="flex flex-row md:flex-wrap overflow-x-auto md:overflow-visible scrollbar-hide justify-start md:justify-center gap-8 w-full">
          {port.map((item, index) => (
            <div key={index} className="group flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 w-[270px] sm:w-[300px] md:w-[330px] overflow-hidden">
              <div className="relative rounded-t-2xl overflow-hidden">
                <img
                  src={item.img}
                  alt={item.Title}
                  className="object-cover w-full h-[180px] md:h-[220px] transform group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="flex flex-col p-5 gap-3 text-white text-center">
                <h3 className="text-lg md:text-xl font-semibold tracking-wide">{item.Title}</h3>
                <p className="text-sm md:text-base text-gray-200 italic">{item.Tech}</p>
                <a
                  href={item.button}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-gradient-to-r from-red-500 to-blue-600 hover:from-blue-600 hover:to-red-500 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>



{/* Tech Stack Section */}
<div className="w-full md:w-[80%] py-16 min-h-[400px] bg-gradient-to-r from-red-900 via-blue-700 to-blue-800 text-white flex flex-col mx-auto mt-5 items-center rounded-2xl">
  <h2 className="text-3xl font-bold mb-8 text-center">Tech Stack</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-center">
    {[
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg" },
    ].map((skill, index) => (
      <div
        key={index}
        className="flex flex-col items-center bg-white/5 p-5 rounded-2xl hover:bg-white/10 transition duration-300"
      >
        <img src={skill.icon} alt={skill.name} className="w-12 h-12 mb-3" />
        <p className="font-medium">{skill.name}</p>
      </div>
    ))}
  </div>
</div>

{/* Experience & Education Section */}
<div className="w-full md:w-[80%] mx-auto mt-5 py-16 min-h-[450px] bg-gradient-to-l from-gray-700 via-red-800 to-blue-600 text-white flex flex-col items-center rounded-2xl">
  <h2 className="text-3xl font-bold mb-10 text-center">Experience & Education</h2>
  <div className="flex flex-col md:flex-row gap-10 w-[90%] md:w-[80%]">
    {/* Experience */}
    <div className="flex-1">
      <h3 className="text-2xl font-semibold mb-4 text-blue-400">Experience</h3>
      <div className="space-y-6">
        <div className="bg-white/5 p-5 rounded-2xl">
          <h4 className="font-semibold text-lg">Frontend Developer (Freelance)</h4>
          <p className="text-gray-300 text-sm">Crytotec Events • Jan 2025 – Present</p>
          <ul className="list-disc list-inside text-gray-400 mt-2 text-sm">
            <li>Built and deployed responsive websites with React and Tailwind CSS.</li>
            <li>Focused on creating smooth user experiences and modern interfaces.</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Education */}
    <div className="flex-1">
      <h3 className="text-2xl font-semibold mb-4 text-blue-400">Education</h3>
      <div className="bg-white/5 p-5 rounded-2xl">
        <h4 className="font-semibold text-lg">B.Tech in Anatomy</h4>
        <p className="text-gray-300 text-sm">Ladoke Akintola University of Technology • 2019 – 2024</p>
        <p className="text-gray-400 text-sm mt-2">
          Gained analytical and research skills, now applied to structured problem-solving in software development.
        </p>
      </div>
    </div>
  </div>
</div>

{/* Contact Section */}
<div className="relative flex flex-col items-center justify-center w-full md:w-[80%] mx-auto py-20 px-6 md:px-10 min-h-[500px] bg-gradient-to-r from-red-600 via-blue-700 to-blue-900 text-white rounded-t-3xl mt-16">
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contact Me</h2>
  <p className="text-center text-gray-200 max-w-xl mb-10">
    Interested in working together or have a question? Feel free to reach out.
  </p>

  {/* Contact Form */}
  <form onSubmit={updateShowInput} className="w-full md:w-[70%] lg:w-[50%] bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg space-y-5">
    <input
      onChange={updateInputForm}
      name='name'
      value={inputform.name}
      type="text"
      placeholder="Your Name"
      className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-white transition"
    />
    <input
      onChange={updateInputForm}
      name='email'
      value={inputform.email}
      required
      type="email"
      placeholder="Your Email"
      className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-white transition"
    />
    <textarea
      onChange={updateInputForm}
      name='message'
      value={inputform.message}
      placeholder="Your Message"
      rows={5}
      className="w-full p-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-white transition"
    ></textarea>

    <button
      type="submit"
      className="w-full py-3 bg-gradient-to-r from-red-500 to-blue-600 hover:from-blue-600 hover:to-red-500 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Send Message
    </button>
    <p className="text-gray-400 text-sm mt-2">{greetings}</p>
  </form>

  {/* Social Links */}
  <div className="flex gap-6 mt-10">
    <a href="https://github.com/crytotec" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
      <FaGithub className='hover:text-red-400'/>
    </a>
    <a href="https://linkedin.com/crytotec" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
      <FaLinkedin className='hover:text-red-400'/>
    </a>
    <a href="mailto:seyioladimeji790@gmail.com" className="hover:scale-110 transition">
      <FaEnvelope className='hover:text-red-400'/>
    </a>
  </div>
</div>
    </div>
  )
}

export default Home;
