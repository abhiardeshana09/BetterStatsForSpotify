import { LOAD_TRACKS, FILTER_TRACKS } from '../constants/actionTypes';

const reducer = (tracks = {}, action) => {
    switch (action.type) {
        case LOAD_TRACKS:
            let URIToCount = new Map();
            for (let string of action.payload) {
                for (let track of JSON.parse(string)) {
                    if (track.spotify_track_uri === null) continue;
                    if (URIToCount.has(track.spotify_track_uri)) {
                        URIToCount.set(track.spotify_track_uri, URIToCount.get(track.spotify_track_uri) + 1);
                    } else {
                        URIToCount.set(track.spotify_track_uri, 1);
                    }
                }
            }
            let arr = [...URIToCount];
            arr.sort((a, b) => b[1] - a[1]);
            return {
                trackMap: arr,
                files: action.payload
            };
        
        case FILTER_TRACKS:
            let URIToCountFiltered = new Map();
            for (let string of tracks.files) {
                for (let track of JSON.parse(string)) {
                    if (
                        track.spotify_track_uri === null ||
                        track.ms_played < parseInt(action.payload.threshold) * 1000 ||
                        track.ts.slice(0, 10) < action.payload.startDate ||
                        track.ts.slice(0, 10) > action.payload.endDate
                    ) continue;
                    if (URIToCountFiltered.has(track.spotify_track_uri)) {
                        URIToCountFiltered.set(track.spotify_track_uri, URIToCountFiltered.get(track.spotify_track_uri) + 1);
                    } else {
                        URIToCountFiltered.set(track.spotify_track_uri, 1);
                    }
                }
            }
            let arrFiltered = [...URIToCountFiltered];
            arrFiltered.sort((a, b) => b[1] - a[1]);
            return {
                ...tracks,
                trackMap: arrFiltered
            }

        default:
            return tracks;
    }
}

export default reducer;