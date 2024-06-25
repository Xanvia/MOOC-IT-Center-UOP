export interface CreateCourseData {
  name: string;
  institution: string;
  category: number;
  difficulty: string;
}

export interface CourseCreator{
  email:string;
  full_name:string;
  headline:string;
}

export interface CourseData {
  id: number;
  institution: string;
  name: string;
  description: string | null; // Optional description property
  specifications: any; // Can't determine specific type from provided data
  outcomes: string[];
  header_image: string;
  duration: string; // May need a more specific type depending on representation
  difficulty: string; // May need a more specific type depending on representation
  status: string;
  course_creator: CourseCreator;
  category: string;
}