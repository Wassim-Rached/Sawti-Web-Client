import { Comment } from "@/types";
import { CommentCard } from "./CommentCard";
import { useEffect, useState, useCallback } from "react";
import { getCandidateComments } from "@/services/candidates";
import AddComment from "./AddComment";

type CommentListProps = {
  candidateId: string;
};

export const CommentList = ({ candidateId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const refreshComments = useCallback(async () => {
    const comments = await getCandidateComments(candidateId);
    setComments(comments);
  }, [candidateId]);

  useEffect(() => {
    refreshComments();
  }, [candidateId, refreshComments]);

  const onCommentAdded = () => {
    refreshComments();
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 p-4 bg-white shadow-md rounded-lg">
      <AddComment candidateId={candidateId} onCommentAdded={onCommentAdded} />
      <div className="mt-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};
