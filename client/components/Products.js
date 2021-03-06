import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// this fixes image render from pinging the website too much at once
import LazyLoad from 'react-lazy-load';
import { PageHeader } from 'react-bootstrap';

import ProductCard from './ProductCard';

class Products extends Component {
  constructor(){
    super();
    this.state = {
      search: '',
      min: '',
      max: 0
    };
  };

  updateSearch(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render(){
    const { products, categories} = this.props;
    const { search, min, max } = this.state;
    const filteredProducts = products.filter( product => {
      return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 && (parseFloat(product.price) > min) && ( max > 0 ? parseFloat(product.price) < max : true);
    });
      const specials = products.filter( product => product.id > 6 && product.id < 12);

      return (
        <div>

        {
          (products && categories) ?
          <div>
            <PageHeader>{ categories.name } Products offered: { filteredProducts.length }
            </PageHeader>
            <div>
              <span>Product Name</span><input name='search' value={search} placeholder="Search..." onChange={this.updateSearch.bind(this)} />
              <input type='numeric' step='0.01' name='min' value={min} placeholder="$ Min" onChange={this.updateSearch.bind(this)} />
              <span> - </span>
              <input type='numeric' step='0.01' name='max' placeholder="$ Max" onChange={this.updateSearch.bind(this)} />
            </div>
            <div>
              <div className='ticker-wrap'>
              <div className='ticker'>
              {
                specials.map(special =>{
                  return(
                    <div className='ticker__item card-ticker card-1'>
                    <div style={{display:'flex', justifyContent:'row'}} >
                    <span className="card-header">
                      <img style={{height: '75px', width:'75px', padding:'4px'}} alt="product here" src={ special.imageUrl } />
                    </span>
                    <div>
                    <Link to={ `/products/${special.id}` }>
                      <span style={{fontSize: 16}}>{special.name}</span>
                    </Link>
                    </div>
                    <span className='price' style={{fontSize: 16}}>: ${special.price}</span>
                    </div>
                    </div>
                  )
                })
              }
              </div>
              </div>
            </div>
            <LazyLoad>
              <ProductCard products={ filteredProducts } />
            </LazyLoad>
          </div>
          :
          <PageHeader>There are no products currently available</PageHeader>
        }
        </div>
      )
  }
};

const mapStateToProps = ({ products, categories }, { id }) => {
  if (id) {
    products = products.filter(product => product.categoryId === id);
    categories = categories.find(category => category.id === id);
  }
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(Products);
