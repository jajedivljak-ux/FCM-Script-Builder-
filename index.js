import Head from "next/head";
import AdScriptBuilder from "../components/AdScriptBuilder";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ad Script Builder — Freedom Coach Method</title>
        <meta name="description" content="Write high-converting ad scripts using proven frameworks and Breakthrough Advertising principles." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </Head>
      <AdScriptBuilder />
    </>
  );
}
