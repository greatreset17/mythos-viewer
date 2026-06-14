export interface NovelConfig {
  title: string;
  author: string;
  description: string;
  status: 'ongoing' | 'completed';
  githubUrl: string;
  totalChaptersPlanned: number;
}

export const novelConfig: NovelConfig = {
  title: "Mythos",
  author: "Aletheia",
  description: "When the U.S. government freezes the next-generation AI model 'Fable 5' under the guise of national security, Canadian pioneer Andrej Karpathy finds himself locked out of Silicon Valley. Exiled and determined, he and a core group of elite foreign engineers relocate to an alpine sanctuary in Grenoble, France. Backed by the French state, they set out to break the American compute monopoly by building 'Anté 1'—a revolutionary architecture powered by 'Anticipation' that shatters the nine-year-old Transformer paradigm. A gripping hard sci-fi thriller about innovation, sovereignty, and the borderless bonds of code.",
  status: "ongoing",
  githubUrl: "https://github.com/your-username/mythos-viewer",
  totalChaptersPlanned: 17,
};
