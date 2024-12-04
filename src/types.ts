export type Candidate = {
  _id: string;
  firstName: string;
  lastName: string;
  party: string;
  biography: string;
  program: string;
  profilePicture: string;
};

export type Account = {
  _id: string;
  cin: string;
  firstName: string;
  lastName: string;
  password: string;
  favorites: Candidate[];
};

export type Comment = {
  _id: string;
  content: string;
  account: Account;
  createdAt: Date;
  updatedAt: Date;
};
