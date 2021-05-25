import React, {useState} from 'react'
import './AssetPage.css'

export default function AssetPage(props) {

    const {assets} = props.data || {};

    const [found, setFound] = useState([]);

    const createAssets = ()=> {

        if(!assets){
            return <li>Loading...</li>
        }

        if(found.length > 0){
            return found.map((asset, i)=> {
                return  <li key={i} className="asset">
                            {
                                asset.url.indexOf('mp4') !== -1 
                                ?
                                <div className="asset-container">
                                    <video controls className="asset-container">
                                        <source src={asset.url} type="video/mp4"/>
                                        Your browser does not support this video.
                                    </video>
                                    <p>{asset.name}</p>
                                </div>
                                :
                                null
                            }
                            {
                                asset.url.indexOf('jpg') !== -1 || asset.url.indexOf('jpeg') !== -1 || asset.url.indexOf('png') !== -1
                                ?
                                <div className="asset-container">
                                    <img src={asset.url} alt="" />
                                    <p>{asset.name}</p>
                                </div>
                                :
                                null
                            }
                            <div className="asset-actions-container">
                                <button className="asset-delete deleteAsset">Delete</button>
                            </div>
                        </li>
            })
        }

        return assets.map((asset, i)=> {
            return  <li key={i} className="asset">
                        {
                            asset.url.indexOf('mp4') !== -1 
                            ?
                            <div className="asset-container">
                                <video controls className="asset-container">
                                    <source src={asset.url} type="video/mp4"/>
                                    Your browser does not support this video.
                                </video>
                                <p>{asset.name}</p>
                            </div>
                            :
                            null
                        }
                        {
                            asset.url.indexOf('jpg') !== -1 || asset.url.indexOf('jpeg') !== -1 || asset.url.indexOf('png') !== -1
                            ?
                            <div className="asset-container">
                                <img src={asset.url} alt="" />
                                <p>{asset.name}</p>
                            </div>
                            :
                            null
                        }
                        <div className="asset-actions-container">
                            <button className="asset-delete deleteAsset">Delete</button>
                        </div>
                    </li>
        })

    }

    const searchAssets = (e)=> {
        const search = e.target.value;
        const assetsFound = assets.filter((asset)=> asset.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        setFound(assetsFound);
    }

    return (
        <div className="asset-manager-page">
            <div className="assets-search-bar">
                <input type="text" onChange={  searchAssets } placeholder="Search for image or video by name"/>
            </div>
            <ul className="assets-gallery">
                {createAssets()}
            </ul>
        </div>
    )
}
