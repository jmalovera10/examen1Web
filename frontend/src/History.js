import React, {Component} from 'react';
import ReactTextCollapse from 'react-text-collapse';

/**
 * This class renders the container for all images that will be shown.
 */
export default class History extends Component {

    render() {
        let TEXT_COLLAPSE_OPTIONS = {
            collapse: false, // default state when component rendered
            collapseText: '... show more', // text to show when collapsed
            expandText: 'show less', // text to show when expanded
            minHeight: 80, // component height when closed
            maxHeight: 500 // expanded to
        };
        let history = [];
        let i = 0;
        this.props.history.forEach((tag) => {
            i += 1;
            history.push(<p onClick={this.props.hashtagClick.bind(this, tag.tag)} key={i}
                             style={{fontSize: "15px"}}>{tag.tag}</p>);
        });
        TEXT_COLLAPSE_OPTIONS.maxHeight = 37 * i;
        return (
            <div>

                <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
                    {history}
                </ReactTextCollapse>
            </div>


        );
    }
}