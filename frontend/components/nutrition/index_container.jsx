import { connect } from 'react-redux';
import Index from './index';
import { fetchMeals, fetchIngredients } from '../../actions/nutrition_actions';

const mapStateToProps = state => {
    return ({
        meals: state.entities.meals,
        ingredients: state.entities.ingredients
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchIngredients: id => dispatch(fetchIngredients(id)),
        fetchMeals: () => dispatch(fetchMeals())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);