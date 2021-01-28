// ##############################################
// snippets for react leaflet with redux




// store a polygon layers ref in state to use it in another component to get its bounds. These bounds are
// used to zoom to this section of the map.
// ?? I originally used this method, but eneded up producing the bounds with python in the backend with more simplicity.

// Tenement geospatial features are stored in geojson format in state.
const { tens } = useSelector(state => state.spatialData)

// create a ref which will be used to reference the polygon layer containing the 'tens' dataset.
const tenRef = useRef();  

// store the tenements layer ref to state. this allows to get the bounds of the layer to zoom to on submit.
useEffect(() => {
    const { current = {} } = tenRef;
    const { leafletElement: ten } = current; // deconstruct the leafletelement from the current
    dispatch(storeSpatialRefs({name: 'tensref', ref: ten})) // store this ref in the state
}, [tens]) // only update the ref when the tens features change

// clear the tenement layers and re-add them when ever the tens features change. Required as leaflet will not replace the data, but add the new data aswell.
useEffect(() => {
    tenRef.current && tenRef.current.leafletElement.clearLayers().addData(tens)
}, [tens])


// extract the map and tensref form state. This part would usually be in another component to the above.
const { map, tensref } = useSelector(state => state.spatialData)

// zoom map to the bounds of the filtered data. first check if the ref exists and then if it has bounds to get.
// This will fit the bounds of the map around the polygon layer and provide padding of [10,10]
tensref && tensref.getBounds()._southWest && map.fitBounds(tensref.getBounds(), {padding: [10, 10]})







// get the bounds of a layer of point data.
// This is different to above as a ref is made to the list of points and not just the layer as above.
// The two different methods required to find the bounds for a polygon layer and a points layer was a reason for solving the issue with python in the backend.

// required import
import {latLngBounds} from 'leaflet'

// make a ref to the list of points
const markerRefs = useRef([]);
markerRefs.current = [];

// The list is created when mapping the points to the map. 
const addToRefs = (el) =>{
    if (el && !markerRefs.current.includes(el)) {
        markerRefs.current.push(el)
    }
}
return (
    <LayerGroup ref={occLayerRef}>
        { occs.features.map((occ, index) => 
            ( <Marker key={occ.properties.pk} index={index} pk={occ.properties.pk} ref={addToRefs} position={[occ.geometry.coordinates[1],occ.geometry.coordinates[0]]} icon={siteIcon} onclick={popUpFunction} /> )
        )}
    </LayerGroup>
)

// using a foreach loop we can extend the bounds object.
const bounds = latLngBounds()
markerRefs.forEach((data) => {
    bounds.extend(data.latLng)
})

// the bounds can then be used in the fitbounds to focus the map on the list of points.
map.fitBounds(bounds, {padding: [10, 10]})