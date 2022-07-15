import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {

    return (
        <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmit}>
             <button type="submit" className="SearchFormButton">
            <span className="SearchFormButtonLabel">Search</span>
          </button>

            <input
                className="SearchForm-input"
                name="searchName"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>)
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func
}