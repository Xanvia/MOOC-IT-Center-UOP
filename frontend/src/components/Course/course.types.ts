export interface CreateCourseData {
  name: string;
  institution: string;
  category: number;
  difficulty: string;
}

export interface CourseCreator {
  email: string;
  full_name: string;
  headline: string;
}

export interface Category{
  id: number;
  label: string;
}

export interface CourseData {
  id: number;
  institution: string;
  name: string;
  description: string | null;
  specifications: any;
  outcomes: string[];
  header_image: string;
  duration: string;
  difficulty: string;
  status: string;
  course_creator: CourseCreator;
  category: Category;
}

export interface UpdateCourseData {
  name: string;
  institution: string | null;
  category: number;
  duration: string;
  description: string;
  level: string;
  imageFile: File | null; 
}

