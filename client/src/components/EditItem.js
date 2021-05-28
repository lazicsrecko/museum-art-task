import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

function EditItem(props) {
    const { itemToEdit, onRouteChange } = props;
    const [item, setItem] = useState(itemToEdit);

    const handleInputChange = (event) => {
        setItem({ ...item, [event.target.name]: event.target.value });
    }

    const onSaveItem = () => {
        const localStorageTree = JSON.parse(localStorage.getItem('tree'));
        localStorageTree.collection.forEach(wingCollection => {
            wingCollection.collection.forEach(wingItem => {
                if(wingItem.id === item.id) {
                    wingItem.name = item.name;
                }
            });
        })
        const localStorageCollection = JSON.parse(localStorage.getItem("collection"));
        const itemCollectionIndex = localStorageCollection.findIndex(element => element.id === item.id);
        localStorageCollection[itemCollectionIndex] = item;
        localStorage.setItem('tree', JSON.stringify(localStorageTree));
        localStorage.setItem('collection', JSON.stringify(localStorageCollection));
        onRouteChange('home');
    }

    return (
        <div className="container">
            <div className="editItemInfo">
                <TextField className="textFields" name="name" variant="outlined" label="Title" onChange={handleInputChange} value={item.name} />
                <TextField className="textFields" name="url" variant="outlined" label="Image URL" onChange={handleInputChange} value={item.url} />
                <TextField className="textFields" name="description" variant="outlined" label="Description" multiline rows={20} onChange={handleInputChange} value={item.description} />
                <button className="btn" onClick={onSaveItem} >Save</button>
            </div>
            <div className="editItemPreview">
                <div className="imageContainer">
                    <img className="image" src={item.url} />
                </div>
                <div className="itemInfoContainer">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
    )
}

export default EditItem;