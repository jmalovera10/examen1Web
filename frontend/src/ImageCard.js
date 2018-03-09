import React, {Component} from 'react';

/**
 * This class renders the container for all images that will be shown.
 */
export default class ImageCard extends Component{
    render(){
        return (
            <div className="col-4">
                <img src={this.props.src} alt={this.props.alt}/>
                <div className="progress">
                    <span className="label-progress">label </span>
                   100
                </div>
                <p>{this.props.hashtags}</p>
            </div>
        );
    }
}