import { useLocation } from "react-router-dom";
import useQuery from "@/hooks/useQuery";

import Category from "./Category";
import categories from "@/data/categories";

const Categories = () => {
  const { pathname } = useLocation();
  const query = useQuery();

  const category = query.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) return;

  return (
    <div className="container">
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <Category
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
