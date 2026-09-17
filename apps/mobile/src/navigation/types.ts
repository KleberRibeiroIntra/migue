export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  ActivityList: undefined;
  CreateActivity: undefined;
  EditActivity: { activityId: string };
  ActivityDetails: { activityId: string };
  Projects: undefined;
  ProjectDetails: { projectId: string };
  Profile: undefined;
};
