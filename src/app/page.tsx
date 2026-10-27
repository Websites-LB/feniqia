import { Hero } from "@/components/home/hero";
import { Instagram } from "@/components/home/instagram";
import { NameStone } from "@/components/home/name-stone";
import { Bar, Book, House, HousePlates, Manifesto, Marquee, Names } from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <HousePlates />
      <Names />
      <NameStone />
      <Marquee />
      <Bar />
      <Instagram />
      <House />
      <Book />
    </>
  );
}
