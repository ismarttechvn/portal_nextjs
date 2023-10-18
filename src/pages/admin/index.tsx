import { Header, Layout } from "@/components";
import { ControlView } from "@/views";

export default function AdminPage() {
  return (
    <Layout description="">
      <Header activeTab={7} />
      <ControlView />
    </Layout>
  );
}
