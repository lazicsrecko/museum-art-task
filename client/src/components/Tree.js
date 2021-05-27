import React, { useState } from 'react';
import {
    TreeView,
    TreeItem
} from '@material-ui/lab';
import {
    ExpandMore as ExpandMoreIcon,
    ChevronRight as ChevronRightIcon
} from '@material-ui/icons';

function Tree(props) {
    const { collectionTree } = props;

    return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId={collectionTree.id} label={collectionTree.name}>
                    {collectionTree.collection.map(collection => {
                        return (
                            <TreeItem nodeId={collection.id} label={collection.name}>
                                {collection.collection.map(item => {
                                    return (
                                        <TreeItem nodeId={item.id} label={item.name} />
                                    )
                                })}
                            </TreeItem>
                        )
                    })}
                </TreeItem>
            </TreeView>
    )
}

export default Tree;