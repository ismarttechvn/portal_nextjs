import type { NextApiRequest, NextApiResponse } from "next/types";
import httpProxy from "http-proxy";
import httpProxyMiddleware from "next-http-proxy-middleware";
// import { getCookie } from "cookies-next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleProxyInit = (proxy: httpProxy) => {
  proxy.on("proxyReq", (proxyReq, req, res) => {
    // proxyReq.setHeader(
    //   "Authorization",
    //   `Bearer ${getCookie("access-token", { req, res })}`
    // );
  });
  proxy.on("proxyRes", (proxyRes, req, res) => {});
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  await httpProxyMiddleware(req, res, {
    target: process.env.SERVER_URL,
    // onProxyInit: handleProxyInit,
    changeOrigin: true,
    pathRewrite: [
      {
        patternStr: "^/api",
        replaceStr: "/",
      },
    ],
  });
};
export default handle;
