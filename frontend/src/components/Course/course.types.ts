export enum CategoryEnum {
  All = 0,
  Science = 1,
  Engineering = 2,
  Business = 3,
  Health = 4,
}

export interface CreateCourseData {
  name: string;
  institution: string;
  category: number;
  difficulty: string;
  payment_type: string;
}

export interface CourseCreator {
  email: string;
  full_name: string;
  headline: string;
}

export interface Category {
  id: CategoryEnum;
  label: string;
}

export interface CourseData {
  id: number;
  institution: string;
  name: string;
  description: string;
  specifications: any;
  outcomes: string[];
  header_image: string;
  duration: string;
  difficulty: string;
  status: string;
  course_creator: CourseCreator;
  category: Category;
  isEnrolled?: boolean;
  canEdit?: boolean;
  instructors: Instructor[];
}

export interface UpdateCourseData {
  name: string;
  institution: string | null;
  category: number;
  duration: string;
  level: string;
  imageFile: File | null;
}

export interface Instructor {
  email: string;
  full_name: string;
  headline: string;
  profile_picture: string;
}
export const categoryLabels: { [key in CategoryEnum]: string } = {
  [CategoryEnum.All]: 'All Courses',
  [CategoryEnum.Science]: 'Science',
  [CategoryEnum.Engineering]: 'Engineering',
  [CategoryEnum.Business]: 'Business',
  [CategoryEnum.Health]: 'Health',

};
