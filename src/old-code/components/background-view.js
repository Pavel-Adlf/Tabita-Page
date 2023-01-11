import React from 'react';

class BackgroundView extends React.Component {

    constructor(props) {
        super(props);
        this.listOfImage = this.props.picturesArray;
        this.changePictureEnd = this.changePictureEnd.bind(this);
        this.changePictureStart = this.changePictureStart.bind(this);
        this.counter = 0;
        this.counterMax = this.props.imgs-1;
        this.state = {foreImage: this.listOfImage[0].urls.full, backImage: this.listOfImage[0].urls.full, transitionOn: false, opacityValue: '0'};
    }

    componentDidMount() {
        this.interval = setInterval(() => this.changePictureStart(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }


    changePictureStart() {
        this.counter ++;
        this.setState({ foreImage: this.listOfImage[this.counter].urls.full, opacityValue: '1'}, () => {this.setState({ transitionOn: true })} );
        if (this.counter===this.counterMax) {this.counter=0; this.props.onChangePage(); console.log('ravno')};
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
export default BackgroundView;
