import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";

export default function ProductPage() {
  const params = useParams()
  const { slug } = params
  const {
    data: product,
    refetch,
    isLoading,
    error
  } = useGetProductDetailsBySlugQuery(slug!)

  return (
    isLoading ? <LoadingBox /> :
    error ? <MessageBox variant='danger'>{getError(error as ApiError)}</MessageBox> :
    !product ? <MessageBox variant='danger'>Product Not Found</MessageBox> :
      <>
      <Row>
        <Col md={6}>
          <img className='large' src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              >
              </Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
            <ListGroup.Item>
              Decription:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <Card>
              <Card.Body>
                <ListGroup.Item variant='flush'>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item variant='flush'>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                    {product.countInStock > 0 ? (
                      <Badge bg='success'>In Stock</Badge>
                    ):(
                      <Badge bg='danger'>Unavailable</Badge>
                    )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button variant='primary'>Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )
                  
                }
              </Card.Body>
            </Card>
          </ListGroup>
        </Col>
      </Row>
      </>
  )
}
