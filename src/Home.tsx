import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="text-xl font-bold text-gray-600">[ Logo ]</div>
        <h1 className="text-2xl font-bold text-gray-800">Land Acquisition Portal</h1>
      </header>

      <nav className="bg-green-800 text-white p-3 flex gap-6 px-8 shadow-md">
        <a href="#home" className="hover:text-green-300">Home</a>
        <a href="#about" className="hover:text-green-300">About Us</a>
        <a href="#dashboard" className="hover:text-green-300">Dashboard</a>
        <a href="#contact" className="hover:text-green-300">Contact</a>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row">
        <div id="home" className="md:w-[70%] relative flex items-center justify-center overflow-hidden min-h-[500px]">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="/images/background-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          <h2 className="relative z-10 text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg px-4">
            Transforming Infrastructure
          </h2>
        </div>

        <div className="md:w-[30%] bg-gray-100 flex items-center justify-center p-6 border-l border-gray-300">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">Login</h3>
            <input type="text" placeholder="Username" className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
            <input type="password" placeholder="Password" className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600" />
            <div className="h-14 bg-gray-200 border border-gray-300 border-dashed mb-6 flex items-center justify-center text-gray-500 rounded">
              [ Captcha Placeholder ]
            </div>
            <button type="button" className="w-full bg-green-700 text-white font-bold py-3 rounded hover:bg-green-800 transition">
              Sign In
            </button>
          </div>
        </div>
      </main>

      <footer id="contact" className="bg-gray-900 text-gray-400 text-center p-4 text-sm">
        <p>&copy; 2026 Land Acquisition &amp; Govt Projects. All rights reserved.</p>
      </footer>
    </div>
  );
}
