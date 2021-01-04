import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import '../Styles/SearchBar.css'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  optionSelected = address => {
    console.log(address);
    this.setState({ address });
    this.props.handleSelect(address)
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.optionSelected}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-container">
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  console.log("\n\n");
                  console.log(suggestion.description);
                  console.log("\n\n");

                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { cursor: 'pointer' };
                  return (
                    <div key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span key={index}>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}