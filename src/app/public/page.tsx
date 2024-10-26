export default function PublicPage() {
   return (
      <section className="flex grow flex-col items-center justify-center text-center">
         <h1 className="title">This is a public page</h1>
         <p className="mt-4 text-muted-foreground">
            You <strong className="text-foreground">DON&apos;T</strong> need to be authenticated to view this page
         </p>
      </section>
   );
}
