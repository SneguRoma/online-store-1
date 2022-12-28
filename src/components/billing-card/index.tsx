import { useEffect, useState } from 'react';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import './index.css';

const Billing = () => {

  const [name, setName] = useState('');
  const [nameDirty, setNameDirty]  = useState(false);
  const [nameError, setNameError] = useState('This field cannot be empty');
  const nameHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[A-Za-z]{3,} [A-Za-z]{3,}$/);
    setName(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setNameError('Incorrect name and surname');
    }else{
      setNameError('');
    }
  }

  const [phone, setPhone] = useState('');
  const [phoneDirty, setPhoneDirty]  = useState(false);
  const [phoneError, setPhoneError] = useState('This field cannot be empty');
  const phoneHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[+][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,}$/);
    setPhone(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setPhoneError('Incorrect phone');
    }else{
      setPhoneError('');
    }
  }

  const [address, setAddress] = useState('');
  const [addressDirty, setAddressDirty]  = useState(false);
  const [addressError, setAddressError] = useState('This field cannot be empty');
  const addressHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[A-Za-z]{5,} [A-Za-z]{5,} [A-Za-z]{5,}$/);
    setAddress(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setAddressError('Incorrect address');
    }else{
      setAddressError('');
    }
  }


  const [email, setEmail] = useState('');
  const [emailDirty, setEmailDirty]  = useState(false);
  const [emailError, setEmailError] = useState('This field cannot be empty');
  const emailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    setEmail(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setEmailError('Incorrect email');
    }else{
      setEmailError('');
    }
  }

  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberDirty, setCardNumberDirty]  = useState(false);
  const [cardNumberError, setCardNumberError] = useState('This field cannot be empty');
  const cardNumberHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[0-9]{16}$/);
    setCardNumber(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setCardNumberError('Incorrect card number');
    }else{
      setCardNumberError('');
    }
  }

  const [expiration, setExpiration] = useState('');
  const [expirationDirty, setExpirationDirty]  = useState(false);
  const [expirationError, setExpirationError] = useState('This field cannot be empty');
  const expirationHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[0-9]{2} [0-9]{2}$/);
    setExpiration(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setExpirationError('Incorrect expiration');
    }else{
      setExpirationError('');
    }
  }

  const [sc, setSC] = useState('');
  const [scDirty, setSCDirty]  = useState(false);
  const [scError, setSCError] = useState('This field cannot be empty');
  const scHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp(/^[0-9]{3}$/);
    setSC(e.target.value);
    if(!regExp.test(String(e.target.value))){
      setSCError('Incorrect SC');
    }else{
      setSCError('');
    }
  }

  const blurHandler = (e:React.FocusEvent<HTMLInputElement, Element>) => {
    switch (e.target.name){
      case 'name':
        setNameDirty(true);
        break;
      case 'phone':
        setPhoneDirty(true);
        break;  
      case 'address':
        setAddressDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;  
      case 'card-number':
        setCardNumberDirty(true);
        break;  
      case 'expiration':
        setExpirationDirty(true);
        break;  
      case 'sc':
        setSCDirty(true);
        break;  
    }
  }

  const[formValid, setFormValid] = useState(false);

  useEffect(() => {
    if(nameError || phoneError || addressError || emailError || cardNumberError || expirationError || scError){
      setFormValid(false);
    }else{
      setFormValid(true);
    }


  }, [nameError, phoneError, addressError, emailError, cardNumberError, expirationError, scError])

  return(
    <form className='billing__form'>
      <h4 className='billing__title'>Billing details</h4>
      <div className='form-group'>
        {(nameDirty && nameError) && <div className='form-error'>{nameError}</div>}
        <span className='form-group__name'>Name<span className='form-group__name__star'>*</span></span>
        <Input name='name' placeholder='Sherlock Holmes' onBlur={ e => blurHandler(e)} value={name} onChange={(e) => nameHandler(e)} required></Input>
      </div>

      <div className='form-group'>
        {(phoneDirty && phoneError) && <div className='form-error'>{phoneError}</div>}
        <span className='form-group__name'>Phone<span className='form-group__name__star'>*</span></span>
        <Input name='phone' placeholder='+7 (900) 000 00 00' onBlur={ e => blurHandler(e)} value={phone} onChange={(e) => phoneHandler(e)} required></Input>
      </div>

      <div className='form-group'>
        {(addressDirty && addressError) && <div className='form-error'>{addressError}</div>}
        <span className='form-group__name'>Address<span className='form-group__name__star'>*</span></span>
        <Input name='address' placeholder='London, Baker Street' onBlur={ e => blurHandler(e)} value={address} onChange={(e) => addressHandler(e)} required></Input>
      </div>

      <div className='form-group'>
        {(emailDirty && emailError) && <div className='form-error'>{emailError}</div>}
        <span className='form-group__name'>Email<span className='form-group__name__star'>*</span></span>
        <Input name='email'  placeholder='Email@mail.com' onBlur={ e => blurHandler(e)} value={email} onChange={(e) => emailHandler(e)} required></Input>
      </div>

      <div className='credit-card'>

        <div className='form-group'>
          {(cardNumberDirty && cardNumberError) && <div className='form-error'>{cardNumberError}</div>}
          <span className='form-group__name'>Card Number<span className='form-group__name__star'>*</span></span>
          <Input name='card-number' onBlur={ e => blurHandler(e)} value={cardNumber} onChange={(e) => cardNumberHandler(e)} maxLength={16} minLength={16} required/>
        </div>

        <div className='form-group__double'>

          <div className='form-group'>
            {(expirationDirty && expirationError) && <div className='form-error'>{expirationError}</div>}
            <span className='form-group__name'>Expiration<span className='form-group__name__star'>*</span></span>
            <Input name='expiration' onBlur={ e => blurHandler(e)} value={expiration} onChange={(e) => expirationHandler(e)} maxLength={5} minLength={5} required/>
          </div>

          <div className='form-group'>
            {(scDirty && scError) && <div className='form-error'>{scError}</div>}
            <span className='form-group__name'>Security Code<span className='form-group__name__star'>*</span></span>
            <Input name='sc' onBlur={ e => blurHandler(e)} value={sc} onChange={(e) => scHandler(e)} maxLength={3} minLength={3} required/>
          </div>

        </div>
      </div>
      <Button disabled={!formValid}>Confirm</Button>
    </form>
  );
};

export default Billing;