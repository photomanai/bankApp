const Card = require("../models/card");

module.exports.create = async (req, res) => {
  const cardGenerator = () => {
    let cardDigits;
    let cardCvv;
    let cardDate;

    const generateRandomNum = () => {
      let num = "";
      for (let i = 0; i < 11; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num;
    };

    const generateControlNum = () => {
      let num = 0;
      let controlNum = 0;

      let cardArr = cardDigits.split("");

      for (let i = 0; i < cardArr.length; i++) {
        let currentDigit = parseInt(cardArr[i]);

        if (i % 2 == 0) {
          let q = currentDigit * 2;
          if (q >= 10) {
            let sum = 0;
            let qStr = q.toString();
            for (let j = 0; j < qStr.length; j++) {
              sum += parseInt(qStr[j]);
            }
            num += sum;
          } else {
            num += q;
          }
        } else {
          num += currentDigit;
        }
      }

      let f = num % 10;
      controlNum = f == 0 ? 0 : 10 - f;

      return controlNum;
    };

    const generateCardCvv = () => {
      let num = "";
      for (let i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num;
    };

    const generateCardDate = () => {
      const today = new Date();
      let month = today.getMonth() + 1;
      let year = today.getFullYear() + 4;

      if (month < 10) {
        month = `0${month}`;
      }

      let cardDate = `${month}/${year % 100}`;
      return cardDate;
    };

    cardDigits = "4169" + generateRandomNum();
    cardDigits += generateControlNum();

    cardCvv = generateCardCvv();

    cardDate = generateCardDate();

    return { cardDigits, cardCvv, cardDate };
  };
  try {
    const { createdBy } = req.body;

    let card;
    let existingCard;

    do {
      card = cardGenerator();
      existingCard = await Card.findOne({ digits: card.cardDigits });
    } while (existingCard);

    const newCard = new Card({
      digits: card.cardDigits,
      cvv: card.cardCvv,
      date: card.cardDate,
      createdBy,
    });
    await newCard.save();
    res.status(200).json({
      message: "Card created successfully",
    });
  } catch (e) {
    console.error("Error during generate card: ", e);
    res.status(500).json({ message: "Server error" });
  }
};
