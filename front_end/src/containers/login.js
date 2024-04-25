import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../../store/actions";
import './login.scss';
import { FormattedMessage } from 'react-intl';
// import {handleLoginApi} from '../../services/userService';

class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            // isShowPassword: false,
            // errMessage: '',
        }

    }
    handleOnChangeUsername = (event) =>{
        this.setState({
            username: event.target.value
        })
        
    }
    handleOnChangePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
        
    }

    // handleLogin = async() => {
    //     this.setState({
    //         errMessage : ''
    //     })
    //     // console.log('username: ', this.state.username,'password: ',this.state.password)
    //     // console.log('all state ', this.state)
    //     try{
    //         let data = await handleLoginApi(this.state.username,this.state.password);
    //         if(data && data.errCode !==0 ){
    //             this.setState({
    //                 errMessage: data.message,
    //             })
    //         }
    //         if(data && data.errCode === 0){
    //             //todo
    //             // eslint-disable-next-line no-undef
    //             this.props.userLoginSuccess(data.user)
    //             console.log('Login success')
    //         }
    //         console.log('hoidanit',data);
    //     }catch(error){
    //         if(error.response){
    //             if(error.response.data){
    //                 this.setState({
    //                     errMessage: error.response.data.message

    //                 })
                    
    //             }
    //         }
    //         console.log('error message', error.response);
            
    //     }
        
    // }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        //JSX

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input 
                                    type='text' 
                                    className='form-control' 
                                    placeholder='Enter your usename' 
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUsername(event)}
                            ></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control' 
                                    placeholder='Enter your password'
                                    onChange={(event) => {this.handleOnChangePassword(event)}}
                                ></input>
                                <span onClick = {() => {this.handleShowHidePassword()}}>
                                    
                                    <i class={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                                
                            </div>
                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={() => {this.handleLogin()}} >Log in</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-otherlogin'>Or Login with</span>

                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i class="fab fa-facebook-f facebook"></i>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
