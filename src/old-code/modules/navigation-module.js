import React from 'react';
import NavigatorButton from '../components/navigator-button'

class NavigationModule extends React.Component {
  render() {
    console.log('NavigationModule');
    return (
      <div className='NavigationModule'>
        <div id="GroupOfLinkButton" className='Toolbar'>
          {
            this.props.page === "/" ?
              <NavigatorButton link="/settings" />
              :
              <NavigatorButton link="/" />
          }
        </div>
      </div>
    )
  };
}
export default NavigationModule;
