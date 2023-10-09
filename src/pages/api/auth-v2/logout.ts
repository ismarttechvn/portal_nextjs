import type { NextApiRequest, NextApiResponse } from "next/types";
import { deleteCookie } from "cookies-next";

const nextLogoutApi = async (req: NextApiRequest, res: NextApiResponse) => {
  deleteCookie("access-token", { req, res });
  res.json({ message: "Logout Successfully!" });
};

export default nextLogoutApi;
