import React, {Component} from 'react';

/**
 * This class renders the card for showing the list of al food items returned by the search
 */
export default class Card extends Component {
    constructor(props){
        super(props);
        this.handleClick= this.handleClick.bind(this);
    }
    handleClick(){

        let tag= this.props.tag.split("#")[1];
        this.props.cardClick(tag);
    }
    render() {
        let val ="th";
        if (this.props.number===1){
            val="st";
        }
        else if(this.props.number===2){
            val="nd";
        }
        else if(this.props.number===3){
            val="d";
        }
        return (
            <div className='card'  onClick={this.handleClick}>
                <div className="card-body">
                    <h5>{this.props.number}{val}: {this.props.tag} </h5>
                </div>
            </div>
        );
    }
}