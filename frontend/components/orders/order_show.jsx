import React from 'react';
import { OrderIngredientItem } from './order_ingredient_item';
import { OrderIngredientItemLifestyle } from './order_ingredient_item_lifestyle';
import { OrderFooter } from './order_footer';
import { FILLINGS, DRINKS, SIDES, LIFESTYLE, RICE, BEANS } from '../../util/sections_ingredients';
import { pick, times } from 'lodash';
import { OrderModal } from "./order_modal";

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
        this.orderDetails = { default: "Select an item to get started" };
        this.orderStoreId = 0;
        this.state = {
            userId: this.props.currentUser.id,
            storeId: this.orderStoreId,
            price: this.orderPrice,
            details: this.orderDetails,
            fillingsDetail: this.fillingsDetail,
            sidesDetail: this.sidesDetail,
            drinksDetail: this.drinksDetail
        }
        this.fillingsCount = 0;
        this.veggie = false;
        this.sidesCount = 0;
        this.drinksCount = 0;
        this.fillingsDetail = "";
        this.sidesDetail = "";
        this.drinksDetail = "";
        this.rice = false;
        this.beans = false;
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.orderDetails !== prevState.details) {
    //         return { details: nextProps.orderDetails}
    //     } else {
    //         return null;
    //     }
    // }

    startOver() {
        this.props.update();
    }

    handleClick(e) {
        let ingredientName = e.currentTarget.dataset.ingredientname;
    
        if (e.currentTarget.className === "ingredient-img") {
           if (FILLINGS.includes(ingredientName)) {
            
                if (ingredientName === "Veggie") {
                    this.veggie = true;
                }
                if (this.veggie && this.fillingsCount > 0) {
                    alert("Can't go halfsies with Veggies");
                } else if (this.fillingsCount < 2) {
                    this.orderPrice += e.currentTarget.dataset.price;
                    this.fillingsCount++;
                    e.currentTarget.className = "ingredient-img-clicked";
                
                    e.currentTarget.firstElementChild.style.display = "unset";
                    if (this.fillingsCount === 1) {
                        this.fillingsDetail = `${ingredientName} ${this.props.mealName}`;
                    } else if (this.fillingsCount === 2) {
                        let splitDisplayText = this.fillingsDetail.split(" ");
                    
                        splitDisplayText.splice(1, 0, "&", ingredientName);
                        this.fillingsDetail = splitDisplayText.join(" ");
                    }
                    this.orderDetails["fillingsDetail"] = this.fillingsDetail;
                    // this.setState({ details: this.orderDetails });
                } else {
                    alert('You can select only 2 fillings');
                }
            } else if (SIDES.includes(ingredientName)) {
                e.currentTarget.className = "ingredient-img-clicked";
                e.currentTarget.firstElementChild.style.display = "unset";
                this.sidesCount++;
                if (this.sidesCount > 1) {
                    this.sidesDetail = `${this.sidesCount} Sides`
                } else {
                    this.sidesDetail = `${this.sidesCount} Side`
                }
                this.orderDetails["sidesDetail"] = this.sidesDetail;
                // this.setState({ details: this.orderDetails });
            } else if (DRINKS.includes(ingredientName)){
                e.currentTarget.className = "ingredient-img-clicked";
                e.currentTarget.firstElementChild.style.display = "unset";
                this.drinksCount++;
                if (this.drinksCount > 1) {
                    this.drinksDetail = `${this.drinksCount} Drinks`
                } else {
                    this.drinksDetail = `${this.drinksCount} Drink`
                }
                this.orderDetails["drinksDetail"] = this.drinksDetail;
                // this.setState({ details: this.orderDetails });
            } else if (LIFESTYLE.includes(ingredientName)) {
                if (this.fillingsCount < 1) {
                    e.currentTarget.className = "ingredient-img-clicked";
                    e.currentTarget.firstElementChild.style.display = "unset";
                    this.orderPrice += e.currentTarget.dataset.price;
                    this.fillingsCount++;
                    this.fillingsDetail = ingredientName;
                } else if (this.fillingsCount === 1) {
                    alert('You can only select one bowl');
                }
                this.orderDetails["fillingsDetail"] = this.fillingsDetail;
            } else if (RICE.includes(ingredientName)){
                const noRiceImage = document.querySelector("#no-rice");
                if (noRiceImage.style.display !== "none") {
                    noRiceImage.firstElementChild.style.display = "none";
                    noRiceImage.className = "ingredient-img";
                }
                this.rice = true;
                e.currentTarget.className = "ingredient-img-clicked rice-selected";
                e.currentTarget.firstElementChild.style.display = "unset";
            } else if (BEANS.includes(ingredientName)) {
                const noBeansImage = document.querySelector("#no-beans");
                if (noBeansImage.style.display !== "none") {
                    noBeansImage.firstElementChild.style.display = "none";
                    noBeansImage.className = "ingredient-img";
                }
                this.beans = true;
                e.currentTarget.className = "ingredient-img-clicked beans-selected";
                e.currentTarget.firstElementChild.style.display = "unset";
            } else {
                const selectedRiceImages = document.querySelectorAll(".ingredient-img-clicked.rice-selected");
                const selectedBeansImages = document.querySelectorAll(".ingredient-img-clicked.beans-selected");
            
                if (e.currentTarget.id === "no-rice" && selectedRiceImages.length >= 0) {
                    for (let i = 0; i < selectedRiceImages.length; i++) {
                        selectedRiceImages[i].className="ingredient-img";
                        selectedRiceImages[i].firstElementChild.style.display = "none";
                    }
                    this.rice = true;
                }
                if (e.currentTarget.id === "no-beans" && selectedBeansImages.length >= 0) {
                    for (let i = 0; i < selectedBeansImages.length; i++) {
                        selectedBeansImages[i].className="ingredient-img";
                        selectedBeansImages[i].firstElementChild.style.display = "none";
                    }
                    this.beans = true;
                }
                e.currentTarget.firstElementChild.style.display = "unset";
                e.currentTarget.className = "ingredient-img-clicked";
            }
            if (this.fillingsDetail === "" && this.sidesDetail === "" && this.drinksDetail === "") {
                this.setState({ details: this.orderDetails.default });
            } else {
            
                if (this.fillingsDetail === "") {
                    delete this.orderDetails['fillingsDetail'];
                }
                if (this.sidesDetail === "") {
                  delete this.orderDetails["sidesDetail"];
                }
                if (this.drinksDetail === "") {
                  delete this.orderDetails["drinksDetail"];
                }
                let displayText = Object.values(this.orderDetails).slice(1).join(", ");
                this.setState({ details: displayText });
            }
        
        } else {
            e.currentTarget.className = "ingredient-img";
            e.currentTarget.firstElementChild.style.display = "none";
            if (ingredientName === "Veggie") this.veggie = false;

            if (FILLINGS.includes(ingredientName)) {
                this.orderPrice -= e.currentTarget.dataset.price;
                if (this.fillingsCount === 2) {
                    let splitDisplayText = this.fillingsDetail.split(" ");
                    const indexMealName = splitDisplayText.indexOf(ingredientName);
                    if (indexMealName > -1) {
                        splitDisplayText.splice(indexMealName, 1);
                    }
                    const indexAnd = splitDisplayText.indexOf("&");
                    if (indexAnd > -1) {
                        splitDisplayText.splice(indexAnd, 1);
                    }
                    this.fillingsDetail = splitDisplayText.join(" ");
                } else if (this.fillingsCount === 1) {
                    this.fillingsDetail = "";
                }
                this.fillingsCount--;
                //have logic for fillingsCount 0 1 or 2
                this.orderDetails["fillingsDetail"] = this.fillingsDetail; 
                // this.setState({ details: this.orderDetails })
            } else if (SIDES.includes(ingredientName)) {
                this.sidesCount--;
                if (this.sidesCount > 1) {
                    this.sidesDetail = `${this.sidesCount} Sides`;
                } else if (this.sidesCount === 1) {
                    this.sidesDetail = `${this.sidesCount} Side`;
                } else {
                    this.sidesDetail = "";
                }
                this.orderDetails["sidesDetail"] = this.sidesDetail;
                // this.setState({ details: this.orderDetails });
            } else if (DRINKS.includes(ingredientName)) {
                this.drinksCount--;
                if (this.drinksCount > 1) {
                    this.drinksDetail = `${this.drinksCount} Drinks`;
                } else if (this.drinksCount === 1) {
                    this.drinksDetail = `${this.drinksCount} Drink`;
                } else {
                    this.drinksDetail = "";
                }
                this.orderDetails["drinksDetail"] = this.drinksDetail;
                // this.setState({ details: this.orderDetails });
            } else if (LIFESTYLE.includes(ingredientName)) {
                this.fillingsCount--;
                this.fillingsDetail = "";
            } else {
                if (e.currentTarget.dataset.rice) this.rice = false;
                if (e.currentTarget.dataset.beans) this.beans = false;
            }
        
            if (this.fillingsDetail === "" && this.sidesDetail === "" && this.drinksDetail === "") {
            
                this.setState({ details: this.orderDetails.default });
            } else {
                if (this.fillingsDetail === "") {
                  delete this.orderDetails["fillingsDetail"];
                }
                if (this.sidesDetail === "") {
                  delete this.orderDetails["sidesDetail"];
                }
                if (this.drinksDetail === "") {
                  delete this.orderDetails["drinksDetail"];
                }
            
                let displayText = Object.values(this.orderDetails).slice(1).join(", ");
                this.setState({ details: displayText });
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) != JSON.stringify(prevProps)) {
        
            if (this.props.sidesId) {
            
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
                    <OrderIngredientItem key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick} />
                )
            })
            return (
                <div className="section" >
                    <span className="order-section-name">Protein or Veggie</span>
                    <br/>
                    <span className="order-section-subtitle">Choose up to two.</span>
                    <ul className="order-section-container">
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
                    <OrderIngredientItem key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })

            const sectionBean = beanOpts.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })

            const styleNoBeansRiceImage = () => {
                return {
                  backgroundImage: `url("https://poblano-app-seeds.s3.amazonaws.com/no-selection.png")`,
                  backgroundSize: "50px, 50px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center 85.28571px",
                };
            }

            return (
              <>
                <div className="section">
                  <span className="order-section-name">RICE</span>
                  <ul className="order-section-container">
                    {sectionRice}
                    <li>
                      <figure className="figure">
                        <div
                          className="ingredient-img"
                          id="no-rice"
                          alt="no-rice"
                          style={styleNoBeansRiceImage()}
                          onClick={(e) => this.handleClick(e)}
                        >
                          <div
                            className="ingredient-selected"
                            style={{
                              backgroundImage: `url(https://poblano-app-seeds.s3.amazonaws.com/selection.png)`,
                            }}
                          ></div>
                        </div>
                        <div className="ingredient-name">No&nbsp;Rice</div>
                      </figure>
                    </li>
                  </ul>
                </div>
                <div className="section">
                  <span className="order-section-name">BEANS</span>
                  <ul className="order-section-container">
                    {sectionBean}
                    <li>
                      <figure className="figure">
                        <div
                          className="ingredient-img"
                          alt="no-beans"
                          id="no-beans"
                          style={styleNoBeansRiceImage()}
                          onClick={(e) => this.handleClick(e)}
                        >
                          <div
                            className="ingredient-selected"
                            style={{
                              backgroundImage: `url(https://poblano-app-seeds.s3.amazonaws.com/selection.png)`,
                            }}
                          ></div>
                        </div>
                        <div className="ingredient-name">No&nbsp;Beans</div>
                      </figure>
                    </li>
                  </ul>
                </div>
              </>
            );
        }
    }

    toppings() {
        if (this.props.toppings.length > 0) {
            const section = this.props.toppings.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="order-section-name">TOP&nbsp;THINGS&nbsp;OFF</span>
                    <ul className="order-section-container">
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
                    <OrderIngredientItemLifestyle key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <ul className="order-section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    sides() {
        if (this.props.sides.length > 0) {
            const section = this.props.sides.map(ingredient => {
                return (
                    <OrderIngredientItem key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="order-section-name">SIDES</span>
                    <ul className="order-section-container">
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
                    <OrderIngredientItem key={ingredient.id} mealName={this.props.mealName} ingredient={ingredient} handleClick={this.handleClick}/>
                )
            })
            return (
                <div className="section" >
                    <span className="order-section-name">DRINKS</span>
                    <ul className="order-section-container">
                        {section}
                    </ul>
                </div>
            )
        }
    }

    render() {

        const component = () => {
            if (this.props.ingredients.length > 0) {
                return (
                    <div className="order-page-ingredients-grid">
                        {this.fillings()}
                        {this.riceAndBeans()}
                        {this.toppings()}
                        {this.lifestyleBowls()}
                        {this.sides()}
                        {this.drinks()}
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
                    <div className="order-show-page-header">
                        <img src={this.props.mealPhoto} alt={`${this.props.mealName}-pic`}/>
                        <div className="show-page-header-right">
                            <h1>BUILD YOUR</h1>
                            <span className="meal-name-order-show-page">{this.props.mealName}</span>
                            <span className="meal-description">{this.props.mealDescription}</span>
                            <span
                                className="start-over-order-show-page"
                                onClick={() => this.startOver()}>
                                START OVER
                            </span>
                        </div>
                    </div>
                    <div className="order-ingredients-container">
                        {component()}
                    </div>
                </ul>
                <br/><br/><br/><br/><br/><br/>
                <div className="order-footer-container">
                    <OrderFooter 
                        orderDetails={this.state.details.default ? this.state.details.default : this.state.details} 
                        orderState={this.state}
                        mealName={this.fillingsDetail}
                        mealType={this.props.mealName}
                        price={this.orderPrice}
                        lifestyleBowls={this.props.lifestyleBowls}
                        hasRice={this.rice}
                        hasBeans={this.beans}
                    />
                </div>
            </div>
        )
    }
}

export default OrderShow;