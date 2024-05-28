export const getUserInfo = async () => {
  const user = {
    id: 1,
    profile_picture: null,
    description: null,
    birth_date: "2000-10-12",
    mobile_number: "074 234 434",
    gender: "Male",
    user: 2,
    country: "Albania",
    full_name: "John Doe",
    email: "johndose@gmail.com",
    username: "username",
    user_role: "student",
    educations: [
      {
        id: 1,
        degree: "BSC , computer scinece",
        start_date: "2023-08",
        end_date: "2024-05",
        institution: "University of Peradeniya",
      },
    ],
    work_experiences: [
      {
        id: 1,
        company: "SprintCode Labs",
        position: "dev",
        start_date: "2023-08",
        end_date: "2024-05",
      },
    ],
  };
  return user;
};
