import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Initialize the map when the component is mounted
        const map = L.map('map').setView([12.9716, 77.5946], 13); // Center on Bangalore with zoom level 13
      
        // Add OpenStreetMap tile layer (free and open source)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      
        // Add a marker at the center of Bangalore
        const marker = L.marker([12.9716, 77.5946]).addTo(map)
          .bindPopup('Bangalore')
          .openPopup();
      
        // Cleanup function to remove the map on unmount
        return () => {
          map.remove();
        };
      }, []);

    return (
        <div>
            <section className="text-white body-font bg-blue-600 min-h-screen flex items-center">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font text-5xl sm:text-6xl mb-6 font-extrabold leading-tight">
                            Let's Make <br /> Bangalore Pothole-Free
                        </h1>
                        <p className="mb-8 leading-relaxed text-lg size-lg max-w-lg">
                            Join our community initiative to improve road safety and quality.
                            Report potholes, track repairs, and make a difference in your neighborhood.
                        </p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" onClick={() => { navigate("/report"); }}>
                                <span>⚠️</span> Report Pothole
                            </button>
                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" onClick={() => { navigate("/leaderboard"); }}>
                                <span>🏆</span> View leaderboard
                            </button>
                        </div>
                    </div>
                    <div className="lg:max-w-md lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="https://www.attorneystevelee.com/wp-content/uploads/2024/02/A-POTHOLE-CAN-DAMAGE-YOUR-VEHICLE-YOUR-PASSENGERS-AND-YOU.png" />
                    </div>
                </div>
            </section>

           
            <section className="w-full bg-white py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Current Pothole Reports</h2>
                        <div id="map" className="w-full h-[500px] rounded-lg shadow-lg"></div>
                </div>
            </section>


            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h2 className="text-4xl text-blue-600 tracking-widest font-medium title-font mb-1">HOW IT WORKS</h2>
                        <h1 className="sm:text-md text-2xl font-medium title-font text-gray-900">Simple steps to report potholes and help improve our roads</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 md:w-1/3 mb-8">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin h-6 w-6">
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">Report a Pothole</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">Take a photo, mark the location, and submit a report. It only takes a minute.</p>
                                    <a className="mt-3 text-indigo-500 inline-flex items-center" onClick={() => { navigate("/report") }}>Learn More
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 mb-8">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bar-chart h-6 w-6"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">Track Progress</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">Follow the status of your reported potholes and see when they get fixed.</p>
                                    <a className="mt-3 text-indigo-500 inline-flex items-center" onClick={() => { navigate("/dashboard") }}>Learn More
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 mb-8">
                            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-award h-6 w-6"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                                    </div>
                                    <h2 className="text-gray-900 text-lg title-font font-medium">Earn Recognition</h2>
                                </div>
                                <div className="flex-grow">
                                    <p className="leading-relaxed text-base">Get points and badges for your contributions to making Bangalore better.</p>
                                    <a className="mt-3 text-indigo-500 inline-flex items-center" onClick={() => { navigate("/leaderboard") }}>Learn More
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-white body-font">
                <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center bg-blue-600 ">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-extrabold text-white">
                            Ready to contribute?
                            <br className="hidden lg:inline-block" />
                            <span className="block text-blue-200 font-semibold">
                                Start by reporting your first pothole today.
                            </span>
                        </h1>
                    </div>
                    <div className="md:w-1/2 w-full flex justify-center md:justify-end">
                        <button className="inline-flex text-blue-600 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-blue-100 rounded text-lg font-medium" 
                            onClick={(e)=>{navigate("/report")}}>
                                Get Started
                        </button>
                    </div>
                </div>
            </section>


    

        </div>
    );
};
