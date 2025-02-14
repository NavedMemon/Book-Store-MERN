import React from "react";
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left Side - Branding & Navigation */}
          <div className="md:w-1/3 w-full">
            <img src={footerLogo} alt="Bookstore Logo" className="mb-5 w-40" />
            <p className="text-gray-400 text-sm mb-4">
              "A reader lives a thousand lives before he dies." - Explore our world of books.
            </p>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li><a href="/books" className="hover:text-primary">Books</a></li>
              <li><a href="/categories" className="hover:text-primary">Categories</a></li>
              <li><a href="/about" className="hover:text-primary">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Middle Section - Newsletter */}
          <div className="md:w-1/3 w-full">
            <h3 className="text-lg font-semibold mb-3">Stay Updated!</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest book releases, discounts, and special offers.
            </p>
            <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white outline-none"
              />
              <button className="bg-primary px-6 py-2 text-white font-semibold hover:bg-primary-dark">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="md:w-1/3 w-full text-center md:text-right">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <p className="text-gray-400 text-sm mb-4">Stay connected on social media.</p>
            <div className="flex justify-center md:justify-end gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <FaFacebook size={28} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <FaTwitter size={28} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Bookstore. All Rights Reserved.</p>
            <ul className="flex gap-6 mt-4 md:mt-0">
              <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
