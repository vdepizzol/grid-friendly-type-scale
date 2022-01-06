import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
      return (
        <div id="header">
          <h1>Grid-friendly relative line heights for the web</h1>
          <p>Generate <code>rem</code> font sizes and <code>unitless</code> line heights while thinking of your type scale in pixels (like modern software design tools do). <a href="#">Learn more</a>.</p>
        </div>
      );
  }
}
export default Header;