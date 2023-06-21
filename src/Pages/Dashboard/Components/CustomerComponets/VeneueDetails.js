import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Container, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import Header from '../../../Shared/Header/Header';
import styles from '../../../../Assets/Styles/styles.module.css';

const VeneueDetails = () => {
    const venueTitle = useParams();
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    const selectedVenues = users
        ?.filter(item => item.role === 'owner')
        .map(item => item.venues.filter(venue => venue.status === 'pending'))[0]; // needs to be confirmed


    const selectedVenue = selectedVenues?.filter(vn => vn.name === venueTitle.venueTitle)[0];


    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    // console.log(formattedDate) //June 22, 2023

    return (
        <div className={styles.bgStyle}>
            <Header />
            <h5 className='text-center text-white pb-3'>Venue Details</h5>
            <div className={styles.contentStyle}>
                <Container>
                    <Form className='text-white'>
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                name="name"
                                placeholder={`${selectedUser?.name}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder={`${selectedUser?.email}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="phoneNo"
                                name="phoneNo"
                                placeholder={`${selectedUser?.phoneNo}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Name</Form.Label>
                            <Form.Control
                                type="venueName"
                                name="venueName"
                                placeholder={`${selectedVenue?.name}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Location</Form.Label>
                            <Form.Control
                                type="venueLocation"
                                name="venueLocation"
                                placeholder={`${selectedVenue?.location}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Size</Form.Label>
                            <Form.Control
                                type="venueSize"
                                name="venueSize"
                                placeholder={`${selectedVenue?.size}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Capacity</Form.Label>
                            <Form.Control
                                type="venueCapacity"
                                name="venueCapacity"
                                placeholder={`${selectedVenue?.capacity}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Aminities</Form.Label>
                            <Form.Control
                                type="venueAmenities"
                                name="venueAmenities"
                                placeholder={`${selectedVenue?.amenities}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>


                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{ width: "50%" }}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Availability</Form.Label>
                            {selectedVenue?.booked === false ? (
                                <>
                                    {selectedVenue?.availability.map((slot) => (
                                        <div key={slot.startTime}>
                                            <Form.Check
                                                type="checkbox"
                                                label={`${slot.startTime} - ${slot.endTime}`}
                                                defaultChecked={selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.startTime === slot.startTime &&
                                                        selectedSlot.endTime === slot.endTime
                                                )}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setSelectedSlots((prevSelectedSlots) => [
                                                            ...prevSelectedSlots,
                                                            { startTime: slot.startTime, endTime: slot.endTime }
                                                        ]);
                                                    } else {
                                                        setSelectedSlots((prevSelectedSlots) =>
                                                            prevSelectedSlots.filter(
                                                                (selectedSlot) =>
                                                                    selectedSlot.startTime !== slot.startTime ||
                                                                    selectedSlot.endTime !== slot.endTime
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {selectedVenue?.availability.map((slot) => (
                                        <div key={slot.startTime}>
                                            <Form.Check
                                                type="checkbox"
                                                label={`${slot.startTime} - ${slot.endTime}`}
                                                defaultChecked={selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.startTime === slot.startTime &&
                                                        selectedSlot.endTime === slot.endTime
                                                )}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setSelectedSlots((prevSelectedSlots) => [
                                                            ...prevSelectedSlots,
                                                            { startTime: slot.startTime, endTime: slot.endTime }
                                                        ]);
                                                    } else {
                                                        setSelectedSlots((prevSelectedSlots) =>
                                                            prevSelectedSlots.filter(
                                                                (selectedSlot) =>
                                                                    selectedSlot.startTime !== slot.startTime ||
                                                                    selectedSlot.endTime !== slot.endTime
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </>
                            )
                            }
                        </Form.Group>

                        <div className="text-center my-4">
                            {selectedVenue?.availability.length > 0 && (
                                <Button variant="dark" className='w-50' disabled={!selectedDate}>Place Booking</Button>
                            )}
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    );
};

export default VeneueDetails;