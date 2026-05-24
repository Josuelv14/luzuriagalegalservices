import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Areas } from "@/components/site/Areas";
import { Team } from "@/components/site/Team";
import { Reviews } from "@/components/site/Reviews";
import { BookingForm } from "@/components/site/BookingForm";
import { BlogPreview } from "@/components/site/BlogPreview";
import { FloatingCTA } from "@/components/site/FloatingCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Services />
        <Areas />
        <Team />
        <Reviews />
        <BookingForm />
        <BlogPreview />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
