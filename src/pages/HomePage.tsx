import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div className="homePage__wrapper">
      <Helmet>
        <title>판다마켓</title>
      </Helmet>
      <h1>This is HomePage</h1>
    </div>
  );
};

export default HomePage;
