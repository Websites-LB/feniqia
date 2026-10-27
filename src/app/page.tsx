import { Curtain, Hero } from "@/components/home/hero";
import { Instagram } from "@/components/home/instagram";
import { Bar, Book, House, HousePlates, Manifesto, Marquee, Names } from "@/components/home/sections";
import { Voyage } from "@/components/home/voyage";

export default function Home() {
  return (
    <>
      <Curtain />
      <Hero />
      <Manifesto />
      <Voyage />
      <HousePlates />
      <Names />
      <Marquee />
      <Bar />
      <Instagram />
      <House />
      <Book />
    </>
  );
}
