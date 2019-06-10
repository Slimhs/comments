
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      author: '',
      text: '',
      date: ''
    };
  }
  updateComment = (e) => {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleCommentUpdate = (e) => {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT request
    //will ignore it.
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let comment = { author: author, text: text};
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    })
  }
  deleteComment = (e) => {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('deleted');
  }
  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  }
  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div style={style.comment}>
        <h3>{this.props.author}</h3>
        <h6 style={{ fontSize: 10 }}>{this.props.id}</h6>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm p-0 mr-2"
          onClick={this.updateComment}
        >
          <span className="mdi mdi-pencil pr-2 pl-2" />
          Edit
          <span className="pr-2" />
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm p-0 mr-2"
          onClick={this.deleteComment}
        >
          <span className="mdi mdi-delete pr-2 pl-2" />
          Delete
          <span className="pr-2" />
        </button>

        {this.state.toBeUpdated ? (
          <form onSubmit={this.handleCommentUpdate}>
            <input
              type="hidden"
              //type='text'
              placeholder="Update name..."
              style={style.commentFormAuthor}
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
            <input
              type="text"
              placeholder="Update your comment..."
              style={style.commentFormText}
              value={this.state.text}
              onChange={this.handleTextChange}
            />

            <button
              value="Update"
              type="submit"
              className="btn btn-outline-secondary btn-sm p-0 mr-2"
            >
              <span className="mdi mdi-pencil pr-2 pl-2" />
              Update
              <span className="pr-2" />
            </button>

          </form>
        ) : null}
      </div>
    );
  }
}

export default Comment;