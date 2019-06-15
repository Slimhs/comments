import React, { Component } from "react";
import style from "./style";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: "", text: "" };
  }
  handleAuthorChange = e => {
    this.setState({ author: e.target.value });
  };
  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: "", text: "" });
  };
  render() {
    const { isReply, submitBtnText, cancelBtnText } = this.props;
    return (
      <form style={style.commentForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          dir="auto"
          placeholder="Your name ..."
          style={style.commentFormAuthor}
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          dir="auto"
          placeholder="Your Comment ..."
          style={style.commentFormText}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          style={this.props.submitStyle}
        >
          {submitBtnText || "Comment"}
        </button>
        {isReply ? (
          <button className="btn btn-outline-danger" style={this.props.cancelStyle}>
            {cancelBtnText || "Cancel"}
          </button>
        ) : null}
      </form>
    );
  }
}

export default CommentForm;
