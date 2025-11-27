import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Briefcase, Database, FileText, CreditCard, Receipt,
    HelpCircle, Phone, Menu, Plus, List, ChevronDown, User, Coins
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
    <div className={`flex items-center px-4 py-3 cursor-pointer ${active ? 'bg-green-50 text-green-700 border-l-4 border-green-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
        <Icon className={`w-5 h-5 mr-3 ${active ? 'text-green-600' : 'text-gray-400'}`} />
        <span className="font-medium text-sm flex-1">{label}</span>
        {badge && <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </div>
);

const EmployerDashboard = () => {
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPostJob, setShowPostJob] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) navigate('/login/employer');
                const config = { headers: { 'x-auth-token': token } };

                const userRes = await axios.get('http://localhost:5001/api/users/me', config);
                setUser(userRes.data);

                const jobsRes = await axios.get('http://localhost:5001/api/jobs/employer/jobs', config);
                setJobs(jobsRes.data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const [newJob, setNewJob] = useState({
        title: '', description: '', category: '', location: '', salary: '', type: 'Full-time', requirements: ''
    });

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const requirementsArray = newJob.requirements.split(',').map(req => req.trim());

            await axios.post('http://localhost:5001/api/jobs', { ...newJob, requirements: requirementsArray }, config);

            setShowPostJob(false);
            setNewJob({ title: '', description: '', category: '', location: '', salary: '', type: 'Full-time', requirements: '' });

            // Refresh jobs
            const jobsRes = await axios.get('http://localhost:5001/api/jobs/employer/jobs', config);
            setJobs(jobsRes.data);
        } catch (err) {
            console.error(err);
            alert('Error posting job');
        }
    };

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="h-screen bg-[#f3f4f6] flex overflow-hidden">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:static md:translate-x-0 md:inset-auto md:border-r-0
            `}>
                <div className="h-16 flex items-center px-6 border-b border-gray-200 flex-shrink-0">
                    <span className="text-xl font-bold text-gray-800">apna</span>
                    <span className="text-xl font-bold text-green-600">hire</span>
                </div>

                <div className="flex-1 flex flex-col min-h-0 md:border-r md:border-gray-200">
                    <div className="p-4 flex-shrink-0">
                        <div className="flex items-center gap-3 px-2 py-2 mb-4 bg-gray-900 text-white rounded-lg cursor-pointer">
                            <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center font-bold text-sm">
                                {user?.company?.name?.charAt(0) || 'F'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">{user?.company?.name || 'Company Name'}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <nav className="space-y-1">
                            <SidebarItem icon={Briefcase} label="Jobs" active />
                            <SidebarItem icon={Database} label="Database" />
                            <SidebarItem icon={FileText} label="Reports" />
                            <SidebarItem icon={CreditCard} label="Credits & usage" />
                            <SidebarItem icon={Receipt} label="Billing" />
                        </nav>
                    </div>

                    <div className="p-4 border-t border-gray-100 space-y-1 flex-shrink-0">
                        <SidebarItem icon={HelpCircle} label="Help & Support" />
                        <SidebarItem icon={Phone} label="Contact Sales" badge="Offers" />
                    </div>

                    <div className="p-4 flex-shrink-0">
                        <div className="relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                                Up to 53% OFF
                            </div>
                            <button className="w-full border border-gray-300 bg-white text-gray-700 font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm">
                                <Coins className="w-4 h-4" /> Buy credits
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Bar */}
                <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                            <Coins className="w-4 h-4 text-gray-400" />
                            Available Credits
                        </div>
                        <div className="relative">
                            <div
                                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                {user?.name?.charAt(0) || 'U'}
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
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
                        <button
                            onClick={() => setShowPostJob(true)}
                            className="bg-teal-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center hover:bg-teal-800 transition-colors"
                        >
                            Post a new job <ChevronDown className="w-4 h-4 ml-2" />
                        </button>
                    </div>

                    {jobs.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-4xl mx-auto">
                            <h2 className="text-xl font-bold text-gray-900 mb-12">Post your first job</h2>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                                {/* Option 1 */}
                                <div className="flex flex-col items-center max-w-xs">
                                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                                        <Plus className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Start with blank form</h3>
                                    <p className="text-sm text-gray-500 mb-6">Use our blank form to create your job and fill manually</p>
                                    <button
                                        onClick={() => setShowPostJob(true)}
                                        className="w-full border border-gray-300 text-gray-700 font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Start with blank form
                                    </button>
                                </div>

                                <div className="text-gray-400 font-medium">OR</div>

                                {/* Option 2 */}
                                <div className="flex flex-col items-center max-w-xs">
                                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                                        <List className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">Use a template</h3>
                                    <p className="text-sm text-gray-500 mb-6">Use templates made by apna to save time and hire the right candidates.</p>
                                    <button className="w-full bg-teal-700 text-white font-bold py-2.5 rounded-lg hover:bg-teal-800 transition-colors">
                                        Use a template
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {jobs.map(job => (
                                        <tr key={job._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900 cursor-pointer font-medium">
                                                View Applicants
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>

                {/* Post Job Modal */}
                {showPostJob && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900">Post a New Job</h3>
                                <button onClick={() => setShowPostJob(false)} className="text-gray-400 hover:text-gray-600">
                                    <Plus className="w-6 h-6 rotate-45" />
                                </button>
                            </div>
                            <form onSubmit={handlePostJob} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                        <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" value={newJob.category} onChange={e => setNewJob({ ...newJob, category: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                                        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" value={newJob.salary} onChange={e => setNewJob({ ...newJob, salary: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" value={newJob.type} onChange={e => setNewJob({ ...newJob, type: e.target.value })}>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                                    <textarea required className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent h-32" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })}></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                                    <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent" value={newJob.requirements} onChange={e => setNewJob({ ...newJob, requirements: e.target.value })} />
                                </div>
                                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={() => setShowPostJob(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800">Post Job</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
