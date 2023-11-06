
const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
            className="border p-3 rounded-lg"
          />
          <textarea
            type="text"
            placeholder="Description"
            id="Description"
            required
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Address"
            id="Address"
            required
            className="border p-3 rounded-lg"
          />
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
