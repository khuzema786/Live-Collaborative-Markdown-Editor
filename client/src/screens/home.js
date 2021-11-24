import MarkedInput from "../components/markdown/markedInput";
import Result from "../components/markdown/result";
import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="grid grid-cols-2 w-screen h-screen">
        <MarkedInput groupId={id} />
        <Result />
      </div>
    </div>
  );
};

export default Home;
