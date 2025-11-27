import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Briefcase, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType'); // 'employee' or 'employer'
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        navigate('/');
    };

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="flex flex-col items-center justify-center bg-white rounded border border-gray-200 p-1">
                                <span className="text-xl font-bold text-primary leading-none">Job</span>
                                <span className="text-xs font-bold text-orange-500 leading-none">Chaahiye</span>
                                <div className="w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 mt-0.5"></div>
                            </div>
                        </Link>
                        <div className="hidden md:flex md:space-x-6">
                            <div className="relative group">
                                <button className="text-dark hover:text-primary text-sm font-medium flex items-center">
                                    Find Jobs <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                            <div className="relative group">
                                <button className="text-dark hover:text-primary text-sm font-medium flex items-center">
                                    Career Compass <ChevronDown className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                            <Link to="#" className="text-dark hover:text-primary text-sm font-medium">Blog</Link>
                        </div>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {!token ? (
                            <>
                                <Link to="/login/employer" className="bg-blue-50 text-primary px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-100 transition-colors">
                                    Employer Login
                                </Link>
                                <Link to="/login/employee" className="bg-primary text-white px-8 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors">
                                    Login
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to={userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard'} className="text-dark hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-light">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-primary hover:bg-gray-50">Find Jobs</Link>
                        <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-primary hover:bg-gray-50">Career Compass</Link>
                        <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-primary hover:bg-gray-50">Blog</Link>
                        {!token && (
                            <div className="mt-4 space-y-2">
                                <Link to="/login/employer" className="block w-full text-center px-4 py-2 rounded-md bg-blue-50 text-primary font-medium hover:bg-blue-100">Employer Login</Link>
                                <Link to="/login/employee" className="block w-full text-center px-4 py-2 rounded-md bg-primary text-white font-medium hover:bg-blue-700">Login</Link>
                            </div>
                        )}
                        {token && (
                            <>
                                <Link to={userType === 'employer' ? '/employer/dashboard' : '/employee/dashboard'} className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-primary hover:bg-gray-50">Dashboard</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
