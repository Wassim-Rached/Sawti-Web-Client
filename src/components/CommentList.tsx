// CommentList.tsx
import { Comment } from "@/types"; // Import Comment type
import { CommentCard } from "./CommentCard"; // Import CommentCard component

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
};
