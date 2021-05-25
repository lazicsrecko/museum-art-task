import React, { useState, useEffect, useContext } from "react";
import { ServiceContext } from "../services/ServiceContext";

function MainComponent() {
  const [collection, setCollection] = useState({});
  const service = useContext(ServiceContext);

  const fetchCollection = async () => {
    const collectionRequest = await service.mainService.getCollection();
    setCollection(collectionRequest);
  };

  useEffect(() => {
    fetchCollection();
  }, []);
  console.log(collection);
  return (
    <div className="container">
      <div className="navigation-tree">Navigation Tree</div>
      <div className="preview-space">Product Details</div>
    </div>
  );
}

export default MainComponent;
