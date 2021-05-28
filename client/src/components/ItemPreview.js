import React, { useState, useEffect, useContext } from 'react';
import { ServiceContext } from '../services/ServiceContext';

function ItemPreview(props) {
    const { itemId, onRouteChange, itemEdit } = props;
    const [item, setItem] = useState({});
    const service = useContext(ServiceContext);

    const fetchItem = async () => {
        const localStorageCollection = JSON.parse(localStorage.getItem("collection"));

        if (!localStorageCollection) {
            const itemRequest = await service.mainService.getItemById(itemId);
            setItem(itemRequest[0]);
        }
        const itemFromLS = localStorageCollection.filter(i => itemId === i.id)[0];
        setItem(itemFromLS);
    }

    useEffect(() => {
        fetchItem();
    }, [itemId])

    const onEditItem = () => {
        onRouteChange('editItem');
        itemEdit(item);
    }

    if (!item.id) {
        return (
            <div>
                Choose art from list!
            </div>
        )
    }
    return (
        <div>
            <div className="imageContainer">
                <img className="image" src={item.url} />
            </div>
            <div className="itemInfoContainer">
                <h2>{item.name}</h2>
                <button className="editBtn btn" onClick={onEditItem}>Edit</button>
                <p>{item.description}</p>
            </div>
        </div>
    )
}

export default ItemPreview;