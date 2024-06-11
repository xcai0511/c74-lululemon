import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilterApi} from "../../redux/actions/filterAction";

import {CheckboxFilter} from "./CheckboxFilter";
import {ColorFilter} from "./ColorFilter";
import {SizeButtonFilter} from "./SizeButtonFilter";
import {postFilterRequest} from "../../redux/actions/productActions";
import './FilterContainer.scss'

const FilterContainer = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filterReducer.filters)
    const requestBody = useSelector(state => state.filterReducer.requestBody)
    const checkedFilters = Object.keys(filters).flatMap(filterType => filters[filterType].filter(filter => filter.isChecked))

    // To fetch all the filters when the page is loaded
    useEffect(() => {
        dispatch(fetchFilterApi())
        // dispatch(postFilterRequest())
    }, [dispatch]);

    // To post data to server with updated filters
    // useEffect(() => {
    //     // console.log('sending reqeuest Body', requestBody)
    //     dispatch(postFilterRequest(requestBody))
    // }, [requestBody, dispatch]);
    return (
        <div className='filterContainer'>
            {checkedFilters.map(filter => {
                return filter.name ? <h1>{`${filter.name}'s What's New`} </h1> : <h1>What's New</h1>
            })}
            {/*//All the filters components*/}

            {/*All the filters except Color and Size, because they are two separate filters*/}
            {Object.keys(filters).map(filterType => {

                if (filterType === 'Colour')
                    return <ColorFilter key={filterType}
                                        filterType={filterType}
                                        filters={filters}/>
                else if (filterType === 'Size')
                    return <SizeButtonFilter
                        key={filterType}
                        filters={filters}
                        filterType={filterType}
                    />
                else
                    return <CheckboxFilter key={filterType}
                                           filterType={filterType}
                                           filters={filters}/>
            })}
        </div>
    )
}


export default FilterContainer