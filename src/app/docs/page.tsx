"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

const DocsPage: React.FC = () => {
  const [markdown, setMarkdown] = React.useState<string>("");

  React.useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch("/docs/readme.md");
        const data = await response.text();
        setMarkdown(data);
      } catch (err) {
        console.error("Error fetching markdown file:", err);
      }
    };

    fetchMarkdown();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
