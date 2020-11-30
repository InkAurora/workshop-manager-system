import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <div className="input-div">
        <input
          {...this.props}
        >
        </input>
      </div>
    );
  }
}

export default Input;
