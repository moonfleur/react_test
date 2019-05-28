// const Tweet = React.createClass({
//     render(){
//         const {
//             author,
//             text,
//             image,
//             avatar,
//             likes,
//             retweets
//         } = this.props;
//         return (
//             <div className="tweet">
//                 <img
//                     className="tweetAvatar"
//                     src={avatar}
//                     alt={author}
//                 />
//                 <div className="tweetBody">
//                     <a
//                         className="tweetAuthor"
//                         href={`https://twitter.com/franzkafka_`}
//                         target="_blank"
//                     >
//                         <h3 className="authorName">{author}</h3>
//                         @{author}
//                     </a>
//                     <p className="tweetText">{text}</p>
//                     <img
//                         className="tweetImage"
//                         src={image}
//                         alt={author}
//                     />
//
//                     <div className="tweetStats">
//                         <div className="tweetRetweets">
//                             <i className="tweetIconRetw fa fa-retweet" />
//                             {retweets}
//                         </div>
//
//                         <div className="tweetLikes">
//                             <i className="tweetIconsLike fa fa-heart" />
//                             {likes}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// });
//
// ReactDOM.render (
//     <div>
//         <Tweet
//             author="franz_kafka"
//             text="You do not need to leave your room. Remain sitting at your table and listen. Be unmasked, it has no choice, it will roll in ecstasy at your feet."
//             image="https://pictures.abebooks.com/2920229/17185054825.jpg"
//             avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kafka1906_cropped.jpg/267px-Kafka1906_cropped.jpg"
//             likes={233}
//             retweets={512}
//         />
//     </div>,
//     document.getElementById('root')
// );

const HelloComponent = React.createClass ({
    getInitialState (){
        return {
            name: "Noname"
        }
    },

    handleChange(e){
        console.log(e.target.value);
        this.setState ({
            name: e.target.value
        });
    },

    render (){
        return (
            <div>
                <input
                    placeholder="Enter your name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <h1>Hello {this.state.name}!</h1>
            </div>
        )
    }
});

ReactDOM.render (
    <HelloComponent />,
    document.getElementById('root')
);