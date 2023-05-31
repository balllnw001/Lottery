import React, { useState, useEffect } from 'react';
import './App.css'

const LotteryNumbers = () => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [randomNumbers1, setRandomNumbers1] = useState([]);
  const [randomNumbers2, setRandomNumbers2] = useState([]);
  const [randomNumbers3, setRandomNumbers3] = useState([]);
  const [randomNumbers4, setRandomNumbers4] = useState([]);

  const [checkNumbers3Digits, combinedNumbers3Digits] = useState([]);

  const [userNumbers, setUserNumbers] = useState([]);
  console.log(userNumbers);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  console.log('ALERT', matchedNumbers);

  const [alert, setALERT] = useState([]);

  const [value, setValue] = useState([]);

  console.log('valuelocalStorage :', value);

  const generateNumbers = (e) => {
    const min = 1;
    const max = 999;

    const generatedNumbers = Array.from({ length: 1 }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    const generatedNumbers1 = Array.from({ length: 1 }, () =>
      Math.floor(generatedNumbers) - 1
    );
    const generatedNumbers2 = Array.from({ length: 1 }, () =>
      Math.floor(generatedNumbers) + 1
    );
    const generatedNumbers3 = [];
    for (let i = 0; i < 3; i++) {
      const newNumbers3 = Math.floor(
        Math.random() * (max - min + 1)) + min;
      generatedNumbers3.push(newNumbers3.toString().padStart(3, '0'));
    };

    const generatedNumbers4 = Array.from({ length: 1 }, () =>
      Math.floor(Math.random() * 999 + 1).toString().slice(-2)
    );

    // const generatedNumbers = [230];
    // const generatedNumbers1 = [229];
    // const generatedNumbers2 = [231];
    // const generatedNumbers3 = [7, 333, 253];
    // const generatedNumbers4 = [30];

    const combinedNumbers3DigitsAll = [...generatedNumbers, ...generatedNumbers1, ...generatedNumbers2, ...generatedNumbers3, ...generatedNumbers4].map(Number);

    setRandomNumbers(generatedNumbers.toString().padStart(3, '0'));
    setRandomNumbers1(generatedNumbers1.toString().padStart(3, '0'));
    setRandomNumbers2(generatedNumbers2.toString().padStart(3, '0'));
    setRandomNumbers3(generatedNumbers3);
    setRandomNumbers4(generatedNumbers4);
    combinedNumbers3Digits(combinedNumbers3DigitsAll);

    setValue(e.target.value);
    localStorage.setItem('inputValue', JSON.stringify(combinedNumbers3DigitsAll));

    setMatchedNumbers([]);

    console.log(matchedNumbers)
    console.log(combinedNumbers3DigitsAll);
  };

  useEffect(() => {
    const storagenumber = localStorage.getItem('inputValue');
    const storagenumberjs = JSON.parse(storagenumber)
    setValue(storagenumberjs);
  }, []);

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
    console.log('output 2 :', userNumbers.includes(checkNumbers3Digits[6]));
    console.log('output 3 :', userNumbers.toString().slice(-2));

    if (userNumbers.includes(checkNumbers3Digits[0])) {
      result.push('ถูกรางวัลที่ 1');
      console.log(userNumbers, 'ถูกรางวัลที่ 1');
      setMatchedNumbers(userNumbers);
    }

    if (
      userNumbers.includes(checkNumbers3Digits[1]) ||
      userNumbers.includes(checkNumbers3Digits[2])
    ) {
      result.push('ถูกรางวัลข้างเคียงรางวัลที่ 1');
      console.log(userNumbers, 'ถูกรางวัลข้างเคียงรางวัลที่ 1');
      setMatchedNumbers(userNumbers);
    }

    if (
      userNumbers.includes(checkNumbers3Digits[3]) ||
      userNumbers.includes(checkNumbers3Digits[4]) ||
      userNumbers.includes(checkNumbers3Digits[5])
    ) {
      result.push('ถูกรางวัลที่ 2');
      console.log(userNumbers, 'ถูกรางวัลที่ 2');
      setMatchedNumbers(userNumbers);
    }

    if (userNumbers.toString().slice(-2).includes(checkNumbers3Digits[6])) {
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
                      {randomNumbers > 0 ? (
                        <p>{randomNumbers}</p>
                      ) : (
                        <p>{value[0]}</p>
                      )}
                    </div>
                  </div>
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลเลขข้างเคียงรางวัลที่ 1<br />
                        รางวัลๆละ 100,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers > 0 ? (
                        <>
                          <p>{randomNumbers1}</p>
                          <p>{randomNumbers2}</p>
                        </>
                      ) : (
                        <>
                          <p>{value[1]}</p>
                          <p>{value[2]}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลที่ 2<br />
                        รางวัลๆละ 4,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers > 0 ? (
                        <>
                          <p>{randomNumbers3[0]}</p>
                          <p>{randomNumbers3[1]}</p>
                          <p>{randomNumbers3[2]}</p>
                        </>
                      ) : (
                        <>
                          <p>{value[3]}</p>
                          <p>{value[4]}</p>
                          <p>{value[5]}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="lottery-number-item">
                    <div className="award-name">
                      <p>รางวัลเลขท้าย 2 ตัว<br />
                        รางวัลๆละ 2,000 บาท</p>
                    </div>
                    <div className="lottery-number">
                      {randomNumbers > 0 ? (
                        <>
                          <p>{randomNumbers4[0]}</p>
                        </>
                      ) : (
                        <>
                          <p>{value[6]}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={generateNumbers} className="btn btn-success random-btn">ดำเนินการสุ่มรางวัล</button>
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