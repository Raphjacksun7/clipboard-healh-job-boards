import Head from "next/head";

import Header from "../components/Header";
import Meta from "../components/Meta";
import Footer from "../components/Footer";
import SearchBar from "../components/Searchbar";
import FilterCard from "../components/FilterCard";
import SortBar from "../components/SortBar";
import JobList from "../components/JobList";

import { JobsContextProvider } from "../contexts/jobsContext";
import filters from "../data/filters";

const Index = (props) => {
  const { filters } = props;
  const filterCards = Object.entries(filters).map(([key, filters]) => {
    return <FilterCard key={key} title={key} filters={filters} />;
  });

  return (
    <div className="flex flex-col item-end bg-gray-100 w-full">
      <Head>
        <title>Clipboard Health</title>
        <Meta/>
      </Head>
      <Header />
      <JobsContextProvider>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-0 lg:px-8">
          {/* Replace with your content */}
          <SearchBar />
          <div className="md:flex flex-start items-start">
            <div className="w-auto hidden md:flex flex-col items-center p-4 pl-0">
              {filterCards}
            </div>
            <div className="md:pt-4 w-full">
              <SortBar />
              <JobList />
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
      </JobsContextProvider>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // Call an EXTERNAL API endpoint to get posts.
  // DISCLAIMER: I just wanted to test this function.
  // This could be done with a direct importing of data

  return {
    props: {
      filters,
    },
  };
}

export default Index;
