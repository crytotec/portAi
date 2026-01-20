import man from '../assets/man.png';
import food from '../assets/Food.jpg';
import temu from '../assets/temu.jpg';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

interface FormProps {
  name: string;
  email: string;
  message: string;
}

function Home() {
  const port = [
    { img: temu, Title: 'Temu Website', Tech: 'React Tsx', button: 'https://new-ecom-smoky.vercel.app/' },
    {img: food, Title: 'Food Ordering Website', Tech: 'React Tsx', button: 'https://food-salad.vercel.app/' },
    {img: food, Title: 'Food Tutorial Website', Tech: 'React JS', button: 'https://meal-food-livid.vercel.app' },
  ];

  const collectiondb = collection(db, 'user');
  const [inputForm, setInputForm] = useState<FormProps>({ name:'', email:'', message:'' });
  const [greetings, setGreetings] = useState<string>('');

  const updateInputForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  }

  const updateShowInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputForm.name || !inputForm.email || !inputForm.message) {
      alert('Fill all fields');
      return;
    }
    const qp = query(collectiondb, where('email', '==', inputForm.email));
    const qpset = await getDocs(qp);
    if (!qpset.empty) {
      alert('Email exists');
      return;
    }

    await addDoc(collectiondb, {
      name: inputForm.name,
      email: inputForm.email,
      message: inputForm.message
    });
    alert('Submitted successfully');
    setGreetings('We will reply very soon. Your information is saved in Firebase.');
    setInputForm({ name:'', email:'', message:'' });
  }

  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  // ---- AI Chat ----
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
      const data = await response.json();
      setAiMessages(prev => [...prev, { role: 'ai', content: data.reply || 'No reply from AI' }]);
    } catch (err) {
       console.error(err); 
      setAiMessages(prev => [...prev, { role: 'ai', content: 'Error: Could not get a response' }]);
    }
    setUserMessage('');
    setLoading(false);
  };

  // ---- Scroll to Projects ----
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="w-full bg-black text-white font-sans">

      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col md:flex-row p-5 justify-between items-center mx-auto gap-10 w-full md:w-[80%] h-auto mt-20">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hi, <span className="text-purple-400">I’m Seyi Oladimeji</span> 👋
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            A Web Developer integrating <span className="font-semibold text-purple-400">AI</span> into modern web experiences.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button onClick={scrollToProjects} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow hover:opacity-90 transition">View My Work</button>
            <button onClick={() => setChatOpen(!chatOpen)} className="px-6 py-3 border border-purple-400 rounded-xl hover:bg-purple-700 hover:text-white transition">Chat With My AI 🤖</button>
          </div>

          {/* AI Chat */}
          {chatOpen && (
            <div className="mt-4 w-[90vw] max-w-[400px] bg-gray-900 rounded-xl shadow-lg flex flex-col z-50 relative">
              <div className="p-4 flex-1 flex flex-col gap-2 max-h-80 overflow-y-auto">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`p-2 rounded-lg ${msg.role==='user'?'bg-purple-800 self-end':'bg-gray-700 self-start'}`}>{msg.content}</div>
                ))}
                {loading && <div className="p-2 bg-gray-700 rounded-lg self-start">AI is typing...</div>}
              </div>
              <form onSubmit={e=>{e.preventDefault(); sendMessageToAI()}} className="p-2 border-t border-gray-600 flex gap-2">
                <input value={userMessage} onChange={e=>setUserMessage(e.target.value)} placeholder="Type your message..." className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none"/>
                <button className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg">Send</button>
              </form>
            </div>
          )}
        </div>

        <div className="relative w-full md:w-[400px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
          <img src={man} className="object-cover w-full h-full rounded-2xl" />
          <div className="absolute inset-0 rounded-2xl -z-10 bg-gradient-to-b from-gray-900 via-purple-900 to-pink-800 w-full h-full"/>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 h-auto py-12 mt-10 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
          <p className="text-lg leading-relaxed text-center text-gray-300">
            Hello! I'm <span className="font-semibold text-purple-400">Seyi Oladimeji</span>, a passionate <span className="font-semibold">web developer</span> with a background in <span className="font-semibold">Anatomy</span> from Ladoke Akintola University of Technology. I specialize in modern, responsive, user-friendly websites using <span className="font-semibold">React.js</span>, <span className="font-semibold">Tailwind CSS</span>, and <span className="font-semibold">JavaScript</span>.
          </p>
          <p className="text-lg leading-relaxed text-center text-gray-300">
            My goal is to combine creativity and functionality to build web experiences that look great and perform exceptionally. I love transforming ideas into digital products and continuously learning new technologies.
          </p>
          <div className="flex justify-center cursor-pointer gap-4 mt-4">
            <button onClick={scrollToProjects} className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition">View My Projects</button>
            <a href="#contact"><div className="px-5 py-2 border border-purple-600 text-purple-400 rounded-lg hover:bg-gray-800 transition">Contact Me</div></a>
          </div>
        </div>
      </section>

     {/* Projects Section */}
<section id="projects" className="py-16 px-6 md:px-10 bg-gray-900 text-white">
  <h2 className="text-3xl font-bold text-center mb-10 text-purple-400">My Projects</h2>
  <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8">
    {port.map((item, idx) => (
      <div key={idx} className="bg-gray-800/70 rounded-2xl shadow-lg hover:shadow-2xl w-full md:w-[300px] p-6 flex flex-col gap-3 text-center">
        <h3 className="text-lg md:text-xl font-semibold">{item.Title}</h3>
        <p className="text-gray-300 italic">{item.Tech}</p>
        <a href={item.button} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-medium py-2 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
          Visit Project
        </a>
      </div>
    ))}
  </div>
</section>

      {/* Education Section */}
      <section id="education" className="px-6 py-12 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-400">Education</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-gray-800/70 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-purple-300">Ladoke Akintola University of Technology (LAUTECH)</h4>
            <h5 className="text-gray-300 mt-2">B.Tech in Anatomy — Graduated: 2024</h5>
            <p className="text-gray-400 mt-2">Gained a solid foundation in human anatomy and scientific analysis, while developing problem-solving and critical thinking skills that support creativity and logic in web development.</p>
          </div>
          <div className="bg-gray-800/70 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-purple-300">Web Development Certifications</h4>
            <h5 className="text-gray-300 mt-2">React.js, Tailwind CSS, JavaScript — Ongoing / 2024</h5>
            <p className="text-gray-400 mt-2">Focused on building interactive, responsive, visually appealing UIs with clean code and great UX.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-12 bg-gray-900 text-white flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-400">Contact Me</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl">Have a project in mind or want to collaborate? Feel free to reach out — I’d love to hear from you!</p>

        <form onSubmit={updateShowInput} className="space-y-4 w-full md:w-[70%] lg:w-[50%] bg-gray-800/70 p-6 md:p-8 rounded-2xl shadow-lg">
          <input onChange={updateInputForm} value={inputForm.name} name="name" type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"/>
          <input onChange={updateInputForm} value={inputForm.email} name="email" type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"/>
          <textarea onChange={updateInputForm} value={inputForm.message} name="message" placeholder="Your Message" rows={5} className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"></textarea>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg font-medium hover:opacity-90 transition">Send Message</button>
/          {greetings && <p className="mt-2 text-gray-300">{greetings}</p>}
        </form>

        <div className="text-center mt-10">
          <h4 className="text-gray-500">Or email me directly at:</h4>
          <a href="mailto:seyioladimeji790@gmail.com" className="text-purple-400 hover:underline font-medium">seyioladimeji790@gmail.com</a>
        </div>
      </section>

      {/* Footer / Social */}
      <footer className="w-full py-8 bg-gray-900 flex justify-center gap-6 text-white">
        <a href="https://github.com/crytotec" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400"><FaGithub size={24}/></a>
        <a href="https://linkedin.com/crytotec" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400"><FaLinkedin size={24}/></a>
        <a href="mailto:seyioladimeji790@gmail.com" className="hover:text-purple-400"><FaEnvelope size={24}/></a>
      </footer>
    </div>
  );
}

export default Home;
