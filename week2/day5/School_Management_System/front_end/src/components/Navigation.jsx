import React, { useState } from "react";
import { Menu, X, Search } from "lucide-react";

const SearchBar = ({ value, onChange, className }) => (
  <div className={`relative ${className}`}>
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
    />
  </div>
);

const Navigation = ({ currentPage, onPageChange, searchTerm, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "students", label: "Students" },
    { id: "teachers", label: "Teachers" },
    { id: "courses", label: "Courses" },
    { id: "grades", label: "Grades" },
  ];

  const handleNavClick = (page) => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo + Desktop nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">SchoolMS</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`${
                    currentPage === item.id
                      ? "bg-indigo-100 text-indigo-700 rounded-md px-3 py-2"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md px-3 py-2"
                  } text-sm font-medium transition-colors duration-200`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center">
            <SearchBar value={searchTerm} onChange={onSearchChange} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`${
                currentPage === item.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Search */}
          <div className="px-3 py-2">
            <SearchBar value={searchTerm} onChange={onSearchChange} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
