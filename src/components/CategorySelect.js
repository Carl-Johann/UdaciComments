import React, { Component } from 'react';
import { connect } from 'react-redux'
import { actionSetCategories } from '../actions/thunkActions'
import * as CategoriesAPI from '../API/CategoriesAPI';
import { Link } from 'react-router-dom'

import { Card, CardTitle, Container } from 'reactstrap';


class CategorySelect extends Component {

    componentDidMount() {
        this.props.actionSetCategories()
    }


    render() {
        const { categories } = this.props

        const cardStyle = { marginTop: '2em', marginBottom: '2em', backgroundColor: 'white' }
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
    actionSetCategories: (data) => dispatch(actionSetCategories(data))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect)
