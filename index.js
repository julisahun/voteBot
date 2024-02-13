import inquirer from 'inquirer';
import promptSync from 'prompt-sync';
const prompt = promptSync();

const eventHash = 'r9GierAM6QXVHYiMUR1k2s'
let event
let poll
let section


async function getToken() {
  const res = await fetch(`https://app.sli.do/eu1/api/v0.5/events/${event}/auth`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-id": "B3iBicAYwOoROjG",
    "x-newrelic-id": "undefined",
    "x-slidoapp-version": "SlidoParticipantApp/53.120.3 (web)",
    "Referer": `https://app.sli.do/event/${eventHash}`,
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"initialAppViewer\":\"browser--other\",\"granted_consents\":[\"StoreEssentialCookies\"]}",
  "method": "POST"
})
  const {access_token} = await res.json()
  return access_token
}

async function sendVote(token, choice) {
  const result = await fetch(`https://app.sli.do/eu1/api/v0.5/events/${event}/polls/${poll}/vote`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": `Bearer ${token}`,
    "content-type": "application/json",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-id": "B3iBicAYwOoROjG",
    "x-newrelic-id": "undefined",
    "x-slidoapp-version": "SlidoParticipantApp/53.120.3 (web)",
    "Referer": `https://app.sli.do/event/${eventHash}/live/polls`,
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `{\"feedback_uuid\":\"${poll}\",\"votings\":[{\"feedback_question_uuid\":\"${choice.question}\",\"feedback_question_option_uuid\":\"${choice.uuid}\",\"is_anonymous\":true}],\"is_anonymous\":true}`,
  "method": "POST"
});
  const data = await result.json()
  return data
}

async function getOptions(token) {
  const res = await fetch(`https://app.sli.do/eu1/api/v0.5/events/${event}/polls-v2?sectionUuid=${section}&onlyActive=true`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": `Bearer ${token}`,
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-id": "B3iBicAYwOoROjG",
    "x-newrelic-id": "undefined",
    "x-slidoapp-version": "SlidoParticipantApp/53.120.3 (web)"
  },
  "referrer": `https://app.sli.do/event/${eventHash}`,
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
  });
  const data = await res.json()
  poll = data[0].uuid
  const options = data[0].questions[0].options.map(option => ({uuid: option.uuid, label: option.label, question: option.pollQuestionUuid}))
  return options
}

async function getEvent() {
  const res = await fetch(`https://app.sli.do/eu1/api/v0.5/app/events?hash=${eventHash}`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-client-id": "03JHhULZa9WwFMg",
      "x-newrelic-id": "undefined",
      "x-slidoapp-version": "SlidoParticipantApp/53.120.3 (web)"
    },
    "referrer": `https://app.sli.do/event/${eventHash}`,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  });
  const data = await res.json()
  event = data.uuid
}

async function getSection(token) {
  const res = await fetch(`https://app.sli.do/eu1/api/v0.5/events/${event}/summary`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": `Bearer ${token}`,
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-client-id": "flTAgDrXwfYGN9p",
    "x-newrelic-id": "undefined",
    "x-slidoapp-version": "SlidoParticipantApp/53.120.4 (web)"
  },
  "referrer": `https://app.sli.do/event/${eventHash}`,
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
  const data = await res.json()
  section = Object.keys(data.bySection)[0]
  return data
}


async function main() {
  await getEvent()
  let token = await getToken()
  await getSection(token)
  const options = await getOptions(token)
  let {choice} = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "A quien queres votar?",
      choices: options.map((item) => ({
        name: item.label,
        value: item,
      })),
    },
  ]);
  if (!choice) {
    console.log('No se encontro la opcion')
    return
  }

  let n = prompt('Cuantos votos queres estafar a la gente?');

  for (let i = 0; i < n; i++) {
    token = await getToken()
    await sendVote(token, choice)
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

main()