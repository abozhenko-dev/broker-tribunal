export interface IFile {
  _id?: string;
  link: string;
  meta?: {
    name?: string;
    type?: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
  };
  isApproved: boolean;
}
