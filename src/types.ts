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
  cards?: string[];
  sentences?: StudyCard[];
  imageFile?: any;
  isLast?: boolean;
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

export interface Account {
  user_id: string;
  role: string;
  create_date: Date;
  isLocked?: boolean;
}

export enum Gender {
  Male,
  Female,
  Others,
}

export interface Student {
  id: string;
  checkinDays: [];
  routes: [];
  paths: [];
  name?: string;
  email?: string;
  gender?: Gender;
  birthday?: Date;
  bio?: string;
  avatar?: any;
  likedBlog?: [];
  currentPathId?: string;
  level?: LevelType;
  savedList: [];
  point: number;
}

export enum LevelType {
  Beginner, // Sơ cấp
  Intermediate, // Trung cấp
  Advanced, // Nâng cao
}

export enum StudyCardType {
  Vocab,
  Sentence,
  Paraph,
  Book,
}

export enum GameType {
  TranslateToVN,
  TranslateToEN,
  TranslateSentenceToVN,
  TranslateSentenceToEN,
  ///
  FillInSentence,
  ///
  SortWords,
}

export interface Doc {
  id: string;
  title: string; // topic
  description?: string;
  vocabs?: StudyCard[];
  sentences?: StudyCard[];
  paraphs?: StudyCard[];
  listItemIds?: string[];
  createDate?: Date;
  type?: StudyCardType;
}

export enum ExState {
  Normal,
  Doing,
  Completed,
  DoAgain,
}

export interface Ex {
  id: string;
  title: string; // topic
  description: string;
  listItems?: ExDetail[];
  vocabs?: StudyCard[];
  sentences?: StudyCard[];
  paraphs?: StudyCard[];
  score?: number; // => later in future
  level?: LevelType;
  state?: ExState;
}

export interface ExDetail {
  id: string;
  type: GameType;
  question: string;
  options?: string[];
  answer?: string;
  userAnswer?: string;
  exRight?: boolean;
  vocab?: StudyCard;
  keyWord?: string;
}

export interface UserEx {
  id: string;
  userId: string;
  ex: Ex;
  resultList: ExDetail[];
  rightQn?: number;
  didDate?: Date;
  state?: ExState;
}

export interface ExAgain {
  id: string;
  userId: string;
  title: string;
  description: string;
  exId: string;
  listItems: ExDetail[];
  didDate?: Date;
}

export enum BlogState {
  Pending,
  Posted,
  Canceled,
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
  state: BlogState;
  cancelNote?: string;
}

export interface BlogComment {
  id: string;
  userId: string;
  userName?: string;
  blogId: string;
  content: string;
  liked: number;
  createDate: Date;
  isPinned?: boolean;
}

export interface BlogLike {
  id: string;
  userId: string;
  userName?: string;
  blogId: string;
  createDate: Date;
}

export interface UpdateStudyPath {
  pathID: string;
  updateDate: any;
}

export interface Game {
  name: string;
  rounds: GameRound[];
}

export interface GameRound {
  name: string;
  questions: GameQuestion[];
}

export interface GameQuestion {
  question: string;
  options: string[];
  vocab: string;
  answer: string;
  level: number;
}
