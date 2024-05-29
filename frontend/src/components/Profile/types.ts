export interface Work {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ProfileData {
  id: number;
  profile_picture: string | null;
  profile_image: string | null;
  description: string | null;
  birth_date: string;
  mobile_number: string;
  gender: string;
  country: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  user_role: string;
  educations: Education[];
  work_experiences: Work[];
}
