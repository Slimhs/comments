import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';

class CommentList extends Component {
  render() {
   const { onReply } = this.props;

    let commentNodes = this.props.data.map(comment => {
      // Destructuring example
      const { author, date, _id, text } = comment;
      return (
         <Comment
          author={ author || '' }
          date={ date || '' }
          uniqueID={_id}
          onCommentDelete={this.props.onCommentDelete}
          onCommentUpdate={this.props.onCommentUpdate}
          key={_id}
          text={text}
          onReply={onReply}
          url={this.props.url}

        />
      )
     })
    
    return (
      <div style={ style.commentList }>
        { commentNodes }
      </div>
    )
  }
}

export default CommentList;
 
       
  
  