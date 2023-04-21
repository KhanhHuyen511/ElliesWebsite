export interface StudyPath {
  id?: string;
  name?: string;
  level?: string;
  topic?: string;
}

export interface StudyRoute {
  id: string;
  name: string;
  vocabs?: Vocab[];
  sentences?: Sentence[];
}

export interface Vocab {
  id: string;
  display: string;
  meaning: string;
  voice?: string;
  image?: string;
  example?: string;
}

export interface Sentence {
  id: string;
  display: string;
  meaning: string;
  voice?: string;
  image?: string;
}
