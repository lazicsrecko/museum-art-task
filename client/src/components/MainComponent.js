import React, { useState, useContext, useEffect } from "react";
import { ServiceContext } from "../services/ServiceContext";
import Tree from './Tree';
import SearchBar from './SearchBar';
import ItemPreview from './ItemPreview';
import EditItem from './EditItem';

function MainComponent() {
  const [collectionTree, setCollectionTree] = useState({ collection: [] });
  const [itemId, setItemId] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');
  const [itemToEdit, setItemToEdit] = useState({});
  const [route, setRoute] = useState('home');
  const service = useContext(ServiceContext);

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  }
  const handleTextChange = (event) => {
    setTextFilter(event.target.value);
  }

  const getItemId = (id) => {
    setItemId(id);
  }

  const fetchCollection = async () => {
    const localStorageTree = JSON.parse(localStorage.getItem("tree"));

    if (!localStorageTree) {
      const collectionRequest = await service.mainService.getCollection();
      localStorage.setItem('tree', JSON.stringify(collectionRequest.tree));
      localStorage.setItem('collection', JSON.stringify(collectionRequest.collection))
      setCollectionTree(collectionRequest.tree);
    } else {
      setCollectionTree(localStorageTree);
    }
  };

  const onRouteChange = (route) => {
    setRoute(route);
  }

  const itemEdit = (item) => {
    setItemToEdit(item);
  }

  const filterTree = () => {
    const filteredCollection = [];
    const { collection } = collectionTree;
    collection.forEach(coll => {
      filteredCollection.push({ ...coll, collection: coll.collection.filter(item => typeFilter === 'all' ? item.name.toLowerCase().includes(textFilter.toLowerCase()) : item.type.toLowerCase() === typeFilter.toLowerCase() && item.name.toLowerCase().includes(textFilter.toLowerCase().trim())) })
    });
    return filteredCollection;
  }

  useEffect(() => {
    fetchCollection();
  }, [route]);
  if (route === 'editItem') {
    return <EditItem itemToEdit={itemToEdit} onRouteChange={onRouteChange} />
  } else {
    return (
      <div className="container">
        <div className="navigation-tree">
          <SearchBar typeFilter={typeFilter} handleTypeChange={handleTypeChange} handleTextChange={handleTextChange} />
          <Tree collectionTree={{ ...collectionTree, collection: filterTree() }} getItemId={getItemId} />
        </div>
        <div className="preview-space">
          <ItemPreview onRouteChange={onRouteChange} itemEdit={itemEdit} itemId={itemId} />
        </div>
      </div>
    )
  }
}

export default MainComponent;
