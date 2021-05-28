import React, { useState, useContext, useEffect } from "react";
import { ServiceContext } from "../services/ServiceContext";
import Tree from './Tree';
import SearchBar from './SearchBar';
import ItemPreview from './ItemPreview';

function MainComponent() {
  const [collectionTree, setCollectionTree] = useState({ collection: [] });
  const [itemId, setItemId] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');
  const service = useContext(ServiceContext);

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  }
  const handleTextChange = (event) => {
    setTextFilter(event.target.value);
  }

  const getItemId = (id) => {
    console.log(id);
    setItemId(id);
  }

  const fetchCollection = async () => {
    const localStorageTree = JSON.parse(localStorage.getItem("tree"));

    if (localStorageTree) {
      setCollectionTree(localStorageTree);
    } else {
      const treeRequest = await service.mainService.getCollection();
      localStorage.setItem('tree', JSON.stringify(treeRequest));
      setCollectionTree(treeRequest);
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
        <Tree collectionTree={{ ...collectionTree, collection: filterTree()}} getItemId={getItemId} />
      </div>
      <div className="preview-space">
        <ItemPreview itemId={itemId} />
      </div>
    </div>
  );
}

export default MainComponent;
