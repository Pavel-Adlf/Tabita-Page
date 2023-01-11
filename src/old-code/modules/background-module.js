import React from 'react';
import {sample} from 'lodash-es';
import Back1 from '../backgrounds/1.jpg';
import Back2 from '../backgrounds/2.jpg';
import Back3 from '../backgrounds/3.jpg';
import Back4 from '../backgrounds/4.jpg';
const listOfImage = [Back1, Back2, Back3, Back4];

class BackgroundModule extends React.Component {

    constructor(props) {
        super(props);
        this.changePictureEnd = this.changePictureEnd.bind(this);
        this.changePictureStart = this.changePictureStart.bind(this);
    }
    state = { foreImage: Back1, backImage: Back1, transitionOn: false, opacityValue: '0'};

    componentDidMount() {
        this.interval = setInterval(() => this.changePictureStart(), 7000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    changePictureStart() {
        this.setState({ foreImage: sample(listOfImage), opacityValue: '1'}, () => {this.setState({ transitionOn: true })} );
    }

    changePictureEnd() {
        this.setState({backImage: this.state.foreImage, transitionOn: false, opacityValue: '0' });
    }

    render() {
        return (
            <div>
                <img
                    className="BackgroundImage"
                    src={this.state.backImage}
                    alt="description"
                />
                <img
                    onTransitionEnd={
                        this.changePictureEnd
                    }
                    className="BackgroundImage"
                    style={{
                        transition: this.state.transitionOn ? 'opacity 4s' : 'none',
                        opacity: this.state.opacityValue,
                    }}
                    src={
                        this.state.foreImage
                    }
                    alt="description"
                />
            </div>
        )
    };
     

}
export default BackgroundModule;
