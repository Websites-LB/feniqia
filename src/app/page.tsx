import { Hero } from "@/components/home/hero";
import { Band, Bar, Categories, Intro, Kitchen, Reserve } from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Kitchen />
      <Categories />
      <Band />
      <Bar />
      <Reserve />
    </>
  );
}
