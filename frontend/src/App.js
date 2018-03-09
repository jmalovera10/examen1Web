import React, {Component} from 'react';
import './App.css';
import ResultsContainer from "./ResultsContainer";
import ImageContainer from "./ImageContainer";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topPosts: [],
            searchWord: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

    }

    //when text is inputed into the search bar
    onTextChange(e) {
        this.setState({
            searchWord: e
        });
    };

    onChange() {

        fetch("http://localhost:3001/API/topPosts" + this.state.searchWord)
            .then((res) => {
                return res.json();
            })
            .then((posts) => {
                this.setState({topPosts: posts});
            })
            .catch((err) => console.log(err));

    }

    render() {
        return (
            <div className="App">
                <div className="row">
                    <ResultsContainer onChange={this.onChange} onTextChange={this.onTextChange}/>
                    <ImageContainer/>
                </div>

            </div>
        );
    }
}

export default App;
