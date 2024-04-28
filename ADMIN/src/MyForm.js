import React from 'react';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    myChangeHandler = (event) => {
        console.log('myChangleHandler', event.target.value);
        this.setState({ username: event.target.value });
    };

    render() {
        let header = '';
        if (this.state.username) {
            header = <h1>Hello {this.state.username}</h1>;
        }
        else {
            header = '';

        }

        return (
            <form>
                {header}
                <p>Enter Name:</p>
                <input type='text' onChange={this.myChangeHandler} />

            </form>
        );
    }
}
export default MyForm;