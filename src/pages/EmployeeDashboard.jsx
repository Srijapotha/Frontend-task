import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search, MapPin, Briefcase, ChevronDown, Bell, MessageSquare,
    Filter, X, ChevronRight, Download, Star, CheckCircle, Clock
} from 'lucide-react';

const DashboardNavbar = ({ user }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-primary leading-none">apna</span>
                                <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 mt-0.5 rounded-full"></div>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center space-x-6">
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Jobs <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Job Prep <span className="ml-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                            </button>
                            <button className="text-gray-700 font-medium text-sm hover:text-primary">
                                Contests
                            </button>
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Degree <span className="ml-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                            </button>
                            <button className="text-gray-700 font-medium text-sm flex items-center hover:text-primary">
                                Resume Tools <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer border border-gray-200 rounded-full px-2 py-1 hover:bg-gray-50"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <img
                                src="https://placehold.co/100x100/3b82f6/ffffff?text=BV"
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'User'}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const FilterSidebar = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-700" />
                    <h3 className="font-bold text-gray-900">Filters (3)</h3>
                </div>
                <button className="text-sm text-gray-500 hover:text-primary font-medium">Clear all</button>
            </div>

            {/* Selected Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    3 years <X className="w-3 h-3 ml-1 cursor-pointer" />
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    Intermediate English <X className="w-3 h-3 ml-1 cursor-pointer" />
                </span>
            </div>

            {/* Experience Slider */}
            <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-sm">Experience</h4>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">1</span>
                </div>
                <p className="text-xs text-gray-500 mb-3">Your work experience</p>
                <div className="relative h-2 bg-blue-100 rounded-full mb-2">
                    <div className="absolute left-0 top-0 h-full bg-teal-700 rounded-full" style={{ width: '10%' }}></div>
                    <div className="absolute top-1/2 -translate-y-1/2 left-[10%] w-4 h-4 bg-teal-700 rounded-full border-2 border-white shadow cursor-pointer">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-teal-800 text-white text-xs px-2 py-1 rounded">3</div>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>0 years</span>
                    <span>31 years</span>
                </div>
            </div>

            {/* Date Posted */}
            <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-900 text-sm">Date posted</h4>
                    <ChevronDown className="w-4 h-4 text-gray-400 rotate-180" />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border-2 border-teal-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        <span className="text-sm text-gray-600">Last 24 hours</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        <span className="text-sm text-gray-600">Last 3 days</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        <span className="text-sm text-gray-600">Last 7 days</span>
                    </label>
                </div>
            </div>

            {/* Distance */}
            <div className="mb-2">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-900 text-sm">Distance</h4>
                    <ChevronDown className="w-4 h-4 text-gray-400 rotate-180" />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border-2 border-teal-600 flex items-center justify-center">
                            <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        <span className="text-sm text-gray-600">Within 5 km</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                        <span className="text-sm text-gray-600">Within 10 km</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

const JobCard = ({ job }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg border border-gray-100 p-1 flex items-center justify-center bg-white shadow-sm">
                        <img
                            src={job.employer?.company?.logo || "https://placehold.co/48x48/png?text=L"}
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.employer?.company?.name || 'Company Name'}</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {job.location}
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-700">₹ {job.salary}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {job.type}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Min. 2 years
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Good (Intermediate / Advanced)
                </span>
            </div>
        </div>
    );
};

const EmployeeDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };

                const userRes = await axios.get('http://localhost:5001/api/users/me', config);
                setUser(userRes.data);

                const jobsRes = await axios.get('http://localhost:5001/api/jobs');
                setJobs(jobsRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <DashboardNavbar user={user} />

            {/* Search Bar Strip */}
            <div className="bg-white border-b border-gray-200 py-4 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <Search className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Frontend Developer"
                                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full text-sm"
                            />
                            <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                        <div className="w-48 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="3 years"
                                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full text-sm"
                            />
                            <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                        </div>
                        <div className="flex-[1.5] flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="HSR Layout, Bengaluru/Bangalore"
                                className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-full text-sm"
                            />
                        </div>
                        <button className="bg-teal-700 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-teal-800 transition-colors">
                            Search jobs
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Showing {jobs.length} jobs based on your filters</h2>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Filters */}
                    <div className="col-span-3">
                        <FilterSidebar />
                    </div>

                    {/* Center - Job List */}
                    <div className="col-span-6 space-y-4">
                        {jobs.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-3 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 relative">
                                <img
                                    src="https://placehold.co/100x100/3b82f6/ffffff?text=BV"
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                                />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{user?.name || 'BANDARU VENKATESH'}</h3>
                            <p className="text-gray-500 text-sm mb-1">Frontend Developer</p>
                            <p className="text-gray-400 text-xs mb-4">VHypotenuse Private Limited</p>
                            <button className="w-full border border-teal-600 text-teal-700 font-bold py-2 rounded-lg hover:bg-teal-50 transition-colors text-sm">
                                Update profile
                            </button>
                        </div>

                        {/* Track Applications */}
                        <div className="bg-[#dcfce7] rounded-xl p-6 flex justify-between items-center">
                            <div>
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 text-teal-700 shadow-sm">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h4 className="text-teal-900 font-medium text-sm">Track your</h4>
                                <h3 className="text-teal-900 font-bold text-lg">Job Applications</h3>
                            </div>
                            <button className="bg-teal-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center hover:bg-teal-800">
                                Track <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>

                        {/* Download App */}
                        <div className="bg-[#fdf4ff] rounded-xl p-6 border border-purple-100">
                            <h3 className="text-purple-900 font-bold text-lg mb-4">Download Apna App</h3>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-center text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    Unlimited job applications
                                </li>
                                <li className="flex items-center text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    Connect with HRs, directly
                                </li>
                                <li className="flex items-center text-xs text-gray-600">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    Track your Applications
                                </li>
                            </ul>
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-1 text-purple-700 font-bold text-xl">
                                    <Star className="w-5 h-5 fill-purple-700" /> 4.7
                                </div>
                                <img
                                    src="https://placehold.co/60x100/3b82f6/ffffff?text=Phone"
                                    alt="App"
                                    className="h-20 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
