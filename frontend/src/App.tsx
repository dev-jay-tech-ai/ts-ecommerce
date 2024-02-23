import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Store } from './Store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { state: { mode, cart, userInfo }, dispatch } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href='/signin'
  }

  return (
    <>
      <div className='d-flex flex-column vh-100'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar expand='lg'>
             <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>TS Amazona</Navbar.Brand>
              </LinkContainer>
            </Container>
            <Nav>
              <Button variant={mode} onClick={switchModeHandler}>
                <i className={mode === 'ligth' ? 'fa fa-sun' : 'fa fa-moon' }></i>
              </Button>
              <Link to='/cart' className='nav-link'>
                Cart
                { cart.cartItems.length > 0 && (
                  <Badge pill bg='danger'>
                    { cart.cartItems.reduce((a,acc) => a + acc.quantity, 0) }
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown 
                className="header-link"
                title={`${userInfo.name}`} 
                id='basic-nav-dropdown'>
                 <Link 
                  className='dropdown-item'
                  to='#signout'
                  onClick={signoutHandler} 
                  >Sign Out</Link>
                </NavDropdown>
              ) : (
                <Link className='nav-link' to='/signin'>Sign In</Link>
              )}
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Outlet />
          </Container>
        </main>
        <footer>
          <div className='text-center'> All right reserved  </div>
        </footer>
      </div>
    </>
  )
}

export default App
