export interface Link {
  key: string;
  name: string;
  description: string;
  destination: string;
}

export interface Backend {
  get: (key: string) => Promise<Link | null>;
  set: (link: Link) => Promise<void>;
  delete: (key: string) => Promise<void>;
  list: () => Promise<Link[]>;
  listCompletions: (text: string) => Promise<Link[]>;
  resolve: (entry: string) => Promise<string | null>;
}
