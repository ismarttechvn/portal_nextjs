export type UserLoggedIn = {
  id: number;
  username: string;
  fullname: string;
  empCode: string;
  roles: {
    admin: number;
    moderator: number;
    "salary.mod": number;
    "salary.create": number;
    "salary.view": number;
    "salary.edit": number;
    "salary.delete": number;
    "extrasalary.mod": number;
    "extrasalary.create": number;
    "extrasalary.edit": number;
    "extrasalary.view": number;
    "extrasalary.delete": number;
    "ticket.view": number;
    "ticket.create": number;
    "ticket.edit": number;
    "ticket.delete": number;
    "employee.mod": number;
    "employee.view": number;
    "employee.edit": number;
    "employee.create": number;
    "employee.delete": number;
    "news.mod": number;
    "news.create": number;
    "news.edit": number;
    "news.update": number;
    "news.delete": number;
  };
  deptId: number;
  deptName: string;
  companyId: number;
  companyName: string;
  status: {
    id: number;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};
