import React, {Component} from 'react';
import './App.css';
import ImageCard from "./ImageCard";

/**
 * This class renders the container for all images that will be shown.
 */
export default class ImageContainer extends Component {
    render() {
        let rows = [];
        let handleCardClick = this.props.handleCardClick;
        let i = 0;
        this.props.topPosts.forEach(
            (f) => {
                i += 1;
                return (rows.push(<ImageCard hashtagClick={this.props.hashtagClick} handleCardClick={handleCardClick}
                                             id={f.id} key={i} src={f.src}
                                             hashtags={f.hashtags} alt={i + "th image"} count={f.count}/>));
            });
        if (rows.length === 0) {
            rows.push(<h4 key={0}>Nothing to show</h4>)
        }
        return (
            <div className="container-fluid col-8 ">
                <div className="row">
                    {rows}
                </div>
            </div>
        );
    }
}