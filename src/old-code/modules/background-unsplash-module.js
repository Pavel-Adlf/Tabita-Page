import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import BackgroundView from "../components/background-view";

const unsplash = new createApi({
    accessKey: process.env.REACT_APP_API_UNSPLASH_KEY,
});


export default function BackgroundUnsplashModule(props) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState([props.searchName, props.imgsPerPage]);
    const [page, setPage] = useState(1);

    const changePage = () =>
    {
        console.log(page);
        setPage(page+1);
    }

    useEffect(() => {
        const fetchData = async () => {
        await unsplash.photos.getRandom({
            count: 10,
            orientation: landscape,
          }).then(result => {
            setData(result)
        })
        };
        fetchData();
    }, [query, page])

    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <div>
            {/* {typeof data.response != 'undefined' &&
                <BackgroundView picturesArray={data.response.results} imgs={props.imgsPerPage} onChangePage={()=>changePage()}/>}  */}
        </div>
    )
}
