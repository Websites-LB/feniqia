import { Cargo } from "@/components/home/cargo";
import { Hero } from "@/components/home/hero";
import { Instagram } from "@/components/home/instagram";
import { NameStone } from "@/components/home/name-stone";
import { Bar, Book, House, HousePlates, Marquee, Names } from "@/components/home/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Cargo />
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
