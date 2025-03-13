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
    const user = req.user;

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
      createdBy: user.accountId,
      balance: 0,
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

module.exports.callCards = async (req, res) => {
  try {
    const { accountId } = req.user;
    const cards = await Card.find({ createdBy: accountId });
    res.status(200).json({
      message: "Cards call Successfully",
      cards: cards,
    });
  } catch (e) {
    console.error("Error during call card: ", e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.addMoney = async (req, res) => {
  try {
    const { accountId } = req.user;
    const { cardInfo, money } = req.body;

    // Find the card first to get its current balance
    const card = await Card.findOne({
      createdBy: accountId,
      digits: cardInfo.digits,
      cvv: cardInfo.cvv,
      date: cardInfo.date,
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Update the card balance
    const updatedCard = await Card.findOneAndUpdate(
      { _id: card._id },
      { $inc: { balance: money } }, // `$inc` increments balance
      { new: true } // Returns updated document
    );

    res
      .status(200)
      .json({ message: "Money added successfully", card: updatedCard });
  } catch (e) {
    console.error("Error during card update: ", e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getMoney = async (req, res) => {
  try {
    const { accountId } = req.user;
    const { cardInfo, money } = req.body;

    // Find the card first to get its current balance
    const card = await Card.findOne({
      createdBy: accountId,
      digits: cardInfo.digits,
      cvv: cardInfo.cvv,
      date: cardInfo.date,
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    if (card.balance < money) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Update the card balance
    const updatedCard = await Card.findOneAndUpdate(
      { _id: card._id },
      { $inc: { balance: -money } }, // `$inc` increments balance
      { new: true } // Returns updated document
    );

    res
      .status(200)
      .json({ message: "Money added successfully", card: updatedCard });
  } catch (e) {
    console.error("Error during card update: ", e);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.sendMoney = async (req, res) => {
  try {
    const { accountId } = req.user;
    const { fromCard, toCardDigits, money } = req.body;

    const senderCard = await Card.findOne({
      createdBy: accountId,
      digits: fromCard.digits,
      cvv: fromCard.cvv,
      date: fromCard.date,
    });
    if (!senderCard) {
      return res.status(404).json({ message: "Sender Card not found" });
    }

    const claimerCard = await Card.findOne({ digits: toCardDigits });
    if (!claimerCard) {
      return res.status(404).json({ message: "Claimer Card not found" });
    }

    if (senderCard.balance < money) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const updatedCardSender = await Card.findOneAndUpdate(
      { _id: senderCard._id },
      { $inc: { balance: -money } },
      { new: true }
    );

    const updatedCardClaimer = await Card.findOneAndUpdate(
      { _id: claimerCard._id },
      { $inc: { balance: money } },
      { new: true }
    );

    res.status(200).json({
      message: "Money send successfully",
      senderCard: updatedCardSender,
      claimerCard: updatedCardClaimer,
    });
  } catch (e) {
    console.error("Error during call card: ", e);
    res.status(500).json({ message: "Server error" });
  }
};
