import FooterComponent from "../components/FooterComponent";
import NewBookComponent from "../components/NewBookComponent";

export default function StoryPage(){
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-grow">
          <NewBookComponent/>
        </div>
        <FooterComponent />
      </div>
    );
  };
  
