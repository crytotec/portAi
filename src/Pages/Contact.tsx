import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, type FormEvent } from "react";
import { db } from "../firebaseConfig";


interface formProps{
    name: string;
    email:string;
    message:string;
}
function Contact() {
     const [formInput, setFormInput]=useState<formProps>(
        {
            name:'',
            email:'',
            message:''
        }
     )

     const [message, setMessage]=useState<string>('')


     const updateInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value}=e.target;
        setFormInput((prev)=>({...prev, [name]:value}))
     }

     const UpdateShowInput = async (e:FormEvent) =>{
          e.preventDefault();
          if (!formInput.name || !formInput.email || !formInput.message) {
              alert('fill all the fields')
          }

          const qp=query(collection(db, 'user'), where('email', '==',formInput.email))
           const qpset=await getDocs(qp)
           if (!qpset.empty) {
            alert('email exist')
            return;
           }

            await addDoc(collection(db, 'user'),{
              name:formInput.name,
              message:formInput.message,
              email:formInput.email
            })
            alert('submitted successful')
            setMessage('Note data is save to firebase')
            setFormInput({
            name:'',
            email:'',
            message:''
        })
          
     }

  return (
    <section
      className="px-6 py-12 mt-10 bg-gray-100 text-gray-800 flex flex-col items-center"
    >
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>

        <h5 className="text-lg text-center mb-8">
          Have a project in mind or want to collaborate?  
          Feel free to reach out — I’d love to hear from you!
        </h5>

        {/* Contact Form */}
        <form onSubmit={UpdateShowInput}
          className="space-y-4 bg-white p-6 rounded-2xl shadow-md"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              onChange={updateInput}
              value={formInput.name}
              type="text"
              name="name"
              id="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              onChange={updateInput}
              value={formInput.email}
              type="email"
              name="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message
            </label>
            <textarea
               onChange={updateInput}
              value={formInput.message}
              name="message"
              id="message"
              rows={5}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Send Message
          </button>
          <h4>{message}</h4>
        </form>

        {/* Contact Info */}
        <div className="text-center mt-10">
          <h4 className="text-gray-600">Or email me directly at:</h4>
          <a
            href="mailto:seyioladimeji790@gmail.com"
            className="text-blue-600 font-medium hover:underline"
          >
            seyioladimeji790@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
