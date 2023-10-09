import type { NextApiRequest, NextApiResponse } from "next/types";
import httpProxy from "http-proxy";
import httpProxyMiddleware from "next-http-proxy-middleware";
import { setCookie } from "cookies-next";

const handleProxyInit = (proxy: httpProxy) => {
  proxy.on("proxyReq", (proxyReq, req, res) => {});
  proxy.on("proxyRes", (proxyRes, req, res) => {
    let data: string = "";
    proxyRes.on("data", (chunk) => {
      data += chunk;
    });
    proxyRes.on("end", function () {
      const json = JSON.parse(data);
      setCookie("access-token", json.accessToken, {
        req,
        res,
        secure: process.env.NODE_ENV === "production",
        httpOnly: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : undefined,
      });
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    });
  });
};

const nextLoginApi = async (req: NextApiRequest, res: NextApiResponse) => {
  await httpProxyMiddleware(req, res, {
    target: process.env.SERVER_URL,
    onProxyInit: handleProxyInit,
    selfHandleResponse: true,
  });
};

export default nextLoginApi;
