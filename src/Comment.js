import React, { Component } from "react";
import axios from 'axios';
import style from "./style";
import marked from "marked";
import CommentForm from "./CommentForm";
import "./App.css";
import Moment from "react-moment";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      toReply: false,
      author: "",
      text: ""
    };
  }
  updateComment = e => {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
    //console.log(this.state.text);
  };

  replyComment = e => {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toReply: !this.state.toReply });
  };

  handleCommentUpdate = e => {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT request
    //will ignore it.
    let author = this.state.author ? this.state.author : null;
    let text = this.state.text ? this.state.text : null;
    let comment = { author: author, text: text };
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: "",
      text: ""
    });
  };

  handleReply = ({ text, author }) => {
    const { onReply, uniqueID } = this.props;

    onReply({ text, author, originalComment: uniqueID });
    this.setState({ toReply: false });
  }

  getReplies = () => {
    const { uniqueID } = this.props;
    axios
      .get(`${this.props.url}/${uniqueID}/replies`)
      .then(({ data }) => { console.log(data) ;this.setState({ replies: data })})
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getReplies();
  }

  deleteComment = e => {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log("deleted");
  };
  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };
  handleAuthorChange = e => {
    this.setState({ author: e.target.value });
  };
  rawMarkup() {
    let rawMarkup = marked(this.props.text.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      <div className="card rounded border-0 ">
        <div className="row reply-zone">
          <div className="col-1 left">
            <div className="card-body">
              <img
                src="https://image.freepik.com/vecteurs-libre/profil-avatar-homme-icone-ronde_24640-14044.jpg"
                width={30}
                alt="..."
                className="rounded-circle"
              />
            </div>
          </div>

          <div className="col-11 right">
            <div className="card-body pb-0">
              <div className="card rounded border-0 bg-light hint-comment">
                <div className="card-body">
                  <h4 dir="auto">
                    {this.props.author}
                    <span style={{ fontSize: 10 }}> - </span>

                    <span>
                      <Moment fromNow style={{ fontSize: 10 }}>
                        {this.props.date}
                      </Moment>
                    </span>
                  </h4>

                  <span dir="auto" dangerouslySetInnerHTML={this.rawMarkup()} />

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

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm p-0 mr-2"
                    onClick={this.replyComment}
                  >
                    <span className="mdi mdi-reply-all pr-2 pl-2" />
                    Reply
                    <span className="pr-2" />
                  </button>

                  {this.state.toBeUpdated ? (
                    <form onSubmit={this.handleCommentUpdate}>
                      <input
                        type="text"
                        //type='text'
                        placeholder="Update name..."
                        style={style.commentFormAuthor}
                        value={this.state.author}
                        onChange={this.handleAuthorChange}
                      />

                      <input
                        type="text"
                        dir="auto"
                        //placeholder="Update your comment..."
                        style={style.updateFormText}
                        value={this.state.text || this.props.text}
                        onChange={this.handleTextChange}
                      />

                      <button
                        value="Update"
                        type="submit"
                        className="btn btn-outline-secondary btn-sm p-0 mr-2"
                      >
                        <span className="mdi mdi-update pr-2 pl-2" />
                        Update
                        <span className="pr-2" />
                      </button>

                      <button
                        onClick={this.updateComment}
                        type="button"
                        className="btn btn-outline-secondary btn-sm p-0 mr-2"
                      >
                        <span className="mdi mdi-cancel pr-2 pl-2" />
                        Cancel
                        <span className="pr-2" />
                      </button>
                    </form>
                  ) : null}
                  {this.state.toReply ? (
                    <CommentForm
                      submitBtnText="Reply"
                      onCommentSubmit={this.handleReply}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
