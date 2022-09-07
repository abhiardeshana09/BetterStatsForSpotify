import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import { loadTracks, filterTracks } from '../actions';
import Cookies from 'universal-cookie';
import { getTracks } from '../api';

const cookies = new Cookies();

const Homepage = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks);
    const [startingIndex, setStartingIndex] = useState(0);
    const [trackInfo, setTrackInfo] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [threshold, setThreshold] = useState('');

    useEffect(() => {
        const getTrackInfo = async () => {
            if (tracks.trackMap) {
                if (tracks.trackMap.length) {
                    let ids = '';
                    for (let i = startingIndex; i < startingIndex + 50 && i < tracks.trackMap.length; i++) {
                        if (i === startingIndex + 49 || i === tracks.trackMap.length - 1 ) {
                            ids += tracks.trackMap[i][0].slice(14)
                        } else {
                            ids += `${tracks.trackMap[i][0].slice(14)},`
                        }
                    }
                    try {
                        const { data } = await getTracks(cookies.get('token'), ids);
                        setTrackInfo(data.tracks);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    setTrackInfo([]);
                }
            }
        }
        getTrackInfo();
    }, [tracks, startingIndex])

    const onChangeFiles = (e) => {
        let fileReaders = [];
        for (let file of e.target.files) {
            fileReaders.push(new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
                fileReader.readAsText(file);
            }));
        }
        Promise.all(fileReaders).then(strings => {
            dispatch(loadTracks(strings));
        })
    }

    const getArtistList = (artists) => {
        let artistList = '';
        for (let i = 0; i < artists.length; i++) {
            if (i === artists.length - 1) {
                artistList += artists[i].name;
            } else {
                artistList += `${artists[i].name}, `;
            }
        }
        return artistList;
    }

    const handlePrevPage = () => {
        if (startingIndex > 0) {
            setStartingIndex(startingIndex - 50);
        }
        window.scrollTo(0, 0);
    }

    const handleNextPage = () => {
        if (startingIndex + 50 < tracks.trackMap.length) {
            setStartingIndex(startingIndex + 50);
        }
        window.scrollTo(0, 0);
    }

    const handleFilter = () => {
        dispatch(filterTracks(startDate, endDate, threshold));
        setStartingIndex(0);
    }

    return (
        <>
            <Navbar/>
            {tracks.trackMap ? (
                <div className='container'>
                    <div className='row' style={{ marginTop: '50px', marginBottom: '50px' }}>
                        <div className='col'>
                            <input type='text' value={startDate} className='form-control' placeholder='Start date (YYYY-MM-DD)' onChange={(e) => setStartDate(e.target.value)}></input>
                        </div>
                        <div className='col'>
                            <input type='text' value={endDate} className='form-control' placeholder='End date (YYYY-MM-DD)' onChange={(e) => setEndDate(e.target.value)}></input>
                        </div>
                        <div className='col'>
                            <input type='text' value={threshold} className='form-control' placeholder='Listening time threshold (s)' onChange={(e) => setThreshold(e.target.value)}></input>
                        </div>
                        <div className='col'>
                            <button className='btn btn-primary' onClick={handleFilter}>Filter</button>
                        </div>
                    </div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>Rank</th>
                                <th scope='col'>Art</th>
                                <th scope='col'>Track</th>
                                <th scope='col'>Artist</th>
                                <th scope='col'>Album</th>
                                <th scope='col'>Times Played</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trackInfo.map((track, index) => (
                                <tr>
                                    <th scope='row'>{startingIndex + index + 1}</th>
                                    <td>
                                        <img src={track.album.images[2].url}/>
                                    </td>
                                    <td>{track.name}</td>
                                    <td>{getArtistList(track.artists)}</td>
                                    <td>{track.album.name}</td>
                                    <td>{tracks.trackMap.length ? tracks.trackMap[startingIndex + index][1] : null}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination justify-content-center'>
                            <li className='page-item'><span className='page-link' onClick={handlePrevPage}><span aria-hidden="true">&laquo;</span></span></li>
                            <li className='page-item'><span className='page-link' onClick={handleNextPage}><span aria-hidden="true">&raquo;</span></span></li>
                        </ul>
                    </nav>
                </div>
            ) : (
                <div style={{ height: '80vh' }} className='d-flex flex-column justify-content-center align-items-center'>
                    <h2 style={{ marginBottom: '15px' }}>Upload your Spotify data to get started.</h2>
                    <label className='btn btn-primary btn-lg'>
                        Upload files <input type='file' hidden multiple={true} onChange={onChangeFiles}></input>
                    </label>
                </div>
            )}
        </>
    )
}

export default Homepage;