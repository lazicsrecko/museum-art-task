import React, { useState, useEffect, useContext } from "react";
import { ServiceContext } from "../services/ServiceContext";

function MainComponent() {
  const [collectionTree, setCollectionTree] = useState({});
  const service = useContext(ServiceContext);

  const fetchCollection = async () => {
    const localStorageCollection = JSON.parse(localStorage.getItem("collection"));

    if (localStorageCollection) {
      setCollectionTree(localStorageCollection);
    } else {
      const collectionRequest = await service.mainService.getCollection();
      localStorage.setItem('collection', JSON.stringify(collectionRequest));
      setCollectionTree(collectionRequest);
    }
  };
  
  useEffect(() => {
    fetchCollection();
  }, []);
  return (
    <div className="container">
      <div className="navigation-tree">Navigation Tree</div>
      <div className="preview-space">Product Details</div>
    </div>
  );
}

export default MainComponent;
