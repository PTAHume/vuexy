// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
  const { dispatch, getProducts, store, setLoading } = props

  const handleSearch = async (e) => {
    setLoading(true);
    await dispatch(getProducts({ ...store.params, q: e.target.value }));
    setLoading(false);
  };

  

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              onChange={handleSearch}
              />
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
