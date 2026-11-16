import JsonLd from "./JsonLd";
import { abs, homeGraph } from "@/lib/seo";

export default function HomeSeo() {
  return (
    <>
      <link rel="canonical" href={abs("/")} />
      <JsonLd data={homeGraph()} />
    </>
  );
}
