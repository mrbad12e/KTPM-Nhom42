// import React from 'react';

// class Xe extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             color: props.color,
//             value: props.value,
//         };
//         console.log('this', this);
//         // this.shoot = this.shoot.bind(this);
//     }

//     // static getDerivedStateFromProps(props, state) {
//     //     return { color: props.color };
//     // }
//     shoot() {
//         console.log('shoot this =', this);
//         //alert('Great Shot!!!');
//     };

//     shoot2 = (b) => {
//         //console.log('shoot2 this = ', this);
//         console.log('shoot2 this = ', this);
//         console.log('shoot b = ', b);
//     };

//     shoot3 = (a) => {
//         console.log('shoot 3 a = ', a);
//     }

//     render() {
//         //console.log('Xe class: ', this.props.color);
//         console.log('render');

//         const shoot = (
//             // <h3 style={{ color: this.state.color }}>Hi, {this.state.value}!</h3>
//             <h3
//                 onClick={this.shoot}
//                 style={{ color: this.state.color, cursor: 'pointer' }}
//             >
//                 Hi, {this.state.value}!
//             </h3>
//         );


//         const shoot2 = (
//             // <h3 style={{ color: this.state.color }}>Hi, {this.state.value}!</h3>
//             <h3
//                 onClick={this.shoot2.bind(this, 'Goal A')}
//                 style={{ color: this.state.color, cursor: 'pointer' }}
//             >
//                 Hi, {this.state.value}!
//             </h3>
//         );


//         const shoot3 = (
//             <h3
//                 onClick={() => this.shoot3('Goal')}
//                 style={{ color: this.state.color, cursor: 'pointer' }}
//             >
//                 Hi, {this.state.value}!
//             </h3>
//         );
//     }
//     //return shoot;
// }
// export default Xe;
// // componentDidMount() {
// //     console.log('componentDidMount');
// //     setTimeout(() => {
// //         this.setState({ color: 'yellow' });
// //         console.log('componentDidMount da thay doi thanh mau vang');
// //     }, 3000);
// // }


