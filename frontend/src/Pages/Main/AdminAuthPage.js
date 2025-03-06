import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin, adminRegister } from '../../services/api';
import { useContext } from 'react';
import { SearchContext } from '../../Context/ContextProvider';

// Move the Input component outside of the AdminAuthPage component
const Input = ({ name, label, type = 'text', value, onChange, placeholder, required = true, ...props }) => (
    <div>
        <label className="block text-gray-600 font-semibold">{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder={placeholder}
            required={required}
            {...props}
        />
    </div>
);

const AdminAuthPage = () => {

    const { isAdmin, setIsAdmin } = useContext(SearchContext);

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        // role: '',
        securityQuestion: '',
        securityAnswer: '',
        companyName: '',
        address: '',
        agreeToTerms: false,
        captchaResponse: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAuth = async (e) => {
        e.preventDefault();

        if (!isLogin && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const { confirmPassword, agreeToTerms, ...adminData } = formData;

        try {
            const response = isLogin
                ? await adminLogin(formData.email, formData.password) // Pass arguments separately
                : await adminRegister(formData);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            setIsAdmin(true);
            toast.success(isLogin ? 'Logged in successfully' : 'Admin Signed Up successfully');
            navigate('/admin/adminDashboard');
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || 'An error occurred');
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: isLogin ? 20 : -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="bg-white shadow-lg rounded-2xl p-10 max-w-5xl w-full"
            >
                <h2 className="text-4xl font-bold text-center mb-6 text-purple-600">
                    {isLogin ? 'Welcome Back Admin!' : 'Admin Sign Up'}
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    {isLogin
                        ? 'Login to access the admin dashboard.'
                        : 'Sign up to become an admin and manage the system.'}
                </p>

                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className={`grid ${isLogin ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}
                >
                    {!isLogin && (
                        <>
                            <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
                            <Input name="username" label="Username" value={formData.username} onChange={handleChange} placeholder="Choose a username" />
                            <Input name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your phone number" />
                            {/* <Input name="role" label="Role" value={formData.role} onChange={handleChange} placeholder="Enter admin role (e.g., Super Admin)" /> */}
                            <Input name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} placeholder="Enter your company name" />

                            <div>
                                <label className="block text-gray-600 font-semibold">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Enter your address"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-semibold">Security Question</label>
                                <select
                                    name="securityQuestion"
                                    value={formData.securityQuestion}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                >
                                    <option value="">Select a security question</option>
                                    <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                                    <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                                    <option value="What is the name of the city where you were born?">What is the name of the city where you were born?</option>
                                </select>
                                <Input name="securityAnswer" label="Security Answer" value={formData.securityAnswer} onChange={handleChange} placeholder="Enter the answer to the security question" />
                            </div>
                            <Input name="captchaResponse" label="Captcha" value={formData.captchaResponse} onChange={handleChange} placeholder="Enter CAPTCHA response" />
                        </>
                    )}
                    <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
                    <Input name="password" label="Password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                    {!isLogin && <Input name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />}

                    {!isLogin && (
                        <div className="mt-6 flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-600"
                            />
                            <label className="text-sm text-gray-600">I agree to the terms and conditions</label>
                        </div>
                    )}
                    <br />


                </motion.form>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all block mx-auto"
                    onClick={handleAuth}
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </motion.button>

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleAuthMode}
                        className="text-purple-600 hover:underline"
                    >
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminAuthPage;