import React, {Component} from 'react';
import ImageCard from "./ImageCard";

/**
 * This class renders the container for all images that will be shown.
 */
export default class ImageContainer extends Component{
    render(){
        let rows= [];
        let handleCardClick=this.props.handleCardClick;

        this.props.images.forEach(
            (f) => {
                i+=1;
                return (rows.push(<ImageCard  handleCardClick={handleCardClick} id={f.id} key={f.id} src={f.src} hashtags={f.hashtags} />));
            });

        return (
            <div className="foodItem container-fluid col-8 ">
                <div className="row">
                {rows}
                </div>
            </div>
        );
    }
}