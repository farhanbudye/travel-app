import React from "react";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';


const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    // const coordinates = { lat: 0, lng: 0 };




    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:'AIzaSyCFK4e6_ik_dS7Bi6oHON-4e7OUGUF1-Ss' }}                        
                defaultCenter= {coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e) => {
                    // console.log(e);
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => {}}
              >
                  {places?.map((place, i) => (
                        <div 
                        className={classes.markerContainer}
                        lat = {Number(place.latitude)}
                        lng = {Number(place.longitude)}
                        key = {i}
                        >
                            {
                                !isDesktop ? (
                                    <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                                ) : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                            {place.name}
                                        </Typography>
                                        <img 
                                            className={classes.pointer}
                                            src={place.photo ? place.photo.images.medium.url : 'https://cdn-icons.flaticon.com/png/512/2098/premium/2098318.png?token=exp=1645218485~hmac=003c5607ab021375170a62b7e53368a9'}
                                            alt={place.name}
                                        />
                                        <Rating size="small" value={Number(place.rating)} readOnly />
                                    </Paper>
                                )
                            }
                        </div>
                  ))}
            </GoogleMapReact>
        </div>

);
}

export default Map;