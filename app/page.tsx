import DataTable from "@/components/DataTable";

const HomePage = () => {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      <main id="main-content" className="flex flex-col gap-4 p-8">
        <h1 className="text-2xl font-bold">Table Assignment - Table Data</h1>
        <DataTable />
      </main>
    </>
  );
};

export default HomePage;
