import ItemsList from "../components/Items/ItemsList.jsx";
import BestItemsList from "../components/Items/BestItemsList.jsx";
import { Helmet } from "react-helmet";
import "../styles/Items/Items.css";

const Items = () => {
  return (
    <div className="items">
      <Helmet>
        <title>판다마켓 - 중고마켓</title>
      </Helmet>
      <BestItemsList />
      <ItemsList />
    </div>
  );
};

export default Items;
