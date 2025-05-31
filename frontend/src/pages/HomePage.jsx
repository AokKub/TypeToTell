import HomepageComponent from "../components/HomeComponent";

const HomePage = () => {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-grow">
          {/* Main content */}
           <HomepageComponent />
        </div>
       
      </div>
    );
  };
  

export { HomePage };
