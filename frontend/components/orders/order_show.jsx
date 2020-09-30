import React from 'react';
import { OrderIngredientItem } from './order_ingredient_item';
import { OrderFooter } from './order_footer';
import { FILLINGS } from '../../util/sections_ingredients';

class OrderShow extends React.Component {
    constructor(props) {
        super(props);
        this.startOver = this.startOver.bind(this);
        this.fillings = this.fillings.bind(this);
        this.toppings = this.toppings.bind(this);
        this.riceAndBeans = this.riceAndBeans.bind(this);
        this.lifestyleBowls = this.lifestyleBowls.bind(this);
        this.sides = this.sides.bind(this);
        this.drinks = this.drinks.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.orderPrice = 0;
        //an array of orders for multiple meals in an order, push an order into the order. An order will be a JSON object, which can be stringified
        this.orders = [];
        this.orderDetails = "Select a protein or veggie to get started";
        this.orderStoreId = 0;
        this.state = {
            userId: this.props.currentUser.id,
            storeId: this.orderStoreId,
            price: this.orderPrice,
            details: this.orderDetails
        }
    }

    startOver() {
        this.props.update();
    }

    handleClick(e) {
        //change class name so it stays the color that it is hovered
        if (e.target.className === "ingredient-img") {
            e.target.className = "ingredient-img-clicked";
            let filling = e.target.nextSibling.innerText;
            console.log(filling);
            if (FILLINGS.includes(filling)) {
                this.orderDetails = `${filling} ${this.props.mealName}`;
            }
            this.setState({ details: this.orderDetails})
            console.log(this.orderDetails);
        } else {
            this.orderDetails = "Select a protein or veggie to get started";
            this.setState({ details: this.orderDetails })
            e.target.className = "ingredient-img";
        }
        // this.orderPrice += e.currentTarget.getAttribute('data-price');
    }

    componentDidUpdate(prevProps) {
        debugger;
        console.log(prevProps);
        console.log(this.props);

        if (JSON.stringify(this.props) != JSON.stringify(prevProps)) {
            debugger;
            if (this.props.mealName != "sides" && this.props.sidesId) {
                debugger;
                if (Array.isArray(this.props.sides)) {
                    return null;
                } else {
                    this.props.fetchSideIngredients(this.props.sidesId);
                }
            }
        }
    }

    fillings() {

        if (this.props.fillings.length > 0) {
            const section = this.props.fillings.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="section-name">Protein or Veggie</span>
                    <span>Choose up to two</span>
                    <ul className="section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    riceAndBeans() {
        if (this.props.riceAndBeans.length > 0) {
            const riceOpts = [];
            const beanOpts = [];

            for (let i = 0; i < this.props.riceAndBeans.length; i++) {
                let ingredient = this.props.riceAndBeans[i];
                if (ingredient.ingredientName === "Pinto Beans" || ingredient.ingredientName === "Black Beans") {
                    beanOpts.push(ingredient);
                } else {
                    riceOpts.push(ingredient);
                }
            }

            const sectionRice = riceOpts.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })

            const sectionBean = beanOpts.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })

            return (
                <>
                <div className="section" >
                    <span className="section-name">RICE</span>
                    <ul className="section-container">
                        {sectionRice}
                        <li>
                            <figure className="figure">
                                <img
                                    src={window.comingsoon}
                                    className="ingredient-img"
                                    alt="no-rice"
                                ></img>
                                <div className="ingredient-name">No&nbsp;Rice</div>
                            </figure>
                        </li>
                    </ul>
                </div>
                <div className="section" >
                    <span className="section-name">BEANS</span>
                    <ul className="section-container">
                        {sectionBean}
                         <li>
                            <figure className="figure">
                                <img
                                    src={window.comingsoon}
                                    className="ingredient-img"
                                    alt="no-beans"
                                ></img>
                                <div className="ingredient-name">No&nbsp;Beans</div>
                            </figure>
                        </li>
                    </ul>
                </div>
                </>
            )
        }
    }

    toppings() {
        if (this.props.toppings.length > 0) {
            const section = this.props.toppings.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="section-name">TOP&nbsp;THINGS&nbsp;OFF</span>
                    <ul className="section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    lifestyleBowls() {
        if (this.props.lifestyleBowls.length > 0) {
            const section = this.props.lifestyleBowls.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <ul className="section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    sides() {
        if (this.props.sides.length > 0) {
            const section = this.props.sides.map(ingredient => {
                debugger;
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="section-name">SIDES</span>
                    <ul className="section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    drinks() {
        if (this.props.drinks.length > 0) {
            const section = this.props.drinks.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="section-name">DRINKS</span>
                    <ul className="section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    render() {


        const component = () => {
            debugger;
            if (this.props.ingredients.length > 0) {
                debugger;
                return (
                    <div>
                        {this.fillings()}
                        {this.riceAndBeans()}
                        {this.toppings()}
                        {this.sides()}
                        {this.drinks()}
                        {this.lifestyleBowls()}
                    </div>
                );
            } else {
                return null;
            }
        }
        return (
            <div className="order-show-page-container">
                <br />
                <ul>
                    <div className="show-page-header">
                        <img src={this.props.mealPhoto} alt={`${this.props.mealName}-pic`}/>
                        <h1>BUILD YOUR</h1>
                        <span className="meal-name-show-page">{this.props.mealName}</span>
                        <span className="meal-description">{this.props.mealDescription}</span>
                        <span className="main-or">|</span>
                        <span
                            className="start-over"
                            onClick={() => this.startOver()}>
                            START OVER
                        </span>
                    </div>
                    <div className="order-ingredients-container">
                        {component()}
                    </div>
                </ul>
                <div className="order-footer-container">
                    <OrderFooter orderDetails={this.state.details}/>
                </div>
            </div>
        )
    }
}

export default OrderShow;