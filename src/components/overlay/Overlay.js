import React,{useState,useEffect,useContext} from 'react';
import MyContext from '../../context/MyContext';
import {Button} from 'react-bootstrap';

function Overlay({_id,coordinate}) {
    const data = useContext(MyContext);
    const [create,setCreate] = useState(true);
    const [id,setId]= useState(0);
    const [type,setType] = useState('');
    const [coordinates,setCoordinates] = useState([]);
    const [name,setName]  = useState('');
    const [description,setDescription] = useState('');
    useEffect(() => {
        if(_id) {
            fetch('http://localhost:8080/'+_id, {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'GET'
            })
            .then(res => res.json())
            .then(result => {
                setName(result.post.properties.name);
                setType(result.post.type);
                setCoordinates(result.post.geometry.coordinates);
                setDescription(result.post.properties.description);
                setId(result.post.properties.id);
                setCreate(false)
            })
            .catch(err => console.log(err));
        } else if(coordinate.length === 2) {
            fetch('http://localhost:8080/')
            .then(res => res.json())
            .then (result => {
                setType(result.features[0].type);
                setId(result.features.length -1);
                setCreate(true);
                setCoordinates(coordinate);
            })
            .catch(err => console.log(err))
        }
    },[])
    const deleteLocation = () => {
        fetch('http://localhost:8080/'+_id,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result => clickClose())
        .catch(err => console.log(err))
        document.location.reload();
    }
    const updateLocation = (e) => {
        e.preventDefault();
        let temp = {
            type: type,
            id: id,
            properties: {
                id: id,
                name: name,
                description: description,
                icon: 'marker',
                iconSize: 0.2
            },
            geometry: {
                coordinates:coordinates,
                type: 'Point'
            }
        }
        fetch('http://localhost:8080/'+_id,{
            headers:{
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body: JSON.stringify(temp)
        })
        .then(res => res.json())
        .then(result => clickClose())
        .catch(err => console.log(err))
        document.location.reload();
    }
    const createLocation = (e) => {
        e.preventDefault();
        document.location.reload();
        let temp = {
            type: type,
            id: id+30,
            properties: {
                id: id +30,
                name: name,
                description: description,
                icon: 'marker',
                iconSize: 0.2
            },
            geometry: {
                coordinates:coordinates,
                type: 'Point'
            }
        }
        fetch('http://localhost:8080/post',{
            headers:{
                'Content-Type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify(temp)
        })
        .then(res => res.json())
        .then(result => clickClose())
        .catch(err => console.log(err))
    }
    const clickClose = () => {
        if(data.prevIdStart.length!==0) {
            setTimeout(() => {
                for(let i = 0 ; i< data.prevIdStart.length; i++ ){
                    document.getElementById(data.prevIdStart[i]).style.animation = "none";
                    document.getElementById(data.prevIdStart[i]).style.color ="inherit";
                }
            } ,300);
        }
        document.querySelector(".back-ground__overlay").style.opacity = 0;
        document.querySelector(".back-ground__overlay").style.visibility="hidden";
        document.querySelector(".overlay").style.opacity = 0;
        document.querySelector(".overlay").style.visibility="hidden";
        data._setId(null);
        data.setCoordinates([]);
    }
    return (
        <React.Fragment>
            <div className="back-ground__overlay" onClick={clickClose}>
                
            </div>
            <div className="overlay">
                <div className="overlay__input-type">
                    <label htmlFor="type">Type</label>
                    <input id="type"  type="text" readOnly value={type}  />
                </div>
                <div className="overlay__input-id" >
                    <label htmlFor="id" >ID</label>
                    <input id="id" type="text" readOnly value={id}/>
                </div>
                <div className="overlay__input-properties">
                    <div className="overlay__input-properties-name">
                        <label htmlFor="name" >Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value) } />
                    </div>
                    <div className="overlay__input-properties-description">
                        <label htmlFor="description" >Description</label>
                        <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value) } />
                    </div>
                </div>
                <div className="overlay__input-coordinates">
                    <label htmlFor="coordinates">Coordinates</label>
                    <input id="coordinates" type="text" value={coordinates.join(',')} readOnly />
                </div>
                <div className="overlay__btn-submit">
                    {(create)?
                    <button className="btn" onClick={createLocation}>
                        Submit
                    </button>:
                    <div className="btn__click">
                        <Button variant="primary" onClick={updateLocation}>Update</Button>
                        <Button variant="danger" onClick={deleteLocation}>Delete</Button>
                    </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Overlay
