import React from "react";
import { location } from "../ultils/constants";
import { ProvinceBtn } from "./index";

const Province = () => {
  return (
    <div className="flex items-center gap-5 justify-center py-5">
      {location.map((item) => {
        return (
          <ProvinceBtn
            key={item.id}
            name={item.name}
            img={item.img}
            provinceCode={item.provinceCode}
          />
        );
      })}
    </div>
  );
};

export default Province;
