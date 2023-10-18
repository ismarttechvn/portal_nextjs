import { Header, Layout } from "@/components";
import { NewsAdminView } from "@/views";

export default function NewsListPage() {
  return (
    <Layout description="">
      <Header activeTab={0} />
      <NewsAdminView />
    </Layout>
  );
}
