import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCategories } from '../actions';
import * as CategoriesAPI from '../API/CategoriesAPI';
import { Link } from 'react-router-dom'

import { Card, CardTitle, Container } from 'reactstrap';


class CategorySelect extends Component {

    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
            this.props.setCategories({ categories })
        })
    }


    render() {
        const { categories } = this.props

        const cardStyle = { marginTop: '2em', marginBottom: '2em', backgroundColor: '#e5e5e5' }
        const categoryContainer = { marginTop: '10vh' }
        const cardTitle = { textAlign: 'center', textTransform: 'capitalize' }

        return (
            <div className="category-list">
                <p className="title unselectable" > Select a Category </p>

                <Container style={ categoryContainer }>
                    { categories.categories !== undefined && ( categories.categories.map( category => (
                        <Link className="select-category-link" to={`/${category.name}/`} key={ category.name } >
                            <Card body key={ category.name } style={ cardStyle }>
                                <CardTitle style={ cardTitle }>
                                    { category.name }
                                </CardTitle>
                            </Card>
                        </Link>
                    ) ))}
                </Container>
            </div>
        )

    }
}


function mapStateToProps ({ categories }) {
  return {
    categories
  }
}


function mapDispatchToProps (dispatch) {
  return {
    setCategories: (data) => dispatch(setCategories(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect)
