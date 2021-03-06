import { connect } from 'react-redux';
import Show from './show';
// import fetchSideIngredients from '../'

const mapStateToProps = state => {
    const mealName = Object.keys(state.entities.ingredients)[0];
    const ingredients = state.entities.ingredients[mealName]
    return ({
        mealName: mealName,
        ingredients: ingredients ? Object.keys(ingredients) : {},
        fillings: ingredients ? ingredients["Fillings"] : {},
        riceAndBeans: ingredients ? ingredients["Rice & Beans"] : {},
        toppings: ingredients ? ingredients["Top it off"] : {},
        includedIngredients: ingredients ? ingredients["Included Ingredients"] : {},
        lifestyleBowls: ingredients ? ingredients["Bowls"] : {},
        sides: ingredients ? ingredients["Sides"] : {},
        drinks: ingredients ? ingredients["Drinks"] : {},
        data: [
                { name: 'Total Fat', value: 0 },
                { name: 'Protein', value: 0 },
                { name: 'Carbohydrates', value: 0 },
            ],
        calories: 0
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchSideIngredients: () => dispatch(fetchSideIngredients())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);