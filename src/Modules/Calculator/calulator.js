import React from 'react';
import '../../App.css';
import ResultComponent from './../../components/ResultComponent';
import KeyPadComponent from "./../../components/KeyPadComponent";
import { withRouter } from "react-router";
import fire from '../../fire';

const Calculator = ({ history: { push } }) => {

    const [result, setResult] = React.useState('')
    const [data, setData] = React.useState([])

    // get real time data from firebase.
    const getData = () => {
        const resultFire = fire.database().ref('result')
        resultFire.on('value', dataSnap => {
            const res = Object.values(dataSnap.val()).reverse()
            const slice = res.slice(0, 10)
            setData(slice)
        })
    }

    //this will call after component render.
    React.useEffect(() => {
        if (!localStorage.getItem('user')) {
            push('/')
        } else {
            getData()
        }
    }, [])

    //after click on '=' this will be called to calculate values.
    const onClick = button => {

        if (button === "=") {
            calculate()
        }

        else if (button === "C") {
            reset()
        }
        else if (button === "CE") {
            backspace()
        }

        else {
            setResult(
                result + button
            )
        }
    };

    // this is used to store data on firerbase.
    const savingData = (data) => {
        const date = new Date().getTime();
        const resultFireStore = fire.database().ref('result/' + date)
        resultFireStore.set(data).then(() => getData())
    }

    // this is used to calculate and get the updated result.
    const calculate = () => {
        var checkResult = ''
        if (result.includes('--')) {
            checkResult = result.replace('--', '+')
        } else {
            checkResult = result
        }

        try {
            const finalData = eval(checkResult) || "" + ""
            setResult(finalData)
            const appendResult = `${result}=${finalData} from user: ${localStorage.getItem('user')}`
            savingData(appendResult)
        } catch (e) {
            setResult("error"
            )
        }
    };

    const reset = () => {
        setResult(""
        )
    };

    const backspace = () => {
        const res = String(result)
        setResult(res.slice(0, -1))
    };

    // for logging out from app.
    const handleLogout = () => {
        fire.auth().signOut();
        localStorage.clear()
        push('/')
    }
    return (
        <div>
            <div className="calculator-body">
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '60%', padding: '20px' }}>
                        <ResultComponent result={result} />
                        <KeyPadComponent onClick={onClick} />
                    </div>
                    <div className="listStyle">
                        <label className="dataLable">Result</label>
                        <button className="btn btn-danger btn-sm logout" onClick={handleLogout}>Logout</button>
                        <ul className="resultList">
                            {data.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default withRouter(Calculator);
