import React, { useState, useContext, useEffect } from "react";
import { ServiceContext } from "../services/ServiceContext";
import Tree from './Tree';
import SearchBar from './SearchBar';

function MainComponent() {
  const [collectionTree, setCollectionTree] = useState({ collection: [] });
  const [typeFilter, setTypeFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');
  const service = useContext(ServiceContext);

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  }
  const handleTextChange = (event) => {
    setTextFilter(event.target.value);
  }

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

  const filterTree = () => {
    const filteredCollection = [];
    const { collection } = collectionTree;
    collection.forEach(coll => {
      filteredCollection.push({ ...coll, collection: coll.collection.filter(item => typeFilter === 'all' ? item.name.toLowerCase().includes(textFilter.toLowerCase()) : item.type.toLowerCase() === typeFilter.toLowerCase() && item.name.toLowerCase().includes(textFilter.toLowerCase().trim()))})
    });
    return filteredCollection;
  }

  useEffect(() => {
    fetchCollection();
  }, []);
  return (
    <div className="container">
      <div className="navigation-tree">
        <SearchBar typeFilter={typeFilter} handleTypeChange={handleTypeChange} handleTextChange={handleTextChange} />
        <Tree collectionTree={{ ...collectionTree, collection: filterTree()}} />
      </div>
      <div className="preview-space">Product Details</div>
    </div>
  );
}

export default MainComponent;
