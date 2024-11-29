export type Candidate = {
  _id: string;
  firstName: string;
  lastName: string;
  party: string;
  biography: string;
  program: string;
  profilePicture: string;
};

// {
//   content: { type: String, required: true },
//   account: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Account",
//     required: true,
//   },
//   candidate: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Candidate",
//     required: true,
//   },
// },
// { timestamps: true }

export type Account = {
  _id: string;
  cin: string;
  firstName: string;
  lastName: string;
  password: string;
  votedFor: string;
  favorites: string[];
};

export type Comment = {
  _id: string;
  content: string;
  account: Account;
};
