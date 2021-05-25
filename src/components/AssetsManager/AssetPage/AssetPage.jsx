import React from 'react'

export default function AssetPage(props) {

    const {assets} = props.data || {};

    console.log(assets)

    return (
        <div className="asset-manager-page">
            <h1>Asset Manager Page</h1>
        </div>
    )
}
