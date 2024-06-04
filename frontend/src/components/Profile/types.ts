export interface Work {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
}

export interface Education {
  id: number;
  institution: Institution;
  degree: string;
  start_date: string;
  end_date: string | null;
}

interface Country {
  id: number;
  label: string;
}

interface Institution {
  id: number;
  label: string;
}

export interface ProfileData {
  id: number;
  profile_picture: string | null;
  profile_image: string | null;
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
