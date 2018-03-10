import React, {Component} from 'react';
import './App.css';
import ResultsContainer from "./ResultsContainer";
import ImageContainer from "./ImageContainer";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            topPosts: [],
            hashtags: [],
            searchWord: "",
            history: [],
            loading: false
        }
        ;

        this.onChange = this.onChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.cardClick = this.cardClick.bind(this);
        this.hashtagClick = this.hashtagClick.bind(this);
        this.historyClick = this.historyClick.bind(this);

        this.getHistory();

    }

    //when text is inputed into the search bar
    onTextChange(e) {
        this.setState({
            searchWord: e
        });
    };

    cardClick(tag) {
        this.setState(
            {searchWord: tag});
        this.onChange(tag);

    }

    hashtagClick(tag) {
        let tagr = tag.split("#")[1];
        this.setState(
            {searchWord: tagr});
        this.onChange(tagr);
    }

    historyClick(tag) {
        this.setState(
            {searchWord: tag});
        this.onChange(tag);
    }

    onChange(tag) {

        let url = "";
        if (tag && typeof(tag) === typeof("cat")) {
            this.setState((prevState) => {
                    let hist = prevState.history;
                    hist.unshift({tag: tag});
                    hist.pop();
                    return {loading: true, history: hist}
                }
            );
            url = "/API/topPosts/" + tag;
        }
        else {
            url = "/API/topPosts/" + this.state.searchWord;
            this.setState((prevState) => {
                    let hist = prevState.history;
                    hist.unshift({tag: this.state.searchWord});
                    hist.pop();
                    return {loading: true, history: hist}
                }
            );
        }
        fetch(url)
            .then((res) => {
                return (res.json());
            })
            .then((posts) => {
                console.log(posts);
                this.setState({topPosts: posts.topPosts, hashtags: posts.tags, loading: false});
            })
            .catch((err) => console.log(err));

    }

    getHistory() {
        fetch("/API/history/25")
            .then((res) => {
                return (res.json());
            })
            .then((his) => {
                this.setState({history: his});
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="App">
                <div className="row">
                    <ResultsContainer onChange={this.onChange} onTextChange={this.onTextChange}
                                      hashtags={this.state.hashtags} cardClick={this.cardClick}
                                      loading={this.state.loading} history={this.state.history}
                                      hashtagClick={this.historyClick}/>
                    <ImageContainer topPosts={this.state.topPosts} loading={this.state.loading}
                                    hashtagClick={this.hashtagClick}/>
                </div>

            </div>
        );
    }
}

export default App;
