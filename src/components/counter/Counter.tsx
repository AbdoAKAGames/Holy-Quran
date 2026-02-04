import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';

export function Counter() {
    const [counter, setCounter] = useState<number>(0);

    function newCounter() {
        localStorage.setItem("counter", `${+localStorage.counter + 1}`);
        setCounter(Number(localStorage.getItem("counter")));
    }
    function reset() {
        setCounter(0);
        localStorage.setItem("counter", "0");
    }

    useEffect(() => {
        if (!localStorage.counter) {
            localStorage.setItem("counter", "0");
        }
        setCounter(Number(localStorage.getItem("counter")));
    }, []);


    return (
        <>
            <Helmet>
                <title>المسبحة الإلكترونية - تطبيق القرآن الكريم</title>
            </Helmet>
            <div className="counter-title">المسبحة الإلكترونية</div>
            <div className="counter-container">
                <div className="counter-button" onClick={newCounter}>
                    <samp>{counter}</samp>
                </div>
                <div className="reset" onClick={reset}>إعادة ضبط</div>
            </div>
        </>
    )
}