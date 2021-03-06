import React from 'react';
import { ProgressBar } from '../progress_bar/progress_bar';

class Reward extends React.Component {
    constructor(props) {
        super(props);
        this.advertisement = this.advertisement.bind(this);
        this.displayRewards = this.displayRewards.bind(this);
        this.progress = this.progress.bind(this);
        this.greetingMessage = this.greetingMessage.bind(this);
        this.calculateRewardsPercentage = this.calculateRewardsPercentage.bind(this);
        this.calculateRewardsLeft = this.calculateRewardsLeft.bind(this);
    }
    

    advertisement() {
        return (
            <div className="falling-burritos-banner" >
                <img className="falling-burritos-img" src={"https://poblano-app-seeds.s3.amazonaws.com/fallingburritos.gif"} alt="burritos" />
                <div className="falling-burritos-message">
                    <div className="rewards-titles">
                        <h1 className="rewards-pre-title">UNWRAP SOME</h1>
                        <h1 className="rewards-title">FREE POBLANO</h1>
                        <span>Join Poblano Rewards to earn points towards free Poblano. Oh, and let's just say - we won't forget you on your birthday.</span>
                    </div>
                    <img className="rewards-img" src={"https://poblano-app-seeds.s3.amazonaws.com/rewards.png"} alt="rewards"/>
                </div>

                <div className="main-advertisement-container">
                    <img className="main-poblano-simple-logo" src={window.PoblanoLogoSimple} alt="poblano-logo-simple" />
                    <h2>JOIN POBLANO REWARDS. UNWRAP SOME FREE POBLANO.</h2>
                    <div className="main-create-signin">
                        <span className="main-create" onClick={() => dispatch(this.props.openModal('signup'))}>CREATE AN ACCOUNT</span>
                        <span className="main-or">OR</span>
                        <span className="main-signin" onClick={() => dispatch(this.props.openModal('signin'))}>SIGN IN</span>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }

    greetingMessage() {
        return (
            <div className="profile-modal-greeting-container">
                <div className="">
                    <h4 className="profile-greeting">HEY {this.props.currentUser.firstName}</h4>
                </div>
            </div>
        );
    }

    calculateRewardsPercentage() {
        let usersRewards = this.props.currentUser.rewardPoints;
        let rewardPointsLeft = 1250 - parseInt(usersRewards);
        const percentage = Math.floor((rewardPointsLeft / 1250) * 100);
        return percentage;
    }

    calculateRewardsLeft() {
        let usersRewards = this.props.currentUser.rewardPoints;
        return 1250 - parseInt(usersRewards);
    }

    progress() {
        return (
            <div className="rewards-progress-container">
                <div className="rewards-points">
                    {this.props.currentUser.rewardPoints} /  1250
                    </div>
                <ProgressBar percentage={this.calculateRewardsPercentage()}/>
                <span className="rewards-points-message">{this.calculateRewardsLeft()} points until your next reward</span>
            </div>
        );

    }

    displayRewards() {
        
        return(
            <div className="reward-background">
                <div className="reward-container">
                    <div>
                        <div className="profile-container">
                            {this.greetingMessage()}
                            <br />
                            {this.progress()}
                            <br />               
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.currentUser.id) {
            return this.displayRewards();
        } else {
            return this.advertisement();
        }
    }
}

export default Reward;