import React, { Component } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import style from "./style";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadCommentsFromServer = () => {
    axios.get(this.props.url).then(res => {
      this.setState({ data: res.data });
    });
  };

  handleCommentSubmit = comment => {
    axios
      .post(this.props.url, comment)
      .then(({ data }) => this.setState({ data: [...this.state.data, data] }))
      .catch(err => console.error(err));
  };

  handleCommentDelete = id => {
    axios
      .delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log("Comment deleted");
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleCommentUpdate = (id, comment) => {
    //sends the comment id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, comment).catch(err => {
      console.log(err);
    });
  };

  componentWillMount() {
    this.loadCommentsFromServer();
    this.getCommentsInterval = setInterval(
      this.loadCommentsFromServer,
      this.props.pollInterval
    );
  }

  componentWillUnmout() {
    clearInterval(this.getCommentsInterval);
  }

  render() {
    return (
      <div style={style.commentBox}>
        <br />
        <h6 className="text-dark">Discuss</h6>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <hr />

        <CommentList
          onCommentDelete={this.handleCommentDelete}
          onCommentUpdate={this.handleCommentUpdate}
          onReply={this.handleCommentSubmit}
          data={this.state.data}
          url={this.props.url}
        />
      </div>
    );
  }
}

export default CommentBox;
