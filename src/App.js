import React, { useState, useEffect } from 'react';
import './App.css'

const LotteryNumbers = () => {

  const [randomNumbers, setRandomNumbers] = useState([]);
  const [randomNumbers1, setRandomNumbers1] = useState([]);
  const [randomNumbers2, setRandomNumbers2] = useState([]);
  const [randomNumbers3, setRandomNumbers3] = useState([]);
  const [randomNumbers4, setRandomNumbers4] = useState([]);
  const [checkNumbers3Digits, setCheckNumbers3Digits] = useState([]);

  useEffect(() => {
    retrieveRandomNumbers();
  }, []);

  const retrieveRandomNumbers = () => {
    const storedRandomNumbers = localStorage.getItem('randomNumbers');
    if (storedRandomNumbers) {
      const parsedNumbers = JSON.parse(storedRandomNumbers);
      setRandomNumbers(parsedNumbers[0]);
      setRandomNumbers1(parsedNumbers[1]);
      setRandomNumbers2(parsedNumbers[2]);
      setRandomNumbers3(parsedNumbers[3]);
      setRandomNumbers4(parsedNumbers[4]);
      setCheckNumbers3Digits(parsedNumbers);
    }
  };

  const generateRandomNumbers = () => {
    const min = 1;
    const max = 999;
    // const generatedNumbers = [];
    const generatedNumbers = ['022', '019', '021', '432', '485', '022', '022']

    const newNumbers0 = Math.floor(
      Math.random() * (max - min + 1)) + min;
    generatedNumbers.push(newNumbers0.toString().padStart(3, '0'));

    const newNumbers1 = Math.floor(
      (newNumbers0) - 1);
    generatedNumbers.push(newNumbers1.toString().padStart(3, '0'));

    const newNumbers2 = Math.floor(
      (newNumbers0) + 1);
    generatedNumbers.push(newNumbers2.toString().padStart(3, '0'));

    for (let i = 0; i < 3; i++) {
      const newNumbers3 = Math.floor(
        Math.random() * (max - min + 1)) + min;
      generatedNumbers.push(newNumbers3.toString().padStart(3, '0'));
    };
    const newNumbers4 = Math.floor(
      Math.random() * 999 + 1).toString().slice(-2);
    generatedNumbers.push(newNumbers4.toString().padStart(3, '0'));

    setRandomNumbers(generatedNumbers[0]);
    setRandomNumbers1(generatedNumbers[1]);
    setRandomNumbers2(generatedNumbers[2]);
    setRandomNumbers3(generatedNumbers[3]);
    setRandomNumbers4(generatedNumbers[4]);
    setCheckNumbers3Digits(generatedNumbers);
    localStorage.setItem('randomNumbers', JSON.stringify(generatedNumbers));
  };

  const handleButtonClick = () => {
    generateRandomNumbers();
  };

  const [userNumbers, setUserNumbers] = useState([]);

  const [matchedNumbers, setMatchedNumbers] = useState([]);

  const [alert, setALERT] = useState([]);

  console.log('checkNumbers3Digits :', checkNumbers3Digits);

  useEffect(() => {
    fetchnumbers();
  }, []);

  const fetchnumbers = () => {
    const storedRandomNumbers = localStorage.getItem('inputValue');
    if (storedRandomNumbers) {
      setRandomNumbers(JSON.parse(storedRandomNumbers));
    } else {
      return []
    }
  };

  const handleUserNumbersChange = (event, index) => {
    const updatedUserNumbers = [...userNumbers];
    updatedUserNumbers[index] = parseInt(event.target.value);
    setUserNumbers(updatedUserNumbers);
    setMatchedNumbers([]);
  };
  console.log(userNumbers);
  console.log('Alert :', alert);
  const checkNumbers = () => {

    let result = [];

    const matched = checkNumbers3Digits.filter(number => userNumbers.includes(number));
    console.log('matched', matched);
    console.log("ป้อนเลขหวย", matched, "ตรวจสอบเลข : ", checkNumbers3Digits);
    console.log('output 1 :', userNumbers);
    console.log('JSON.stringify 1 :', JSON.stringify(checkNumbers3Digits[0]));
    console.log('JSON.stringify 2 :', JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0'));
    console.log('JSON.stringify 3 :', JSON.stringify(checkNumbers3Digits[6]));
    console.log('JSON.stringify 2 :', JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0'));
    console.log('JSON.stringify 3 :', JSON.stringify(checkNumbers3Digits[0]));
    console.log('JSON.stringify 4 :', JSON.stringify(userNumbers));
    console.log('JSON.stringify 5 :', JSON.stringify(checkNumbers3Digits[1]));
    console.log('output 2 :', JSON.stringify(userNumbers).includes(checkNumbers3Digits[0]));
    console.log('output 3 :', userNumbers.toString().slice(-2));
    if (JSON.stringify(userNumbers).includes(checkNumbers3Digits[0]) ||
      JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[0]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[0])) {
      result.push('ถูกรางวัลที่ 1');
      console.log(userNumbers, 'ถูกรางวัลที่ 1');
      setMatchedNumbers(userNumbers);
    }

    if (JSON.stringify(userNumbers).includes(checkNumbers3Digits[1]) ||
      JSON.stringify(userNumbers).includes(checkNumbers3Digits[2]) ||
      JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[1]) ||
      JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[2]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[1]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[2])
    ) {
      result.push('ถูกรางวัลข้างเคียงรางวัลที่ 1');
      console.log(JSON.stringify(userNumbers), 'ถูกรางวัลข้างเคียงรางวัลที่ 1');
      setMatchedNumbers(userNumbers);
    }

    if (
      JSON.stringify(userNumbers).includes(checkNumbers3Digits[3]) ||
      JSON.stringify(userNumbers).includes(checkNumbers3Digits[4]) ||
      JSON.stringify(userNumbers).includes(checkNumbers3Digits[5]) ||
      JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[3]) ||
      JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[4]) ||
      JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[5]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[3]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[4]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[5])
    ) {
      result.push('ถูกรางวัลที่ 2');
      console.log(userNumbers, 'ถูกรางวัลที่ 2');
      setMatchedNumbers(userNumbers);
    }

    if (JSON.stringify(userNumbers).slice(-3, -1).padStart(3, '0').includes(checkNumbers3Digits[6]) ||
      JSON.stringify(userNumbers).slice(-2, 2).padStart(3, '0').includes(checkNumbers3Digits[6])) {
      result.push('ถูกรางวัลเลขท้าย 2 ตัว');
      console.log(userNumbers, 'ถูกรางวัลเลขท้าย 2 ตัว');
      setMatchedNumbers(userNumbers);
    }

    if (result.length === 0) {
      result.push('ไม่ถูกรางวัลใดเลย');
      console.log(userNumbers, 'ไม่ถูกรางวัลใดเลย');
      setMatchedNumbers(userNumbers);
    }

    setALERT(result.join(' และ'));
  };
  return (
    <div className="App">
      <div className="lottery-main">
        {/* <div className="title">
          <h1>ตรวจหวย</h1>
        </div> */}
        <div className="content">
          <div className="content-con">
            <div className="content-item">
              <div className="content-title">
                <h1>รางวัลล็อตเตอรี่</h1>
              </div>
              <div className="random-lottery">
                <h2>ผลการออกรางวัลล็อตเตอรี่</h2>
                <div className="lottery-number-list">
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลที่ 1 <br />
                        รางวัลละ 6,000,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers > 0
                        ? <p>{checkNumbers3Digits[0]}</p>
                        : <p></p>
                      }
                    </div>
                  </div>
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลเลขข้างเคียงรางวัลที่ 1<br />
                        รางวัลๆละ 100,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers1 || randomNumbers2 > 0
                        ? <>
                          <p>{checkNumbers3Digits[1]}</p>
                          <p>{checkNumbers3Digits[2]}</p>
                        </>
                        : <>
                          <p></p>
                          <p></p>
                        </>
                      }
                    </div>
                  </div>
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลที่ 2<br />
                        รางวัลๆละ 4,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers3 > 0
                        ? <>
                          <p>{checkNumbers3Digits[3]}</p>
                          <p>{checkNumbers3Digits[4]}</p>
                          <p>{checkNumbers3Digits[5]}</p>
                        </>
                        : <>
                          <p></p>
                          <p></p>
                          <p></p>
                        </>
                      }
                    </div>
                  </div>
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลเลขท้าย 2 ตัว<br />
                        รางวัลๆละ 2,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers4 > 0
                        ? <>
                          <p>{checkNumbers3Digits[6].slice(-2)}</p>
                        </>
                        : <p></p>
                      }
                    </div>
                  </div>
                </div>
                <button onClick={handleButtonClick} className="btn btn-success random-btn">ดำเนินการสุ่มรางวัล</button>
              </div>
            </div>

            <div className="content-item">
              <div className="content-title">
                <h1>ตรวจรางวัลล็อตเตอรี่</h1>
              </div>
              <div className="check-lottery">
                <label>
                  <div className="input-number-lottery">
                    <p>เลขล็อตเตอรี่</p>
                  </div>
                  {[0].map(index => (
                    <input
                      placeholder=' กรุณากรอก(เฉพาะตัวเลข)'
                      key={index}
                      type="text"
                      minLength="3"
                      maxLength="3"
                      pattern="[0-9]"
                      value={userNumbers[index] || ''}
                      onChange={event => handleUserNumbersChange(event, index)}
                    />
                  ))}
                </label>
              </div>
              <div>
                {matchedNumbers > 0 ? (
                  <div className="alert-award">
                    <p>{userNumbers.toString().padStart(3, '0')} {alert}</p>
                  </div>
                ) : (
                  null
                )}
              </div>
              <button onClick={checkNumbers} className="btn btn-primary btn-sm check-lottery-btn">ตรวจรางวัล</button>
              {/* <button onClick={checkNumbers} className="check-lottery-btn">ตรวจรางวัล</button> */}
            </div>

          </div>
        </div>
      </div>
    </div >
  );
};

export default LotteryNumbers;