import { Account } from "@/types";

interface ProfileInfoProps {
  account: Account;
  setIsEditing: (editing: boolean) => void;
}

const ProfileInfoCard = ({ account, setIsEditing }: ProfileInfoProps) => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-gray-500">First Name:</p>
        <p className="text-lg font-semibold text-gray-700">
          {account.firstName}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Last Name:</p>
        <p className="text-lg font-semibold text-gray-700">
          {account.lastName}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">CIN:</p>
        <p className="text-lg font-semibold text-gray-700">{account.cin}</p>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="w-full py-2 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileInfoCard;
