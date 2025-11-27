import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const LoginEmployer = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        companyName: ''
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login/employer', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userType', 'employer');
            navigate('/employer/dashboard');
        } catch (err) {
            console.error(err);
            alert('Invalid Credentials');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/register/employer', registerData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userType', 'employer');
            navigate('/employer/dashboard');
        } catch (err) {
            console.error(err);
            alert('Registration Failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {isRegistering ? 'Employer Registration' : 'Employer Login'}
                        </h2>
                    </div>

                    {!isRegistering ? (
                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Sign in
                                </button>
                            </div>
                            <div className="text-center">
                                <button type="button" onClick={() => setIsRegistering(true)} className="text-primary hover:underline text-sm">
                                    Don't have an account? Register
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                        value={registerData.name}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Company Name"
                                        value={registerData.companyName}
                                        onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    Register
                                </button>
                            </div>
                            <div className="text-center">
                                <button type="button" onClick={() => setIsRegistering(false)} className="text-primary hover:underline text-sm">
                                    Already have an account? Login
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginEmployer;
