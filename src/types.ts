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
}

export interface StudyCard {
  id?: string;
  meaning?: string;
  display?: string;
  voice?: string;
  image?: string;
  example?: string;
  type?: StudyCardType;
}

export enum StudyCardType {
  Vocab,
  Sentence,
}
