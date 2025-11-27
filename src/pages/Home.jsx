import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Search, MapPin, Briefcase, User, ChevronDown, Bookmark, Code, UserCheck, Rocket, Headphones, Quote, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const TestimonialCard = ({ testimonial, isActive }) => {
    return (
        <div
            className={`w-full bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 md:p-8 relative transition-all duration-700 flex-shrink-0 ${isActive ? 'shadow-2xl border-b-4 border-blue-600 md:scale-105 z-10 opacity-100' : 'shadow-sm border border-gray-100 hover:shadow-md md:scale-90 opacity-50 md:blur-[1px]'}`}
        >
            <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-100 fill-gray-100" />

            <div className="relative z-10">
                <h3 className="text-blue-500 font-semibold text-base sm:text-lg mb-4 sm:mb-6">{testimonial.title}</h3>
                <p className="text-gray-500 text-sm sm:text-sm leading-relaxed mb-6 sm:mb-8">
                    {testimonial.text}
                </p>

                <div className="flex items-center gap-3 sm:gap-4">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover bg-gray-200 rounded-full flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-dark text-sm sm:text-base md:text-lg truncate">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm truncate">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TestimonialCarousel = () => {
    const testimonials = [
        {
            id: 1,
            title: "Amazing Service",
            text: "More than just a job portal - it's a community. The forum where you can connect with other job seekers and advice. It's been really helpful for me.",
            name: "Shivam Malhotra",
            role: "Marketing Intern",
            image: "https://placehold.co/70x70/cccccc/ffffff?text=SM"
        },
        {
            id: 2,
            title: "Secure and Updated",
            text: "I was hesitant to use online job portals at first, but Job Chaahiye changed my mind. They have a very secure platform, and I feel confident about my data being protected. Plus, the job listings are always up-to-date.",
            name: "Sunita Devi",
            role: "Teacher",
            image: "https://placehold.co/410x500/b0b0b0/ffffff?text=SD"
        },
        {
            id: 3,
            title: "Life Saver",
            text: "Job Chaahiye was a lifesaver when I was looking. The platform is so easy to use and I found tons of opportunities in my field. I landed my dream job thanks to them!",
            name: "Priya Sharma",
            role: "Marketing Specialist",
            image: "https://placehold.co/70x70/e0e0e0/ffffff?text=PS"
        },
        {
            id: 4,
            title: "Great Opportunities",
            text: "I found my current job within a week of signing up. The filters are amazing and helped me narrow down exactly what I was looking for.",
            name: "Rahul Verma",
            role: "Software Engineer",
            image: "https://placehold.co/70x70/999999/ffffff?text=RV"
        },
        {
            id: 5,
            title: "User Friendly",
            text: "The interface is so clean and easy to navigate. I love the dashboard features for tracking my applications.",
            name: "Anita Desai",
            role: "HR Manager",
            image: "https://placehold.co/70x70/bbbbbb/ffffff?text=AD"
        },
        {
            id: 6,
            title: "Highly Recommended",
            text: "Best job portal I've used in India. The verified recruiters give me peace of mind.",
            name: "Vikram Singh",
            role: "Sales Executive",
            image: "https://placehold.co/70x70/dddddd/ffffff?text=VS"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [cardsPerView, setCardsPerView] = useState(3);

    // Update cards per view based on screen size
    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 640) {
                setCardsPerView(1); // Mobile: 1 card
            } else if (window.innerWidth < 1024) {
                setCardsPerView(2); // Tablet: 2 cards
            } else {
                setCardsPerView(3); // Desktop: 3 cards
            }
        };

        updateCardsPerView();
        window.addEventListener('resize', updateCardsPerView);
        return () => window.removeEventListener('resize', updateCardsPerView);
    }, []);

    // Clone first items to append to end for infinite scroll effect
    const extendedTestimonials = [...testimonials, ...testimonials.slice(0, cardsPerView)];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => prev + 1);
        }, 5000); // Slower scroll (5s)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (currentIndex === testimonials.length) {
            // Reset to 0 without transition after animation completes
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 700); // Match transition duration
        } else if (currentIndex === 0) {
            // Re-enable transition if it was disabled
            setIsTransitioning(true);
        }
    }, [currentIndex, testimonials.length]);

    // Ensure transition is re-enabled after the snap-back
    useEffect(() => {
        if (!isTransitioning) {
            // Force reflow/next tick to re-enable transition
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    return (
        <div className="w-full mb-12">
            <div className="overflow-hidden w-full py-6 sm:py-8 md:py-10 px-4 sm:px-0"> {/* Responsive padding for shadow/scale space */}
                <div
                    className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                >
                    {extendedTestimonials.map((testimonial, index) => (
                        <div key={index} className={`${cardsPerView === 1 ? 'w-full' : cardsPerView === 2 ? 'w-1/2' : 'w-1/3'} flex-shrink-0 ${cardsPerView === 1 ? 'px-0' : 'px-1 sm:px-2 md:px-4'}`}>
                            <TestimonialCard
                                testimonial={testimonial}
                                isActive={index === Math.floor(currentIndex + cardsPerView / 2)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-12 px-4">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setIsTransitioning(true);
                            setCurrentIndex(i);
                        }}
                        className={`h-2 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${(currentIndex % testimonials.length) === i ? 'w-8 sm:w-10 bg-blue-600' : 'w-2 sm:w-3 bg-blue-200'
                            }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);
                // Ensure res.data is an array before calling slice
                if (Array.isArray(res.data)) {
                    setJobs(res.data.slice(0, 6)); // Show top 6 jobs
                } else {
                    console.warn('API response is not an array:', res.data);
                    setJobs([]); // Set empty array as fallback
                }
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setJobs([]); // Set empty array on error
            }
        };
        fetchJobs();
    }, []);

    const [typingText, setTypingText] = useState('Data Analytics');

    useEffect(() => {
        const words = ['Data Analytics', 'Product Management', 'Web Development', 'Digital Marketing'];
        let i = 0;
        let j = 0;
        let currentWord = '';
        let isDeleting = false;

        const type = () => {
            currentWord = words[i];
            if (isDeleting) {
                setTypingText(currentWord.substring(0, j - 1));
                j--;
                if (j === 0) {
                    isDeleting = false;
                    i++;
                    if (i === words.length) i = 0;
                }
            } else {
                setTypingText(currentWord.substring(0, j + 1));
                j++;
                if (j === currentWord.length) {
                    isDeleting = true;
                }
            }
            setTimeout(type, isDeleting ? 100 : 200);
        };
        const timer = setTimeout(type, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#f0f5f7] py-16 md:py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 text-left mb-12 md:mb-0 z-20">
                        <h2 className="text-2xl md:text-4xl font-medium text-dark mb-3 leading-tight">
                            Meticulously Handpicked <span className="text-primary border-b-2 border-primary">{typingText}<span className="animate-pulse">|</span></span> Jobs
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">India's #1 Job Platform</h3>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-dark mb-8 tracking-tight leading-none">
                            Your Job Search Ends <span className="text-primary">Here!</span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 font-medium">Find Jobs, Employment & Career Opportunities</p>

                        <div className="bg-white rounded-xl p-2 shadow-xl flex flex-col md:flex-row items-center max-w-2xl border border-gray-100">
                            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 w-full">
                                <Search className="text-gray-400 w-5 h-5 mr-3" />
                                <input type="text" placeholder="Job title, keywords, or company" className="w-full outline-none text-dark placeholder-gray-400 bg-transparent text-sm font-medium" />
                            </div>
                            <div className="flex-1 flex items-center px-4 py-3 w-full">
                                <MapPin className="text-gray-400 w-5 h-5 mr-3" />
                                <input type="text" placeholder="City or postcode" className="w-full outline-none text-dark placeholder-gray-400 bg-transparent text-sm font-medium" />
                            </div>
                            <button className="bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full md:w-auto mt-2 md:mt-0 shadow-md">
                                Find Jobs
                            </button>
                        </div>


                    </div>

                    <div className="w-full md:w-1/2 relative flex justify-end">
                        {/* Hero Image */}
                        <div className="relative z-10 w-full max-w-lg">
                            <img src="/assets/hero-image.png" alt="Job Search" className="w-full object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>

                {/* Recent Interview Ticker - Full Width */}
                <div className="mt-12 w-full overflow-hidden relative z-20">
                    <div className="flex space-x-6 animate-marquee whitespace-nowrap">
                        {[
                            { name: 'Kajal Mandloi', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
                            { name: 'Anil Kumar', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
                            { name: 'Sita Verma', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
                            { name: 'Rahul Singh', img: 'https://randomuser.me/api/portraits/men/12.jpg' },
                            { name: 'Priya Sharma', img: 'https://randomuser.me/api/portraits/women/22.jpg' },
                            { name: 'Kajal Mandloi', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
                            { name: 'Anil Kumar', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
                            { name: 'Sita Verma', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
                            { name: 'Rahul Singh', img: 'https://randomuser.me/api/portraits/men/12.jpg' },
                            { name: 'Priya Sharma', img: 'https://randomuser.me/api/portraits/women/22.jpg' }
                        ].map((person, index) => (
                            <div key={index} className="bg-white rounded-full px-5 py-3 shadow-md border border-gray-100 inline-flex items-center flex-shrink-0">
                                <img src={person.img} alt="User" className="w-8 h-8 rounded-full mr-3 border-2 border-green-100" />
                                <span className="text-sm text-gray-600 font-medium whitespace-nowrap"><strong>{person.name}</strong> has fixed an interview</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popular Searches */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Title Box */}
                    <div className="flex items-center justify-center md:justify-start p-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
                            Popular<br />Searches on <br /><span className="text-primary">Job Chaahiye</span>
                        </h2>
                    </div>

                    {[
                        { title: 'Jobs for Freshers', img: '/assets/freshers.png', id: 1, color: 'orange' },
                        { title: 'Work from home Jobs', img: '/assets/wfh.png', id: 2, color: 'purple' },
                        { title: 'Part time Jobs', img: '/assets/part-time.png', id: 3, color: 'red' },
                        { title: 'Jobs for Women', img: '/assets/women.png', id: 4, color: 'emerald' },
                        { title: 'International Jobs', img: '/assets/international.png', id: 5, color: 'blue' }
                    ].map((item, index) => {
                        const colorClasses = {
                            orange: { hoverBorder: 'hover:border-orange-500', hoverBg: 'hover:bg-orange-50', button: 'group-hover:bg-orange-600 group-hover:text-white', title: 'group-hover:text-orange-600' },
                            purple: { hoverBorder: 'hover:border-purple-500', hoverBg: 'hover:bg-purple-50', button: 'group-hover:bg-purple-600 group-hover:text-white', title: 'group-hover:text-purple-600' },
                            red: { hoverBorder: 'hover:border-red-500', hoverBg: 'hover:bg-red-50', button: 'group-hover:bg-red-600 group-hover:text-white', title: 'group-hover:text-red-600' },
                            emerald: { hoverBorder: 'hover:border-emerald-500', hoverBg: 'hover:bg-emerald-50', button: 'group-hover:bg-emerald-600 group-hover:text-white', title: 'group-hover:text-emerald-600' },
                            blue: { hoverBorder: 'hover:border-blue-500', hoverBg: 'hover:bg-blue-50', button: 'group-hover:bg-blue-600 group-hover:text-white', title: 'group-hover:text-blue-600' }
                        };
                        const colors = colorClasses[item.color];

                        return (
                            <div key={index} className={`bg-white rounded-3xl border border-gray-100 p-6 relative overflow-hidden group transition-all duration-300 h-72 flex flex-col justify-between ${colors.hoverBorder} ${colors.hoverBg} hover:shadow-xl`}>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">TRENDING AT #{item.id}</span>
                                    <h3 className={`text-xl j text-blue-600 mt-2 relative z-10 cursor-pointer transition-colors ${colors.title}`}>{item.title}</h3>
                                </div>

                                {/* Watermark Text */}
                                <div className="absolute top-16 left-0 text-8xl font-black uppercase leading-none select-none pointer-events-none text-outline opacity-10 group-hover:opacity-20 transition-opacity">
                                    {item.title.split(' ')[0]}
                                </div>

                                <div className="flex justify-between items-end relative z-20 mt-auto">
                                    <button className={`text-sm font-bold text-blue-600 mb-2 px-4 py-2 rounded-full transition-all ${colors.button}`}>
                                        View all
                                    </button>
                                    <img src={item.img} alt={item.title} className="w-40 h-40 object-cover rounded-full -mb-10 -mr-10 transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Featured Jobs */}
            <div className="bg-[#f0f6ff] py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-dark mb-4">Featured Jobs</h2>
                        <p className="text-gray-500">Know your worth and find the job that qualify your life</p>

                        <div className="flex justify-center gap-4 mt-8 flex-wrap">
                            {['All', 'Trending', 'Design', 'Marketing', 'Health'].map((tab, i) => (
                                <button key={tab} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${i === 1 ? 'bg-primary text-white shadow-md' : 'bg-[#e2eaf8] text-gray-600 hover:bg-white'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.isArray(jobs) && jobs.length > 0 ? (
                            jobs.slice(0, 6).map((job, index) => (
                                <Link to={`/jobs/${job._id}`} key={job._id || index} className="block bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group relative">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${['bg-blue-600', 'bg-pink-500', 'bg-green-500', 'bg-black', 'bg-red-500', 'bg-orange-500'][index % 6]}`}>
                                            {job.employer?.company?.name?.charAt(0) || 'C'}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-dark mb-1">{job.title}</h3>
                                            <div className="flex items-center text-xs text-gray-500 gap-4 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Briefcase className="w-3 h-3" />
                                                    {job.employer?.company?.name || 'Company'}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {job.location || 'Remote'}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-primary">
                                            <Bookmark className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="px-4 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                                            {job.type || 'Full Time'}
                                        </span>
                                        <span className={`px-4 py-1 rounded-full text-xs font-semibold ${index % 2 === 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                            {job.salary ? `$${job.salary}` : 'Negotiable'}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 text-gray-500">
                                No jobs found. Please check back later.
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Load More Listing
                        </button>
                    </div>


                </div>
            </div>

            {/* Popular Job Categories */}
            <div className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-dark mb-4">Popular Job Categories</h2>
                        <p className="text-gray-500">2020 jobs live - 293 added today.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 w-full mb-12">

                    <div className="flex gap-6 animate-marquee w-max hover:[animation-play-state:paused]">
                        {[
                            { title: 'Development', positions: 12, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Human Resource', positions: 55, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Automotive Jobs', positions: 2, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Customer Service', positions: 2, icon: Headphones, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Health and Care', positions: 25, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Project Management', positions: 92, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Marketing', positions: 18, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            // Duplicate for seamless loop
                            { title: 'Development', positions: 12, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Human Resource', positions: 55, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Automotive Jobs', positions: 2, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Customer Service', positions: 2, icon: Headphones, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Health and Care', positions: 25, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Project Management', positions: 92, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Marketing', positions: 18, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                        ].map((cat, index) => (
                            <div key={index} className="w-[300px] bg-white border border-blue-100 rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer group flex-shrink-0">
                                <div className={`w-12 h-12 rounded-md ${cat.bg} flex items-center justify-center ${cat.color} group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-dark text-base">{cat.title}</h3>
                                    <p className="text-gray-500 text-xs">({cat.positions} open positions)</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second Row - Left to Right */}
                    <div className="flex gap-6 animate-marquee-reverse w-max hover:[animation-play-state:paused]">
                        {[
                            { title: 'Design', positions: 42, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Sales', positions: 15, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Finance', positions: 8, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Engineering', positions: 34, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Teaching', positions: 12, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Medical', positions: 45, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Construction', positions: 7, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                            // Duplicate for seamless loop
                            { title: 'Design', positions: 42, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Sales', positions: 15, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Finance', positions: 8, icon: User, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Engineering', positions: 34, icon: Code, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Teaching', positions: 12, icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Medical', positions: 45, icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-600' },
                            { title: 'Construction', positions: 7, icon: Rocket, bg: 'bg-blue-50', color: 'text-blue-600' },
                        ].map((cat, index) => (
                            <div key={index} className="w-[300px] bg-white border border-blue-100 rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer group flex-shrink-0">
                                <div className={`w-12 h-12 rounded-md ${cat.bg} flex items-center justify-center ${cat.color} group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-dark text-base">{cat.title}</h3>
                                    <p className="text-gray-500 text-xs">({cat.positions} open positions)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <button className="inline-flex items-center text-primary font-bold border border-blue-200 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                            View All <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-12 sm:py-16 md:py-20 bg-[#f8faff] overflow-hidden">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 sm:mb-4 px-2 sm:px-0">Testimonials From Our Customers</h2>
                        <p className="text-gray-500 text-sm sm:text-base px-4 sm:px-0">Don't trust us right away, see what our customers have to say!</p>
                    </div>
                </div>

                <TestimonialCarousel />
            </div>

            {/* Want To Hire Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#e9f2ff] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
                        {/* Image Side */}
                        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                            <img
                                src="/src/assets/hire-people.png"
                                alt="Professionals"
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full object-contain object-bottom"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2 p-12 text-center md:text-center">
                            <h2 className="text-4xl font-bold text-blue-600 mb-6">Want To Hire</h2>
                            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
                                Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
                            </p>
                            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                                Post a Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Links Section */}
            <div className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Find Jobs */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Find Jobs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Agra</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Ahmedabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Ahmednagar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Ajmer</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Aligarh</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Amritsar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Asansol</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Aurangabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Bareilly</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Belagavi</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Bengaluru</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Jobs in Bhavnagar</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Start Hiring */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Start Hiring</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Agra</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Ahmedabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Ahmednagar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Ajmer</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Aligarh</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Amritsar</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Asansol</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Aurangabad</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Bareilly</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Belagavi</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Bengaluru</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Hire in Bhavnagar</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Popular Jobs */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Popular Jobs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Delivery Person Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Accounts / Finance Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Sales (Field Work)</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Human Resource</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Backoffice Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Business Development</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Telecaller / BPO</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Work from Home Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Part Time Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Full Time Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Night Shift Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Freshers Jobs</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Jobs by Department */}
                    <div className="mb-10 border-b border-gray-200 pb-10">
                        <h3 className="text-lg font-bold text-[#1e293b] mb-6">Jobs by Department</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8 text-gray-500 text-sm mb-6">
                            <a href="#" className="hover:text-blue-600 transition-colors">Admin / Back Office / Computer Operator Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Advertising / Communication Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Aviation & Aerospace Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Banking / Insurance / Financial Services Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Beauty, Fitness & Personal Care Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Construction & Site Engineering Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Consulting Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Content, Editorial & Journalism Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">CSR & Social Service Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Customer Support Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Data Science & Analytics Jobs</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Delivery / Driver / Logistics Jobs</a>
                        </div>
                        <div className="text-center">
                            <button className="text-blue-600 font-medium text-sm inline-flex items-center hover:text-blue-700 transition-colors">
                                View More <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>

                    {/* Main Footer Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                        <div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-6">Links</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Download Job Chaahiye App</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Free Job Alerts</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Vulnerability Disclosure Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">International Jobs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-6">Legal</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">User Terms & Conditions</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Employer Terms of Service</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Employer FAQs</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Community Guidelines</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#1e293b] mb-6">Resources</h3>
                            <ul className="space-y-3 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-blue-600 transition-colors">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-[#1a1a2e] text-white pt-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">

                    {/* Social Media */}
                    <div className="flex flex-col items-start gap-6">
                        <div className="flex items-center gap-3 bg-white rounded-lg px-3 py-1">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                            <div className="flex flex-col">
                                <span className="text-blue-600 font-bold text-lg leading-none">Job</span>
                                <span className="text-orange-500 font-bold text-xs leading-none tracking-widest">Chaahiye</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Follow us on social media</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                                <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a1a2e] hover:bg-blue-600 hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
                            </div>
                        </div>
                    </div>

                    {/* App Download */}
                    <div className="bg-white text-[#1a1a2e] p-6 rounded-2xl flex items-center gap-6 shadow-lg max-w-md w-full md:w-auto">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Apply on the go</h3>
                            <p className="text-gray-600 text-sm mb-4">Get real time job updates on our App</p>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Get it on Google Play"
                                className="h-10 cursor-pointer"
                            />
                        </div>
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://jobchaahiye.com"
                            alt="QR Code"
                            className="w-24 h-24"
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs mb-4">
                    <p>© 2024 Job Chaahiye | All rights reserved</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                    </div>
                </div>

                {/* Tricolor Strip */}
                <div className="w-full h-2 flex">
                    <div className="w-1/3 bg-[#FF9933]"></div>
                    <div className="w-1/3 bg-white"></div>
                    <div className="w-1/3 bg-[#138808]"></div>
                </div>
            </div>
            < button className="fixed bottom-8 right-8 w-10 h-10 bg-blue-100 text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-50 shadow-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ChevronDown className="w-5 h-5 rotate-180" />
            </button >
        </div >

    );
};

export default Home;
