import React from 'react';

class TimeModule extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.time = date.getHours() + ':' + date.getMinutes()+ ':' + date.getSeconds();
        this.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    
    state = {
        date: new Date()
    }

    componentDidMount() {
        this.interval = setInterval(() => this.changeTime(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    changeTime() {
        this.setState({
            date: new Date(),
        });
        this.time = (this.state.date.getHours()<10?'0':'') + this.state.date.getHours() + ':' + (this.state.date.getMinutes()<10?'0':'')+ this.state.date.getMinutes();
        this.date = this.state.date.getFullYear() + '.' + (this.state.date.getMonth() + 1) + '.' + this.state.date.getDate();
    }
    render() {
        return (
            <div className='timeModule'>
                <p className="time">
                    {this.time}
                </p>
                <p className="date">
                    {this.date}
                </p>
            </div>
        )
    };

}
export default TimeModule;