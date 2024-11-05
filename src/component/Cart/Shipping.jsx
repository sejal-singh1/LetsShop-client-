import './Shipping.css';
import { Fragment, useState } from "react";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop"; // Updated import for MUI v5
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation"; 
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import EmojiTransportationTwoToneIcon from '@mui/icons-material/EmojiTransportationTwoTone';
import { Country } from "country-state-city";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from "./CheckoutSteps";

const Shipping= ()=>{ 
const navigate=useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);
const[fullName,setFullName]=useState(shippingInfo.fullName);
const[phoneNO,setPhoneNO]=useState(shippingInfo.phoneNO);
const[pinCode,setPinCode]=useState(shippingInfo.pinCode);
const[state,setState]=useState(shippingInfo.state);
const[city,setCity]=useState(shippingInfo.city);
const[houseNumber,setHouseNumber]=useState(shippingInfo.houseNumber);
const[roadName,setRoadName]=useState(shippingInfo.roadName);
const[country,setCountry]=useState(shippingInfo.country);
const[addressType,setAddressType]=useState(shippingInfo.addressType);
const shippingSubmit = (e) => {
    e.preventDefault();

if (phoneNO.length < 10 || phoneNO.length > 10) {
    alert.error("Phone Number should be 10 digits Long");
    return;
}
    dispatch(
        saveShippingInfo({fullName,phoneNO,pinCode,state,city,houseNumber,roadName,country,addressType})
    );
    navigate("/order/confirm");
};
    return (
        <Fragment>
              <MetaData title="Shipping Details" />
              <CheckoutSteps activeStep={0} />
        <div className="shipping-container">
            <div className='shipping-container'>
           
        <form className="address-form"
                    encType="multipart/form-data"
                    onSubmit={shippingSubmit}>
          <input type="text"
           placeholder="Full Name (Required)"
            required
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)} />

<div>
    <PhoneIcon/>
          <input type="text"
           placeholder="Phone number (Required)"
            required
            value={phoneNO}
            onChange={(e)=>setPhoneNO(e.target.value)} />
</div>      
<div>
    <PinDropIcon/>
          <input type="text" 
          placeholder="Pincode (Required)" required
          value={pinCode}
          onChange={(e)=>setPinCode(e.target.value)} />
</div>
<div>
<TransferWithinAStationIcon />
          <div className="location-container">
            <input type="text"
             placeholder="State (Required)"
              required 
              value={state}
              onChange={(e)=>setState(e.target.value)} />
  </div>
  <div>
  <LocationCityIcon/>
            <input type="text"
             placeholder="City (Required)"
              required
              value={city}
              onChange={(e)=>setCity(e.target.value)} />
   </div>
          </div>
          <div>
<HomeIcon/>
          <input type="text" 
          placeholder="House No., Building Name " 
          
          value={houseNumber}
          onChange={(e)=>setHouseNumber(e.target.value)} />
</div>
<div>
    <EmojiTransportationTwoToneIcon/>
        <input type="text" 
        placeholder="Road name, Area, Colony (Required)"
         required 
         value={roadName}
         onChange={(e)=>setRoadName(e.target.value)} />
</div>
<div>
              <PublicIcon />
<select 
         required 
         value={country}
         onChange={(e)=>setCountry(e.target.value)} >
         <option value ="">Country</option>
         {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
</div>
        <div className="address-type">
          <label>
            <input type="radio"
             name="addressType"
              value={addressType} checked
              onChange={(e)=>setAddressType(e.target.value)}
               />
            <span>
                <HomeIcon/>
                </span>
          </label>
          <label>
            <input type="radio"
             name="addressType"
              value={addressType}
              onChange={(e)=>setAddressType(e.target.value)} />
            <span><ApartmentTwoToneIcon/></span>
          </label>
        </div>
        <input type="submit" 
        className="save-address-btn"
        value="Save Address"
        disabled={state ? false:true}/>
      </form>
    </div>
    </div>
</Fragment>
)
};
export default Shipping;