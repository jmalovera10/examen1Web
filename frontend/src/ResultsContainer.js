import React, {Component} from 'react';
import Card from "./Card";
import SearchBar from "./SearchBar";
import History from "./History";

/**
 * This class renders the container for all the cards where results will be shown.
 */
export default class ResultsContainer extends Component {
    render() {
        let rows = [];
        let i = 0;
        if (this.props.loading) {
            rows = (<div><h5>Downloading from Instagram...</h5>
                <p> Don't put pressure on me <span role="img" aria-labelledby="sad">😭</span></p></div>);
        }
        else {
            this.props.hashtags.forEach(
                (f) => {
                    i += 1;
                    return (rows.push(<Card id={f.hastag} key={i} tag={f.tag} number={i}
                                            cardClick={this.props.cardClick}/>));
                });
        }
        return (
            <div className="col-4">
                <SearchBar onTextChange={this.props.onTextChange} onChange={this.props.onChange}/>
                <h5>Top 10 associated hashtags</h5>
                {rows}
                <div className="card">
                    <h5>Recently searched:</h5>
                    <History hashtagClick={this.props.hashtagClick} history={this.props.history}/>
                </div>
            </div>
        );
    }
}