import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />

      <section id="library"></section>
    </main>
  );
};

export default HomePage;