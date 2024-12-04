import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">© 2024 Tunisia Voting. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact Us
          </a>
          <a href="/docs" className="hover:text-gray-400">
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
