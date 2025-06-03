import QuoteForm from "@/components/QuoteForm";

export default function GetQuote() {
  return (
    <>
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Get a Free Quote</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you with a customized cleaning solution that fits your needs and budget.
          </p>
        </div>
      </div>
      <QuoteForm />
    </>
  );
}
