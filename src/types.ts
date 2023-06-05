export interface StudyPath {
  id?: string;
  name?: string;
  level?: string;
  topic?: string;
  studyRoutes?: StudyRoute[];
}

export interface StudyRoute {
  id?: string;
  name?: string;
  vocabs?: StudyCard[];
  sentences?: StudyCard[];
  imageFile?: any;
}

export interface StudyCard {
  id?: string;
  meaning?: string;
  display?: string;
  example?: string;
  type?: StudyCardType;
  imageFile?: any;
  audio?: any;
}

export interface Student {
  id: string;
  checkinDays: [];
  routes: [];
  name?: string;
  email?: string;
  gender?: string;
  birthday?: Date;
  bio?: string;
  avatar?: any;
  likedBlog?: [];
}

export enum StudyCardType {
  Vocab,
  Sentence,
}

export enum GameType {
  TranslateToVN,
  TranslateToEN,
}

export interface Doc {
  id: string;
  title: string; // topic
  description: string;
  listItems?: StudyCard[];
  createDate?: Date;
}

export interface Ex {
  id: string;
  title: string; // topic
  description: string;
  listItems?: ExDetail[];
  score?: number; // => later in future
  level?: string;
}

export interface ExDetail {
  id: string;
  type: string;
  question: string;
  options: string[];
  answer: string;
  exRight?: boolean;
  vocab?: StudyCard;
}

export interface UserEx {
  id: string;
  userId: string;
  ex: Ex;
  resultList: ExDetail[];
  rightQn?: number;
  didDate?: Date;
}

export interface Blog {
  id: string;
  userId: string;
  userName?: string;
  type: string; // question or blog
  likes?: BlogLike[];
  comments?: BlogComment[];
  summary?: string;
  content: string;
  title: string;
  keyword?: string;
  createDate: Date;
}

export interface BlogComment {
  id: string;
  userId: string;
  userName?: string;
  blogId: string;
  content: string;
  liked: string;
  createDate: Date;
}

export interface BlogLike {
  id: string;
  userId: string;
  userName?: string;
  blogId: string;
  createDate: Date;
}
