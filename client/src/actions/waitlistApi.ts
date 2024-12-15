import api from "./axiosConfig";

type Applicant = {
  applicantType: string;
  email: string;
  firstName: string;
  lastName: string;
  questionnaire: string;
};

export const addApplicant = (applicantData: Applicant) => {
  return api().post('/api/waitlist', applicantData);
};