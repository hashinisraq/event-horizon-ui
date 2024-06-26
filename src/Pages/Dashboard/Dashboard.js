import React from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';
import Profile from './Components/OwnerComponents/Profile';
import BookedVenues from './Components/OwnerComponents/BookedVenues';
import AvailableVenues from './Components/OwnerComponents/AvailableVenues';
import DeleteVenue from './Components/OwnerComponents/DeleteVenue';
import SetupVenue from './Components/OwnerComponents/SetupVenue';
import UpdateVenue from './Components/OwnerComponents/UpdateVenue';
import Approval from './Components/OwnerComponents/Approval';
import CustomerDashboard from './Components/CustomerComponets/CustomerDashboard';
import VenueOwners from './Components/AdminComponents/VenueOwners';
import VenueCustomers from './Components/AdminComponents/VenueCustomers';
import PendingRequest from './Components/AdminComponents/PendingRequest';
import MyProfile from './Components/AdminComponents/MyProfile';
import Verification from './Components/OwnerComponents/Verification';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email);
    const role = selectedUser[0]?.role;

    const verification = selectedUser[0]?.venues?.filter(venue => venue.status === "accepted")[0];


    return (
        <div>
            <Header />
            <div>
                <div className='text-center'>
                    <div className='pb-3'>
                        <Container className='py-5 text-white'>
                            {role === "owner" ?
                                <>
                                    {
                                        verification?.status === "accepted" ?
                                            <>
                                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                                    <Row>
                                                        <Col sm={12} lg={2} className='my-3'>
                                                            <Nav variant="pills" className="flex-column" >
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="first">
                                                                        Profile
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="second">
                                                                        Setup Venue
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="third">
                                                                        Update Venue
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="fourth">
                                                                        Available Venues
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="fifth">
                                                                        Booked Venues
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="sixth">
                                                                        Delete Venues
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                                <Nav.Item>
                                                                    <Nav.Link className="nav_link" eventKey="seventh">
                                                                        Approval
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                            </Nav>
                                                        </Col>
                                                        <Col sm={12} lg={10}>
                                                            <Tab.Content>
                                                                <Tab.Pane eventKey="first">
                                                                    <Profile />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="second">
                                                                    <SetupVenue />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="third">
                                                                    <UpdateVenue />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="fourth">
                                                                    <AvailableVenues />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="fifth">
                                                                    <BookedVenues />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="sixth">
                                                                    <DeleteVenue />
                                                                </Tab.Pane>
                                                                <Tab.Pane eventKey="seventh">
                                                                    <Approval />
                                                                </Tab.Pane>
                                                            </Tab.Content>
                                                        </Col>
                                                    </Row>
                                                </Tab.Container>
                                            </>
                                            :
                                            <>
                                                <Verification />
                                            </>
                                    }
                                </>
                                :
                                <></>
                            }
                            {role === "customer" ?
                                <CustomerDashboard />
                                :
                                <></>
                            }
                            {role === "admin" ?
                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col sm={12} lg={2} className='my-3'>
                                            <Nav variant="pills" className="flex-column" >
                                                <Nav.Item>
                                                    <Nav.Link className="nav_link" eventKey="first">
                                                        My Profile
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav_link" eventKey="second">
                                                        Owners
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav_link" eventKey="third">
                                                        Customers
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link className="nav_link" eventKey="fourth">
                                                        Pending Request
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col sm={12} lg={10}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    <MyProfile />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="second">
                                                    <VenueOwners />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="third">
                                                    <VenueCustomers />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fourth">
                                                    <PendingRequest />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                                :
                                <></>
                            }
                        </Container>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;