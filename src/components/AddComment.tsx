import { useAuth } from "@/context/AuthContext";
import { addCommentOnCandidate } from "@/services/candidates";
import React, { useState } from "react";

interface AddCommentProps {
  candidateId: string;
  onCommentAdded: () => void;
}

const AddComment: React.FC<AddCommentProps> = ({
  candidateId,
  onCommentAdded,
}) => {
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addCommentOnCandidate(candidateId, comment);
      onCommentAdded();
      setComment("");
    } catch (error) {
      console.error(error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="p-4 rounded-md">
        <p className="text-sm font-medium text-gray-700">
          You need to be logged in to add a comment.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white  rounded-md"
    >
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Add Comment:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={handleInputChange}
          rows={2}
          cols={50}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddComment;
