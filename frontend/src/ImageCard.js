import React, {Component} from 'react';
import ReactTextCollapse from 'react-text-collapse';

/**
 * This class renders the container for all images that will be shown.
 */
export default class ImageCard extends Component {

    render() {
        let TEXT_COLLAPSE_OPTIONS = {
            collapse: false, // default state when component rendered
            collapseText: '... show more', // text to show when collapsed
            expandText: 'show less', // text to show when expanded
            minHeight: 50, // component height when closed
            maxHeight: 500 // expanded to
        };
        let hashtags = [];
        let i = 0;
        this.props.hashtags.split(" ").forEach((tag) => {
            i += 1;
            hashtags.push(<div onClick={this.props.hashtagClick.bind(this, tag)} key={i}  style={{fontSize:"15px" }}>{tag}</div>);
        });
        TEXT_COLLAPSE_OPTIONS.maxHeight=24*i;
        return (
            <div className="col-4">
                <div className="row">
                    <img src={this.props.src} alt={this.props.alt} className="col-12 "/>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="progress col-10">
                        <div className="progress-bar" style={{width: (this.props.count*10)+"%"}}># top ten</div>
                    </div>
                    <div className="col-1"></div>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <ReactTextCollapse  options = {TEXT_COLLAPSE_OPTIONS}>
                        {hashtags}
                        </ReactTextCollapse>
                    </div>

                    <div className="col-1"></div>
                </div>
            </div>
        );
    }
}