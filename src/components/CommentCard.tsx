// CommentCard.tsx
import { Comment } from "@/types"; // Import Comment type
import Image from "next/image"; // For Avatar Image

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { content, account } = comment;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-3xl mx-auto">
      <div className="flex items-start space-x-4">
        {/* Avatar Section */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src="https://i.pinimg.com/564x/3b/27/a8/3b27a87fcf7d90ae564be23d7a37f778.jpg" // Replace with actual avatar URL
            alt={`${account.firstName} ${account.lastName} avatar`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        {/* Commenter Info Section */}
        <div className="flex flex-col">
          <div className="font-semibold text-gray-900 text-lg">
            {account.firstName} {account.lastName}
          </div>
          <div className="text-sm text-gray-500">2 hours ago</div>{" "}
          {/* You can replace with actual time */}
        </div>
      </div>

      {/* Comment Content Section */}
      <p className="text-gray-800 mt-4">{content}</p>
    </div>
  );
};
