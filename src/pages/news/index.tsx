import { Header, Layout } from "@/components";
import { NewsView } from "@/views";

export default function NewsPage() {
  return (
    <Layout description="">
      <Header activeTab={2} />
      <NewsView />
    </Layout>
  )
}