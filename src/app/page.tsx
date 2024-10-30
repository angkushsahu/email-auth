import { Hero } from "./_components/hero";

export default function Homepage() {
   return (
      <section className="flex grow flex-col items-center justify-center text-center">
         <h1 className="title">Home page</h1>
         <Hero />
      </section>
   );
}
