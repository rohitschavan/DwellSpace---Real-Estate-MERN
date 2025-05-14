import React from "react";
import { useSearch } from "../context/search";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { mapapikey } from "../../config";
import { sellPrices, rentPrices } from "../priceList";
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SearchForm = () => {
    const [search, setSearch] = useSearch();
    const navigate = useNavigate();



    const handleSearch = async () => {
        setSearch({ ...search, loading: true })
        try {
            const { results, page, price, ...rest } = search;
            const query = queryString.stringify(rest);
            console.log(query, 'query')
            const { data } = await axios.get(`/search/?${query}`)
            if (search?.page !== '/search') {
                setSearch((prev) => ({ ...prev, results: data, loading: false }))
                navigate('/search')
            } else {
                setSearch((prev) => ({
                    ...prev,
                    results: data,
                    page: window.location.pathname,
                    loading: false
                }));
            }
        } catch (err) {
            console.log(err);
            setSearch({ ...search, loading: false })
        }
    }

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
                            <button onClick={() => setSearch({ ...search, action: 'Buy', price: '' })} className="btn btn-primary w-100">
                                {search.action === 'Buy' ? "✅ Buy" : 'Buy'}
                            </button>
                            <button onClick={() => setSearch({ ...search, action: 'Rent', price: '' })} className="btn btn-primary w-100">{search.action === 'Rent' ? "✅ Rent" : 'Rent'}</button>
                            <button onClick={() => setSearch({ ...search, type: 'House', price: '' })} className="btn btn-primary w-100">{search.type === 'House' ? "✅ House" : 'House'}</button>
                            <button onClick={() => setSearch({ ...search, type: 'Land', price: '' })} className="btn btn-primary w-100">{search.type === 'Land' ? "✅ Land" : 'Land'}</button>
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    &nbsp; {
                                        search?.price.length > 0 ? search.price : 'Price Range'
                                    }
                                </button>

                                <ul className="dropdown-menu pointer">

                                    {search.action === "Buy" ? (
                                        <>
                                            {sellPrices?.map((p) => (
                                                <li key={p._id}>
                                                    <a
                                                        className="dropdown-item "
                                                        onClick={() =>
                                                            setSearch({
                                                                ...search,
                                                                price: p.name,
                                                                priceRange: p.array,
                                                            })
                                                        }
                                                    >
                                                        {p.name}
                                                    </a>
                                                </li>
                                            ))}

                                        </>
                                    ) : (
                                        <>
                                            {rentPrices?.map((p) => (
                                                <li key={p._id}>
                                                    <a
                                                        className="dropdown-item"
                                                        onClick={() =>
                                                            setSearch({
                                                                ...search,
                                                                price: p.name,
                                                                priceRange: p.array,
                                                            })
                                                        }
                                                    >
                                                        {p.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>

                            </div>
                            <button onClick={handleSearch} className="btn btn-danger w-100">Search</button>

                        </div>
                        




                    </div>

                </div>


            </div>

        </>
    )
}

export default SearchForm;