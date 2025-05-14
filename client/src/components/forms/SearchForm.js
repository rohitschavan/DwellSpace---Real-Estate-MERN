import React from "react";
import { useSearch } from "../context/search";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { mapapikey } from "../../config";
const SearchForm = () => {
    const [search, setSearch] = useSearch();
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-5 form-control ">
                        <GooglePlacesAutocomplete selectProps={{
                            defaultInputValue: search?.address,
                            placeholder: 'Enter any location',
                            onChange: ({ value }) => {
                                setSearch({ ...search, address: value.description })
                            }
                        }} apiOptions='in' apiKey={mapapikey} />


                        <div className="d-flex flex-row justify-content-start gap-4">
                            <button className="btn btn-primary w-100">Rent</button>
                            <button className="btn btn-primary w-100">Buy</button>
                            <button className="btn btn-primary w-100">House</button>
                            <button className="btn btn-primary w-100">Land</button>
                            <button className="btn btn-primary w-100">Price</button>
                            <button className="btn btn-danger w-100">Search</button>
                        </div>


                    </div>

                </div>


            </div>

        </>
    )
}

export default SearchForm;