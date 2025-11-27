import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapPin, Briefcase, Search } from 'lucide-react';

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState('');
    const [locationSearch, setLocationSearch] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);
                setJobs(res.data);
                setFilteredJobs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const filtered = jobs.filter(job =>
            (job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.employer?.company?.name?.toLowerCase().includes(search.toLowerCase())) &&
            job.location.toLowerCase().includes(locationSearch.toLowerCase())
        );
        setFilteredJobs(filtered);
    }, [search, locationSearch, jobs]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex items-center border rounded px-3 py-2">
                        <Search className="text-gray-400 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by job title or company"
                            className="w-full outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 flex items-center border rounded px-3 py-2">
                        <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full outline-none"
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                    <p className="text-gray-600">{job.employer?.company?.name || 'Company Name'}</p>
                                </div>
                                {job.employer?.company?.logo && (
                                    <img src={job.employer.company.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
                                )}
                            </div>
                            <div className="flex items-center text-gray-500 mb-2 text-sm">
                                <MapPin className="w-4 h-4 mr-1" /> {job.location}
                            </div>
                            <div className="flex items-center text-gray-500 mb-4 text-sm">
                                <Briefcase className="w-4 h-4 mr-1" /> {job.type}
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                <span className="text-primary font-semibold">{job.salary || 'Not disclosed'}</span>
                                <Link to={`/jobs/${job._id}`} className="text-primary hover:underline text-sm font-medium">View Details</Link>
                            </div>
                        </div>
                    ))}
                    {filteredJobs.length === 0 && <p className="text-gray-500 col-span-3 text-center">No jobs found matching your criteria.</p>}
                </div>
            </div>
        </div>
    );
};

export default JobListings;
