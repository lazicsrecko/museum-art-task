import React, { useState, useEffect, useContext } from 'react';
import { ServiceContext } from '../services/ServiceContext';

function ItemPreview(props) {
    const { itemId } = props;
    const [item, setItem] = useState({});
    const service = useContext(ServiceContext);


    const fetchItem = async () => {
        const itemRequest = await service.mainService.getItemById(itemId);
        setItem(itemRequest[0]);
    }

    useEffect(() => {
        fetchItem();
    }, [itemId])

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
                <button className="editBtn">Edit</button>
                <p>{item.description}</p>
            </div>
        </div>
    )
}

export default ItemPreview;