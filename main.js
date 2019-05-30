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

// const HelloComponent = React.createClass ({
//     getInitialState (){
//         return {
//             name: "Noname"
//         }
//     },
//
//     handleChange(e){
//         console.log(e.target.value);
//         this.setState ({
//             name: e.target.value
//         });
//     },
//
//     render (){
//         return (
//             <div>
//                 <input
//                     placeholder="Enter your name"
//                     value={this.state.name}
//                     onChange={this.handleChange}
//                 />
//                 <h1>Hello {this.state.name}!</h1>
//             </div>
//         )
//     }
// });
//
// ReactDOM.render (
//     <HelloComponent />,
//     document.getElementById('root')
// );

// const Counter = React.createClass ({
//     getInitialState(){
//         return{
//             value: 0
//         }
//     },
//
//     handleDecrement () {
//         this.setState({ value: this.state.value - 1});
//     },
//
//     handleIncrement () {
//         this.setState({ value: this.state.value + 1});
//     },
//
//     render(){
//         return (
//             <div>
//                 <button onClick={this.handleDecrement}>-</button>
//                 <h1>{this.state.value}</h1>
//                 <button onClick={this.handleIncrement}>+</button>
//             </div>
//         )
//     }
// });
//
// ReactDOM.render (
//     <Counter />,
//     document.getElementById('root')
// );

// const Timer = React.createClass ({
//     getInitialState(){
//         return{
//             secondsElapsed: 0
//         }
//     },
//
//     componentDidMount() {
//         this.timer = setInterval(this.tick, 1000);
//     },
//
//     componentWillUnount() {
//         clearInterval(this.timer);
//     },
//
//     tick () {
//         this.setState({ secondsElapsed: this.state.secondsElapsed + 1})
//     },
//
//     render() {
//         return (
//             <div>
//                 <button onClick={this.componentWillUnount}>+</button>
//             </div>
//         )
//     }
// });
//
// ReactDOM.render (
//     <Timer />,
//     document.getElementById('root')
// );

const  NOTE = [{ id: 1, color: 'yellow', text: 'Hello, I\'m a first note!'}];
const DEFAULT_COLOR = 'yellow';

const Note = React.createClass ({
    handleDelete() {
      this.props.onDelete(this.props.id);
    },

    render (){
        const {
            color,
            children,
            onDelete
        } = this.props;

        return (
            <div className="note" style={{backgroundColor: color}}>
                <div>
                    <span className="delete_note" onClick={this.handleDelete}> x </span>
                </div>
                { children }
            </div>
        )
    },
});

const NoteEditor = React.createClass ({
    getInitialState() {
      return {
          text: ''
      }
    },

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    },

    handleNoteAdd() {
        const newNote = {
            text: this.state.text,
            id: Date.now(),
            color: DEFAULT_COLOR
        };
        this.props.onNoteAdd(newNote);

        this.resetState();
    },

    resetState() {
        this.setState({
            text: '',
        });
    },

    render (){
        return (
            <div className="editor">
                <textarea
                    rows={5}
                    placeholder="Enter your note here..."
                    className="editor_textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />

                {
                    // this.state.text
                    // &&
                    <button
                        className="editor_button"
                        onClick={this.handleNoteAdd}
                    >
                        Add
                    </button>
                }
            </div>
        )
    },
});

const NoteGrid = React.createClass ({
    componentDidMount() {
      this.msnry = new Masonry(this.grid, {
          columnWidth: 300,
          gutter: 10,
          isFitWidth: true
      })
    },

    componentDidUpdate(prevProps) {
      if(prevProps.notes !== this.props.notes){
          this.msnry.reloadItems();
          this.msnry.layout();
      }
    },

    render (){
        const {
            notes,
            onNoteDelete
        } = this.props;

        return (
            <div className="grid" ref={c => this.grid = c}>
                {
                    notes.map(note =>
                        <Note
                            key={note.id}
                            id={note.id}
                            color={note.color}
                            onDelete={onNoteDelete}
                        >
                            {note.text}
                        </Note>
                    )
                }
            </div>
        )
    },
});

const NotesApp = React.createClass ({
    getInitialState() {
        return {
            notes: []
        }
    },

    componentDidMount() {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));

        if(savedNotes) {
            this.setState({ notes: savedNotes})
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if(prevState.notes !== this.state.notes) {
            this.saveToLocalStorage();
        }
    },

    handleNoteAdd(newNote) {
      this.setState({
          notes: [newNote, ...this.state.notes]
      });
    },

    handleNoteDelete(noteId) {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        })
    },

    saveToLocalStorage() {
        const notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes)
    },

    render (){
        return (
            <div style={{textAlign: 'center'}} className="app">
                <h1 className="app_header">NoteApp</h1>

                <NoteEditor onNoteAdd={this.handleNoteAdd}/>

                <NoteGrid
                    notes={this.state.notes}
                    onNoteDelete={this.handleNoteDelete}
                />
            </div>
        )
    },
});

ReactDOM.render (
    <NotesApp />,
    document.getElementById('root')
);