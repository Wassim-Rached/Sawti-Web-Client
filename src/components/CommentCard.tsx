import { Comment } from "@/types";
import Image from "next/image";

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  const { content, account } = comment;

  return (
    <div className=" p-3 rounded-lg">
      <div className="flex items-start space-x-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src="https://i.pinimg.com/564x/3b/27/a8/3b27a87fcf7d90ae564be23d7a37f778.jpg"
            alt={`${account.firstName} ${account.lastName} avatar`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <div className="font-semibold text-gray-900 text-lg">
            {account.firstName} {account.lastName}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
            {new Date(comment.createdAt).toLocaleDateString() !==
              new Date().toLocaleDateString() && (
              <span> - {new Date(comment.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-800 mt-4 ml-4">{content}</p>
    </div>
  );
};
