import React, {Component} from 'react';


export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleTextChange(e) {
        this.props.onTextChange(e.target.value);

    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onChange();
        }
    }

    render() {

        return (
            <div className="container-fluid">
                <h3>Search for an Instagram #</h3>
                <input type="text" className="input" value={this.props.searchValue}
                       onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}/>
                <button className="searchButton btn btn-primary" onClick={this.props.onChange}>Search</button>
            </div>
        );
    }
}