import React from 'react';
import BurgerIncredient from './BurgerIncredient/BurgerIncredient';
import './Burger.css';


const Burger = (props) => {
    let transformedIncredient = Object.keys(props.incredient)
        .map(igKey => {
            return [...Array(props.incredient[igKey])].map((_, i) => {
                return <BurgerIncredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, ele) => {
            return arr.concat(ele);
        }, []);
    if (transformedIncredient.length === 0) {
        transformedIncredient = <p>Please start adding incredients!</p>
    }
    return (
        <div className="Burger">
            <BurgerIncredient type="bread-top" />
            {transformedIncredient}
            <BurgerIncredient type="bread-bottom" />
        </div>
    );
}

export default Burger;