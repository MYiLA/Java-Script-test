const invoices = {
  "customer": "MDT",
  "performances": [{
    "playId": "Гамлет",
    "audience": 55,
    "type": "tragedy"
  }, {
    "playId": "Ромео и Джульетта",
    "audience": 35,
    "type": "tragedy"
  }, {
    "playId": "Отелло",
    "audience": 40,
    "type": "comedy"
  }]
};



const plays = {
  "Гамлет": {
    "name": "Гамлет",
    "audience": 55,
    "type": "tragedy"
  }, 
  
  "Ромео и Джульетта": {
    "name": "Ромео и Джульетта",
    "audience": 35,
    "type": "tragedy"
  },
  
  "Отелло": {
    "name": "Отелло",
    "audience": 40,
    "type": "comedy"
  }
}



const format = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2
}).format;



const calcBonus = (type, audience) => {

  let bonus = Math.max(audience - 30, 0);

  // Дополнительный бонус за каждые 10 комедий

  // Возможно вы имели в виду "бонус за каждые 10 человек в аудитории комедии?"
  // иначе получается несоизмеримо мало кредитов в бонусе, по сравнению с 
  // бонусами в других позициях

  if (type === "comedy") {
    bonus += Math.floor(audience / 10);
  };

  return bonus;
}



const calcPrice = (type, audience) => {
  let price = 0;

  switch (type) {
    case "tragedy":
      price = 40000;
      if (audience > 30) {
        price += 1000 * (audience - 30);
      }
      break;
    case "comedy":
      price = 30000;
      if (audience > 20) {
        price += 10000 + 500 * (audience - 20);
      }
      price += 300 * audience;
      break;
    default:
      throw new Error(`неизвестный тип: ${type}`);
  }

  return price
}



function statement(invoice, plays) {
  let totalBonus = 0;
  let totalPrice = 0;
  let result = `Счет для ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = plays[perf.playId];
    const price = calcPrice(play.type, perf.audience);

    totalPrice += price;
    totalBonus += calcBonus(play.type, perf.audience);

    result += `${play.name}: ${format(price / 100)} (${perf.audience} мест)\n`;
  }

  result += `Итого с вас ${format(totalPrice / 100)}\n`;
  result += `Вы заработали ${totalBonus} бонусов\n`;

  return result;
}



  console.log(statement(invoices, plays));
