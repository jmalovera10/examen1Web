import React, {Component} from 'react';
import Card from "./Card";
import SearchBar from "./SearchBar";

/**
 * This class renders the container for all the cards where results will be shown.
 */
export default class ResultsContainer extends Component{
    render(){
        let rows= [];
        let i=0;
        this.props.topHashtags.forEach(
            (f) => {
                return (rows.push(<Card   id={f.hastag} key={f.hastag} hastag={f.hastag} number={i}/>));
            });

        return (
            <div className="foodItem container-fluid col-4">
                <SearchBar onTextChange={this.props.onTextChange} onChange={this.props.onChange}/>
                {rows}
            </div>
        );
    }
}