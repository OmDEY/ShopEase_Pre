import { useState } from 'react';
import { Bars3Icon, XMarkIcon, HomeIcon, UserIcon, Cog6ToothIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-xl font-bold">
            Admin Panel
          </div>

          {/* Navbar Links */}
          {/* <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              <HomeIcon className="inline-block h-6 w-6 mr-1" />
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              <UserIcon className="inline-block h-6 w-6 mr-1" />
              Users
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              <ChartBarSquareIcon className="inline-block h-6 w-6 mr-1" />
              Analytics
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-200">
              <Cog6ToothIcon className="inline-block h-6 w-6 mr-1" />
              Settings
            </a>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition duration-200">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
            <HomeIcon className="inline-block h-6 w-6 mr-1" />
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
            <UserIcon className="inline-block h-6 w-6 mr-1" />
            Users
          </a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
            <ChartBarSquareIcon className="inline-block h-6 w-6 mr-1" />
            Analytics
          </a>
          <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
            <Cog6ToothIcon className="inline-block h-6 w-6 mr-1" />
            Settings
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;