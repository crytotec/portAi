function Education() {
  return (
    <section
      id="education"
      className="px-6 h-auto py-12 mt-10 bg-gray-300 text-gray-800 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Education</h2>

        <div className="space-y-6">
          {/* University */}
          <div className="bg-gray-50 h-auto  md:h-[200px] p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700">
              Ladoke Akintola University of Technology (LAUTECH)
            </h4>
            <h5 className="text-gray-700 mt-2">
              <span className="font-medium">Bachelor of Technology (B.Tech)</span> in Anatomy
            </h5>
            <h5 className="text-gray-500 text-sm mt-1">Graduated: 2024</h5>
            <h5 className="mt-3 text-gray-600">
              Gained a solid foundation in human anatomy and scientific analysis, 
              while developing strong problem-solving and critical thinking skills 
              that now support my creativity and logic in web development.
            </h5>
          </div>

          {/* Web Development Certifications */}
          <div className="bg-gray-50 h-auto  md:h-[200px] p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700">
              Front-End Web Development Certifications
            </h4>
            <h5 className="text-gray-700 mt-2">
              Courses on <span className="font-medium">React.js, Tailwind CSS, and JavaScript</span>
            </h5>
            <h5 className="text-gray-500 text-sm mt-1">Completed: Ongoing / 2024</h5>
            <h5 className="mt-3 text-gray-600">
              Focused on building interactive, responsive, and visually appealing user interfaces, 
              with an emphasis on clean code and great user experience.
            </h5>
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default Education;
