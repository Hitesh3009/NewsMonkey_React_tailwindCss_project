import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingBar from 'react-top-loading-bar'
import InfiniteScroll from 'react-infinite-scroll-component';
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    let truncatedText = text.slice(0, maxLength + 1);
    let lastSpaceIndex = truncatedText.lastIndexOf(' ');
    if (lastSpaceIndex > 0) {
        truncatedText = truncatedText.slice(0, lastSpaceIndex);
    }
    return truncatedText + '...';
}
export default function Newcontainer(props) {
    const [progress, setProgress] = useState(0)
    const [articles, setarticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    const [page, setPage] = useState('');
    const apiKey = '' //Use your api key here
    const fetchNewsData = async () => {
        setProgress(0);
        const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=1`;
        try {
            setProgress(10);
            const res = await fetch(api);
            setProgress(30);
            const jsonData = await res.json();
            setProgress(70);
            setarticles(jsonData.articles);
            setTotalResults(jsonData.totalResults);
            setProgress(100);
        } catch (error) {
            setProgress(100);
            setError('Failed to fetch news data');
            console.error(error);
        }
    };
    useEffect(() => {
        fetchNewsData();
    }, [props.country, props.category]);
    console.log(articles)

    const fetchMoredata = async () => {
        const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}`;
        const res = await fetch(api);
        const json = await res.json();
        setarticles(articles.concat(json.articles));
        setTotalResults(json.totalResults);
        setPage(page+1);
    }
    Newcontainer.propTypes = {
        category: PropTypes.string,
        country: PropTypes.string
    }

    return (
        <>
            <LoadingBar color='#f11946'
                progress={progress} />

            <InfiniteScroll dataLength={articles.length ||0} next={fetchMoredata} hasMore={articles.length !== totalResults} loader={<h4>Loading...</h4>}>
                {error && <h2>{error}</h2>}
                <div id="maincontainer" className={`flex-wrap flex justify-center lg:justify-evenly lg:items-center md:flex-wrap md:justify-evenly pb-5 font-mono ${props.mode==='Light'?'bg-black text-white':'bg-white text-black'}`}>
                    {
                        articles.length >= 1 && (articles.map((obj, ind) => {
                            return (obj && (<div id="subcontainer" className={`${props.mode==='Light'?'border-2 border-white bg-purple-600':'border-2 border-black bg-gray-300'} p-2 lg:p-5 mt-6 mx-10 flex flex-col items-center justify-between sm:justify-center w-7/12 xl:w-1/5 h-96 lg:w-1/4 md:w-[30%]`} key={ind}>
                                <div id="newsImg" className='p-2 flex justify-center items-center sm:w-8/12 sm:h-32 w-11/12 h-28'>
                                    <img src={obj.urlToImage || 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg'} alt="NewsImage" className='w-full h-full' />
                                </div>
                                <div id="newsTitle" className='my-1 font-bold text-xs md:text-sm lg:text-base xl:text-base flex justify-center items-center text-justify'>
                                    <p>{obj.title ? truncateText(obj.title, 50) : 'NO TITLE'}</p>
                                </div>
                                <div id="newsDesc" className='my-1 text-sm lg:text-[0.8rem] xl:text-[0.87rem] flex justify-center items-center text-justify'>
                                    <p>{obj.description ? truncateText(obj.description, 70) : 'NO Description Available'}</p>
                                </div>
                                <div id="publishDate" className='my-1 text-sm lg:text-base xl:text-base flex flex-col justify-center items-center text-justify'>
                                    <span className='text-center'>Published:<p className='font-bold'>{new Date(obj.publishedAt).toLocaleString()}</p></span>
                                    <p className={`font-bold ${props.mode==='Light'?'text-yellow-300':'text-blue-800'}`}>{obj.source.name?obj.source.name.slice(0,1).toUpperCase()+obj.source.name.slice(1,obj.source.name.length+1).toLowerCase():'Unknown'}</p>
                                </div>
                                <div>
                                    <button id="readMore" className={`border-2 ${props.mode==='Light'?'bg-blue-700':'bg-black'} text-white hover:shadow-xl hover:shadow-cyan-500/50 rounded-xl w-24 h-10 p-1`}>
                                        <Link to={obj.url} className='text-xs lg:text-sm xl:text-base'>Read More</Link>
                                    </button>
                                </div>
                            </div>))
                        }))
                    }

                </div>
            </InfiniteScroll>
        </>
    )
}
