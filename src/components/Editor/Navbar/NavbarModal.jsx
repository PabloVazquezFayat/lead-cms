import React, { useState, useEffect } from "react";

export default function NavbarModal(props) {
    const [data, setData] = useState(props.data);
    const [display, setDisplay] = useState("none");

    const [tempData, setTempData] = useState();

    const { logo, tagline, phone, facebook, instagram, linkedin, twitter } =
        data || {};

    const handleInput = (e) => {
        const { name, value } = e.target;

        setData((prevState) => {
            if (name) {
                return { ...prevState, [name]: value };
            }

            return prevState;
        });
    };

    const handleFocus = (e) => {

        const value = {
            logo: logo,
            tagline: tagline,
            phone: phone,
            facebook: facebook,
            instagram: instagram,
            linkedin: linkedin,
            twitter: twitter
        }[e.target.name]

        if(!tempData){
            setTempData(value)
        }
    }

    const handleBlur = (e) => {
        if(e.target.value === undefined){
            const data = {name: e.target.name, value: tempData};
            handleInput(data);
        }
    }

    const toggleModal = (e) => {
        const action = e.target.attributes["data-role"].value;

        if (action === "open") {
            setDisplay("flex");
        }

        if (action === "close") {
            setDisplay("none");
        }
    };

    const style = {
        display: display,
    };

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div className="modal-navbar">
            <button className="modal-button" data-role="open" onClick={toggleModal}>
                Edit
      </button>

            <div className="modal-wrapper" style={style}>
                <div className="modal-input-wrapper">
                    {logo ? (
                        <div>
                            <label>{logo}</label>
                            <input className="modal-input" type="text" name="logo" onChange={handleInput} onFocus={handleFocus} onBlur={handleBlur}/>
                        </div>
                    ) : null}

                    {tagline ? (
                        <div>
                            <label>{tagline}</label>
                            <input className="modal-input" type="text" name="tagline" onChange={handleInput}/>
                        </div>
                    ) : null}

                    {phone ? (
                        <div>
                            <label>{phone}</label>
                            <input className="modal-input" type="text" name="phone" onChange={handleInput}/>
                        </div>
                    ) : null}

                    {facebook ? (
                        <div>
                            <label>{facebook}</label>
                            <input className="modal-input" type="text" name="facebook" onChange={handleInput}/>
                        </div>
                    ) : null}

                    {instagram ? (
                        <div>
                            <label>{instagram}</label>
                            <input className="modal-input" type="text" name="instagram" onChange={handleInput}/>
                        </div>
                    ) : null}

                    {linkedin ? (
                        <div>
                            <label>{linkedin}</label>
                            <input className="modal-input" type="text" name="linkedin" onChange={handleInput}/>
                        </div>
                    ) : null}

                    {twitter ? (
                        <div>
                            <label>{twitter}</label>
                            <input className="modal-input" type="text" name="twitter" onChange={handleInput}/>
                        </div>
                    ) : null}
                </div>
                <div className="modal-actions-wrapper">
                    <button className="modal-button modal-button-cancel" data-role="close" onClick={toggleModal}>Cancel</button>
                    <button className="modal-button modal-button-save">Save</button>
                </div>
            </div>
        </div>
    );
}
