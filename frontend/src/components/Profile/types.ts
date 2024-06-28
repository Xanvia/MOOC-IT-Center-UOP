export interface Work {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
}
export interface WorkData {
  company: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
}

export interface EducationData {
  institution: string;
  degree: string;
  start_date: string | null;
  end_date: string | null;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  start_date: string;
  end_date: string | null;
}

export interface Country {
  id: number;
  label: string;
}

export interface ProfileData {
  id: number;
  profile_picture: string | null;
  profile_image: string | null;
  headline:string | null;
  description: string | null;
  birth_date: string;
  mobile_number: string;
  gender: string;
  country: Country;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  user_role: string;
  educations: Education[];
  work_experiences: Work[];
}

export interface EditProfileData {
  firstName: string;
  lastName: string;
  description: string;
  phoneNumber: string;
  country: { id: number; label: string };
  birthDate: Date | null;
  imageFile: File | null;
}
