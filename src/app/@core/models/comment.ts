export interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
  editedAt?: Date;
  replies?: Comment[];
  isEditing?: boolean; // Pour savoir si le commentaire est en mode édition
  editText?: string;   // Pour stocker le texte pendant l'édition
}
