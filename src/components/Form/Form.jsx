import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
const Form = () => {
    const [country, setCountry] = useState('Belarus');
    const [city, setCity] = useState('Minsk');
    const [gender, setGender] = useState('Male');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            gender
        }
        tg.sendData(JSON.stringify(data));
    }, [country, city, gender])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        })
    }, []);

    useEffect(() => {
        tg.MainButton.show()
    }, []);

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeGender = (e) => {
        setCountry(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Enter your data</h3>
            <input
                className={'input'}
                type="text"
                placeholder={"Country"}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={"City"}
                value={city}
                onChange={onChangeCity}
            />
            <select value={gender} onChange={onChangeGender}>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
            </select>
        </div>
    );
};

export default Form;