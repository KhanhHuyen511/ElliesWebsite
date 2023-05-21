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
}

export enum StudyCardType {
  Vocab,
  Sentence,
}

export interface Doc {
  id: string;
  title: string; // topic
  description: string;
  listItems?: StudyCard[];
  createDate?: Date;
}
