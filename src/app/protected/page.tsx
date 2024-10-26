export default function ProtectedPage() {
   return (
      <section className="flex grow flex-col items-center justify-center text-center">
         <h1 className="title">This is a protected page</h1>
         <p className="mt-4 text-muted-foreground">You need to be authenticated to view this page</p>
      </section>
   );
}
