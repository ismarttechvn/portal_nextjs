import { Header, Layout } from "@/components";
import { DashBoardView } from "@/views";
import type { NextPage } from "next";

const Home: NextPage = (props) => {
  return (
    <Layout>
      <Header activeTab={1}/>
      <DashBoardView />
    </Layout>
  );
};

export default Home;
