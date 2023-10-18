import { Header, Layout } from "@/components";
import { NewsShowView } from "@/views";
import { useRouter } from "next/router";

export default function NewsItemShowPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout description="">
      <Header activeTab={2} />
      {
        router.isReady && <NewsShowView id={id as string}/>
      }
    </Layout>
  )
}