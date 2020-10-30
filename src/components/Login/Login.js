import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faKey } from '@fortawesome/free-solid-svg-icons'
import { Spinner,Button } from 'react-bootstrap';

function Login() {
    const [user,setUser] = useState({
        email:'',
        password:'',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState([]);
    const clickLogin = () => {
        setIsLoading(true)
        fetch('https://mapuser-ad8bf.firebaseio.com//users.json',{
            method:'GET'
        })
        .then(res=> res.json())
        .then((result) => {
            for (let key in result) {
                if(user.email === result[key].email && user.password === result[key].password) {
                    sessionStorage.setItem('isLogin',JSON.stringify(true));
                    setIsLoading(false);
                    document.location.reload();
                }
                if(user.email === result[key].email && user.password !== result[key].password ) {
                    setUser({
                        ...user,
                        password:''
                    })
                    let temp = error;
                    temp.push({
                        id:'password',
                        message:"You've entered wrong password"
                    });
                    setError(temp);
                }
                if(user.email !== result[key].email && user.password === result[key].password ) {
                    setUser({
                        ...user,
                        email:''
                    })
                    let temp = error;
                    temp.push({
                        id:'email',
                        message:"You've entered wrong email"
                    })
                    setError(temp);
                }
            }
            setIsLoading(false);
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="login-container">
            <div className="login">
                <div className="login__heading">
                    <h1 className="heading-primary">UTE</h1>
                    <h1 className="heading-maps">Maps</h1>
                </div>
                <div className="login__email">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <input autoComplete="off" placeholder="Email..." type="email" id="email" value={user.email} onChange={(e) => setUser({
                        ...user,
                        email:e.target.value
                    })}  />
                </div>
                <div className="login__password">
                    <FontAwesomeIcon className="icon" icon={faKey} />
                    <input placeholder="Password..." type="password" id="password" value={user.password} onChange={(e) => setUser({
                        ...user,
                        password:e.target.value
                    })} />
                </div>
                <div className="login__btn">
                    {(!isLoading)?<button className="btn" onClick={clickLogin}>Login</button>:
                    <Button variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Loading...
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default Login
